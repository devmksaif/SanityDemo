"use client";

import { useMobile } from "@/hooks/use-mobile";
import { CaseStudy, CaseStudyCard } from "./case-study-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type CaseStudyGridProps = {
  studies: CaseStudy[];
};

export function CaseStudyGrid({ studies }: CaseStudyGridProps) {
  const isMobile = useMobile();

  if (isMobile) {
    return (
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-xs sm:max-w-sm mx-auto"
      >
        <CarouselContent>
          {studies.map((study, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <CaseStudyCard study={study} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {studies.map((study, index) => (
        <CaseStudyCard key={index} study={study} />
      ))}
    </div>
  );
}