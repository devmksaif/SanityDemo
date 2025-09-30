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
import { GitBranch, Lightbulb, Users, TrendingUp, Smile, Award } from "lucide-react";
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

export default async function PortfolioProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  const imageUrl = urlFor(project.thumbnailImage).width(1200).height(675).url();
  const excerpt = project.body?.[0]?.children?.[0]?.text || `An in-depth look at the creative process and impact of ${project.title}.`;

  return (
    <section className="py-12 sm:py-16">
      <div className="container">
        <div className="mx-auto max-w-7xl">
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
                <p className="text-muted-foreground mt-4 text-lg">
                  {excerpt}
                </p>
                {project.author && (
                  <div className="flex items-center gap-4 mt-6">
                    {project.author.image && (
                      <Image
                        src={urlFor(project.author.image).width(40).height(40).url()}
                        alt={project.author.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    )}
                    <div>
                      <p className="text-sm font-medium">{project.author.name}</p>
                      <p className="text-sm text-muted-foreground">{project.author.role}</p>
                    </div>
                  </div>
                )}
                <Image
                  src={imageUrl}
                  alt={project.title}
                  width={1200}
                  height={675}
                  className="my-8 aspect-video w-full rounded-lg object-cover"
                  priority
                />
                {/* Mock Stats Section */}
                <div className="mb-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-4xl font-semibold sm:text-5xl text-primary">19%</p>
                    <p className="text-muted-foreground text-sm">
                      Increase in Engagement
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-4xl font-semibold sm:text-5xl text-primary">28%</p>
                    <p className="text-muted-foreground text-sm">
                      Audience Growth
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-4xl font-semibold sm:text-5xl text-primary">72%</p>
                    <p className="text-muted-foreground text-sm">
                      Positive Feedback
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-4xl font-semibold sm:text-5xl text-primary">4.2x</p>
                    <p className="text-muted-foreground text-sm">
                      Return on Investment
                    </p>
                  </div>
                </div>
              </div>
              {project.body && (
                <div className="prose dark:prose-invert mb-8 max-w-full lg:max-w-prose">
                  <PortableText value={project.body} />
                </div>
              )}
            </div>

            {/* Sticky Sidebar */}
            <div className="h-fit lg:sticky lg:top-24 lg:max-w-80 w-full">
              <div className="rounded-lg border bg-card p-6">
                {project.division?.logo && (
                  <Image
                    src={urlFor(project.division.logo).width(144).url()}
                    alt={`${project.division.title} logo`}
                    width={144}
                    height={40}
                    className="mb-6"
                  />
                )}
                <p className="mb-1.5 text-sm font-semibold">Overview</p>
                <p className="text-muted-foreground mb-5 text-sm">
                  {excerpt}
                </p>
                <p className="mb-1.5 text-sm font-semibold">Category</p>
                <p className="text-muted-foreground mb-5 text-sm">{project.category}</p>
                {project.division && (
                  <>
                    <p className="mb-1.5 text-sm font-semibold">Division</p>
                    <p className="text-muted-foreground mb-5 text-sm">{project.division.title}</p>
                  </>
                )}
                {project.releaseDate && (
                   <>
                    <p className="mb-1.5 text-sm font-semibold">Release Date</p>
                    <p className="text-muted-foreground mb-5 text-sm">
                      {new Date(project.releaseDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                   </>
                )}
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