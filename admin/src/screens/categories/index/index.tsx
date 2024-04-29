import React from "react";

import { createTableColumns, createTableData } from "./utils";

import { Button, Table } from "antd";
import { TableActions } from "./parts";
import { PlusOutlined } from "@ant-design/icons";

import type { TableProps } from "antd";
import type { Category } from "../../../typings/categories";
import { useNavigate } from "react-router-dom";

const columns: TableProps<Category>["columns"] = createTableColumns((id) => (
  <TableActions id={id} />
));

const CategoriesScreen: React.FC = () => {
  const navigate = useNavigate();
  function handleAdd() {
    navigate("/categories/create");
  }

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        <PlusOutlined /> Adauga o categorie
      </Button>
      <Table columns={columns} dataSource={createTableData()} />
    </div>
  );
};

export { CategoriesScreen };
