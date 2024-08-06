import React from "react";
import {
  Banner,
  CategoriesGrid,
  FeaturedSection,
  Hero,
  ProductSection,
} from "../../components/ui";
import useAxiosRequest from "../../api/hooks";
import { useMount } from "react-use";
import { Category, ProductsApiResponse } from "../../typings";
import { RootLayout } from "../../components/layout";

const HomeModule: React.FC = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [products, setProducts] = React.useState<ProductsApiResponse>();

  const [callProducts, { loading: loadingProducts }] =
    useAxiosRequest<ProductsApiResponse>("/product", "get");
  const [getCategories, { loading: loadingCategories }] = useAxiosRequest<
    Category[]
  >("/categories", "get");

  useMount(async () => {
    try {
      const [productResponse, categoryResponse] = await Promise.all([
        callProducts(),
        getCategories(),
      ]);
      if (productResponse) {
        setProducts(productResponse);
      }
      if (categoryResponse) {
        setCategories(categoryResponse);
      }
    } catch (error) {
      console.error("Failed to load products or categories:", error);
    }
  });

  const loading = loadingProducts || loadingCategories;

  return (
    <RootLayout loading={loading}>
      <Hero />
      <Banner />
      <CategoriesGrid data={categories} />
      <FeaturedSection />
      {products && <ProductSection {...products} />}
    </RootLayout>
  );
};

export { HomeModule };
