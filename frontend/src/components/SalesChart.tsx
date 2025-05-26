import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SalesChart({
  data,
}: {
  data: Array<{ category: string; revenue: number }>;
}) {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#3182CE" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
