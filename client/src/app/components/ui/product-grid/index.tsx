import { Grid } from "../../reusable";
import { Link } from "react-router-dom";

import type { Product } from "../../../typings";

const ProductGridItems: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.id} className="animate-fadeIn">
          <Link
            className="relative inline-block h-full w-full"
            to={`/product/${product.id}`}
          >
            <Grid.Item.Tile
              alt={product.title}
              label={{
                title: product.title,
                amount: product.priceRange.maxVariantPrice.amount,
                currencyCode: product.priceRange.maxVariantPrice.currencyCode,
              }}
              src={product.thumbnail}
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
};
export { ProductGridItems };
