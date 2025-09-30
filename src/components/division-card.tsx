"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import type { DivisionData } from "@/types/sanity";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type DivisionCardProps = {
  division: DivisionData;
};

export function DivisionCard({ division }: DivisionCardProps) {
  const imageUrl = urlFor(division.coverImage).width(400).height(300).url();
  const logoUrl = division.logo ? urlFor(division.logo).width(80).url() : null;
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
          "h-[16em] w-[18em] border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-gradient-to-br from-[rgba(75,30,133,1)] to-[rgba(75,30,133,0.01)] text-white font-nunito p-[1em] flex justify-center items-left flex-col gap-[0.75em] backdrop-blur-[12px] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 hover:border-[rgba(75,30,133,0.8)]",
          !hasSlug && "cursor-not-allowed opacity-70"
        )}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 rounded-[1.5em] overflow-hidden">
          <Image
            src={imageUrl}
            alt={division.title}
            fill
            className="object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Logo */}
          {logoUrl && (
            <div className="mb-3">
              <Image
                src={logoUrl}
                alt={`${division.title} Logo`}
                width={60}
                height={30}
                className="h-auto w-12 object-contain drop-shadow-lg"
              />
            </div>
          )}
          
          {/* Title and Description */}
          <h1 className="text-[1.8em] font-medium leading-tight">
            {division.title}
          </h1>
          <p className="text-[0.85em] leading-relaxed text-white/90 line-clamp-3">
            {division.description}
          </p>
        </div>

        {/* Button */}
        <button
          className="relative z-10 h-fit w-fit px-[1em] py-[0.25em] border-[1px] border-white/30 rounded-full flex justify-center items-center gap-[0.5em] overflow-hidden group hover:translate-y-[0.125em] duration-200 backdrop-blur-[12px] bg-white/10 hover:bg-white/20"
        >
          <p className="text-sm">Explore</p>
          <svg
            className="w-5 h-5 group-hover:translate-x-[10%] duration-300"
            stroke="currentColor"
            strokeWidth="1"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
        </button>

        {/* No Slug Warning */}
        {!hasSlug && (
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-yellow-500/90 px-2 py-1 text-xs font-semibold text-white z-20">
            <AlertTriangle className="h-3 w-3" />
            <span>No Slug</span>
          </div>
        )}
      </div>
    </Link>
  );
}