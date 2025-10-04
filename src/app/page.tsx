import { EnterpriseHero } from "@/components/enterprise-hero";
import { client } from "@/lib/sanity";
import type { DivisionData, PortfolioProjectData, NewsArticleData } from "@/types/sanity";
import { DivisionCard } from "@/components/division-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, Calendar, TrendingUp, Award, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { BlogSection } from "@/components/blog-section";
import { CaseStudiesShowcase } from "@/components/case-studies-showcase";
import { DivisionsSection } from "@/components/divisions-section";
import { Badge } from "@/components/ui/badge";
import ThreeBackground from "@/components/three-background";
import { Suspense } from "react";
import Dot from "@/components/ui/dot-background";
import GetStartedButton from "@/components/ui/get-started-button";

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
      {/* 3D Floating Geometry Background */}
      <Suspense fallback={null}>
        <ThreeBackground />
      </Suspense>
      
      <EnterpriseHero />

      {/* Breaking News Banner */}
      <section className="border-b border-border bg-primary/5 dark:bg-primary/10">
        <Container>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Badge variant="destructive" className="animate-pulse">LIVE</Badge>
              <span className="text-sm font-medium text-muted-foreground">Latest:</span>
              <p className="text-sm text-foreground">Shubz Entertainment announces new creative partnerships across Africa</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/newsroom">View All News</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Featured Statistics */}
      <Dot 
        color="hsl(var(--secondary) / 0.06)" 
        size={0.8} 
        spacing={30}
        style={{ backgroundColor: "hsl(var(--muted) / 0.3)" }}
        className="py-8 border-b border-border"
      >
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">50+</div>
              <div className="text-sm text-muted-foreground">Awards Won</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">100+</div>
              <div className="text-sm text-muted-foreground">Artists Managed</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">500+</div>
              <div className="text-sm text-muted-foreground">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">10+</div>
              <div className="text-sm text-muted-foreground">Years Active</div>
            </div>
          </div>
        </Container>
      </Dot>

      {divisions.length > 0 && (
        <Dot 
          color="hsl(var(--primary) / 0.1)" 
          size={1.5} 
          spacing={20}
          style={{ backgroundColor: "hsl(var(--background))" }}
          className="py-16 sm:py-20"
        >
          <Container>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-12 bg-primary"></div>
                <Badge variant="outline" className="text-xs tracking-wider">DIVISIONS</Badge>
              </div>
              <div className="grid lg:grid-cols-2 gap-8 items-end">
                <div>
                  <h2 className="font-serif text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
                    Our Creative Empire
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    From music production to digital media, our specialized divisions work in harmony to deliver extraordinary creative solutions.
                  </p>
                </div>
                <div className="flex justify-end">
                  <Link href="/divisions">
                    <GetStartedButton
                      text="Explore Divisions"
                      className="bg-primary hover:bg-secondary text-primary-foreground hover:text-secondary-foreground"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <DivisionsSection divisions={divisions} />
          </Container>
        </Dot>
      )}

      {portfolio.length > 0 && (
        <section 
          id="portfolio-section"
          className="py-16 sm:py-20 bg-muted/50 dark:bg-muted/20"
        >
          <Container>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-12 bg-amber-500"></div>
                <Badge variant="secondary" className="text-xs tracking-wider bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
                  FEATURED WORK
                </Badge>
              </div>
              <div className="max-w-3xl">
                <h2 className="font-serif text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
                  Stories That Define Excellence
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Each project represents a milestone in our creative journey, showcasing the intersection of African artistry and global standards.
                </p>
              </div>
            </div>
            
            <Suspense fallback={<div className="h-[600px] bg-muted/20 rounded-3xl animate-pulse" />}>
              <CaseStudiesShowcase projects={portfolio} />
            </Suspense>
            
            <div className="mt-16 flex justify-center">
              <Link href="/portfolio">
                <GetStartedButton
                  text="View Portfolio"
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                />
              </Link>
            </div>
          </Container>
        </section>
      )}

      {news.length > 0 && (
        <Dot 
          color="hsl(var(--accent) / 0.08)" 
          size={1} 
          spacing={25}
          style={{ backgroundColor: "hsl(var(--background))" }}
          className="py-16 sm:py-20 border-t border-border"
        >
          <Container>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-12 bg-emerald-500"></div>
                <Badge variant="outline" className="text-xs tracking-wider border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300">
                  NEWSROOM
                </Badge>
              </div>
              <div className="grid lg:grid-cols-2 gap-8 items-end">
                <div>
                  <h2 className="font-serif text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
                    Industry Insights & Updates
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Stay informed with the latest developments, industry trends, and behind-the-scenes stories from the world of creative entertainment.
                  </p>
                </div>
                <div className="flex justify-end">
                  <Link href="/newsroom">
                    <GetStartedButton
                      text="Read Stories"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white"
                    />
                  </Link>
                </div>
              </div>
            </div>
            
            <BlogSection
              articles={news}
              tagline=""
              heading=""
              description=""
              buttonText="Visit Newsroom"
              buttonUrl="/newsroom"
            />
          </Container>
        </Dot>
      )}

    </div>
  );
}