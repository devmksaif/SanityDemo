"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative flex h-screen min-h-[700px] w-full flex-col items-center justify-center text-center text-white">
      <div className="absolute inset-0 bg-black">
        <Image
          src="https://images.unsplash.com/photo-1504270997622-AF7a2a4d3a23?q=80&w=2070&auto=format&fit=crop"
          alt="Creative background"
          fill
          className="object-cover opacity-40"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

      <div className="container z-10 flex flex-col items-center gap-8 px-4">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
          Integrating Media, Music,
          <span className="block">and Talent Platforms.</span>
        </h1>
        <p className="max-w-3xl text-lg text-primary-foreground/80 md:text-xl">
          We are Shubz Entertainment, a creative enterprise building bridges between industries to tell unforgettable global stories.
        </p>
        <Button size="lg" variant="secondary" className="group mt-4">
          Explore Our World
          <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
        </Button>
      </div>
    </section>
  );
}