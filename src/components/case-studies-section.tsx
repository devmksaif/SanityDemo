"use client";

import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { urlFor } from "@/lib/sanity";
import type { PortfolioProjectData } from "@/types/sanity";

interface CaseStudiesSectionProps {
  projects: PortfolioProjectData[];
  title?: string;
  subtitle?: string;
}

const CaseStudiesSection = ({
  projects,
  title = "Real results from creative excellence",
  subtitle = "Showcasing our work across film, music, dance, and digital media"
}: CaseStudiesSectionProps) => {
  // Get the first two projects for the main showcase
  const mainProjects = projects.slice(0, 2);
  
  // Calculate some mock statistics based on project data
  const getProjectStats = (project: PortfolioProjectData, index: number) => {
    const stats = [
      {
        value: "98%",
        label: "Client Satisfaction",
        subtext: "Project delivered on time"
      },
      {
        value: "4.2x",
        label: "Engagement Boost",
        subtext: "Increased audience reach"
      },
      {
        value: "3.8x",
        label: "ROI Improvement",
        subtext: "Within first quarter"
      },
      {
        value: "72%",
        label: "Reduced Production Time",
        subtext: "Streamlined workflow"
      }
    ];
    return stats.slice(index * 2, (index + 1) * 2);
  };

  const getCategoryFromProject = (project: PortfolioProjectData) => {
    if (project.category) return project.category;
    if (project.division?.title) return project.division.title;
    return "Creative Project";
  };

  const getMockTestimonial = (project: PortfolioProjectData) => {
    const testimonials = [
      {
        quote: "This project transformed our creative vision into reality. The team's expertise and attention to detail exceeded all expectations.",
        author: "Sarah Johnson",
        role: "Creative Director"
      },
      {
        quote: "Working with Shubz Entertainment was a game-changer. Their innovative approach and professional execution delivered outstanding results.",
        author: "Michael Chen",
        role: "Project Manager"
      }
    ];
    return testimonials[Math.floor(Math.random() * testimonials.length)];
  };

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6 text-center mb-16">
          <p className="font-medium text-primary">Featured Case Studies</p>
          <h2 className="text-4xl font-medium md:text-5xl">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <div className="mt-20 space-y-20">
          {mainProjects.map((project, index) => {
            const imageUrl = urlFor(project.thumbnailImage).width(600).height(700).url();
            const category = getCategoryFromProject(project);
            const testimonial = getMockTestimonial(project);
            const stats = getProjectStats(project, index);
            const projectUrl = `/portfolio/${project.slug?.current || project._id}`;

            return (
              <div key={project._id}>
                <div className="grid gap-16 lg:grid-cols-3 xl:gap-24">
                  <div className="flex flex-col gap-10 border-border sm:flex-row lg:col-span-2 lg:border-r lg:pr-16 xl:pr-24">
                    <div className="aspect-29/35 h-full w-full max-w-60 rounded-2xl overflow-hidden">
                      <Link href={projectUrl} className="block h-full w-full group">
                        <Image
                          src={imageUrl}
                          alt={project.title}
                          width={300}
                          height={350}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </Link>
                    </div>
                    <div className="flex h-full flex-col justify-between gap-10">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            {category}
                          </span>
                          {project.division?.title && (
                            <span className="text-sm text-muted-foreground">
                              — {project.division.title}
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl font-semibold hover:underline">
                          <Link href={projectUrl}>
                            {project.title}
                          </Link>
                        </h3>
                        <q className="text-lg text-muted-foreground italic">
                          {testimonial.quote}
                        </q>
                      </div>
                      <div className="flex items-end gap-6">
                        <div className="flex flex-col gap-1">
                          <p className="text-lg font-semibold text-primary">
                            {testimonial.author}
                          </p>
                          <p className="text-muted-foreground">{testimonial.role}</p>
                        </div>
                        <div className="w-16 h-8 bg-primary/10 rounded flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">Client</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-10 self-center lg:flex-col">
                    {stats.map((stat, statIndex) => (
                      <div key={statIndex} className="flex flex-col gap-2">
                        <p className="text-4xl font-medium text-primary sm:text-5xl">
                          {stat.value}
                        </p>
                        <p className="font-semibold text-primary">
                          {stat.label}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {stat.subtext}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                {index < mainProjects.length - 1 && <Separator className="my-20" />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { CaseStudiesSection };