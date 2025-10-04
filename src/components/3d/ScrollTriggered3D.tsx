'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../../lib/three-setup' // Import to ensure THREE namespace is extended
import * as THREE from 'three';

interface MorphingShapeProps {
  scrollProgress: number;
  intensity?: number;
}

function MorphingGeometry({ scrollProgress, intensity = 1 }: MorphingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.IcosahedronGeometry>(null);
  
  useFrame((state) => {
    if (meshRef.current && geometryRef.current) {
      // Morph the geometry based on scroll
      const positions = geometryRef.current.attributes.position.array as Float32Array;
      const originalPositions = geometryRef.current.userData.originalPositions as Float32Array;
      
      if (!originalPositions) {
        geometryRef.current.userData.originalPositions = [...positions];
        return;
      }
      
      for (let i = 0; i < positions.length; i += 3) {
        const noise = Math.sin(state.clock.elapsedTime * 2 + i * 0.1) * 0.1;
        const scrollInfluence = scrollProgress * 2;
        
        positions[i] = originalPositions[i] + noise * scrollInfluence * intensity;
        positions[i + 1] = originalPositions[i + 1] + noise * scrollInfluence * intensity;
        positions[i + 2] = originalPositions[i + 2] + noise * scrollInfluence * intensity;
      }
      
      geometryRef.current.attributes.position.needsUpdate = true;
      
      // Rotate based on scroll
      meshRef.current.rotation.x = scrollProgress * Math.PI * 2;
      meshRef.current.rotation.y = scrollProgress * Math.PI * 1.5;
      
      // Scale based on scroll
      const scale = 1 + scrollProgress * 0.5;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry ref={geometryRef} args={[1, 2]} />
      <meshStandardMaterial 
        color={`hsl(${240 + scrollProgress * 60}, 70%, 60%)`}
        transparent 
        opacity={0.6}
        wireframe={scrollProgress > 0.5}
      />
    </mesh>
  );
}

function ParallaxSphere({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = scrollProgress * 5;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.z = scrollProgress * Math.PI;
      
      // Change material properties based on scroll
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = scrollProgress * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[3, -2, 0]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial 
        color="#8b5cf6" 
        transparent 
        opacity={0.8}
        emissive="#6366f1"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

function FloatingRings({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3 + scrollProgress * Math.PI;
      groupRef.current.position.y = Math.sin(scrollProgress * Math.PI) * 2;
    }
  });

  return (
    <group ref={groupRef} position={[-3, 0, -1]}>
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI) / 3]}>
          <torusGeometry args={[1.5 + i * 0.3, 0.1, 8, 24]} />
          <meshStandardMaterial 
            color={`hsl(${280 + i * 20}, 70%, 60%)`}
            transparent 
            opacity={0.7 - scrollProgress * 0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ScrollTriggered3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    return scrollYProgress.on('change', setScrollProgress);
  }, [scrollYProgress]);

  // Transform values based on scroll
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]);

  return (
    <motion.div 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ y, opacity, scale }}
    >
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
          
          <MorphingGeometry scrollProgress={scrollProgress} />
          <ParallaxSphere scrollProgress={scrollProgress} />
          <FloatingRings scrollProgress={scrollProgress} />
          
          {/* Dynamic fog based on scroll */}
          <fog attach="fog" args={[
            `hsl(${240 + scrollProgress * 60}, 50%, 10%)`, 
            5, 
            15 - scrollProgress * 5
          ]} />
        </Canvas>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <motion.div 
          className="text-center text-white"
          style={{
            opacity: useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0])
          }}
        >
          <h2 className="text-4xl font-bold mb-4">Immersive Experience</h2>
          <p className="text-xl opacity-80">Scroll to explore the 3D universe</p>
        </motion.div>
      </div>
    </motion.div>
  );
}