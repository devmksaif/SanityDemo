'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type AnimatedButtonVariant = 
  | 'ripple' 
  | 'glow' 
  | 'magnetic' 
  | 'elastic' 
  | 'shine' 
  | 'float'
  | 'gradient-shift';

interface AnimatedButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  variant?: AnimatedButtonVariant;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
};

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, variant = 'ripple', size = 'md', className, ...props }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case 'glow':
          return 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0';
        case 'shine':
          return 'relative bg-gradient-to-r from-gray-900 to-gray-700 text-white border-0 overflow-hidden';
        case 'gradient-shift':
          return 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-size-200 text-white border-0 hover:bg-pos-100';
        case 'float':
          return 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0 shadow-lg';
        default:
          return 'bg-primary text-primary-foreground border border-input hover:bg-accent hover:text-accent-foreground';
      }
    };

    const getMotionProps = () => {
      switch (variant) {
        case 'ripple':
          return {
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 },
            transition: { type: "spring" as const, stiffness: 400, damping: 10 }
          };
        case 'glow':
          return {
            whileHover: { 
              boxShadow: "0 0 20px rgba(99, 102, 241, 0.6)",
              scale: 1.02 
            },
            whileTap: { scale: 0.98 },
            transition: { duration: 0.2 }
          };
        case 'magnetic':
          return {
            whileHover: { y: -2, scale: 1.02 },
            whileTap: { y: 0, scale: 0.98 },
            transition: { type: "spring" as const, stiffness: 300, damping: 20 }
          };
        case 'elastic':
          return {
            whileHover: { scale: 1.1 },
            whileTap: { scale: 0.9 },
            transition: { type: "spring" as const, stiffness: 600, damping: 10 }
          };
        case 'shine':
          return {
            whileHover: { scale: 1.02 },
            whileTap: { scale: 0.98 },
            transition: { duration: 0.2 }
          };
        case 'float':
          return {
            animate: { 
              y: [-2, 2, -2],
            },
            whileHover: { scale: 1.05, y: -4 },
            whileTap: { scale: 0.95 },
            transition: { 
              y: {
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut"
              }
            }
          };
        case 'gradient-shift':
          return {
            whileHover: { scale: 1.02 },
            whileTap: { scale: 0.98 },
            transition: { duration: 0.3 }
          };
        default:
          return {};
      }
    };

    return (
      <div className="relative inline-block">
        <motion.button
          ref={ref}
          className={cn(
            'relative rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            sizeClasses[size],
            getVariantClasses(),
            className
          )}
          {...getMotionProps()}
          {...props}
        >
          {variant === 'shine' && (
            <motion.div
              className="absolute inset-0 -top-2 -bottom-2 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              animate={{
                left: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut"
              }}
            />
          )}
          
          {variant === 'ripple' && (
            <motion.div
              className="absolute inset-0 rounded-md"
              whileTap={{
                scale: [1, 1.2],
                opacity: [0, 0.3, 0],
              }}
              transition={{ duration: 0.3 }}
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
              }}
            />
          )}
          
          <span className="relative z-10">{children}</span>
        </motion.button>
      </div>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';