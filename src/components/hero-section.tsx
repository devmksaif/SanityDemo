"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

type HeroSectionProps = {
  headline: string;
  subheadline: string;
  targetId: string;
};

export function HeroSection({ headline, subheadline, targetId }: HeroSectionProps) {
  const scrollToGrid = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative flex h-[80vh] min-h-[500px] w-full items-center justify-center text-center text-white">
      <div className="absolute inset-0 -z-10 bg-black">
        <Image
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop"
          alt="Abstract background"
          fill
          className="object-cover opacity-50"
          priority
        />
      </div>

      <div className="container z-10 mx-auto flex flex-col items-center gap-6 px-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          {headline}
        </h1>
        <p className="max-w-3xl text-lg text-primary-foreground/80 md:text-xl">
          {subheadline}
        </p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <Button size="lg" onClick={scrollToGrid}>
            Explore Divisions
          </Button>
          <Button size="lg" variant="secondary" onClick={scrollToGrid}>
            See Our Work
          </Button>
        </div>
      </div>
    </section>
  );
}