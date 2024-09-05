import React, { Suspense } from "react";
import Link from "next/link";
import { Card, CardContent, Alert, AlertDescription } from "@/components/ui";
import Image from "next/image";
import Skeleton from "@/components/skeleton";

import DOMPurify from "isomorphic-dompurify";
import Pagination from "@/components/pagination";
import { InfoIcon } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const CATEGORIES_PER_PAGE = 8;

const CategoriesList = async ({
  searchParams,
  limit = CATEGORIES_PER_PAGE,
}: {
  searchParams?: any;
  limit?: number;
}) => {
  let categoryQuery = `*[_type == "category"]`;

  if (searchParams?.name) {
    categoryQuery += ` [title match "${searchParams.name}*"]`;
  }

  categoryQuery += ` [${searchParams?.page ? parseInt(searchParams.page) * limit : 0}...${
    searchParams?.page ? (parseInt(searchParams.page) + 1) * limit : limit
  }] {
    _id,
    "slug": slug.current,
    title,
    image,
  }`;

  const categories = await client.fetch(categoryQuery, { revalidate: 3600 });

  const totalCountQuery = searchParams?.name
    ? `count(*[_type == "category" && title match "${searchParams.name}*"])`
    : `count(*[_type == "category"])`;
  const totalCount = await client.fetch(totalCountQuery, { revalidate: 3600 });

  const currentPage = searchParams?.page ? parseInt(searchParams.page) : 0;
  const hasNext = (currentPage + 1) * limit < totalCount;
  const hasPrev = currentPage > 0;

  return (
    <Suspense fallback={<Skeleton />}>
      {categories.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <Alert variant="default" className="max-w-md">
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              Nu există categorii disponibile. Vă rugăm să reveniți mai târziu.
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        <>
          <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-0">
            {categories.map((category: any) => (
              <Card
                key={category._id}
                className="relative overflow-hidden group transform transition-transform duration-300 hover:scale-105"
              >
                <CardContent className="p-0">
                  <Link href={`/categories/${category._id}`}>
                    <div className="relative">
                      <Image
                        className="w-full h-64 object-cover"
                        alt={category.title}
                        title={category.title}
                        src={urlFor(category.image).url()}
                        width={500}
                        height={256}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-60 transition-opacity duration-300">
                        <div className="text-white text-xl font-semibold text-center px-4">
                          {category.title}
                          <span className="block mt-3 text-sm font-medium bg-white/20 py-2 px-4 rounded-full">
                            Vezi mai mult
                          </span>
                        </div>
                      </div>
                    </div>
                    {category.description && (
                      <div
                        className="text-sm text-gray-500 mt-2 px-4"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(category.description),
                        }}
                      ></div>
                    )}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          {searchParams?.name && (
            <Pagination
              currentPage={currentPage}
              hasPrev={hasPrev}
              hasNext={hasNext}
            />
          )}
        </>
      )}
    </Suspense>
  );
};

export default CategoriesList;
