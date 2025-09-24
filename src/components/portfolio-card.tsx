"use client";

import Image from "next/image";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import { urlFor } from "@/lib/sanity";
import { Card } from "@/components/ui/card";
import type { PortfolioProjectData } from "@/types/sanity";
import { ArrowUpRight } from "lucide-react";

type PortfolioCardProps = {
  project: PortfolioProjectData;
};

export function PortfolioCard({ project }: PortfolioCardProps) {
  const imageUrl = urlFor(project.thumbnailImage).width(600).height(450).url();
  const hasSlug = project.slug?.current;
  const slug = hasSlug ? project.slug.current : project._id;
  const href = `/portfolio/${slug}`;

  return (
    <Link href={href} className="group block">
      <Tilt
        tiltMaxAngleX={7}
        tiltMaxAngleY={7}
        glareEnable={true}
        glareMaxOpacity={0.15}
        glarePosition="all"
        scale={1.03}
        perspective={1000}
      >
        <Card className="relative block w-full overflow-hidden rounded-xl shadow-md transition-shadow duration-300 group-hover:shadow-xl">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
            <div className="transition-transform duration-300 group-hover:-translate-y-4">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/80">
                {project.category}
              </span>
              <h3 className="mt-1 text-2xl font-bold">{project.title}</h3>
            </div>
          </div>

          <div className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:scale-110 group-hover:bg-accent/30">
            <ArrowUpRight className="h-6 w-6" />
          </div>
        </Card>
      </Tilt>
    </Link>
  );
}