import React from "react";

import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  ColorPicker,
  Space,
  Tooltip,
  Switch,
  Select,
  Upload,
  UploadProps,
  UploadFile,
} from "antd";

import type { Photo, Product } from "../../typings/product";
import { isEmpty } from "lodash";

interface ProductFormProps {
  loading?: boolean;
  viewOnly?: boolean;
  defaultValues?: Product;
  onSubmit: (data: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  loading,
  onSubmit,
  viewOnly,
  defaultValues,
}) => {
  const [form] = Form.useForm<Product>();
  const colors = Form.useWatch<string[]>("colors", { form });
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  const handleFormSubmit = (data: Product) => {
    onSubmit(data);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Form
      onFinish={console.log}
      initialValues={defaultValues}
      form={form}
      layout="vertical"
    >
      <Form.Item
        name="title"
        label="Nume produs"
        rules={[{ required: true, message: "Please enter product title" }]}
      >
        <Input placeholder="Nume produs" disabled={viewOnly} />
      </Form.Item>
      <Form.Item
        name="description"
        label="Descriere produs"
        rules={[
          { required: true, message: "Please enter product description" },
        ]}
      >
        <Input.TextArea placeholder="Descriere produs" disabled={viewOnly} />
      </Form.Item>
      <Form.Item
        label="Provider"
        name="provider"
        rules={[{ required: true, message: "Please enter product provider" }]}
      >
        <Input placeholder="Provider" disabled={viewOnly} />
      </Form.Item>
      <Form.Item
        label="Disponibilitate"
        name="availableOnDemand"
        valuePropName="checked"
        rules={[{ required: true, message: "Please enter product provider" }]}
      >
        <Switch
          disabled={viewOnly}
          checkedChildren="Disponibil"
          unCheckedChildren="Indisponibil"
        />
      </Form.Item>
      <Form.Item
        name="category"
        label="Categorie"
        rules={[{ required: true, message: "Please enter product provider" }]}
      >
        <Select
          disabled={viewOnly}
          fieldNames={{ value: "title" }}
          options={[
            { value: "jack", label: "Jack" },
            { value: "lucy", label: "Lucy" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "Electronics", label: "Electronics" },
          ]}
        />
      </Form.Item>
      {!isEmpty(colors) && (
        <Form.List name="colors">
          {(fields, { add, remove }) => (
            <Space style={{ columnGap: 30 }} wrap>
              {fields.map((field, index) => {
                const color = colors[index];
                return (
                  <Form.Item key={field.key}>
                    <Space>
                      <ColorPicker disabled={viewOnly} defaultValue={color} />
                      {!viewOnly && (
                        <Button
                          type="dashed"
                          size="small"
                          onClick={() => remove(index)}
                        >
                          <DeleteOutlined />
                        </Button>
                      )}
                    </Space>
                  </Form.Item>
                );
              })}
              <Form.Item>
                <Tooltip title="Mai adauga culori">
                  <Button
                    type="dashed"
                    onClick={add}
                    style={{ marginLeft: 20 }}
                  >
                    <PlusOutlined />
                  </Button>
                </Tooltip>
              </Form.Item>
            </Space>
          )}
        </Form.List>
      )}

      <Form.Item
        name="category"
        label="Categorie"
        valuePropName="fileList"
        getValueProps={(value: Photo) => ({ id: value.id, url: value.url })}
        rules={[{ required: true, message: "Please enter product provider" }]}
      >
        <Upload
          disabled={viewOnly}
          listType="picture-card"
          onChange={handleChange}
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        >
          {fileList.length >= 10 ? null : uploadButton}
        </Upload>
      </Form.Item>

      <Form.Item>
        {!viewOnly && (
          <Button type="primary" htmlType="submit" loading={loading}>
            Salveaza
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export { ProductForm };
