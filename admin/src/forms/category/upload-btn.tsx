import { useImageUpload } from '../../lib/hooks';

import { Button, Upload, UploadFile } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';
import { useMount } from 'react-use';

const UploadBtn: React.FC<any> = props => {
  const { onChange, value, isEditMode = false } = props;
  const fileValue = {
    uid: value,
    url: value,
    name: value,
  } as UploadFile;

  const handleChange = (arr: UploadFile[]) => {
    if (isEmpty(arr)) {
      onChange(undefined);
    } else {
      onChange(arr[0].url);
    }
  };

  const { customRequest, fileList, setFileList, onRemove, onUploadChange } = useImageUpload({
    value: [fileValue],
    onChange: handleChange,
    multiple: false,
  });

  useMount(() => setFileList([fileValue]));

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
