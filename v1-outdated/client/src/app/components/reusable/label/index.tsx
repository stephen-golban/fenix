import React from "react";

import clsx from "clsx";

import { Price } from "../price";

interface ILabel {
  title: string;
  amount: number;
  position?: "bottom" | "center";
}

const Label: React.FC<ILabel> = ({ title, amount, position = "bottom" }) => {
  return (
    <div
      className={clsx(
        "absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label",
        {
          "lg:px-20 lg:pb-[35%]": position === "center",
        }
      )}
    >
      <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-font backdrop-blur-md">
        <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">
          {title}
        </h3>
        <Price
          className="flex-none rounded-full bg-primary p-2 text-white"
          amount={amount}
        />
      </div>
    </div>
  );
};

export { Label };
