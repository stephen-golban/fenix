import category from "./category";
import * as product from "./product";

export const schema = [
  product.productSchema,
  product.dimensionsWithPriceSchema,
  category,
];
