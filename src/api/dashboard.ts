import { api } from "./axios";
import type {
  DashboardKPIs,
  SalesChartResponse,
  OrdersChartResponse,
} from "../types/dashboard";

export async function fetchDashboardKPIs(): Promise<DashboardKPIs> {
  const res = await api.get("/admin/dashboard/kpis");
  return res.data.data;
}

export async function fetchSalesChart(): Promise<SalesChartResponse> {
  const res = await api.get("/admin/dashboard/sales-chart");
  return res.data.data;
}

export async function fetchOrdersChart(): Promise<OrdersChartResponse> {
  const res = await api.get("/admin/dashboard/orders-chart");
  return res.data.data;
}
