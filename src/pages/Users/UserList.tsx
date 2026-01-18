import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import type { User } from "../../types/user";
import type { UserFilters } from "./User.api";
import { fetchUsers, toggleUserStatus } from "./User.api";
import { UserRoleBadge } from "./UserRoles";

export default function UserList() {
  const qc = useQueryClient();

  const [filters, setFilters] = useState<UserFilters>({});

  const { data, isLoading } = useQuery<User[]>({
    queryKey: ["users", filters],
    queryFn: () => fetchUsers(filters),
  });

  const mutation = useMutation({
    mutationFn: (payload: { id: string; active: boolean }) =>
      toggleUserStatus(payload.id, payload.active),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        Users
      </Typography>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Role</InputLabel>
          <Select
            label="Role"
            value={filters.role ?? ""}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                role: e.target.value as User["role"],
              }))
            }
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="viewer">Viewer</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            value={
              filters.isActive === undefined
                ? ""
                : filters.isActive
                  ? "true"
                  : "false"
            }
            onChange={(e) => {
              const value = e.target.value;
              setFilters((prev) => ({
                ...prev,
                active: value === "true" ? true : false,
              }));
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="true">Active</MenuItem>
            <MenuItem value="false">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Paper sx={{ p: 2 }}>
        {isLoading ? (
          <Box sx={{ textAlign: "center", p: 4 }}>
            <Skeleton variant="rounded" height={240} />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <UserRoleBadge role={user.role} />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={user.isActive}
                      onChange={(e) =>
                        mutation.mutate({
                          id: user.id,
                          active: e.target.checked,
                        })
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Box>
  );
}
