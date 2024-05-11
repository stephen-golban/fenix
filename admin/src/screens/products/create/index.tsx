import { notification } from "antd";
import useAxiosRequest from "../../../api/hooks";

import { ProductForm } from "../../../forms";
import { Photo } from "../../../typings/product";

const CreateProductScreen = () => {
  const [call, { loading }] = useAxiosRequest("/product", "post");

  async function onSubmit(args: any) {
    const { colors, photos, ...rest } = args;
    const data = {
      ...rest,
      color: colors[0],
      photos: photos.map((item: Photo) => item.url),
    };
    console.log(data);
    return await call(data, () =>
      notification.success({ message: "Produs adaugat cu success!" })
    );
  }
  return <ProductForm onSubmit={onSubmit} loading={loading} />;
};

export { CreateProductScreen };
