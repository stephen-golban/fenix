/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { FaFacebookF, FaPhone, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
          <div className="mb-8 sm:mb-0">
            <h3 className="text-lg font-semibold text-white">Fenix.</h3>
            <p className="text-white mt-4 text-sm sm:text-base">
              Mobilierul nostru este creat conform cerințelor și așteptărilor
              dvs., dar și pe gustul întregii familii. Mai mult, el nu devine
              plictisitor odată cu trecerea anilor.
            </p>
            <p className="text-white mt-4 text-sm sm:text-base">
              &copy; {currentYear} Fenix.md - All right reserved.
            </p>
          </div>
          <div className="mb-8 sm:mb-0">
            <h4 className="text-lg font-semibold text-white">Cum ne găsești</h4>
            <ul className="mt-4 space-y-2 text-white">
              <li className="flex items-center space-x-2 hover:text-black">
                <FaFacebookF className="text-sm sm:text-base" />
                <a className="hover:text-black text-sm sm:text-base">
                  Facebook
                </a>
              </li>
              <li className="flex items-center space-x-2 hover:text-black">
                <FaInstagram className="text-sm sm:text-base" />
                <a className="hover:text-black text-sm sm:text-base">
                  Instagram
                </a>
              </li>
              <li className="flex items-center space-x-2 hover:text-black">
                <FaPhone className="text-sm sm:text-base" />
                <a
                  className="hover:text-black text-sm sm:text-base"
                  href="tel:+37368898900"
                >
                  + (373) 688-98-900
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-white/20 text-center text-white">
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <a href="#" className="hover:text-black text-sm sm:text-base">
              Termeni și Condiții
            </a>
            <a href="#" className="hover:text-black text-sm sm:text-base">
              Politica de Confidențialitate
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
