import { client } from "@/lib/sanity";
import type { PortfolioProjectData } from "@/types/sanity";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { Card } from "@/components/ui/card";

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

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Hero Section */}
      <header className="relative overflow-hidden h-[60vh] min-h-[450px] w-full bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>
        
        <Container className="relative flex h-full flex-col items-center justify-center text-center">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Case Studies
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Creative Portfolio
            </h1>
            
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Explore our work across film, music, dance, and digital media through our sister companies.
            </p>
          </div>
        </Container>
      </header>

      <main className="py-16 sm:py-24">
        <Container>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <CaseStudyCard key={project._id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Portfolio projects coming soon.</p>
              <Button asChild className="mt-4">
                <Link href="/studio">Add Projects in Studio</Link>
              </Button>
            </div>
          )}
        </Container>
      </main>
    </div>
  );
}

function CaseStudyCard({ project }: { project: PortfolioProjectData }) {
  const imageUrl = urlFor(project.thumbnailImage).width(600).height(400).url();
  const hasSlug = project.slug?.current;
  const slug = hasSlug ? project.slug.current : project._id;
  const href = `/portfolio/${slug}`;

  return (
    <Link href={href} className="group block">
      <Card className="overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:shadow-lg">
        {/* Image Thumbnail */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-foreground">
            {project.title}
            {project.category && (
              <span className="ml-1 text-base font-normal text-muted-foreground">
                ({project.category})
              </span>
            )}
          </h3>
          {project.division?.title && (
            <p className="mt-1 text-sm text-muted-foreground">
              — {project.division.title}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}