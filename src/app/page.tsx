import { EnterpriseHero } from "@/components/enterprise-hero";
import { client } from "@/lib/sanity";
import type { DivisionData, PortfolioProjectData, NewsArticleData } from "@/types/sanity";
import { DivisionCard } from "@/components/division-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { BlogSection } from "@/components/blog-section";
import { CaseStudiesShowcase } from "@/components/case-studies-showcase";

async function getPageData() {
  const divisionsQuery = `*[_type == "division"] | order(_createdAt asc){
    _id, 
    title, 
    description, 
    logo, 
    coverImage, 
    slug,
    divisionType
  }`;
  const portfolioQuery = `*[_type == "portfolioProject"] | order(releaseDate desc)[0...3]{
    _id, 
    title, 
    category, 
    division->{title}, 
    thumbnailImage, 
    releaseDate, 
    slug,
    author->{name, role, image}
  }`;
  const newsQuery = `*[_type == "newsArticle"] | order(publishedAt desc)[0...3]`;

  const divisions: DivisionData[] = await client.fetch(divisionsQuery);
  const portfolio: PortfolioProjectData[] = await client.fetch(portfolioQuery);
  const news: NewsArticleData[] = await client.fetch(newsQuery);

  return { divisions, portfolio, news };
}

export default async function IndexPage() {
  const { divisions, portfolio, news } = await getPageData();

  return (
    <div className="min-h-screen bg-background">
      <EnterpriseHero />

      {divisions.length > 0 && (
        <section id="divisions-section" className="py-12 sm:py-24 bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900/30">
          <Container>
            <AnimatedContainer>
              <div className="mb-12 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 px-4 py-2 text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-3">
                  <Sparkles className="h-4 w-4" />
                  Our Creative Divisions
                </div>
                <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
                  Powering Creative Excellence
                </h2>
                <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
                  From music to media, our divisions are the heart of our creative enterprise.
                </p>
              </div>
            </AnimatedContainer>
            
            <AnimatedContainer className="hidden lg:grid lg:grid-cols-3 lg:grid-rows-2 gap-6 h-[800px]">
              {divisions[0] && (
                <div className="lg:col-span-2 lg:row-span-2">
                  <DivisionCard division={divisions[0]} />
                </div>
              )}
              {divisions[1] && (
                <div className="lg:col-span-1">
                  <DivisionCard division={divisions[1]} />
                </div>
              )}
              {divisions[2] && (
                <div className="lg:col-span-1">
                  <DivisionCard division={divisions[2]} />
                </div>
              )}
            </AnimatedContainer>

            {/* Mobile view remains a simple list/carousel */}
            <div className="lg:hidden space-y-6">
              {divisions.slice(0, 3).map((division) => (
                <div key={division._id} className="h-[450px]">
                  <DivisionCard division={division} />
                </div>
              ))}
            </div>
            
            <AnimatedContainer className="mt-12 text-center">
              <Button asChild size="lg" className="group bg-indigo-600 hover:bg-indigo-700 text-white">
                <Link href="/divisions">
                  Explore All Divisions
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </AnimatedContainer>
          </Container>
        </section>
      )}

      {portfolio.length > 0 && (
        <section
          id="portfolio-section"
          className="py-12 sm:py-16 bg-gradient-to-br from-yellow-50 via-amber-100 to-yellow-100 dark:from-yellow-950/20 dark:via-amber-950/20 dark:to-yellow-950/30"
        >
          <Container>
            <div className="mb-12 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-200/30 px-4 py-2 text-sm font-medium text-amber-800 dark:text-amber-300 mb-3 backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                Featured Projects
              </div>
              <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-gray-900 dark:text-white">
                Our Gold Standard Work
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300">
                Explore our latest portfolio projects where creativity meets technical excellence.
              </p>
            </div>

            <CaseStudiesShowcase projects={portfolio} />

            <div className="mt-12 text-center">
              <Button
                asChild
                size="lg"
                className="group bg-amber-500 hover:bg-amber-600 text-gray-900 shadow-lg hover:shadow-xl transition-all"
              >
                <Link href="/portfolio">
                  View All Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </Container>
        </section>
      )}

      {news.length > 0 && (
        <section className="py-12 sm:py-16 bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50 dark:from-teal-950/20 dark:via-emerald-950/20 dark:to-green-950/20">
          <Container>
            <BlogSection
              articles={news}
              tagline="Latest News"
              heading="From the Newsroom"
              description="Stay updated with the latest stories and announcements from Shubz Entertainment."
              buttonText="Visit Newsroom"
              buttonUrl="/newsroom"
            />
          </Container>
        </section>
      )}
    </div>
  );
}