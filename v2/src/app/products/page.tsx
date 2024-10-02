import React from "react";
import { Filter, ProductList, Skeleton } from "@/components";
import { sanityFetch } from "@/sanity/lib/fetch";
import { productsQuery } from "@/sanity/lib/queries";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const data = await sanityFetch({
    query: productsQuery(searchParams?.categoryId, 16, searchParams),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {searchParams?.name
          ? `Rezultate pentru "${searchParams.name}"`
          : "Toate Produsele"}
      </h1>
      <Filter />
      {/* PRODUSE */}
      <React.Suspense fallback={<Skeleton />}>
        <ProductList data={data} limit={16} searchParams={searchParams} />
      </React.Suspense>
    </div>
  );
}
