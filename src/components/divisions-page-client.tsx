"use client";

import { motion, Variants, easeOut } from "framer-motion";
import type { DivisionData } from "@/types/sanity";
import { DivisionCard } from "@/components/division-card";

// Parent container animation
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15, // Animate children one after another
    },
  },
};

// Individual card animation
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOut, // ✅ Type-safe easing
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
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {divisions.map((division) => (
        <motion.div
          key={division._id}
          variants={cardVariants}
        >
          <DivisionCard division={division} />
        </motion.div>
      ))}
    </motion.div>
  );
}
