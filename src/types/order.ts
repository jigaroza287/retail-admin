export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  customerName: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}
