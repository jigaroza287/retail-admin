import { api } from "./axios";
import type { User, UserRole } from "../types/user";

export interface FetchUsersParams {
  page: number;
  limit: number;
  search?: string;
  role?: UserRole;
  active?: boolean;
}

export interface PaginatedUsers {
  data: User[];
  total: number;
  page: number;
  limit: number;
}

export async function fetchUsers(
  params: FetchUsersParams,
): Promise<PaginatedUsers> {
  const res = await api.get("/admin/users", { params });
  return res.data.data;
}

export async function updateUserRole(
  id: string,
  role: UserRole,
): Promise<User> {
  const res = await api.patch(`/admin/users/${id}/role`, { role });
  return res.data.data;
}

export async function updateUserActive(
  id: string,
  active: boolean,
): Promise<User> {
  const res = await api.patch(`/admin/users/${id}/active`, { active });
  return res.data.data;
}
