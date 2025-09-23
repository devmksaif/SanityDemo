import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { DebugClickTracker } from "@/components/debug-click-tracker";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shubz Entertainment",
  description: "Creative Entertainment Company",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DebugClickTracker />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}