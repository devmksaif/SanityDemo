"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemedLogo } from "@/components/themed-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { useScrolled } from "@/hooks/use-scrolled";
import { motion, Variants } from "framer-motion";

const navLinks = [
  { href: "/divisions", label: "Divisions" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/newsroom", label: "Newsroom" },
  { href: "/about", label: "About" },
];

const headerVariants: Variants = {
  initial: { y: -50, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const navItemVariants: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

const sheetItemVariants: Variants = {
  hidden: { x: 50, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: i * 0.08, duration: 0.3, ease: "easeOut" },
  }),
};

export function EnterpriseHeader() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();
  const scrolled = useScrolled(20);

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/95 backdrop-blur-lg shadow-sm"
          : "border-b border-transparent"
      )}
      initial="initial"
      animate="animate"
      variants={headerVariants}
    >
      <div className="container mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <motion.div
            initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <ThemedLogo width={180} height={180} className="w-auto" />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {navLinks.map((link, index) => (
              <NavigationMenuItem key={link.href}>
                <motion.div
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={navItemVariants}
                >
                  <NavigationMenuLink
                    href={link.href}
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium  font-serif transition-all duration-300 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                      pathname === link.href && "bg-accent text-accent-foreground"
                    )}
                  >
                    {link.label}
                  </NavigationMenuLink>
                </motion.div>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-1">
          <ThemeToggle />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="sm" className="hidden font-serif lg:inline-flex">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </motion.div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" onClick={() => setIsSheetOpen(false)}>
                      <ThemedLogo width={150} height={150} />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      custom={index}
                      initial="hidden"
                      animate={isSheetOpen ? "visible" : "hidden"}
                      variants={sheetItemVariants}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "rounded-lg px-3 py-2 text-lg font-medium font-serif hover:bg-accent hover:text-accent-foreground",
                          pathname === link.href && "bg-accent text-accent-foreground"
                        )}
                        onClick={() => setIsSheetOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                <div className="mt-6 flex flex-col gap-3 border-t pt-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isSheetOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button asChild>
                      <Link href="/contact" onClick={() => setIsSheetOpen(false)}>
                        Contact Us
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
