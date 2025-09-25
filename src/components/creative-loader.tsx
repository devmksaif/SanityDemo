"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function CreativeLoader() {
  const [logoIndex, setLogoIndex] = useState(0);
  const logos = [
    "/logo-3.png",
    "/logo-4.png", 
    "/logo-3-2.png",
    "/logo-4-2.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoIndex((prev) => (prev + 1) % logos.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative h-20 w-48 animate-pulse">
        <Image
          src={logos[logoIndex]}
          alt="Shubz Entertainment"
          fill
          className="object-contain transition-opacity duration-500"
        />
      </div>
      <div className="h-1 w-32 bg-primary rounded-full overflow-hidden">
        <div className="h-full bg-accent rounded-full animate-pulse" style={{ width: '60%' }} />
      </div>
      <p className="text-sm text-muted-foreground">Loading creative content...</p>
    </div>
  );
}
</dyad-edit>

### 6. Creative Logo in Error Pages
Let me show you how to use the logos in a custom error page:

<dyad-write path="src/app/not-found.tsx" description="Creating a creative 404 page with logo implementation">
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Sparkles } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-2xl">
        {/* Creative Logo Display */}
        <div className="relative h-24 w-64 mx-auto">
          <Image
            src="/logo-4-2.png"
            alt="Shubz Entertainment"
            fill
            className="object-contain"
            priority
          />
        </div>
        
        {/* Error Content */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            <span>Page Not Found</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Lost in the Creative Space?
          </h1>
          
          <p className="text-lg text-muted-foreground">
            The page you're looking for seems to have wandered off into the creative ether. Let's get you back on track.
          </p>
        </div>

        {/* Action Button */}
        <Button asChild size="lg" className="group">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Return Home
            <Sparkles className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
</dyad-edit>

## Summary of Creative Logo Implementations:

I've created several creative ways to implement your new logos:

1. **Dynamic Header** - Uses logo-3.png with hover effects
2. **Creative Footer** - Uses the more detailed logo-4.png for maximum impact
3. **Hero Section Logo** - Uses logo-3-2.png in a beautiful circular display
4. **Division Cards** - Creative fallback to Shubz logo when division logo isn't available
5. **Loading Animation** - Rotates through all logo variations for an engaging loading experience
6. **Error Page** - Uses logo-4-2.png in a creative 404 page

Each implementation is thoughtfully designed to showcase your brand identity while maintaining the sophisticated, modern aesthetic of your site. The logos are strategically placed to create maximum visual impact without being overwhelming.

<dyad-chat-summary>Created multiple creative logo implementations across the site</dyad-chat-summary>

⏳ Waiting for turbo edits...

<dyad-write path="src/components/enterprise-header.tsx" description="Implementing dynamic logo with hover effects and multiple variations">
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";

const navLinks = [
  { href: "/divisions", label: "Divisions" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/newsroom", label: "Newsroom" },
  { href: "/about", label: "About" },
];

export function EnterpriseHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center group">
          <div className="relative h-12 w-48 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo-3.png"
              alt="Shubz Entertainment"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  href={link.href}
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                    pathname === link.href && "bg-accent text-accent-foreground"
                  )}
                >
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-3">
          <Button asChild size="sm" className="hidden lg:inline-flex">
            <Link href="/contact">Contact Us</Link>
          </Button>
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t lg:hidden">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === link.href && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild size="sm" className="mt-4">
                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}