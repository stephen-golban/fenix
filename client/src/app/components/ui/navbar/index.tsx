import React from "react";
import { Link } from "react-router-dom";
import { LogoSquare } from "../../icons";
import { SearchBar } from "./parts";

const Navbar: React.FC = () => {
  return (
    <nav className="relative flex items-center justify-between p-4 px-6 pt-8">
      <div className="flex flex-wrap w-full items-center justify-between">
        <div className="flex flex-grow items-center flex-wrap lg:w-2/3 justify-center sm:justify-start sm:flex-row gap-y-2">
          <Link to="/" className="flex items-center justify-center w-auto mr-6">
            <LogoSquare />
            <div className="ml-2 flex-none text-lg font-bold text-neutral-500">
              Fenix
            </div>
          </Link>
          <a
            href="tel:+37368898900"
            className="text-neutral-500 underline-offset-4 hover:text-black hover:underline text-md flex items-center xs:ml-8 mt-0"
          >
            +(373) 688-98-900
          </a>
          <Link
            to="/about"
            className="flex items-center justify-center w-auto mr-6 ml-6"
          >
            <div className="ml-2 flex-none text-lg font-medium text-neutral-500  hover:text-black underline-offset-4 hover:underline">
              About
            </div>
          </Link>
        </div>
        <div className="flex justify-center w-full lg:w-1/3 mt-4 lg:mt-0">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
