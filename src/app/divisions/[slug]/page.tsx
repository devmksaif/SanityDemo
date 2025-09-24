import { client, urlFor } from "@/lib/sanity";
import type { DivisionData } from "@/types/sanity";
import { Container } from "@/components/ui/container";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Calendar, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const imageUrl = urlFor(division.coverImage).width(1600).height(800).url();

  return (
    <div className="min-h-screen bg-background">
      {/* Modernized Hero Section */}
      <header className="relative h-[60vh] min-h-[450px] w-full overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>
        <Image 
          src={imageUrl} 
          alt={division.title} 
          fill 
          className="absolute inset-0 object-cover opacity-10" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
        
        <Container className="relative flex h-full flex-col items-center justify-center text-center">
          {division.logo && (
            <div className="relative h-20 w-20 mb-4 animate-float">
              <Image 
                src={urlFor(division.logo).url()} 
                alt={`${division.title} Logo`} 
                fill 
                className="object-contain drop-shadow-lg" 
              />
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in-up">
            {division.title}
          </h1>
          
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Established</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Creative Team</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>Industry Leading</span>
            </div>
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <main className="py-12 sm:py-20">
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
                <Button className="w-full bg-white text-primary hover:bg-white/90">
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