import { client } from "@/lib/sanity";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle } from "lucide-react";

async function getDivisionsTest() {
  const query = `*[_type == "division"] | order(_createdAt asc){
    _id, 
    title, 
    description, 
    logo, 
    coverImage, 
    slug
  }`;
  
  return await client.fetch(query);
}

export default async function TestDivisionsPage() {
  const divisions = await getDivisionsTest();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Container className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Divisions Data Test</h1>
          <p className="text-muted-foreground">Testing the actual data returned by the divisions query</p>
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
                <div><strong>slug.current:</strong> {division.slug?.current || 'undefined'}</div>
              </div>
              
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <strong>Analysis:</strong>
                <ul className="list-disc list-inside mt-2">
                  <li>Has slug object: {division.slug ? 'YES' : 'NO'}</li>
                  <li>Has slug.current: {division.slug?.current ? 'YES' : 'NO'}</li>
                  <li>Is valid for linking: {division.slug?.current ? 'YES' : 'NO'}</li>
                </ul>
              </div>
              
              {division.slug?.current && (
                <div className="mt-4">
                  <Badge variant="outline">
                    <a href={`/divisions/${division.slug.current}`} target="_blank" rel="noopener noreferrer">
                      Test Link: /divisions/{division.slug.current}
                    </a>
                  </Badge>
                </div>
              )}
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}