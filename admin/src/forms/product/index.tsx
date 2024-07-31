import React from 'react';

import useProductForm from './hooks';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';

import { Form, Input, Button, Checkbox } from 'antd';
import { ColorsField, PhotosField, CategoriesField, DimensionsField } from './parts';

import type { Product, ProductFormDefaultFieldValues } from '../../typings/product';
import RichTextarea from './parts/rich-textarea';

interface IProductForm {
  loading?: boolean;
  viewOnly?: boolean;
  submitText?: string;
  isCreate?: boolean;
  defaultValues?: Partial<Product>;
  onSubmit: (data: ProductFormDefaultFieldValues) => void;
}

const ProductForm: React.FC<IProductForm> = props => {
  const { loading, onSubmit, viewOnly, defaultValues = {}, submitText = 'Trimite', isCreate } = props;

  const { categories, prepareInitialValues } = useProductForm();

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormDefaultFieldValues>({
    defaultValues: prepareInitialValues(defaultValues),
  });

  const handleFormSubmit: SubmitHandler<ProductFormDefaultFieldValues> = data => {
    onSubmit(data);

    if (isCreate) {
      reset();
    }
  };

  return (
    <Form layout="vertical" disabled={viewOnly} onFinish={handleSubmit(handleFormSubmit)}>
      <Form.Item label="Titlu" required validateStatus={errors.title ? 'error' : ''} help={errors.title?.message}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => <Input {...field} placeholder="Introduceți titlul" />}
          rules={{ required: 'Titlul este necesar' }}
        />
      </Form.Item>

      <Form.Item label="Descriere" required validateStatus={errors.description ? 'error' : ''} help={errors.description?.message}>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <RichTextarea {...field} placeholder="Introduceți descrierea" />}
          rules={{ required: 'Descrierea este necesară' }}
        />
      </Form.Item>
      <Form.Item label="Tip material" validateStatus={errors.description ? 'error' : ''} help={errors.description?.message}>
        <Controller
          name="material_type"
          control={control}
          render={({ field }) => <Input {...field} placeholder="Introduceți tipul de material" />}
        />
      </Form.Item>

      <Form.Item label="Furnizor" required validateStatus={errors.provider ? 'error' : ''} help={errors.provider?.message}>
        <Controller
          name="provider"
          control={control}
          render={({ field }) => <Input {...field} placeholder="Introduceți furnizorul" />}
          rules={{ required: 'Furnizorul este necesar' }}
        />
      </Form.Item>

      <CategoriesField control={control} errors={errors} categories={categories} />

      <Form.Item label="Disponibil la cerere">
        <Controller
          name="availableOnDemand"
          control={control}
          render={({ field }) => (
            <Checkbox {...field} checked={field.value}>
              Da
            </Checkbox>
          )}
        />
      </Form.Item>

      <ColorsField control={control} errors={errors} watch={watch} />

      <DimensionsField control={control} errors={errors} />

      <PhotosField errors={errors} control={control} />

      {!viewOnly && (
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {submitText}
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export { ProductForm };
