import React from 'react';

import { Button, Flex, Upload, UploadProps } from 'antd';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';

import { ControllerRenderProps } from 'react-hook-form';
import { ProductFormDefaultFieldValues } from '../../../../typings/product';
import { useUpdateEffect } from 'react-use';
import { isEmpty } from 'lodash';

interface IUploadBtn extends ControllerRenderProps<ProductFormDefaultFieldValues, 'photos'> {}

const UploadBtn: React.FC<IUploadBtn> = ({ onChange, ref, disabled, value }) => {
  useUpdateEffect(() => {
    if (isEmpty(value)) {
      onChange([]);
    }
  }, [value]);

  const props: UploadProps = {
    onRemove: file => {
      const index = value.indexOf(file);
      const newFileList = value.slice();
      newFileList.splice(index, 1);
      onChange(newFileList);
    },
    beforeUpload: (_, list) => {
      const modified = list.map(item => ({ ...item, url: URL.createObjectURL(item) }));
      onChange([...value, ...modified]);

      return false;
    },
    fileList: value,
  };

  return (
    <Flex align="center" gap={20}>
      <Upload ref={ref} multiple maxCount={10} disabled={disabled} listType="picture-card" {...props}>
        {value.length < 10 && (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Adaugă</div>
          </div>
        )}
      </Upload>
      {value.length >= 1 && (
        <Button type="primary" icon={<SaveOutlined />} disabled={disabled}>
          Salvează imaginile
        </Button>
      )}
    </Flex>
  );
};

export { UploadBtn };
