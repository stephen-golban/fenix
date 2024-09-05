import React from "react";
import OptionTable from "./Option.Table";
import { useProductOptions } from "./hooks";

const InfoTable: React.FC<{ data: any }> = ({ data }) => {
  const { options, getAvailableColumns, formatPriceToMDL } =
    useProductOptions(data);

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">DIMENSIUNI DISPONIBILE:</h2>

      <div className="space-y-4">
        {options.map((option: any, index: number) => (
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
