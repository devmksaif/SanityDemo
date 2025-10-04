import fs from 'fs';
import path from 'path';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../tailwind.config';

// Get the full Tailwind config
const fullConfig = resolveConfig(tailwindConfig);

interface FigmaComponent {
  name: string;
  type: string;
  props?: Record<string, any>;
  styles?: Record<string, string[]>;
  children?: FigmaComponent[];
}

interface DesignSystem {
  colors: Record<string, any>;
  typography: Record<string, any>;
  spacing: Record<string, any>;
  components: FigmaComponent[];
  layouts: FigmaComponent[];
}

/** Recursively read files in a directory */
function getAllFiles(dir: string, ext: string, files: string[] = []): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(fullPath, ext, files);
    } else if (entry.isFile() && entry.name.endsWith(ext)) {
      files.push(fullPath);
    }
  }
  return files;
}

function extractDesignSystem(): DesignSystem {
  const designSystem: DesignSystem = {
    colors: fullConfig.theme?.colors || {},
    typography: {
      fonts: fullConfig.theme?.fontFamily || {},
      sizes: fullConfig.theme?.fontSize || {},
      weights: fullConfig.theme?.fontWeight || {},
      lineHeights: fullConfig.theme?.lineHeight || {},
    },
    spacing: fullConfig.theme?.spacing || {},
    components: [],
    layouts: [],
  };

  const componentsDir = path.join(process.cwd(), 'src/components');
  if (!fs.existsSync(componentsDir)) {
    throw new Error(`Components directory not found: ${componentsDir}`);
  }

  const files = getAllFiles(componentsDir, '.tsx');

  files.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const componentName = path.basename(filePath, '.tsx');

    // Extract className patterns (supports single/double quotes)
    const classNameMatches = Array.from(content.matchAll(/className\s*=\s*["'`]([^"'`]+)["'`]/g));
    const styles: Record<string, string[]> = {};

    const categories = {
      layout: ['flex', 'grid', 'container', 'relative', 'absolute'],
      spacing: ['p-', 'm-', 'gap-', 'space-'],
      typography: ['text-', 'font-', 'tracking-', 'leading-'],
      colors: ['bg-', 'text-', 'border-'],
      effects: ['shadow-', 'opacity-', 'blur-', 'backdrop-'],
    };

    classNameMatches.forEach(match => {
      const classNames = match[1].split(/\s+/);
      Object.entries(categories).forEach(([category, patterns]) => {
        if (!styles[category]) styles[category] = [];
        const matchedClasses = classNames.filter(cls => patterns.some(pattern => cls.startsWith(pattern)));
        styles[category].push(...matchedClasses);
      });
    });

    const component: FigmaComponent = {
      name: componentName,
      type: 'component',
      styles,
    };

    const isLayout =
      /container|layout|grid/.test(content) || /layout/.test(filePath.toLowerCase());

    if (isLayout) designSystem.layouts.push(component);
    else designSystem.components.push(component);
  });

  return designSystem;
}

function generateFigmaImportFile(designSystem: DesignSystem) {
  const output = {
    name: "Shubz Entertainment Design System",
    version: "1.0.0",
    lastModified: new Date().toISOString(),
    ...designSystem,
  };

  const outputDir = path.join(process.cwd(), 'design-system');
  fs.mkdirSync(outputDir, { recursive: true });

  fs.writeFileSync(path.join(outputDir, 'figma-import.json'), JSON.stringify(output, null, 2));

  const docs = `# Shubz Entertainment Design System

## Overview
Automatically generated from the Next.js codebase.

## Colors
${Object.keys(designSystem.colors).length} color tokens defined

## Typography
- Font Families: ${Object.keys(designSystem.typography.fonts).join(', ')}
- Font Sizes: ${Object.keys(designSystem.typography.sizes).length} sizes
- Font Weights: ${Object.keys(designSystem.typography.weights).length} weights

## Components
${designSystem.components.map(c => `- ${c.name}`).join('\n') || 'None'}

## Layouts
${designSystem.layouts.map(l => `- ${l.name}`).join('\n') || 'None'}

## Usage
1. Import \`figma-import.json\` into Figma using the Design System Importer plugin
2. Review and adjust components
3. Use design tokens & components as building blocks
`;

  fs.writeFileSync(path.join(outputDir, 'README.md'), docs);

  console.log('✅ Design system exported successfully!');
  console.log('📁 Output directory:', outputDir);
}

// Run the export
try {
  const designSystem = extractDesignSystem();
  generateFigmaImportFile(designSystem);
} catch (error) {
  console.error('❌ Error generating design system:', error);
}
