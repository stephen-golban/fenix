import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Filter from "../../components/ui/filter";
import { ProductGridItems } from "../../components/ui/product-grid";
import Sort from "../../components/ui/sort";
import db from "../../lib/db.json";
import { Product } from "../../typings/product";

const CategoriesModule: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<Product[]>(db.products);

  useEffect(() => {
    if (id !== undefined && id.trim() !== "") {
      const filteredProducts = db.products.filter((product) => {
        const lowerId = id.toLowerCase();
        const lowerTitle = product.title.toLowerCase();
        const matchesTitle = lowerTitle.includes(lowerId);
        const matchesDimensionId = product.dimensions_with_price.some((dim) =>
          dim.id.toLowerCase().includes(lowerId)
        );
        return matchesTitle || matchesDimensionId;
      });

      setProducts(filteredProducts);
    } else {
      setProducts(db.products);
    }
  }, [id]);

  const handleCategoryChange = (category: string | null) => {
    if (category === "all") {
      setProducts(db.products);
    } else {
      const filteredProducts = db.products.filter(
        (product) => product.category === category
      );
      setProducts(filteredProducts);
    }
  };

  const handleSortChange = (option: string) => {
    let sortedProducts = [...products];
    if (option === "Trending") {
      sortedProducts.sort((a, b) => {
        return Math.random() - 0.5;
      });
    } else if (option === "Price: Low to high") {
      sortedProducts.sort((a, b) => {
        return (
          Number(a.dimensions_with_price[0].price) -
          Number(b.dimensions_with_price[0].price)
        );
      });
    } else if (option === "Price: High to low") {
      sortedProducts.sort((a, b) => {
        return (
          Number(b.dimensions_with_price[0].price) -
          Number(a.dimensions_with_price[0].price)
        );
      });
    }
    setProducts(sortedProducts);
  };

  return (
    <Suspense>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-black">
        <Filter onCategoryChange={handleCategoryChange} />
        <div className="order-last min-h-screen w-full md:order-none">
          <div className="grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <ProductGridItems products={products} />
          </div>
        </div>
        <Sort onSortChange={handleSortChange} />
      </div>
    </Suspense>
  );
};

export { CategoriesModule };
