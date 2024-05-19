import { useState } from 'react';
import { UploadFile, UploadProps } from 'antd';
import useAxiosRequest from '../../api/hooks';
import type { AxiosProgressEvent } from 'axios';
import { UploadChangeParam } from 'antd/es/upload';
import { useMount } from 'react-use';

interface UseImageUploadProps {
  value?: string | string[];
  onChange: (urls: string | string[]) => void;
  multiple?: boolean;
}

const useImageUpload = ({ value, onChange, multiple = false }: UseImageUploadProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [remove] = useAxiosRequest('/photo/remove', 'delete');
  const [callSingle] = useAxiosRequest('/photo/upload', 'post');
  const [callMultiple] = useAxiosRequest('/photo/upload-multiple', 'post');

  useMount(() => {
    if (value) {
      const initialFileList = Array.isArray(value)
        ? value.map(url => ({ url, uid: url, name: url }))
        : [{ url: value, uid: value, name: value }];
      setFileList(initialFileList);
    }
  });

  const customRequest: UploadProps['customRequest'] = async options => {
    const { onSuccess, file, onError, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event: AxiosProgressEvent) => {
        const percent = Math.floor((event.loaded / event.total!) * 100);
        if (onProgress) {
          onProgress({ percent });
        }
      },
    };

    // Adding the current file to the fileList
    const currentFileList = multiple ? [...fileList, file] : [file];

    currentFileList.forEach(f => {
      fmData.append(multiple ? 'images' : 'image', (f as UploadFile)?.originFileObj!);
    });

    try {
      const res = await (multiple ? callMultiple : callSingle)(fmData, undefined, config);

      if (res) {
        const urls = multiple ? (res as string[]) : [res as string];
        onChange(multiple ? [...(value as string[]), ...urls] : urls[0]);
        onSuccess && onSuccess('Ok');
      }
    } catch (err) {
      onError && onError({ message: err as unknown as string } as any);
    }
  };

  const onRemove = async (file: UploadFile) => {
    const item = Array.isArray(value) ? value[fileList.indexOf(file)] : value;
    await remove({ url: item }, () => {
      const updatedFileList = fileList.filter(f => f.uid !== file.uid);
      setFileList(updatedFileList);
      const list = (value as string[]).filter(url => url !== item);
      onChange(multiple ? list : '');
    });
  };

  const onUploadChange = (info: UploadChangeParam<UploadFile>) => {
    setFileList(info.fileList);
  };

  return {
    fileList,
    customRequest,
    onRemove,
    setFileList,
    onUploadChange,
  };
};

export { useImageUpload };
