import { notification } from 'antd';
import useAxiosRequest from '../../../api/hooks';

import { ProductForm } from '../../../forms';
import { ProductFormDefaultFieldValues } from '../../../typings/product';

const CreateProductScreen = () => {
  const [call, { loading }] = useAxiosRequest('/product', 'post');

  async function onSubmit(args: ProductFormDefaultFieldValues) {
    const data = {
      ...args,
      photos: args.photos.map(item => item.url),
    };
    return await call(data, () => notification.success({ message: 'Produs adaugat cu success!' }));
  }
  return <ProductForm onSubmit={onSubmit} loading={loading} />;
};

export { CreateProductScreen };
