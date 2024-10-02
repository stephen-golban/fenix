import React from 'react';

import { Controller, type Control, type FieldErrors } from 'react-hook-form';

import { Form } from 'antd';

import type { ProductFormDefaultFieldValues } from '../../../../typings/product';
import { UploadBtn } from './upload-btn';

interface IPhotosField {
  errors: FieldErrors<ProductFormDefaultFieldValues>;
  control: Control<ProductFormDefaultFieldValues, any>;
}

const PhotosField: React.FC<IPhotosField> = ({ errors, control }) => {
  return (
    <Form.Item label="Fotografii" required validateStatus={errors.photos ? 'error' : ''} help={errors.photos?.message}>
      <Controller
        name="photos"
        control={control}
        rules={{ required: 'Fotografiile sunt necesare' }}
        render={({ field: { ref, ...field } }) => <UploadBtn {...field} />}
      />
    </Form.Item>
  );
};

export { PhotosField };
