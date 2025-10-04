import { client } from "@/lib/sanity";
import type { NewsArticleData } from "@/types/sanity";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Sparkles, Clock, Calendar, User, ArrowRight, Newspaper, Filter, Grid, List } from "lucide-react";
import { NewsroomClient } from "@/components/newsroom-client";
import GradientText from "@/components/GradientText";
import RotatingText from "@/components/RotatingText";

async function getNewsArticles() {
  const query = `*[_type == "newsArticle"] | order(publishedAt desc)`;
  const data: NewsArticleData[] = await client.fetch(query);
  return data;
}

export default async function NewsroomPage() {
  const articles = await getNewsArticles();

  const newsCategories = [
    "Breaking News",
    "Company Updates", 
    "Industry Insights",
    "Press Releases"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Hero Section */}
      <header className="relative overflow-hidden h-[80vh] min-h-[600px] w-full bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse opacity-70" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-bounce opacity-60" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-white/10 rounded-full blur-2xl animate-pulse opacity-50" />
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-primary/20 rounded-full blur-xl animate-pulse opacity-40" />
        </div>
        
        <Container className="relative flex h-full flex-col items-center justify-center text-center">
          <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm border border-white/20">
              <Newspaper className="h-4 w-4" />
              <span>Latest Updates</span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <GradientText 
                colors={['#60a5fa', '#a855f7', '#60a5fa']}
                animationSpeed={5}
                showBorder={false}
                className="inline-block"
              >
                The Newsroom
              </GradientText>
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Stay informed with{" "}
              <RotatingText
                texts={newsCategories}
                className="font-semibold text-accent"
                rotationInterval={2500}
                transition={{ type: "spring", damping: 20, stiffness: 200 }}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-120%", opacity: 0 }}
              />{" "}
              from Shubz Entertainment's dynamic newsroom.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm group"
              >
                <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Featured Stories
              </Button>
              
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Subscribe to Updates
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/20">
              {[
                { label: 'Published Articles', value: articles.length || '50+' },
                { label: 'Press Releases', value: '25+' },
                { label: 'Industry Features', value: '15+' },
                { label: 'Media Coverage', value: '100+' }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-accent">{stat.value}</div>
                  <div className="text-sm text-white/70 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <main className="py-20 sm:py-28">
        <Container>
          {/* Section Header */}
          <div className="mb-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-1 w-12 bg-primary"></div>
                  <Badge variant="outline" className="text-xs tracking-wider border-primary/20 dark:border-primary/80 text-primary dark:text-primary">
                    NEWSROOM
                  </Badge>
                </div>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
                  Latest Stories & Updates
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Discover the latest news, announcements, and industry insights from Shubz Entertainment and our creative divisions.
                </p>
              </div>
            </div>
          </div>

          {/* News Articles */}
          <NewsroomClient articles={articles} />
        </Container>
      </main>
    </div>
  );
}