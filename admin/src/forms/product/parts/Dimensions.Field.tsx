import React from 'react';

import CustomInput from './custom-input';
import { InputMask } from '@react-input/mask';
import { InputNumber, Button, Form, Space } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Controller, Control, FieldErrors } from 'react-hook-form';

import type { ProductFormDefaultFieldValues } from '../../../typings/product';

interface IDimensionsField {
  errors: FieldErrors<ProductFormDefaultFieldValues>;
  control: Control<ProductFormDefaultFieldValues, any>;
}

const DimensionsField: React.FC<IDimensionsField> = ({ control, errors }) => {
  function onAdd(value: ProductFormDefaultFieldValues['dimensions_with_price'], onChange: (...event: any[]) => void) {
    const newSet = {
      length: undefined,
      extension: undefined,
      width: undefined,
      depth: undefined,
      height: undefined,
      diameter: undefined,
      thickness: undefined,
      sleeping_space: undefined,
      external_width: undefined,
      internal_width: undefined,
      price: undefined,
    };
    return onChange([...value, newSet]);
  }

  function onRemove(value: ProductFormDefaultFieldValues['dimensions_with_price'], onChange: (...event: any[]) => void, index: number) {
    const newDims = value.filter((_, i) => i !== index);
    onChange(newDims);
  }

  return (
    <Form.Item
      label="Dimensiuni cu preț (mm)"
      validateStatus={errors.dimensions_with_price ? 'error' : ''}
      help={errors.dimensions_with_price?.message}>
      <Controller
        name="dimensions_with_price"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Space direction="vertical">
            {value.map((dim, index) => (
              <Space key={index} style={{ marginBottom: '1rem', columnGap: 20, position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: -10,
                    top: 0,
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: 10,
                    width: 20,
                    height: 20,
                    borderRadius: 4,
                    backgroundColor: 'dodgerblue',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {index + 1}
                </div>
                <Space direction="vertical">
                  <Form.Item label="Lungime (mm)">
                    <InputNumber
                      style={{ width: '100%' }}
                      value={dim.length}
                      onChange={e => {
                        const newDims = [...value];
                        newDims[index].length = e || 0;
                        onChange(newDims);
                      }}
                      placeholder="Introduceți lungimea"
                    />
                  </Form.Item>

                  <Form.Item label="Extindere (mm)">
                    <InputNumber
                      style={{ width: '100%' }}
                      value={dim.extension}
                      onChange={e => {
                        const newDims = [...value];
                        newDims[index].extension = e || 0;
                        onChange(newDims);
                      }}
                      placeholder="Introduceți extinderea"
                    />
                  </Form.Item>

                  <Form.Item label="Lățime (mm)">
                    <InputNumber
                      style={{ width: '100%' }}
                      value={dim.width}
                      onChange={e => {
                        const newDims = [...value];
                        newDims[index].width = e || 0;
                        onChange(newDims);
                      }}
                      placeholder="Introduceți lățimea"
                    />
                  </Form.Item>
                </Space>

                <Space direction="vertical">
                  <Form.Item label="Adâncime (mm)">
                    <InputNumber
                      style={{ width: '100%' }}
                      value={dim.depth}
                      onChange={e => {
                        const newDims = [...value];
                        newDims[index].depth = e || 0;
                        onChange(newDims);
                      }}
                      placeholder="Introduceți adâncimea"
                    />
                  </Form.Item>

                  <Form.Item label="Înălțime (mm)">
                    <InputNumber
                      style={{ width: '100%' }}
                      value={dim.height}
                      onChange={e => {
                        const newDims = [...value];
                        newDims[index].height = e || 0;
                        onChange(newDims);
                      }}
                      placeholder="Introduceți înălțimea"
                    />
                  </Form.Item>

                  <Form.Item label="Diametru (mm)">
                    <InputNumber
                      style={{ width: '100%' }}
                      value={dim.diameter}
                      onChange={e => {
                        const newDims = [...value];
                        newDims[index].diameter = e || 0;
                        onChange(newDims);
                      }}
                      placeholder="Introduceți diametrul"
                    />
                  </Form.Item>
                </Space>

                <Space direction="vertical">
                  <Form.Item label="Grosime (mm)">
                    <InputNumber
                      style={{ width: '100%' }}
                      value={dim.thickness}
                      onChange={e => {
                        const newDims = [...value];
                        newDims[index].thickness = e || 0;
                        onChange(newDims);
                      }}
                      placeholder="Introduceți grosimea"
                    />
                  </Form.Item>

                  <Form.Item label="Lățime internă (mm)">
                    <InputNumber
                      style={{ width: '100%' }}
                      value={dim.internal_width}
                      onChange={e => {
                        const newDims = [...value];
                        newDims[index].internal_width = e || 0;
                        onChange(newDims);
                      }}
                      placeholder="Introduceți lățimea internă"
                    />
                  </Form.Item>

                  <Form.Item label="Lățime externă (mm)">
                    <InputNumber
                      style={{ width: '100%' }}
                      value={dim.external_width}
                      onChange={e => {
                        const newDims = [...value];
                        newDims[index].external_width = e || 0;
                        onChange(newDims);
                      }}
                      placeholder="Introduceți lățimea externă"
                    />
                  </Form.Item>
                </Space>

                <Space direction="vertical">
                  <Form.Item label="Spațiu de dormit (mm x mm)">
                    <InputMask
                      mask="____ x ____"
                      value={dim.sleeping_space}
                      onChange={e => {
                        const newDims = [...value];
                        newDims[index].sleeping_space = e.target.value || '';
                        onChange(newDims);
                      }}
                      component={CustomInput}
                      replacement="_"
                      placeholder="____ x ____"
                    />
                  </Form.Item>

                  <Form.Item label="Preț (MDL)" required>
                    <InputNumber
                      style={{ width: '100%' }}
                      value={dim.price}
                      onChange={e => {
                        const newDims = [...value];
                        newDims[index].price = e || 0;
                        onChange(newDims);
                      }}
                      placeholder="Introduceți prețul"
                      required
                    />
                  </Form.Item>
                </Space>

                <Form.Item label="Șterge">
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
      />
    </Form.Item>
  );
};

export { DimensionsField };
