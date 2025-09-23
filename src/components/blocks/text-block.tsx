import { PortableText } from '@portabletext/react'
import { Container } from '@/components/ui/container'

export function TextBlock({ data }: { data: any }) {
  return (
    <Container size="md" className="py-8">
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <PortableText value={data.content} />
      </div>
    </Container>
  );
}