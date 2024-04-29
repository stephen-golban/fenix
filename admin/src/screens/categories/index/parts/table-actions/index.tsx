import { useNavigate } from "react-router-dom";

import { Popconfirm, Space, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface ITableActions {
  id: string;
}

const TableActions: React.FC<ITableActions> = ({ id }) => {
  const navigate = useNavigate();

  function onClickEdit() {
    navigate(`/categories/edit/${id}`);
  }
  function onClickDelete() {}

  const renderPopConfirmText = () => (
    <div>
      <div>Sigur vrei sa elimini?</div>
      <b style={{ fontSize: 11, color: "red" }}>
        Daca stergi o categorie, toate produsele acestei categorii vor fi
        sterse!
      </b>
    </div>
  );

  return (
    <Space size="middle">
      <Tooltip placement="top" title="Modifica">
        <EditOutlined onClick={onClickEdit} />
      </Tooltip>

      <Tooltip placement="top" title="Elimina">
        <Popconfirm
          okText="Da"
          cancelText="Nu"
          onConfirm={onClickDelete}
          title={renderPopConfirmText}
        >
          <DeleteOutlined onClick={onClickDelete} />
        </Popconfirm>
      </Tooltip>
    </Space>
  );
};

export { TableActions };
