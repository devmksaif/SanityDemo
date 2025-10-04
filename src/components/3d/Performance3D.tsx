'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import '../../lib/three-setup' // Import to ensure THREE namespace is extended
import * as THREE from 'three';

interface Performance3DProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  enableReducedMotion?: boolean;
  enableGPUOptimization?: boolean;
  pixelRatio?: number;
}

// Hook to detect reduced motion preference
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

// Hook to detect device performance capabilities
export function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState({
    isLowEnd: false,
    supportsWebGL2: false,
    deviceMemory: 4, // Default fallback
    hardwareConcurrency: 4 // Default fallback
  });

  useEffect(() => {
    // Check WebGL2 support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    const supportsWebGL2 = !!gl;

    // Detect low-end devices
    const navigator = window.navigator as any;
    const deviceMemory = navigator.deviceMemory || 4;
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    const isLowEnd = deviceMemory <= 2 || hardwareConcurrency <= 2;

    setCapabilities({
      isLowEnd,
      supportsWebGL2,
      deviceMemory,
      hardwareConcurrency
    });

    // Cleanup
    if (gl) {
      const ext = gl.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
    }
  }, []);

  return capabilities;
}

// Loading fallback component
function Canvas3DFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}

// Performance-optimized 3D wrapper
export default function Performance3D({
  children,
  fallback = <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 animate-pulse" />,
  enableReducedMotion = true,
  enableGPUOptimization = true,
  pixelRatio
}: Performance3DProps) {
  const prefersReducedMotion = useReducedMotion();
  const capabilities = useDeviceCapabilities();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Return fallback during SSR
  if (!isClient) {
    return <>{fallback}</>;
  }

  // Early return if reduced motion is preferred and enabled
  if (enableReducedMotion && prefersReducedMotion) {
    return <>{fallback}</>;
  }

  const getOptimalSettings = () => {
    // Adjust pixel ratio based on device
    const devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
    const optimalPixelRatio = pixelRatio || (capabilities.isLowEnd ? 1 : Math.min(devicePixelRatio, 2));

    return {
      gl: {
        antialias: !capabilities.isLowEnd,
        powerPreference: capabilities.isLowEnd ? 'low-power' as const : 'high-performance' as const,
        alpha: true,
        depth: true,
        stencil: false,
        premultipliedAlpha: true
      },
      dpr: optimalPixelRatio
    };
  };

  return (
    <div className="absolute inset-0">
      <Suspense fallback={fallback}>
        <Canvas
          {...getOptimalSettings()}
          style={{ background: 'transparent' }}
          frameloop="demand" // Only render when needed
          performance={{
            current: capabilities.isLowEnd ? 0.5 : 1,
            min: 0.2,
            max: 1,
            debounce: 200
          }}
        >
          {enableGPUOptimization && <Preload all />}
          {children}
        </Canvas>
      </Suspense>
    </div>
  );
}

// Memory management utility
export class ThreeJSMemoryManager {
  private static instance: ThreeJSMemoryManager;
  private disposables: Set<any> = new Set();

  static getInstance(): ThreeJSMemoryManager {
    if (!ThreeJSMemoryManager.instance) {
      ThreeJSMemoryManager.instance = new ThreeJSMemoryManager();
    }
    return ThreeJSMemoryManager.instance;
  }

  track(object: any) {
    this.disposables.add(object);
  }

  dispose(object: any) {
    if (object.dispose) {
      object.dispose();
    }
    this.disposables.delete(object);
  }

  disposeAll() {
    this.disposables.forEach(object => {
      if (object.dispose) {
        object.dispose();
      }
    });
    this.disposables.clear();
  }
}

// Performance monitoring hook
export function usePerformanceMonitor() {
  const [fps, setFps] = useState(60);
  const [memoryUsage, setMemoryUsage] = useState(0);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const updateStats = () => {
      frameCount++;
      const currentTime = performance.now();
      
      // Calculate FPS every second
      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
        
        // Update memory usage if available
        const memory = (performance as any).memory;
        if (memory) {
          setMemoryUsage(memory.usedJSHeapSize / memory.jsHeapSizeLimit);
        }
      }
      
      animationId = requestAnimationFrame(updateStats);
    };

    animationId = requestAnimationFrame(updateStats);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return { fps, memoryUsage };
}