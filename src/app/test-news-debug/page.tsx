import { client } from "@/lib/sanity";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";

async function getNewsArticlesDebug() {
  try {
    // Test multiple query approaches
    const queries = [
      `*[_type == "newsArticle"]`,
      `*[_type == "newsArticle"]{ _id, title, excerpt, publishedAt, "slug": slug.current, coverImage }`,
      `*[_type == "newsArticle"] | order(publishedAt desc)`
    ];
    
    const results = [];
    
    for (let i = 0; i < queries.length; i++) {
      try {
        const result = await client.fetch(queries[i]);
        results.push({
          query: queries[i],
          success: true,
          count: result.length,
          data: result
        });
      } catch (error) {
        results.push({
          query: queries[i],
          success: false,
          error: error
        });
      }
    }
    
    return results;
  } catch (error) {
    console.error('Error in getNewsArticlesDebug:', error);
    return [];
  }
}

export default async function TestNewsDebugPage() {
  const results = await getNewsArticlesDebug();

  return (
    <div className="min-h-screen bg-background py-8">
      <Container>
        <h1 className="text-3xl font-bold mb-8">News Articles Debug Test</h1>
        
        <div className="space-y-6">
          {results.map((result, index) => (
            <Card key={index} className="p-6">
              <h2 className="text-lg font-semibold mb-4">Query {index + 1}: {result.success ? '✅ Success' : '❌ Failed'}</h2>
              <code className="text-sm bg-gray-100 p-2 rounded block mb-4">{result.query}</code>
              
              {result.success ? (
                <div>
                  <p className="text-green-600 mb-2">Found {result.count} articles</p>
                  {result.count > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-medium">First article data:</h3>
                      <pre className="text-xs bg-gray-50 p-3 rounded overflow-auto">
                        {JSON.stringify(result.data[0], null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-red-600">Error: {JSON.stringify(result.error)}</p>
              )}
            </Card>
          ))}
          
          {results.length === 0 && (
            <Card className="p-6 bg-red-50">
              <p className="text-red-600">All queries failed. Please check your Sanity connection and data.</p>
            </Card>
          )}
        </div>
      </Container>
    </div>
  );
}