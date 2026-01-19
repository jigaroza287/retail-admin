import { api } from "./axios";
import type { AuthUser } from "../auth/auth.types";

export async function login(
  email: string,
  password: string,
): Promise<AuthUser> {
  const res = await api.post("/admin/auth/login", { email, password });
  return res.data.data.user;
}

export async function fetchMe(): Promise<AuthUser> {
  const res = await api.get("/admin/auth/me");
  return res.data.data;
}

export async function logout(): Promise<void> {
  await api.post("/admin/auth/logout");
}
