import React from "react";

import freeDelivery from "../../../assets/car.svg";
import quality from "../../../assets/trophy.png";
import authentic from "../../../assets/shield.png";

const Banner: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-pale-light py-8 px-4 md:px-32">
      <div className="flex flex-col md:flex-row items-center gap-x-4 mb-4 md:mb-0">
        <img src={freeDelivery} alt="Livrare Gratuită" className="h-10 w-10" />
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-primary">
            Livrare Gratuită
          </h3>
          <p className="text-gray-600">La comenzile peste 2500 MDL.</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-x-4 mb-4 md:mb-0">
        <img src={quality} alt="Calitate Înaltă" className="h-10 w-10" />
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-primary">
            Calitate Înaltă
          </h3>
          <p className="text-gray-600">Realizat din materiale de top.</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-x-4">
        <img src={authentic} alt="100% Autentic" className="h-10 w-10" />
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-primary">100% Autentic</h3>
          <p className="text-gray-600">Produse garantate originale.</p>
        </div>
      </div>
    </div>
  );
};

export { Banner };
