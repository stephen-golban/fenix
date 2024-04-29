import { noop } from "lodash";
import { ProductForm } from "../../../forms";
import { PRODUCTS_MOCK } from "../../../mocks/products";
import { useParams } from "react-router-dom";

const EditProductScreen = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <ProductForm
      onSubmit={noop}
      defaultValues={PRODUCTS_MOCK.find((item) => item.id === id)}
    />
  );
};

export { EditProductScreen };
