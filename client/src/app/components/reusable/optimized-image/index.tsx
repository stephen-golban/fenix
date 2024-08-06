import React from "react";

import clsx from "clsx";
import { useInView } from "react-intersection-observer";

import { Img, type ImgProps } from "react-image";
import LoaderSpinner from "../../ui/loader-spinner";

const OptimizedImage: React.FC<ImgProps> = React.memo(
  ({ src, alt, sizes, srcSet, ...props }) => {
    const { ref } = useInView({
      triggerOnce: true,
      rootMargin: "200px",
    });

    const optimizeImage = (url: string, width: number, quality: number) => {
      return `${url}?w=${width}&q=${quality}&fm=webp`;
    };

    const optimizedSrcSet = `
      ${optimizeImage(src as string, 200, 50)} 200w,
      ${optimizeImage(src as string, 400, 50)} 400w,
      ${optimizeImage(src as string, 800, 50)} 800w
    `;

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      console.error("Failed to load image", e.currentTarget.src);
    };

    return (
      <div ref={ref}>
        <Img
          alt={alt}
          src={optimizeImage(src as string, 800, 50)}
          className={clsx("relative h-full w-full object-cover", {
            "transition duration-300 ease-in-out group-hover:scale-105": true,
          })}
          sizes={sizes}
          onError={handleError}
          srcSet={optimizedSrcSet}
          loader={<LoaderSpinner />}
          unloader={<div className="error">Failed to load image</div>}
          {...props}
        />
      </div>
    );
  }
);

export { OptimizedImage };
