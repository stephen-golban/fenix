import React from "react";
import RelatedProducts from "./relatedProducts";
import ProductImage from "./productImage";
import ProductInfo from "./productInfo";

const ProductDetails = () => {
  return (
    <>
      <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8">
        <ProductImage />
        <ProductInfo />
      </div>
      <RelatedProducts />
    </>
  );
};

export default ProductDetails;
