import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { Card } from "@/components/ui/card";
import type { PortfolioProjectData } from "@/types/sanity";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type PortfolioCardProps = {
  project: PortfolioProjectData;
};

export function PortfolioCard({ project }: PortfolioCardProps) {
  const imageUrl = urlFor(project.thumbnailImage).width(600).height(450).url();
  const hasSlug = project.slug?.current;
  const slug = hasSlug ? project.slug.current : project._id;
  const href = `/portfolio/${slug}`;

  return (
    <Link href={href}>
      <Card className="group relative block w-full overflow-hidden rounded-lg">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/80">
            {project.category}
          </span>
          <h3 className="mt-1 text-2xl font-bold">{project.title}</h3>
        </div>
        <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
          <ArrowUpRight className="h-5 w-5" />
        </div>
      </Card>
    </Link>
  );
}