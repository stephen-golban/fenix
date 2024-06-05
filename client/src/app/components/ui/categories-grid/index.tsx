import React from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Category } from "../../../typings";

interface ICategoriesGrid {
  data: Category[];
}

const CategoriesGrid: React.FC<ICategoriesGrid> = ({ data }) => {
  React.useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="bg-white text-gray-700">
      <div className="container mx-auto px-4">
        <div className="py-12">
          <h2 className="text-3xl font-bold text-center">Mobilier autohton</h2>
          <p className="text-md text-center my-4">
            Inspirație și sortiment diversificat pentru Confortul casei tale!
          </p>
          <div className="flex justify-center">
            <a
              href="https://confort.md/ro/catalog-produse"
              className="flex text-black font-semibold self-center opacity-80 uppercase hover:opacity-100 transition-opacity items-center"
            >
              Catalogul de produse
              <ChevronRightIcon
                className="w-4 h-4 font-bold ml-2"
                strokeWidth={2}
              />
            </a>
          </div>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((category) => (
            <li key={category.id} className="relative" data-aos="zoom-in-up">
              <a href={category.id} className="block rounded-lg">
                <img
                  className="w-full h-48 object-cover rounded-lg"
                  alt={category.title}
                  title={category.title}
                  src={category.image_url}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center hover:bg-opacity-75 transition-opacity duration-300 rounded-lg">
                  <div className="text-white text-lg font-semibold text-center px-2">
                    {category.title}
                    <span className="block mt-2 text-sm font-medium">
                      Vezi mai mult
                    </span>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
        <div className="text-center py-6">
          <img
            src="/tmp/transport_icon.png"
            alt="Livrare și asamblare gratuită"
          />
          <span className="block mt-2">
            Livrare și asamblare gratuită în raza orașului Chișinău
          </span>
        </div>
      </div>
    </div>
  );
};

export { CategoriesGrid };
