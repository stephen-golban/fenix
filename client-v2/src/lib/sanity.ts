import { createClient } from "next-sanity";

import ImageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "j613c5os",
  dataset: "production",
  apiVersion: "2023-09-01",
  // apiHost: "https://fenix-test.sanity.studio",
  useCdn: true,
});

const builder = ImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
