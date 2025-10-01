import { Container } from "@/components/ui/container";
import { Sparkles, Users, Target, Eye, Quote, Zap, Handshake, Globe } from "lucide-react";
import { client } from "@/lib/sanity";
import type { TeamMemberData } from "@/types/sanity";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { TeamMemberCard } from "@/components/team-member-card";

async function getTeamMembers() {
  const query = `*[_type == "teamMember"] | order(order asc)`;
  const data: TeamMemberData[] = await client.fetch(query);
  return data;
}

// A simple component to wrap sections for consistent scroll animations
const AnimatedSection = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <AnimatedContainer className={className}  delay={0.1}>
    {children}
  </AnimatedContainer>
);

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 1. Hero Section: Refined with Serif Heading */}
      <section className="relative overflow-hidden h-[70vh] min-h-[500px] w-full bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>
        
        <Container className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Who We Are</span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              The Creative Force Behind Global Stories
            </h1>
            
            <p className="mt-6 text-lg text-white/80 max-w-3xl mx-auto font-sans">
              Shubz Entertainment is a dynamic creative enterprise dedicated to shaping culture and connecting audiences through media, music, and talent.
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* 2. Our Ethos Section: Narrative-driven with Asymmetric Layout */}
      <section className="py-24 sm:py-32">
        <Container>
          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <h2 className="font-serif text-4xl font-bold tracking-tight text-primary">
                Crafting Tomorrow's Narratives.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-6 text-muted-foreground text-lg">
              <p>
                At our core, we are storytellers. We believe in the power of a well-told story to inspire, to challenge, and to unite. Born from a passion for authentic African creativity, Shubz Entertainment was founded to be a launchpad for the continent's most compelling voices.
              </p>
              <p>
                We operate at the intersection of media, talent, and technology, building a seamless ecosystem where creativity thrives and great ideas reach a global stage. Our mission is to produce unforgettable content that not only entertains but also fosters deep cultural exchange.
              </p>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* 3. Core Values Section: Clean, Scannable Grid */}
      <section className="py-24 sm:py-32 bg-muted/40">
        <Container>
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl font-bold tracking-tight">Our Guiding Principles</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our values are the bedrock of our culture and the compass for our creative journey.
            </p>
          </AnimatedSection>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Innovation", text: "Pushing creative boundaries and embracing new technologies to tell stories in novel ways." },
              { icon: Handshake, title: "Collaboration", text: "Building powerful partnerships that amplify talent and bring visionary projects to life." },
              { icon: Globe, title: "Global Impact", text: "Creating content that transcends borders, resonates with diverse audiences, and showcases our culture." },
            ].map((value, i) => (
              <AnimatedContainer key={value.title}   delay={i * 0.1}>
                <div className="text-center p-8 bg-background rounded-lg shadow-sm">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-serif text-2xl font-semibold">{value.title}</h3>
                  <p className="mt-2 text-base text-muted-foreground">{value.text}</p>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </Container>
      </section>
      
      {/* 4. Team Section: Elevated with background and serif heading */}
      <section className="py-24 sm:py-32">
        <Container>
          <AnimatedSection className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
              <Users className="h-4 w-4" />
              Meet the Leadership
            </div>
            <h2 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
              The Minds Behind the Magic
            </h2>
          </AnimatedSection>
          
          {teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member, i) => (
                <AnimatedContainer key={member._id}  delay={i * 0.1}>
                  <TeamMemberCard member={member} />
                </AnimatedContainer>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Team member information will be updated soon.</p>
          )}
        </Container>
      </section>
    </div>
  );
}