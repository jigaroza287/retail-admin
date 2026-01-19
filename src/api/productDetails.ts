import type { ProductDetailResponse, ProductVariant } from "../types/catalog";
import { api } from "./axios";

export async function fetchProductDetail(
  id: string,
): Promise<ProductDetailResponse> {
  const res = await api.get(`/admin/products/${id}`);
  return res.data.data;
}

export async function createVariant(
  productId: string,
  payload: {
    size?: string | null;
    color?: string | null;
    sku: string;
  },
): Promise<ProductVariant> {
  const res = await api.post(`/admin/products/${productId}/variants`, payload);
  return res.data.data;
}

export async function updateVariant(
  variantId: string,
  payload: {
    size?: string | null;
    color?: string | null;
    sku: string;
  },
): Promise<ProductVariant> {
  const res = await api.put(`/admin/variants/${variantId}`, payload);
  return res.data.data;
}

export async function deleteVariant(variantId: string): Promise<void> {
  await api.delete(`/admin/variants/${variantId}`);
}
