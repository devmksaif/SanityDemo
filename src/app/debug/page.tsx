import { client } from "@/lib/sanity";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, ExternalLink } from "lucide-react";

async function getDebugData() {
  const divisionsQuery = `*[_type == "division"] | order(_createdAt asc){
    _id, 
    title, 
    description, 
    logo, 
    coverImage, 
    "slug": slug.current,
    "hasSlug": defined(slug.current)
  }`;
  
  const portfolioQuery = `*[_type == "portfolioProject"] | order(_createdAt asc){
    _id, 
    title, 
    "slug": slug.current,
    "hasSlug": defined(slug.current),
    category,
    division->{
      title
    }
  }`;
  
  const newsQuery = `*[_type == "newsArticle"] | order(publishedAt desc){
    _id, 
    title, 
    "slug": slug.current,
    "hasSlug": defined(slug.current),
    publishedAt
  }`;

  const [divisions, portfolioProjects, newsArticles] = await Promise.all([
    client.fetch(divisionsQuery),
    client.fetch(portfolioQuery),
    client.fetch(newsQuery)
  ]);

  return { divisions, portfolioProjects, newsArticles };
}

export default async function DebugPage() {
  const { divisions, portfolioProjects, newsArticles } = await getDebugData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Container className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Debug Dashboard</h1>
          <p className="text-muted-foreground">Check the status of your Sanity content and slugs</p>
        </div>

        <div className="space-y-8">
          {/* Divisions Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Divisions ({divisions.length})</h2>
            <div className="grid gap-4">
              {divisions.map((division: any) => (
                <Card key={division._id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{division.title}</h3>
                      <p className="text-sm text-muted-foreground">ID: {division._id}</p>
                      {division.slug && (
                        <p className="text-sm text-muted-foreground">Slug: {division.slug}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {division.hasSlug ? (
                        <Badge variant="default" className="gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Has Slug
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Missing Slug
                        </Badge>
                      )}
                      {division.slug && (
                        <Badge variant="outline" className="gap-1">
                          <ExternalLink className="h-3 w-3" />
                          <a href={`/divisions/${division.slug}`} target="_blank" rel="noopener noreferrer">
                            Test Link
                          </a>
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Portfolio Projects Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Portfolio Projects ({portfolioProjects.length})</h2>
            <div className="grid gap-4">
              {portfolioProjects.map((project: any) => (
                <Card key={project._id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">ID: {project._id}</p>
                      <p className="text-sm text-muted-foreground">Category: {project.category}</p>
                      {project.division && (
                        <p className="text-sm text-muted-foreground">Division: {project.division.title}</p>
                      )}
                      {project.slug && (
                        <p className="text-sm text-muted-foreground">Slug: {project.slug}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {project.hasSlug ? (
                        <Badge variant="default" className="gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Has Slug
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Missing Slug
                        </Badge>
                      )}
                      {project.slug && (
                        <Badge variant="outline" className="gap-1">
                          <ExternalLink className="h-3 w-3" />
                          <a href={`/portfolio/${project.slug}`} target="_blank" rel="noopener noreferrer">
                            Test Link
                          </a>
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* News Articles Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">News Articles ({newsArticles.length})</h2>
            <div className="grid gap-4">
              {newsArticles.map((article: any) => (
                <Card key={article._id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{article.title}</h3>
                      <p className="text-sm text-muted-foreground">ID: {article._id}</p>
                      <p className="text-sm text-muted-foreground">
                        Published: {new Date(article.publishedAt).toLocaleDateString()}
                      </p>
                      {article.slug && (
                        <p className="text-sm text-muted-foreground">Slug: {article.slug}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {article.hasSlug ? (
                        <Badge variant="default" className="gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Has Slug
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Missing Slug
                        </Badge>
                      )}
                      {article.slug && (
                        <Badge variant="outline" className="gap-1">
                          <ExternalLink className="h-3 w-3" />
                          <a href={`/newsroom/${article.slug}`} target="_blank" rel="noopener noreferrer">
                            Test Link
                          </a>
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}