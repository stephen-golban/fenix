import { Link } from "react-router-dom";
import { LogoSquare } from "../../icons";
import { MobileMenu, SearchBar } from "./parts";
import { isEmpty } from "lodash";
import db from "../../../lib/db.json";

const { SITE_NAME } = process.env;

const Navbar: React.FC = () => {
  const menu = db.collections;
  return (
    <>
      <nav className="relative flex items-center justify-between p-4 lg:px-6">
        <div className="block flex-none md:hidden">
          <MobileMenu data={menu} />
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
            {!isEmpty(menu) ? (
              <ul className="hidden gap-6 text-sm md:flex md:items-center">
                {menu.slice(0, 3).map((item) => (
                  <li key={item.title}>
                    <Link
                      to={`/categories/${item.id}`}
                      className="text-neutral-500 underline-offset-4 hover:text-black hover:underline"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="hidden justify-center md:flex md:w-1/3">
            <SearchBar />
          </div>
        </div>
      </nav>
    </>
  );
};
export { Navbar };
