import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import type { Order, OrderStatus } from "../../types/order";
import { fetchOrders, updateOrderStatus } from "../../api/orders";
import { OrderFilters, OrderFilterState } from "./OrderFilters";
import { PaginationControl } from "../../components/Table/PaginationControl";
import { FilterBar } from "../../components/Table/FilterBar";

export default function OrderList() {
  const qc = useQueryClient();

  const [filters, setFilters] = useState<OrderFilterState>({
    search: "",
  });

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: ["orders", filters, page, limit],
    queryFn: () =>
      fetchOrders({
        page,
        limit,
        search: filters.search,
        status: filters.status,
        fromDate: filters.fromDate,
        toDate: filters.toDate,
      }),
  });

  const statusMutation = useMutation({
    mutationFn: (payload: { id: string; status: OrderStatus }) =>
      updateOrderStatus(payload.id, payload.status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        Orders
      </Typography>

      <FilterBar>
        <OrderFilters value={filters} onChange={setFilters} />
      </FilterBar>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading
              ? null
              : data?.data.map((order: Order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>₹{order.totalAmount}</TableCell>
                    <TableCell>
                      <TextField
                        select
                        size="small"
                        value={order.status}
                        onChange={(e) =>
                          statusMutation.mutate({
                            id: order.id,
                            status: e.target.value as OrderStatus,
                          })
                        }
                      >
                        {[
                          "pending",
                          "confirmed",
                          "shipped",
                          "delivered",
                          "cancelled",
                        ].map((s) => (
                          <MenuItem key={s} value={s}>
                            {s}
                          </MenuItem>
                        ))}
                      </TextField>
                    </TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>

        <PaginationControl
          total={data?.total ?? 0}
          page={page}
          limit={limit}
          onChange={(p, l) => {
            setPage(p);
            setLimit(l);
          }}
        />
      </Paper>
    </Box>
  );
}
