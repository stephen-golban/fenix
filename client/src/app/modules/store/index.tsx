import React, { useEffect } from "react";
import { RootLayout } from "../../components/layout";
import useStoreModule from "./hooks";
import { isEmpty } from "lodash";
import { Loader } from "../../components/ui";

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

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loadingMore
    )
      return;
    loadMore();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadingMore, hasMore]);

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
              Nu a fost gasit niciun produs :(
            </div>
          ) : (
            <div className="order-last min-h-screen w-full md:order-none">
              <div className="grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <ProductGrid data={products} />
              </div>
              {loadingMore && <div>Loading more products...</div>}
              {!hasMore && <div>No more products</div>}
            </div>
          )}
          <Sort onSortChange={handleSortChange} />
        </React.Suspense>
      </div>
    </RootLayout>
  );
};

export { CategoriesModule };
