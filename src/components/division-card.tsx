import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { Card } from "@/components/ui/card";
import type { DivisionData } from "@/types/sanity";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

type DivisionCardProps = {
  division: DivisionData;
};

export function DivisionCard({ division }: DivisionCardProps) {
  const imageUrl = urlFor(division.coverImage).width(500).height(600).url();

  return (
    <div className="group h-[60vh] min-h-[500px] w-full [perspective:1000px]">
      <Card className="relative h-full w-full rounded-lg shadow-xl transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front of the card */}
        <div className="absolute h-full w-full rounded-lg [backface-visibility:hidden]">
          <Image
            src={imageUrl}
            alt={division.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h3 className="text-3xl font-bold">{division.title}</h3>
          </div>
        </div>

        {/* Back of the card */}
        <div className="absolute h-full w-full rounded-lg bg-secondary [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="flex h-full flex-col items-center justify-center p-8 text-center">
            {division.logo && (
              <div className="relative h-16 w-16 mb-4">
                <Image
                  src={urlFor(division.logo).width(100).url()}
                  alt={`${division.title} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <h3 className="text-2xl font-bold text-secondary-foreground">{division.title}</h3>
            <p className="mt-2 flex-grow text-base text-muted-foreground line-clamp-6">
              {division.description}
            </p>
            <Button variant="default" size="sm" className="mt-6 group/btn">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}