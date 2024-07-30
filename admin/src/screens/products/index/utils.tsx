import { Image, Space, TableColumnsType, Tag } from 'antd';
import type { Product } from '../../../typings/product';

const createTableColumns = (render: (record: Product) => JSX.Element): TableColumnsType<Product> => {
  return [
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id',
    },
    {
      key: 'title',
      title: 'Denumire',
      dataIndex: 'title',
    },
    {
      key: 'provider',
      title: 'Provider',
      dataIndex: 'provider',
    },
    {
      key: 'photos',
      title: 'Imagini',
      dataIndex: 'photos',
      render: (_, record) => {
        return (
          <Space>
            {record.photos.map((item, idx) => {
              return <Image key={item.id + item.url + idx} width={50} height={50} src={item.url} style={{ borderRadius: 5 }} />;
            })}
          </Space>
        );
      },
    },
    {
      key: 'availableOnDemand',
      title: 'Disponibilitate',
      dataIndex: 'availableOnDemand',
      render: (_value, record) => (
        <Tag color={record.availableOnDemand ? 'green' : 'red'}>{record.availableOnDemand ? 'Disponibil' : 'Indisponibil'}</Tag>
      ),
    },
    {
      key: 'colors',
      title: 'Culori',
      dataIndex: 'colors',
      render: (_value, record) => {
        return (
          <Space key={record.id}>
            {record.colors.map((color, idx) => (
              <div
                key={color + idx}
                style={{
                  backgroundColor: color.toLowerCase(),
                  width: 20,
                  height: 20,
                  borderRadius: 20,
                }}
              />
            ))}
          </Space>
        );
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
