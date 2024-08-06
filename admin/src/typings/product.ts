import { UploadFile } from 'antd';
import { Category } from './categories';

export type Product = {
  id: string;
  title: string;
  description: string;
  material_type: string;
  productCode: string;
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

export type ProductFormDefaultFieldValues = Pick<
  Product,
  'title' | 'availableOnDemand' | 'description' | 'provider' | 'categoryId' | 'colors' | 'material_type'
> & {
  dimensions_with_price: Omit<DimensionsWithPrice, 'id' | 'productId'>[];
  photos: UploadFile[];
};
