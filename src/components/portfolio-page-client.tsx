"use client";

import type { PortfolioProjectData } from "@/types/sanity";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, Play, Image as ImageIcon, Calendar, User } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CaseStudiesShowcase } from "@/components/case-studies-showcase";

// Fallback image for missing thumbnails
const FALLBACK_THUMBNAIL_URL = "https://images.unsplash.com/photo-1511379938547-c1f33886168f?w=600&h=400&fit=crop";

function CaseStudyCard({ project }: { project: PortfolioProjectData }) {
  // Robust image URL handling
  const imageUrl = project.thumbnailImage 
    ? urlFor(project.thumbnailImage).width(600).height(400).url()
    : FALLBACK_THUMBNAIL_URL;

  const hasSlug = project.slug?.current;
  const slug = hasSlug ? project.slug.current : project._id;
  const href = `/portfolio/${slug}`;

  const handleClick = (e: React.MouseEvent) => {
    if (!hasSlug) {
      e.preventDefault();
      console.warn(`🚨 Project "${project.title}" has no slug! ID: ${project._id}`);
      alert(`This project has no slug generated. Please go to Sanity Studio and click "Generate" next to the Slug field.`);
    }
  };

  // Handle missing category
  const displayCategory = project.category || "Creative Project";
  
  // Handle missing division
  const displayDivision = project.division?.title || "Shubz Entertainment";
  
  // Handle missing author
  const displayAuthor = project.author?.name || "Shubz Team";
  
  // Handle missing release date
  const displayDate = project.releaseDate 
    ? new Date(project.releaseDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Date TBA";

  return (
    <Link href={href} onClick={handleClick} className="group block">
      <Card className={cn(
        "overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        !hasSlug && "opacity-75 cursor-not-allowed"
      )}>
        {/* Image Section with Error Handling */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              console.warn(`Failed to load thumbnail for project: ${project.title}`);
              // Fallback to gradient if image fails
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
            }}
          />
          {/* Fallback gradient for image errors */}
          <div className="hidden absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-white/60" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Content Section with Error Handling */}
        <div className="p-4">
          {/* Category and Division - Error handled */}
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-foreground">
              {project.title}
              {displayCategory && (
                <span className="ml-1 text-base font-normal text-muted-foreground">
                  ({displayCategory})
                </span>
              )}
            </h3>
            {displayDivision && (
              <p className="mt-1 text-sm text-muted-foreground">
                — {displayDivision}
              </p>
            )}
          </div>
          
          {/* Author and Date - Error handled */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
            <User className="w-3 h-3" />
            <span>{displayAuthor}</span>
            {project.releaseDate && (
              <>
                <span>•</span>
                <Calendar className="w-3 h-3" />
                <span>{displayDate}</span>
              </>
            )}
          </div>
        </div>

        {/* No Slug Warning */}
        {!hasSlug && (
          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-yellow-500/90 px-2 py-1 text-xs font-semibold text-white">
            <AlertTriangle className="h-3 w-3" />
            <span>No slug</span>
          </div>
        )}
      </Card>
    </Link>
  );
}

export function PortfolioPageClient({ projects }: { projects: PortfolioProjectData[] }) {
  // Handle empty projects array
  if (!projects || projects.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Container className="py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">No Projects Found</h2>
          <p className="text-muted-foreground mb-6">Portfolio projects are coming soon.</p>
          <Button asChild>
            <Link href="/studio">Add Projects in Studio</Link>
          </Button>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden h-[70vh] min-h-[500px] w-full bg-primary text-primary-foreground">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          >
            <source src="/portfolio-hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/60 to-primary/40" />
        </div>
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent/20 rounded-full blur-xl"
            animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-secondary/20 rounded-full blur-xl"
            animate={{ x: [20, -20, 20], y: [10, -10, 10] }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-24 h-24 bg-white/10 rounded-full blur-lg"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
        </div>
        <Container className="relative flex h-full flex-col items-center justify-center text-center">
          <motion.div
            className="max-w-4xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Sparkles className="h-4 w-4" />
              Case Studies
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Creative Portfolio
            </motion.h1>
            <motion.p
              className="text-lg text-white/80 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Explore our work across film, music, dance, and digital media through our sister companies.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Reel
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </header>

      <CaseStudiesShowcase projects={projects} />

      {/* All Projects Grid - Error handled */}
      <main className="py-16 sm:py-24">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              All Projects
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Browse through our complete portfolio of creative work
            </p>
          </div>
          {projects.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (index * 0.1), duration: 0.6 }}
                >
                  <CaseStudyCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Portfolio projects coming soon.</p>
              <Button asChild className="mt-4">
                <Link href="/studio">Add Projects in Studio</Link>
              </Button>
            </div>
          )}
        </Container>
      </main>
    </div>
  );
}