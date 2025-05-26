"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_SALES_ANALYTICS } from "@/graphql/queries";
import SalesChart from "@/components/SalesChart";
import DatePicker from "react-datepicker";
import {
  Stat,
  StatLabel,
  StatNumber,
  SimpleGrid,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

export default function AnalyticsPage() {
  const [startDate, setStartDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  );
  const [endDate, setEndDate] = useState(new Date());

  const { loading, error, data } = useQuery(GET_SALES_ANALYTICS, {
    variables: {
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex gap-4 items-center">
        <div className="space-y-1">
          <label className="text-sm font-medium">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              if (date) setStartDate(date);
            }}
            className="p-2 border rounded"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => {
              if (date) setEndDate(date);
            }}
            className="p-2 border rounded"
          />
        </div>
      </div>

      {error && (
        <Alert status="error">
          <AlertIcon />
          Error loading analytics: {error.message}
        </Alert>
      )}

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
        <Stat className="stat-card">
          <StatLabel>Total Revenue</StatLabel>
          <StatNumber>
            ${data?.getSalesAnalytics?.totalRevenue?.toFixed(2) || 0}
          </StatNumber>
        </Stat>
        <Stat className="stat-card">
          <StatLabel>Completed Orders</StatLabel>
          <StatNumber>
            {data?.getSalesAnalytics?.completedOrders || 0}
          </StatNumber>
        </Stat>
      </SimpleGrid>

      <SalesChart data={data?.getSalesAnalytics?.revenueByCategory || []} />
    </div>
  );
}
