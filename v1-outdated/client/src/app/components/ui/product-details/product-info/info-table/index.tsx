import React from "react";
import OptionTable from "./Option.Table";
import { useProductOptions } from "./hooks";
import type { Product } from "../../../../../typings/product";

const InfoTable: React.FC<{ productDetails: Product }> = ({
  productDetails,
}) => {
  const { options, getAvailableColumns, formatPriceToMDL } =
    useProductOptions(productDetails);

  return (
    <div className="mb-6">
      <h2 className="mb-4 text-sm tracking-wide uppercase font-bold">
        Dimensiuni disponibile:
      </h2>
      <div className="space-y-4">
        {options.map((option, index) => (
          <OptionTable
            key={option.id}
            option={option}
            index={index}
            getAvailableColumns={getAvailableColumns}
            formatPriceToMDL={formatPriceToMDL}
          />
        ))}
      </div>
    </div>
  );
};

export default InfoTable;
