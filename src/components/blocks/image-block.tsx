import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { Container } from '@/components/ui/container'

export function ImageBlock({ data }: { data: any }) {
  const imageUrl = urlFor(data.image).width(1200).url();
  return (
    <Container size="lg" className="py-8">
      <figure>
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image src={imageUrl} alt={data.caption || 'Page image'} fill className="object-cover" />
        </div>
        {data.caption && (
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {data.caption}
          </figcaption>
        )}
      </figure>
    </Container>
  );
}