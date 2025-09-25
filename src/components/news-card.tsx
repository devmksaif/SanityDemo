"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { NewsArticleData } from "@/types/sanity";
import { ArrowRight, Calendar } from "lucide-react";

type NewsCardProps = {
  article: NewsArticleData;
};

export function NewsCard({ article }: NewsCardProps) {
  const imageUrl = urlFor(article.coverImage).width(500).height(350).url();
  const hasSlug = article.slug?.current;
  const slug = hasSlug ? article.slug.current : article._id;
  const href = `/newsroom/${slug}`;

  return (
    <Link href={href} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:shadow-xl">
        <CardHeader className="p-0">
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={imageUrl}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </CardHeader>
        
        <CardContent className="relative flex flex-1 flex-col p-6 overflow-hidden">
          {/* Wipe effect bar */}
          <div className="absolute left-0 top-0 h-full w-1.5 bg-primary transition-all duration-500 ease-in-out group-hover:w-full" />
          
          {/* Content Wrapper */}
          <div className="relative flex flex-1 flex-col">
            <div className="mb-4 flex items-center space-x-2 text-sm text-muted-foreground transition-colors duration-500 group-hover:text-primary-foreground/80">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(article.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <h3 className="mb-3 text-xl font-semibold leading-snug line-clamp-3 transition-colors duration-500 group-hover:text-primary-foreground">
              {article.title}
            </h3>
            <p className="flex-1 text-sm text-muted-foreground line-clamp-3 transition-colors duration-500 group-hover:text-primary-foreground/90">
              {article.excerpt}
            </p>
            <div className="mt-6 flex items-center text-sm font-semibold text-primary transition-colors duration-500 group-hover:text-accent">
              Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}