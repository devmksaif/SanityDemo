import { client, urlFor } from "@/lib/sanity";
import type { DivisionData } from "@/types/sanity";
import { Container } from "@/components/ui/container";
import { notFound } from "next/navigation";
import Image from "next/image";

async function getDivision(slug: string) {
  // First try to find by exact slug match
  const queryBySlug = `*[_type == "division" && slug.current == $slug][0]`;
  let division = await client.fetch<DivisionData>(queryBySlug, { slug });
  
  // If not found by slug and the slug looks like an ID, try to find by ID
  if (!division && slug.match(/^[a-zA-Z0-9]+$/)) {
    const queryById = `*[_type == "division" && _id == $slug][0]`;
    division = await client.fetch<DivisionData>(queryById, { slug });
  }
  
  return division;
}

export default async function DivisionPage({ params }: { params: { slug: string } }) {
  const division = await getDivision(params.slug);

  if (!division) {
    notFound();
  }

  const imageUrl = urlFor(division.coverImage).width(1600).height(800).url();

  return (
    <article>
      <header className="relative h-[60vh] w-full">
        <Image src={imageUrl} alt={division.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Container className="relative flex h-full flex-col items-center justify-center text-center text-white">
          {division.logo && (
            <div className="relative h-20 w-20 mb-4">
              <Image src={urlFor(division.logo).url()} alt={`${division.title} Logo`} fill className="object-contain" />
            </div>
          )}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {division.title}
          </h1>
        </Container>
      </header>
      <main className="py-16 sm:py-24">
        <Container size="md">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>{division.description}</p>
          </div>
        </Container>
      </main>
    </article>
  );
}