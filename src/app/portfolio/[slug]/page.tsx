import { client, urlFor } from "@/lib/sanity";
import type { PortfolioProjectData } from "@/types/sanity";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GitBranch, Lightbulb, Users, TrendingUp, Smile, Award, Image as ImageIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

async function getProject(slug: string) {
  const query = `*[_type == "portfolioProject" && (slug.current == $slug || _id == $slug)][0]{
    ..., 
    "division": division->{title, logo},
    "author": author->{name, role, bio, image}
  }`;
  const data: PortfolioProjectData & { author?: any } = await client.fetch(query, { slug });
  return data;
}

export default async function PortfolioProjectPage({ params }: { params: { slug: string }> }) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  // Robust image URL handling
  const imageUrl = project.thumbnailImage 
    ? urlFor(project.thumbnailImage).width(1200).height(675).url()
    : "https://images.unsplash.com/photo-1511379938547-c1f33886168f?w=1200&h=675&fit=crop";
  
  // Robust excerpt generation
  const excerpt = project.body?.[0]?.children?.[0]?.text || 
    `An in-depth look at the creative process and impact of ${project.title}.`;

  // Handle missing author data
  const displayAuthor = project.author?.name || "Shubz Entertainment Team";
  const displayAuthorRole = project.author?.role || "Creative Team";
  
  // Handle missing category
  const displayCategory = project.category || "Creative Project";
  
  // Handle missing division
  const displayDivision = project.division?.title || "Shubz Entertainment";
  
  // Handle missing release date
  const displayDate = project.releaseDate 
    ? new Date(project.releaseDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Release date to be announced";

  return (
    <section className="py-12 sm:py-16">
      <div className="container">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb with error handling */}
          <Breadcrumb className="mb-6 lg:mb-10">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/portfolio">Portfolio</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{project.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="relative flex-col gap-10 lg:flex lg:flex-row lg:justify-center">
            {/* Main Content */}
            <div className="lg:max-w-[692px]">
              <div>
                <h1 className="text-pretty text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                  {project.title}
                </h1>
                
                {/* Author info with error handling */}
                {project.author && (
                  <div className="flex items-center gap-4 mt-6">
                    {project.author.image && (
                      <Image
                        src={urlFor(project.author.image).width(40).height(40).url()}
                        alt={project.author.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                        onError={(e) => {
                          console.warn(`Failed to load author image for project: ${project.title}`);
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                    <div>
                      <p className="text-sm font-medium">{displayAuthor}</p>
                      <p className="text-sm text-muted-foreground">{displayAuthorRole}</p>
                    </div>
                  </div>
                )}
                
                {/* Hero Image with Error Handling */}
                <Image
                  src={imageUrl}
                  alt={project.title}
                  width={1200}
                  height={675}
                  className="my-8 aspect-video w-full rounded-lg object-cover"
                  priority
                  onError={(e) => {
                    console.warn(`Failed to load main image for project: ${project.title}`);
                    // Fallback to gradient if image fails
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                />
                {/* Fallback gradient for main image */}
                <div className="hidden my-8 aspect-video w-full bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg font-medium">No Image Available</span>
                </div>
                
                {/* Stats Section */}
                <div className="mb-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-4xl font-semibold sm:text-5xl text-primary">98%</p>
                    <p className="text-muted-foreground text-sm">
                      Client Satisfaction
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-4xl font-semibold sm:text-5xl text-primary">4.2x</p>
                    <p className="text-muted-foreground text-sm">
                      Engagement Boost
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-4xl font-semibold sm:text-5xl text-primary">72%</p>
                    <p className="text-muted-foreground text-sm">
                      Positive Feedback
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-4xl font-semibold sm:text-5xl text-primary">19%</p>
                    <p className="text-muted-foreground text-sm">
                      Growth Rate
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Body content with error handling */}
              {project.body && project.body.length > 0 && (
                <div className="prose dark:prose-invert mb-8 max-w-full lg:max-w-prose">
                  <PortableText value={project.body} />
                </div>
              )}
            </div>

            {/* Sticky Sidebar with Error Handling */}
            <div className="h-fit lg:sticky lg:top-24 lg:max-w-80 w-full">
              <div className="rounded-lg border bg-card p-6">
                {/* Division logo with error handling */}
                {project.division?.logo && (
                  <Image
                    src={urlFor(project.division.logo).width(144).url()}
                    alt={`${project.division.title} logo`}
                    width={144}
                    height={40}
                    className="mb-6"
                    onError={(e) => {
                      console.warn(`Failed to load division logo for project: ${project.title}`);
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
                
                <p className="mb-1.5 text-sm font-semibold">Overview</p>
                <p className="text-muted-foreground mb-5 text-sm">
                  {excerpt}
                </p>
                
                <p className="mb-1.5 text-sm font-semibold">Category</p>
                <p className="text-muted-foreground mb-5 text-sm">{displayCategory}</p>
                
                {project.division && (
                  <>
                    <p className="mb-1.5 text-sm font-semibold">Division</p>
                    <p className="text-muted-foreground mb-5 text-sm">{displayDivision}</p>
                  </>
                )}
                
                <p className="mb-1.5 text-sm font-semibold">Release Date</p>
                <p className="text-muted-foreground mb-5 text-sm">{displayDate}</p>
                
                <Separator className="my-5" />
                <p className="mb-3 text-sm font-semibold">Interested in a project like this?</p>
                <Button size="sm" className="w-full" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}