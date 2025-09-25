"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { ThemedLogo } from "@/components/themed-logo";
import type { HomePageData } from "@/types/sanity";

type EnterpriseHeroProps = {
  data?: HomePageData | null;
};

export function EnterpriseHero({ data }: EnterpriseHeroProps) {
  const headline = data?.heroHeadline || "Integrating Media, Music, and Talent Platforms.";
  const subheadline = data?.heroSubheadline || "We are Shubz Entertainment, a creative enterprise building bridges between industries to tell unforgettable global stories.";

  return (
    <section className="relative w-full overflow-hidden h-[90vh] min-h-[700px] flex items-center">
      {/* Modern Creative Background */}
      <div className="absolute inset-0 bg-primary">
        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-2xl" />
        </div>
        
        {/* Modern geometric shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-accent/20 rotate-45 rounded-lg" />
          <div className="absolute bottom-32 right-32 w-24 h-24 bg-secondary/20 rotate-12 rounded-xl" />
          <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/10 rotate-45 rounded-full" />
          <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-accent/15 -rotate-12 rounded-lg" />
        </div>

        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:20px_20px]" />
        
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span>Creative Enterprise</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              {headline}
            </h1>

            <p className="text-lg text-white/80 sm:text-xl lg:text-2xl">
              {subheadline}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button
                size="lg"
                className="group bg-white text-primary hover:bg-white/90"
              >
                Explore Our Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Visual Element - Clean Logo Display */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-square w-full max-w-md mx-auto">
              {/* Clean background circle */}
              <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm border border-white/20" />
              
              {/* Logo display */}
              <div className="absolute inset-12 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <ThemedLogo 
                    width={200} 
                    height={200} 
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary rounded-full" />
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-white rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}