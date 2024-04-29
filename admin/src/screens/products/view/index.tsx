import { noop } from "lodash";
import { ProductForm } from "../../../forms";
import { PRODUCTS_MOCK } from "../../../mocks/products";

const ViewProductScreen = () => {
  return (
    <ProductForm onSubmit={noop} defaultValues={PRODUCTS_MOCK[0]} viewOnly />
  );
};

export { ViewProductScreen };
