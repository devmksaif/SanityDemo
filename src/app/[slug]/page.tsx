import { PortableText, type SanityDocument } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client, urlFor } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const ptComponents = {
  types: {
    image: ({ value }: { value: SanityImageSource & { alt?: string } }) => {
      if (!value?.asset?._ref) return null;
      const imageUrl = urlFor(value)?.width(800).fit("max").auto("format").url();
      if (!imageUrl) return null;
      return (
        <Image
          src={imageUrl}
          alt={value.alt || " "}
          loading="lazy"
          width={800}
          height={450}
          className="my-8 rounded-lg object-cover"
        />
      );
    },
  },
};

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await client.fetch<SanityDocument>(POST_QUERY, {
    slug: params.slug,
  });

  if (!post) {
    notFound();
  }

  const postImageUrl = post.image
    ? urlFor(post.image)?.width(1200).height(630).url()
    : null;

  return (
    <article className="container mx-auto max-w-3xl px-4 py-8">
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-muted-foreground hover:underline"
      >
        ← Back to all posts
      </Link>
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {post.title}
      </h1>
      <p className="mb-8 text-muted-foreground">
        {new Date(post.publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      {postImageUrl && (
        <div className="relative mb-8 h-auto w-full aspect-video">
          <Image
            src={postImageUrl}
            alt={post.title || "Post image"}
            fill
            className="rounded-xl object-cover"
            priority
          />
        </div>
      )}
      <div className="prose prose-lg max-w-none dark:prose-invert">
        {Array.isArray(post.body) && (
          <PortableText value={post.body} components={ptComponents} />
        )}
      </div>
    </article>
  );
}