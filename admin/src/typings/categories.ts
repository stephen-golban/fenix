export type Category = { id: string; title: string; image_url: string };

export type CategoryFormFields = Omit<Category, 'id'>;
