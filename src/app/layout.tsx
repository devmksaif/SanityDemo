import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { EnterpriseHeader } from "@/components/enterprise-header";
import { EnterpriseFooter } from "@/components/enterprise-footer";
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
        <EnterpriseHeader />
        <main className="min-h-screen">{children}</main>
        <EnterpriseFooter />
      </body>
    </html>
  );
}