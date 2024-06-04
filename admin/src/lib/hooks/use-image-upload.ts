import { useState } from 'react';
import { UploadFile, UploadProps } from 'antd';
import useAxiosRequest from '../../api/hooks';
import type { AxiosProgressEvent } from 'axios';
import { UploadChangeParam } from 'antd/es/upload';
import { useMount } from 'react-use';

interface UseImageUploadProps {
  multiple?: boolean;
  value?: string | string[];
  onChange: (urls: string | string[]) => void;
}

const useImageUpload = ({ value, onChange, multiple = false }: UseImageUploadProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [callSingle] = useAxiosRequest('/photo/upload', 'post');

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

    fmData.append('image', file as File);

    try {
      const res = await callSingle(fmData, undefined, config);

      if (res) {
        const url = res as string;
        let updatedValue;

        if (multiple) {
          updatedValue = Array.isArray(value) ? [url, ...value] : [url];
        } else {
          updatedValue = url;
        }

        onChange(updatedValue);
        onSuccess && onSuccess('Ok');
      }
    } catch (err) {
      onError && onError({ message: err as unknown as string } as any);
    }
  };

  const onRemove = async (file: UploadFile) => {
    const item = Array.isArray(value) ? value[fileList.indexOf(file)] : value!;
    const updatedFileList = fileList.filter(f => f.uid !== file.uid);
    setFileList(updatedFileList);
    const updatedValue = Array.isArray(value) ? value.filter(url => url !== item) : '';

    onChange(updatedValue);
  };

  const onUploadChange = (info: UploadChangeParam<UploadFile>) => {
    setFileList(info.fileList.slice(0, multiple ? 10 : 1));
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
