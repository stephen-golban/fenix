import React from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import { LogoSquare } from "../../icons"
import { MobileMenu, SearchBar } from "./parts"
const { SITE_NAME } = process.env

const Navbar: React.FC = () => {
  return (
    <>
      <nav className="relative flex items-center justify-between p-4 lg:px-6">
        <div className="block flex-none md:hidden">
          <MobileMenu />
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex w-full md:w-1/3">
            <Link
              to="/"
              className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
            >
              <LogoSquare />
              <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
                {SITE_NAME}
              </div>
            </Link>
            <ul className="hidden gap-8 text-lg md:flex md:items-end">
              <Link
                to={"/categories/all"}
                className="text-neutral-500 underline-offset-4 hover:text-black hover:underline"
              >
                Catalog
              </Link>
            </ul>
          </div>
          <div className="hidden justify-center md:flex md:w-1/3">
            <SearchBar />
          </div>
        </div>
      </nav>
    </>
  )
}

export { Navbar }
