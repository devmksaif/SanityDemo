"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { Card, CardContent } from "@/components/ui/card";
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
      <Card className="flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:shadow-xl hover:border-primary">
        {/* Image Section */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>
        
        {/* Content Section */}
        <CardContent className="flex flex-1 flex-col p-6">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            {project.category}
          </span>
          <h3 className="mt-2 text-2xl font-bold">{project.title}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}