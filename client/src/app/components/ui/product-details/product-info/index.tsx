import React from "react";

import InfoTable from "./info-table";

import type { Product } from "../../../../typings";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";

const ProductInfo: React.FC<Product> = (productDetails) => {
  return (
    <div className="basis-full lg:basis-3/6 text-font p-4 lg:p-8">
      {productDetails && (
        <>
          <div className="mb-6 flex flex-col border-b pb-6">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-medium">
              {productDetails.title}
            </h1>
            <dt className="flex flex-wrap gap-3 text-sm tracking-wide items-center mt-2">
              <b className="uppercase">Cod produs:</b>
              <p className="text-red-700 text-xs font-bold">
                #{productDetails.productCode}
              </p>
            </dt>
          </div>

          <dl className="mb-6">
            <dt className="mb-4 text-sm tracking-wide">
              <b className="uppercase">Culori:</b>
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

            <dt className="flex flex-wrap gap-3 mb-4 text-sm tracking-wide items-center">
              <b className="uppercase">Tip material:</b>
              <p className=" font-semibold">{productDetails.material_type}</p>
            </dt>
            <InfoTable productDetails={productDetails} />

            <div className="rounded-full p-2 pl-0 text-sm mt-6">
              <ReactQuill
                style={{ width: "100%" }}
                readOnly
                theme="snow"
                value={productDetails.description}
              />
            </div>
          </dl>
        </>
      )}
    </div>
  );
};

export default ProductInfo;
