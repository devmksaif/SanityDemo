"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { NewsArticleData } from "@/types/sanity";
import { CldImage } from 'next-cloudinary';

interface Post {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string | null; // Can be public_id or null
}

interface BlogSectionProps {
  tagline?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  articles: NewsArticleData[];
}

const BlogSection = ({
  tagline = "Latest Updates",
  heading = "The Newsroom",
  description = "Stay informed with the latest announcements, stories, and press releases from Shubz Entertainment.",
  buttonText = "Visit Newsroom",
  buttonUrl = "/newsroom",
  articles,
}: BlogSectionProps) => {

  const posts: Post[] = articles.map(article => ({
    id: article._id,
    title: article.title,
    summary: article.excerpt,
    label: "News",
    author: "Shubz Entertainment",
    published: new Date(article.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    url: `/newsroom/${article.slug?.current || article._id}`,
    image: article.coverImage?.public_id || null, // Use public_id directly
  }));

  return (
    <section className="py-12 sm:py-16">
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
          <Button variant="link" className="w-full sm:w-auto" asChild>
            <Link href={buttonUrl}>
              {buttonText}
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="grid grid-rows-[auto_auto_1fr_auto] pt-0"
            >
              <div className="aspect-16/9 w-full">
                <Link
                  href={post.url}
                  className="transition-opacity duration-200 fade-in hover:opacity-70"
                >
                  {post.image ? (
                    <CldImage
                      src={post.image}
                      alt={post.title}
                      width={700}
                      height={400}
                      crop="fill"
                      className="h-full w-full object-cover object-center"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                </Link>
              </div>
              <CardHeader>
                <h3 className="text-lg font-semibold hover:underline md:text-xl">
                  <Link href={post.url}>
                    {post.title}
                  </Link>
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.summary}</p>
              </CardContent>
              <CardFooter>
                <Link
                  href={post.url}
                  className="flex items-center text-foreground hover:underline"
                >
                  Read more
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { BlogSection };