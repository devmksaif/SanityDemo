"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp, Users } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import type { HomePageData } from "@/types/sanity";
import Tilt from "react-parallax-tilt";

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
    <section className="relative w-full overflow-hidden bg-black h-[90vh] min-h-[700px] flex items-center">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0">
        <Image
          src={bgImage}
          alt="Creative background"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/20" />
      </div>

      <div className="relative z-10 container mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
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
                className="group bg-white text-black hover:bg-white/90"
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
          </div>

          {/* Visual Element */}
          <div className="relative hidden lg:block">
            <Tilt
              glareEnable={true}
              glareMaxOpacity={0.1}
              glarePosition="all"
              scale={1.05}
              perspective={1000}
            >
              <div className="relative aspect-square w-full max-w-md mx-auto">
                {/* Base card */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10" />
                
                {/* Floating card 1 */}
                <div className="absolute -top-8 -left-8 w-48 h-64 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 animate-float" style={{ animationDelay: '0s' }}>
                  <div className="p-4">
                    <TrendingUp className="h-8 w-8 text-white/50" />
                    <p className="mt-2 text-xs text-white/50">Growth</p>
                  </div>
                </div>

                {/* Floating card 2 */}
                <div className="absolute -bottom-8 -right-8 w-56 h-40 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 animate-float" style={{ animationDelay: '2s' }}>
                   <div className="p-4 text-right">
                    <Users className="h-8 w-8 text-white/50 ml-auto" />
                    <p className="mt-2 text-xs text-white/50">Talent</p>
                  </div>
                </div>

                 {/* Center element */}
                <div className="absolute inset-12 flex items-center justify-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 shadow-2xl shadow-primary/30">
                    <Sparkles className="h-12 w-12 text-primary-foreground" />
                  </div>
                </div>
              </div>
            </Tilt>
          </div>
        </div>
      </div>
    </section>
  );
}