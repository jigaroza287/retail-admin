export interface DashboardKPIs {
  totalSales: number;
  totalRevenue: number;
  totalOrders: number;
  activeUsers: number;
}

export interface ChartPoint {
  date: string;
  value: number;
}

export interface SalesChartResponse {
  data: ChartPoint[];
}

export interface OrdersChartResponse {
  data: ChartPoint[];
}
