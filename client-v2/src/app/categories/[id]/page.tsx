import { Suspense } from "react";
import { Filter, ProductList, Skeleton } from "@/components";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  searchParams: any;
  params: { id: string };
}) {
  return (
    <>
      <Filter />
      {/* PRODUSE */}
      <Suspense fallback={<Skeleton />}>
        <ProductList
          searchParams={searchParams}
          categoryId={params.id || "00000000-000000-000000-000000000001"}
        />
      </Suspense>
    </>
  );
}
