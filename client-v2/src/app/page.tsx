import {
  CategoriesList,
  FeaturedProducts,
  Hero,
  ProductList,
  Skeleton,
} from "@/components";

import { Button } from "@/components/ui";
import { ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const HomePage = () => {
  return (
    <div className="w-full">
      <Hero />
      <section className="bg-white py-8 sm:py-20 md:py-28 text-font flex flex-col justify-between">
        <div className="flex-grow flex flex-col items-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6">
            Colecția de Inspirație
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-center mt-2 sm:mt-4 mb-6 sm:mb-8 max-w-2xl">
            Inspirație și sortiment diversificat pentru confortul casei tale!
            Descoperă idei unice pentru fiecare colț al căminului tău.
          </p>
          <Button variant="link" asChild className="mb-8 sm:mb-12">
            <Link
              href="/products"
              className="flex items-center uppercase text-base sm:text-lg"
            >
              Catalogul de produse
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Link>
          </Button>
          <CategoriesList />
        </div>
      </section>
      <section className="py-16 md:py-32 bg-cover bg-center">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-4 text-font">
          <div className="w-full md:w-1/2 md:pr-8 text-center md:text-left bg-white/80 p-4 sm:p-6 md:p-8 rounded-lg backdrop-blur-sm mb-8 md:mb-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
              Înfrumusețează-ți spațiul
            </h2>
            <p className="text-base sm:text-lg md:text-xl">
              Îmbunătățește-ți spațiul de locuit cu produsele noastre elegante
              și stilate. Colecția noastră este concepută pentru a aduce confort
              și frumusețe în casa ta.
            </p>
            <Button variant="default" size="lg" className="mt-4 sm:mt-6">
              <span>MAI MULTE</span>
              <ChevronRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative">
              <Image
                src="/sofa-person.jpg"
                alt="Înfrumusețează-ți spațiul"
                width={500}
                height={300}
                className="rounded-lg max-w-full h-auto shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-primary text-white p-2 sm:p-4 rounded-full shadow-lg">
                <Sparkles className="h-4 w-4 sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-12 sm:mt-16 md:mt-24 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <Suspense fallback={<Skeleton />}>
          <FeaturedProducts />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
