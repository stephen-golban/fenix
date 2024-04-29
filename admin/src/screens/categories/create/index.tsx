import React from "react";
import { CategoryForm } from "../../../forms";
import { noop } from "lodash";

const CreateCategoriesScreen = () => {
  return <CategoryForm onSubmit={noop} />;
};

export { CreateCategoriesScreen };
