import { client } from "@/lib/sanity";
import type { PortfolioProjectData } from "@/types/sanity";
import { PortfolioPageClient } from "@/components/portfolio-page-client";

async function getPortfolioProjects() {
  const query = `*[_type == "portfolioProject"] | order(releaseDate desc){
    _id, 
    title, 
    category, 
    division->{title}, 
    thumbnailImage, 
    releaseDate, 
    slug
  }`;
  const data: PortfolioProjectData[] = await client.fetch(query);
  return data;
}

export default async function PortfolioPage() {
  const projects = await getPortfolioProjects();

  return <PortfolioPageClient projects={projects} />;
}