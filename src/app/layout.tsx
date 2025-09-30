import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { EnterpriseHeader } from "@/components/enterprise-header";
import { EnterpriseFooter } from "@/components/enterprise-footer";
import { DebugClickTracker } from "@/components/debug-click-tracker";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <EnterpriseHeader />
          <main className="min-h-screen">{children}</main>
          <EnterpriseFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}