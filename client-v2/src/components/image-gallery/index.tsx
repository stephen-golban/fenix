"use client";

import React from "react";
import Image from "next/legacy/image";
import { urlForImage } from "@/sanity/lib/utils";

interface IImageGallery {
  images: any[];
}

const ImageGallery: React.FC<IImageGallery> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-full px-2 md:px-4 lg:px-0 lg:basis-1/3">
      <div className="relative aspect-square sm:aspect-video w-full max-h-[350px] sm:max-h-[450px] lg:max-h-[550px] overflow-hidden">
        {images.length > 0 && (
          <Image
            alt={`Product Image ${currentImageIndex}`}
            src={urlForImage(images[currentImageIndex])?.url() as string}
            layout="fill"
            priority
            objectFit="contain"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
        )}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center">
          <div className="mx-auto flex h-10 sm:h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur">
            <button
              aria-label="Previous product image"
              className="h-full px-4 sm:px-6 transition-all ease-in-out hover:scale-110 hover:text-black flex items-center justify-center"
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
                className="h-4 sm:h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                ></path>
              </svg>
            </button>
            <div className="mx-1 h-5 sm:h-6 w-px bg-neutral-500"></div>
            <button
              aria-label="Next product image"
              className="h-full px-4 sm:px-6 transition-all ease-in-out hover:scale-110 hover:text-black flex items-center justify-center"
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
                className="h-4 sm:h-5"
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

      <ul className="my-4 sm:my-8 lg:my-12 flex items-center justify-center gap-2 overflow-x-auto py-1 lg:mb-0">
        {images.map((image, index) => (
          <li
            key={index}
            className="h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0"
            onClick={() => setCurrentImageIndex(index)}
          >
            <a
              aria-label="Enlarge product image"
              className="h-full w-full block"
            >
              <div
                className={`group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border ${
                  currentImageIndex === index ? "border-primary" : "bg-white"
                } hover:border-primary border-2`}
              >
                <Image
                  alt={`Product Image ${index}`}
                  width={80}
                  height={80}
                  src={urlForImage(image)?.width(80).height(80).url() as string}
                  className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
                />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
