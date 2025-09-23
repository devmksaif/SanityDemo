// Run this script to check which content needs slugs
// node scripts/check-slugs.js

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dfvr7i1k',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function checkSlugs() {
  console.log('🔍 Checking for missing slugs...\n');

  // Check divisions
  const divisions = await client.fetch(
    `*[_type == "division" && !defined(slug.current)]{title, _id}`
  );
  if (divisions.length > 0) {
    console.log('⚠️  Divisions missing slugs:');
    divisions.forEach(item => console.log(`   - ${item.title} (${item._id})`));
  } else {
    console.log('✅ All divisions have slugs');
  }

  // Check portfolio projects
  const projects = await client.fetch(
    `*[_type == "portfolioProject" && !defined(slug.current)]{title, _id}`
  );
  if (projects.length > 0) {
    console.log('\n⚠️  Portfolio projects missing slugs:');
    projects.forEach(item => console.log(`   - ${item.title} (${item._id})`));
  } else {
    console.log('\n✅ All portfolio projects have slugs');
  }

  // Check news articles
  const news = await client.fetch(
    `*[_type == "newsArticle" && !defined(slug.current)]{title, _id}`
  );
  if (news.length > 0) {
    console.log('\n⚠️  News articles missing slugs:');
    news.forEach(item => console.log(`   - ${item.title} (${item._id})`));
  } else {
    console.log('\n✅ All news articles have slugs');
  }

  console.log('\n🎯 Action needed: Go to /studio and generate slugs for the items above');
}

checkSlugs().catch(console.error);