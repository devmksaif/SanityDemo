"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface DebugSlugCheckerProps {
  contentType: "division" | "portfolioProject" | "newsArticle";
  items: Array<{ _id: string; title: string; slug?: { current?: string } }>;
}

export function DebugSlugChecker({ contentType, items }: DebugSlugCheckerProps) {
  const [missingSlugs, setMissingSlugs] = useState<string[]>([]);

  useEffect(() => {
    const missing = items
      .filter(item => !item.slug?.current)
      .map(item => item._id);
    setMissingSlugs(missing);
  }, [items]);

  if (missingSlugs.length === 0) return null;

  return (
    <div className="mb-4 rounded-lg bg-yellow-50 border border-yellow-200 p-4">
      <div className="flex items-center gap-2 text-yellow-800">
        <AlertTriangle className="h-4 w-4" />
        <span className="text-sm font-medium">
          {missingSlugs.length} {contentType}(s) missing slugs. Click "Generate" next to Slug field in Sanity Studio.
        </span>
      </div>
      <details className="mt-2">
        <summary className="text-xs text-yellow-700 cursor-pointer">Show affected items</summary>
        <ul className="mt-1 text-xs text-yellow-700 list-disc list-inside">
          {items.filter(item => !item.slug?.current).map(item => (
            <li key={item._id}>{item.title} (ID: {item._id})</li>
          ))}
        </ul>
      </details>
    </div>
  );
}