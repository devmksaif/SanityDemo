'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import '../../lib/three-setup' // Import to ensure THREE namespace is extended
import * as THREE from 'three';

interface TransitionGeometryProps {
  isTransitioning: boolean;
  progress: number;
}

function TransitionGeometry({ isTransitioning, progress }: TransitionGeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.PlaneGeometry>(null);
  
  useFrame((state) => {
    if (meshRef.current && geometryRef.current) {
      // Morphing wave effect during transition
      if (isTransitioning) {
        const positions = geometryRef.current.attributes.position.array as Float32Array;
        const time = state.clock.elapsedTime;
        
        for (let i = 0; i < positions.length; i += 3) {
          const x = positions[i];
          const y = positions[i + 1];
          
          // Create ripple effect
          const distance = Math.sqrt(x * x + y * y);
          const wave = Math.sin(distance * 3 - time * 5) * progress * 0.5;
          positions[i + 2] = wave;
        }
        
        geometryRef.current.attributes.position.needsUpdate = true;
      }
      
      // Rotation during transition
      meshRef.current.rotation.z = progress * Math.PI * 2;
      
      // Scale effect
      const scale = 1 + progress * 2;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry ref={geometryRef} args={[10, 10, 50, 50]} />
      <meshStandardMaterial 
        color={`hsl(${240 + progress * 120}, 70%, 50%)`}
        transparent 
        opacity={progress * 0.8}
        wireframe
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function ParticleExplosion({ isTransitioning, progress }: TransitionGeometryProps) {
  const pointsRef = useRef<THREE.Points>(null);
  
  useFrame(() => {
    if (pointsRef.current && isTransitioning) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Expand particles outward
        const expansion = progress * 5;
        positions[i] *= 1 + expansion * 0.01;
        positions[i + 1] *= 1 + expansion * 0.01;
        positions[i + 2] *= 1 + expansion * 0.01;
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Generate particles
  const particlePositions = new Float32Array(1000 * 3);
  for (let i = 0; i < 1000; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 5;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 5;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 5;
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position"
          count={1000}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color="#8b5cf6" 
        transparent 
        opacity={progress * 0.8}
        sizeAttenuation 
      />
    </points>
  );
}

function MorphingTunnel({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 2;
      groupRef.current.position.z = progress * 10 - 5;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[0, 0, i * 2 - 10]}>
          <torusGeometry args={[2 + i * 0.5, 0.1, 8, 24]} />
          <meshStandardMaterial 
            color={`hsl(${280 + i * 10}, 70%, 60%)`}
            transparent 
            opacity={0.6 * (1 - progress)}
            emissive={`hsl(${280 + i * 10}, 70%, 30%)`}
            emissiveIntensity={progress * 0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

interface PageTransition3DProps {
  children: React.ReactNode;
  duration?: number;
}

export default function PageTransition3D({ children, duration = 1000 }: PageTransition3DProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [previousPathname, setPreviousPathname] = useState(pathname);

  useEffect(() => {
    if (pathname !== previousPathname) {
      setIsTransitioning(true);
      setTransitionProgress(0);
      
      // Animate transition progress
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        setTransitionProgress(progress);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsTransitioning(false);
          setPreviousPathname(pathname);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [pathname, previousPathname, duration]);

  return (
    <div className="relative">
      {/* 3D Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Canvas
              camera={{ position: [0, 0, 5], fov: 75 }}
              style={{ background: 'transparent' }}
            >
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
              
              <TransitionGeometry 
                isTransitioning={isTransitioning} 
                progress={transitionProgress} 
              />
              <ParticleExplosion 
                isTransitioning={isTransitioning} 
                progress={transitionProgress} 
              />
              <MorphingTunnel progress={transitionProgress} />
            </Canvas>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ 
            opacity: 0, 
            scale: 0.95,
            rotateX: 5 
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            rotateX: 0 
          }}
          exit={{ 
            opacity: 0, 
            scale: 1.05,
            rotateX: -5 
          }}
          transition={{
            duration: duration / 1000,
            ease: [0.22, 1, 0.36, 1]
          }}
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Glow overlay during transition */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-40 pointer-events-none"
            style={{
              background: `radial-gradient(circle, 
                rgba(99, 102, 241, ${transitionProgress * 0.1}) 0%, 
                rgba(139, 92, 246, ${transitionProgress * 0.05}) 50%, 
                transparent 100%)`
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}