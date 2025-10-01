import { client } from "@/lib/sanity";
import type { DivisionData } from "@/types/sanity";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, AlertTriangle } from "lucide-react";
import { ensureSlugsExist } from "@/lib/sanity-helpers";
import { DivisionsPageClient } from "@/components/divisions-page-client";

async function getDivisions() {
  const query = `*[_type == "division"] | order(_createdAt asc){
    _id, 
    title, 
    description, 
    logo, 
    coverImage, 
    slug,
    divisionType
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
    <div className="min-h-screen bg-background">
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

      {/* Modern Hero Section */}
      <section className="relative overflow-hidden h-[60vh] min-h-[450px] w-full bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-32 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute -bottom-32 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>
        
        <Container className="relative flex h-full flex-col items-center justify-center text-center">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Our Creative Divisions
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Powering Creative Excellence
            </h1>
            
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Shubz Entertainment is comprised of specialized divisions, each a powerhouse in its respective creative field.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          {divisions.length > 0 ? (
            <DivisionsPageClient divisions={divisions} />
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