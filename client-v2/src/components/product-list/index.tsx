import Image from "next/image";
import Link from "next/link";
import Pagination from "../pagination";

import { groq } from "next-sanity";
import { Badge, Card, CardContent, Alert, AlertDescription } from "../ui";
import { InfoIcon } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const PRODUCT_PER_PAGE = 8;

const ProductList = async ({
  categoryId = "",
  limit = PRODUCT_PER_PAGE,
  searchParams,
}: {
  categoryId?: string;
  limit?: number;
  searchParams?: any;
}) => {
  // Extract sort parameter from searchParams and validate it
  const sortOrder = (() => {
    switch (searchParams?.sort) {
      case "asc price":
        return "| order(dimensions_with_price[0].price asc)";
      case "desc price":
        return "| order(dimensions_with_price[0].price desc)";
      case "asc lastUpdated":
        return "| order(productCode asc)";
      case "desc lastUpdated":
        return "| order(productCode desc)";
      default:
        return ""; // No valid sort option; ignore the sort
    }
  })();

  // Extract availability parameter from searchParams
  const availabilityFilter = (() => {
    switch (searchParams?.availability) {
      case "inStock":
        return "&& availableOnDemand == true";
      case "outOfStock":
        return "&& availableOnDemand == false";
      default:
        return ""; // No availability filter
    }
  })();

  // Extract name filter from searchParams
  const nameFilter = searchParams?.name
    ? `&& title match "${searchParams.name}*"`
    : "";

  // Adjust pagination parameters
  const paginationParams = {
    start: searchParams?.page ? parseInt(searchParams.page) * limit : 0,
    end: limit,
  };

  // Combine the query with sorting, availability filtering, name filtering, and pagination
  const query = groq`*[_type == "product" ${
    categoryId
      ? `&& references(*[_type=="category" && _id == $categoryId]._id)`
      : ""
  } ${availabilityFilter} ${nameFilter}]{
      _id,
      title,
      mainPhoto {
        asset -> {
          url
        }
      },
      availableOnDemand,
      description,
      category -> {
        title
      },
      dimensions_with_price,
      productCode
    } ${sortOrder} [${paginationParams.start}...${paginationParams.start + paginationParams.end}]`;

  const res = await client.fetch(query, { categoryId, revalidate: 3600 });

  if (res.length === 0) {
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

  return (
    <>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {res.map((product: any) => {
          const isTitleTooLong = product.title.length > 30;
          return (
            <Card
              key={product._id}
              className="relative overflow-hidden group transform transition-transform duration-300 hover:scale-105"
            >
              <CardContent className="p-0">
                <Link href={`/products/${product._id}`}>
                  <div className="relative">
                    <Image
                      className="w-full h-48 object-cover"
                      alt={product.title}
                      title={product.title}
                      src={urlFor(product.mainPhoto).url()}
                      width={400}
                      height={192}
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
                            {product.dimensions_with_price[0]?.price} MDL
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
      {searchParams?.name && (
        <div className="mt-6">
          <Pagination
            currentPage={Math.floor(paginationParams.start / PRODUCT_PER_PAGE)}
            hasPrev={paginationParams.start > 0}
            hasNext={res.length === PRODUCT_PER_PAGE}
          />
        </div>
      )}
    </>
  );
};

export default ProductList;
