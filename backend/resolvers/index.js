const { Order, Product, Customer } = require("../models");
const mongoose = require("mongoose");
const redis = require("ioredis");

const redisClient = new redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
  retryStrategy: (times) => Math.min(times * 100, 3000),
});

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

const cache = async (key, ttl, callback) => {
  try {
    const cached = await redisClient.get(key);
    if (cached) return JSON.parse(cached);

    const result = await callback();
    await redisClient.setex(key, ttl, JSON.stringify(result));
    return result;
  } catch (err) {
    console.error("Cache error:", err);
    return callback();
  }
};

module.exports = {
  Query: {
    getCustomerSpending: async (_, { customerId }) => {
      if (!mongoose.Types.ObjectId.isValid(customerId)) {
        throw new Error("Invalid customer ID");
      }

      return cache(`customer:${customerId}`, 3600, async () => {
        const agg = await Order.aggregate([
          {
            $match: {
              customerId: new mongoose.Types.ObjectId(customerId),
              status: "COMPLETED",
            },
          },
          { $unwind: "$items" },
          {
            $group: {
              _id: null,
              totalSpent: {
                $sum: { $multiply: ["$items.quantity", "$items.price"] },
              },
              averageOrderValue: {
                $avg: { $multiply: ["$items.quantity", "$items.price"] },
              },
              lastOrderDate: { $max: "$orderDate" },
            },
          },
        ]);

        return agg[0]
          ? {
              totalSpent: agg[0].totalSpent,
              averageOrderValue: agg[0].averageOrderValue,
              lastOrderDate: agg[0].lastOrderDate?.toISOString(),
            }
          : {
              totalSpent: 0,
              averageOrderValue: 0,
              lastOrderDate: null,
            };
      });
    },

    getTopSellingProducts: async (_, { limit }) => {
      return cache(`topProducts:${limit}`, 1800, async () => {
        const agg = await Order.aggregate([
          { $unwind: "$items" },
          {
            $group: {
              _id: "$items.productId",
              quantitySold: { $sum: "$items.quantity" },
              totalRevenue: {
                $sum: { $multiply: ["$items.quantity", "$items.price"] },
              },
            },
          },
          { $sort: { quantitySold: -1 } },
          { $limit: limit },
          {
            $lookup: {
              from: "products",
              localField: "_id",
              foreignField: "_id",
              as: "product",
            },
          },
          { $unwind: "$product" },
          {
            $project: {
              productId: "$_id",
              name: "$product.name",
              quantitySold: 1,
              price: "$product.price",
              _id: 0,
            },
          },
        ]);

        return agg;
      });
    },

    getSalesAnalytics: async (_, { startDate, endDate }) => {
      return cache(`analytics:${startDate}-${endDate}`, 600, async () => {
        const matchStage = {
          orderDate: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
          status: "COMPLETED",
        };

        const [revenueData, countData, categoryData] = await Promise.all([
          Order.aggregate([
            { $match: matchStage },
            { $unwind: "$items" },
            {
              $group: {
                _id: null,
                totalRevenue: {
                  $sum: { $multiply: ["$items.quantity", "$items.price"] },
                },
              },
            },
          ]),

          Order.countDocuments(matchStage),

          Order.aggregate([
            { $match: matchStage },
            { $unwind: "$items" },
            {
              $lookup: {
                from: "products",
                localField: "items.productId",
                foreignField: "_id",
                as: "product",
              },
            },
            { $unwind: "$product" },
            {
              $group: {
                _id: "$product.category",
                revenue: {
                  $sum: { $multiply: ["$items.quantity", "$items.price"] },
                },
              },
            },
            {
              $project: {
                category: "$_id",
                revenue: 1,
                _id: 0,
              },
            },
          ]),
        ]);

        return {
          totalRevenue: revenueData[0]?.totalRevenue || 0,
          completedOrders: countData,
          revenueByCategory: categoryData,
        };
      });
    },

    getCustomerOrders: async (_, { customerId, page = 1, limit = 10 }) => {
      if (!mongoose.Types.ObjectId.isValid(customerId)) {
        throw new Error("Invalid customer ID");
      }

      const skip = (page - 1) * limit;

      const [orders, total] = await Promise.all([
        Order.find({ customerId })
          .sort({ orderDate: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),

        Order.countDocuments({ customerId }),
      ]);

      return {
        orders: orders.map((order) => ({
          ...order,
          id: order._id,
          orderDate: order.orderDate.toISOString(),
        })),
        total,
        hasNextPage: total > page * limit,
      };
    },
  },

  Mutation: {
    placeOrder: async (_, { customerId, items }) => {
      if (!mongoose.Types.ObjectId.isValid(customerId)) {
        throw new Error("Invalid customer ID");
      }

      const productIds = items.map((item) => item.productId);
      const products = await Product.find({ _id: { $in: productIds } });

      if (products.length !== items.length) {
        throw new Error("Some products not found");
      }

      const orderItems = items.map((item) => {
        const product = products.find((p) => p._id.equals(item.productId));
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        };
      });

      const newOrder = await Order.create({
        customerId,
        items: orderItems,
        orderDate: new Date(),
        status: "COMPLETED",
      });

      return {
        id: newOrder._id,
        ...newOrder.toObject(),
        orderDate: newOrder.orderDate.toISOString(),
      };
    },
  },
};
