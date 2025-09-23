"use client";

import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { Card } from "@/components/ui/card";
import type { DivisionData } from "@/types/sanity";
import Link from "next/link";
import { AlertTriangle, ExternalLink } from "lucide-react";

type DivisionCardProps = {
  division: DivisionData;
};

export function DivisionCard({ division }: DivisionCardProps) {
  const imageUrl = urlFor(division.coverImage).width(500).height(600).url();
  const hasSlug = division.slug?.current;
  const slug = hasSlug ? division.slug.current : division._id;
  const href = `/divisions/${slug}`;

  const handleClick = (e: React.MouseEvent) => {
    if (!hasSlug) {
      e.preventDefault();
      console.warn(`🚨 Division "${division.title}" has no slug! ID: ${division._id}`);
      alert(`This division has no slug generated. Please go to Sanity Studio and click "Generate" next to the Slug field.`);
    }
  };

  return (
    <div className="group h-[60vh] min-h-[500px] w-full [perspective:1000px]">
      <Link href={href} onClick={handleClick}>
        <Card className={`relative h-full w-full rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl ${!hasSlug ? 'opacity-75 cursor-not-allowed' : ''}`}>
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
                <div className="mt-2 flex items-center gap-1 text-xs text-yellow-300 bg-yellow-900/50 px-2 py-1 rounded">
                  <AlertTriangle className="h-3 w-3" />
                  <span>No slug - click to fix</span>
                </div>
              )}
            </div>
          </div>
          {!hasSlug && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-medium">
              <ExternalLink className="h-3 w-3 inline mr-1" />
              Needs slug
            </div>
          )}
        </Card>
      </Link>
    </div>
  );
}
</dyad-edit>

Let me also add a comprehensive debug page to help you troubleshoot:

<dyad-write path="src/app/debug/page.tsx" description="Creating a comprehensive debug page to troubleshoot slug issues.">
import { client } from "@/lib/sanity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, ExternalLink } from "lucide-react";
import Link from "next/link";

async function getDebugData() {
  const divisions = await client.fetch(
    `*[_type == "division"] | order(_createdAt asc){
      _id, 
      title, 
      "slug": slug.current,
      _updatedAt
    }`
  );
  
  const projects = await client.fetch(
    `*[_type == "portfolioProject"] | order(_createdAt desc){
      _id, 
      title, 
      "slug": slug.current,
      _updatedAt
    }`
  );
  
  const news = await client.fetch(
    `*[_type == "newsArticle"] | order(publishedAt desc){
      _id, 
      title, 
      "slug": slug.current,
      _updatedAt
    }`
  );

  return { divisions, projects, news };
}

export default async function DebugPage() {
  const { divisions, projects, news } = await getDebugData();

  const divisionsWithoutSlugs = divisions.filter(item => !item.slug);
  const projectsWithoutSlugs = projects.filter(item => !item.slug);
  const newsWithoutSlugs = news.filter(item => !item.slug);

  return (
    <div className="container mx-auto py-20">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Content Health Check</h1>
          <p className="text-muted-foreground">Debug and fix slug issues for better SEO</p>
        </div>

        {/* Divisions Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Divisions ({divisions.length} total)
              {divisionsWithoutSlugs.length === 0 && <CheckCircle className="h-5 w-5 text-green-500" />}
              {divisionsWithoutSlugs.length > 0 && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {divisionsWithoutSlugs.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm text-yellow-600 mb-4">
                  {divisionsWithoutSlugs.length} divisions missing slugs:
                </p>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {divisionsWithoutSlugs.map(item => (
                    <div key={item._id} className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                      <span className="text-sm">{item.title}</span>
                      <span className="text-xs text-muted-foreground">ID: {item._id}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-green-600">✅ All divisions have slugs</p>
            )}
          </CardContent>
        </Card>

        {/* Portfolio Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Portfolio Projects ({projects.length} total)
              {projectsWithoutSlugs.length === 0 && <CheckCircle className="h-5 w-5 text-green-500" />}
              {projectsWithoutSlugs.length > 0 && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {projectsWithoutSlugs.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm text-yellow-600 mb-4">
                  {projectsWithoutSlugs.length} projects missing slugs:
                </p>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {projectsWithoutSlugs.map(item => (
                    <div key={item._id} className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                      <span className="text-sm">{item.title}</span>
                      <span className="text-xs text-muted-foreground">ID: {item._id}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-green-600">✅ All portfolio projects have slugs</p>
            )}
          </CardContent>
        </Card>

        {/* News Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              News Articles ({news.length} total)
              {newsWithoutSlugs.length === 0 && <CheckCircle className="h-5 w-5 text-green-500" />}
              {newsWithoutSlugs.length > 0 && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {newsWithoutSlugs.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm text-yellow-600 mb-4">
                  {newsWithoutSlugs.length} news articles missing slugs:
                </p>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {newsWithoutSlugs.map(item => (
                    <div key={item._id} className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                      <span className="text-sm">{item.title}</span>
                      <span className="text-xs text-muted-foreground">ID: {item._id}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-green-600">✅ All news articles have slugs</p>
            )}
          </CardContent>
        </Card>

        {/* Action Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">How to Fix Missing Slugs</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-800">
            <ol className="list-decimal list-inside space-y-2">
              <li>Go to your Sanity Studio at <code>/studio</code></li>
              <li>Find the content that shows "⚠️ Missing slug" in the preview</li>
              <li>Click on the item to edit it</li>
              <li>Find the "Slug" field and click the "Generate" button</li>
              <li>Publish your changes</li>
            </ol>
            <Button asChild className="mt-4 bg-blue-600 hover:bg-blue-700">
              <Link href="/studio" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Sanity Studio
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}