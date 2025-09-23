import { client } from "@/lib/sanity";
import type { DivisionData } from "@/types/sanity";
import { DivisionCard } from "@/components/division-card";

async function getDivisions() {
  const query = `*[_type == "division"] | order(_createdAt asc)`;
  const data: DivisionData[] = await client.fetch(query);
  return data;
}

export default async function DivisionsPage() {
  const divisions = await getDivisions();

  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto py-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Our Divisions</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Shubz Entertainment is comprised of specialized divisions, each a powerhouse in its respective creative field.
        </p>
      </header>

      <main className="container mx-auto pb-24">
        {divisions.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {divisions.map((division) => (
              <DivisionCard key={division._id} division={division} />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg text-muted-foreground">Divisions content coming soon.</p>
          </div>
        )}
      </main>
    </div>
  );
}