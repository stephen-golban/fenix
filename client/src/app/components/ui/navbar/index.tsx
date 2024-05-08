import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { LogoSquare } from "../../icons";
import { MobileMenu, SearchBar } from "./parts";
const { SITE_NAME } = process.env;

const Navbar: React.FC = () => {
  return (
    <>
      <nav className="relative flex items-center justify-between p-4 px-6">
        <div className="flex w-full items-center justify-between">
          <div className="flex w-2/3">
            <Link
              to="/"
              className=" flex  items-center justify-center w-auto mr-6"
            >
              <LogoSquare />
              <div className="ml-2 flex-none text-sm font-medium uppercase block">
                {SITE_NAME}
              </div>
            </Link>
            <ul className=" gap-8 text-lg flex items-end">
              <Link
                to={"/categories/"}
                className="text-neutral-500 underline-offset-4 hover:text-black hover:underline"
              >
                Catalog
              </Link>
            </ul>
          </div>
          <div className="justify-center flex w-1/3">
            <SearchBar />
          </div>
        </div>
      </nav>
    </>
  );
};

export { Navbar };
