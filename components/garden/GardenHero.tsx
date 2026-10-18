'use client';

import React from 'react';

interface GardenHeroProps {
  totalBlooms: number;
  totalNourished: number;
}

export function GardenHero({ totalBlooms, totalNourished }: GardenHeroProps) {
  return (
    <section className="relative w-full pt-10 pb-8 sm:pt-14 sm:pb-12 text-center sm:text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Headline */}
        <div className="lg:col-span-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100/80 text-sage-800 text-xs font-medium border border-sage-200">
            <span>🌿</span>
            <span>Welcome to your peaceful sanctuary</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-earth-900 tracking-tight leading-[1.15]">
            Where cherished moments <br className="hidden sm:inline" />
            <span className="italic text-sage-700">bloom into flowers.</span>
          </h1>

          <p className="max-w-2xl text-base sm:text-lg text-earth-600 leading-relaxed font-sans font-light">
            Every memory you plant takes root as a living blossom. Nourish your thoughts,
            watch them grow from tender sprouts to radiant perennials, and walk through your life&apos;s garden.
          </p>
        </div>

        {/* Right Garden Atmosphere Card */}
        <div className="lg:col-span-4 w-full">
          <div className="rounded-3xl p-6 glass-card border border-cream-200 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200/80">
              <span className="text-xs font-medium uppercase tracking-wider text-earth-500">
                Garden Climate
              </span>
              <span className="text-xs text-sage-700 font-medium bg-sage-50 px-2 py-0.5 rounded-full border border-sage-200">
                Gentle Morning Dew
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-2xl bg-cream-100/60 border border-cream-200/50">
                <span className="text-2xl sm:text-3xl font-serif font-semibold text-earth-900">
                  {totalBlooms}
                </span>
                <p className="text-xs text-earth-500 mt-1">Blooms in Garden</p>
              </div>

              <div className="p-3 rounded-2xl bg-cream-100/60 border border-cream-200/50">
                <span className="text-2xl sm:text-3xl font-serif font-semibold text-sage-700">
                  {totalNourished}
                </span>
                <p className="text-xs text-earth-500 mt-1">Times Nourished</p>
              </div>
            </div>

            <p className="text-[11px] text-earth-400 italic text-center pt-1">
              &ldquo;To plant a garden is to believe in tomorrow.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
