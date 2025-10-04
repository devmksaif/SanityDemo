'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../../lib/three-setup' // Import to ensure THREE namespace is extended
import * as THREE from 'three';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

function Card3DScene({ isHovered, intensity = 1 }: { isHovered: boolean; intensity: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 * intensity;
      
      // Rotation based on hover state
      if (isHovered) {
        meshRef.current.rotation.x = THREE.MathUtils.lerp(
          meshRef.current.rotation.x,
          Math.sin(state.clock.elapsedTime * 2) * 0.1,
          0.1
        );
        meshRef.current.rotation.z = THREE.MathUtils.lerp(
          meshRef.current.rotation.z,
          Math.cos(state.clock.elapsedTime * 1.5) * 0.05,
          0.1
        );
      } else {
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.05);
        meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, 0, 0.05);
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshStandardMaterial 
          color={isHovered ? "#6366f1" : "#4f46e5"}
          transparent 
          opacity={isHovered ? 0.1 : 0.05}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Floating particles around the card */}
      {Array.from({ length: 20 }).map((_, i) => (
        <FloatingParticle 
          key={i} 
          position={[
            (Math.random() - 0.5) * viewport.width,
            (Math.random() - 0.5) * viewport.height,
            Math.random() * 2
          ]}
          isHovered={isHovered}
        />
      ))}
    </>
  );
}

function FloatingParticle({ position, isHovered }: { position: [number, number, number]; isHovered: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x = position[0] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      ref.current.position.y = position[1] + Math.cos(state.clock.elapsedTime + position[1]) * 0.1;
      ref.current.rotation.x = state.clock.elapsedTime * 0.5;
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
      
      // Scale based on hover
      const targetScale = isHovered ? 1.5 : 1;
      ref.current.scale.setScalar(
        THREE.MathUtils.lerp(ref.current.scale.x, targetScale, 0.1)
      );
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshStandardMaterial 
        color="#8b5cf6" 
        transparent 
        opacity={isHovered ? 0.8 : 0.4}
        emissive="#4f46e5"
        emissiveIntensity={isHovered ? 0.2 : 0.1}
      />
    </mesh>
  );
}

export default function Card3D({ children, className = '', intensity = 1 }: Card3DProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas
          style={{ background: 'transparent' }}
          camera={{ position: [0, 0, 5], fov: 50 }}
        >
          <Card3DScene isHovered={isHovered} intensity={intensity} />
        </Canvas>
      </div>
      
      {/* Gradient overlay */}
      <motion.div 
        className="absolute inset-0 opacity-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Glow effect */}
      <motion.div 
        className="absolute inset-0 rounded-lg opacity-0"
        style={{
          background: 'linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
          filter: 'blur(10px)',
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}