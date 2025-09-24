import { client, urlFor } from "@/lib/sanity";
import type { NewsArticleData } from "@/types/sanity";
import { Container } from "@/components/ui/container";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getArticle(slug: string) {
  const query = `*[_type == "newsArticle" && slug.current == $slug][0]`;
  const data: NewsArticleData = await client.fetch(query, { slug });
  return data;
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const imageUrl = urlFor(article.coverImage).width(1200).height(600).url();
  const readTime = Math.ceil(article.body ? article.body.length / 200 : 5);

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <Container className="py-4">
          <Link 
            href="/newsroom" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Newsroom
          </Link>
        </Container>
      </div>

      {/* Animated Hero Section */}
      <header className="relative py-16 sm:py-24 bg-gradient-to-br from-accent/10 via-primary/10 to-secondary/10">
        <Container size="lg">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-primary">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-accent">
                <Clock className="h-4 w-4" />
                <span>{readTime} min read</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary-glow">
              {article.title}
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {article.excerpt}
            </p>
          </div>
        </Container>
      </header>

      {/* Hero Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden border-b-4 border-primary">
        <Image
          src={imageUrl}
          alt={article.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Main Content */}
      <main className="py-16 sm:py-24">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-2 space-y-12">
              {article.body && (
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <PortableText value={article.body} />
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="space-y-8">
              <div className="bg-card rounded-2xl p-6 border">
                <h3 className="text-lg font-semibold mb-4">Article Info</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Published</span>
                    <span className="font-medium">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Read Time</span>
                    <span className="font-medium">{readTime} minutes</span>
                  </div>
                </div>
              </div>

              <div className="bg-muted rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get the latest news and updates from Shubz Entertainment.
                </p>
                <Button className="w-full">
                  Subscribe to Newsletter
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Bookmark className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </main>
    </div>
  );
}