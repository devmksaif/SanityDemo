import { client } from "@/lib/sanity";
import type { DivisionData } from "@/types/sanity";
import { DivisionCard } from "@/components/division-card";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, AlertTriangle } from "lucide-react";
import { ensureSlugsExist } from "@/lib/sanity-helpers";

async function getDivisions() {
  const query = `*[_type == "division"] | order(_createdAt asc){
    _id, 
    title, 
    description, 
    logo, 
    coverImage, 
    slug
  }`;
  const data: DivisionData[] = await client.fetch(query);
  
  // Add detailed logging
  console.log('📊 Divisions query result:', data);
  console.log('📊 First division data:', data[0]);
  
  return data;
}

export default async function DivisionsPage() {
  const divisions = await getDivisions();
  const slugIssues = await ensureSlugsExist();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      {slugIssues.divisions.length > 0 && (
        <div className="bg-yellow-50 border-b border-yellow-200">
          <Container className="py-4">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm font-medium">
                {slugIssues.divisions.length} division(s) missing slugs. Please generate them in Sanity Studio for SEO.
              </span>
              <Button asChild size="sm" variant="outline" className="ml-auto">
                <Link href="/studio">Fix in Studio</Link>
              </Button>
            </div>
          </Container>
        </div>
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