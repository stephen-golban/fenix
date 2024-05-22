import React from "react";
import "./index.style.css";

interface Props {
  title: string;
  description: string;
  secondDescription: string;
}

const Banner: React.FC<Props> = ({ title, description, secondDescription }) => {
  return (
    <div id="banner" className="flex items-center justify-center">
      <div className="text text-center">
        <h1 className="text-white text-3xl sm:text-5xl lg:text-9xl">{title}</h1>
        <p className="text-white text-md sm:text-2xl lg:text-4xl mt-2 lg:mt-5">
          {description} <br />
          {secondDescription}
        </p>
      </div>
    </div>
  );
};

export { Banner };
