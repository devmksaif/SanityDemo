"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Type, Palette, Sparkles } from "lucide-react";
import { fontCombinations, type FontStyle } from "@/lib/fonts";

export default function FontsDemoPage() {
  const [selectedFont, setSelectedFont] = useState<FontStyle>('modern');

  const sampleText = {
    heading: "Creative Excellence",
    subheading: "Integrating Media, Music, and Talent Platforms",
    body: "We are Shubz Entertainment, a creative enterprise building bridges between industries to tell unforgettable global stories. Our mission is to push creative boundaries and deliver exceptional experiences that resonate with audiences worldwide.",
    small: "Established in 2024 • Lagos, Nigeria"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-8">
      <Container>
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
            <Type className="h-4 w-4" />
            Font Combinations
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Typography Showcase
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore different font combinations to find the perfect style for your brand
          </p>
        </div>

        {/* Font Selector */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Choose Your Style</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(fontCombinations).map(([key, combo]) => (
              <Card
                key={key}
                className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                  selectedFont === key ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedFont(key as FontStyle)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-4 h-4 rounded-full mt-1 ${
                    selectedFont === key ? 'bg-primary' : 'border-2 border-muted-foreground'
                  }`} />
                  <div className="flex-1">
                    <h3 className="font-semibold">{combo.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {combo.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Live Preview */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Live Preview</h2>
          <Card className="p-8">
            <div style={{ 
              fontFamily: `var(--font-${selectedFont}-body), sans-serif` 
            }}>
              <h1 style={{ 
                fontFamily: `var(--font-${selectedFont}-heading), sans-serif` 
              }} className="text-5xl md:text-6xl font-bold mb-4">
                {sampleText.heading}
              </h1>
              
              <h2 style={{ 
                fontFamily: `var(--font-${selectedFont}-heading), sans-serif` 
              }} className="text-2xl md:text-3xl font-semibold mb-6 text-muted-foreground">
                {sampleText.subheading}
              </h2>
              
              <p style={{ 
                fontFamily: `var(--font-${selectedFont}-body), sans-serif` 
              }} className="text-lg leading-relaxed mb-6">
                {sampleText.body}
              </p>
              
              <p style={{ 
                fontFamily: `var(--font-${selectedFont}-body), sans-serif` 
              }} className="text-sm text-muted-foreground">
                {sampleText.small}
              </p>
            </div>
          </Card>
        </div>

        {/* Component Examples */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold">Component Examples</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Hero Section Example */}
            <Card className="p-6">
              <div className="mb-4">
                <Badge variant="outline" className="mb-2">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Hero Section
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-2">Creative Excellence</h3>
              <p className="text-muted-foreground mb-4">
                Integrating media, music, and talent platforms
              </p>
              <Button size="sm">
                Explore More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>

            {/* Card Example */}
            <Card className="p-6">
              <div className="mb-4">
                <Badge variant="secondary" className="mb-2">
                  <Palette className="h-3 w-3 mr-1" />
                  Card Component
                </Badge>
              </div>
              <h3 className="text-xl font-semibold mb-2">Modern Design</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Clean and professional card design with perfect typography
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">View</Button>
                <Button size="sm">Action</Button>
              </div>
            </Card>

            {/* Typography Example */}
            <Card className="p-6">
              <div className="mb-4">
                <Badge variant="default" className="mb-2">
                  <Type className="h-3 w-3 mr-1" />
                  Typography
                </Badge>
              </div>
              <div className="space-y-3">
                <h1 className="text-3xl font-bold">H1 Heading</h1>
                <h2 className="text-2xl font-semibold">H2 Subheading</h2>
                <h3 className="text-xl font-medium">H3 Title</h3>
                <p className="text-sm text-muted-foreground">Body text example</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Current Selection Info */}
        <div className="mt-12 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl">
          <h3 className="text-lg font-semibold mb-2">Currently Selected</h3>
          <p className="text-muted-foreground">
            <span className="font-medium">{fontCombinations[selectedFont].name}</span> - {fontCombinations[selectedFont].description}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            This font combination is now applied across the entire site. Refresh the page to see it in action!
          </p>
        </div>
      </Container>
    </div>
  );
}