"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { CldImage } from "next-cloudinary";
import { easeOut, motion } from "framer-motion";
import type { NewsArticleData } from "@/types/sanity";

// Interface remains the same
interface Post {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string | null;
}

interface BlogSectionProps {
  tagline?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  articles: NewsArticleData[];
}

// Animation variants remain the same
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

export const BlogSection = ({
  tagline = "Latest Updates",
  heading = "The Newsroom",
  description = "Stay informed with the latest announcements, stories, and press releases from Shubz Entertainment.",
  buttonText = "Visit Newsroom",
  buttonUrl = "/newsroom",
  articles,
}: BlogSectionProps) => {
  const posts: Post[] = articles.map((article) => ({
    id: article._id,
    title: article.title,
    summary: article.body?.[0]?.children?.[0]?.text || `An insight into ${article.title}.`,
    label: "News",
    author: "Shubz Entertainment",
    published: new Date(article.publishedAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    url: `/newsroom/${article.slug?.current || article._id}`,
    image: article.coverImage?.public_id || null,
  }));

  // We'll focus on the first 3 articles for this curated layout
  const featuredPosts = posts ;

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
        {/* Header remains the same */}
        <div className="text-center">
          <Badge variant="secondary" className="mb-6">{tagline}</Badge>
          <h2 className="mb-3 text-3xl font-semibold md:text-4xl lg:mb-6 font-serif lg:text-5xl">{heading}</h2>
          <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg font-serif">{description}</p>
          <Button variant="link" className="w-full text-base sm:w-auto" asChild>
            <Link href={buttonUrl}>{buttonText}<ArrowRight className="ml-2 size-4" /></Link>
          </Button>
        </div>

        {/* STUNNING ASYMMETRIC GRID */}
        <motion.div
          className="grid w-full grid-cols-1 gap-6 md:grid-cols-12 auto-rows-fr"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {featuredPosts.map((post, idx) => {
            // The first post is the large "Hero" article
            if (idx === 0) {
              return (
                <motion.div
                  key={post.id}
                  variants={itemVariants}
                  className="md:col-span-12 lg:col-span-7 xl:col-span-8 lg:row-span-2"
                >
                  <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} className="h-full">
                    <Card className="relative flex flex-col h-full overflow-hidden text-white group">
                      {post.image ? (
                        <CldImage
                          src={post.image}
                          alt={post.title}
                          width={1200}
                          height={900}
                          crop="fill"
                          className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gray-800" />
                      )}
                      {/* Gradient Overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                      
                      <div className="relative z-10 flex flex-col justify-end h-full p-6 mt-auto md:p-8">
                        <p className="mb-2 text-sm text-gray-300">{post.published}</p>
                        <h3 className="mb-4 text-2xl font-serif font-bold md:text-3xl lg:text-4xl">
                          <Link href={post.url} className="hover:underline">
                            {post.title}
                          </Link>
                        </h3>
                        <p className="mb-6 text-base font-serif leading-relaxed text-gray-200 lg:text-lg">
                          {post.summary}
                        </p>
                        <Link href={post.url} className="flex items-center font-semibold text-white group">
                          Read Story <ArrowRight className="ml-2 transition-transform duration-300 size-4 group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </Card>
                  </motion.div>
                </motion.div>
              );
            }

            // The next two posts are smaller "Side" articles
            return (
              <motion.div
                key={post.id}
                variants={itemVariants}
                className="md:col-span-6 lg:col-span-5 xl:col-span-4"
              >
                <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} className="h-full">
                  <Card className="flex flex-col h-full overflow-hidden group">
                    <div className="overflow-hidden">
                       <Link href={post.url}>
                        {post.image ? (
                          <CldImage
                            src={post.image}
                            alt={post.title}
                            width={800}
                            height={450}
                            crop="fill"
                            className="object-cover w-full h-full aspect-[16/9] transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full bg-gray-200 aspect-[16/9]">
                            <span className="text-gray-500">No Image</span>
                          </div>
                        )}
                       </Link>
                    </div>
                    <div className="flex flex-col flex-grow p-6">
                      <CardHeader className="p-0 mb-4">
                        <p className="mb-2 text-sm text-muted-foreground">{post.published}</p>
                        <h3 className="text-lg font-semibold md:text-xl">
                           <Link href={post.url} className="hover:underline">
                             {post.title}
                           </Link>
                        </h3>
                      </CardHeader>
                      <CardContent className="flex-grow p-0">
                        <p className="text-muted-foreground line-clamp-3 font-serif">{post.summary}</p>
                      </CardContent>
                      <CardFooter className="p-0 pt-6 mt-auto">
                        <Link href={post.url} className="flex font-serif items-center font-semibold text-foreground group">
                          Read more <ArrowRight className="ml-2 transition-transform duration-300 size-4 group-hover:translate-x-1" />
                        </Link>
                      </CardFooter>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};