"use client";

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface FloatingGeometryProps {
  className?: string;
}

export default function FloatingGeometry({ 
  className = "absolute inset-0 w-full h-full" 
}: FloatingGeometryProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameId = useRef<number>(0);
  const scene = useRef<THREE.Scene | null>(null);
  const camera = useRef<THREE.PerspectiveCamera | null>(null);
  const renderer = useRef<THREE.WebGLRenderer | null>(null);
  const geometries = useRef<THREE.Mesh[]>([]);
  const scrollY = useRef(0);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    scene.current = new THREE.Scene();
    
    // Camera setup
    camera.current = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.current.position.z = 12;

    // Renderer setup
    renderer.current = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.current.setSize(window.innerWidth, window.innerHeight);
    renderer.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.current.setClearColor(0x000000, 0);
    
    mountRef.current.appendChild(renderer.current.domElement);

    // Create floating geometries - more professional, magazine-like shapes
    const shapes = [
      new THREE.BoxGeometry(0.3, 0.3, 0.3),
      new THREE.SphereGeometry(0.2, 12, 12),
      new THREE.CylinderGeometry(0.15, 0.15, 0.4, 8),
      new THREE.OctahedronGeometry(0.25),
      new THREE.RingGeometry(0.2, 0.35, 8),
      new THREE.TorusGeometry(0.2, 0.08, 8, 16),
    ];

    const materials = [
      // Sophisticated grays and muted colors for professional look
      new THREE.MeshBasicMaterial({ 
        color: 0x6b7280, 
        transparent: true, 
        opacity: 0.12,
        wireframe: false 
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0x9ca3af, 
        transparent: true, 
        opacity: 0.08,
        wireframe: true 
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0x374151, 
        transparent: true, 
        opacity: 0.15,
        wireframe: false 
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0x4f46e5, 
        transparent: true, 
        opacity: 0.06,
        wireframe: true 
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0x8b5cf6, 
        transparent: true, 
        opacity: 0.05,
        wireframe: false 
      }),
    ];

    // Create multiple geometric objects - fewer, more elegant
    for (let i = 0; i < 8; i++) {
      const geometry = shapes[Math.floor(Math.random() * shapes.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const mesh = new THREE.Mesh(geometry, material);

      // More spread out, professional positioning
      mesh.position.x = (Math.random() - 0.5) * 20;
      mesh.position.y = (Math.random() - 0.5) * 12 + Math.random() * 8;
      mesh.position.z = (Math.random() - 0.5) * 15 - 5;

      // Subtle random rotation
      mesh.rotation.x = Math.random() * Math.PI * 0.5;
      mesh.rotation.y = Math.random() * Math.PI * 0.5;
      mesh.rotation.z = Math.random() * Math.PI * 0.5;

      // Store initial position for animation
      (mesh as any).initialPosition = mesh.position.clone();
      (mesh as any).rotationSpeed = {
        x: (Math.random() - 0.5) * 0.005, // Much slower rotation
        y: (Math.random() - 0.5) * 0.008,
        z: (Math.random() - 0.5) * 0.003,
      };

      scene.current!.add(mesh);
      geometries.current.push(mesh);
    }

    // Handle scroll events
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle resize
    const handleResize = () => {
      if (camera.current && renderer.current) {
        camera.current.aspect = window.innerWidth / window.innerHeight;
        camera.current.updateProjectionMatrix();
        renderer.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Animation loop - more subtle, professional movement
    const animate = (time: number) => {
      frameId.current = requestAnimationFrame(animate);

      if (scene.current && camera.current && renderer.current) {
        // Animate each geometry with subtle movements
        geometries.current.forEach((mesh, index) => {
          const speed = (mesh as any).rotationSpeed;
          const initialPos = (mesh as any).initialPosition;

          // Very subtle rotation animation
          mesh.rotation.x += speed.x;
          mesh.rotation.y += speed.y;
          mesh.rotation.z += speed.z;

          // Gentle floating movement - much more subtle
          mesh.position.y = initialPos.y + Math.sin(time * 0.0003 + index * 0.5) * 0.8;
          mesh.position.x = initialPos.x + Math.cos(time * 0.0002 + index * 0.3) * 0.5;

          // Very gentle scroll-based movement
          mesh.position.y -= scrollY.current * 0.0008;
          mesh.position.z = initialPos.z + scrollY.current * 0.0003;

          // Smooth fade based on distance - more gradual
          const distance = mesh.position.distanceTo(camera.current!.position);
          const material = mesh.material as THREE.MeshBasicMaterial;
          const baseOpacity = material.opacity > 0.1 ? 0.12 : 0.08;
          material.opacity = Math.max(0.02, baseOpacity - distance * 0.008);
        });

        // Very subtle camera movement based on scroll
        camera.current.position.y = -scrollY.current * 0.0005;
        camera.current.position.x = Math.sin(scrollY.current * 0.0001) * 0.5;
        camera.current.lookAt(0, -scrollY.current * 0.0005, 0);

        renderer.current.render(scene.current, camera.current);
      }
    };

    animate(0);

    // Cleanup
    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && renderer.current?.domElement) {
        mountRef.current.removeChild(renderer.current.domElement);
      }
      
      // Dispose of Three.js resources
      geometries.current.forEach(mesh => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
      
      if (renderer.current) {
        renderer.current.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={className}
      style={{ 
        pointerEvents: 'none', 
        zIndex: 1,
        position: 'fixed',
        top: 0,
        left: 0,
      }} 
    />
  );
}