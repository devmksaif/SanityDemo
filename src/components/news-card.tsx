import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { NewsArticleData } from "@/types/sanity";
import { ArrowRight, Calendar } from "lucide-react";

type NewsCardProps = {
  article: NewsArticleData;
};

export function NewsCard({ article }: NewsCardProps) {
  const imageUrl = urlFor(article.coverImage).width(500).height(350).url();

  return (
    <Link href={`/newsroom/${article.slug.current}`}>
      <Card className="group flex h-full flex-col overflow-hidden rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={imageUrl}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <h3 className="mb-3 text-xl font-semibold line-clamp-2 group-hover:text-primary">
            {article.title}
          </h3>
          <p className="flex-1 text-sm text-muted-foreground line-clamp-3">
            {article.excerpt}
          </p>
          <div className="mt-4 flex items-center text-sm font-semibold text-primary">
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}