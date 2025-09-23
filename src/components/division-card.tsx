"use client";

import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { Card } from "@/components/ui/card";
import type { DivisionData } from "@/types/sanity";
import Link from "next/link";
import { AlertTriangle, ExternalLink } from "lucide-react";

type DivisionCardProps = {
  division: DivisionData;
};

export function DivisionCard({ division }: DivisionCardProps) {
  const imageUrl = urlFor(division.coverImage).width(500).height(600).url();
  const hasSlug = division.slug?.current;
  const slug = hasSlug ? division.slug.current : division._id;
  const href = `/divisions/${slug}`;

  // Add detailed debug logging
  console.log('🎯 DivisionCard Debug:', {
    title: division.title,
    _id: division._id,
    hasSlug,
    slug: division.slug?.current,
    href,
    imageUrl: imageUrl.substring(0, 100) + '...'
  });

  const handleClick = (e: React.MouseEvent) => {
    if (!hasSlug) {
      e.preventDefault();
      console.warn(`🚨 Division "${division.title}" has no slug! ID: ${division._id}`);
      alert(`This division has no slug generated. Please go to Sanity Studio and click "Generate" next to the Slug field.`);
    } else {
      console.log(`✅ Division "${division.title}" clicked with slug: ${slug}`);
    }
  };

  return (
    <div className="group h-[60vh] min-h-[500px] w-full [perspective:1000px]">
      <Link href={href} onClick={handleClick}>
        <Card className={`relative h-full w-full rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl ${!hasSlug ? 'opacity-75 cursor-not-allowed' : ''}`}>
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
                <div className="mt-2 flex items-center gap-1 text-xs text-yellow-300 bg-yellow-900/50 px-2 py-1 rounded">
                  <AlertTriangle className="h-3 w-3" />
                  <span>No slug - click to fix</span>
                </div>
              )}
            </div>
          </div>
          {!hasSlug && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-medium">
              <ExternalLink className="h-3 w-3 inline mr-1" />
              Needs slug
            </div>
          )}
        </Card>
      </Link>
    </div>
  );
}