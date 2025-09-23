import { ensureSlugsExist } from "@/lib/sanity-helpers";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle } from "lucide-react";

export default async function SanityDebugPage() {
  const slugIssues = await ensureSlugsExist();

  const totalIssues = slugIssues.divisions.length + slugIssues.projects.length + slugIssues.news.length;

  return (
    <div className="container mx-auto py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Sanity Content Health Check</h1>
        
        <div className="space-y-6">
          {/* Divisions Status */}
          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Divisions</h2>
            {slugIssues.divisions.length === 0 ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>All divisions have slugs ✓</span>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-yellow-600">
                  <AlertTriangle className="h-5 w-5" />
                  <span>{slugIssues.divisions.length} divisions missing slugs</span>
                </div>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {slugIssues.divisions.map((item) => (
                    <li key={item._id}>{item.title}</li>
                  ))}
                </ul>
                <Button asChild className="mt-4">
                  <a href="/studio" target="_blank" rel="noopener noreferrer">
                    Fix in Sanity Studio
                  </a>
                </Button>
              </div>
            )}
          </div>

          {/* Portfolio Status */}
          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Portfolio Projects</h2>
            {slugIssues.projects.length === 0 ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>All projects have slugs ✓</span>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-yellow-600">
                  <AlertTriangle className="h-5 w-5" />
                  <span>{slugIssues.projects.length} projects missing slugs</span>
                </div>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {slugIssues.projects.map((item) => (
                    <li key={item._id}>{item.title}</li>
                  ))}
                </ul>
                <Button asChild className="mt-4">
                  <a href="/studio" target="_blank" rel="noopener noreferrer">
                    Fix in Sanity Studio
                  </a>
                </Button>
              </div>
            )}
          </div>

          {/* News Status */}
          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">News Articles</h2>
            {slugIssues.news.length === 0 ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>All news articles have slugs ✓</span>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-yellow-600">
                  <AlertTriangle className="h-5 w-5" />
                  <span>{slugIssues.news.length} news articles missing slugs</span>
                </div>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {slugIssues.news.map((item) => (
                    <li key={item._id}>{item.title}</li>
                  ))}
                </ul>
                <Button asChild className="mt-4">
                  <a href="/studio" target="_blank" rel="noopener noreferrer">
                    Fix in Sanity Studio
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>

        {totalIssues > 0 && (
          <div className="mt-8 rounded-lg bg-blue-50 border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">How to Fix Missing Slugs</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
              <li>Go to your Sanity Studio at <code>/studio</code></li>
              <li>Find the content that shows "⚠️ Missing slug" in the preview</li>
              <li>Click on the item to edit it</li>
              <li>Find the "Slug" field and click the "Generate" button</li>
              <li>Publish your changes</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
</dyad-edit>

Now let me update the card components to show a warning when slugs are missing:

<dyad-edit path="src/components/division-card.tsx" description="Adding visual indicator for missing slugs.">
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { Card } from "@/components/ui/card";
import type { DivisionData } from "@/types/sanity";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

type DivisionCardProps = {
  division: DivisionData;
};

export function DivisionCard({ division }: DivisionCardProps) {
  const imageUrl = urlFor(division.coverImage).width(500).height(600).url();
  const hasSlug = division.slug?.current;
  const slug = hasSlug ? division.slug.current : division._id;

  return (
    <Link href={`/divisions/${slug}`}>
      <div className="group h-[60vh] min-h-[500px] w-full [perspective:1000px]">
        <Card className="relative h-full w-full rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl">
          <div className="absolute h-full w-full rounded-lg">
            <Image
              src={imageUrl}
              alt={division.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              {division.logo && (
                <div className="relative h-12 w-12 mb-4">
                  <Image
                    src={urlFor(division.logo).width(100).url()}
                    alt={`${division.title} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <h3 className="text-3xl font-bold">{division.title}</h3>
              {!hasSlug && (
                <div className="mt-2 flex items-center gap-1 text-xs text-yellow-300">
                  <AlertTriangle className="h-3 w-3" />
                  <span>Missing slug - SEO impact</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </Link>
  );
}
</dyad-edit>

Now let me create a simple script that you can run to check which content needs slugs:

<dyad-write path="scripts/check-slugs.js" description="Creating a script to check for missing slugs.">
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