import React from "react";
import { Form, Input, Button } from "antd";

import type { CategoryFormFields } from "../../typings/categories";

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
  const handleFormSubmit = (data: CategoryFormFields) => {
    onSubmit(data);
  };

  return (
    <Form onFinish={handleFormSubmit} initialValues={defaultValues}>
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
