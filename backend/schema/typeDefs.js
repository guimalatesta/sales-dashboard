const { gql } = require("apollo-server-express");

module.exports = gql`
  type CustomerSpending {
    totalSpent: Float!
    averageOrderValue: Float!
    lastOrderDate: String
  }

  type TopProduct {
    productId: ID!
    name: String!
    quantitySold: Int!
    price: Float!
  }

  type RevenueCategory {
    category: String!
    revenue: Float!
  }

  type SalesAnalytics {
    totalRevenue: Float!
    completedOrders: Int!
    revenueByCategory: [RevenueCategory!]!
  }

  type OrderItem {
    productId: ID!
    quantity: Int!
    price: Float!
  }

  type Order {
    id: ID!
    customerId: ID!
    items: [OrderItem!]!
    orderDate: String!
    status: String!
  }

  type CustomerOrders {
    orders: [Order!]!
    total: Int!
    hasNextPage: Boolean!
  }

  input OrderInput {
    productId: ID!
    quantity: Int!
  }

  type Query {
    getCustomerSpending(customerId: ID!): CustomerSpending
    getTopSellingProducts(limit: Int!): [TopProduct]
    getSalesAnalytics(startDate: String!, endDate: String!): SalesAnalytics
    getCustomerOrders(customerId: ID!, page: Int, limit: Int): CustomerOrders
  }

  type Mutation {
    placeOrder(customerId: ID!, items: [OrderInput!]!): Order
  }
`;
