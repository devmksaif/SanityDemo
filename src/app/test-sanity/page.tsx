import { client } from "@/lib/sanity";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";

async function getRawDivisionData() {
  // Get the raw data to see exactly what's in Sanity
  const query = `*[_type == "division"] | order(_createdAt asc){
    _id, 
    title, 
    description, 
    logo, 
    coverImage, 
    slug,
    "slugCurrent": slug.current,
    "slugType": slug._type,
    "slugSource": slug.source
  }`;
  
  return await client.fetch(query);
}

export default async function TestSanityPage() {
  const divisions = await getRawDivisionData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Container className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Raw Sanity Data Test</h1>
          <p className="text-muted-foreground">Viewing raw data structure from Sanity</p>
        </div>

        <div className="space-y-4">
          {divisions.map((division: any, index: number) => (
            <Card key={division._id} className="p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">{division.title}</h2>
                <p className="text-sm text-muted-foreground">Index: {index}</p>
              </div>
              
              <div className="grid gap-2 font-mono text-sm">
                <div><strong>_id:</strong> {division._id}</div>
                <div><strong>title:</strong> {division.title}</div>
                <div><strong>slug object:</strong> {JSON.stringify(division.slug, null, 2)}</div>
                <div><strong>slug.current:</strong> {division.slugCurrent || 'undefined'}</div>
                <div><strong>slug._type:</strong> {division.slugType || 'undefined'}</div>
                <div><strong>slug.source:</strong> {division.slugSource || 'undefined'}</div>
              </div>
              
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <strong>Analysis:</strong>
                <ul className="list-disc list-inside mt-2">
                  <li>Has slug object: {division.slug ? 'YES' : 'NO'}</li>
                  <li>Has slug.current: {division.slugCurrent ? 'YES' : 'NO'}</li>
                  <li>Is valid for linking: {division.slugCurrent ? 'YES' : 'NO'}</li>
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}