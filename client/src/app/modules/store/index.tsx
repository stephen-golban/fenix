import React from "react";
import { RootLayout } from "../../components/layout";
import useStoreModule from "./hooks";
import { isEmpty } from "lodash";
import { Loader } from "../../components/ui";
import LoaderSpinner from "../../components/ui/loader-spinner";

const Sort = React.lazy(() => import("../../components/ui/sort"));
const Filter = React.lazy(() => import("../../components/ui/filter"));
const ProductGrid = React.lazy(
  () => import("../../components/ui/product-grid/index")
);

const CategoriesModule: React.FC = () => {
  const {
    categories,
    handleCategoryChange,
    handleSortChange,
    loading,
    loadingMore,
    products,
    loadMore,
    hasMore,
  } = useStoreModule();

  return (
    <RootLayout loading={loading}>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 py-4 text-font md:flex-row">
        <React.Suspense fallback={<Loader />}>
          <Filter
            categories={categories}
            onCategoryChange={handleCategoryChange}
          />
          {isEmpty(products) ? (
            <div className="flex items-center justify-center min-h-[70vh] w-full">
              Nu a fost găsit niciun produs :(
            </div>
          ) : (
            <div className="order-last min-h-screen w-full md:order-none">
              <div className="grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <ProductGrid data={products} />
              </div>

              {hasMore && (
                <div className="flex justify-center mt-4">
                  <button
                    className="px-4 py-2 bg-primary text-white rounded"
                    onClick={loadMore}
                    disabled={loadingMore}
                  >
                    {loadingMore ? <LoaderSpinner /> : "Încarcă mai multe"}
                  </button>
                </div>
              )}
            </div>
          )}
          <Sort onSortChange={handleSortChange} />
        </React.Suspense>
      </div>
    </RootLayout>
  );
};

export { CategoriesModule };
