"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type LogoVariant = 'full' | 'compact' | 'icon-only' | 'text-only';

interface FlexibleLogoProps {
  variant?: LogoVariant;
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
}

export function FlexibleLogo({ 
  variant = 'full', 
  className, 
  width, 
  height, 
  alt = "Shubz Entertainment Logo" 
}: FlexibleLogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getLogoSrc = (variant: LogoVariant) => {
    switch (variant) {
      case 'full':
        return '/shubz-logo-with-icon.png';
      case 'compact':
        return '/shubz-logo-compact.png';
      case 'icon-only':
        return '/logo-ic.png';
      case 'text-only':
        return '/shubz-logo-text-only.png';
      default:
        return '/shubz-logo-with-icon.png';
    }
  };

  const getDefaultDimensions = (variant: LogoVariant) => {
    switch (variant) {
      case 'full':
        return { width: 180, height: 180 };
      case 'compact':
        return { width: 180, height: 180 };
      case 'icon-only':
        return { width: 50, height: 50 };
      case 'text-only':
        return { width: 180, height: 50 };
      default:
        return { width: 200, height: 60 };
    }
  };

  if (!mounted) {
    const defaultDimensions = getDefaultDimensions(variant);
    return (
      <div 
        style={{ 
          width: width || defaultDimensions.width, 
          height: height || defaultDimensions.height 
        }} 
        className={className} 
      />
    );
  }

  const src = getLogoSrc(variant);
  const defaultDimensions = getDefaultDimensions(variant);

  return (
    <Image
      src={src}
      alt={alt}
      width={width || defaultDimensions.width}
      height={height || defaultDimensions.height}
      className={className}
      priority
    />
  );
}