import { Container } from "@/components/ui/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Users, Target, Eye } from "lucide-react";
import { client, urlFor } from "@/lib/sanity";
import type { TeamMemberData } from "@/types/sanity";

async function getTeamMembers() {
  const query = `*[_type == "teamMember"] | order(order asc)`;
  const data: TeamMemberData[] = await client.fetch(query);
  return data;
}

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Hero Section */}
      <section className="relative overflow-hidden h-[60vh] min-h-[450px] w-full bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>
        
        <Container className="relative flex h-full flex-col items-center justify-center text-center">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span>Who We Are</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              The Creative Force Behind Global Stories
            </h1>
            
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Shubz Entertainment is a dynamic creative enterprise dedicated to shaping culture and connecting audiences through media, music, and talent.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold">Our Mission</h2>
              </div>
              <p className="text-muted-foreground">
                To discover, develop, and amplify creative voices, producing compelling content that resonates globally and fosters cultural exchange.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Eye className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold">Our Vision</h2>
              </div>
              <p className="text-muted-foreground">
                To be Africa's leading creative nerve center, seamlessly bridging media, talent, and technology to tell unforgettable stories that inspire and entertain.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Team Section - Updated to clean white background */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
              <Users className="h-4 w-4" />
              Meet the Leadership
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              The Minds Behind the Magic
            </h2>
          </div>
          {teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member) => (
                <Card key={member._id} className="text-center">
                  <CardContent className="pt-6">
                    <Avatar className="h-24 w-24 mx-auto mb-4">
                      <AvatarImage src={urlFor(member.image).width(200).url()} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm text-primary">{member.role}</p>
                  </CardContent>
                </Card>
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