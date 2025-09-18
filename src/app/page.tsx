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

const POSTS_QUERY = `*[_type == "post" && defined(slug.current)]|order(publishedAt desc){
  _id, title, slug, publishedAt, image
}`;

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY);

  return (
    <div className="container mx-auto max-w-5xl p-4 sm:p-8">
      <h1 className="mb-8 text-center text-4xl font-bold tracking-tight">
        Latest Posts
      </h1>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const postImageUrl = post.image
              ? urlFor(post.image)?.width(400).height(250).url()
              : null;

            return (
              <Link href={`/${post.slug.current}`} key={post._id}>
                <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
                  <CardHeader className="p-0">
                    <div className="relative h-48 w-full">
                      <Image
                        src={postImageUrl || "https://picsum.photos/400/250"}
                        alt={post.title || "Post image"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-4">
                    <CardTitle className="text-lg font-semibold">
                      {post.title}
                    </CardTitle>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </p>
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-center">No posts found. Add some in the Studio!</p>
      )}
    </div>
  );
}