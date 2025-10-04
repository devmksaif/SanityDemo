"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { Clock, Calendar, User, ArrowRight, Filter, Grid, List, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NewsArticleData } from "@/types/sanity";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99] as const,
    },
  },
};

interface NewsCardProps {
  article: NewsArticleData;
  featured?: boolean;
}

function NewsCard({ article, featured = false }: NewsCardProps) {
  const hasSlug = article.slug?.current;
  const href = hasSlug ? `/newsroom/${article.slug.current}` : "#";
  const hasImage = article.coverImage?._type === 'cloudinary.asset' && article.coverImage.public_id;

  const handleClick = (e: React.MouseEvent) => {
    if (!hasSlug) {
      e.preventDefault();
      console.warn(`🚨 Article "${article.title}" has no slug! ID: ${article._id}`);
      alert(`This article has no slug generated. Please go to Sanity Studio and click "Generate" next to the Slug field.`);
    }
  };

  const displayDate = article.publishedAt 
    ? new Date(article.publishedAt).toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
      })
    : "Date TBA";

  const displayAuthor = "Shubz Entertainment";

  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -8 }} 
      transition={{ duration: 0.3 }}
      className="group h-full"
    >
      <Link href={href} onClick={handleClick} className="block h-full">
        <Card className={cn(
          "overflow-hidden rounded-xl border-0 bg-card transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 h-full flex flex-col",
          featured && "md:col-span-2 md:row-span-2",
          !hasSlug && "opacity-75 cursor-not-allowed"
        )}>
          <div className={cn(
            "relative w-full overflow-hidden",
            featured ? "aspect-[16/9]" : "aspect-[4/3]"
          )}>
            {hasImage ? (
              <CldImage
                src={article.coverImage.public_id!}
                alt={article.title}
                width={featured ? "800" : "600"}
                height={featured ? "450" : "450"}
                crop="fill"
                gravity="center"
                className="object-cover transition-all duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-blue-100 via-blue-50 to-purple-100 dark:from-blue-900/20 dark:via-blue-800/10 dark:to-purple-900/20 flex items-center justify-center">
                <ImageIcon className="h-16 w-16 text-muted-foreground/40" />
              </div>
            )}
            
            {/* Overlay with enhanced hover effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
            
            {/* Category badge */}
            <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <Badge className="bg-blue-500/90 text-white backdrop-blur-sm">
                News
              </Badge>
            </div>
            
            {/* Read more button */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
              <Button size="sm" className="bg-white text-black hover:bg-white/90 backdrop-blur-sm">
                Read Article
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className={cn("p-6 flex-1 flex flex-col", featured && "p-8")}>
            <div className="flex-1">
              <h3 className={cn(
                "font-bold text-foreground group-hover:text-blue-600 transition-colors duration-300 line-clamp-2",
                featured ? "text-2xl lg:text-3xl mb-3" : "text-xl mb-3"
              )}>
                {article.title}
              </h3>
              
              {article.excerpt && (
                <p className={cn(
                  "text-muted-foreground leading-relaxed line-clamp-3",
                  featured ? "text-lg mb-6" : "text-base mb-4"
                )}>
                  {article.excerpt}
                </p>
              )}
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{displayAuthor}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{displayDate}</span>
                </div>
              </div>
              
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

interface NewsroomClientProps {
  articles: NewsArticleData[];
}

export function NewsroomClient({ articles }: NewsroomClientProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Get unique categories from articles (simplified since we don't have category field)
  const categories = ['all', 'News', 'Press Release', 'Update'];
  
  // Filter articles based on selected category (simplified filtering)
  const filteredArticles = articles;

  if (!articles || articles.length === 0) {
    return (
      <motion.div
        className="text-center py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ImageIcon className="h-16 w-16 text-muted-foreground/40 mx-auto mb-6" />
        <h3 className="text-2xl font-semibold text-foreground mb-4">No Articles Found</h3>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          Articles will appear here once they're published in the newsroom.
        </p>
        <Button asChild>
          <Link href="/studio">Add Articles in Studio</Link>
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Filter and View Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category === 'all' ? 'All Articles' : category}
            </Button>
          ))}
        </div>
        
        {/* View Mode Toggle */}
        <div className="flex rounded-lg border p-1">
          <Button
            variant={viewMode === 'grid' ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="px-3"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode('list')}
            className="px-3"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <motion.div
          className={cn(
            "grid gap-8",
            viewMode === 'grid' 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr" 
              : "grid-cols-1 lg:grid-cols-2 gap-12"
          )}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredArticles.map((article, index) => (
            <NewsCard 
              key={article._id} 
              article={article} 
              featured={index === 0 && viewMode === 'grid'}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ImageIcon className="h-16 w-16 text-muted-foreground/40 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-foreground mb-4">No Articles Found</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            {selectedCategory === 'all' 
              ? "Articles will appear here once they're published."
              : `No articles found in the "${selectedCategory}" category.`
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {selectedCategory !== 'all' && (
              <Button variant="outline" onClick={() => setSelectedCategory('all')}>
                View All Articles
              </Button>
            )}
            <Button asChild>
              <Link href="/studio">Add Articles in Studio</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}