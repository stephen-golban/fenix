import { noop } from "lodash";
import { ProductForm } from "../../../forms";

const CreateProductScreen = () => {
  return <ProductForm onSubmit={noop} />;
};

export { CreateProductScreen };
