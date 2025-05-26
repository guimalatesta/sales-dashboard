import { gql } from "@apollo/client";

export const GET_CUSTOMER_SPENDING = gql`
  query GetCustomerSpending($customerId: ID!) {
    getCustomerSpending(customerId: $customerId) {
      totalSpent
      averageOrderValue
      lastOrderDate
    }
  }
`;

export const GET_TOP_PRODUCTS = gql`
  query GetTopSellingProducts($limit: Int!) {
    getTopSellingProducts(limit: $limit) {
      productId
      name
      quantitySold
      price
    }
  }
`;

export const GET_SALES_ANALYTICS = gql`
  query GetSalesAnalytics($startDate: String!, $endDate: String!) {
    getSalesAnalytics(startDate: $startDate, endDate: $endDate) {
      totalRevenue
      completedOrders
      revenueByCategory {
        category
        revenue
      }
    }
  }
`;
