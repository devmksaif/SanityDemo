'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Environment, PerspectiveCamera, useTexture } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { easing } from 'maath';
import { NewsArticleData } from '@/types/sanity';

function NewsCard({ position, rotation, title, scale = 1 }: { 
  position: [number, number, number];
  rotation?: [number, number, number];
  title: string;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.002;
      
      // Smooth scale animation on hover
      const targetScale = hovered ? scale * 1.1 : scale;
      easing.damp3(meshRef.current.scale, [targetScale, targetScale, targetScale], 0.3, delta);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation || [0, 0, 0]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <boxGeometry args={[4, 2, 0.1]} />
        <meshStandardMaterial 
          color={hovered ? '#2563eb' : '#1e40af'}
          roughness={0.2}
          metalness={0.8}
        />
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.2}
          maxWidth={3.5}
          lineHeight={1.2}
          textAlign="center"
          color="white"
        >
          {title}
        </Text>
      </mesh>
    </Float>
  );
}

function Scene({ articles }: { articles: NewsArticleData[] }) {
  // Use static positions to prevent hydration mismatches
  const cards = useMemo(() => {
    const positions = [
      { x: 4, y: 0, z: 0, rotation: 0 },
      { x: 1.236, y: 0.618, z: 3.804, rotation: -1.257 },
      { x: -3.236, y: -0.618, z: 2.351, rotation: -2.513 },
      { x: -3.236, y: 0.618, z: -2.351, rotation: -3.770 },
      { x: 1.236, y: -0.618, z: -3.804, rotation: -5.027 }
    ];

    return articles.slice(0, 5).map((article, i) => {
      const pos = positions[i] || positions[0];
      return {
        id: article._id,
        title: article.title,
        position: [pos.x, pos.y, pos.z] as [number, number, number],
        rotation: [0, pos.rotation, 0] as [number, number, number],
      };
    });
  }, [articles]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Environment preset="city" />
      
      {cards.map((card) => (
        <NewsCard
          key={card.id}
          position={card.position}
          rotation={card.rotation}
          title={card.title}
        />
      ))}
    </>
  );
}

export function NewsAnimation({ articles }: { articles: NewsArticleData[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const element = containerRef.current;
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate progress from 0 (element at bottom of viewport) to 1 (element at top)
        const progress = 1 - (rect.top + rect.height / 2) / (windowHeight + rect.height);
        setScrollProgress(Math.max(0, Math.min(1, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="h-[60vh] w-full">
      <Canvas
        camera={{
          position: [0, 0, 10 - scrollProgress * 3], // Camera zooms in as you scroll
          fov: 50 + scrollProgress * 10, // FOV increases as you scroll
        }}
      >
        <Scene articles={articles} />
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}