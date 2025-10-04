# Converting Next.js to Figma Design System

This guide explains how to convert your Next.js website components into a Figma design system.

## Prerequisites

1. Install the required dependencies:
```bash
pnpm install --save-dev @figma/plugin-typings tailwindcss
```

2. Install the "Design System Importer" plugin in Figma.

## Steps to Export

1. Run the export script:
```bash
npx tsx scripts/export-to-figma.ts
```

2. The script will create a `design-system` folder containing:
   - `figma-import.json`: The design system data
   - `README.md`: Documentation about the exported design system

## What Gets Exported

The script exports:

1. **Design Tokens**
   - Colors from Tailwind config
   - Typography styles
   - Spacing values
   - Shadows and effects

2. **Components**
   - UI components from `/src/components`
   - Layout patterns
   - Common patterns and variations

3. **Layout Templates**
   - Page layouts
   - Section structures
   - Grid systems

## Importing to Figma

1. Open Figma
2. Install the "Design System Importer" plugin
3. Run the plugin
4. Select the `figma-import.json` file
5. Review and organize the imported components

## Manual Adjustments

After importing, you may need to:

1. Adjust component spacing
2. Fine-tune typography
3. Add component variants
4. Create component documentation
5. Set up auto-layout properties

## Tips

- Review the generated `README.md` for details about exported components
- Use Figma's auto-layout to maintain responsive behavior
- Create component variants to match your React components
- Document component props as variant properties in Figma

## Limitations

- Complex interactions need to be recreated manually
- Some dynamic content may need placeholder values
- Custom animations need to be recreated in Figma
- Component states (hover, focus, etc.) need manual setup

## Support

If you encounter any issues:
1. Check the console output for errors
2. Verify your component structure
3. Ensure all design tokens are properly defined in your Tailwind config