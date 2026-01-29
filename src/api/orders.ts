import type { Order, OrderStatus } from "../types/order";
import { api } from "./axios";

export interface FetchOrdersParams {
  page: number;
  limit: number;
  search?: string;
  status?: OrderStatus;
  fromDate?: string;
  toDate?: string;
}

export interface PaginatedOrders {
  data: Order[];
  total: number;
  page: number;
  limit: number;
}

export async function fetchOrders(
  params: FetchOrdersParams,
): Promise<PaginatedOrders> {
  const res = await api.get("/admin/orders", { params });
  return res.data;
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
): Promise<Order> {
  const res = await api.patch(`/admin/orders/${orderId}/status`, { status });
  return res.data.data;
}
