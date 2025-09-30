"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { urlFor } from "@/lib/sanity";
import type { NewsArticleData } from "@/types/sanity";

interface Post {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string;
}

interface BlogSectionProps {
  tagline?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  articles: NewsArticleData[]; // Now accepts NewsArticleData
}

const BlogSection = ({
  tagline = "Latest Updates",
  heading = "The Newsroom",
  description = "Stay informed with the latest announcements, stories, and press releases from Shubz Entertainment.",
  buttonText = "View all articles",
  buttonUrl = "/newsroom", // Default to newsroom page
  articles,
}: BlogSectionProps) => {

  const posts: Post[] = articles.map(article => ({
    id: article._id,
    title: article.title,
    summary: article.excerpt,
    label: "News", // Default label, as NewsArticleData doesn't have one
    author: "Shubz Entertainment", // Default author
    published: new Date(article.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    url: `/newsroom/${article.slug?.current || article._id}`,
    image: article.coverImage ? urlFor(article.coverImage).width(700).height(400).url() : "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg", // Fallback image
  }));

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
        <div className="text-center">
          <Badge variant="secondary" className="mb-6">
            {tagline}
          </Badge>
          <h2 className="mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            {heading}
          </h2>
          <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
            {description}
          </p>
          {/* Removed the "View all articles" button as this page already lists all articles */}
        </div>
        
        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="grid grid-rows-[auto_auto_1fr_auto] pt-0"
              >
                <div className="aspect-16/9 w-full overflow-hidden rounded-t-lg">
                  <Link
                    href={post.url}
                    className="transition-opacity duration-200 fade-in hover:opacity-70"
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={700}
                      height={400}
                      className="h-full w-full object-cover object-center"
                    />
                  </Link>
                </div>
                <CardHeader className="pb-2">
                  <Badge variant="secondary" className="mb-2 w-fit">{post.label}</Badge>
                  <h3 className="text-lg font-semibold hover:underline md:text-xl">
                    <Link href={post.url}>
                      {post.title}
                    </Link>
                  </h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground line-clamp-3">{post.summary}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.published}</span>
                  </div>
                  <Link
                    href={post.url}
                    className="flex items-center text-primary hover:underline"
                  >
                    Read more
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-4 p-4 bg-yellow-100 rounded-lg">
              <p className="text-lg text-yellow-800">No news articles found</p>
            </div>
            <p className="text-lg text-muted-foreground">News articles coming soon.</p>
            <Button asChild className="mt-4">
              <Link href="/studio">Add Articles in Studio</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export { BlogSection };