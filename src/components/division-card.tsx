"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import type { DivisionData } from "@/types/sanity";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { getImageUrl } from "@/lib/cloudinary-helpers";

type DivisionCardProps = {
  division: DivisionData;
};

export function DivisionCard({ division }: DivisionCardProps) {
  // Use the helper function to get the correct image URL
  const imageUrl = getImageUrl(division.coverImage, { width: 400, height: 300 }) || "https://images.unsplash.com/photo-1511379938547-c1f33886168f?w=400&h=300&fit=crop";
  const logoUrl = division.logo ? getImageUrl(division.logo, { width: 80 }) : null;
  
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
    <Link href={href} onClick={handleClick} className="group block">
      <div
        className={cn(
          "flex flex-col w-full max-w-sm overflow-hidden rounded-[1em] bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
          !hasSlug && "cursor-not-allowed opacity-70"
        )}
      >
        {/* Card Header with Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={division.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Logo Overlay */}
          {logoUrl && (
            <div className="absolute top-4 left-4">
              <Image
                src={logoUrl}
                alt={`${division.title} Logo`}
                width={60}
                height={30}
                className="h-auto w-12 object-contain drop-shadow-lg"
              />
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col gap-4">
          {/* Category Tag */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              Division
            </span>
            {division.divisionType && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-orange-400 to-yellow-400 text-white">
                {division.divisionType}
              </span>
            )}
          </div>

          {/* Title and Description */}
          <h4 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
            {division.title}
          </h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
            {division.description}
          </p>
        </div>

        {/* Card Footer */}
        <div className="flex items-center justify-between p-6 pt-0 mt-auto">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8 rounded-full overflow-hidden bg-gradient-to-r from-purple-400 to-pink-400">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={division.title}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full text-white text-xs font-bold">
                  {division.title.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h5 className="text-sm font-medium text-gray-900 dark:text-white">Shubz Entertainment</h5>
              <small className="text-xs text-gray-500 dark:text-gray-400">Creative Division</small>
            </div>
          </div>
          
          {/* Explore Button */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white group-hover:scale-110 transition-transform duration-300">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>

        {/* No Slug Warning */}
        {!hasSlug && (
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-yellow-500/90 px-2 py-1 text-xs font-semibold text-white">
            <AlertTriangle className="h-3 w-3" />
            <span>No Slug</span>
          </div>
        )}
      </div>
    </Link>
  );
}