import { HeroSection } from "@/components/hero-section";
import { CaseStudyGrid } from "@/components/case-study-grid";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { client, urlFor } from "@/lib/sanity";
import type { HomePageData, CaseStudyData } from "@/types/sanity";

const CASE_STUDY_GRID_ID = "case-studies";

async function getPageData() {
  const homePageQuery = `*[_type == "homePage"][0]`;
  const caseStudiesQuery = `*[_type == "caseStudy"] | order(_createdAt asc)`;

  const homePageData: HomePageData = await client.fetch(homePageQuery);
  const caseStudiesData: CaseStudyData[] = await client.fetch(caseStudiesQuery);

  const caseStudies = caseStudiesData.map((study) => ({
    title: study.title,
    tag: study.tag,
    imageUrl: urlFor(study.image).width(800).height(800).url(),
  }));

  return { homePageData, caseStudies };
}

export default async function Home() {
  const { homePageData, caseStudies } = await getPageData();

  const headline = homePageData?.heroHeadline || "From Spark to Spotlight.";
  const subheadline =
    homePageData?.heroSubheadline ||
    "We are Africa’s Creative Nerve Center — bridging media, talent, and technology into global stories.";
  
  const studies = caseStudies.length > 0 ? caseStudies : [
    { title: 'Closure', tag: 'Studio Shubz Visuals', imageUrl: 'https://picsum.photos/seed/closure/800/800' },
    { title: 'ACT Showcase', tag: 'Africa Creative Talents', imageUrl: 'https://picsum.photos/seed/act/800/800' },
    { title: 'ShubzVerse', tag: 'Shubz Records', imageUrl: 'https://picsum.photos/seed/shubzverse/800/800' },
    { title: 'Miss PACT', tag: 'Modeling', imageUrl: 'https://picsum.photos/seed/pact/800/800' },
    { title: 'StepXtreme', tag: 'Dance', imageUrl: 'https://picsum.photos/seed/step/800/800' },
    { title: 'Drum Warriors', tag: 'Percussion', imageUrl: 'https://picsum.photos/seed/drum/800/800' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <HeroSection
        headline={headline}
        subheadline={subheadline}
        targetId={CASE_STUDY_GRID_ID}
      />
      <main
        id={CASE_STUDY_GRID_ID}
        className="container mx-auto w-full max-w-7xl flex-1 scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8"
      >
        <section className="w-full">
          <CaseStudyGrid studies={studies} />
        </section>
      </main>
      <footer className="flex items-center justify-center py-6">
        <MadeWithDyad />
      </footer>
    </div>
  );
}