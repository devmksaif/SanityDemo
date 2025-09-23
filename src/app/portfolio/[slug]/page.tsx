import { client, urlFor } from "@/lib/sanity";
import type { PortfolioProjectData } from "@/types/sanity";
import { Container } from "@/components/ui/container";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

async function getProject(slug: string) {
  // Try to find by slug first, then fallback to ID
  const query = `*[_type == "portfolioProject" && (slug.current == $slug || _id == $slug)][0]{..., "division": division->{title}}`;
  const data: PortfolioProjectData = await client.fetch(query, { slug });
  return data;
}

export default async function PortfolioProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const imageUrl = urlFor(project.thumbnailImage).width(1200).height(600).url();

  return (
    <article className="py-20 sm:py-32">
      <Container size="md">
        <header className="mb-12">
          <Badge variant="outline" className="mb-4">{project.category}</Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">
            {project.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            {project.releaseDate && (
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>
                  {new Date(project.releaseDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </span>
              </div>
            )}
            {project.division && (
              <span>From: <span className="font-semibold text-foreground">{project.division.title}</span></span>
            )}
          </div>
        </header>

        <div className="relative mb-12 aspect-[16/9] w-full overflow-hidden rounded-lg">
          <Image src={imageUrl} alt={project.title} fill className="object-cover" />
        </div>

        {project.body && (
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <PortableText value={project.body} />
          </div>
        )}
      </Container>
    </article>
  );
}