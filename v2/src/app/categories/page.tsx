import React from "react";
import { CategoriesList } from "@/components";
import { categoriesCountQuery, categoriesQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";

export const dynamic = "force-dynamic";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const [data, totalCount] = await Promise.all([
    sanityFetch({
      query: categoriesQuery(searchParams, 12, "asc"),
    }),
    sanityFetch({ query: categoriesCountQuery(searchParams) }),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {searchParams?.name
          ? `Rezultate pentru "${searchParams.name}"`
          : "Toate Categoriile"}
      </h1>
      <CategoriesList
        limit={12}
        searchParams={searchParams}
        categories={data}
        totalCount={totalCount}
      />
    </div>
  );
}
