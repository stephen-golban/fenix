import React, { Suspense } from "react";
import { Banner, Carousel, CategoriesGrid, Loader } from "../../components/ui";
import useAxiosRequest from "../../api/hooks";
import { useMount } from "react-use";
import { LoadingModule } from "../loading";
import { Category } from "../../typings";

const HomeModule: React.FC = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);

  const [call, { loading }] = useAxiosRequest<Category[]>("/categories", "get");

  console.log(categories);

  useMount(async () => await call(undefined, setCategories));

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Banner
        title="Mobilier autohton"
        description="Inspirație și sortiment diversificat pentru"
        secondDescription="confortul casei tale!"
      />
      <CategoriesGrid data={categories} />
      {/* <Hero products={db.products} /> */}
      <div className="container mx-auto px-4">
        <div className="py-12">
          <h2 className="text-3xl font-bold text-center">Produse autohtone</h2>
          <p className="text-md text-center my-4">
            Inspirație și sortiment diversificat pentru Confortul casei tale!
          </p>
        </div>
      </div>

      <Suspense fallback={<LoadingModule />}>
        <Carousel />
      </Suspense>
    </>
  );
};

export { HomeModule };
