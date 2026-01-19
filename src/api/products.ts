import { api } from "./axios";
import type { Product } from "../types/product";
import type { PaginatedResult } from "../utils/types";

export interface FetchProductsParams {
  search: string;
  page: number;
  limit: number;
}

export async function fetchProducts(
  params: FetchProductsParams,
): Promise<PaginatedResult<Product>> {
  const res = await api.get("/products", { params });
  return res.data;
}

export async function createProduct(data: Omit<Product, "id">) {
  const res = await api.post("/products", data);
  return res.data;
}

export async function updateProduct(id: string, data: Partial<Product>) {
  const res = await api.put(`/products/${id}`, data);
  return res.data;
}

export async function deleteProduct(id: string) {
  const res = await api.delete(`/products/${id}`);
  return res.data;
}
