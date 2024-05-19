import React from 'react';

import { Button, ColorPicker, Flex, Form, Space } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import { Control, Controller, FieldErrors, UseFormWatch } from 'react-hook-form';

import type { ProductFormDefaultFieldValues } from '../../../typings/product';

interface IColorsField {
  watch: UseFormWatch<ProductFormDefaultFieldValues>;
  errors: FieldErrors<ProductFormDefaultFieldValues>;
  control: Control<ProductFormDefaultFieldValues, any>;
}

const ColorsField: React.FC<IColorsField> = ({ watch, control, errors }) => {
  const colors = watch('colors');

  return (
    <Form.Item label="Culori" required help={errors.colors?.message} validateStatus={errors.colors ? 'error' : ''}>
      <Controller
        name="colors"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Space size="large" align="center" wrap style={{ columnGap: 50 }}>
            {value.map((color, index) => (
              <div key={index}>
                <Form.Item label={colors[index]}>
                  <Flex align="center">
                    <ColorPicker
                      value={color}
                      onChangeComplete={newColor => {
                        const newColors = [...value];
                        newColors[index] = newColor.toHexString();
                        onChange(newColors);
                      }}
                    />
                    <Button
                      danger
                      size="small"
                      style={{ marginLeft: 20, marginTop: 1 }}
                      onClick={() => {
                        const newColors = value.filter((_, i) => i !== index);
                        onChange(newColors);
                      }}>
                      <DeleteOutlined />
                    </Button>
                  </Flex>
                </Form.Item>
              </div>
            ))}

            <Button type="dashed" onClick={() => onChange([...value, '#000000'])} style={{ marginTop: 5 }}>
              <PlusOutlined /> Adaugă
            </Button>
          </Space>
        )}
        rules={{ required: 'Culoarea este necesară' }}
      />
    </Form.Item>
  );
};

export { ColorsField };
