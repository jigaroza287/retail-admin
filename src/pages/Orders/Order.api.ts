import { Order } from "../../types/order";

export interface OrderFilters {
  status?: "pending" | "shipped" | "delivered" | "cancelled";
  fromDate?: string;
  toDate?: string;
}

export async function fetchOrders(filters: OrderFilters): Promise<Order[]> {
  // mock delay
  return new Promise((resolve) =>
    setTimeout(() => {
      const data: Order[] = [
        {
          id: "1",
          customerName: "John Doe",
          totalAmount: 2500,
          status: "pending",
          createdAt: "2024-01-01",
        },
        {
          id: "2",
          customerName: "Priya Singh",
          totalAmount: 3200,
          status: "shipped",
          createdAt: "2024-01-02",
        },
        {
          id: "3",
          customerName: "Mark Taylor",
          totalAmount: 1800,
          status: "delivered",
          createdAt: "2024-01-03",
        },
      ];

      const filtered = data.filter((o) => {
        if (filters.status && o.status !== filters.status) return false;
        if (filters.fromDate && o.createdAt < filters.fromDate) return false;
        if (filters.toDate && o.createdAt > filters.toDate) return false;
        return true;
      });

      resolve(filtered);
    }, 800),
  );
}
