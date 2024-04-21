import React from "react";

interface ButtonProps {
  title: string;
}

const Button: React.FC<ButtonProps> = ({ title }) => (
  <button
    aria-disabled="false"
    title={title}
    className={`flex min-w-[48px] items-center justify-center rounded-full border text-white  "bg-neutral-100"
    px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900 ring-1 ring-transparent`}
  >
    {title}
  </button>
);

const ProductInfo = () => {
  return (
    <div className="basis-full lg:basis-2/6">
      <div className="mb-12 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-6 text-5xl font-medium text-white">
          Acme Baby Onesie
        </h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <p>
            $10.00<span className="ml-1 inline">USD</span>
          </p>
        </div>
      </div>
      <dl className="mb-16">
        <dt className="mb-4 text-sm uppercase tracking-wide text-white">
          Size
        </dt>
        <dd className="flex flex-wrap gap-3">
          {["NB", "3M", "6M", "12M", "18M", "24M"].map((size) => (
            <Button key={size} title={size} />
          ))}
        </dd>
      </dl>
      <dl className="mb-16">
        <dt className="mb-4 text-sm uppercase tracking-wide  text-white">
          Color
        </dt>
        <dd className="flex flex-wrap gap-3">
          {["Black", "White", "Beige"].map((color) => (
            <Button key={color} title={color} />
          ))}
        </dd>
      </dl>

      <dl className="mb-16">
        <dt className="mb-4 text-sm uppercase tracking-wide  text-white">
          Cod Articol: 0001
        </dt>
      </dl>
    </div>
  );
};

export default ProductInfo;
