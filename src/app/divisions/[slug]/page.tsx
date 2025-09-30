import { client, urlFor } from "@/lib/sanity";
import type { DivisionData } from "@/types/sanity";
import { Container } from "@/components/ui/container";
import { notFound } from "next/navigation";
import { ArrowRight, Award, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DivisionHero } from "@/components/division-hero";

async function getDivision(slug: string) {
  const queryBySlug = `*[_type == "division" && slug.current == $slug][0]`;
  let division = await client.fetch<DivisionData>(queryBySlug, { slug });
  
  if (!division && slug.match(/^[a-zA-Z0-9]+$/)) {
    const queryById = `*[_type == "division" && _id == $slug][0]`;
    division = await client.fetch<DivisionData>(queryById, { slug });
  }
  
  return division;
}

export default async function DivisionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const division = await getDivision(slug);

  if (!division) {
    notFound();
  }

  // Robust image URL handling
  const imageUrl = division.coverImage 
    ? urlFor(division.coverImage).width(1600).height(800).url()
    : "https://images.unsplash.com/photo-1511379938547-c1f33886168f?w=1600&h=800&fit=crop";
  
  const logoUrl = division.logo 
    ? urlFor(division.logo).url()
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Modernized Hero Section with Image Error Handling */}
      <DivisionHero
        imageUrl={imageUrl}
        logoUrl={logoUrl}
        title={division.title}
      />

      {/* Main Content */}
      <main className="py-12 sm:py-16">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {division.description}
                </p>
              </div>
              
              <div className="bg-muted rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground">
                  {division.title} is dedicated to pushing creative boundaries and delivering exceptional experiences that resonate with audiences worldwide.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 border">
                <h3 className="text-lg font-semibold mb-4">Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Division</span>
                    <span className="font-medium">{division.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Focus</span>
                    <span className="font-medium">Creative Excellence</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium text-green-600">Active</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary rounded-2xl p-6 text-primary-foreground">
                <h3 className="text-lg font-semibold mb-2">Ready to Collaborate?</h3>
                <p className="text-sm mb-4 opacity-90">
                  Let's create something amazing together.
                </p>
                <Button className="w-full">
                  Get In Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}