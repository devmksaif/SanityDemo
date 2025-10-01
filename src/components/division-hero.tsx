"use client";

import { Container } from "@/components/ui/container";
import { Calendar, Users, Award } from "lucide-react";
import { CldImage } from "next-cloudinary";

interface DivisionHeroProps {
  coverPublicId: string | null;
  logoPublicId: string | null;
  title: string;
}

export function DivisionHero({ coverPublicId, logoPublicId, title }: DivisionHeroProps) {
  return (
    <header className="relative h-[60vh] min-h-[450px] w-full overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>
      
      {coverPublicId ? (
        <CldImage 
          src={coverPublicId} 
          alt={title} 
          fill 
          crop="fill"
          gravity="center"
          className="absolute inset-0 object-cover opacity-10" 
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-700"></div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
      
      <Container className="relative flex h-full flex-col items-center justify-center text-center">
        {logoPublicId && (
          <div className="relative h-20 w-20 mb-4 animate-float">
            <CldImage 
              src={logoPublicId} 
              alt={`${title} Logo`} 
              fill 
              className="object-contain drop-shadow-lg" 
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