import React from 'react';

import { InputNumber, Button, Form, Space } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { type Control, Controller, type FieldErrors } from 'react-hook-form';

import type { ProductFormDefaultFieldValues } from '../../../typings/product';

interface IDimensionsField {
  errors: FieldErrors<ProductFormDefaultFieldValues>;
  control: Control<ProductFormDefaultFieldValues, any>;
}

const DimensionsField: React.FC<IDimensionsField> = ({ control, errors }) => {
  function onAdd(value: ProductFormDefaultFieldValues['dimensions_with_price'], onChange: (...event: any[]) => void) {
    const newSet = { width: 1, length: 1, height: 1, price: 1 };
    return onChange([...value, newSet]);
  }
  function onRemove(value: ProductFormDefaultFieldValues['dimensions_with_price'], onChange: (...event: any[]) => void, index: number) {
    const newDims = value.filter((_, i) => i !== index);
    onChange(newDims);
  }

  return (
    <Form.Item
      label="Dimensiuni cu preț (cm)"
      required
      validateStatus={errors.dimensions_with_price ? 'error' : ''}
      help={errors.dimensions_with_price?.message}>
      <Controller
        name="dimensions_with_price"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Space direction="vertical">
            {value.map((dim, index) => (
              <Space key={index} style={{ marginBottom: '1rem' }}>
                <Form.Item label="Lățime">
                  <InputNumber
                    min={1}
                    value={dim.width}
                    onChange={v => {
                      const newDims = [...value];
                      newDims[index].width = v ?? 1;
                      onChange(newDims);
                    }}
                    placeholder="Introduceți lățimea"
                  />
                </Form.Item>

                <Form.Item label="Lungime">
                  <InputNumber
                    min={1}
                    value={dim.length}
                    onChange={v => {
                      const newDims = [...value];
                      newDims[index].length = v ?? 1;
                      onChange(newDims);
                    }}
                    placeholder="Introduceți lungimea"
                  />
                </Form.Item>

                <Form.Item label="Înălțime">
                  <InputNumber
                    min={1}
                    value={dim.height}
                    onChange={v => {
                      const newDims = [...value];
                      newDims[index].height = v ?? 1;
                      onChange(newDims);
                    }}
                    placeholder="Introduceți înălțimea"
                  />
                </Form.Item>

                <Form.Item label="Preț">
                  <InputNumber
                    min={1}
                    value={dim.price}
                    onChange={v => {
                      const newDims = [...value];
                      newDims[index].price = v ?? 1;
                      onChange(newDims);
                    }}
                    placeholder="Introduceți prețul"
                  />
                </Form.Item>

                <Form.Item label="Sterge">
                  <Button danger onClick={() => onRemove(value, onChange, index)}>
                    <DeleteOutlined />
                  </Button>
                </Form.Item>
              </Space>
            ))}
            <Button type="dashed" onClick={() => onAdd(value, onChange)}>
              <PlusOutlined /> Adaugă
            </Button>
          </Space>
        )}
        rules={{ required: 'Dimensiunile sunt necesare' }}
      />
    </Form.Item>
  );
};

export { DimensionsField };
