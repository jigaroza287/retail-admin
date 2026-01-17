import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Name is required"),
  price: z.number().min(0, "Price must be >= 0"),
  inStock: z.boolean(),
  description: z.string().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
