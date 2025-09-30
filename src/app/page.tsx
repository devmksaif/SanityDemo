import { EnterpriseHero } from "@/components/enterprise-hero";
import { client } from "@/lib/sanity";
import type { HomePageData, DivisionData, PortfolioProjectData, NewsArticleData } from "@/types/sanity";
import { DivisionCard } from "@/components/division-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, BookOpen, Briefcase } from "lucide-react";
import { Container } from "@/components/ui/container";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { BlogSection } from "@/components/blog-section";
import { CaseStudiesShowcase } from "@/components/case-studies-showcase";

async function getPageData() {
  const homePageQuery = `*[_type == "homePage"][0]`;
  const divisionsQuery = `*[_type == "division"] | order(_createdAt asc)[0...3]{
    _id, 
    title, 
    description, 
    logo, 
    coverImage, 
    slug
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

  const homePageData: HomePageData = await client.fetch(homePageQuery);
  const divisions: DivisionData[] = await client.fetch(divisionsQuery);
  const portfolio: PortfolioProjectData[] = await client.fetch(portfolioQuery);
  const news: NewsArticleData[] = await client.fetch(newsQuery);

  return { homePageData, divisions, portfolio, news };
}

export default async function IndexPage() {
  const { homePageData, divisions, portfolio, news } = await getPageData();

  return (
    <div className="min-h-screen bg-background">
      {/* Enterprise Hero */}
      <EnterpriseHero data={homePageData} />

      {/* Featured Divisions Section - Warm gradient background */}
      {divisions.length > 0 && (
        <section className="py-12 sm:py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950/20 dark:via-amber-950/20 dark:to-yellow-950/20">
          <Container>
            <AnimatedContainer>
              <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 dark:bg-orange-900/30 px-4 py-2 text-sm font-medium text-orange-700 dark:text-orange-300 mb-3">
                  <Sparkles className="h-4 w-4" />
                  Our Creative Divisions
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-gray-900 dark:text-white">
                  Powering Creative Excellence
                </h2>
                <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                  From music to media, our divisions are the heart of our creative enterprise.
                </p>
              </div>
            </AnimatedContainer>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {divisions.map((division, i) => (
                <AnimatedContainer key={division._id} delay={i * 0.1}>
                  <DivisionCard division={division} />
                </AnimatedContainer>
              ))}
            </div>
            
            <AnimatedContainer className="mt-8 text-center">
              <Button asChild size="lg" className="group bg-orange-500 hover:bg-orange-600 text-white">
                <Link href="/divisions">
                  Explore All Divisions
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </AnimatedContainer>
          </Container>
        </section>
      )}

      {/* Featured Portfolio Section - Cool blue gradient */}
      {portfolio.length > 0 && (
        <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20">
          <Container>
            <AnimatedContainer>
              <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 mb-3">
                  <Briefcase className="h-4 w-4" />
                  Featured Work
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-gray-900 dark:text-white">
                  Our Creative Portfolio
                </h2>
                <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                  A glimpse into the impactful projects we've brought to life.
                </p>
              </div>
            </AnimatedContainer>
            
            <div className="mt-8">
              <CaseStudiesShowcase projects={portfolio} />
            </div>
            
            <AnimatedContainer className="mt-8 text-center">
              <Button asChild size="lg" variant="outline" className="group border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30">
                <Link href="/portfolio">
                  View Full Portfolio
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </AnimatedContainer>
          </Container>
        </section>
      )}

      {/* Latest News Section - Soft green gradient */}
      {news.length > 0 && (
        <section className="py-12 sm:py-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/20 dark:via-emerald-950/20 dark:to-teal-950/20">
          <Container>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-100 dark:bg-green-900/30 px-4 py-2 text-sm font-medium text-green-700 dark:text-green-300 mb-3">
                <BookOpen className="h-4 w-4" />
                Latest News
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-gray-900 dark:text-white">
                From the Newsroom
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                Stay updated with the latest stories and announcements from Shubz Entertainment.
              </p>
            </div>
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

      {/* CTA Section - Deep gradient with contrast */}
      <section className="relative overflow-hidden py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <Container>
          <AnimatedContainer>
            <div className="relative mx-auto max-w-4xl text-center">
              {/* Creative background elements */}
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl" />

              <div className="relative inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium mb-4 backdrop-blur-sm">
                <TrendingUp className="h-4 w-4" />
                Ready to Collaborate?
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">
                Let's Create Something Extraordinary Together
              </h2>
              <p className="mb-6 text-lg text-white/90">
                Whether you're an artist, brand, or creative professional, we have the expertise and resources to bring your vision to life.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button size="lg" className="group bg-orange-500 hover:bg-orange-600 text-white">
                  Start a Project
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="lg" className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm">
                  Schedule a Call
                </Button>
              </div>
            </div>
          </AnimatedContainer>
        </Container>
      </section>
    </div>
  );
}