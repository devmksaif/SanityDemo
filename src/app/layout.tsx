import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { EnterpriseHeader } from "@/components/enterprise-header";
import { EnterpriseFooter } from "@/components/enterprise-footer";
import { Toaster } from "@/components/ui/sonner";
import { DebugClickTracker } from "@/components/debug-click-tracker";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Shubz Entertainment - Creative Enterprise",
  description: "Integrating media, music, and talent platforms to tell global stories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          inter.variable
        )}
      >
        <DebugClickTracker />
        <EnterpriseHeader />
        <main className="flex-1">
          {children}
        </main>
        <EnterpriseFooter />
        <Toaster />
        <MadeWithDyad />
      </body>
    </html>
  );
}