'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Nav3DLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Nav3DLink({ 
  href, 
  children, 
  isActive = false, 
  className,
  onClick 
}: Nav3DLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (event.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      className="relative perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.a
        href={href}
        onClick={onClick}
        className={cn(
          "group relative inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium font-serif transition-all duration-300 overflow-hidden",
          "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none",
          isActive && "bg-accent text-accent-foreground",
          className
        )}
        animate={{
          rotateX: isHovered ? mousePosition.y * 8 : 0,
          rotateY: isHovered ? mousePosition.x * 8 : 0,
          z: isHovered ? 20 : 0,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* 3D Background Layer */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-0 blur-md"
          animate={{
            opacity: isHovered ? 0.3 : 0,
            scale: isHovered ? 1.2 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Floating Particles */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
                animate={{
                  x: [0, Math.random() * 40 - 20, 0],
                  y: [0, Math.random() * 20 - 10, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${20 + i * 20}%`,
                  top: '50%',
                }}
              />
            ))}
          </motion.div>
        )}
        
        {/* Text Content */}
        <motion.span
          className="relative z-10"
          animate={{
            y: isHovered ? -1 : 0,
            color: isHovered ? "rgba(139, 92, 246, 1)" : undefined,
          }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.span>
        
        {/* Bottom border indicator */}
        <motion.div
          className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
          animate={{
            width: isHovered || isActive ? "80%" : "0%",
            x: "-50%",
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </motion.a>
    </motion.div>
  );
}