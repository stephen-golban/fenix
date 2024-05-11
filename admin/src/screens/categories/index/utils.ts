import type { TableColumnsType } from "antd";
import type { Category } from "../../../typings/categories";

const createTableColumns = (
  render: (record: Category) => JSX.Element
): TableColumnsType<Category> => {
  return [
    {
      key: "id",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "title",
      title: "Categorie",
      dataIndex: "title",
    },
    {
      title: "Utilitati",
      key: "action",
      render: (_, record) => render(record),
    },
  ];
};

const createTableData = (): Category[] => [
  {
    id: "1",
    title: "John Brown",
  },
  {
    id: "2",
    title: "Jim Green",
  },
  {
    id: "3",
    title: "Joe Black",
  },
];

export { createTableColumns, createTableData };
