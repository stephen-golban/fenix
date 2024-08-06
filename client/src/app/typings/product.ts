import { Category } from "./category";

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type Money = {
  amount: string;
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};

export type ProductsApiResponse = {
  count: number;
  limit: number;
  page: number;
  totalPages: number;
  data: Product[];
};

export type Product = {
  id: string;
  title: string;
  description: string;
  availableOnDemand: boolean;
  provider: string;
  productCode: string;
  material_type?: string;
  photos: Photo[];
  dimensions_with_price: DimensionsWithPrice[];
  categoryId: string;
  category: Category;
  colors: string[];
};

export type Photo = {
  id?: string;
  url: string;
  productId?: string;
};

export type DimensionsWithPrice = {
  id: string;
  length: number;
  extension: number;
  width: number;
  depth: number;
  height: number;
  diameter: number;
  thickness: number;
  sleeping_space: string; // Format: 'width x length'
  external_width: number;
  internal_width: number;
  price: number;
  productId: string;
};
