import React, { Suspense } from "react";
import Link from "next/link";
import { Card, CardContent, Alert, AlertDescription } from "@/components/ui";
import Image from "next/image";
import Skeleton from "@/components/skeleton";

import Pagination from "@/components/pagination";
import { InfoIcon } from "lucide-react";
import { urlForImage } from "@/sanity/lib/utils";

const CATEGORIES_PER_PAGE = 8;

const CategoriesList = ({
  categories,
  totalCount,
  searchParams,
  hasPagination = true,
  limit = CATEGORIES_PER_PAGE,
}: {
  hasPagination?: boolean;
  categories: any[];
  totalCount: number;
  searchParams?: any;
  limit?: number;
}) => {
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
                        width={500}
                        height={256}
                        priority
                        alt={category.title}
                        title={category.title}
                        src={
                          urlForImage(category.image)
                            ?.width(500)
                            .height(256)
                            .url() as string
                        }
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-60 transition-opacity duration-300">
                        <div className="text-white text-base xl:text-lg font-semibold text-center px-2 sm:px-4">
                          {category.title}
                          <span className="block mt-2 sm:mt-3 text-xs sm:text-sm font-medium bg-white/20 py-1 sm:py-2 px-2 sm:px-4 rounded-full">
                            Vezi mai mult
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          {hasPagination && (
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
