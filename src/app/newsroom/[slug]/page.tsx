import { client, urlFor } from "@/lib/sanity";
import type { NewsArticleData } from "@/types/sanity";
import { Container } from "@/components/ui/container";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { Calendar } from "lucide-react";

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

  return (
    <article className="py-20 sm:py-32">
      <Container size="md">
        <header className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">
            {article.title}
          </h1>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </header>

        <div className="relative mb-12 aspect-[16/9] w-full overflow-hidden rounded-lg">
          <Image src={imageUrl} alt={article.title} fill className="object-cover" />
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <PortableText value={article.body} />
        </div>
      </Container>
    </article>
  );
}