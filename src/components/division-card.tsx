"use client";

import Image from "next/image";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import { urlFor } from "@/lib/sanity";
import type { DivisionData } from "@/types/sanity";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type DivisionCardProps = {
  division: DivisionData;
};

export function DivisionCard({ division }: DivisionCardProps) {
  const imageUrl = urlFor(division.coverImage).width(500).height(650).url();
  const logoUrl = division.logo ? urlFor(division.logo).width(120).url() : null;
  const hasSlug = division.slug?.current;
  const href = hasSlug ? `/divisions/${division.slug.current}` : "#";

  const handleClick = (e: React.MouseEvent) => {
    if (!hasSlug) {
      e.preventDefault();
      console.warn(`🚨 Division "${division.title}" has no slug! ID: ${division._id}`);
      alert(`This division has no slug generated. Please go to Sanity Studio and click "Generate" next to the Slug field.`);
    }
  };

  return (
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      glareEnable={true}
      glareMaxOpacity={0.1}
      glarePosition="all"
      className="h-full w-full"
    >
      <Link href={href} onClick={handleClick} className="group block h-full w-full">
        <div
          className={cn(
            "relative h-full w-full overflow-hidden rounded-xl border bg-card shadow-lg transition-all duration-300",
            !hasSlug && "cursor-not-allowed opacity-80"
          )}
        >
          {/* Background Image */}
          <Image
            src={imageUrl}
            alt={division.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
            {logoUrl && (
              <Image
                src={logoUrl}
                alt={`${division.title} Logo`}
                width={100}
                height={40}
                className="mb-4 h-auto w-24 object-contain drop-shadow-lg"
              />
            )}
            <h3 className="text-2xl font-bold tracking-tight drop-shadow-md">
              {division.title}
            </h3>
            <p className="mt-1 text-sm text-white/80 drop-shadow-sm line-clamp-2">
              {division.description}
            </p>
            
            {/* Hover Arrow */}
            <div className="mt-4 flex items-center text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Explore Division
              <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </div>

          {!hasSlug && (
            <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-yellow-500/90 px-2 py-1 text-xs font-semibold text-white">
              <AlertTriangle className="h-3 w-3" />
              <span>No Slug</span>
            </div>
          )}
        </div>
      </Link>
    </Tilt>
  );
}