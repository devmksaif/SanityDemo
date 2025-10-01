"use client";

import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { CldImage } from 'next-cloudinary';
import type { PortfolioProjectData } from "@/types/sanity";

interface CaseStudiesShowcaseProps {
  projects: PortfolioProjectData[];
}
const CaseStudiesShowcase = ({ projects }: CaseStudiesShowcaseProps) => {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="w-full">
      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:grid-rows-2 gap-6 h-[600px]">
        {projects[0] && (
          <div className="lg:col-span-8 lg:row-span-2 group relative overflow-hidden rounded-3xl">
            <ProjectCard project={projects[0]} variant="featured" className="h-full" />
          </div>
        )}

        <div className="lg:col-span-4 lg:row-span-2 flex flex-col gap-6">
          {projects[1] && (
            <div className="flex-1 group relative overflow-hidden rounded-2xl">
              <ProjectCard project={projects[1]} variant="secondary" className="h-full" />
            </div>
          )}
          {projects[2] && (
            <div className="flex-1 group relative overflow-hidden rounded-2xl">
              <ProjectCard project={projects[2]} variant="secondary" className="h-full" />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden space-y-6">
        {projects.slice(0, 3).map((project) => (
          <div key={project._id} className="h-[400px]">
            <ProjectCard project={project} variant="mobile" className="h-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({
  project,
  variant = "featured",
  className = "",
}: {
  project: PortfolioProjectData;
  variant?: "featured" | "secondary" | "mobile";
  className?: string;
}) => {
  const hasThumbnail =
    project.thumbnailImage?._type === "cloudinary.asset" && project.thumbnailImage.public_id;
  const projectUrl = `/portfolio/${project.slug?.current || project._id}`;
  const excerpt =
    project.body?.[0]?.children?.[0]?.text ||
    `An in-depth look at the creative process and impact of ${project.title}.`;

  return (
    <Link href={projectUrl} className={`block relative w-full ${className}`}>
      <div className="absolute inset-0 w-full h-full">
        {hasThumbnail ? (
          <CldImage
            src={project.thumbnailImage.public_id!}
            alt={project.title}
            fill
            sizes={
              variant === "featured"
                ? "(max-width: 768px) 100vw, 66vw"
                : "(max-width: 768px) 100vw, 33vw"
            }
            crop="fill"
            gravity="center"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      <div className="relative h-full p-6 flex flex-col justify-end text-white">
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {project.category && (
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm">
              {project.category}
            </span>
          )}
          {project.division?.title && (
            <span className="inline-flex items-center rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium backdrop-blur-sm border border-amber-500/20">
              {project.division.title}
            </span>
          )}
        </div>

        {/* Title and Description */}
        <h3
          className={`font-serif ${
            variant === "featured" ? "text-3xl" : "text-2xl"
          } font-bold tracking-tight mb-3`}
        >
          {project.title}
        </h3>
        {variant === "featured" && (
          <p className="text-white/80 line-clamp-2 mb-4 max-w-xl">{excerpt}</p>
        )}

        {/* Author - Only show on featured card */}
        {variant === "featured" && project.author && (
          <div className="flex items-center gap-3 mb-4">
            {project.author.image && project.author.image._type === "cloudinary.asset" && (
              <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-white/20">
                <CldImage
                  src={project.author.image.public_id}
                  alt={project.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-medium">{project.author.name}</span>
              {project.author.role && (
                <span className="text-sm text-white/60">{project.author.role}</span>
              )}
            </div>
          </div>
        )}

        {/* Project Excerpt - Mobile / Secondary */}
        {variant !== "featured" && (
          <p className="text-sm text-white/80 line-clamp-2">{excerpt}</p>
        )}

        {/* Metadata & Read More */}
        <div className="flex flex-wrap items-center gap-3 text-xs mt-2">
          {project.releaseDate && (
            <span className="text-white/60">
              {new Date(project.releaseDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
          <Link
            href={projectUrl}
            className="inline-flex items-center font-medium text-primary hover:underline"
          >
            Read more
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
    </Link>
  );
};

export { CaseStudiesShowcase };