import React from "react";
import "./index.style.css";

const Banner = () => {
  return (
    <div id="banner" className="flex items-center justify-center">
      <div className="text text-center">
        <h1 className="text-white text-3xl sm:text-5xl lg:text-9xl">
          Mobilier autohton
        </h1>
        <p className="text-white text-md sm:text-2xl lg:text-4xl mt-2 lg:mt-5">
          Inspirație și sortiment diversificat pentru <br />
          confortul casei tale!
        </p>
      </div>
    </div>
  );
};

export { Banner };
