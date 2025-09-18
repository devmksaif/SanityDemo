import { PortableText, type SanityDocument } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client, urlFor } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const options = { next: { revalidate: 30 } };

// This component handles rendering images from your post body
const ptComponents = {
  types: {
    image: ({ value }: { value: SanityImageSource & { alt?: string } }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      const imageUrl = urlFor(value)?.width(800).fit("max").auto("format").url();
      if (!imageUrl) return null;
      return (
        <Image
          src={imageUrl}
          alt={value.alt || " "}
          loading="lazy"
          width={800}
          height={450}
          className="my-6 rounded-lg object-cover"
        />
      );
    },
  },
};

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    { slug: params.slug },
    options
  );

  if (!post) {
    return (
      <main className="container mx-auto flex min-h-screen max-w-3xl flex-col items-center gap-4 p-8">
        <h1 className="text-4xl font-bold">Post not found</h1>
        <Link href="/" className="hover:underline">
          ← Back to posts
        </Link>
      </main>
    );
  }

  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;

  return (
    <main className="container mx-auto flex min-h-screen max-w-3xl flex-col gap-4 p-8">
      <Link href="/" className="hover:underline">
        ← Back to posts
      </Link>
      {postImageUrl && (
        <Image
          src={postImageUrl}
          alt={post.title || "Post image"}
          className="aspect-video rounded-xl object-cover"
          width={550}
          height={310}
          priority
        />
      )}
      <h1 className="my-4 text-4xl font-bold">{post.title}</h1>
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <p className="text-sm text-muted-foreground">
          Published: {new Date(post.publishedAt).toLocaleDateString()}
        </p>
        {Array.isArray(post.body) && (
          <PortableText value={post.body} components={ptComponents} />
        )}
      </div>
    </main>
  );
}