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
import { ArrowRight, Calendar, User, TrendingUp } from "lucide-react";
import { HeroSection } from "@/components/hero-section";

const FEATURED_POSTS_QUERY = `*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...6]{
  _id, title, slug, publishedAt, image, 
  "excerpt": array::join(string::split((pt::text(body)), "")[0..100], "") + "..."
}`;

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(FEATURED_POSTS_QUERY);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Posts Section */}
      <section className="py-20 sm:py-32">
        <div className="container max-w-screen-2xl px-4">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Latest Stories
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover our most recent articles and insights
            </p>
          </div>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const postImageUrl = post.image
                  ? urlFor(post.image)?.width(400).height(250).url()
                  : null;

                return (
                  <Link href={`/${post.slug.current}`} key={post._id}>
                    <Card className="group relative h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <CardHeader className="p-0">
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={postImageUrl || "https://picsum.photos/400/250"}
                            alt={post.title || "Post image"}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                      </CardHeader>
                      <CardContent className="flex flex-col space-y-3 p-6">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <User className="mr-1 h-3 w-3" />
                            Author
                          </div>
                        </div>
                        <CardTitle className="text-xl font-semibold line-clamp-2">
                          {post.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {post.excerpt}
                        </p>
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <Button variant="ghost" size="sm" className="group px-0">
                          Read more
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
              <p className="text-muted-foreground mb-4">No posts found. Start creating in the Studio!</p>
              <Button asChild>
                <Link href="/studio">Go to Studio</Link>
              </Button>
            </div>
          )}

          {/* View All Button */}
          {posts.length > 0 && (
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" asChild>
                <Link href="/all-posts">
                  View All Posts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container max-w-screen-2xl px-4 text-center">
          <TrendingUp className="mx-auto mb-4 h-12 w-12 text-primary" />
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get the latest posts delivered directly to your inbox. Never miss an update from our community of writers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
            />
            <Button size="lg">
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}