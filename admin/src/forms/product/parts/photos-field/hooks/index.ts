import { useState } from 'react';

import useAxiosRequest from '../../../../../api/hooks';
import { type FileType, createFileList, getBase64 } from '../helper';

import type { Control } from 'react-hook-form';
import type { AxiosProgressEvent } from 'axios';
import type { UploadFile, UploadProps } from 'antd';
import type { Photo, Product } from '../../../../../typings/product';

function usePhotosField(control: Control<Product, any>) {
  const defaultFileList = (control._defaultValues.photos || []) as Photo[];

  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>(createFileList(defaultFileList));

  const [call] = useAxiosRequest('/photo/upload', 'post');

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadImage = async (
    value: Photo[],
    onChange: (...event: any[]) => void,
    options: NonNullable<UploadProps['customRequest']>['prototype'],
  ) => {
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
    fmData.append('image', file);
    try {
      await call(
        fmData,
        url => {
          onChange([...value, { url }]);
          onSuccess && onSuccess('Ok');
        },
        config,
      );
    } catch (err) {
      console.log('Eroor: ', err);
      onError && onError({ message: err as unknown as string });
    }
  };

  return {
    uploadImage,
    previewImage,
    previewOpen,
    setPreviewImage,
    setPreviewOpen,
    handleChange,
    fileList,
    handlePreview,
  };
}

export default usePhotosField;
