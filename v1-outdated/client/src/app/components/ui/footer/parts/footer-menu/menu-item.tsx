import React from "react";

import clsx from "clsx";

import { Link, useLocation } from "react-router-dom";

import type { MenuItem } from "../../../../../typings";

interface IFooterMenuItem {
  item: MenuItem;
}

const FooterMenuItem: React.FC<IFooterMenuItem> = ({ item }) => {
  const { pathname } = useLocation();
  const dynamic_path = `categories/${item.id}`;
  const [active, setActive] = React.useState(pathname === dynamic_path);

  React.useEffect(() => {
    setActive(pathname === dynamic_path);
  }, [pathname, dynamic_path]);

  return (
    <li>
      <Link
        to={dynamic_path}
        className={clsx(
          "block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm",
          {
            "text-black": active,
          }
        )}
      >
        {item.title}
      </Link>
    </li>
  );
};

export { FooterMenuItem };
