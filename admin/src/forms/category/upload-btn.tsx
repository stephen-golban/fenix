import React from 'react';

import { useImageUpload } from '../../lib/hooks';

import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadBtn = React.forwardRef((props: any, ref: any) => {
  const { onChange, value, isEditMode = false } = props;
  const { customRequest, fileList, onRemove, onUploadChange } = useImageUpload({ value, onChange, multiple: false });

  return (
    <Upload
      ref={ref}
      maxCount={1}
      multiple={false}
      onRemove={onRemove}
      listType="picture"
      fileList={fileList}
      onChange={onUploadChange}
      customRequest={customRequest}>
      <Button icon={<UploadOutlined />}>{isEditMode ? 'Modifică' : 'Adaugă'}</Button>
    </Upload>
  );
});

export { UploadBtn };
