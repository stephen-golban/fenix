import { useState } from 'react';
import useAxiosRequest from '../../../api/hooks';
import { Category } from '../../../typings/categories';
import { useMount } from 'react-use';
import { Product } from '../../../typings/product';

function useProductForm() {
  const [categories, setCategories] = useState<Array<Category>>([]);

  const [getCategories, { loading: loadingCategories }] = useAxiosRequest<Array<Category>>('/categories', 'get');

  useMount(async () => {
    return await getCategories(undefined, setCategories);
  });

  const prepareInitialValues = (input: Partial<Product>) => {
    return {
      title: input.title || '',
      colors: input.colors || [],
      provider: input.provider || '',
      categoryId: input.categoryId || '',
      description: input.description || '',
      material_type: input.material_type || '',
      availableOnDemand: input.availableOnDemand || false,
      dimensions_with_price: input.dimensions_with_price || [],
      photos: input.photos?.map(item => ({ uid: item.id, url: item.url, name: item.id })) || [],
    };
  };

  return {
    categories,
    loadingCategories,
    prepareInitialValues,
  };
}
export default useProductForm;
