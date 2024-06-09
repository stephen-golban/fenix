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
import { Category, Product } from "../../typings";
import { RootLayout } from "../../components/layout";

const HomeModule: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);

  const [callProducts, { loading: loadingProducts }] = useAxiosRequest<
    Product[]
  >("/product", "get");
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
      <ProductSection data={products} />
    </RootLayout>
  );
};

export { HomeModule };
