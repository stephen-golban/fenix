import { useState } from 'react';
import { UploadFile, UploadProps } from 'antd';
import useAxiosRequest from '../../api/hooks';
import type { AxiosProgressEvent } from 'axios';
import { UploadChangeParam } from 'antd/es/upload';
import { ProductFormDefaultFieldValues } from '../../typings/product';

type Photos = ProductFormDefaultFieldValues['photos'];

interface UseImageUploadProps {
  multiple?: boolean;
  value: Photos;
  onChange: (args: Photos) => void;
}

const useImageUpload = ({ value, onChange, multiple = false }: UseImageUploadProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [callSingle] = useAxiosRequest('/photo/upload', 'post');
  const [removePhoto] = useAxiosRequest('/product/photo', 'delete');

  const customRequest: UploadProps['customRequest'] = async options => {
    const { onSuccess, file, onError, onProgress } = options;

    try {
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

      const res = await callSingle(fmData, undefined, config);

      if (res) {
        const url = res as string;
        const F = file as UploadFile;
        const newFile = { ...F, url };

        onChange(multiple ? [...value, newFile] : [newFile]);

        onSuccess && onSuccess(newFile);
      }
    } catch (err) {
      onError && onError({ message: err as unknown as string } as any);
    }
  };

  const onRemove = async (file: UploadFile) => {
    if (multiple) {
      await removePhoto(
        undefined,
        () => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          setFileList(newFileList);
          onChange(value.filter(v => v.uid !== file.uid));
        },
        { additionalUrl: `/${file.uid}` },
      );
    } else {
      onChange([]);
      setFileList([]);
    }
  };

  const onUploadChange = (info: UploadChangeParam<UploadFile>) => {
    setFileList(info.fileList.slice(0, multiple ? 10 : 1));
  };

  return {
    fileList,
    onRemove,
    setFileList,
    customRequest,
    onUploadChange,
  };
};

export { useImageUpload };
