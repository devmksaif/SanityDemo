import { client, urlFor } from "@/lib/sanity";
import type { PortfolioProjectData } from "@/types/sanity";
import { Container } from "@/components/ui/container";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Tag, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getProject(slug: string) {
  const query = `*[_type == "portfolioProject" && (slug.current == $slug || _id == $slug)][0]{
    ..., 
    "division": division->{title}
  }`;
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
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <Container className="py-3">
          <Link 
            href="/portfolio" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Link>
        </Container>
      </div>

      {/* Modernized Hero Section */}
      <header className="relative overflow-hidden py-12 sm:py-20 bg-muted">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>
        <Container size="lg" className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div className="space-y-4 animate-fade-in-left">
              <Badge variant="outline" className="text-sm border-primary text-primary">
                {project.category}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                {project.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {project.releaseDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>
                      {new Date(project.releaseDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </span>
                  </div>
                )}
                {project.division && (
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-accent" />
                    <span>{project.division.title}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-lg animate-fade-in-right border">
              <Image
                src={imageUrl}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <main className="pb-16 sm:pb-24 pt-12 sm:pt-20">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {project.body && (
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <PortableText value={project.body} />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 border">
                <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                <div className="space-y-3">
                  {project.releaseDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Release Date</span>
                      <span className="font-medium">
                        {new Date(project.releaseDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">{project.category}</span>
                  </div>
                  {project.division && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Division</span>
                      <span className="font-medium">{project.division.title}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-muted rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-2">Interested in Similar Work?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Let's discuss your next creative project.
                </p>
                <Button className="w-full">
                  Start a Project
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}