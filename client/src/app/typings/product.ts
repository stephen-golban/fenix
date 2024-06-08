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

export type Product = {
  id: string;
  title: string;
  description: string;
  availableOnDemand: boolean;
  provider: string;
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
  width: number;
  length: number;
  height: number;
  price: number;
  productId: string;
};
