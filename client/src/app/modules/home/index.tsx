import React, { Suspense } from "react";
import { Carousel, Hero } from "../../components/ui";

import db from "../../lib/db.json";

const HomeModule: React.FC = () => {
  return (
    <>
      <Hero products={db.products} />
      <Suspense>
        <Carousel />
      </Suspense>
    </>
  );
};

export { HomeModule };
