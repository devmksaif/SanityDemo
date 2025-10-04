"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import the 3D component to avoid SSR issues
const FloatingGeometry = dynamic(
  () => import("@/components/3d/floating-geometry").catch(() => {
    // Fallback if the component fails to load
    return { default: () => null };
  }),
  { 
    ssr: false,
    loading: () => null // Return null during loading to prevent hydration issues
  }
);

export default function ThreeBackground() {
  return (
    <Suspense fallback={null}>
      <FloatingGeometry />
    </Suspense>
  );
}