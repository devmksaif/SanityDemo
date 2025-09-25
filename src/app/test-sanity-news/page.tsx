import { client } from "@/lib/sanity";

async function getRawNewsData() {
  // Try a simpler query first
  const simpleQuery = `*[_type == "newsArticle"][0..5]{
    _id,
    title,
    excerpt,
    publishedAt,
    "slug": slug.current,
    coverImage
  }`;
  
  try {
    const data = await client.fetch(simpleQuery);
    console.log('Raw news data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export default async function TestSanityNewsPage() {
  const articles = await getRawNewsData();

  return (
    <div className="min-h-screen bg-background py-8">
      <Container>
        <h1 className="text-3xl font-bold mb-8">Sanity News Test</h1>
        
        <div className="mb-6 p-4 bg-yellow-100 rounded-lg">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">Query Test:</h2>
          <p className="text-yellow-700">Testing simple news article query</p>
          <p className="text-yellow-600 text-sm mt-1">Found: {articles.length} articles</p>
        </div>

        {articles.length > 0 ? (
          <div className="space-y-6">
            {articles.map((article: any) => (
              <div key={article._id} className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-2">{article.title || 'No title'}</h3>
                <p className="text-muted-foreground mb-4">{article.excerpt || 'No excerpt'}</p>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Slug: {article.slug || 'No slug'}</p>
                  <p>Published: {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'No date'}</p>
                  <p>ID: {article._id}</p>
                  <p>Has cover image: {article.coverImage ? 'Yes' : 'No'}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No articles found in Sanity.</p>
            <p className="text-sm text-gray-500 mt-2">Please check your Sanity Studio to ensure you have news articles created.</p>
          </div>
        )}
      </Container>
    </div>
  );
}