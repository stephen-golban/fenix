import { HeroItem } from "./hero-item";

import type { Product } from "../../../typings";

interface IHero {
  products: Product[];
}

const Hero: React.FC<IHero> = ({ products }) => {
  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <HeroItem size="full" item={products[0]} priority={true} />
      <HeroItem size="half" item={products[1]} priority={true} />
      <HeroItem size="half" item={products[2]} />
    </section>
  );
};

export { Hero };
