import React from 'react';

import usePhotosField from './hooks';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';

import { Form, Upload } from 'antd';
import PhotoPreview from './Photo.Preview';
import { PlusOutlined } from '@ant-design/icons';

import type { Product } from '../../../../typings/product';

interface IPhotosField {
  errors: FieldErrors<Product>;
  control: Control<Product, any>;
}

const PhotosField: React.FC<IPhotosField> = ({ errors, control }) => {
  const { fileList, handleChange, handlePreview, previewImage, previewOpen, setPreviewImage, setPreviewOpen, uploadImage } =
    usePhotosField(control);

  return (
    <Form.Item label="Fotografii" required validateStatus={errors.photos ? 'error' : ''} help={errors.photos?.message}>
      <Controller
        name="photos"
        control={control}
        rules={{ required: 'Fotografiile sunt necesare' }}
        render={({ field: { onChange, value, ...field } }) => (
          <Upload
            {...field}
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
            onPreview={handlePreview}
            customRequest={options => uploadImage(value, onChange, options)}>
            {fileList.length < 8 && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Adaugă</div>
              </div>
            )}
          </Upload>
        )}
      />
      <PhotoPreview source={previewImage} visible={previewOpen} setPreviewImage={setPreviewImage} setPreviewOpen={setPreviewOpen} />
    </Form.Item>
  );
};

export { PhotosField };
