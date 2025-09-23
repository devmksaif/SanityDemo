import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
 import { EnterpriseHeader } from "@/components/enterprise-header";
import { EnterpriseFooter } from "@/components/enterprise-footer";

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
        <EnterpriseHeader />
        <main className="flex-1">
          {children}
        </main>
        <EnterpriseFooter />
       </body>
    </html>
  );
}