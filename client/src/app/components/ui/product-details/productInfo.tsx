import { Product } from "../../../typings/product";
import { Select } from "../../reusable";

const ProductInfo: React.FC<Product> = (productDetails) => {
  const options = productDetails?.dimensions_with_price.map(
    ({ id, ...label }) => {
      return {
        label,
        value: id,
      };
    }
  );

  return (
    <div className="basis-full lg:basis-3/6 text-font p-4 lg:p-8">
      {productDetails && (
        <div className="mb-6 flex flex-col border-b pb-6">
          <h1 className="mb-6 text-2xl md:text-3xl lg:text-5xl font-medium">
            {productDetails.title}
          </h1>
          <div className="mr-auto w-auto rounded-full p-2 pl-0 text-sm">
            <p>
              <span className="inline">{productDetails.description}</span>
            </p>
          </div>
        </div>
      )}
      <dl className="mb-6">
        <dt className="mb-4 text-sm tracking-wide">
          <b className="uppercase">Culori:</b>
          <div className="flex flex-row items-center mt-2 gap-2">
            {productDetails?.colors.map((item) => (
              <div
                key={item}
                className="w-7 h-7 rounded-full"
                style={{ backgroundColor: item }}
              />
            ))}
          </div>
        </dt>
        <dt className="flex flex-wrap gap-3 mb-4 text-sm tracking-wide items-center">
          <b className="uppercase">Disponibilitate:</b>
          {productDetails?.availableOnDemand ? (
            <p className="text-green-800">In Stock</p>
          ) : (
            <p className="text-red-800">Nu este disponibil</p>
          )}
        </dt>
        <dt className="mb-4 text-sm tracking-wide">
          <b className="uppercase">Producator:</b> {productDetails?.provider}
        </dt>
        <dt className="mb-4 text-sm tracking-wide">
          <b className="uppercase">Categorie:</b>{" "}
          {productDetails?.category.title}
        </dt>
        <dt className="mb-4 text-sm tracking-wide">
          {options && <Select label="Dimensiuni:" options={options} />}
        </dt>
      </dl>
    </div>
  );
};

export default ProductInfo;
