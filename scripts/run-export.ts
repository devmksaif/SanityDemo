import { execSync } from 'child_process';
import path from 'path';

// Run the script and install dependencies if needed
try {
  // Check if required dependencies are installed
  try {
    require('tailwindcss/resolveConfig');
  } catch (error) {
    console.log('Installing required dependencies...');
    execSync('pnpm install --save-dev @figma/plugin-typings tailwindcss', { stdio: 'inherit' });
  }

  // Execute the export script
  require('./export-to-figma');
} catch (error) {
  console.error('Error running the export script:', error);
  process.exit(1);
}