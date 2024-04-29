import { useNavigate } from "react-router-dom";
import { Popconfirm, Space, Tooltip } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface ITableActions {
  id: string;
}

const TableActions: React.FC<ITableActions> = ({ id }) => {
  const navigate = useNavigate();

  function onClickView() {
    navigate(`/products/view/${id}`);
  }
  function onClickEdit() {
    navigate(`/products/edit/${id}`);
  }
  function onClickDelete() {}

  return (
    <Space size="middle">
      <Tooltip placement="top" title="Vezi">
        <EyeOutlined onClick={onClickView} />
      </Tooltip>
      <Tooltip placement="top" title="Modifica">
        <EditOutlined onClick={onClickEdit} />
      </Tooltip>

      <Tooltip placement="top" title="Elimina">
        <Popconfirm
          okText="Da"
          cancelText="Nu"
          onConfirm={onClickDelete}
          title="Sigur vrei sa elimini?"
        >
          <DeleteOutlined onClick={onClickDelete} />
        </Popconfirm>
      </Tooltip>
    </Space>
  );
};

export { TableActions };
