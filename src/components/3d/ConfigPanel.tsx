'use client';

import { useState, useEffect } from 'react';
import ParticleField from '@/components/3d/ParticleField';
import Card3D from '@/components/3d/Card3D';
import FloatingElements from '@/components/3d/FloatingElements';
import Performance3D from '@/components/3d/Performance3D';

interface Config3D {
  heroEffects: boolean;
  cardEffects: boolean;
  floatingElements: boolean;
  density: 'low' | 'medium' | 'high';
  intensity: number;
  colors: string[];
}

export default function ThreeDConfigPanel() {
  const [config, setConfig] = useState<Config3D>({
    heroEffects: true,
    cardEffects: true,
    floatingElements: true,
    density: 'medium',
    intensity: 1.0,
    colors: ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4']
  });

  const [showConfig, setShowConfig] = useState(false);

  // Sample content for testing
  const sampleCards = [
    { id: 1, title: 'Creative Direction', description: 'Strategic visual storytelling' },
    { id: 2, title: 'Media Production', description: 'High-quality content creation' },
    { id: 3, title: 'Talent Management', description: 'Artist development & representation' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Configuration Panel */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-black/90 backdrop-blur-sm z-50 p-6 transform transition-transform ${
        showConfig ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-blue-400">3D Configuration</h2>
          
          {/* Toggle Controls */}
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={config.heroEffects}
                onChange={(e) => setConfig({...config, heroEffects: e.target.checked})}
                className="w-4 h-4"
              />
              <span>Hero Particle Field</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={config.cardEffects}
                onChange={(e) => setConfig({...config, cardEffects: e.target.checked})}
                className="w-4 h-4"
              />
              <span>Card 3D Effects</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={config.floatingElements}
                onChange={(e) => setConfig({...config, floatingElements: e.target.checked})}
                className="w-4 h-4"
              />
              <span>Floating Elements</span>
            </label>
          </div>

          {/* Density Control */}
          <div>
            <label className="block text-sm font-medium mb-2">Particle Density</label>
            <select
              value={config.density}
              onChange={(e) => setConfig({...config, density: e.target.value as any})}
              className="w-full bg-gray-800 rounded px-3 py-2"
            >
              <option value="low">Low (Performance)</option>
              <option value="medium">Medium (Balanced)</option>
              <option value="high">High (Visual)</option>
            </select>
          </div>

          {/* Intensity Slider */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Card Intensity: {config.intensity.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.1"
              max="2.0"
              step="0.1"
              value={config.intensity}
              onChange={(e) => setConfig({...config, intensity: parseFloat(e.target.value)})}
              className="w-full"
            />
          </div>

          {/* Color Presets */}
          <div>
            <label className="block text-sm font-medium mb-2">Color Theme</label>
            <div className="space-y-2">
              <button
                onClick={() => setConfig({...config, colors: ['#6366f1', '#8b5cf6', '#ec4899']})}
                className="w-full text-left px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded text-sm"
              >
                Brand Colors
              </button>
              <button
                onClick={() => setConfig({...config, colors: ['#06b6d4', '#10b981', '#f59e0b']})}
                className="w-full text-left px-3 py-2 bg-gradient-to-r from-cyan-600 to-yellow-600 rounded text-sm"
              >
                Creative Palette
              </button>
              <button
                onClick={() => setConfig({...config, colors: ['#ef4444', '#f97316', '#eab308']})}
                className="w-full text-left px-3 py-2 bg-gradient-to-r from-red-600 to-orange-600 rounded text-sm"
              >
                Warm Tones
              </button>
            </div>
          </div>

          {/* Performance Info */}
          <div className="text-xs text-gray-400 space-y-1">
            <p>💡 Tips:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Lower density for mobile</li>
              <li>Reduce intensity for text areas</li>
              <li>Use warm colors for personal sections</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setShowConfig(!showConfig)}
        className="fixed top-4 right-4 z-40 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
      >
        {showConfig ? 'Hide' : 'Show'} Config
      </button>

      {/* Demo Content */}
      <div className="relative">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center">
          {/* 3D Background - Conditional */}
          {config.heroEffects && (
            <Performance3D>
              <ParticleField />
            </Performance3D>
          )}
          
          {/* Floating Elements - Conditional */}
          {config.floatingElements && (
            <FloatingElements 
              density={config.density}
              colors={config.colors}
              className="opacity-70"
            />
          )}
          
          {/* Content */}
          <div className="relative z-10 text-center space-y-6">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Interactive 3D Demo
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Use the configuration panel to test different 3D effects and find the perfect balance for your site
            </p>
          </div>
        </section>

        {/* Cards Section */}
        <section className="py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Division Showcase</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sampleCards.map((card) => {
                const CardContent = (
                  <div className="h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 flex flex-col justify-between border border-gray-700">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-blue-400">{card.title}</h3>
                      <p className="text-gray-300">{card.description}</p>
                    </div>
                    <div className="text-sm text-gray-400">
                      Hover to see 3D effects
                    </div>
                  </div>
                );

                return config.cardEffects ? (
                  <Card3D key={card.id} intensity={config.intensity}>
                    {CardContent}
                  </Card3D>
                ) : (
                  <div key={card.id}>
                    {CardContent}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Current Configuration Display */}
        <section className="py-10 bg-gray-800/50">
          <div className="max-w-4xl mx-auto px-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Current Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="bg-gray-800 p-4 rounded">
                <strong>Hero Effects:</strong> {config.heroEffects ? 'On' : 'Off'}
              </div>
              <div className="bg-gray-800 p-4 rounded">
                <strong>Card Effects:</strong> {config.cardEffects ? 'On' : 'Off'}
              </div>
              <div className="bg-gray-800 p-4 rounded">
                <strong>Density:</strong> {config.density}
              </div>
              <div className="bg-gray-800 p-4 rounded">
                <strong>Intensity:</strong> {config.intensity}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}