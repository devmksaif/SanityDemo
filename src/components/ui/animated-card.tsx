'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

type AnimatedCardVariant = 
  | 'hover-lift' 
  | 'tilt-3d' 
  | 'glow-border' 
  | 'scale-content' 
  | 'slide-reveal'
  | 'glass-morph'
  | 'magnetic';

interface AnimatedCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  variant?: AnimatedCardVariant;
  intensity?: number;
}

export function AnimatedCard({ 
  children, 
  variant = 'hover-lift', 
  intensity = 1,
  className, 
  ...props 
}: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (event.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x, y });
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'glow-border':
        return 'border border-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-0.5';
      case 'glass-morph':
        return 'backdrop-blur-lg bg-white/10 border border-white/20';
      default:
        return 'border border-border bg-card';
    }
  };

  const getMotionProps = () => {
    const baseIntensity = intensity;
    
    switch (variant) {
      case 'hover-lift':
        return {
          whileHover: { 
            y: -8 * baseIntensity,
            scale: 1.02,
            boxShadow: `0 ${20 * baseIntensity}px ${40 * baseIntensity}px rgba(0,0,0,0.1)`
          },
          transition: { type: "spring" as const, stiffness: 300, damping: 20 }
        };
        
      case 'tilt-3d':
        return {
          animate: {
            rotateX: isHovered ? mousePosition.y * 10 * baseIntensity : 0,
            rotateY: isHovered ? mousePosition.x * 10 * baseIntensity : 0,
          },
          whileHover: { scale: 1.05 },
          transition: { type: "spring" as const, stiffness: 300, damping: 30 }
        };
        
      case 'glow-border':
        return {
          whileHover: {
            scale: 1.02,
            boxShadow: "0 0 30px rgba(139, 92, 246, 0.3)"
          },
          transition: { duration: 0.3 }
        };
        
      case 'scale-content':
        return {
          whileHover: { scale: 1.03 },
          whileTap: { scale: 0.98 },
          transition: { type: "spring" as const, stiffness: 400, damping: 10 }
        };
        
      case 'slide-reveal':
        return {
          whileHover: { x: 4 * baseIntensity },
          transition: { type: "spring" as const, stiffness: 400, damping: 25 }
        };
        
      case 'glass-morph':
        return {
          whileHover: { 
            scale: 1.02,
            backgroundColor: "rgba(255, 255, 255, 0.15)"
          },
          transition: { duration: 0.3 }
        };
        
      case 'magnetic':
        return {
          animate: {
            x: isHovered ? mousePosition.x * 5 * baseIntensity : 0,
            y: isHovered ? mousePosition.y * 5 * baseIntensity : 0,
          },
          whileHover: { scale: 1.02 },
          transition: { type: "spring" as const, stiffness: 300, damping: 30 }
        };
        
      default:
        return {};
    }
  };

  const cardContent = variant === 'glow-border' ? (
    <div className="bg-background rounded-lg p-6 h-full">
      {children}
    </div>
  ) : (
    <div className="p-6 h-full">
      {children}
    </div>
  );

  return (
    <motion.div
      className={cn(
        'rounded-lg overflow-hidden cursor-pointer perspective-1000',
        getVariantClasses(),
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      {...getMotionProps()}
      {...props}
    >
      {cardContent}
    </motion.div>
  );
}

// Preset card components for common use cases
export function HoverLiftCard({ children, ...props }: Omit<AnimatedCardProps, 'variant'>) {
  return <AnimatedCard variant="hover-lift" {...props}>{children}</AnimatedCard>;
}

export function Tilt3DCard({ children, ...props }: Omit<AnimatedCardProps, 'variant'>) {
  return <AnimatedCard variant="tilt-3d" {...props}>{children}</AnimatedCard>;
}

export function GlowBorderCard({ children, ...props }: Omit<AnimatedCardProps, 'variant'>) {
  return <AnimatedCard variant="glow-border" {...props}>{children}</AnimatedCard>;
}

export function GlassMorphCard({ children, ...props }: Omit<AnimatedCardProps, 'variant'>) {
  return <AnimatedCard variant="glass-morph" {...props}>{children}</AnimatedCard>;
}