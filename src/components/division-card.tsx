"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import type { DivisionData } from "@/types/sanity";
import { cn } from "@/lib/utils";

type DivisionCardProps = {
  division: DivisionData;
};

export function DivisionCard({ division }: DivisionCardProps) {
  const imageUrl = division.coverImage 
    ? urlFor(division.coverImage).width(500).height(650).url()
    : "https://images.unsplash.com/photo-1511379938547-c1f33886168f?w=500&h=650&fit=crop";
  
  const hasSlug = division.slug?.current;
  const href = hasSlug ? `/divisions/${division.slug.current}` : "#";

  return (
    <Link href={href} className="group block h-[450px] w-full">
      <div
        className={cn(
          "relative h-full w-full overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 group-hover:shadow-xl",
          !hasSlug && "cursor-not-allowed"
        )}
      >
        {/* Background Image */}
        <Image
          src={imageUrl}
          alt={division.title}
          fill
          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        
        {/* Darkening Overlay on Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Content that fades in */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className="transform transition-transform duration-300 group-hover:translate-y-0 translate-y-4">
            <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
              {division.divisionType || "Division"}
            </span>
            <h3 className="mt-3 text-2xl font-bold tracking-tight drop-shadow-md">
              {division.title}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
}