import React from "react";

import clsx from "clsx";
import { GridItemTile } from "./grid-tile";

interface IGridItem extends React.FC<React.ComponentProps<"li">> {
  Tile: typeof GridItemTile;
}

const GridItem: IGridItem = ({ className, ...props }) => {
  return (
    <li
      {...props}
      className={clsx("aspect-square transition-opacity", className)}
    >
      {props.children}
    </li>
  );
};

GridItem.Tile = GridItemTile;

export { GridItem };
