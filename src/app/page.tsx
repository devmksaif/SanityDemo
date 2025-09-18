import { HeroSection } from "@/components/hero-section";
import { CaseStudyGrid } from "@/components/case-study-grid";
import { MadeWithDyad } from "@/components/made-with-dyad";

const mockCaseStudies = [
  { title: 'Closure', tag: 'Studio Shubz Visuals', imageUrl: 'https://picsum.photos/seed/closure/800/800' },
  { title: 'ACT Showcase', tag: 'Africa Creative Talents', imageUrl: 'https://picsum.photos/seed/act/800/800' },
  { title: 'ShubzVerse', tag: 'Shubz Records', imageUrl: 'https://picsum.photos/seed/shubzverse/800/800' },
  { title: 'Miss PACT', tag: 'Modeling', imageUrl: 'https://picsum.photos/seed/pact/800/800' },
  { title: 'StepXtreme', tag: 'Dance', imageUrl: 'https://picsum.photos/seed/step/800/800' },
  { title: 'Drum Warriors', tag: 'Percussion', imageUrl: 'https://picsum.photos/seed/drum/800/800' },
];

const CASE_STUDY_GRID_ID = "case-studies";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <HeroSection
        headline="From Spark to Spotlight."
        subheadline="We are Africa’s Creative Nerve Center — bridging media, talent, and technology into global stories."
        targetId={CASE_STUDY_GRID_ID}
      />
      <main
        id={CASE_STUDY_GRID_ID}
        className="container mx-auto w-full max-w-7xl flex-1 scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8"
      >
        <section className="w-full">
          <CaseStudyGrid studies={mockCaseStudies} />
        </section>
      </main>
      <footer className="flex items-center justify-center py-6">
        <MadeWithDyad />
      </footer>
    </div>
  );
}