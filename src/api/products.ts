import { api } from "./axios";
import { Product } from "../types/product";

export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get<Product[]>("/products");
  return res.data;
};
