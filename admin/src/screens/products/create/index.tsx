import { notification } from 'antd';
import useAxiosRequest from '../../../api/hooks';

import { ProductForm } from '../../../forms';
import { ProductFormDefaultFieldValues } from '../../../typings/product';

const CreateProductScreen = () => {
  const [call, { loading }] = useAxiosRequest('/product', 'post');

  async function onSubmit(args: ProductFormDefaultFieldValues) {
    // const { colors, photos, ...rest } = args;
    // const data = {
    //   ...rest,
    //   color: colors[0],
    //   photos: photos.map((item: Photo) => item.url),
    // };
    // console.log(data);
    return await call(args, () => notification.success({ message: 'Produs adaugat cu success!' }));
  }
  return <ProductForm onSubmit={onSubmit} loading={loading} />;
};

export { CreateProductScreen };
