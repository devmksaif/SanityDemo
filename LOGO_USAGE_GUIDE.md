# Shubz Entertainment Logo Usage Guide

## Available Logo Variations

### 1. Full Logo with Icon (`shubz-logo-with-icon.png`)
**Usage**: Main branding, headers, official documents
- Contains the geometric cube icon + "SHUBZ ENTERTAINMENT" text
- Best for: Website headers, business cards, letterheads
- Dimensions: 200px × 60px (recommended)

### 2. Text-Only Logo (`shubz-logo-text-only.png`)
**Usage**: Clean, minimal presentations
- "Shubz Entertainment Group Ltd" with tagline "From Spark to Spotlight"
- Best for: Formal documents, email signatures, minimal layouts
- Dimensions: 180px × 50px (recommended)

### 3. Compact Logo (`shubz-logo-compact.png`)
**Usage**: Mobile interfaces, small spaces
- Condensed version with icon and reduced text
- Best for: Mobile navigation, app icons, social media
- Dimensions: 150px × 50px (recommended)

### 4. Icon-Only Logo (`shubz-logo-icon-only.png`)
**Usage**: Favicons, social media profiles, minimal branding
- Just the geometric cube icon
- Best for: Favicons, app icons, profile pictures
- Dimensions: 50px × 50px (recommended)

## Current Implementation

### FlexibleLogo Component
```tsx
<FlexibleLogo 
  variant="full"        // 'full' | 'compact' | 'icon-only' | 'text-only'
  width={200} 
  height={60} 
  alt="Shubz Entertainment Logo" 
/>
```

### Usage by Context

#### Website Header (Desktop)
- **Component**: `FlexibleLogo`
- **Variant**: `full`
- **File**: `shubz-logo-with-icon.png`
- **Size**: 180px × 60px

#### Mobile Navigation
- **Component**: `FlexibleLogo`
- **Variant**: `compact`
- **File**: `shubz-logo-compact.png`
- **Size**: 150px × 50px

#### Footer
- **Component**: `FlexibleLogo`
- **Variant**: `full`
- **File**: `shubz-logo-with-icon.png`
- **Size**: 200px × 60px

#### Favicon (recommended)
- **File**: `shubz-logo-icon-only.png`
- **Sizes**: 16×16, 32×32, 48×48

## Brand Guidelines

### Color Scheme
- **Primary Purple**: #8B5A9F (cube gradient start)
- **Secondary Pink**: #D946EF (cube gradient middle)
- **Accent Yellow**: #FBBF24 (cube gradient end)
- **Text**: #1F2937 (dark slate)

### Typography
- **Main Logo Text**: Custom serif font (elegant, professional)
- **Tagline**: Lighter weight, golden color accent

### Usage Rules
1. **Maintain Clear Space**: Always provide adequate whitespace around logos
2. **Minimum Sizes**: Never scale below 100px width for readability
3. **Contrast**: Ensure sufficient contrast against backgrounds
4. **Consistency**: Use the same variant across similar contexts
5. **Quality**: Always use vector or high-resolution versions

## File Structure
```
public/
├── logo.png                    # Main fallback logo
├── logo-dark.png              # Dark theme variant
├── logo-light.png             # Light theme variant
├── shubz-logo-with-icon.png   # Full logo with icon
├── shubz-logo-text-only.png   # Text-only version
├── shubz-logo-compact.png     # Compact version
└── shubz-logo-icon-only.png   # Icon only
```

## Components
- `FlexibleLogo`: Smart logo component with variant support
- `ThemedLogo`: Theme-aware logo (dark/light mode)
- `ThemedLogoSpecial`: Enhanced themed logo with effects

## Best Practices
1. Use `FlexibleLogo` for new implementations
2. Choose appropriate variants based on space and context
3. Maintain aspect ratios when scaling
4. Test visibility across different backgrounds
5. Optimize for web performance (use appropriate file sizes)