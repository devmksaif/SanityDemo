"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Instagram, Youtube, Mail, ArrowRight, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export function EnterpriseFooter() {
  return (
    <footer className="w-full border-t bg-muted">
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/">
              <div className="relative w-48 h-16">
                <Image
                  src="/logo.png"
                  alt="Shubz Entertainment Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            <p className="font-serif text-sm text-muted-foreground">
              Integrating media, music, and talent platforms to tell unforgettable global stories.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="font-serif">Netherlands</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="font-serif">hello@shubz.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span className="font-serif">+234 XXX XXX XXXX</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="font-serif text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/divisions" className="font-serif text-sm text-muted-foreground hover:text-primary transition-colors">Our Divisions</Link></li>
              <li><Link href="/portfolio" className="font-serif text-sm text-muted-foreground hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link href="/newsroom" className="font-serif text-sm text-muted-foreground hover:text-primary transition-colors">Newsroom</Link></li>
              <li><Link href="/careers" className="font-serif text-sm text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider">Services</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="font-serif text-sm text-muted-foreground hover:text-primary transition-colors">Media Production</Link></li>
              <li><Link href="#" className="font-serif text-sm text-muted-foreground hover:text-primary transition-colors">Music Management</Link></li>
              <li><Link href="#" className="font-serif text-sm text-muted-foreground hover:text-primary transition-colors">Talent Development</Link></li>
              <li><Link href="#" className="font-serif text-sm text-muted-foreground hover:text-primary transition-colors">Creative Consulting</Link></li>
              <li><Link href="#" className="font-serif text-sm text-muted-foreground hover:text-primary transition-colors">Event Management</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">
              Get the latest news and updates from Shubz Entertainment.
            </p>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                />
                <Button size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Shubz Entertainment. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </Link>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms</Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}