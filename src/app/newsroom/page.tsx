import { client } from "@/lib/sanity";
import type { NewsArticleData } from "@/types/sanity";
import { Container } from "@/components/ui/container";
import { Sparkles } from "lucide-react";
import { NewsroomList } from "@/components/newsroom-list";

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

      {/* Newsroom List Section */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="text-center mb-16">
            <h2 className="mx-auto mb-6 text-3xl font-semibold text-pretty md:text-4xl lg:max-w-3xl">
              Latest Articles
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
              Discover the latest insights, announcements, and stories from the world of Shubz Entertainment.
            </p>
          </div>
          
          {articles.length > 0 ? (
            <NewsroomList articles={articles} />
          ) : (
            <div className="text-center">
              <p className="text-lg text-muted-foreground">No news articles found. Check back soon!</p>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}