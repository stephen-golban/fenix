import React, { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import db from "../../../lib/db.json";
import { Product } from "../../../typings/product";

interface RelatedProductProps {
  imgSrc: string;
  title: string;
  price: string;
  productId: string;
}

const RelatedProduct: FC<RelatedProductProps> = ({
  imgSrc,
  title,
  price,
  productId,
}) => {
  return (
    <li className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
      <Link className="relative h-full w-full" to={`/product/${productId}`}>
        <div className="related-products group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 relative border-neutral-200">
          <img
            alt={title}
            loading="lazy"
            decoding="async"
            data-nimg="fill"
            className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
            sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
            src={imgSrc}
          />
          <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label">
            <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md">
              <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">
                {title}
              </h3>
              <p className="flex-none rounded-full bg-blue-600 p-2 text-white">
                {price}
                <span className="ml-1 inline hidden @[275px]/label:inline">
                  USD
                </span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

const RelatedProducts: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [productDetails, setProductDetails] = useState<Product | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = db.products.find((product) => product.id === id);
        if (product) {
          setProductDetails(product);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchData();
  }, [id]);

  const relatedProductsData = db.products.filter(
    (product) => product.description === productDetails?.description
  );

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProductsData.map((product) => (
          <RelatedProduct
            key={product.id}
            productId={product.id}
            imgSrc={product.photos[0].url}
            title={product.title}
            price={product.dimensions_with_price[0].price.toString()}
          />
        ))}
      </ul>
    </div>
  );
};

export default RelatedProducts;
