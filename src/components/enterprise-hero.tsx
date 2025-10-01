"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, Variants, easeOut, easeInOut } from "framer-motion";
import Link from "next/link";
import { CldVideoPlayer, CldImage } from "next-cloudinary";
import { client } from "@/lib/sanity";

type SanityCloudinaryAsset = {
  _type: "cloudinary.asset";
  public_id: string;
  secure_url: string;
};

type HeroData = {
  heroHeadline?: string;
  heroSubheadline?: string;
  heroVideo?: SanityCloudinaryAsset;
  heroImage?: SanityCloudinaryAsset;
};

export function EnterpriseHero() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const query = `*[_type == "hero"][0]{
          heroHeadline,
          heroSubheadline,
          "heroVideo": heroVideo{_type, public_id, secure_url},
          "heroImage": heroImage{_type, public_id, secure_url}
        }`;
        const data = await client.fetch(query);
        setHeroData(data);
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };
    fetchHero();
  }, []);

  const headline = heroData?.heroHeadline || "From Spark to Spotlight.";
  const subheadline =
    heroData?.heroSubheadline ||
    "We are Africa's Creative Nerve Center — bridging media, talent, and technology into global stories.";

  const backgroundVideoId = heroData?.heroVideo?.secure_url;
  const backgroundImageId = heroData?.heroImage?.public_id;

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* VIDEO OR IMAGE BACKGROUND */}
      {backgroundVideoId || backgroundImageId ? (
        <div className="absolute inset-0 w-full h-full">
          {backgroundVideoId ? (
            <video
              src={backgroundVideoId}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              controls={false}
               
            /> 
          ) : (
            <CldImage
              src={backgroundImageId!}
              alt="Hero Background"
              fill
              sizes="100vw"
              className="object-cover"
            />
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </div>
      ) : (
        <div className="absolute inset-0 w-full h-full bg-primary" />
      )}

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          <motion.div
            className="space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Creative Enterprise
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white">
              {headline}
            </h1>

            <p className="text-lg sm:text-xl font-serif  lg:text-2xl text-white/80">{subheadline}</p>

            <div className="flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
              <Button asChild size="lg" className="group font-serif bg-white text-primary hover:bg-white/90">
                <Link href="#divisions-section" className="inline-flex items-center">
                  Explore Divisions
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="font-serif border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
              >
                <Link href="#portfolio-section">See Our Work</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
