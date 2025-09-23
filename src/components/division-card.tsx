import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { Card } from "@/components/ui/card";
import type { DivisionData } from "@/types/sanity";

type DivisionCardProps = {
  division: DivisionData;
};

export function DivisionCard({ division }: DivisionCardProps) {
  const imageUrl = urlFor(division.coverImage).width(500).height(600).url();

  return (
    <Card className="group relative block h-[60vh] min-h-[500px] w-full overflow-hidden rounded-lg">
      <Image
        src={imageUrl}
        alt={division.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        {division.logo && (
          <div className="relative h-12 w-12 mb-4">
            <Image
              src={urlFor(division.logo).width(100).url()}
              alt={`${division.title} logo`}
              fill
              className="object-contain"
            />
          </div>
        )}
        <h3 className="text-3xl font-bold">{division.title}</h3>
        <p className="mt-2 text-base text-primary-foreground/80 line-clamp-3">
          {division.description}
        </p>
      </div>
    </Card>
  );
}