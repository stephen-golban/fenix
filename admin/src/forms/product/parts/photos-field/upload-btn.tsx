import React from 'react';

import { useImageUpload } from '../../../../lib/hooks';

import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { ControllerRenderProps } from 'react-hook-form';
import { ProductFormDefaultFieldValues } from '../../../../typings/product';
import { useUpdateEffect } from 'react-use';
import { isEmpty } from 'lodash';

interface IUploadBtn extends ControllerRenderProps<ProductFormDefaultFieldValues, 'photos'> {}

const UploadBtn: React.FC<IUploadBtn> = ({ onChange, ref, disabled, value }) => {
  const { customRequest, fileList, onRemove, onUploadChange, setFileList } = useImageUpload({ value, onChange, multiple: true });

  useUpdateEffect(() => {
    if (isEmpty(value)) {
      setFileList([]);
    }
  }, [value]);

  return (
    <Upload
      ref={ref}
      multiple
      maxCount={10}
      fileList={fileList}
      disabled={disabled}
      onRemove={onRemove}
      listType="picture-card"
      onChange={onUploadChange}
      customRequest={customRequest}>
      {fileList.length < 10 && (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Adaugă</div>
        </div>
      )}
    </Upload>
  );
};

export { UploadBtn };
