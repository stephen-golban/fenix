import { Image, type TableColumnsType } from 'antd';
import type { Category } from '../../../typings/categories';

const createTableColumns = (render: (record: Category) => JSX.Element): TableColumnsType<Category> => {
  return [
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id',
    },
    {
      key: 'title',
      title: 'Categorie',
      dataIndex: 'title',
      defaultSortOrder: 'ascend',
    },
    {
      key: 'image_url',
      title: 'Fotografie',
      dataIndex: 'image_url',
      render: (_, record) => {
        return <Image key={record.image_url} width={50} height={50} src={record.image_url} style={{ borderRadius: 5 }} />;
      },
    },
    {
      title: 'Utilitati',
      key: 'action',
      render: (_, record) => render(record),
    },
  ];
};

export { createTableColumns };
