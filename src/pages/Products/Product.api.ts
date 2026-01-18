import { Product } from "../../types/product";
import { PaginatedResult } from "../../utils/types";
import { ProductFormData } from "./Product.schema";

// ❗ Replace these later with Axios API calls

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Samsung Water Bottle",
    price: 299,
    inStock: true,
    description: "Steel bottle",
  },
  {
    id: "2",
    name: "iPhone Case",
    price: 499,
    inStock: false,
    description: "Black silicone",
  },
  {
    id: "3",
    name: "Office Chair",
    price: 8900,
    inStock: true,
    description: "Ergonomic design",
  },
];

interface FetchParams {
  search: string;
  page: number;
  limit: number;
}

export async function fetchProducts(
  params: FetchParams,
): Promise<PaginatedResult<Product>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 1. Search filter
      const searched = mockProducts.filter((p) =>
        p.name.toLowerCase().includes(params.search.toLowerCase()),
      );

      // 2. Pagination
      const start = (params.page - 1) * params.limit;
      const paginated = searched.slice(start, start + params.limit);

      resolve({
        data: paginated,
        total: searched.length,
        page: params.page,
        limit: params.limit,
      });
    }, 600);
  });
}

export async function createProduct(data: ProductFormData): Promise<Product> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        id: crypto.randomUUID(),
        ...data,
      });
    }, 800),
  );
}

export async function updateProduct(
  id: string,
  data: ProductFormData,
): Promise<Product> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({ id, ...data });
    }, 800),
  );
}
