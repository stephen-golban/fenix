import React, { useEffect } from 'react';
import { UploadBtn } from './upload-btn';
import { Form, Input, Button } from 'antd';

import type { Category, CategoryFormFields } from '../../typings/categories';
import { isEmpty } from 'lodash';

interface CategoryFormProps {
  loading?: boolean;
  onSubmit: (data: CategoryFormFields) => void;
  defaultValues?: CategoryFormFields;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ loading, onSubmit, defaultValues }) => {
  const [form] = Form.useForm<Category>();

  useEffect(() => {
    if (defaultValues) {
      form.setFieldsValue(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  const handleSubmit = (values: Category) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" disabled={loading} onFinish={handleSubmit} initialValues={defaultValues}>
      <Form.Item name="title" label="Nume categorie" rules={[{ required: true, message: 'Introduceți numele categoriei' }]}>
        <Input placeholder="Nume categorie" />
      </Form.Item>
      <Form.Item name="image_url" label="Fotografie" rules={[{ required: true, message: 'Vă rugăm să încărcați o fotografie' }]}>
        <UploadBtn isEditMode={!isEmpty(defaultValues)} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Salvează
        </Button>
      </Form.Item>
    </Form>
  );
};

export { CategoryForm };
