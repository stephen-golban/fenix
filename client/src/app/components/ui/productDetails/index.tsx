import { useState } from "react";
import RelatedProducts from "./relatedProducts";
import ProductImage from "./productImage";
import ProductInfo from "./productInfo";
import { useParams } from "react-router-dom";
import { Product } from "../../../typings";
import useAxiosRequest from "../../../api/hooks";
import { useMount } from "react-use";
import { Loader } from "../loader";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);

  const [call, { loading }] = useAxiosRequest<Product>(`/product/${id}`, "get");

  useMount(async () => await call(undefined, setProduct));

  if (loading || !product) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-4 md:p-12 lg:flex-row lg:gap-8">
        <ProductImage data={product!.photos} />
        <ProductInfo {...product!} />
      </div>
      <RelatedProducts {...product!} />
    </>
  );
};

export default ProductDetails;
