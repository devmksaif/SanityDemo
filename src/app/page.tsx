import Link from "next/link";
import Image from "next/image";
import { type SanityDocument } from "next-sanity";
import { client, urlFor } from "@/lib/sanity";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, ArrowRight, BookOpen } from "lucide-react";
import { HeroSection } from "@/components/hero-section";

// Query to fetch ALL posts (including drafts for debugging)
const ALL_POSTS_QUERY = `*[_type == "post" && defined(slug.current)]|order(publishedAt desc){
  _id, 
  title, 
  slug, 
  publishedAt, 
  image,
  "status": select(_id in path("drafts.**") => "draft", "published"),
  "excerpt": array::join(string::split((pt::text(body)), "")[0..200], "") + "...",
  "readingTime": round(length(pt::text(body)) / 200) + " min read"
}`;

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(ALL_POSTS_QUERY);

  // Separate drafts and published posts for debugging
  const publishedPosts = posts.filter(post => post.status === "published");
  const draftPosts = posts.filter(post => post.status === "draft");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Debug Info - Remove this section once everything works */}
      {draftPosts.length > 0 && (
        <section className="py-8 bg-yellow-50 border-b">
          <div className="container max-w-screen-2xl px-4">
            <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4">
              <h3 className="text-yellow-800 font-semibold mb-2">📝 Draft Posts Detected</h3>
              <p className="text-yellow-700 text-sm mb-2">You have {draftPosts.length} draft post(s) that won't show on the site:</p>
              <ul className="text-yellow-700 text-sm list-disc list-inside">
                {draftPosts.map(post => (
                  <li key={post._id}>{post.title}</li>
                ))}
              </ul>
              <p className="text-yellow-700 text-sm mt-2">Make sure to click "Publish" in Sanity Studio to make them live!</p>
            </div>
          </div>
        </section>
      )}

      {/* All Posts Section */}
      <section className="py-20 sm:py-32">
        <div className="container max-w-screen-2xl px-4">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
              <BookOpen className="mr-2 h-4 w-4" />
              All Blog Posts
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Discover All Stories
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore our complete collection of {publishedPosts.length} published articles
            </p>
          </div>

          {/* Posts Grid - All Posts */}
          {publishedPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {publishedPosts.map((post) => {
                const postImageUrl = post.image
                  ? urlFor(post.image)?.width(400).height(250).url()
                  : null;

                return (
                  <Link href={`/${post.slug.current}`} key={post._id}>
                    <Card className="group relative h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <CardHeader className="p-0">
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={postImageUrl || "https://picsum.photos/seed/" + post._id + "/400/250"}
                            alt={post.title || "Post image"}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-900 backdrop-blur-sm">
                              <Clock className="mr-1 h-3 w-3" />
                              {post.readingTime}
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex flex-col space-y-4 p-6">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                          <div className="flex items-center">
                            <User className="mr-1 h-3 w-3" />
                            Author
                          </div>
                        </div>
                        <CardTitle className="text-xl font-semibold line-clamp-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground line-clamp-4 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </CardContent>
                      <CardFooter className="p-6 pt-0 mt-auto">
                        <Button variant="ghost" size="sm" className="group w-full justify-between px-0">
                          <span>Read more</span>
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">No published posts found. Start creating in the Studio!</p>
              <Button asChild>
                <Link href="/studio">Create Your First Post</Link>
              </Button>
            </div>
          )}

          {/* Stats Section */}
          {publishedPosts.length > 0 && (
            <div className="mt-16 text-center">
              <div className="inline-flex items-center rounded-lg bg-secondary/50 px-6 py-3">
                <BookOpen className="mr-2 h-5 w-5 text-primary" />
                <span className="text-sm font-medium">
                  Showing all {publishedPosts.length} published blog posts
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {publishedPosts.length > 0 && (
        <section className="py-20 bg-secondary/30">
          <div className="container max-w-screen-2xl px-4 text-center">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Start Writing Today</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our community of writers and share your stories with the world. Create compelling content that inspires and educates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/studio">
                  Create New Post
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}