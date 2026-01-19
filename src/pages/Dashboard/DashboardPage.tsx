import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import {
  fetchDashboardKPIs,
  fetchOrdersChart,
  fetchSalesChart,
} from "../../api/dashboard";

// Charts
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function DashboardPage() {
  const kpiQuery = useQuery({
    queryKey: ["dashboard", "kpis"],
    queryFn: fetchDashboardKPIs,
  });

  const salesQuery = useQuery({
    queryKey: ["dashboard", "sales-chart"],
    queryFn: fetchSalesChart,
  });

  const ordersQuery = useQuery({
    queryKey: ["dashboard", "orders-chart"],
    queryFn: fetchOrdersChart,
  });

  return (
    <Box px={2}>
      <Typography variant="h5" mb={3}>
        Dashboard
      </Typography>

      {/* KPIs */}
      <Grid container spacing={2} mb={4}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="Total Sales"
            value={kpiQuery.data?.totalSales ?? 0}
            loading={kpiQuery.isLoading}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="Revenue"
            value={kpiQuery.data?.totalRevenue ?? 0}
            loading={kpiQuery.isLoading}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="Orders"
            value={kpiQuery.data?.totalOrders ?? 0}
            loading={kpiQuery.isLoading}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="Active Users"
            value={kpiQuery.data?.activeUsers ?? 0}
            loading={kpiQuery.isLoading}
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard
            title="Sales Over Time"
            loading={salesQuery.isLoading}
            data={salesQuery.data?.data ?? []}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard
            title="Orders Over Time"
            loading={ordersQuery.isLoading}
            data={ordersQuery.data?.data ?? []}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

/* ---------------------- REUSABLE COMPONENTS ----------------------- */

function StatCard({
  label,
  value,
  loading,
}: {
  label: string;
  value: number;
  loading: boolean;
}) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          {label}
        </Typography>

        <Typography variant="h5" mt={1}>
          {loading ? "…" : value}
        </Typography>
      </CardContent>
    </Card>
  );
}

function ChartCard({
  title,
  loading,
  data,
}: {
  title: string;
  loading: boolean;
  data: { date: string; value: number }[];
}) {
  return (
    <Card sx={{ height: 360 }}>
      <CardContent sx={{ height: "100%" }}>
        <Typography mb={2}>{title}</Typography>

        {loading ? (
          <Typography>Loading chart…</Typography>
        ) : (
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#1976d2" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
