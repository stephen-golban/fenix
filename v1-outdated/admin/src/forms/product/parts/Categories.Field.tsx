import React from 'react';

import { Form, Select } from 'antd';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import type { Category } from '../../../typings/categories';
import type { ProductFormDefaultFieldValues } from '../../../typings/product';

interface ICategoriesField {
  categories: Array<Category>;
  errors: FieldErrors<ProductFormDefaultFieldValues>;
  control: Control<ProductFormDefaultFieldValues, any>;
}

const { Option } = Select;

const CategoriesField: React.FC<ICategoriesField> = ({ errors, control, categories }) => {
  return (
    <Form.Item label="Categorie" required help={errors.categoryId?.message} validateStatus={errors.categoryId ? 'error' : ''}>
      <Controller
        name="categoryId"
        control={control}
        render={({ field }) => {
          return (
            <Select {...field} placeholder="Selectați o categorie">
              {categories.map(category => (
                <Option key={category.id} value={category.id}>
                  {category.title}
                </Option>
              ))}
            </Select>
          );
        }}
        rules={{ required: 'Categoria este necesară' }}
      />
    </Form.Item>
  );
};

export { CategoriesField };
