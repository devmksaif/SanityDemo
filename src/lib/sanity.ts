import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = "2024-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}