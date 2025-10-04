"use client";

import { motion, Variants, easeOut } from "framer-motion";
import type { DivisionData } from "@/types/sanity";
import { DivisionCard } from "@/components/division-card";

// Parent container animation
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // Staggered animation for dramatic effect
    },
  },
};

// Individual card animation with enhanced effects
const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99], // Custom cubic-bezier for smooth effect
    },
  },
};

interface Props {
  divisions: DivisionData[];
}

export function DivisionsPageClient({ divisions }: Props) {
  console.log('🎯 DivisionsPageClient received divisions:', divisions?.length);

  if (!divisions || divisions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No divisions available.</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {divisions.map((division, index) => (
        <motion.div
          key={division._id}
          variants={cardVariants}
          className="h-full"
          whileInView={{ 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: { 
              duration: 0.6,
              delay: index * 0.1 
            }
          }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <DivisionCard division={division} />
        </motion.div>
      ))}
    </motion.div>
  );
}
