"use client";

import { useEffect } from "react";

export function DebugClickTracker() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="/divisions/"], a[href^="/portfolio/"], a[href^="/newsroom/"]');
      
      if (link) {
        const href = link.getAttribute('href');
        console.log('🖱️ Click detected on:', href);
        
        // Check if the link is valid
        if (href?.includes('undefined') || href?.includes('null')) {
          console.error('❌ Invalid href detected:', href);
          e.preventDefault();
          alert('Invalid link detected! Please check that slugs are generated in Sanity Studio.');
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}