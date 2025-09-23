"use client";

import { useEffect } from "react";

export function DebugClickTracker() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="/divisions/"], a[href^="/portfolio/"], a[href^="/newsroom/"]');
      
      if (link) {
        const href = link.getAttribute('href');
        console.log('🖱️ Click detected on:', href);
        
        // Check if the link is valid
        if (href?.includes('undefined') || href?.includes('null')) {
          console.error('❌ Invalid href detected:', href);
          e.preventDefault();
          alert('Invalid link detected! Please check that slugs are generated in Sanity Studio.');
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
</dyad-edit>

<dyad-edit path="src/app/layout.tsx" description="Adding the debug click tracker to the layout.">
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { EnterpriseHeader } from "@/components/enterprise-header";
import { EnterpriseFooter } from "@/components/enterprise-footer";
import { Toaster } from "@/components/ui/sonner";
import { DebugClickTracker } from "@/components/debug-click-tracker";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Shubz Entertainment - Creative Enterprise",
  description: "Integrating media, music, and talent platforms to tell global stories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          inter.variable
        )}
      >
        <DebugClickTracker />
        <EnterpriseHeader />
        <main className="flex-1">
          {children}
        </main>
        <EnterpriseFooter />
        <Toaster />
        <MadeWithDyad />
      </body>
    </html>
  );
}
</dyad-edit>

Perfect! Now you have comprehensive debugging tools:

## 🔍 **Debugging Tools Added:**

1. **Debug Slug Checker**: Shows warnings on pages when slugs are missing
2. **Debug Page**: Visit `/debug` to see a full report of all missing slugs
3. **Click Tracker**: Monitors clicks and alerts if invalid links are detected
4. **Console Logging**: Detailed logging of what's being fetched and clicked

## 🎯 **Next Steps to Fix the Issue:**

1. **Go to `/debug`** to see exactly which items are missing slugs
2. **Go to `/studio`** and generate slugs for items showing "⚠️ Missing slug"
3. **Check browser console** for detailed logging when you click links
4. **Make sure to publish** your changes in Sanity Studio

The debugging tools will help you identify exactly which items need slugs and guide you through fixing them. Once you generate all slugs, the links will work perfectly!

⏳ Waiting for turbo edits...

<dyad-write path="src/app/divisions/page.tsx" description="Adding comprehensive debugging for division slugs.">
import { client } from "@/lib/sanity";
import type { DivisionData } from "@/types/sanity";
import { DivisionCard } from "@/components/division-card";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, AlertTriangle } from "lucide-react";
import { DebugSlugChecker } from "@/components/debug-slug-checker";

async function getDivisions() {
  const query = `*[_type == "division"] | order(_createdAt asc){
    _id, 
    title, 
    description, 
    logo, 
    coverImage, 
    "slug": slug.current
  }`;
  const data: DivisionData[] = await client.fetch(query);
  
  // Debug logging
  console.log('📋 Divisions fetched:', data.length);
  data.forEach((div, i) => {
    console.log(`  ${i + 1}. "${div.title}" - slug: "${div.slug?.current || 'MISSING'}" - id: ${div._id}`);
  });
  
  return data;
}

export default async function DivisionsPage() {
  const divisions = await getDivisions();
  const hasMissingSlugs = divisions.some(div => !div.slug?.current);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      {hasMissingSlugs && (
        <DebugSlugChecker contentType="division" items={divisions} />
      )}

      <section className="py-20 sm:py-32">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              Our Creative Divisions
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              Powering Creative Excellence
            </h1>
            <p className="text-lg text-muted-foreground">
              Shubz Entertainment is comprised of specialized divisions, each a powerhouse in its respective creative field.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-32">
        <Container>
          {divisions.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {divisions.map((division) => (
                <DivisionCard key={division._id} division={division} />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg text-muted-foreground">Divisions content coming soon.</p>
              <Button asChild className="mt-4">
                <Link href="/studio">Add Divisions in Studio</Link>
              </Button>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}