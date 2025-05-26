"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMER_SPENDING } from "@/graphql/queries";
import CustomerForm from "@/components/CustomerForm";
import { SimpleGrid, Skeleton, Text, Alert } from "@chakra-ui/react";
import { Stat, StatLabel } from "@chakra-ui/stat";

export default function CustomerPage() {
  const [customerId, setCustomerId] = useState("");
  const { loading, error, data } = useQuery(GET_CUSTOMER_SPENDING, {
    variables: { customerId },
    skip: !customerId,
  });

  return (
    <div className="space-y-8">
      <CustomerForm
        customerId={customerId}
        setCustomerId={setCustomerId}
        loading={loading}
      />

      {error && (
        <Alert status="error">
          Error loading customer data: {error.message}
        </Alert>
      )}
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        <Stat p={4} bg="white" boxShadow="md" borderRadius="md">
          <StatLabel>Total Spent</StatLabel>
          <Text fontSize="2xl" fontWeight="bold">
            {loading ? (
              <Skeleton height="24px" />
            ) : (
              `$${data?.getCustomerSpending?.totalSpent?.toFixed(2) || "0.00"}`
            )}
          </Text>
        </Stat>

        {/* Repetir para Average Order Value e Last Order Date */}
      </SimpleGrid>
    </div>
  );
}
