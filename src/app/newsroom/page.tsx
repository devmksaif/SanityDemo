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
      <header className="py-20 sm:py-32">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              Latest Updates
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              The Newsroom
            </h1>
            <p className="text-lg text-muted-foreground">
              Stay informed with the latest announcements, stories, and press releases from Shubz Entertainment.
            </p>
          </div>
        </Container>
      </header>

      <main className="pb-20 sm:pb-32">
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