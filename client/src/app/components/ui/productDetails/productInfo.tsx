import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../../../lib/db.json";
import { Product } from "../../../typings/product";

interface ButtonProps {
  title: string;
}

const Button: React.FC<ButtonProps> = ({ title }) => (
  <button
    aria-disabled={false}
    title={title}
    className={`flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-3 py-2 mb-4 text-sm ring-1 ring-transparent`}
  >
    {title}
  </button>
);

const ProductInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [productDetails, setProductDetails] = useState<Product | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = db.products.find((product) => product.id === id);
        if (product) {
          setProductDetails(product);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="basis-full lg:basis-2/6">
      {productDetails && (
        <div className="mb-6 flex flex-col border-b pb-6">
          <h1 className="mb-6 text-5xl font-medium">{productDetails.title}</h1>
          <div className="mr-auto w-auto rounded-full p-2 text-sm text-black">
            <p>
              <span className="ml-1 inline">
                {productDetails.description}, cel mai bun raport pret calitate
                doar la MobIon SRL
              </span>
            </p>
          </div>
        </div>
      )}
      <dl className="mb-6">
        <dt className="flex flex-wrap gap-3 mb-4 text-sm tracking-wide items-center">
          <b className="uppercase">Disponibilitate:</b>
          {productDetails?.availableOnDemand ? (
            <p className="text-green-800 border-l-2">In Stock</p>
          ) : (
            <p className="text-red-800 border-l-2">Nu este disponibil</p>
          )}
        </dt>
        <dt className="mb-4 text-sm  tracking-wide">
          <b className="uppercase">Producator:</b> {productDetails?.provider}
        </dt>
        <dt className="mb-4 text-sm  tracking-wide">
          <b className="uppercase">Culori:</b> {productDetails?.color}
        </dt>
        <dt className="mb-4 text-sm  tracking-wide">
          <b className="uppercase">Marimea:</b> Latimea x Lungimea x Inaltimea
        </dt>
        {productDetails?.dimensions_with_price.map((product) => (
          <div key={product.id} className="flex flex-wrap gap-3">
            <dd className="flex flex-wrap gap-3">
              <Button
                title={`Art-${product.id.slice(
                  0,
                  4
                )}:  ${product.width.toString()} x ${product.length.toString()} x ${product.height.toString()}`}
              />
              <Button title={`${product.price} lei`} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default ProductInfo;
