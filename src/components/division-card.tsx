"use client";

import Link from "next/link";
import type { DivisionData } from "@/types/sanity";
import { cn } from "@/lib/utils";
import { CldImage } from 'next-cloudinary';
import Tilt from 'react-parallax-tilt';
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

type DivisionCardProps = {
  division: DivisionData;
};

export function DivisionCard({ division }: DivisionCardProps) {
  const hasSlug = division.slug?.current;
  const href = hasSlug ? `/divisions/${division.slug.current}` : "#";
  const hasCoverImage = division.coverImage?._type === 'cloudinary.asset' && division.coverImage.public_id;

  return (
    <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
      <Tilt
        tiltMaxAngleX={8}
        tiltMaxAngleY={8}
        perspective={1000}
        glareEnable={true}
        glareMaxOpacity={0.15}
        glarePosition="all"
        className="h-full w-full transform-style-3d"
      >
        <Link href={href} className="group block h-[450px] w-full">
          <div
            className={cn(
              "relative h-full w-full overflow-hidden rounded-xl bg-gray-900 shadow-2xl shadow-black/40 transition-all duration-300 transform-style-3d",
              !hasSlug && "cursor-not-allowed"
            )}
          >
            {/* Background Image */}
            {hasCoverImage ? (
              <CldImage
                src={division.coverImage.public_id!}
                alt={division.title}
                fill
                crop="fill"
                gravity="center"
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
            ) : (
              <div className="h-full w-full bg-gray-800" />
            )}
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

            {/* 3D Content Layer */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white transform-style-3d">
              <div className="transform transition-transform duration-500 group-hover:translate-z-10 translate-z-0">
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm border border-white/20">
                  {division.divisionType || "Division"}
                </span>
                <h3 className="mt-3 text-3xl font-bold tracking-tight drop-shadow-lg">
                  {division.title}
                </h3>
                <div className="mt-4 flex items-center text-sm font-medium opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
                  View Division
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </Tilt>
    </motion.div>
  );
}