"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { ThemedLogoSpecial } from "./themed-logo-special";
import type { HomePageData } from "@/types/sanity";
import { motion } from "framer-motion";
import Link from "next/link";

type EnterpriseHeroProps = {
  data?: HomePageData | null;
};

// Animation variants for the text content
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Animation variants for the logo display
const logoContainerVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      delay: 0.8,
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function EnterpriseHero({ data }: EnterpriseHeroProps) {
  const headline = data?.heroHeadline || "From Spark to Spotlight.";
  const subheadline = data?.heroSubheadline || "We are Africa's Creative Nerve Center — bridging media, talent, and technology into global stories.";

  return (
    <section className="relative w-full overflow-hidden h-[90vh] min-h-[700px] flex items-center">
      {/* Modern Creative Background with Complex Animations */}
      <div className="absolute inset-0 bg-primary">
        {/* Animated blurred circles */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl opacity-10"
          animate={{ x: [-50, 50, -50], y: [-50, 50, -50] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-10"
          animate={{ x: [50, -50, 50], y: [50, -50, 50] }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-2xl opacity-10"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
        
        {/* Animated geometric shapes */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 bg-accent/20 rotate-45 rounded-lg"
            animate={{ y: [0, -20, 0], rotate: [45, 55, 45] }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-32 right-32 w-24 h-24 bg-secondary/20 rotate-12 rounded-xl"
            animate={{ y: [0, 25, 0], x: [0, -25, 0], rotate: [12, 2, 12] }}
            transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/10 rotate-45 rounded-full"
            animate={{ y: [0, 15, 0], x: [0, 15, 0] }}
            transition={{ duration: 12, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-accent/15 -rotate-12 rounded-lg"
            animate={{ y: [0, -10, 0], x: [0, 20, 0], rotate: [-12, -2, -12] }}
            transition={{ duration: 22, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
        </div>

        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:20px_20px]" />
        
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Animated Content */}
          <motion.div 
            className="space-y-8 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-block">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                <span>Creative Enterprise</span>
              </div>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              {headline}
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg text-white/80 sm:text-xl lg:text-2xl"
            >
              {subheadline}
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
            >
              <Button
                asChild
                size="lg"
                className="group bg-white text-primary hover:bg-white/90"
              >
                <Link href="#divisions-section">
                  Explore Divisions
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
              >
                <Link href="#portfolio-section">
                  See Our Work
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Animated Visual Element */}
          <motion.div 
            className="relative hidden lg:block"
            variants={logoContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative aspect-square w-full max-w-md mx-auto">
              {/* Clean background circle */}
              <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm border border-white/20" />
              
              {/* Logo display */}
              <div className="absolute inset-12 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <ThemedLogoSpecial
                    width={200} 
                    height={200} 
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full" 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
              />
              <motion.div 
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary rounded-full" 
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
              />
              <motion.div 
                className="absolute top-1/2 -right-8 w-4 h-4 bg-white rounded-full" 
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatType: "mirror" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}