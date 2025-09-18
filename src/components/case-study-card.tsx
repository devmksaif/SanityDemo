import Image from "next/image";
import { Card } from "@/components/ui/card";

export type CaseStudy = {
  title: string;
  tag: string;
  imageUrl: string;
};

type CaseStudyCardProps = {
  study: CaseStudy;
};

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <Card className="group relative block h-80 w-full overflow-hidden rounded-lg">
      <Image
        src={study.imageUrl}
        alt={study.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/60" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="text-2xl font-bold">{study.title}</h3>
        <p className="text-sm text-primary-foreground/80">{study.tag}</p>
      </div>
    </Card>
  );
}