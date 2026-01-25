import {
  DashboardKPIs,
  OrdersChartPoint,
  SalesChartPoint,
} from "./Dashboard.types";

export async function fetchDashboardKPIs(): Promise<DashboardKPIs> {
  // Replace with real /dashboard/kpis API
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        totalSales: 320,
        totalOrders: 198,
        totalRevenue: 45200,
        activeUsers: 54,
      });
    }, 800),
  );
}

export async function fetchSalesChart(): Promise<SalesChartPoint[]> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        { date: "2024-01-01", sales: 30 },
        { date: "2024-01-02", sales: 45 },
        { date: "2024-01-03", sales: 20 },
      ]);
    }, 800),
  );
}

export async function fetchOrdersChart(): Promise<OrdersChartPoint[]> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        { date: "2024-01-01", orders: 12 },
        { date: "2024-01-02", orders: 18 },
        { date: "2024-01-03", orders: 5 },
      ]);
    }, 800),
  );
}
