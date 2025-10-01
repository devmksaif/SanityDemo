"use client"
import { EnterpriseHero } from "@/components/enterprise-hero";
import { client } from "@/lib/sanity";
import type { HomePageData, DivisionData, PortfolioProjectData, NewsArticleData } from "@/types/sanity";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { CldImage } from "next-cloudinary";

async function getPageData() {
  const homePageQuery = `*[_type == "homePage"][0]`;
  const divisionsQuery = `*[_type == "division"] | order(_createdAt asc){
    _id, title, slug, divisionType, coverImage
  }`;
  const portfolioQuery = `*[_type == "portfolioProject"] | order(releaseDate desc)[0...4]{
    _id, title, slug, category, thumbnailImage
  }`;
  const newsQuery = `*[_type == "newsArticle"] | order(publishedAt desc)[0...4]{
    _id, title, slug, publishedAt, coverImage, excerpt
  }`;

  const homePageData: HomePageData = await client.fetch(homePageQuery);
  const divisions: DivisionData[] = await client.fetch(divisionsQuery);
  const portfolio: PortfolioProjectData[] = await client.fetch(portfolioQuery);
  const news: NewsArticleData[] = await client.fetch(newsQuery);

  return { homePageData, divisions, portfolio, news };
}

export default async function IndexPage() {
  const { homePageData, divisions, portfolio, news } = await getPageData();
  const featuredArticle = news?.[0];
  const otherArticles = news?.slice(1, 3);
  const featuredProjects = portfolio?.slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <EnterpriseHero data={homePageData} />

      {/* Featured Story Section */}
      {featuredArticle && (
        <section className="py-16 sm:py-24">
          <Container>
            <AnimatedContainer>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                  <Link href={`/newsroom/${featuredArticle.slug.current}`}>
                    {featuredArticle.coverImage?.public_id && (
                      <CldImage
                        src={featuredArticle.coverImage.public_id}
                        alt={featuredArticle.title}
                        fill
                        crop="fill"
                        gravity="center"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </Link>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">
                    Featured Story
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    <Link href={`/newsroom/${featuredArticle.slug.current}`} className="hover:underline">
                      {featuredArticle.title}
                    </Link>
                  </h2>
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>
                  <Button asChild>
                    <Link href={`/newsroom/${featuredArticle.slug.current}`}>
                      Read Full Story <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </AnimatedContainer>
          </Container>
        </section>
      )}

      {/* Divisions Section - Asymmetrical Grid */}
      {divisions.length > 0 && (
        <section className="py-16 sm:py-24 bg-muted/50">
          <Container>
            <AnimatedContainer className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Our Creative Divisions
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
                A synergy of specialized entities driving creative innovation.
              </p>
            </AnimatedContainer>
            <div className="grid grid-cols-6 grid-rows-2 gap-6 h-[600px]">
              {divisions.slice(0, 4).map((division, index) => {
                const gridClasses = [
                  "col-span-3 row-span-2", // Item 1
                  "col-span-3 row-span-1", // Item 2
                  "col-span-2 row-span-1", // Item 3
                  "col-span-1 row-span-1", // Item 4
                ];
                return (
                  <AnimatedContainer key={division._id} className={gridClasses[index]}>
                    <Link href={`/divisions/${division.slug.current}`} className="group block w-full h-full relative rounded-lg overflow-hidden">
                      {division.coverImage?.public_id && (
                        <CldImage
                          src={division.coverImage.public_id}
                          alt={division.title}
                          fill
                          crop="fill"
                          gravity="center"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-6 text-white">
                        <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 backdrop-blur-sm px-2 py-1 rounded">
                          {division.divisionType}
                        </span>
                        <h3 className="text-2xl font-bold mt-2">{division.title}</h3>
                      </div>
                    </Link>
                  </AnimatedContainer>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* More News & Portfolio */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6">From The Portfolio</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredProjects?.map(project => (
                  <AnimatedContainer key={project._id}>
                    <Link href={`/portfolio/${project.slug.current}`} className="group block">
                      <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                        {project.thumbnailImage?.public_id && (
                          <CldImage
                            src={project.thumbnailImage.public_id}
                            alt={project.title}
                            fill
                            crop="fill"
                            gravity="center"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                      </div>
                      <p className="text-sm font-semibold text-primary">{project.category}</p>
                      <h3 className="text-xl font-bold mt-1 group-hover:underline">{project.title}</h3>
                    </Link>
                  </AnimatedContainer>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">More News</h2>
              <div className="space-y-6">
                {otherArticles?.map(article => (
                  <AnimatedContainer key={article._id}>
                    <Link href={`/newsroom/${article.slug.current}`} className="group block border-b pb-6">
                      <p className="text-sm text-muted-foreground mb-1">
                        {new Date(article.publishedAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <h3 className="text-xl font-bold group-hover:underline">{article.title}</h3>
                    </Link>
                  </AnimatedContainer>
                ))}
                <Button asChild variant="outline" className="w-full">
                  <Link href="/newsroom">Visit Newsroom</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}