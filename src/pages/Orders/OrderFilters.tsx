import { Box, MenuItem, TextField } from "@mui/material";
import type { OrderStatus } from "../../types/order";

export interface OrderFilterState {
  search: string;
  status?: OrderStatus;
  fromDate?: string;
  toDate?: string;
}

interface Props {
  value: OrderFilterState;
  onChange: (value: OrderFilterState) => void;
}

export function OrderFilters({ value, onChange }: Props) {
  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
      <TextField
        label="Search"
        value={value.search}
        onChange={(e) => onChange({ ...value, search: e.target.value })}
      />

      <TextField
        select
        label="Status"
        value={value.status ?? ""}
        onChange={(e) =>
          onChange({
            ...value,
            status: e.target.value
              ? (e.target.value as OrderStatus)
              : undefined,
          })
        }
        sx={{ minWidth: 160 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="pending">Pending</MenuItem>
        <MenuItem value="confirmed">Confirmed</MenuItem>
        <MenuItem value="shipped">Shipped</MenuItem>
        <MenuItem value="delivered">Delivered</MenuItem>
        <MenuItem value="cancelled">Cancelled</MenuItem>
      </TextField>

      <TextField
        type="date"
        label="From"
        InputLabelProps={{ shrink: true }}
        value={value.fromDate ?? ""}
        onChange={(e) => onChange({ ...value, fromDate: e.target.value })}
      />

      <TextField
        type="date"
        label="To"
        InputLabelProps={{ shrink: true }}
        value={value.toDate ?? ""}
        onChange={(e) => onChange({ ...value, toDate: e.target.value })}
      />
    </Box>
  );
}
