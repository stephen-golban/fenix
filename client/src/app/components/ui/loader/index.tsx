import React from "react";
import { Triangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="w-full h-screen absolute bg-black/90 flex items-center justify-center">
      <Triangle
        visible={true}
        height="80"
        width="80"
        color="white"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export { Loader };
