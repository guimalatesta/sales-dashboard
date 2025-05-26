require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const Order = require("./models/Order");
const Customer = require("./models/Customer");

const customers = [
  { name: "Customer 1", email: "customer1@example.com" },
  { name: "Customer 2", email: "customer2@example.com" },
];

const products = [
  { name: "Smartphone X", category: "Eletronics", price: 2999.9 },
  { name: "Notebook Pro", category: "Eletronics", price: 5499.9 },
  { name: "Dress", category: "Dresses", price: 149.9 },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("🔃 Seeding database...");

    await Product.deleteMany();
    await Order.deleteMany();
    await Customer.deleteMany();

    const createdCustomers = await Customer.insertMany(customers);

    const createdProducts = await Product.insertMany(products);

    const orders = [
      {
        customerId: createdCustomers[0]._id,
        items: [
          { productId: createdProducts[0]._id, quantity: 2, price: 2999.9 },
          { productId: createdProducts[2]._id, quantity: 1, price: 149.9 },
        ],
        orderDate: new Date("2024-01-15"),
        status: "COMPLETED",
      },
      {
        customerId: createdCustomers[1]._id,
        items: [
          { productId: createdProducts[1]._id, quantity: 1, price: 5499.9 },
        ],
        orderDate: new Date("2024-03-01"),
        status: "COMPLETED",
      },
    ];

    await Order.insertMany(orders);

    console.log("✅ Database seeded successfully");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    mongoose.disconnect();
  }
}

seedDatabase();
