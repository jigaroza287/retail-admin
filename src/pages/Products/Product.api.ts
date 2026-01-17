import { Product } from "../../types/product";
import { ProductFormData } from "./Product.schema";

// ❗ Replace these later with Axios API calls

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
