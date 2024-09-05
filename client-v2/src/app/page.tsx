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

const HomePage = () => {
  return (
    <div className="">
      <Hero />
      <section className="bg-white min-h-screen py-16 text-font flex flex-col justify-between">
        <div className="flex-grow flex flex-col items-center">
          <h2 className="text-4xl font-bold text-center mb-6">
            Colecția de Inspirație
          </h2>
          <p className="text-xl text-center mt-4 mb-8 max-w-2xl">
            Inspirație și sortiment diversificat pentru confortul casei tale!
            Descoperă idei unice pentru fiecare colț al căminului tău.
          </p>
          <Button variant="link" asChild className="mb-12">
            <Link
              href="/products"
              className="flex items-center uppercase text-lg"
            >
              Catalogul de produse
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
          <CategoriesList />
        </div>
      </section>
      <section className="py-8 md:py-16 bg-cover bg-center">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-4 text-font">
          <div className="md:w-1/2 md:pr-8 text-center md:text-left bg-white/80 p-8 rounded-lg backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Înfrumusețează-ți spațiul
            </h2>
            <p className="text-lg sm:text-xl">
              Îmbunătățește-ți spațiul de locuit cu produsele noastre elegante
              și stilate. Colecția noastră este concepută pentru a aduce confort
              și frumusețe în casa ta.
            </p>
            <Button variant="default" size="lg" className="mt-6">
              <span>MAI MULTE</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end">
            <div className="relative">
              <Image
                src="/sofa-person.jpg"
                alt="Înfrumusețează-ți spațiul"
                width={500}
                height={300}
                className="rounded-lg max-w-full h-auto shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary text-white p-4 rounded-full shadow-lg">
                <Sparkles className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <Suspense fallback={<Skeleton />}>
          <FeaturedProducts />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
