"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemedLogoProps {
  className?: string;
  width: number;
  height: number;
}

export function ThemedLogo({ className, width, height }: ThemedLogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder on the server to prevent layout shift
    return <div style={{ width, height }} className={className} />;
  }

  const isDark = resolvedTheme === 'dark';
  // We'll use two versions of your logo for best results.
  const src = isDark ?  "/shubz-logo-compact.png" : "/shubz-logo-icon-only.png";

  return (
    <Image
      src={src}
      alt="Shubz Entertainment Logo"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}