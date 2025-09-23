"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity/sanity.config";

export default function StudioPage() {
  return (
    <div className="h-screen w-full">
      <div className="bg-blue-50 border-b border-blue-200 px-4 py-2 text-sm text-blue-800">
        <strong>💡 Pro Tip:</strong> Always click "Generate" next to the Slug field for better SEO!
      </div>
      <NextStudio config={config} />
    </div>
  );
}