'use client';

// Dynamically import the 3D scene to reduce initial bundle size
import dynamic from 'next/dynamic';
import { ClientOnly } from '@/components/client-only';
import { NewsArticleData } from '@/types/sanity';

const DynamicNewsAnimation = dynamic(
  () => import('@/components/news-animation').then(mod => mod.NewsAnimation),
  {
    ssr: false, // Disable server-side rendering for Three.js
    loading: () => (
      <div className="flex h-[60vh] w-full items-center justify-center bg-blue-950">
        <div className="text-2xl font-bold text-white">Loading 3D Scene...</div>
      </div>
    ),
  }
);

export function NewsAnimation({ articles }: { articles: NewsArticleData[] }) {
  return (
    <ClientOnly 
      fallback={
        <div className="flex h-[60vh] w-full items-center justify-center bg-blue-950">
          <div className="text-2xl font-bold text-white">Loading...</div>
        </div>
      }
    >
      <DynamicNewsAnimation articles={articles} />
    </ClientOnly>
  );
}