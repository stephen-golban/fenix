import React, { Suspense } from "react";
import { Filter, ProductList, Skeleton } from "@/components";

export const dynamic = "force-dynamic";

const ProductsPage = ({ searchParams }: { searchParams: any }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {searchParams?.name
          ? `Rezultate pentru "${searchParams.name}"`
          : "Toate Produsele"}
      </h1>
      <Filter />
      {/* PRODUSE */}
      <Suspense fallback={<Skeleton />}>
        <ProductList searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
