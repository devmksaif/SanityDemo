"use client";

import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { urlFor } from "@/lib/sanity";
import type { PortfolioProjectData } from "@/types/sanity";

interface CaseStudiesShowcaseProps {
  projects: PortfolioProjectData[];
}

const CaseStudiesShowcase = ({ projects }: CaseStudiesShowcaseProps) => {
  // Get the first two projects for detailed showcase
  const showcaseProjects = projects.slice(0, 2);

  if (showcaseProjects.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6 text-center mb-20">
          <p className="font-medium text-primary">Featured Case Studies</p>
          <h2 className="text-4xl font-medium md:text-5xl">
            Real results from creative excellence
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Showcasing our work across film, music, dance, and digital media through our sister companies
          </p>
        </div>
        
        <div className="mt-20 space-y-20">
          {showcaseProjects.map((project, index) => {
            const imageUrl = project.thumbnailImage ? urlFor(project.thumbnailImage).width(600).height(700).url() : "";
            const projectUrl = `/portfolio/${project.slug?.current || project._id}`;
            
            // Generate excerpt from body content
            const excerpt = project.body?.[0]?.children?.[0]?.text || 
              `An in-depth look at the creative process and impact of ${project.title}.`;

            return (
              <div key={project._id}>
                <div className="flex justify-center">
                  <div className="flex w-full max-w-5xl flex-col gap-8 sm:gap-10 sm:flex-row">
                    {/* Project Image */}
                    <div className="h-full w-full max-w-[260px] flex-shrink-0 overflow-hidden rounded-2xl sm:max-w-none sm:aspect-[29/35] sm:w-60 mx-auto sm:mx-0">
                      <Link href={projectUrl} className="block h-full w-full group">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={project.title}
                            width={260}
                            height={350}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="h-full w-full bg-muted flex items-center justify-center">
                            <span className="text-muted-foreground">No image</span>
                          </div>
                        )}
                      </Link>
                    </div>
                    
                    {/* Project Content */}
                    <div className="flex flex-col justify-between gap-6 sm:gap-8">
                      <div className="space-y-4">
                        {/* Category and Division Tags */}
                        <div className="flex flex-wrap items-center gap-2">
                          {project.category && (
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                              {project.category}
                            </span>
                          )}
                          {project.division?.title && (
                            <span className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
                              {project.division.title}
                            </span>
                          )}
                        </div>
                        
                        {/* Project Title */}
                        <h3 className="text-2xl font-semibold hover:underline">
                          <Link href={projectUrl}>
                            {project.title}
                          </Link>
                        </h3>
                        
                        {/* Author Information */}
                        {project.author && (
                          <div className="flex items-center gap-3">
                            {project.author.image && (
                              <div className="relative h-10 w-10 rounded-full overflow-hidden">
                                <Image
                                  src={urlFor(project.author.image).width(40).height(40).url()}
                                  alt={project.author.name}
                                  width={40}
                                  height={40}
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-medium">{project.author.name}</p>
                              <p className="text-xs text-muted-foreground">{project.author.role}</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Project Excerpt */}
                        <p className="text-lg text-muted-foreground">
                          {excerpt}
                        </p>
                      </div>
                      
                      {/* Project Metadata */}
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        {project.releaseDate && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <span>Released:</span>
                            <span className="font-medium">
                              {new Date(project.releaseDate).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        )}
                        
                        <Link
                          href={projectUrl}
                          className="inline-flex items-center font-medium text-primary hover:underline group"
                        >
                          <span>View case study</span>
                          <svg 
                            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {index < showcaseProjects.length - 1 && <Separator className="my-20" />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { CaseStudiesShowcase };