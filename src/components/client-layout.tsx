"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { EnterpriseHeader } from "@/components/enterprise-header";
import { EnterpriseFooter } from "@/components/enterprise-footer";
import { DebugClickTracker } from "@/components/debug-click-tracker";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <EnterpriseHeader />
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial="initialState"
            animate="animateState"
            exit="exitState"
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
            variants={{
              initialState: {
                opacity: 0,
                y: 20,
              },
              animateState: {
                opacity: 1,
                y: 0,
              },
              exitState: {
                opacity: 0,
                y: -20,
              },
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <EnterpriseFooter />
      
      {process.env.NODE_ENV === 'development' && <DebugClickTracker />}
    </>
  );
}