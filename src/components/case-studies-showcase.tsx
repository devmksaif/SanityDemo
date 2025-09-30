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

  const getProjectCategory = (project: PortfolioProjectData) => {
    if (project.category) return project.category;
    if (project.division?.title) return project.division.title;
    return "Creative Project";
  };

  const getMockTestimonial = (project: PortfolioProjectData, index: number) => {
    const testimonials = [
      {
        quote: "This project transformed our creative vision into reality. The team's expertise and attention to detail exceeded all expectations.",
        author: "Sarah Johnson",
        role: "Creative Director",
        company: "Africa Creative Talents"
      },
      {
        quote: "Working with Shubz Entertainment was a game-changer. Their innovative approach and professional execution delivered outstanding results.",
        author: "Michael Chen",
        role: "Project Manager",
        company: "Studio Shubz"
      }
    ];
    return testimonials[index] || testimonials[0];
  };

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
            const imageUrl = urlFor(project.thumbnailImage).width(600).height(700).url();
            const category = getProjectCategory(project);
            const testimonial = getMockTestimonial(project, index);
            const projectUrl = `/portfolio/${project.slug?.current || project._id}`;

            return (
              <div key={project._id}>
                <div className="flex justify-center">
                  <div className="flex w-full max-w-5xl flex-col gap-8 sm:gap-10 sm:flex-row">
                    <div className="h-full w-full max-w-[260px] flex-shrink-0 overflow-hidden rounded-2xl sm:max-w-none sm:aspect-[29/35] sm:w-60 mx-auto sm:mx-0">
                      <Link href={projectUrl} className="block h-full w-full group">
                        <Image
                          src={imageUrl}
                          alt={project.title}
                          width={260}
                          height={350}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </Link>
                    </div>
                    <div className="flex flex-col justify-between gap-6 sm:gap-8">
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
                        {project.author && (
                          <div className="flex items-center gap-3 mt-2">
                            {project.author.image && (
                              <div className="relative h-8 w-8 rounded-full overflow-hidden">
                                <Image
                                  src={urlFor(project.author.image).width(32).height(32).url()}
                                  alt={project.author.name}
                                  width={32}
                                  height={32}
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
                        <q className="text-lg text-muted-foreground italic">
                          {testimonial.quote}
                        </q>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex flex-col gap-1">
                          <p className="text-lg font-semibold text-primary">
                            {testimonial.author}
                          </p>
                          <p className="text-muted-foreground">{testimonial.role}</p>
                        </div>
                        <div className="w-16 h-8 bg-primary/10 rounded flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">{testimonial.company}</span>
                        </div>
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