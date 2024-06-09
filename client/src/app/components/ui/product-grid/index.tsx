import { Grid } from "../../reusable";
import { Link } from "react-router-dom";

import type { Product } from "../../../typings";

const ProductGrid: React.FC<{ data: Product[] }> = ({ data }) => {
  return (
    <>
      {data.map((product) => (
        <Grid.Item key={product.id} className="animate-fadeIn">
          <Link
            to={`/product/${product.id}`}
            className="relative inline-block h-full w-full"
          >
            <Grid.Item.Tile
              alt={product.title}
              label={{
                title: product.title,
                amount: product.dimensions_with_price[0].price,
              }}
              src={product.photos[0].url}
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
};
export { ProductGrid };
