import { GetProp, UploadFile, UploadProps } from "antd";
import { Photo } from "../../../../typings/product";

export type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const createFileList = (arr: Photo[]) => {
  return (arr || [])?.map((item) => {
    return {
      uid: item?.id,
      status: "done",
      url: item?.url,
      name: "image.png",
    } as UploadFile;
  });
};
