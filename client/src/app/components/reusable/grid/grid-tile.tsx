import React from "react";

import clsx from "clsx";

import { Label } from "../label";
import { Img, type ImgProps } from "react-image";

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

const GridItemTile: React.FC<IGridItemTile> = ({
  isInteractive = true,
  active,
  label,
  fill,
  ...props
}) => {
  return (
    <div
      className={clsx(
        "group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-primary ",
        {
          relative: label,
          "border-2 border-primary": active,
          "border-neutral-200": !active,
        }
      )}
    >
      {props.src ? (
        // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is inherited from `props`, which is being enforced with TypeScript
        <Img
          className={clsx("relative h-full w-full object-cover", {
            "transition duration-300 ease-in-out group-hover:scale-105":
              isInteractive,
          })}
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
};

export { GridItemTile };
