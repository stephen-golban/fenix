import React from "react";

import Filter from "../../components/ui/filter";
import { ProductGrid } from "../../components/ui/product-grid";
import Sort from "../../components/ui/sort";

import { RootLayout } from "../../components/layout";
import useStoreModule from "./hooks";
import { isEmpty } from "lodash";

const CategoriesModule: React.FC = () => {
  const {
    categories,
    handleCategoryChange,
    handleSortChange,
    loading,
    products,
  } = useStoreModule();

  return (
    <RootLayout loading={loading}>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 py-4 text-font md:flex-row">
        <Filter
          categories={categories}
          onCategoryChange={handleCategoryChange}
        />
        {isEmpty(products) ? (
          <div className="flex items-center justify-center min-h-[70vh] w-full">
            Nu a fost gasit niciun produs :(
          </div>
        ) : (
          <div className="order-last min-h-screen w-full md:order-none">
            <div className="grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <ProductGrid data={products} />
            </div>
          </div>
        )}
        <Sort onSortChange={handleSortChange} />
      </div>
    </RootLayout>
  );
};

export { CategoriesModule };
