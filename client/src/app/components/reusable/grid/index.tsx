import React from "react";

import clsx from "clsx";

import { GridItem } from "./grid-item";

interface IGrid extends React.FC<React.ComponentProps<"ul">> {
  Item: typeof GridItem;
}

const Grid: IGrid = ({ className, ...props }) => {
  return (
    <ul {...props} className={clsx("grid grid-flow-row gap-4", className)}>
      {props.children}
    </ul>
  );
};

Grid.Item = GridItem;

export { Grid };
