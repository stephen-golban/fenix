import React from "react";
import "./index.style.css";

const Hero: React.FC = () => {
  return (
    <section className="hero relative flex justify-center items-center h-[749px] bg-cover bg-center">
      <div className="relative z-10 p-6 md:p-12 bg-pale rounded-lg shadow-lg max-w-xl md:max-w-2xl md:text-left md:absolute md:right-60 font-medium mx-3 md:mx-0">
        <p className="text-xs md:text-sm text-font uppercase">Noua Apariție</p>
        <h1 className="text-2xl md:text-4xl font-bold text-primary mt-5">
          Descoperiți Noua Noastră Colecție
        </h1>
        <p className="text-sm md:text-base text-font my-4">
          Descoperiți noua noastră colecție, inspirată de cele mai recente
          tendințe în design interior.
        </p>
        <button className="mt-4 bg-primary text-white py-3 px-10 rounded-full shadow-lg uppercase">
          Vezi Acum
        </button>
      </div>
    </section>
  );
};

export { Hero };
