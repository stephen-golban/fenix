import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import db from "../../../lib/db.json";

interface Product {
  id: string;
  url: string;
}

const ProductImage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [productImages, setProductImages] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = db.products.find((product) => product.id === id);
        if (product) {
          setProductImages(product.photos);
        }
      } catch (error) {
        console.error("Error fetching product images:", error);
      }
    };

    fetchData();
  }, [id]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="h-full w-full basis-full lg:basis-4/6">
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
        {productImages.length > 0 && (
          <img
            alt={`Product Image ${productImages[currentImageIndex].id}`}
            decoding="async"
            data-nimg="fill"
            className="h-full w-full object-contain"
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              color: "transparent",
            }}
            sizes="(min-width: 1024px) 66vw, 100vw"
            src={productImages[currentImageIndex].url}
          />
        )}
        <div className="absolute bottom-0 flex w-full justify-center">
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
        {productImages.map((item, index) => (
          <li
            key={item.id}
            className="h-20 w-20"
            onClick={() => setCurrentImageIndex(index)}
          >
            <a aria-label="Enlarge product image" className="h-full w-full">
              <div
                className={`group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border ${
                  currentImageIndex === index ? "border-blue-600" : "bg-white"
                } hover:border-blue-600 border-2`}
              >
                <img
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
