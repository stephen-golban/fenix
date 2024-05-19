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
  const [defaultValue, setDefaultValue] = React.useState('');
  React.useEffect(() => {
    if (categories.length > 0 && !control._defaultValues.categoryId) {
      setDefaultValue(categories[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  return (
    <Form.Item label="Categorie" required help={errors.categoryId?.message} validateStatus={errors.categoryId ? 'error' : ''}>
      <Controller
        name="categoryId"
        control={control}
        render={({ field: { value, ...field } }) => {
          return (
            <Select {...field} placeholder="Selectați o categorie" value={value || defaultValue}>
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
