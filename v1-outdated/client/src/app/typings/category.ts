export type Category = {
  id: string;
  title: string;
  image_url: string;
};

export type MenuItem = Omit<Category, "description">;
