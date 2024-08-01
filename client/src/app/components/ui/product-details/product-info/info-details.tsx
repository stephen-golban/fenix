import React from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import type { Product } from "../../../../typings/product";

const InfoDetails: React.FC<{ productDetails: Product }> = ({
  productDetails,
}) => (
  <div className="mb-6 flex flex-col border-b pb-6">
    <h1 className="text-2xl md:text-3xl lg:text-5xl font-medium">
      {productDetails.title}
    </h1>
    <dt className="flex flex-wrap gap-3 text-sm tracking-wide items-center mt-2">
      <b className="uppercase">Cod produs:</b>
      <p className="text-red-700 text-xs font-bold">
        {productDetails.id.split("-")[0]}
      </p>
    </dt>
    <div className="rounded-full p-2 pl-0 text-sm mt-6">
      <ReactQuill
        style={{ width: "100%" }}
        readOnly
        theme="snow"
        value={productDetails.description}
      />
    </div>
  </div>
);

export default InfoDetails;
