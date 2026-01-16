import { useQuery } from "@tanstack/react-query";
import { Grid, Paper, Typography, Skeleton, Box } from "@mui/material";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  fetchDashboardKPIs,
  fetchOrdersChart,
  fetchSalesChart,
} from "./Dashboard.api";

export default function DashboardPage() {
  const { data: kpis, isLoading: loadingKPIs } = useQuery({
    queryKey: ["dashboard-kpis"],
    queryFn: fetchDashboardKPIs,
  });

  const { data: sales, isLoading: loadingSales } = useQuery({
    queryKey: ["sales-chart"],
    queryFn: fetchSalesChart,
  });

  const { data: orders, isLoading: loadingOrders } = useQuery({
    queryKey: ["orders-chart"],
    queryFn: fetchOrdersChart,
  });

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        Dashboard
      </Typography>

      {/* KPI Cards */}
      <Grid container spacing={3}>
        {loadingKPIs ? (
          <>
            {[1, 2, 3, 4].map((n) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={n}>
                <Skeleton variant="rounded" height={90} />
              </Grid>
            ))}
          </>
        ) : (
          <>
            <KpiCard title="Total Sales" value={kpis?.totalSales ?? 0} />
            <KpiCard title="Orders" value={kpis?.totalOrders ?? 0} />
            <KpiCard title="Revenue" value={`₹${kpis?.totalRevenue ?? 0}`} />
            <KpiCard title="Active Users" value={kpis?.activeUsers ?? 0} />
          </>
        )}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} mt={1}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" mb={2}>
              Sales Trend
            </Typography>

            {loadingSales ? (
              <Skeleton height={260} />
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={sales}>
                  <CartesianGrid stroke="#e0e0e0" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#1976d2" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" mb={2}>
              Orders Trend
            </Typography>

            {loadingOrders ? (
              <Skeleton height={260} />
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={orders}>
                  <CartesianGrid stroke="#e0e0e0" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#9c27b0" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

// Reusable KPI card
interface KpiProps {
  title: string;
  value: string | number;
}

function KpiCard({ title, value }: KpiProps) {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
      <Paper sx={{ padding: 2, textAlign: "center" }}>
        <Typography variant="subtitle1" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h5" mt={1}>
          {value}
        </Typography>
      </Paper>
    </Grid>
  );
}
