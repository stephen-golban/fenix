import { createClient } from "next-sanity";

import ImageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "tjz04mdk",
  dataset: "production",
  apiVersion: "2023-09-01",
  useCdn: true,
});

const builder = ImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
