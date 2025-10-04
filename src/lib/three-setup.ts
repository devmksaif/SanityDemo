'use client';

import { extend } from '@react-three/fiber';
import * as THREE from 'three';

// Extend R3F with all THREE.js objects globally
extend(THREE);

// Export the extended THREE for consistency
export { THREE };

// This ensures THREE namespace is properly extended before any Canvas components are used
export function initializeThreeJS() {
  // Additional THREE.js setup can go here if needed
  return true;
}