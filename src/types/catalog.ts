export interface Category {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  createdAt: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  size?: string | null;
  color?: string | null;
  sku: string;
  createdAt: string;
}

export interface ProductListItem {
  id: string;
  name: string;
  categoryName: string;
  variantCount: number;
  createdAt: string;
}
