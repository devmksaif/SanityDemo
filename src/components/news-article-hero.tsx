"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Calendar, Clock } from "lucide-react";

interface NewsArticleHeroProps {
  imageUrl: string;
  title: string;
  publishedAt: string;
  readTime: number;
  excerpt: string;
}

export function NewsArticleHero({
  imageUrl,
  title,
  publishedAt,
  readTime,
  excerpt,
}: NewsArticleHeroProps) {
  return (
    <header className="relative overflow-hidden h-[60vh] min-h-[450px] w-full bg-primary text-primary-foreground">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>
      
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="absolute inset-0 object-cover opacity-20"
        priority
        onError={(e) => {
          console.warn(`Failed to load hero image for article: ${title}`);
          (e.target as HTMLImageElement).style.display = 'none';
          (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
        }}
      />
      <div className="hidden absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />

      <Container size="lg" className="relative flex h-full flex-col items-center justify-center text-center">
        <div className="max-w-3xl mx-auto space-y-4 animate-fade-in-up">
          <div className="flex items-center justify-center gap-x-6 gap-y-2 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{readTime} min read</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {title}
          </h1>
          
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            {excerpt}
          </p>
        </div>
      </Container>
    </header>
  );
}