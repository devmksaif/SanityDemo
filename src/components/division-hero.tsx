"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Calendar, Users, Award } from "lucide-react";

interface DivisionHeroProps {
  imageUrl: string;
  logoUrl: string | null;
  title: string;
}

export function DivisionHero({ imageUrl, logoUrl, title }: DivisionHeroProps) {
  return (
    <header className="relative h-[60vh] min-h-[450px] w-full overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>
      
      <Image 
        src={imageUrl} 
        alt={title} 
        fill 
        className="absolute inset-0 object-cover opacity-10" 
        priority
        onError={(e) => {
          console.warn(`Failed to load hero image for division: ${title}`);
          (e.target as HTMLImageElement).style.display = 'none';
          (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
        }}
      />
      <div className="hidden absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-700"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
      
      <Container className="relative flex h-full flex-col items-center justify-center text-center">
        {logoUrl && (
          <div className="relative h-20 w-20 mb-4 animate-float">
            <Image 
              src={logoUrl} 
              alt={`${title} Logo`} 
              fill 
              className="object-contain drop-shadow-lg" 
              onError={(e) => {
                console.warn(`Failed to load division logo: ${title}`);
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in-up">
          {title}
        </h1>
        
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm opacity-80">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Established</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Creative Team</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            <span>Industry Leading</span>
          </div>
        </div>
      </Container>
    </header>
  );
}