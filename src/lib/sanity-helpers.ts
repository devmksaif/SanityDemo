import { client } from "@/lib/sanity";

export async function ensureSlugsExist() {
  // Check for divisions without slugs
  const divisionsWithoutSlugs = await client.fetch(
    `*[_type == "division" && !defined(slug.current)]{_id, title}`
  );
  
  // Check for portfolio projects without slugs
  const projectsWithoutSlugs = await client.fetch(
    `*[_type == "portfolioProject" && !defined(slug.current)]{_id, title}`
  );
  
  // Check for news articles without slugs
  const newsWithoutSlugs = await client.fetch(
    `*[_type == "newsArticle" && !defined(slug.current)]{_id, title}`
  );
  
  return {
    divisions: divisionsWithoutSlugs,
    projects: projectsWithoutSlugs,
    news: newsWithoutSlugs
  };
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96);
}