import { Image, Space, TableColumnsType, Tag } from 'antd';
import type { Product } from '../../../typings/product';
import { isEmpty } from 'lodash';

const createTableColumns = (render: (record: Product) => JSX.Element): TableColumnsType<Product> => {
  return [
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'productCode',
      sorter: (a: Product, b: Product) => {
        const numA = parseInt(a.productCode, 10);
        const numB = parseInt(b.productCode, 10);
        return numA - numB;
      },
      defaultSortOrder: 'ascend',
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
        const hasImage = !isEmpty(record.photos);

        const thumbnail = record.photos[0]?.url || '';
        const NoImg = require('../../../assets/no-img-available.jpeg');

        return <Space>{<Image width={50} height={50} src={hasImage ? thumbnail : NoImg} style={{ borderRadius: 5 }} />}</Space>;
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
