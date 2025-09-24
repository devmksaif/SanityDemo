"use client";

import type { Metadata } from "next";
import { useState, useEffect } from "react";
import { EnterpriseHeader } from "@/components/enterprise-header";
import { Footer } from "@/components/footer";
import { DebugClickTracker } from "@/components/debug-click-tracker";
import { FontSwitcher, FontStyle } from "@/components/font-switcher";
import { fontCombinations } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Shubz Entertainment",
  description: "Creative Entertainment Company",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentFont, setCurrentFont] = useState<FontStyle>('modern');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedFont = localStorage.getItem('preferred-font') as FontStyle;
    if (savedFont && fontCombinations[savedFont]) {
      setCurrentFont(savedFont);
    }
  }, []);

  const handleFontChange = (fontStyle: FontStyle) => {
    setCurrentFont(fontStyle);
    localStorage.setItem('preferred-font', fontStyle);
  };

  const currentCombination = fontCombinations[currentFont];
  const headingFont = currentCombination.heading;
  const bodyFont = currentCombination.body;

  const fontVariables = [
    headingFont.variable,
    bodyFont.variable,
    'font-sans'
  ].join(' ');

  return (
    <html lang="en" className={isMounted ? fontVariables : 'font-sans'}>
      <head>
        <style jsx global>{`
          :root {
            --font-heading: ${headingFont.style.fontFamily};
            --font-body: ${bodyFont.style.fontFamily};
          }
          
          h1, h2, h3, h4, h5, h6 {
            font-family: var(--font-heading), sans-serif;
          }
          
          body, p, span, div {
            font-family: var(--font-body), sans-serif;
          }
        `}</style>
      </head>
      <body className={`${isMounted ? fontVariables : 'font-sans'} antialiased`}>
        <DebugClickTracker />
        <div className="fixed top-4 right-4 z-50">
          <FontSwitcher onFontChange={handleFontChange} currentFont={currentFont} />
        </div>
        <EnterpriseHeader />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}