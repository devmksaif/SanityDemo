import { client } from "@/lib/sanity";
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

  const coverPublicId = division.coverImage?.public_id || null;
  const logoPublicId = division.logo?.public_id || null;

  return (
    <div className="min-h-screen bg-background">
      <DivisionHero
        coverPublicId={coverPublicId}
        logoPublicId={logoPublicId}
        title={division.title}
      />

      <main className="py-12 sm:py-16">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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