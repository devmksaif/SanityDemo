"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { urlFor } from "@/lib/sanity";
import type { NewsArticleData } from "@/types/sanity";

interface NewsroomListProps {
  articles: NewsArticleData[];
}

// Fallback image URL for when no image is provided
const FALLBACK_IMAGE_URL = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=450&fit=crop";

export function NewsroomList({ articles }: NewsroomListProps) {
  return (
    <div className="grid gap-y-10 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
      {articles.map((article) => {
        // Robust image URL handling
        const imageUrl = article.coverImage 
          ? urlFor(article.coverImage).width(800).height(450).url()
          : FALLBACK_IMAGE_URL;

        return (
          <Card
            key={article._id}
            className="order-last border-0 bg-transparent shadow-none sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2"
          >
            <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
              <div className="sm:col-span-5">
                <div className="mb-4 md:mb-6">
                  <div className="flex flex-wrap gap-3 text-xs tracking-wider text-muted-foreground uppercase md:gap-5 lg:gap-6">
                    <span>News</span>
                    <span>Announcements</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                  <Link
                    href={`/newsroom/${article.slug.current}`}
                    className="hover:underline"
                  >
                    {article.title}
                  </Link>
                </h3>
                <p className="mt-4 text-muted-foreground md:mt-5">
                  {article.excerpt}
                </p>
                <div className="mt-6 flex items-center space-x-4 text-sm md:mt-8">
                  <span className="text-muted-foreground">Shubz Entertainment</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="mt-6 flex items-center space-x-2 md:mt-8">
                  <Link
                    href={`/newsroom/${article.slug.current}`}
                    className="inline-flex items-center font-semibold hover:underline md:text-base group"
                  >
                    <span>Read more</span>
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
              <div className="order-first sm:order-last sm:col-span-5">
                <Link href={`/newsroom/${article.slug.current}`} className="block group">
                  <div className="aspect-16/9 overflow-clip rounded-lg border border-border">
                    <Image
                      src={imageUrl}
                      alt={article.title}
                      width={800}
                      height={450}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        console.warn(`Failed to load image for article: ${article.title}`);
                        // Fallback to a solid color if image fails
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    {/* Fallback for image error */}
                    <div className="hidden h-full w-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                      <span className="text-white text-lg font-medium">No Image</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}