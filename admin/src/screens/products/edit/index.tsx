import { ProductForm } from '../../../forms';
import { useParams } from 'react-router-dom';
import useAxiosRequest from '../../../api/hooks';
import { useState } from 'react';
import { Product, ProductFormDefaultFieldValues } from '../../../typings/product';
import { useMount } from 'react-use';
import { Spin, notification } from 'antd';

const EditProductScreen = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>();

  const [call, { loading }] = useAxiosRequest(`/product/${id}`, 'get');
  const [update, { loading: updateLoading }] = useAxiosRequest(`/product/${id}`, 'patch');

  async function onSubmit(args: ProductFormDefaultFieldValues) {
    const data = {
      ...args,
      photos: args.photos.map(item => item.url),
    };
    return await update(data, () => notification.success({ message: 'Produs modificat cu success!' }));
  }

  useMount(async () => await call(undefined, setProduct));

  if (loading && !product) {
    return <Spin />;
  }

  return <ProductForm onSubmit={onSubmit} defaultValues={product} loading={updateLoading} />;
};

export { EditProductScreen };
