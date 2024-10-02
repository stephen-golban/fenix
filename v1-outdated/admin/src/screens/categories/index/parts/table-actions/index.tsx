import { useNavigate } from 'react-router-dom';
import useAxiosRequest from '../../../../../api/hooks';

import { Popconfirm, Space, Tooltip, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import type { Category } from '../../../../../typings/categories';

interface ITableActions {
  data: Category;
  onFinishAction(): void;
}

const TableActions: React.FC<ITableActions> = ({ data, onFinishAction }) => {
  const navigate = useNavigate();
  const [call, { loading }] = useAxiosRequest(`/categories/${data.id}`, 'delete');

  function onClickEdit() {
    navigate(`/categories/edit/${data.id}`, { state: data });
  }
  async function onClickDelete() {
    return await call(undefined, onFinishAction);
  }

  const renderPopConfirmText = () => (
    <div>
      <div>Sigur vrei sa elimini?</div>
      <b style={{ fontSize: 11, color: 'red' }}>Daca stergi o categorie, toate produsele acestei categorii vor fi sterse!</b>
    </div>
  );

  return (
    <Space size="middle">
      <Tooltip placement="top" title="Modifica">
        <Button onClick={onClickEdit}>
          <EditOutlined />
        </Button>
      </Tooltip>

      <Tooltip placement="top" title="Elimina">
        <Popconfirm okText="Da" cancelText="Nu" onConfirm={onClickDelete} title={renderPopConfirmText}>
          <Button loading={loading} danger>
            <DeleteOutlined />
          </Button>
        </Popconfirm>
      </Tooltip>
    </Space>
  );
};

export { TableActions };
