import { Link } from "react-router-dom";
import db from "../../../lib/db.json";
import { Grid } from "../../reusable";

const Carousel = () => {
  const products = db.products.filter((item) => item.description === "divan");

  if (!products?.length) return null;

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className=" w-full overflow-x-auto pb-10 pt-1">
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.id}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link
              to={`/product/${product.id}`}
              className="relative h-full w-full"
            >
              <Grid.Item.Tile
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.dimensions_with_price[0].price,
                }}
                src={product.photos[0].url}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export { Carousel };
