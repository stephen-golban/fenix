import React from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "./parts";

const Navbar: React.FC = () => {
  return (
    <nav className="flex flex-col md:flex-row items-center justify-between py-4 px-4 md:py-7 md:px-20 bg-white w-full">
      <Link
        to="/"
        aria-label="Home"
        className="mb-4 md:mb-0 text-2xl md:text-3xl font-bold text-primary"
      >
        Fenix.
      </Link>
      <div className="flex flex-col md:flex-row items-center gap-y-4 md:gap-y-0 gap-x-4 md:gap-x-14 w-full md:w-auto">
        <a
          href="tel:+37368898900"
          className="text-xs md:text-sm font-semibold hover:text-primary flex flex-row items-center gap-x-1"
          aria-label="Phone number"
        >
          <span>+(373)</span> <span>688-98-900</span>
        </a>
        <SearchBar />
      </div>
    </nav>
  );
};

export { Navbar };
