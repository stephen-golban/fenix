import { isEmpty } from "lodash";

import { FooterMenuItem } from "./menu-item";

const FooterMenu: React.FC<{ data: any[] }> = ({ data }) => {
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
