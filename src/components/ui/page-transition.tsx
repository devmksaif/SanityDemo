'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

type TransitionVariant = 
  | 'slide-up' 
  | 'slide-right' 
  | 'fade-scale' 
  | 'curtain' 
  | 'spiral'
  | 'particle-burst'
  | 'wave';

interface PageTransitionProps {
  children: ReactNode;
  variant?: TransitionVariant;
  duration?: number;
  className?: string;
}

const transitionVariants = {
  'slide-up': {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -100, opacity: 0 }
  },
  'slide-right': {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 }
  },
  'fade-scale': {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.2, opacity: 0 }
  },
  'curtain': {
    initial: { scaleY: 0, originY: 0 },
    animate: { scaleY: 1 },
    exit: { scaleY: 0, originY: 1 }
  },
  'spiral': {
    initial: { scale: 0, rotate: -180, opacity: 0 },
    animate: { scale: 1, rotate: 0, opacity: 1 },
    exit: { scale: 0, rotate: 180, opacity: 0 }
  },
  'particle-burst': {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 }
  },
  'wave': {
    initial: { scaleX: 0, originX: 0 },
    animate: { scaleX: 1 },
    exit: { scaleX: 0, originX: 1 }
  }
};

export function PageTransition({ 
  children, 
  variant = 'fade-scale', 
  duration = 0.5,
  className 
}: PageTransitionProps) {
  const variants = transitionVariants[variant];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={variant}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        transition={{ 
          duration, 
          ease: [0.6, -0.05, 0.01, 0.99],
          type: variant === 'particle-burst' ? "spring" : undefined,
          stiffness: variant === 'particle-burst' ? 200 : undefined,
          damping: variant === 'particle-burst' ? 15 : undefined
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Staggered children animation for lists
export function StaggeredList({ 
  children, 
  staggerDelay = 0.1 
}: { 
  children: ReactNode[];
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 }
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Reveal animation for text
export function TextReveal({ 
  children, 
  delay = 0 
}: { 
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        delay, 
        duration: 0.8, 
        ease: [0.6, -0.05, 0.01, 0.99] 
      }}
    >
      {children}
    </motion.div>
  );
}