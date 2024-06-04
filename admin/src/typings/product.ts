import { UploadFile } from 'antd';
import { Category } from './categories';

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

export type ProductFormDefaultFieldValues = Pick<
  Product,
  'title' | 'availableOnDemand' | 'description' | 'provider' | 'categoryId' | 'colors'
> & {
  dimensions_with_price: Omit<DimensionsWithPrice, 'id' | 'productId'>[];
  photos: UploadFile[];
};
