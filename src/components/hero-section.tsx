"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import type { HomePageData } from "@/types/sanity";

type HeroSectionProps = {
  data?: HomePageData | null;
};

export function HeroSection({ data }: HeroSectionProps) {
  const headline = data?.heroHeadline || "Integrating Media, Music, and Talent Platforms.";
  const subheadline = data?.heroSubheadline || "We are Shubz Entertainment, a creative enterprise building bridges between industries to tell unforgettable global stories.";
  const bgImage = data?.heroBackgroundImage
    ? urlFor(data.heroBackgroundImage).url()
    : "https://images.unsplash.com/photo-1504270997622-AF7a2a4d3a23?q=80&w=2070&auto=format&fit=crop";

  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center text-center text-white">
      {/* Stunning modern background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-secondary">
        {/* Background image with overlay */}
        <Image
          src={bgImage}
          alt="Creative background"
          fill
          className="object-cover opacity-20 mix-blend-overlay"
          priority
        />
        
        {/* Modern geometric overlay */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
        </div>
        
        {/* Subtle pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:30px_30px]" />
      </div>

      <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 z-10 flex flex-col items-center gap-8">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl text-primary-glow">
          {headline}
        </h1>
        <p className="max-w-3xl text-lg text-white/90 md:text-xl">
          {subheadline}
        </p>
        <Button size="lg" variant="secondary" className="group bg-white text-primary hover:bg-white/90">
          Explore Our World
          <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
        </Button>
      </div>
    </section>
  );
}