'use client';

import { useState } from 'react';
import ParticleField from '@/components/3d/ParticleField';
import Card3D from '@/components/3d/Card3D';
import FloatingElements from '@/components/3d/FloatingElements';
import ScrollTriggered3D from '@/components/3d/ScrollTriggered3D';
import PageTransition3D from '@/components/3d/PageTransition3D';
import Performance3D from '@/components/3d/Performance3D';

export default function ThreeDShowcase() {
  const [activeDemo, setActiveDemo] = useState('hero');

  const demos = [
    {
      id: 'hero',
      title: 'Hero Section',
      description: 'Dynamic particle background with floating elements'
    },
    {
      id: 'cards',
      title: 'Interactive Cards',
      description: '3D hover effects with mouse tracking'
    },
    {
      id: 'scroll',
      title: 'Scroll Effects',
      description: 'Morphing shapes triggered by scroll position'
    },
    {
      id: 'transitions',
      title: 'Page Transitions',
      description: 'Smooth 3D morphing between pages'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Demo Navigation */}
      <div className="fixed top-4 left-4 z-50 space-y-2">
        {demos.map((demo) => (
          <button
            key={demo.id}
            onClick={() => setActiveDemo(demo.id)}
            className={`block px-4 py-2 rounded text-sm transition-all ${
              activeDemo === demo.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {demo.title}
          </button>
        ))}
      </div>

      {/* Demo Content */}
      <div className="relative">
        {/* Hero Demo */}
        {activeDemo === 'hero' && (
          <section className="relative h-screen flex items-center justify-center">
            {/* 3D Background */}
            <Performance3D>
              <ParticleField />
            </Performance3D>
            
            {/* Floating Elements */}
            <FloatingElements 
              density="medium" 
              colors={['#6366f1', '#8b5cf6', '#ec4899']}
            />
            
            {/* Content */}
            <div className="relative z-10 text-center space-y-6">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Welcome to the Future
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl">
                Experience stunning 3D animations that bring your content to life
              </p>
            </div>
          </section>
        )}

        {/* Cards Demo */}
        {activeDemo === 'cards' && (
          <section className="min-h-screen p-8 flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
              {[1, 2, 3].map((i) => (
                <Card3D key={i} intensity={1.2} className="h-64">
                  <div className="h-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Project {i}</h3>
                      <p className="text-blue-100">
                        Hover over this card to see the 3D effects in action
                      </p>
                    </div>
                    <div className="text-sm text-blue-200">
                      • Mouse tracking 3D rotation
                      • Floating particles
                      • Glowing edges
                    </div>
                  </div>
                </Card3D>
              ))}
            </div>
          </section>
        )}

        {/* Scroll Demo */}
        {activeDemo === 'scroll' && (
          <div>
            <section className="h-screen flex items-center justify-center bg-gray-800">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">Scroll Down</h2>
                <p className="text-gray-300">Watch the 3D shapes morph as you scroll</p>
              </div>
            </section>
            
            <ScrollTriggered3D />
            
            <section className="h-screen flex items-center justify-center bg-gray-700">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">Beautiful Transitions</h2>
                <p className="text-gray-300">Geometry responds to your scroll position</p>
              </div>
            </section>
          </div>
        )}

        {/* Transitions Demo */}
        {activeDemo === 'transitions' && (
          <PageTransition3D>
            <section className="h-screen flex items-center justify-center">
              <div className="text-center space-y-6">
                <h2 className="text-4xl font-bold">Page Transitions</h2>
                <p className="text-gray-300 max-w-2xl">
                  Switch between demo sections to see smooth 3D transitions with
                  morphing effects and particle explosions
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-blue-600/20 p-4 rounded">
                    <h3 className="font-bold">Morphing Geometry</h3>
                    <p className="text-sm text-gray-300">Shapes transform during navigation</p>
                  </div>
                  <div className="bg-purple-600/20 p-4 rounded">
                    <h3 className="font-bold">Particle Effects</h3>
                    <p className="text-sm text-gray-300">Explosion animations between pages</p>
                  </div>
                </div>
              </div>
            </section>
          </PageTransition3D>
        )}
      </div>

      {/* Info Panel */}
      <div className="fixed bottom-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 max-w-sm">
        <h3 className="font-bold text-blue-400 mb-2">
          {demos.find(d => d.id === activeDemo)?.title}
        </h3>
        <p className="text-sm text-gray-300">
          {demos.find(d => d.id === activeDemo)?.description}
        </p>
      </div>
    </div>
  );
}