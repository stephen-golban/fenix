import { Grid } from "../../reusable";
import { Link } from "react-router-dom";

import type { Product } from "../../../typings";
import React from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const ProductGrid: React.FC<{ data: Product[] }> = React.memo(({ data }) => {
  React.useEffect(() => {
    Aos.init();
  }, []);
  return (
    <>
      {data.map((product) => {
        const thumbnail = product.photos[0]?.url || "";
        return (
          <Grid.Item
            key={product.id}
            className="animate-fadeIn"
            data-aos="zoom-in-up"
          >
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
                src={thumbnail}
                sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </Link>
          </Grid.Item>
        );
      })}
    </>
  );
});
export default ProductGrid;
