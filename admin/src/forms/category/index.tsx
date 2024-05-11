import React from "react";
import { Form, Input, Button } from "antd";

import type { Category, CategoryFormFields } from "../../typings/categories";

interface CategoryFormProps {
  loading?: boolean;
  onSubmit: (data: CategoryFormFields) => void;
  defaultValues?: CategoryFormFields;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  loading,
  onSubmit,
  defaultValues,
}) => {
  const [form] = Form.useForm<Category>();

  const handleFormSubmit = (data: CategoryFormFields) => {
    onSubmit(data);
    if (!defaultValues) {
      form.resetFields();
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      disabled={loading}
      onFinish={handleFormSubmit}
      initialValues={defaultValues}
    >
      <Form.Item
        name="title"
        label="Nume categorie"
        rules={[{ required: true, message: "Introduceti numele categorie" }]}
      >
        <Input placeholder="Nume categorie" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Salveaza
        </Button>
      </Form.Item>
    </Form>
  );
};

export { CategoryForm };
