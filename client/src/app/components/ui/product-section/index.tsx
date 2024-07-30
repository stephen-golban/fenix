/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from "react-router-dom";
import { Product } from "../../../typings";
import { useMediaQuery } from "react-responsive";

import Aos from "aos";
import "aos/dist/aos.css";

const ProductSection: React.FC<{ data: Product[] }> = ({ data }) => {
  const [preparedData, setPreparedData] = React.useState(data.slice(0, 12));

  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  React.useEffect(() => {
    if (isMobile) {
      setPreparedData(data.slice(0, 6));
    } else {
      setPreparedData(data.slice(0, 12));
    }
  }, [isMobile]);

  React.useEffect(() => {
    Aos.init();
  }, []);

  return (
    <section className="py-20 overflow-x-auto bg-white">
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
        </div>
        <div className="mt-12 px-5">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 240: 1, 350: 1, 450: 2, 750: 3, 900: 4 }}
          >
            <Masonry gutter="10px" columnsCount={4}>
              {preparedData.map((product, index) => (
                <Link
                  to={`/product/${product.id}`}
                  key={index}
                  className="relative group"
                  data-aos="zoom-in-up"
                >
                  <img
                    alt={product.title}
                    className="w-full block rounded-md"
                    src={product.photos[0].url}
                  />
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white w-full h-full absolute top-0 left-0 bg-black/30 flex items-center justify-center flex-col rounded-md">
                    <button className="bg-primary mt-6 text-white text-base font-bold py-3 px-7 rounded-full">
                      Vezi produsul
                    </button>
                  </div>
                </Link>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
    </section>
  );
};

export { ProductSection };
