import { EnterpriseHero } from "@/components/enterprise-hero";
import { client } from "@/lib/sanity";
import type { HomePageData, DivisionData, PortfolioProjectData, NewsArticleData } from "@/types/sanity";
import { DivisionCard } from "@/components/division-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Users, BookOpen, Briefcase } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PortfolioCard } from "@/components/portfolio-card";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { BlogSection } from "@/components/blog-section";

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
    slug
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

      {/* Featured Divisions Section */}
      {divisions.length > 0 && (
        <section className="py-20 sm:py-32">
          <Container>
            <AnimatedContainer>
              <div className="mb-12 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
                  <Sparkles className="h-4 w-4" />
                  Our Creative Divisions
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Powering Creative Excellence
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                  From music to media, our divisions are the heart of our creative enterprise.
                </p>
              </div>
            </AnimatedContainer>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {divisions.map((division, i) => (
                <AnimatedContainer key={division._id} delay={i * 0.1}>
                  <DivisionCard division={division} />
                </AnimatedContainer>
              ))}
            </div>
            
            <AnimatedContainer className="mt-12 text-center">
              <Button asChild size="lg" className="group">
                <Link href="/divisions">
                  Explore All Divisions
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </AnimatedContainer>
          </Container>
        </section>
      )}

      {/* Featured Portfolio Section */}
      {portfolio.length > 0 && (
        <section className="py-20 sm:py-32 bg-background">
          <Container>
            <AnimatedContainer>
              <div className="mb-12 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
                  <Briefcase className="h-4 w-4" />
                  Featured Work
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Our Creative Portfolio
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                  A glimpse into the impactful projects we've brought to life.
                </p>
              </div>
            </AnimatedContainer>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {portfolio.map((project, i) => (
                <AnimatedContainer key={project._id} delay={i * 0.1}>
                  <PortfolioCard project={project} />
                </AnimatedContainer>
              ))}
            </div>
            <AnimatedContainer className="mt-12 text-center">
              <Button asChild size="lg" variant="outline" className="group">
                <Link href="/portfolio">
                  View Full Portfolio
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </AnimatedContainer>
          </Container>
        </section>
      )}

      {/* Latest News Section with Blog7 Theme */}
      {news.length > 0 && (
        <BlogSection
          articles={news}
          tagline="Latest News"
          heading="From the Newsroom"
          description="Stay updated with the latest stories and announcements from Shubz Entertainment."
          buttonText="Visit Newsroom"
          buttonUrl="/newsroom"
        />
      )}

      {/* CTA Section */}
      <section className="relative overflow-hidden py-20 sm:py-32 bg-primary text-primary-foreground">
        <Container>
          <AnimatedContainer>
            <div className="relative mx-auto max-w-4xl text-center">
              {/* Creative background elements */}
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

              <div className="relative inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white mb-6 backdrop-blur-sm">
                <TrendingUp className="h-4 w-4" />
                Ready to Collaborate?
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
                Let's Create Something Extraordinary Together
              </h2>
              <p className="mb-8 text-lg text-white/80">
                Whether you're an artist, brand, or creative professional, we have the expertise and resources to bring your vision to life.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" className="group bg-white text-primary hover:bg-white/90">
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