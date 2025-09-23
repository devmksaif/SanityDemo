"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp, Users } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import type { HomePageData } from "@/types/sanity";

type EnterpriseHeroProps = {
  data?: HomePageData | null;
};

export function EnterpriseHero({ data }: EnterpriseHeroProps) {
  const headline = data?.heroHeadline || "Integrating Media, Music, and Talent Platforms.";
  const subheadline = data?.heroSubheadline || "We are Shubz Entertainment, a creative enterprise building bridges between industries to tell unforgettable global stories.";
  const bgImage = data?.heroBackgroundImage
    ? urlFor(data.heroBackgroundImage).url()
    : "https://images.unsplash.com/photo-1504270997622-AF7a2a4d3a23?q=80&w=2070&auto=format&fit=crop";

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0">
        <Image
          src={bgImage}
          alt="Creative background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center">
        <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Content */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
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
                  className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  Explore Our Work
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                >
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 pt-8 lg:justify-start">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-sm text-white/60">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">50+</div>
                  <div className="text-sm text-white/60">Talents</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">5+</div>
                  <div className="text-sm text-white/60">Divisions</div>
                </div>
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-sm">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60">
                      <Users className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Global Reach</h3>
                    <p className="text-white/60">Connecting creative talents worldwide</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}