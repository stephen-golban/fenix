import { defineType, defineField } from "sanity";

const dimensionsWithPriceSchema = defineField({
  name: "dimensionsWithPrice",
  type: "object",
  title: "Dimensiuni cu Preț",
  fields: [
    {
      name: "length",
      type: "number",
      title: "Lungime",
    },
    {
      name: "extension",
      type: "number",
      title: "Extensie",
    },
    {
      name: "width",
      type: "number",
      title: "Lățime",
    },
    {
      name: "depth",
      type: "number",
      title: "Adâncime",
    },
    {
      name: "height",
      type: "number",
      title: "Înălțime",
    },
    {
      name: "diameter",
      type: "number",
      title: "Diametru",
    },
    {
      name: "thickness",
      type: "number",
      title: "Grosime",
    },
    {
      name: "sleeping_space",
      type: "string",
      title: "Spațiu de dormit",
      description: "Format: lățime x lungime",
    },
    {
      name: "external_width",
      type: "number",
      title: "Lățime Externă",
    },
    {
      name: "internal_width",
      type: "number",
      title: "Lățime Internă",
    },
    {
      name: "price",
      type: "number",
      title: "Preț",
      validation: (Rule) => Rule.required(),
    },
  ],
});

const productSchema = defineType({
  name: "product",
  type: "document",
  title: "Produs",
  fields: [
    {
      name: "productCode",
      type: "string",
      title: "Cod Produs",
      initialValue: async (_: any, context: any) => {
        const client = context.getClient({ apiVersion: "2023-09-01" });
        const count = await client.fetch(`count(*[_type == "product"])`);
        const newCode = (count + 1).toString().padStart(6, "0");
        return newCode;
      },
      readOnly: true,
    },
    {
      name: "title",
      type: "string",
      title: "Titlu",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      type: "array",
      title: "Descriere",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "material_type",
      type: "string",
      title: "Tip Material",
    },
    {
      name: "provider",
      type: "string",
      title: "Furnizor",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      title: "Categorie",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "availableOnDemand",
      type: "boolean",
      title: "Disponibil la cerere",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "colors",
      type: "array",
      title: "Culori",
      of: [{ type: "color" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "dimensions_with_price",
      type: "array",
      title: "Dimensiuni cu Preț",
      of: [dimensionsWithPriceSchema],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mainPhoto",
      type: "image",
      title: "Fotografie Principală",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "photos",
      type: "array",
      title: "Fotografii",
      of: [{ type: "image" }],
      validation: (Rule) => Rule.required(),
    },
  ],
});
export default productSchema;
