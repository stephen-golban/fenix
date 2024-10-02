import React from "react";

import { Link } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import type { Product } from "../../../typings";

interface ICarousel {
  data: Product[];
}

const Carousel: React.FC<ICarousel> = ({ data }) => {
  if (!data?.length) return null;

  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 240: 1, 350: 2, 750: 3, 900: 4 }}
    >
      <Masonry gutter="10px" columnsCount={4}>
        {[...data, ...data, ...data].map((product, index) => (
          <Link to={`/product/${product.id}`} key={index}>
            <img
              alt={product.title}
              className="w-full block rounded-md"
              src={product.photos[0].url}
            />
            {/* <div className=" text-font w-full">
              <h4 className="text-2xl font-semibold mb-1">{product.title}</h4>
              <p className="text-lg mb-1 text-paragraph">
                {product.description}
              </p>
              <p className="text-xl font-bold">
                {product.dimensions_with_price[0].price} MDL
              </p>
            </div> */}
          </Link>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};
export { Carousel };
