import React from "react";

import { useNavigate } from "react-router-dom";
import { createTableColumns, createTableData } from "./utils";

import { Button, Table } from "antd";
import { TableActions } from "./parts";
import { PlusOutlined } from "@ant-design/icons";

import type { TableProps } from "antd";
import type { Product } from "../../../typings/product";

const columns: TableProps<Product>["columns"] = createTableColumns((id) => (
  <TableActions id={id} />
));

const ProductsScreen: React.FC = () => {
  const navigate = useNavigate();
  function handleAdd() {
    navigate("/products/create");
  }

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        <PlusOutlined /> Adauga un produs
      </Button>
      <Table columns={columns} dataSource={createTableData()} />
    </div>
  );
};

export { ProductsScreen };
