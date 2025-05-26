"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_TOP_PRODUCTS } from "@/graphql/queries";
import ProductsTable from "@/components/ProductsTable";
import { Select, Alert, AlertIcon, Box } from "@chakra-ui/react";

export default function TopProductsPage() {
  const [limit, setLimit] = useState(5);
  const { loading, error, data } = useQuery(GET_TOP_PRODUCTS, {
    variables: { limit },
  });

  return (
    <div className="space-y-6">
      <Box maxW="200px">
        <Select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        >
          <option value={5}>Top 5</option>
          <option value={10}>Top 10</option>
          <option value={20}>Top 20</option>
        </Select>
      </Box>

      {error && (
        <Alert status="error">
          <AlertIcon />
          Error loading products: {error.message}
        </Alert>
      )}

      <ProductsTable
        loading={loading}
        products={data?.getTopSellingProducts || []}
      />
    </div>
  );
}
