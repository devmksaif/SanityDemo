import { client } from "@/lib/sanity";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/block-renderer";

async function getPage(slug: string) {
  const query = `*[_type == "page" && slug.current == $slug][0]`;
  const data = await client.fetch(query, { slug });
  return data;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getPage(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="py-12">
      {page.pageBuilder && <BlockRenderer blocks={page.pageBuilder} />}
    </div>
  );
}