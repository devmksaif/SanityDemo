import { client } from "@/lib/sanity";
import type { PortfolioProjectData } from "@/types/sanity";
import { PortfolioCard } from "@/components/portfolio-card";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles } from "lucide-react";

async function getPortfolioProjects() {
  const query = `*[_type == "portfolioProject"] | order(releaseDate desc)`;
  const data: PortfolioProjectData[] = await client.fetch(query);
  return data;
}

export default async function PortfolioPage() {
  const projects = await getPortfolioProjects();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      <header className="py-20 sm:py-32">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              Our Work
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              A Showcase of Creativity
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore a curated selection of our most impactful projects across film, music, and digital media.
            </p>
          </div>
        </Container>
      </header>

      <main className="pb-20 sm:pb-32">
        <Container>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <PortfolioCard key={project._id} project={project} />
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