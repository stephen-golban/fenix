import { UploadFile } from 'antd';

export type Category = { id: string; title: string; image_url: string };

export type CategoryFormFields = Omit<Category, 'id'>;

export type CategoryFormDefaultFieldValues = Pick<Category, 'title'> & {
  photos: UploadFile[];
};
