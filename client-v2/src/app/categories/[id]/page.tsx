import { Suspense } from "react";
import { Filter, ProductList, Skeleton } from "@/components";
import { productsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  searchParams: any;
  params: { id: string };
}) {
  const data = await sanityFetch({
    query: productsQuery(params.id, 8, searchParams),
    params: { categoryId: params.id },
  });
  return (
    <>
      <Filter />
      {/* PRODUSE */}
      <Suspense fallback={<Skeleton />}>
        <ProductList searchParams={searchParams} data={data} limit={8} />
      </Suspense>
    </>
  );
}
