import React from "react";
import { RootLayout } from "../../components/layout";
import { useParams } from "react-router-dom";
import useAxiosRequest from "../../api/hooks";
import { Product } from "../../typings";
import { useMount } from "react-use";
import { ProductImage, ProductInfo, ProductRelated } from "../../components/ui";
import { isEmpty } from "lodash";

const ProductModule = () => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = React.useState<Product>();
  const [products, setProducts] = React.useState<Product[]>([]);

  const [call, { loading: loadingProduct }] = useAxiosRequest<Product>(
    `/product/${id}`,
    "get"
  );
  const [callProducts, { loading: loadingProducts }] = useAxiosRequest<
    Product[]
  >("/product", "get");

  useMount(async () => {
    try {
      const [productResponse, productsResponse] = await Promise.all([
        call(),
        callProducts(),
      ]);
      if (productResponse) {
        setProduct(productResponse);
      }
      if (productsResponse) {
        setProducts(productsResponse);
      }
    } catch (error) {
      console.error("Failed to load products or product:", error);
    }
  });

  const loading = loadingProducts || loadingProduct;

  return (
    <RootLayout loading={loading || !product}>
      <div className="container mx-auto">
        <div className="flex flex-col md:p-12 lg:flex-row lg:gap-8">
          <ProductImage data={product?.photos || []} />
          <ProductInfo {...(product || ({} as Product))} />
        </div>
        {!isEmpty(products) && (
          <ProductRelated
            products={products}
            categoryId={product?.categoryId || ""}
          />
        )}
      </div>
    </RootLayout>
  );
};

export default ProductModule;
