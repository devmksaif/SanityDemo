"use client";

import type { PortfolioProjectData } from "@/types/sanity";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Sparkles, Play, Image as ImageIcon, Calendar, User, AlertTriangle, ArrowRight, Filter, Grid, List } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CaseStudiesShowcase } from "@/components/case-studies-showcase";
import { cn } from "@/lib/utils";
import { useState } from "react";

function CaseStudyCard({ project }: { project: PortfolioProjectData }) {
  const hasSlug = project.slug?.current;
  const href = hasSlug ? `/portfolio/${project.slug.current}` : "#";
  const hasThumbnail = project.thumbnailImage?._type === 'cloudinary.asset' && project.thumbnailImage.public_id;

  const handleClick = (e: React.MouseEvent) => {
    if (!hasSlug) {
      e.preventDefault();
      console.warn(`🚨 Project "${project.title}" has no slug! ID: ${project._id}`);
      alert(`This project has no slug generated. Please go to Sanity Studio and click "Generate" next to the Slug field.`);
    }
  };

  const displayCategory = project.category || "Creative Project";
  const displayDivision = project.division?.title || "Shubz Entertainment";
  const displayAuthor = project.author?.name || "Shubz Team";
  const displayDate = project.releaseDate 
    ? new Date(project.releaseDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    : "Date TBA";

  return (
    <motion.div 
      whileHover={{ y: -8 }} 
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link href={href} onClick={handleClick} className="block">
        <Card className={cn(
          "overflow-hidden rounded-xl border-0 bg-card transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10",
          !hasSlug && "opacity-75 cursor-not-allowed"
        )}>
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            {hasThumbnail ? (
              <CldImage
                src={project.thumbnailImage.public_id!}
                alt={project.title}
                width="600"
                height="450"
                crop="fill"
                gravity="center"
                className="object-cover transition-all duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-muted via-muted/50 to-accent/20 flex items-center justify-center">
                <ImageIcon className="h-16 w-16 text-muted-foreground/40" />
              </div>
            )}
            
            {/* Overlay with enhanced hover effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
            
            {/* Floating badge */}
            <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <Badge variant="secondary" className="bg-white/90 text-black backdrop-blur-sm">
                {displayCategory}
              </Badge>
            </div>
            
            {/* View project button */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
              <Button size="sm" className="bg-white text-black hover:bg-white/90 backdrop-blur-sm">
                View Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            {!hasSlug && (
              <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-yellow-500/90 px-3 py-1 text-xs font-semibold text-white">
                <AlertTriangle className="h-3 w-3" />
                <span>No slug</span>
              </div>
            )}
          </div>
          
          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h3>
              {displayDivision && (
                <p className="mt-1 text-sm font-medium text-primary/80">
                  {displayDivision}
                </p>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{displayAuthor}</span>
                </div>
                {project.releaseDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{displayDate}</span>
                  </div>
                )}
              </div>
              
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export function PortfolioPageClient({ projects }: { projects: PortfolioProjectData[] }) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Get unique categories from projects
  const categories = ['all', ...new Set(projects.map(p => p.category).filter(Boolean))];
  
  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  if (!projects || projects.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Container className="py-16 text-center">
          <ImageIcon className="h-16 w-16 text-muted-foreground/40 mx-auto mb-6" />
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
      <header className="relative overflow-hidden h-[80vh] min-h-[600px] w-full bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/30 rounded-full blur-3xl"
            animate={{ 
              x: [0, 100, 0], 
              y: [0, -50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              repeatType: "mirror", 
              ease: "easeInOut" 
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-secondary/20 rounded-full blur-xl"
            animate={{ 
              x: [20, -20, 20], 
              y: [10, -10, 10],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              repeatType: "mirror", 
              ease: "easeInOut" 
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-24 h-24 bg-white/10 rounded-full blur-lg"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              repeatType: "mirror", 
              ease: "easeInOut" 
            }}
          />
        </div>

        <Container className="relative flex h-full flex-col items-center justify-center text-center">
          <motion.div
            className="max-w-5xl mx-auto space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm border border-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Sparkles className="h-4 w-4" />
              <span>Portfolio Showcase</span>
            </motion.div>
            
            <motion.h1
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Creative Excellence
              <br />
              <span className="text-accent">In Motion</span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Explore our diverse portfolio of groundbreaking projects across film, music, digital media, and entertainment. Each piece tells a story of innovation, creativity, and cultural impact.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm group"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Showreel
              </Button>
              
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Explore Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            
            {/* Statistics */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              {[
                { label: 'Projects', value: projects.length },
                { label: 'Categories', value: categories.length - 1 },
                { label: 'Years Active', value: '10+' },
                { label: 'Awards Won', value: '25+' }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-accent">{stat.value}</div>
                  <div className="text-sm text-white/70 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </header>

      {/* Portfolio Grid Section */}
      <main className="py-20 sm:py-28">
        <Container>
          {/* Section Header with Controls */}
          <div className="mb-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-1 w-12 bg-primary"></div>
                  <Badge variant="outline" className="text-xs tracking-wider">
                    FEATURED WORK
                  </Badge>
                </div>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
                  Project Gallery
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Discover our most impactful projects that have shaped industries and inspired audiences worldwide.
                </p>
              </div>
              
              {/* Filter and View Controls */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="capitalize"
                    >
                      {category === 'all' ? 'All Projects' : category}
                    </Button>
                  ))}
                </div>
                
                {/* View Mode Toggle */}
                <div className="flex rounded-lg border p-1">
                  <Button
                    variant={viewMode === 'grid' ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="px-3"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="px-3"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Grid/List */}
          {filteredProjects.length > 0 ? (
            <motion.div
              className={cn(
                "grid gap-8",
                viewMode === 'grid' 
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                  : "grid-cols-1 lg:grid-cols-2 gap-12"
              )}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  variants={itemVariants}
                  className={viewMode === 'list' ? "lg:col-span-1" : ""}
                >
                  <CaseStudyCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ImageIcon className="h-16 w-16 text-muted-foreground/40 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-foreground mb-4">No Projects Found</h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                {selectedCategory === 'all' 
                  ? "Projects will appear here once they're added to the portfolio."
                  : `No projects found in the "${selectedCategory}" category.`
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {selectedCategory !== 'all' && (
                  <Button variant="outline" onClick={() => setSelectedCategory('all')}>
                    View All Projects
                  </Button>
                )}
                <Button asChild>
                  <Link href="/studio">Add Projects in Studio</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </Container>
      </main>
    </div>
  );
}