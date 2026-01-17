import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import type { OrderFilters } from "./Order.api";

interface Props {
  filters: OrderFilters;
  onChange: (filters: OrderFilters) => void;
}

export function OrderFilters({ filters, onChange }: Props) {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
      {/* Status filter */}
      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel>Status</InputLabel>
        <Select
          label="Status"
          value={filters.status ?? ""}
          onChange={(e) =>
            onChange({
              ...filters,
              status: e.target.value as OrderFilters["status"],
            })
          }
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="shipped">Shipped</MenuItem>
          <MenuItem value="delivered">Delivered</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </Select>
      </FormControl>

      {/* Date from */}
      <TextField
        type="date"
        label="From"
        InputLabelProps={{ shrink: true }}
        value={filters.fromDate ?? ""}
        onChange={(e) => onChange({ ...filters, fromDate: e.target.value })}
      />

      {/* Date to */}
      <TextField
        type="date"
        label="To"
        InputLabelProps={{ shrink: true }}
        value={filters.toDate ?? ""}
        onChange={(e) => onChange({ ...filters, toDate: e.target.value })}
      />
    </Box>
  );
}
