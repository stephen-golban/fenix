import { Product } from "./product";

export type Category = {
  id: string;
  title: string;
  description: Array<Product>;
};

export type MenuItem = Omit<Category, "description">;
