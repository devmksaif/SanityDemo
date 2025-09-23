import { HeroSection } from "@/components/hero-section";
import { client } from "@/lib/sanity";
import type { HomePageData, DivisionData } from "@/types/sanity";
import { DivisionCard } from "@/components/division-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

async function getPageData() {
  const homePageQuery = `*[_type == "homePage"][0]`;
  const divisionsQuery = `*[_type == "division"] | order(_createdAt asc)[0...2]`; // Get first 2 for preview

  const homePageData: HomePageData = await client.fetch(homePageQuery);
  const divisions: DivisionData[] = await client.fetch(divisionsQuery);

  return { homePageData, divisions };
}

export default async function IndexPage() {
  const { homePageData, divisions } = await getPageData();

  return (
    <div className="min-h-screen bg-background">
      <HeroSection data={homePageData} />
      
      {/* Featured Divisions Section */}
      {divisions.length > 0 && (
        <section className="py-20 sm:py-32">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Our Creative Divisions
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                From music to media, our divisions are the heart of our creative enterprise.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {divisions.map((division) => (
                <DivisionCard key={division._id} division={division} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button asChild size="lg">
                <Link href="/divisions">
                  See All Divisions <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}