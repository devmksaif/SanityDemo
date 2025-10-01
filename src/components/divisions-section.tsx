// components/divisions-section.tsx
"use client";

import React from "react";
import { DivisionData } from "@/types/sanity";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { Container } from "@/components/ui/container";
import { DivisionCard } from "@/components/division-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface DivisionsSectionProps {
  divisions: DivisionData[];
}

export const DivisionsSection: React.FC<DivisionsSectionProps> = ({ divisions }) => {
  if (!divisions || divisions.length === 0) return null;

  return (
    <AnimatedContainer>
      {/* Section Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 px-4 py-2 text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-3">
          <Sparkles className="h-4 w-4" />
          Our Creative Divisions
        </div>
        <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
          Powering Creative Excellence
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
          From music to media, our divisions are the heart of our creative enterprise.
        </p>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:grid-rows-2 gap-6">
        {divisions[0] && (
          <div className="lg:col-span-2 lg:row-span-2">
            <DivisionCard division={divisions[0]} />
          </div>
        )}
        {divisions[1] && (
          <div className="lg:col-span-1 lg:row-span-1">
            <DivisionCard division={divisions[1]} />
          </div>
        )}
        {divisions[2] && (
          <div className="lg:col-span-1 lg:row-span-1">
            <DivisionCard division={divisions[2]} />
          </div>
        )}
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col space-y-6">
        {divisions.slice(0, 3).map((division) => (
          <div key={division._id} className="w-full h-[450px]">
            <DivisionCard division={division} />
          </div>
        ))}
      </div>

      {/* Explore All Button */}
      <div className="mt-12 flex justify-center">
        <Button asChild size="lg" className="group bg-indigo-600 hover:bg-indigo-700 text-white">
          <Link href="/divisions" className="inline-flex items-center">
            Explore All Divisions
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </AnimatedContainer>
  );
};
