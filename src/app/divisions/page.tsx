import { client } from "@/lib/sanity";
import type { DivisionData } from "@/types/sanity";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, AlertTriangle } from "lucide-react";
import { ensureSlugsExist } from "@/lib/sanity-helpers";
import { DivisionsPageClient } from "@/components/divisions-page-client";
import FlowingMenu from "@/components/FlowingMenu";

async function getDivisions() {
  try {
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
    console.log('📊 Divisions query result length:', data?.length);
    console.log('📊 Divisions query result:', JSON.stringify(data, null, 2));
    
    if (!data || data.length === 0) {
      console.log('❌ No divisions found in Sanity');
    }
    
    return data;
  } catch (error) {
    console.error('❌ Error fetching divisions:', error);
    return [];
  }
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
      <section className="relative overflow-hidden h-[80vh] min-h-[600px] w-full bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse opacity-70" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-bounce opacity-50" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-white/10 rounded-full blur-2xl animate-pulse opacity-60" />
        </div>
        
        <Container className="relative flex h-full flex-col items-center justify-center text-center">
          <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm border border-white/20">
              <Sparkles className="h-4 w-4" />
              <span>Our Creative Divisions</span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Powering Creative
              <br />
              <span className="text-accent">Excellence</span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Shubz Entertainment is comprised of specialized divisions, each a powerhouse in its respective creative field. From film production to music, digital media to talent management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm group"
              >
                <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Explore Our Work
              </Button>
              
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/20">
              {[
                { label: 'Active Divisions', value: divisions.length || '4+' },
                { label: 'Creative Projects', value: '100+' },
                { label: 'Industry Awards', value: '25+' },
                { label: 'Years Experience', value: '10+' }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-accent">{stat.value}</div>
                  <div className="text-sm text-white/70 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          {/* Section Header */}
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-1 w-12 bg-primary"></div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                <span>Our Divisions</span>
              </div>
              <div className="h-1 w-12 bg-primary"></div>
            </div>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
              Creative Powerhouses
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Each division represents a specialized area of creative excellence, working together to deliver world-class entertainment experiences.
            </p>
          </div>

          {divisions.length > 0 ? (
            <DivisionsPageClient divisions={divisions} />
          ) : (
            <div className="text-center py-20">
              <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
                <Sparkles className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Divisions Coming Soon</h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                Our creative divisions are being prepared to showcase their unique talents and specializations.
              </p>
              <Button asChild size="lg">
                <Link href="/studio">Add Divisions in Studio</Link>
              </Button>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}