import React from "react";
import { CategoriesList } from "@/components";

const CategoriesPage = ({ searchParams }: { searchParams: any }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {searchParams?.name
          ? `Rezultate pentru "${searchParams.name}"`
          : "Toate Categoriile"}
      </h1>
      <CategoriesList searchParams={searchParams} />
    </div>
  );
};

export default CategoriesPage;
