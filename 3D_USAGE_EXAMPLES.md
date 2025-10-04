# 3D Component Usage Examples

## 🏠 Homepage Integration

### Hero Section
```tsx
// src/components/enterprise-hero.tsx
export function EnterpriseHero() {
  return (
    <section className="relative h-screen">
      {/* 3D Background Layers */}
      <Performance3D>
        <ParticleField />
      </Performance3D>
      
      <FloatingElements 
        density="medium" 
        colors={['#6366f1', '#8b5cf6', '#ec4899']} 
        className="opacity-70"
      />
      
      {/* Your existing content */}
      <div className="relative z-10">
        <h1>From Spark to Spotlight</h1>
        {/* ... rest of hero content */}
      </div>
    </section>
  );
}
```

### Division Cards Grid
```tsx
// Enhanced division cards with 3D effects
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {divisions.map((division) => (
    <Card3D key={division.id} intensity={1.0}>
      <DivisionCard division={division} />
    </Card3D>
  ))}
</div>
```

## 📄 Individual Pages

### Portfolio Page
```tsx
// src/app/portfolio/page.tsx
export default function PortfolioPage() {
  return (
    <PageTransition3D>
      <main>
        {/* Hero with subtle 3D */}
        <section className="relative h-96">
          <FloatingElements density="low" className="opacity-40" />
          <h1>Our Portfolio</h1>
        </section>
        
        {/* Project Grid with 3D cards */}
        <section>
          {projects.map((project, index) => (
            <Card3D 
              key={project.id} 
              intensity={0.8}
              className="mb-8"
            >
              <ProjectCard project={project} />
            </Card3D>
          ))}
        </section>
        
        {/* Scroll-triggered section break */}
        <ScrollTriggered3D />
        
        {/* More content */}
      </main>
    </PageTransition3D>
  );
}
```

### About Page
```tsx
// src/app/about/page.tsx
export default function AboutPage() {
  return (
    <PageTransition3D>
      <main>
        {/* Team section with 3D cards */}
        <section className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card3D key={member.id} intensity={0.6}>
                <TeamMemberCard member={member} />
              </Card3D>
            ))}
          </div>
        </section>
        
        {/* 3D section divider */}
        <ScrollTriggered3D />
        
        {/* Company values with floating elements */}
        <section className="relative py-20">
          <FloatingElements 
            density="low" 
            colors={['#06b6d4', '#8b5cf6']}
            className="opacity-30"
          />
          <div className="relative z-10">
            <h2>Our Values</h2>
            {/* Content */}
          </div>
        </section>
      </main>
    </PageTransition3D>
  );
}
```

## 🎯 Strategic Placement Guide

### High Impact Areas (Use Full 3D)
- **Hero sections**: ParticleField + FloatingElements
- **Main CTAs**: Card3D with high intensity
- **Portfolio showcases**: Card3D + transitions

### Medium Impact Areas (Use Subtle 3D)
- **Navigation sections**: Light FloatingElements
- **Content cards**: Card3D with low intensity
- **Form sections**: Subtle particle backgrounds

### Low Impact Areas (Use Minimal 3D)
- **Text-heavy content**: Occasional FloatingElements
- **Footer areas**: Very subtle particle fields
- **Loading states**: Simple geometric animations

## 🎨 Brand Customization

### Color Schemes by Section
```tsx
// Hero: Bold brand colors
<FloatingElements colors={['#6366f1', '#8b5cf6', '#ec4899']} />

// Portfolio: Creative/artistic colors
<FloatingElements colors={['#06b6d4', '#10b981', '#f59e0b']} />

// About: Warm/personal colors
<FloatingElements colors={['#ef4444', '#f97316', '#eab308']} />

// Contact: Professional colors
<FloatingElements colors={['#3b82f6', '#6366f1', '#8b5cf6']} />
```

### Intensity Levels by Purpose
```tsx
// Attention-grabbing (Hero, CTAs)
<Card3D intensity={1.5}>

// Engaging but not distracting (Portfolio items)
<Card3D intensity={1.0}>

// Subtle enhancement (Text content)
<Card3D intensity={0.6}>

// Minimal effect (Secondary content)
<Card3D intensity={0.3}>
```

## 📱 Responsive Strategy

### Desktop (Full Experience)
- All 3D components enabled
- High particle counts
- Complex animations

### Tablet (Optimized Experience)
- Reduced particle counts
- Simplified animations
- Maintained interactivity

### Mobile (Performance-First)
- Automatic quality reduction
- Simplified effects only
- Respect battery/performance

## 🚀 Implementation Priority

### Phase 1: Foundation
1. Hero section with ParticleField
2. Main division cards with Card3D
3. Basic page transitions

### Phase 2: Enhancement
4. Portfolio projects with 3D effects
5. Scroll-triggered animations
6. Floating elements in key sections

### Phase 3: Polish
7. Advanced page transitions
8. Custom particle shapes
9. Interactive cursor effects

### Phase 4: Innovation
10. Sound-reactive animations
11. WebXR/AR integration
12. AI-driven 3D behaviors

This approach ensures a progressive enhancement that improves user experience while maintaining performance and accessibility!