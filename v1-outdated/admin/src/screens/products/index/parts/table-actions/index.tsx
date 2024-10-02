import { useNavigate } from 'react-router-dom';
import useAxiosRequest from '../../../../../api/hooks';

import { Button, Popconfirm, Space, Tooltip } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import type { Product } from '../../../../../typings/product';

interface ITableActions {
  data: Product;
  onFinishAction(): void;
}

const TableActions: React.FC<ITableActions> = ({ data, onFinishAction }) => {
  const navigate = useNavigate();
  const [call, { loading }] = useAxiosRequest(`/product/${data.id}`, 'delete');

  function onClickView() {
    navigate(`/products/view/${data.id}`, { state: data });
  }
  function onClickEdit() {
    navigate(`/products/edit/${data.id}`, { state: data });
  }
  async function onClickDelete() {
    return await call(undefined, onFinishAction);
  }

  return (
    <Space size="middle">
      <Tooltip placement="top" title="Vezi">
        <Button onClick={onClickView}>
          <EyeOutlined />
        </Button>
      </Tooltip>
      <Tooltip placement="top" title="Modifica">
        <Button onClick={onClickEdit}>
          <EditOutlined />
        </Button>
      </Tooltip>

      <Tooltip placement="top" title="Elimina">
        <Popconfirm okText="Da" cancelText="Nu" onConfirm={onClickDelete} title="Sigur vrei sa elimini?">
          <Button danger loading={loading}>
            <DeleteOutlined />
          </Button>
        </Popconfirm>
      </Tooltip>
    </Space>
  );
};

export { TableActions };
