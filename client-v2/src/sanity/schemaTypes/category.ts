import { defineField, defineType } from "sanity";

const categorySchema = defineType({
  name: "category",
  type: "document",
  title: "Categorie",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Titlu",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Imagine",
    }),
  ],
});

export default categorySchema;
