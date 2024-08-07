/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Image } from "antd";
import { Product } from "../../../typings";

interface IProductImage {
  data: Product["photos"];
}

const ProductImage: React.FC<IProductImage> = ({ data }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="h-full w-full basis-full lg:basis-1/3 px-2 md:px-0">
      <div className="relative aspect-video h-full max-h-[550px] w-full overflow-hidden">
        {data.length > 0 && (
          <Image
            alt={`Product Image ${data[currentImageIndex].id}`}
            decoding="async"
            data-nimg="fill"
            src={data[currentImageIndex].url}
            className="h-full w-full object-cover"
            sizes="(min-width: 1024px) 66vw, 100vw"
          />
        )}
        <div className="absolute bottom-2 flex w-full justify-center">
          <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur">
            <button
              aria-label="Previous product image"
              className="h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black flex items-center justify-center"
              onClick={prevImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
                className="h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                ></path>
              </svg>
            </button>
            <div className="mx-1 h-6 w-px bg-neutral-500"></div>
            <button
              aria-label="Next product image"
              className="h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black flex items-center justify-center"
              onClick={nextImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
                className="h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <ul className="my-12 flex items-center justify-center gap-2 overflow-auto py-1 lg:mb-0">
        {data.map((item, index) => (
          <li
            key={item.id}
            className="h-20 w-20"
            onClick={() => setCurrentImageIndex(index)}
          >
            <a aria-label="Enlarge product image" className="h-full w-full">
              <div
                className={`group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border ${
                  currentImageIndex === index ? "border-primary" : "bg-white"
                } hover:border-primary border-2`}
              >
                <Image
                  alt={`Product Image ${item.id}`}
                  loading="lazy"
                  width="80"
                  height="80"
                  decoding="async"
                  data-nimg="1"
                  className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105 color:transparent"
                  src={item.url}
                />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductImage;
