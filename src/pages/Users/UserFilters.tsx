import { Box, TextField, MenuItem } from "@mui/material";
import type { UserRole } from "../../types/user";

export interface UserFilterState {
  search: string;
  role?: UserRole;
  isActive?: boolean;
}

interface Props {
  value: UserFilterState;
  onChange: (value: UserFilterState) => void;
}

export function UserFilters({ value, onChange }: Props) {
  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
      <TextField
        label="Search"
        value={value.search}
        onChange={(e) => onChange({ ...value, search: e.target.value })}
      />

      <TextField
        select
        label="Role"
        value={value.role ?? ""}
        sx={{ minWidth: 160 }}
        onChange={(e) =>
          onChange({
            ...value,
            role: e.target.value ? (e.target.value as UserRole) : undefined,
          })
        }
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
        <MenuItem value="manager">Manager</MenuItem>
        <MenuItem value="viewer">Viewer</MenuItem>
      </TextField>

      <TextField
        select
        label="Active"
        value={
          value.isActive === undefined ? "" : value.isActive ? "true" : "false"
        }
        sx={{ minWidth: 160 }}
        onChange={(e) =>
          onChange({
            ...value,
            isActive:
              e.target.value === "" ? undefined : e.target.value === "true",
          })
        }
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="true">Active</MenuItem>
        <MenuItem value="false">Inactive</MenuItem>
      </TextField>
    </Box>
  );
}
