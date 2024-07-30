import { Link } from "react-router-dom";
import { Product } from "../../../typings/product";
import React, { Suspense } from "react";
import { LoadingModule } from "../../../modules";
import { isEmpty } from "lodash";

interface RelatedProductProps {
  imgSrc: string;
  title: string;
  price: string;
  productId: string;
}

const RelatedProduct: React.FC<RelatedProductProps> = ({
  imgSrc,
  title,
  price,
  productId,
}) => {
  return (
    <li className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
      <Link className="relative h-full w-full" to={`/product/${productId}`}>
        <div className="related-products group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-primary relative border-neutral-200">
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
                {price} lei
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

const RelatedProducts: React.FC<{
  products: Product[];
  categoryId: string;
}> = ({ products, categoryId }) => {
  const relatedProductsData = products.filter(
    (product) => product?.category?.id === categoryId
  );
  if (isEmpty(relatedProductsData)) {
    return null;
  }

  return (
    <Suspense fallback={<LoadingModule />}>
      <div className="py-8">
        <h2 className="mb-4 text-2xl font-bold">Produse Asemănătoare</h2>
        <ul className="flex w-full gap-4 overflow-x-auto  pt-1">
          {relatedProductsData.slice(0, 4).map((product) => (
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
    </Suspense>
  );
};

export default RelatedProducts;
