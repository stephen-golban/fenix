import React, { Suspense } from "react";
import { Carousel, Footer, Hero } from "../../components/ui";

import db from "../../lib/db.json";

const HomeModule: React.FC = () => {
  return (
    <>
      <Hero products={db.products} />
      <Suspense>
        <Carousel />
        <Footer />
      </Suspense>
    </>
  );
};

export { HomeModule };
