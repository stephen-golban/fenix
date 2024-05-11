import React from "react";

import { createTableColumns } from "./utils";
import { useNavigate } from "react-router-dom";
import useAxiosRequest from "../../../api/hooks";

import { Button, Table } from "antd";
import { TableActions } from "./parts";
import { PlusOutlined } from "@ant-design/icons";

import type { TableProps } from "antd";
import type { Product } from "../../../typings/product";

const ProductsScreen: React.FC = () => {
  const navigate = useNavigate();

  const [products, setProducts] = React.useState<Array<Product>>();

  const refetch = async () => await call(undefined, setProducts);

  const [call, { loading }] = useAxiosRequest<Array<Product>>(
    "/product",
    "get"
  );

  function handleAdd() {
    navigate("/products/create");
  }

  const columns: TableProps<Product>["columns"] = createTableColumns((data) => (
    <TableActions data={data} onFinishAction={refetch} />
  ));

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        <PlusOutlined /> Adauga un produs
      </Button>
      <Table columns={columns} loading={loading} dataSource={products} />
    </div>
  );
};

export { ProductsScreen };
