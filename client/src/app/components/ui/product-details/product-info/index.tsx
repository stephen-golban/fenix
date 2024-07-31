import React from "react";

import InfoTable from "./info-table";
import InfoDetails from "./info-details";

import type { Product } from "../../../../typings";
import { Link } from "react-router-dom";

const ProductInfo: React.FC<Product> = (productDetails) => {
  return (
    <div className="basis-full lg:basis-3/6 text-font p-4 lg:p-8">
      {productDetails && (
        <>
          <InfoDetails productDetails={productDetails} />
          <dl className="mb-6">
            <dt className="mb-4 text-sm tracking-wide">
              <b className="uppercase">Disponibil in urmatoarele culori:</b>
              <div className="flex flex-row items-center mt-2 gap-2">
                {productDetails.colors.map((item) => (
                  <div
                    key={item}
                    className="w-7 h-7 rounded"
                    style={{ backgroundColor: item }}
                  />
                ))}
              </div>
            </dt>
            <dt className="flex flex-wrap gap-3 mb-4 text-sm tracking-wide items-center">
              <b className="uppercase">Tip material:</b>
              <p className=" font-semibold">{productDetails.material_type}</p>
            </dt>
            <dt className="flex flex-wrap gap-3 mb-4 text-sm tracking-wide items-center">
              <b className="uppercase">Disponibilitate:</b>
              {productDetails.availableOnDemand ? (
                <p className="text-green-800 font-semibold">Disponibil</p>
              ) : (
                <p className="text-red-800 font-semibold">Nu este disponibil</p>
              )}
            </dt>
            <dt className="mb-4 text-sm tracking-wide">
              <b className="uppercase">Categorie:</b>{" "}
              <Link
                to={`/categories/${productDetails.categoryId}`}
                className="font-semibold ml-2 underline hover:text-primary"
              >
                {productDetails.category.title}
              </Link>
            </dt>
          </dl>
          <InfoTable productDetails={productDetails} />
        </>
      )}
    </div>
  );
};

export default ProductInfo;
