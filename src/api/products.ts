import type { Product, ProductListItem } from "../types/catalog";
import { api } from "./axios";

export interface FetchProductsParams {
  search?: string;
  page: number;
  limit: number;
}

export interface PaginatedProducts {
  data: ProductListItem[];
  total: number;
  page: number;
  limit: number;
}

export async function fetchProducts(
  params: FetchProductsParams,
): Promise<PaginatedProducts> {
  const res = await api.get("/admin/products", { params });
  return res.data.data;
}

export async function createProduct(payload: {
  name: string;
  categoryId: string;
}): Promise<Product> {
  const res = await api.post("/admin/products", payload);
  return res.data.data;
}

export async function updateProduct(
  id: string,
  payload: { name: string; categoryId: string },
): Promise<Product> {
  const res = await api.put(`/admin/products/${id}`, payload);
  return res.data.data;
}

export async function deleteProduct(id: string): Promise<void> {
  await api.delete(`/admin/products/${id}`);
}
