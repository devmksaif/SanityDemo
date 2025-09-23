"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t">
      <div className="container max-w-screen-2xl py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="md:col-span-3 lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">Shubz Entertainment</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              A creative enterprise integrating media, music, and talent platforms to tell global stories.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Navigate</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/divisions" className="text-muted-foreground hover:text-primary">Divisions</Link></li>
              <li><Link href="/portfolio" className="text-muted-foreground hover:text-primary">Portfolio</Link></li>
              <li><Link href="/newsroom" className="text-muted-foreground hover:text-primary">Newsroom</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Careers</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Connect</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Youtube className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Github className="h-5 w-5" /></Link>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Shubz Entertainment. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}