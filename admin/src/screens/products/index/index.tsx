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
import type { Product } from '../../../typings/product';
import { useMount } from 'react-use';

const ProductsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState('');
  const [products, setProducts] = React.useState<Array<Product>>([]);
  const [allProducts, setAllProducts] = React.useState<Array<Product>>([]);

  const [call, { loading }] = useAxiosRequest<Array<Product>>('/product', 'get');

  const refetch = async () => {
    await call(undefined, res => {
      setProducts(res);
      setAllProducts(res);
    });
  };

  useMount(refetch);

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
        const filteredData = allProducts.filter(entry => entry.id.includes(value) || entry.title.includes(value));
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
      <Table columns={columns} loading={loading} dataSource={products} style={{ marginTop: 20 }} />
    </div>
  );
};

export { ProductsScreen };
