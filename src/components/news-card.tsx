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
    <Link href={href} className="group block">
      <Card className="relative flex h-full flex-col overflow-hidden rounded-xl border-transparent transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
        {/* Animated gradient border */}
        <div className="absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50" />
        </div>
        
        <div className="relative z-10 flex h-full flex-col overflow-hidden rounded-[11px] bg-card">
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
          <CardContent className="flex flex-1 flex-col p-6">
            <div className="mb-4 flex items-center space-x-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(article.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <h3 className="mb-3 text-xl font-semibold leading-snug line-clamp-3 transition-colors duration-300 group-hover:text-primary">
              {article.title}
            </h3>
            <p className="flex-1 text-sm text-muted-foreground line-clamp-3">
              {article.excerpt}
            </p>
            <div className="mt-6 flex items-center text-sm font-semibold text-primary">
              Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}