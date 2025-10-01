import { client } from "@/lib/sanity";
import type { NewsArticleData } from "@/types/sanity";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { AnimatedContainer } from "@/components/ui/animated-container";

async function getNewsArticles() {
  const query = `*[_type == "newsArticle"] | order(publishedAt desc)`;
  const data: NewsArticleData[] = await client.fetch(query);
  return data;
}

export default async function NewsroomPage() {
  const articles = await getNewsArticles();
  const featuredArticle = articles?.[0];
  const otherArticles = articles?.slice(1);

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
          {/* Featured Article */}
          {featuredArticle && (
            <AnimatedContainer className="mb-16">
              <Link href={`/newsroom/${featuredArticle.slug.current}`} className="group block">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                  <div className="lg:col-span-3 relative aspect-video rounded-lg overflow-hidden">
                    {featuredArticle.coverImage?.public_id && (
                      <CldImage
                        src={featuredArticle.coverImage.public_id}
                        alt={featuredArticle.title}
                        fill
                        crop="fill"
                        gravity="center"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="lg:col-span-2">
                    <p className="text-sm text-muted-foreground mb-2">
                      {new Date(featuredArticle.publishedAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <h2 className="text-3xl font-bold mb-4 group-hover:underline">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-muted-foreground line-clamp-3">
                      {featuredArticle.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </AnimatedContainer>
          )}

          {/* Other Articles Grid */}
          {otherArticles && otherArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherArticles.map(article => (
                <AnimatedContainer key={article._id}>
                  <Link href={`/newsroom/${article.slug.current}`} className="group block">
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                      {article.coverImage?.public_id && (
                        <CldImage
                          src={article.coverImage.public_id}
                          alt={article.title}
                          fill
                          crop="fill"
                          gravity="center"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {new Date(article.publishedAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <h3 className="text-xl font-bold group-hover:underline">{article.title}</h3>
                    <p className="text-muted-foreground mt-2 line-clamp-2">{article.excerpt}</p>
                  </Link>
                </AnimatedContainer>
              ))}
            </div>
          )}
        </Container>
      </main>
    </div>
  );
}