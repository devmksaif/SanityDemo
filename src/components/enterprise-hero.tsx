"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { ThemedLogoSpecial } from "./themed-logo-special";
import { motion, Variants, easeOut, easeInOut } from "framer-motion";
import Link from "next/link";
import { CldVideoPlayer, CldImage } from 'next-cloudinary';
import { client } from "@/lib/sanity";

type SanityCloudinaryAsset = {
  _type: 'cloudinary.asset';
  public_id: string;
  secure_url: string;
};

type HeroData = {
  heroHeadline?: string;
  heroSubheadline?: string;
  heroVideo?: SanityCloudinaryAsset;
  heroImage?: SanityCloudinaryAsset;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const logoContainerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

export function EnterpriseHero() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);

  useEffect(() => {
    const fetchHero = async () => {
      const query = `*[_type == "hero"][0]{
        heroHeadline,
        heroSubheadline,
        heroVideo,
        heroImage
      }`;
      const data = await client.fetch(query);
      setHeroData(data);
    };
    fetchHero();
  }, []);

  const headline = heroData?.heroHeadline || "From Spark to Spotlight.";
  const subheadline =
    heroData?.heroSubheadline ||
    "We are Africa's Creative Nerve Center — bridging media, talent, and technology into global stories.";

  const backgroundVideoId = heroData?.heroVideo?.public_id;
  const backgroundImageId = heroData?.heroImage?.public_id;

  return (
    <section className="relative w-full h-[90vh] min-h-[700px] flex items-center overflow-hidden">
      {/* VIDEO OR IMAGE BACKGROUND */}
      <div className="absolute inset-0 w-full h-full bg-primary">
        {backgroundVideoId ? (
          <CldVideoPlayer
            src={backgroundVideoId}
            width="1920"
            height="1080"
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay="always"
            loop
            muted
          />
        ) : backgroundImageId ? (
          <CldImage
            src={backgroundImageId}
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
        ) : null}
      </div>

      {/* OVERLAYS AND ANIMATIONS */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl opacity-20"
          animate={{ x: [-50, 50, -50], y: [-50, 50, -50] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "mirror", ease: easeInOut }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-20"
          animate={{ x: [50, -50, 50], y: [50, -50, 50] }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "mirror", ease: easeInOut }}
        />
      </div>

      {/* CONTENT GRID */}
      <div className="relative z-10 container mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* TEXT CONTENT */}
          <motion.div
            className="space-y-8 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-block">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                <span>Creative Enterprise</span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              {headline}
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg text-white/80 sm:text-xl lg:text-2xl">
              {subheadline}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="group bg-white text-primary hover:bg-white/90">
                  <Link href="#divisions-section">
                    Explore Divisions
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                >
                  <Link href="#portfolio-section">See Our Work</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}