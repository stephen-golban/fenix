import { Image, Space, TableColumnsType, Tag } from 'antd';
import type { Product } from '../../../typings/product';
import { PRODUCTS_MOCK } from '../../../mocks/products';

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
            {record.photos.map(item => {
              return <Image width={50} height={50} src={item.url} style={{ borderRadius: 5 }} />;
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
          <Space>
            {record.colors.map(color => (
              <div
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

const createTableData = (): Product[] => PRODUCTS_MOCK;

export { createTableColumns, createTableData };
