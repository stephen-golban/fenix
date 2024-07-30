/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { FaFacebookF, FaPhone, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary py-12 pb-5 px-4 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-white">Fenix.</h3>
          <p className="text-white mt-4">
            Mobilierul nostru este creat conform cerințelor și așteptărilor
            dvs., dar și pe gustul întregii familii. Mai mult, el nu devine
            plictisitor odată cu trecerea anilor.
          </p>
          <p className="text-white mt-4">
            &copy; {currentYear} Fenix.md - All right reserved.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white">Cum ne găsești</h4>
          <ul className="mt-4 space-y-2 text-white">
            <li className="flex items-center space-x-2 hover:text-black">
              <FaFacebookF />
              <a className="hover:text-black">Facebook</a>
            </li>
            <li className="flex items-center space-x-2 hover:text-black">
              <FaInstagram />
              <a className="hover:text-black">Instagram</a>
            </li>
            <li className="flex items-center space-x-2 hover:text-black">
              <FaPhone />
              <a className="hover:text-black" href="tel:+37368898900">
                + (373) 688-98-900
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-center">
          <Link
            to="/about"
            className="text-lg font-semibold text-white hover:text-black"
          >
            Află despre noi
          </Link>
        </div>
      </div>
      <div className="mt-12 border-t pt-4 text-center text-white">
        <a href="#" className="mx-2 hover:text-black">
          Termeni și Condiții
        </a>
        <a href="#" className="mx-2 hover:text-black">
          Politica de Confidențialitate
        </a>
      </div>
    </footer>
  );
};

export { Footer };
