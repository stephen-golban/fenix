import { noop } from 'lodash';
import { ProductForm } from '../../../forms';
import { useLocation } from 'react-router-dom';

const ViewProductScreen = () => {
  const { state } = useLocation();

  return <ProductForm onSubmit={noop} defaultValues={state} viewOnly />;
};

export { ViewProductScreen };
