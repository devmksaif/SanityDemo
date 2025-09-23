import Link from "next/link";
import Image from "next/image";
import { type SanityDocument } from "next-sanity";
import { client, urlFor } from "@/lib/sanity";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, ArrowRight, BookOpen } from "lucide-react";
import { HeroSection } from "@/components/hero-section";

export default function IndexPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-3xl font-bold">More content coming soon...</h2>
      </div>
    </div>
  );
}