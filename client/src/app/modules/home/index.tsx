import React, { Suspense } from "react";
import { Banner, Carousel, CategoriesGrid, Hero } from "../../components/ui";

import db from "../../lib/db.json";

const categories = [
  {
    title: "Canapele",
    id: "canapele",
    imageUrl:
      "https://confort.md/image/cache/catalog/categories/Pagina%20principala/Untitled-1-min-576x324.jpg",
  },
  {
    title: "Colțare",
    id: "coltare",
    imageUrl:
      "https://confort.md/image/cache/catalog/categories/cat_colt_magazine_new-365x362.jpg",
  },
  {
    title: "Scaune și Mese",
    id: "scaune-si-mese",
    imageUrl:
      "https://confort.md/image/cache/catalog/categories/Pagina%20principala/cat_scaune_si_mese-363x403.jpg",
  },
  {
    title: "Seturi și fotolii",
    id: "seturi-si-fotolii",
    imageUrl:
      "https://confort.md/image/cache/catalog/categories/category_seturi-691x322.jpg",
  },
  {
    title: "Paturi și saltele",
    id: "paturi-si-saltele",
    imageUrl:
      "https://confort.md/image/cache/catalog/categories/Paturi%20si%20saltele_catalog-363x361.jpg",
  },
  {
    title: "Mobila pentru copii",
    id: "mobila-pentru-copii",
    imageUrl:
      "https://confort.md/image/cache/catalog/Mobila%20pentru%20copii/cat_mobila_pentru_copii-363x403.jpg",
  },
  {
    title: "Mobilier terasă și grădină",
    id: "mobilier-terasa-si-gradina",
    imageUrl:
      "https://confort.md/image/cache/catalog/categories/mag_terasa_gradina-545x318.jpg",
  },
  {
    title: "Mobilă corp",
    id: "mobila-corp",
    imageUrl:
      "https://confort.md/image/cache/catalog/categories/Pagina%20principala/Mobila%20Corp%20Site-576x324.jpg",
  },
];

const HomeModule: React.FC = () => {
  return (
    <>
      <Banner />
      <CategoriesGrid data={categories} />
      {/* <Hero products={db.products} /> */}
      <div className="container mx-auto px-4">
        <div className="py-12">
          <h2 className="text-3xl font-bold text-center">Produse autohtone</h2>
          <p className="text-md text-center my-4">
            Inspirație și sortiment diversificat pentru Confortul casei tale!
          </p>
        </div>
      </div>
      <Suspense>
        <Carousel />
      </Suspense>
    </>
  );
};

export { HomeModule };
