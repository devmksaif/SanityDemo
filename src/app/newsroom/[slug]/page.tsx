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
        <Container className="py-3">
          <Link 
            href="/newsroom" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Newsroom
          </Link>
        </Container>
      </div>

      {/* Modernized Hero Section */}
      <header className="relative h-[60vh] min-h-[450px] w-full overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>
        <Image
          src={imageUrl}
          alt={article.title}
          fill
          className="absolute inset-0 object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />

        <Container size="lg" className="relative flex h-full flex-col items-center justify-center text-center">
          <div className="max-w-3xl mx-auto space-y-4 animate-fade-in-up">
            <div className="flex items-center justify-center gap-x-6 gap-y-2 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{readTime} min read</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {article.title}
            </h1>
            
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              {article.excerpt}
            </p>
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <main className="py-12 sm:py-16">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <article className="lg:col-span-2 space-y-8">
              {article.body && (
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <PortableText value={article.body} />
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-card rounded-2xl p-6 border">
                <h3 className="text-lg font-semibold mb-4">Article Info</h3>
                <div className="space-y-3">
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