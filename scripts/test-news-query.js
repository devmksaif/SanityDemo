// Run this script to test the news query
// node scripts/test-news-query.js

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dfvr7i1k',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function testNewsQuery() {
  console.log('🧪 Testing news article query...\n');

  try {
    // Test 1: Simple query
    console.log('Test 1: Simple query');
    const simpleQuery = `*[_type == "newsArticle"]`;
    const simpleResult = await client.fetch(simpleQuery);
    console.log('✅ Simple query found:', simpleResult.length, 'articles');
    if (simpleResult.length > 0) {
      console.log('📋 First article:', JSON.stringify(simpleResult[0], null, 2));
    }

    // Test 2: Detailed query with all fields
    console.log('\nTest 2: Detailed query');
    const detailedQuery = `*[_type == "newsArticle"]{
      _id,
      title,
      excerpt,
      publishedAt,
      "slug": slug.current,
      coverImage,
      body
    }`;
    const detailedResult = await client.fetch(detailedQuery);
    console.log('✅ Detailed query found:', detailedResult.length, 'articles');

    // Test 3: Ordered query
    console.log('\nTest 3: Ordered query');
    const orderedQuery = `*[_type == "newsArticle"] | order(publishedAt desc)`;
    const orderedResult = await client.fetch(orderedQuery);
    console.log('✅ Ordered query found:', orderedResult.length, 'articles');

  } catch (error) {
    console.error('❌ Error testing queries:', error);
  }
}

testNewsQuery();