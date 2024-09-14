import Image from "next/image";
import Link from "next/link";

import { isEmpty } from "lodash";
import { urlForImage } from "@/sanity/lib/utils";

import Pagination from "../pagination";
import { InfoIcon } from "lucide-react";
import { Badge, Card, CardContent, Alert, AlertDescription } from "../ui";

import type { Product } from "../../../sanity.types";

const ProductList = async ({
  data,
  limit = 8,
  searchParams,
}: {
  data?: Product[];
  searchParams?: any;
  limit?: number;
}) => {
  if (isEmpty(data) || !data) {
    return (
      <div className="flex justify-center items-center h-64">
        <Alert variant="default" className="max-w-md">
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            Nu există produse disponibile în această categorie. Vă rugăm să
            reveniți mai târziu sau să explorați alte categorii.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const paginationParams = {
    end: limit,
    start: searchParams?.page ? parseInt(searchParams.page) * limit : 0,
  };

  return (
    <>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.map((product) => {
          const title = product.title || "";
          const isTitleTooLong = title.length > 30;
          return (
            <Card
              key={product._id}
              className="relative overflow-hidden group transform transition-transform duration-300 hover:scale-105"
            >
              <CardContent className="p-0">
                <Link href={`/products/${product._id}`}>
                  <div className="relative">
                    <Image
                      className="object-cover"
                      alt={title}
                      title={title}
                      width={400}
                      height={200}
                      priority
                      src={
                        urlForImage(product.mainPhoto)
                          ?.width(400)
                          .height(200)
                          .url() as string
                      }
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between p-3 group-hover:bg-opacity-60 transition-opacity duration-300">
                      <Badge
                        className="self-end"
                        variant={
                          product.availableOnDemand
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {product.availableOnDemand ? "În stoc" : "Indisponibil"}
                      </Badge>
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                          <div className="text-white text-lg font-semibold truncate mr-2">
                            {product.title}
                          </div>
                          <div className="bg-primary text-white px-2 py-1 rounded-md text-xs font-semibold whitespace-nowrap">
                            {product.dimensions_with_price?.[0]?.price} MDL
                          </div>
                        </div>
                        {isTitleTooLong && (
                          <div className="text-white text-xs opacity-75 truncate mt-1">
                            {product.title}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="mt-6">
        <Pagination
          currentPage={Math.floor(paginationParams.start / limit)}
          hasPrev={paginationParams.start > 0}
          hasNext={data.length === limit}
        />
      </div>
    </>
  );
};

export default ProductList;
