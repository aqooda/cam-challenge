import products from '@/data/products.json';
import type { Product } from '@/types/models';

export const findProduct = (criteria: Partial<Product>) =>
  (products as Product[]).find((product) =>
    Object.entries(criteria).every(([key, value]) => product[key as keyof Product] === value),
  );
