import { useImageUpload } from '../../lib/hooks';

import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadBtn = (props: any) => {
  const { onChange, value, isEditMode = false } = props;
  const { customRequest, fileList, onRemove, onUploadChange } = useImageUpload({ value, onChange, multiple: false });

  return (
    <Upload
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
};

export { UploadBtn };
