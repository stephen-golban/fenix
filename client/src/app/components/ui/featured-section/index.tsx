import React from "react";
import girl from "../../../assets/girl.png";

const FeaturedSection: React.FC = () => {
  return (
    <section className="bg-pale-light py-12 md:py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-4 text-font">
        <div className="md:w-1/2 md:pr-8 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Înfrumusețează-ți spațiul
          </h2>
          <p className="text-lg sm:text-xl">
            Îmbunătățește-ți spațiul de locuit cu produsele noastre elegante și
            stilate. Colecția noastră este concepută pentru a aduce confort și
            frumusețe în casa ta.
          </p>
          <button className="bg-primary mt-6 text-white text-base font-bold py-3 px-7 rounded-full">
            MAI MULTE
          </button>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end">
          <img
            src={girl}
            alt="Înfrumusețează-ți spațiul"
            className="rounded-lg max-w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export { FeaturedSection };
