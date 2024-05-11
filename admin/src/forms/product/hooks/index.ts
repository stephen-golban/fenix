import { useState } from "react";
import useAxiosRequest from "../../../api/hooks";
import { Category } from "../../../typings/categories";
import { useMount } from "react-use";

function useProductForm() {
  const [categories, setCategories] = useState<Array<Category>>([]);

  const [getCategories, { loading: loadingCategories }] = useAxiosRequest<
    Array<Category>
  >("/categories", "get");

  useMount(async () => {
    return await getCategories(undefined, setCategories);
  });

  return {
    categories,
    loadingCategories,
  };
}
export default useProductForm;
