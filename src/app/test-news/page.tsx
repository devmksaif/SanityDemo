import { client } from "@/lib/sanity";
import type { NewsArticleData } from "@/types/sanity";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";

async function getNewsArticlesTest() {
  const query = `*[_type == "newsArticle"] | order(publishedAt desc)`;
  const data: NewsArticleData[] = await client.fetch(query);
  return data;
}

export default async function TestNewsPage() {
  const articles = await getNewsArticlesTest();

  return (
    <div className="min-h-screen bg-background py-8">
      <Container>
        <h1 className="text-3xl font-bold mb-8">News Articles Test</h1>
        
        <div className="mb-6 p-4 bg-blue-100 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Debug Info:</h2>
          <p className="text-blue-700">Total articles: {articles.length}</p>
        </div>

        {articles.length > 0 ? (
          <div className="space-y-6">
            {articles.map((article) => (
              <Card key={article._id} className="p-6">
                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Slug: {article.slug?.current || 'No slug'}</p>
                  <p>Published: {new Date(article.publishedAt).toLocaleDateString()}</p>
                  <p>ID: {article._id}</p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No news articles found.</p>
            <p className="text-sm text-gray-500 mt-2">Check if you have any news articles in your Sanity Studio.</p>
          </div>
        )}
      </Container>
    </div>
  );
}