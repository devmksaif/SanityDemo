"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CldImage } from "next-cloudinary";
import type { NewsArticleData } from "@/types/sanity";

interface NewsroomListProps {
  articles: NewsArticleData[];
}

export function NewsroomList({ articles }: NewsroomListProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-12 md:gap-10 lg:gap-12">
      {articles.map((article, idx) => {
        const hasCoverImage = article.coverImage?._type === "cloudinary.asset" && article.coverImage.public_id;
        const excerpt =
          article.body?.[0]?.children?.[0]?.text ||
          `An in-depth look at the creative process and impact of ${article.title}.`;

        // Alternate layout for asymmetry
        const isOdd = idx % 2 === 0;

        return (
          <div
            key={article._id}
            className={`
              relative flex flex-col-reverse sm:flex-row items-center sm:items-start
              ${isOdd ? "sm:flex-row" : "sm:flex-row-reverse"}
              sm:col-span-12
            `}
          >
            {/* TEXT BLOCK */}
            <div
              className={`
                sm:col-span-6 flex flex-col justify-between gap-4
                ${isOdd ? "sm:pl-8" : "sm:pr-8"} 
                z-10
              `}
            >
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                <span>News</span>
                <span>Announcements</span>
              </div>

              <h3 className="mt-2 text-2xl font-bold lg:text-3xl">
                <Link href={`/newsroom/${article.slug.current}`} className="hover:underline">
                  {article.title}
                </Link>
              </h3>

              <p className="mt-2 text-muted-foreground">{excerpt}</p>

              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <span>Shubz Entertainment</span> •{" "}
                <span>
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              <Link
                href={`/newsroom/${article.slug.current}`}
                className="mt-4 inline-flex items-center gap-1 font-semibold hover:underline"
              >
                Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* IMAGE BLOCK */}
            <div
              className={`
                sm:col-span-6 relative mb-6 sm:mb-0
                ${isOdd ? "sm:-translate-y-8" : "sm:translate-y-8"}
                w-full sm:w-auto
              `}
            >
              <Link href={`/newsroom/${article.slug.current}`} className="block group">
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500">
                  {hasCoverImage ? (
                    <CldImage
                      src={article.coverImage.public_id}
                      alt={article.title}
                      width={800}
                      height={450}
                      crop="fill"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                      <span className="text-white text-lg font-medium">No Image</span>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
