import { client } from "@/lib/sanity";
import type { NewsArticleData } from "@/types/sanity";
import { NewsCard } from "@/components/news-card";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles } from "lucide-react";

async function getNewsArticles() {
  const query = `*[_type == "newsArticle"] | order(publishedAt desc)`;
  const data: NewsArticleData[] = await client.fetch(query);
  return data;
}

export default async function NewsroomPage() {
  const articles = await getNewsArticles();

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Hero Section */}
      <header className="relative overflow-hidden h-[60vh] min-h-[450px] w-full bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        
        <Container className="relative flex h-full flex-col items-center justify-center text-center">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Latest Updates
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              The Newsroom
            </h1>
            
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Stay informed with the latest announcements, stories, and press releases from Shubz Entertainment.
            </p>
          </div>
        </Container>
      </header>

      <main className="py-16 sm:py-24">
        <Container>
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <NewsCard key={article._id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">News articles coming soon.</p>
              <Button asChild className="mt-4">
                <Link href="/studio">Add Articles in Studio</Link>
              </Button>
            </div>
          )}
        </Container>
      </main>
    </div>
  );
}