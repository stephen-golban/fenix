import React from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Category } from "../../../typings";
import { Link } from "react-router-dom";

interface ICategoriesGrid {
  data: Category[];
}

const CategoriesGrid: React.FC<ICategoriesGrid> = ({ data }) => {
  React.useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="bg-white py-20 text-font flex items-center flex-col">
      <h2 className="text-3xl font-bold text-center">Colecția de Inspirație</h2>
      <p className="text-xl text-center mt-4">
        Inspirație și sortiment diversificat pentru confortul casei tale!
      </p>
      <div className="flex justify-center mt-4">
        <Link
          to="/categories"
          className="flex font-semibold self-center opacity-80 uppercase hover:opacity-100 transition-opacity items-center hover:text-primary/70"
        >
          Catalogul de produse
          <ChevronRightIcon
            className="w-4 h-4 font-bold ml-2"
            strokeWidth={2}
          />
        </Link>
      </div>
      <ul className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12 px-4 sm:px-0">
        {data.map((category) => (
          <li key={category.id} className="relative" data-aos="zoom-in-up">
            <Link to={`/categories/${category.id}`}>
              <div className="block rounded-lg">
                <img
                  className="w-full h-48 object-cover rounded-lg"
                  alt={category.title}
                  title={category.title}
                  src={category.image_url}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center hover:bg-opacity-75 transition-opacity duration-300 rounded-lg">
                  <div className="text-white text-lg font-semibold text-center px-2">
                    {category.title}
                    <span className="block mt-2 text-sm font-medium">
                      Vezi mai mult
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { CategoriesGrid };
