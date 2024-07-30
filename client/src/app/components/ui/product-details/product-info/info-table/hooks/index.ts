import { useMemo } from "react";

import type { Product } from "../../../../../../typings";
import { isEmpty, isNaN } from "lodash";

const formatPriceToMDL = (price: number) => {
  return new Intl.NumberFormat("ro-MD", {
    style: "currency",
    currency: "MDL",
    currencyDisplay: "code",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

export const useProductOptions = (productDetails: Product) => {
  const options = useMemo(
    () =>
      productDetails?.dimensions_with_price
        .filter(
          (dimension) =>
            dimension.price !== undefined && dimension.price !== null
        )
        .map(
          ({
            id,
            length,
            width,
            height,
            diameter,
            thickness,
            external_width,
            internal_width,
            sleeping_space,
            price,
          }) => ({
            id,
            length,
            width,
            height,
            diameter,
            thickness,
            external_width,
            internal_width,
            sleeping_space,
            price,
          })
        ) || [],
    [productDetails]
  );

  const getAvailableColumns = (option: (typeof options)[0]) => {
    return {
      width: option.width !== null && option.width > 0,
      length: option.length !== null && option.length > 0,
      height: option.height !== null && option.height > 0,
      diameter: option.diameter !== null && option.diameter > 0,
      thickness: option.thickness !== null && option.thickness > 0,
      external_width:
        option.external_width !== null && option.external_width > 0,
      internal_width:
        option.internal_width !== null && option.internal_width > 0,
      sleeping_space: !isEmpty(option.sleeping_space),
      price: option.price !== null && option.price > 0,
    };
  };

  return { options, getAvailableColumns, formatPriceToMDL };
};
