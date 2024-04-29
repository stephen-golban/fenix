import React, { FC } from "react";

interface RelatedProductProps {
  href: string;
  imgSrc: string;
  title: string;
  price: string;
}

const RelatedProduct: FC<RelatedProductProps> = ({
  href,
  imgSrc,
  title,
  price,
}) => {
  return (
    <li className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
      <a className="relative h-full w-full" href={href}>
        <div className="related-products group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800">
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
            <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
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
      </a>
    </li>
  );
};

const RelatedProducts: FC = () => {
  const relatedProductsData = [
    {
      id: 1,
      href: "/product/acme-hoodie",
      imgSrc: "https://source.unsplash.com/random/800x800?summer&1",
      title: "Acme Hoodie",
      price: "$50.00",
    },
    {
      id: 2,
      href: "/product/acme-shirt",
      imgSrc: "https://source.unsplash.com/random/800x800?summer&2",
      title: "Acme Shirt",
      price: "$30.00",
    },
    {
      id: 3,
      href: "/product/acme-jeans",
      imgSrc: "https://source.unsplash.com/random/800x800?summer&3",
      title: "Acme Jeans",
      price: "$40.00",
    },
  ];

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProductsData.map((product) => (
          <RelatedProduct
            key={product.id}
            href={product.href}
            imgSrc={product.imgSrc}
            title={product.title}
            price={product.price}
          />
        ))}
      </ul>
    </div>
  );
};

export default RelatedProducts;
