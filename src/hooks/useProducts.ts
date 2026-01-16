import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import { Product } from "../types/product";

export const useProducts = () =>
  useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: getProducts,
  });
