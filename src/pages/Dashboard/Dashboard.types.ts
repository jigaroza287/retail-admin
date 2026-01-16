export interface DashboardKPIs {
  totalSales: number;
  totalOrders: number;
  totalRevenue: number;
  activeUsers: number;
}

export interface SalesChartPoint {
  date: string; // YYYY-MM-DD
  sales: number;
}

export interface OrdersChartPoint {
  date: string;
  orders: number;
}
