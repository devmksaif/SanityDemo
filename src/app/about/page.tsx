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
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      {/* Page Header */}
      <section className="py-20 sm:py-32">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              Who We Are
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              The Creative Force Behind Global Stories
            </h1>
            <p className="text-lg text-muted-foreground">
              Shubz Entertainment is a dynamic creative enterprise dedicated to shaping culture and connecting audiences through media, music, and talent.
            </p>
          </div>
        </Container>
      </section>

      {/* Our Mission & Vision */}
      <section className="pb-20 sm:pb-32">
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

      {/* Team Section */}
      <section className="pb-20 sm:pb-32 bg-background">
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