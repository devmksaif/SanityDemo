"use client";

import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { getImageUrl } from "@/lib/cloudinary-helpers";
import type { PortfolioProjectData } from "@/types/sanity";

interface CaseStudiesShowcaseProps {
  projects: PortfolioProjectData[];
}

// Fallback image URL for when no image is provided
const FALLBACK_IMAGE_URL = "https://images.unsplash.com/photo-1511379938547-c1f33886168f?w=400&h=250&fit=crop";

const CaseStudiesShowcase = ({ projects }: CaseStudiesShowcaseProps) => {
  // Get the first two projects for detailed showcase
  const showcaseProjects = projects.slice(0, 2);

  if (showcaseProjects.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6 text-center mb-12">
          <p className="font-medium text-primary">Featured Case Studies</p>
          <h2 className="text-3xl font-medium md:text-4xl">
            Real results from creative excellence
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Showcasing our work across film, music, dance, and digital media through our sister companies
          </p>
        </div>
        
        <div className="mt-8 space-y-8">
          {showcaseProjects.map((project, index) => {
            // Robust image URL handling
            const imageUrl = getImageUrl(project.thumbnailImage, { width: 400, height: 250 }) || FALLBACK_IMAGE_URL;
            const projectUrl = `/portfolio/${project.slug?.current || project._id}`;
            
            // Generate excerpt from body content
            const excerpt = project.body?.[0]?.children?.[0]?.text || 
              `An in-depth look at the creative process and impact of ${project.title}.`;

            return (
              <div key={project._id}>
                <div className="flex justify-center">
                  <div className="flex w-full max-w-4xl flex-col gap-6 sm:flex-row sm:items-center">
                    {/* Project Image - Error handled */}
                    <div className="h-48 w-full sm:h-40 sm:w-64 flex-shrink-0 overflow-hidden rounded-xl sm:rounded-lg">
                      <Link href={projectUrl} className="block h-full w-full group">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={project.title}
                            width={400}
                            height={250}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              console.warn(`Failed to load image for project: ${project.title}`);
                              // Fallback to a solid color if image fails
                              (e.target as HTMLImageElement).style.display = 'none';
                              (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 text-sm">No image</span>
                          </div>
                        )}
                        {/* Fallback for image error */}
                        <div className="hidden h-full w-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                          <span className="text-white text-lg font-medium">No Image</span>
                        </div>
                      </Link>
                    </div>
                    
                    {/* Project Content */}
                    <div className="flex flex-1 flex-col justify-center gap-3">
                      <div className="space-y-2">
                        {/* Category and Division Tags */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          {project.category && (
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                              {project.category}
                            </span>
                          )}
                          {project.division?.title && (
                            <span className="inline-flex items-center rounded-full bg-secondary/10 px-2 py-0.5 text-xs font-medium text-secondary">
                              {project.division.title}
                            </span>
                          )}
                        </div>
                        
                        {/* Project Title */}
                        <h3 className="text-lg font-semibold hover:underline">
                          <Link href={projectUrl}>
                            {project.title}
                          </Link>
                        </h3>
                        
                        {/* Author Information - Error handled */}
                        {project.author && (
                          <div className="flex items-center gap-2">
                            {project.author.image && (
                              <div className="relative h-6 w-6 rounded-full overflow-hidden">
                                <Image
                                  src={getImageUrl(project.author.image, { width: 24, height: 24 }) || ''}
                                  alt={project.author.name}
                                  width={24}
                                  height={24}
                                  className="object-cover"
                                  onError={(e) => {
                                    console.warn(`Failed to load author image for project: ${project.title}`);
                                    (e.target as HTMLImageElement).style.display = 'none';
                                  }}
                                />
                              </div>
                            )}
                            <div>
                              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{project.author.name}</p>
                              <p className="text-[10px] text-gray-500 dark:text-gray-400">{project.author.role}</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Project Excerpt */}
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {excerpt}
                        </p>
                      </div>
                      
                      {/* Project Metadata */}
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        {project.releaseDate && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <span>{new Date(project.releaseDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}</span>
                          </div>
                        )}
                        
                        <Link
                          href={projectUrl}
                          className="inline-flex items-center font-medium text-primary hover:underline group text-xs"
                        >
                          <span>Read more</span>
                          <svg 
                            className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5" 
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
                {index < showcaseProjects.length - 1 && <Separator className="my-6" />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { CaseStudiesShowcase };