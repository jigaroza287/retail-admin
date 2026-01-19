import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  MenuItem,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Typography,
} from "@mui/material";

import { fetchUsers, updateUserRole, updateUserActive } from "../../api/users";
import type { User, UserRole } from "../../types/user";

import { PaginationControl } from "../../components/Table/PaginationControl";
import { FilterBar } from "../../components/Table/FilterBar";
import { UserFilters, UserFilterState } from "./UserFilters";

export default function UserList() {
  const qc = useQueryClient();

  const [filters, setFilters] = useState<UserFilterState>({
    search: "",
  });

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: ["users", filters, page, limit],
    queryFn: () =>
      fetchUsers({
        page,
        limit,
        search: filters.search,
        role: filters.role,
        active: filters.isActive,
      }),
  });

  const roleMutation = useMutation({
    mutationFn: (payload: { id: string; role: UserRole }) =>
      updateUserRole(payload.id, payload.role),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });

  const activeMutation = useMutation({
    mutationFn: (payload: { id: string; active: boolean }) =>
      updateUserActive(payload.id, payload.active),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        Users
      </Typography>

      <FilterBar>
        <UserFilters value={filters} onChange={setFilters} />
      </FilterBar>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading
              ? null
              : data?.data.map((u: User) => (
                  <TableRow key={u.id}>
                    <TableCell>{u.name}</TableCell>
                    <TableCell>{u.email}</TableCell>

                    <TableCell>
                      <TextField
                        select
                        size="small"
                        value={u.role}
                        onChange={(e) =>
                          roleMutation.mutate({
                            id: u.id,
                            role: e.target.value as UserRole,
                          })
                        }
                      >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="manager">Manager</MenuItem>
                        <MenuItem value="viewer">Viewer</MenuItem>
                      </TextField>
                    </TableCell>

                    <TableCell>
                      <TextField
                        select
                        size="small"
                        value={u.isActive ? "true" : "false"}
                        onChange={(e) =>
                          activeMutation.mutate({
                            id: u.id,
                            active: e.target.value === "true",
                          })
                        }
                      >
                        <MenuItem value="true">Active</MenuItem>
                        <MenuItem value="false">Inactive</MenuItem>
                      </TextField>
                    </TableCell>

                    <TableCell>
                      {new Date(u.createdAt).toLocaleDateString()}
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
