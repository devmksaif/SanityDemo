"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { Card } from "@/components/ui/card";
import type { DivisionData } from "@/types/sanity";
import { ArrowRight, AlertTriangle } from "lucide-react";

type DivisionCardProps = {
  division: DivisionData;
};

export function DivisionCard({ division }: DivisionCardProps) {
  const imageUrl = urlFor(division.coverImage).width(500).height(600).url();
  const hasSlug = division.slug?.current;
  const slug = hasSlug ? division.slug.current : division._id;
  const href = `/divisions/${slug}`;

  const handleClick = (e: React.MouseEvent) => {
    if (!hasSlug) {
      e.preventDefault();
      console.warn(`🚨 Division "${division.title}" has no slug! ID: ${division._id}`);
      alert(`This division has no slug generated. Please go to Sanity Studio and click "Generate" next to the Slug field.`);
    }
  };

  return (
    <Link href={href} onClick={handleClick} className="group block">
      <Card className={`relative h-[60vh] min-h-[500px] w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl ${!hasSlug ? 'opacity-75 cursor-not-allowed' : ''}`}>
        <Image
          src={imageUrl}
          alt={division.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
          {/* Creative logo implementation */}
          {division.logo ? (
            <div className="relative h-12 w-12 mb-4 transition-transform duration-300 group-hover:scale-110">
              <Image
                src={urlFor(division.logo).width(100).url()}
                alt={`${division.title} logo`}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            // Fallback to Shubz logo if no division logo
            <div className="relative h-12 w-32 mb-4 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/logo-3.png"
                alt="Shubz Entertainment"
                fill
                className="object-contain"
              />
            </div>
          )}
          
          <h3 className="text-3xl font-bold tracking-tight">{division.title}</h3>
          
          {/* Slide-up panel on hover */}
          <div className="mt-4 overflow-hidden transition-all duration-500 ease-in-out max-h-0 group-hover:max-h-40">
            <p className="text-sm text-white/80 line-clamp-2 pt-2">{division.description}</p>
            <div className="mt-4 flex items-center text-sm font-semibold text-accent">
              Explore Division <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {!hasSlug && (
            <div className="mt-2 flex items-center gap-1 text-xs text-yellow-300 bg-yellow-900/50 px-2 py-1 rounded">
              <AlertTriangle className="h-3 w-3" />
              <span>No slug - click to fix</span>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}