import { api } from "./axios";
import type { Category } from "../types/catalog";

export async function fetchCategories(): Promise<Category[]> {
  const res = await api.get("/admin/categories");
  return res.data.data;
}

export async function createCategory(payload: {
  name: string;
  parentId?: string | null;
}): Promise<Category> {
  const res = await api.post("/admin/categories", payload);
  return res.data.data;
}

export async function updateCategory(
  id: string,
  payload: { name: string; parentId?: string | null },
): Promise<Category> {
  const res = await api.put(`/admin/categories/${id}`, payload);
  return res.data.data;
}

export async function deleteCategory(id: string): Promise<void> {
  await api.delete(`/admin/categories/${id}`);
}
