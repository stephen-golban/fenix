import React from "react";

import type { Product } from "../../../../typings/product";

const InfoDetails: React.FC<{ productDetails: Product }> = ({
  productDetails,
}) => (
  <div className="mb-6 flex flex-col border-b pb-6">
    <h1 className="mb-6 text-2xl md:text-3xl lg:text-5xl font-medium">
      {productDetails.title}
    </h1>
    <div className="mr-auto w-auto rounded-full p-2 pl-0 text-sm">
      <p>
        <span className="inline">{productDetails.description}</span>
      </p>
    </div>
  </div>
);

export default InfoDetails;
