import { notification } from "antd";
import useAxiosRequest from "../../../api/hooks";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { CategoryForm } from "../../../forms";

import type { CategoryFormFields } from "../../../typings/categories";

const EditCategoriesScreen = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams<{ id: string }>();

  const [update, { loading: loadingUpdate }] = useAxiosRequest(
    `/categories/${id}`,
    "put"
  );

  async function onSubmit(args: CategoryFormFields) {
    return await update(args, () => {
      notification.success({ message: "Categorie editata cu success!" });
      return navigate(-1);
    });
  }

  return (
    <CategoryForm
      onSubmit={onSubmit}
      defaultValues={state}
      loading={loadingUpdate}
    />
  );
};

export { EditCategoriesScreen };
