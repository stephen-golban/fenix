/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { createTableColumns } from './utils';
import { useNavigate } from 'react-router-dom';
import useAxiosRequest from '../../../api/hooks';
import { Button, Input, Table } from 'antd';
import { TableActions } from './parts';
import { PlusOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';

import type { TableProps } from 'antd';
import type { Product, ProductsApiResponse } from '../../../typings/product';
import { useMount } from 'react-use';

const ProductsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState('');
  const [products, setProducts] = React.useState<Product[]>([]);
  const [allProducts, setAllProducts] = React.useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize] = React.useState(10); // Fixed page size

  const [call, { loading }] = useAxiosRequest<ProductsApiResponse>('/product', 'get');

  const fetchProducts = async (page: number, limit: number) => {
    try {
      const response = await call(undefined, undefined, { additionalUrl: `?page=${page}&limit=${limit}` });
      setProducts(response?.data || []);
      setAllProducts(response?.data || []);
      setTotalProducts((response?.totalPages || 0) * limit);
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  };

  const refetch = () => {
    fetchProducts(currentPage, pageSize);
  };

  useMount(() => {
    fetchProducts(currentPage, pageSize);
  });

  const handleAdd = () => {
    navigate('/products/create');
  };

  const columns: TableProps<Product>['columns'] = createTableColumns(data => <TableActions data={data} onFinishAction={refetch} />);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    debounceSearch(value);
  };

  const debounceSearch = React.useCallback(
    debounce((value: string) => {
      if (value) {
        const filteredData = allProducts.filter(entry => entry.productCode.includes(value) || entry.title.includes(value));
        setProducts(filteredData);
      } else {
        setProducts(allProducts);
      }
    }, 300),
    [allProducts],
  );

  React.useEffect(() => {
    return () => {
      debounceSearch.cancel();
    };
  }, [debounceSearch]);

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    fetchProducts(pagination.current, pageSize);
  };

  return (
    <div>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: 20 }}>
        <Button onClick={handleAdd} type="primary">
          <PlusOutlined /> Adauga un produs
        </Button>
        <Input.Search
          allowClear
          size="large"
          value={query}
          onChange={handleInputChange}
          placeholder="Cauta produse dupa cod sau dupa titlu"
        />
      </div>
      <Table
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalProducts,
          showSizeChanger: false, // Size changer removed
        }}
        columns={columns}
        loading={loading}
        dataSource={products}
        onChange={handleTableChange}
        style={{ marginTop: 20 }}
        rowKey="id"
      />
    </div>
  );
};

export { ProductsScreen };
