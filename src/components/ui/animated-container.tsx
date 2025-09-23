"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
}

export function AnimatedContainer({
  children,
  className,
  delay = 0,
  amount = 0.5,
}: AnimatedContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}