import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "../../reusable";
import { Product } from "../../../typings";

interface IHeroItem {
  item: Product;
  size: "full" | "half";
  priority?: boolean;
}

const HeroItem: React.FC<IHeroItem> = ({ item, size }) => {
  return (
    <div
      className={
        size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }
    >
      <Link
        className="relative block aspect-square h-full w-full"
        to={`/product/${item.id}`}
      >
        <Grid.Item.Tile
          src={item.thumbnail}
          sizes={
            size === "full"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          fill
          alt={item.title}
          label={{
            position: size === "full" ? "center" : "bottom",
            title: item.title as string,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode,
          }}
        />
      </Link>
    </div>
  );
};
export { HeroItem };
