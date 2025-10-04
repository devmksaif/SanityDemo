# 3D Animation Components Guide

## Overview

This collection of 3D animation components brings stunning visual effects to your website using Three.js and React Three Fiber. The components are optimized for performance and include fallbacks for accessibility.

## Installation

First, install the required dependencies:

```bash
npm install three @react-three/fiber @react-three/drei framer-motion
```

## Components

### 1. ParticleField
Creates animated floating particles and geometric shapes for backgrounds.

```tsx
import ParticleField from '@/components/3d/ParticleField';

<div className="relative h-screen">
  <ParticleField />
  {/* Your content */}
</div>
```

### 2. Card3D
Adds 3D hover effects, mouse tracking, and particle animations to cards.

```tsx
import Card3D from '@/components/3d/Card3D';

<Card3D className="p-6 rounded-lg" intensity={1.2}>
  <h3>Card Title</h3>
  <p>Card content with 3D effects</p>
</Card3D>
```

**Props:**
- `intensity`: Controls animation strength (0.5 - 2.0)
- `className`: Additional CSS classes

### 3. ScrollTriggered3D
Creates morphing 3D shapes that respond to scroll position.

```tsx
import ScrollTriggered3D from '@/components/3d/ScrollTriggered3D';

<ScrollTriggered3D />
```

### 4. FloatingElements
Adds ambient floating orbs, rings, and crystals to any section.

```tsx
import FloatingElements from '@/components/3d/FloatingElements';

<div className="relative">
  <FloatingElements 
    density="medium" 
    colors={['#6366f1', '#8b5cf6', '#ec4899']}
  />
  {/* Your content */}
</div>
```

**Props:**
- `density`: 'low' | 'medium' | 'high'
- `colors`: Array of hex colors for elements

### 5. PageTransition3D
Smooth 3D page transitions with morphing effects.

```tsx
import PageTransition3D from '@/components/3d/PageTransition3D';

// Wrap your app content
<PageTransition3D duration={1200}>
  {children}
</PageTransition3D>
```

### 6. Performance3D
Performance wrapper that optimizes 3D content based on device capabilities.

```tsx
import Performance3D from '@/components/3d/Performance3D';

<Performance3D enableReducedMotion={true}>
  {/* Your 3D content */}
</Performance3D>
```

## Performance Features

- **Automatic device detection**: Adjusts quality based on device capabilities
- **Reduced motion support**: Respects user accessibility preferences
- **Memory management**: Automatic cleanup of Three.js resources
- **Lazy loading**: Components load only when needed
- **FPS monitoring**: Built-in performance monitoring

## Usage Examples

### Enhanced Hero Section
```tsx
import ParticleField from '@/components/3d/ParticleField';
import FloatingElements from '@/components/3d/FloatingElements';
import Performance3D from '@/components/3d/Performance3D';

export function Hero() {
  return (
    <section className="relative h-screen">
      {/* 3D Background */}
      <Performance3D>
        <ParticleField />
      </Performance3D>
      
      {/* Floating Elements */}
      <FloatingElements density="medium" />
      
      {/* Content */}
      <div className="relative z-10">
        <h1>Your Hero Title</h1>
      </div>
    </section>
  );
}
```

### 3D Card Grid
```tsx
import Card3D from '@/components/3d/Card3D';

export function CardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <Card3D key={index} intensity={1.0}>
          <div className="p-6 bg-white rounded-lg">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </Card3D>
      ))}
    </div>
  );
}
```

### Full Page Experience
```tsx
import PageTransition3D from '@/components/3d/PageTransition3D';
import ScrollTriggered3D from '@/components/3d/ScrollTriggered3D';

export default function Layout({ children }) {
  return (
    <PageTransition3D>
      <main>
        {children}
        <ScrollTriggered3D />
      </main>
    </PageTransition3D>
  );
}
```

## Customization

### Colors and Themes
Most components accept color arrays:
```tsx
const colors = [
  '#6366f1', // Blue
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#06b6d4'  // Cyan
];

<FloatingElements colors={colors} />
```

### Animation Intensity
Control animation strength for different sections:
```tsx
// Subtle for text areas
<Card3D intensity={0.5}>Content</Card3D>

// Bold for hero sections
<Card3D intensity={2.0}>Hero Content</Card3D>
```

## Performance Tips

1. **Use Performance3D wrapper** for all 3D content
2. **Limit concurrent 3D sections** to 2-3 per page
3. **Enable reduced motion** for accessibility
4. **Test on mobile devices** for optimal experience
5. **Monitor performance** using built-in hooks

## Browser Support

- **Modern browsers**: Full 3D experience
- **Older browsers**: Graceful fallbacks
- **Mobile devices**: Optimized performance
- **Low-end devices**: Automatic quality reduction

## Accessibility

- Respects `prefers-reduced-motion`
- Provides static fallbacks
- Keyboard navigation friendly
- Screen reader compatible

## Troubleshooting

### Performance Issues
- Reduce `density` on FloatingElements
- Lower `intensity` on Card3D
- Enable performance optimizations

### Mobile Issues
- Components automatically adapt to mobile
- Reduced particle counts on low-end devices
- Optimized memory usage

### TypeScript Errors
Make sure to install type definitions:
```bash
npm install --save-dev @types/three
```

## Next Steps

1. Install dependencies
2. Add components to your pages
3. Customize colors and animations
4. Test performance across devices
5. Monitor and optimize as needed

The 3D components will transform your website into a modern, interactive experience that captivates users while maintaining excellent performance and accessibility.