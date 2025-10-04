'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import '../../lib/three-setup'  // Import to ensure THREE namespace is extended
import * as THREE from 'three';

interface FloatingOrbProps {
  position: [number, number, number];
  color: string;
  size?: number;
  speed?: number;
}

function FloatingOrb({ position, color, size = 0.1, speed = 1 }: FloatingOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const originalPosition = useMemo(() => [...position], [position]);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Floating motion
      meshRef.current.position.x = originalPosition[0] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
      meshRef.current.position.y = originalPosition[1] + Math.cos(state.clock.elapsedTime * speed * 0.7) * 0.3;
      meshRef.current.position.z = originalPosition[2] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.2;
      
      // Gentle rotation
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
      
      // Pulsing scale
      const scale = 1 + Math.sin(state.clock.elapsedTime * speed * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial 
        color={color}
        transparent 
        opacity={0.7}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function GlowingRing({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
      
      // Breathing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[0.3, 0.02, 16, 100]} />
      <meshStandardMaterial 
        color={color}
        transparent 
        opacity={0.6}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

function FloatingCrystal({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.6;
      
      // Floating motion
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
      
      // Color shifting
      const hue = (state.clock.elapsedTime * 20) % 360;
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      material.color.setHSL(hue / 360, 0.7, 0.6);
      material.emissive.setHSL(hue / 360, 0.7, 0.3);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.15, 0]} />
      <meshStandardMaterial 
        transparent 
        opacity={0.8}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function TrailingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Swirling motion
        const time = state.clock.elapsedTime * 0.5;
        const radius = 2;
        const angle = time + i * 0.1;
        
        positions[i] = Math.cos(angle) * radius;
        positions[i + 1] += Math.sin(time + i * 0.01) * 0.01;
        positions[i + 2] = Math.sin(angle) * radius;
        
        // Reset particles that go too far
        if (positions[i + 1] > 5) {
          positions[i + 1] = -5;
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position"
          count={100}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.02} 
        color="#8b5cf6" 
        transparent 
        opacity={0.6}
        sizeAttenuation 
      />
    </points>
  );
}

interface FloatingElementsProps {
  density?: 'low' | 'medium' | 'high';
  colors?: string[];
  className?: string;
}

export default function FloatingElements({ 
  density = 'medium', 
  colors = ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4'],
  className = ''
}: FloatingElementsProps) {
  const orbCount = density === 'low' ? 5 : density === 'medium' ? 10 : 15;
  const ringCount = density === 'low' ? 2 : density === 'medium' ? 4 : 6;
  const crystalCount = density === 'low' ? 1 : density === 'medium' ? 3 : 5;
  
  const orbs = useMemo(() => 
    Array.from({ length: orbCount }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4
      ] as [number, number, number],
      color: colors[i % colors.length],
      size: 0.05 + Math.random() * 0.1,
      speed: 0.5 + Math.random() * 1
    })), [orbCount, colors]
  );

  const rings = useMemo(() => 
    Array.from({ length: ringCount }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3
      ] as [number, number, number],
      color: colors[(i + 1) % colors.length]
    })), [ringCount, colors]
  );

  const crystals = useMemo(() => 
    Array.from({ length: crystalCount }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 2
      ] as [number, number, number]
    })), [crystalCount]
  );

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.5} />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#8b5cf6" />
        
        {orbs.map((orb, i) => (
          <FloatingOrb 
            key={`orb-${i}`}
            position={orb.position}
            color={orb.color}
            size={orb.size}
            speed={orb.speed}
          />
        ))}
        
        {rings.map((ring, i) => (
          <GlowingRing 
            key={`ring-${i}`}
            position={ring.position}
            color={ring.color}
          />
        ))}
        
        {crystals.map((crystal, i) => (
          <FloatingCrystal 
            key={`crystal-${i}`}
            position={crystal.position}
          />
        ))}
        
        <TrailingParticles />
      </Canvas>
    </div>
  );
}