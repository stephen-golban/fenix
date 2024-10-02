import React from "react";
import clsx from "clsx";
import { Label } from "../label";
import { Img, type ImgProps } from "react-image";
import { useInView } from "react-intersection-observer";
import LoaderSpinner from "../../ui/loader-spinner";

interface IGridItemTile extends ImgProps {
  isInteractive?: boolean;
  fill?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: number;
    position?: "bottom" | "center";
  };
}

const GridItemTile: React.FC<IGridItemTile> = React.memo(
  ({
    isInteractive = true,
    active,
    label,
    fill,
    src,
    alt,
    sizes,
    srcSet,
    ...props
  }) => {
    const { ref, inView } = useInView({
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
      <div
        ref={ref}
        className={clsx(
          "group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-primary ",
          {
            relative: label,
            "border-2 border-primary": false,
            "border-neutral-200": true,
          }
        )}
      >
        {inView ? (
          <img
            src={optimizeImage(src as string, 800, 50)}
            alt={alt}
            className={clsx("relative h-full w-full object-cover", {
              "transition duration-300 ease-in-out group-hover:scale-105": true,
            })}
            sizes={sizes}
            srcSet={optimizedSrcSet}
            loader={<LoaderSpinner />}
            unloader={<div className="error">Failed to load image</div>}
            onError={handleError}
            {...props}
          />
        ) : null}
        {label ? (
          <Label
            title={label.title}
            amount={label.amount}
            position={label.position}
          />
        ) : null}
      </div>
    );
  }
);

export { GridItemTile };
