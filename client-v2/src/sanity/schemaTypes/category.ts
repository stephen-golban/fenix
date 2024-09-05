const categorySchema = {
  name: "category",
  type: "document",
  title: "Categorie",
  fields: [
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title" },
    },
    {
      name: "title",
      type: "string",
      title: "Titlu",
    },
    {
      name: "image",
      type: "image",
      title: "Imagine",
    },
  ],
};

export default categorySchema;
