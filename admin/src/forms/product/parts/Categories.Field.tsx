import { Form, Select } from 'antd';
import React from 'react';
import { Control, Controller, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { Product } from '../../../typings/product';
import { Category } from '../../../typings/categories';

interface ICategoriesField {
  categories: Array<Category>;
  errors: FieldErrors<Product>;
  control: Control<Product, any>;
  setValue: UseFormSetValue<Product>;
}

const { Option } = Select;

const CategoriesField: React.FC<ICategoriesField> = ({ setValue, errors, control, categories }) => {
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
