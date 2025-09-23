import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { Card } from "@/components/ui/card";
import type { DivisionData } from "@/types/sanity";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

type DivisionCardProps = {
  division: DivisionData;
};

export function DivisionCard({ division }: DivisionCardProps) {
  const imageUrl = urlFor(division.coverImage).width(500).height(600).url();
  const hasSlug = division.slug?.current;
  const slug = hasSlug ? division.slug.current : division._id;

  return (
    <Link href={`/divisions/${slug}`}>
      <div className="group h-[60vh] min-h-[500px] w-full [perspective:1000px]">
        <Card className="relative h-full w-full rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl">
          <div className="absolute h-full w-full rounded-lg">
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
              {!hasSlug && (
                <div className="mt-2 flex items-center gap-1 text-xs text-yellow-300">
                  <AlertTriangle className="h-3 w-3" />
                  <span>Missing slug - SEO impact</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </Link>
  );
}