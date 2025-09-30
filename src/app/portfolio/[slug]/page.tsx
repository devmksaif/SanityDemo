import { client } from "@/lib/sanity";
import { notFound } from "next/navigation";
import { PortfolioProjectPageClient } from "@/components/portfolio-project-page-client";

async function getProject(slug: string) {
  const query = `*[_type == "portfolioProject" && (slug.current == $slug || _id == $slug)][0]{
    ..., 
    "division": division->{title, logo},
    "author": author->{name, role, bio, image}
  }`;
  const data = await client.fetch(query, { slug });
  return data;
}

export default async function PortfolioProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return <PortfolioProjectPageClient project={project} />;
}