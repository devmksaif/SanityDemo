import type { Metadata } from "next";
import { metadata } from "./metadata";

export { metadata };

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}