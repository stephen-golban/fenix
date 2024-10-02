import React from "react";

import clsx from "clsx";
import { useRouter } from "next/router";
import Link from "next/link";

interface IFooterMenuItem {
  item: any;
}

const FooterMenuItem: React.FC<IFooterMenuItem> = ({ item }) => {
  const { pathname } = useRouter();
  const dynamic_path = `/categories/${item.id}`;
  const [active, setActive] = React.useState(pathname === dynamic_path);

  React.useEffect(() => {
    setActive(pathname === dynamic_path);
  }, [pathname, dynamic_path]);

  return (
    <li>
      <Link
        href={dynamic_path}
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
