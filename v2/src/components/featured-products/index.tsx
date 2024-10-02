/* eslint-disable react-hooks/exhaustive-deps */

import React from "react";

import Link from "next/link";
import Image from "next/image";

import { urlForImage } from "@/sanity/lib/utils";

import { ChevronRight, InfoIcon } from "lucide-react";
import { Alert, AlertDescription, Button, Card, CardContent } from "../ui";

import type { Product } from "../../../sanity.types";

const FeaturedProducts: React.FC<{ products: Product[] | undefined }> = ({
  products,
}) => {
  if (products?.length === 0) {
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
    <section className="py-16 overflow-x-auto bg-white">
      <div className="container mx-auto text-font">
        <div className="text-center">
          <h3 className="text-3xl font-bold">
            Cateva dintre produsele noastre
          </h3>
          <p className="text-lg sm:text-xl mt-4">
            Fiecare piesă este creată cu grijă pentru detalii și un stil unic,
            aducând un plus de rafinament oricărui spațiu. Sunați-ne acum și
            transformați-vă casa într-un loc deosebit.
          </p>
          <Button variant="link" asChild className="mb-8 sm:mb-12 mt-5">
            <Link
              href="/products"
              className="flex items-center uppercase text-base sm:text-lg"
            >
              Vezi toate produsele
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Link>
          </Button>
        </div>
        <div className="px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products?.map((product, index: number) => {
              return (
                <Card key={index} className="relative group overflow-hidden">
                  <CardContent className="p-0">
                    <Link href={`/products/${product._id}`} className="block">
                      <Image
                        width={500}
                        height={300}
                        className="rounded-t-md"
                        alt={product.title || ""}
                        src={
                          urlForImage(product.mainPhoto)
                            ?.width(500)
                            .height(300)
                            .url() as string
                        }
                      />
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white absolute inset-0 bg-black/30 flex items-center justify-center flex-col rounded-md">
                        <Button variant="default" className="mt-6">
                          Vezi produsul
                        </Button>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
