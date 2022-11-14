import sanityClient from "@sanity/client";

import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "sorpbzx6",
  dataset: "production",
  apiVersion: "2022-03-10",
  useCdn: true,
  ...("process.env.NEXT_PUBLIC_SANITY_TOKEN" ? {token: process.env.NEXT_PUBLIC_SANITY_TOKEN} : {}),
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
