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
  const imageUrl = urlFor(division.coverImage).width(400).height(300).url();
  const hasSlug = division.slug?.current;
  const slug = hasSlug ? division.slug.current : division._id;
  const href = `/divisions/${slug}`;

  // Extract category from description or use a default
  const getCategory = () => {
    // Try to extract category from description (first word or common patterns)
    const desc = division.description.toLowerCase();
    if (desc.includes('film') || desc.includes('movie')) return 'Film';
    if (desc.includes('music') || desc.includes('record')) return 'Music';
    if (desc.includes('dance') || desc.includes('choreography')) return 'Dance';
    if (desc.includes('model') || desc.includes('fashion')) return 'Modeling';
    if (desc.includes('app') || desc.includes('software')) return 'App';
    if (desc.includes('visual') || desc.includes('video')) return 'Visuals';
    if (desc.includes('percussion') || desc.includes('drum')) return 'Percussion';
    if (desc.includes('talent') || desc.includes('creative')) return 'Creative';
    return 'Entertainment'; // Default category
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!hasSlug) {
      e.preventDefault();
      console.warn(`🚨 Division "${division.title}" has no slug! ID: ${division._id}`);
      alert(`This division has no slug generated. Please go to Sanity Studio and click "Generate" next to the Slug field.`);
    }
  };

  return (
    <Link href={href} onClick={handleClick} className="group block">
      <Card className={`relative h-full w-full overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${!hasSlug ? 'opacity-75 cursor-not-allowed' : ''}`}>
        {/* Image Thumbnail */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={division.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        
        {/* Content Section */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
            {division.title}
          </h3>
          
          {/* Category Tag */}
          <div className="mt-2">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-foreground">
              {getCategory()}
            </span>
          </div>

          {!hasSlug && (
            <div className="mt-3 flex items-center gap-1 text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded">
              <AlertTriangle className="h-3 w-3" />
              <span>No slug</span>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}