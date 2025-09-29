import { client } from "@/lib/sanity";
import type { PortfolioProjectData } from "@/types/sanity";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, Play } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

async function getPortfolioProjects() {
  const query = `*[_type == "portfolioProject"] | order(releaseDate desc){
    _id, 
    title, 
    category, 
    division->{title}, 
    thumbnailImage, 
    releaseDate, 
    slug
  }`;
  const data: PortfolioProjectData[] = await client.fetch(query);
  return data;
}

export default async function PortfolioPage() {
  const projects = await getPortfolioProjects();

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Hero Section with Video Background */}
      <header className="relative overflow-hidden h-[70vh] min-h-[500px] w-full bg-primary text-primary-foreground">
        {/* Video Background */}
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
        
        {/* Animated Background Elements */}
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

      <main className="py-16 sm:py-24">
        <Container>
          {projects.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + (index * 0.1), duration: 0.6 }}
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

function CaseStudyCard({ project }: { project: PortfolioProjectData }) {
  const imageUrl = urlFor(project.thumbnailImage).width(600).height(400).url();
  const hasSlug = project.slug?.current;
  const slug = hasSlug ? project.slug.current : project._id;
  const href = `/portfolio/${slug}`;

  return (
    <Link href={href} className="group block">
      <Card className="overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        {/* Image Thumbnail with Hover Effect */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-foreground">
            {project.title}
            {project.category && (
              <span className="ml-1 text-base font-normal text-muted-foreground">
                ({project.category})
              </span>
            )}
          </h3>
          {project.division?.title && (
            <p className="mt-1 text-sm text-muted-foreground">
              — {project.division.title}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}