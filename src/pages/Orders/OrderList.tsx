import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { Order } from "../../types/order";
import { fetchOrders, OrderFilters } from "./Order.api";
import { OrderFilters as Filters } from "./OrderFilters";

export default function OrderList() {
  const [filters, setFilters] = useState<OrderFilters>({});

  const { data, isLoading } = useQuery<Order[]>({
    queryKey: ["orders", filters],
    queryFn: () => fetchOrders(filters),
  });

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        Orders
      </Typography>

      <Filters filters={filters} onChange={setFilters} />

      <Paper sx={{ p: 2 }}>
        {isLoading ? (
          <Box sx={{ textAlign: "center", p: 4 }}>
            <Skeleton variant="rounded" height={240} />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data?.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>₹{order.totalAmount}</TableCell>
                  <TableCell>{order.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Box>
  );
}
