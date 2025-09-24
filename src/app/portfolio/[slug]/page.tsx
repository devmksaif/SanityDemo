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
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      {/* Back Navigation */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <Container className="py-4">
          <Link 
            href="/portfolio" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Link>
        </Container>
      </div>

      {/* Animated Hero Section */}
      <header className="relative py-16 sm:py-24">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6 animate-fade-in-left">
              <Badge variant="outline" className="text-sm">
                {project.category}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {project.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                {project.releaseDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
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
                    <Tag className="h-4 w-4" />
                    <span>{project.division.title}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-2xl animate-fade-in-right">
              <Image
                src={imageUrl}
                alt={project.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <main className="pb-20 sm:pb-32">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {project.body && (
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <PortableText value={project.body} />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-card rounded-2xl p-6 border">
                <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                <div className="space-y-4">
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

              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6">
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