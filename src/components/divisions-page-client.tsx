"use client";

import { motion } from "framer-motion";
import type { DivisionData } from "@/types/sanity";
import { DivisionCard } from "@/components/division-card";

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
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function DivisionsPageClient({ divisions }: { divisions: DivisionData[] }) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {divisions.map((division) => (
        <motion.div key={division._id} variants={itemVariants}>
          <DivisionCard division={division} />
        </motion.div>
      ))}
    </motion.div>
  );
}