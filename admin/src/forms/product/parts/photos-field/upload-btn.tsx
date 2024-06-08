import React from 'react';

import { useImageUpload } from '../../../../lib/hooks';

import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { ControllerRenderProps } from 'react-hook-form';
import { ProductFormDefaultFieldValues } from '../../../../typings/product';
import { useMount, useUpdateEffect } from 'react-use';
import { isEmpty } from 'lodash';

interface IUploadBtn extends Omit<ControllerRenderProps<ProductFormDefaultFieldValues, 'photos'>, 'ref'> {}

const UploadBtn: React.FC<IUploadBtn> = ({ onChange, disabled, value }) => {
  const { customRequest, fileList, onRemove, onUploadChange, setFileList } = useImageUpload({ value, onChange, multiple: true });

  useMount(() => setFileList(value));

  useUpdateEffect(() => {
    if (isEmpty(value)) {
      setFileList([]);
    }
  }, [value]);

  return (
    <Upload
      maxCount={10}
      fileList={fileList}
      onRemove={onRemove}
      disabled={disabled}
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
