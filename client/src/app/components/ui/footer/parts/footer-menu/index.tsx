import { isEmpty } from "lodash";

import { FooterMenuItem } from "./menu-item";

import type { MenuItem } from "../../../../../typings";

const FooterMenu: React.FC<{ data: MenuItem[] }> = ({ data }) => {
  if (isEmpty(data)) return null;

  return (
    <nav>
      <ul>
        {data.map((item) => {
          return <FooterMenuItem key={item.title} item={item} />;
        })}
      </ul>
    </nav>
  );
};

export { FooterMenu };
