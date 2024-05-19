import { noop } from 'lodash';
import { ProductForm } from '../../../forms';
import { useParams } from 'react-router-dom';
import useAxiosRequest from '../../../api/hooks';
import { useState } from 'react';
import { Product } from '../../../typings/product';
import { useMount } from 'react-use';
import { Spin } from 'antd';

const EditProductScreen = () => {
  const { id } = useParams<{ id: string }>();
  const [call, { loading }] = useAxiosRequest(`/product/${id}`, 'get');
  const [product, setProduct] = useState<Product>();

  console.log('product', product);

  useMount(async () => await call(undefined, setProduct));

  if (loading && !product) {
    return <Spin />;
  }

  return <ProductForm onSubmit={noop} defaultValues={product} loading={loading} />;
};

export { EditProductScreen };
