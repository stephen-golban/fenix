import { notification } from "antd";
import useAxiosRequest from "../../../api/hooks";

import { CategoryForm } from "../../../forms";

import type { CategoryFormFields } from "../../../typings/categories";

const CreateCategoriesScreen = () => {
  const [call, { loading }] = useAxiosRequest("/categories", "post");

  async function onSubmit(args: CategoryFormFields) {
    return await call(args, () =>
      notification.success({ message: "Categorie adaugata cu success!" })
    );
  }

  return <CategoryForm onSubmit={onSubmit} loading={loading} />;
};

export { CreateCategoriesScreen };
