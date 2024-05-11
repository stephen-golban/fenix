import React from "react";

import { useMount } from "react-use";
import { createTableColumns } from "./utils";
import { useNavigate } from "react-router-dom";
import useAxiosRequest from "../../../api/hooks";

import { Button, Table } from "antd";
import { TableActions } from "./parts";
import { PlusOutlined } from "@ant-design/icons";

import type { TableProps } from "antd";
import type { Category } from "../../../typings/categories";

const CategoriesScreen: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = React.useState<Array<Category>>();

  const refetch = async () => await call(undefined, setCategories);

  const [call, { loading }] = useAxiosRequest<Array<Category>>(
    "/categories",
    "get"
  );

  useMount(refetch);

  function handleAdd() {
    navigate("/categories/create");
  }

  const columns: TableProps<Category>["columns"] = createTableColumns(
    (data) => <TableActions data={data} onFinishAction={refetch} />
  );

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        <PlusOutlined /> Adauga o categorie
      </Button>
      <Table loading={loading} columns={columns} dataSource={categories} />
    </div>
  );
};

export { CategoriesScreen };
