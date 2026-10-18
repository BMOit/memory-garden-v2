'use client';

import React from 'react';
import { Button } from '../ui/Button';

interface GardenNavbarProps {
  onPlantClick: () => void;
  bloomCount: number;
}

export function GardenNavbar({ onPlantClick, bloomCount }: GardenNavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-cream-50/85 backdrop-blur-md border-b border-cream-200/90 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sage-100 border border-sage-200/80 flex items-center justify-center text-sage-700 shadow-sm">
            <svg
              className="w-5 h-5 text-sage-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.4z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-earth-900">
                Memory Garden
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-full bg-sage-100 text-sage-700 border border-sage-200">
                v2
              </span>
            </div>
            <p className="hidden sm:block text-xs text-earth-500 font-sans">
              Personal sanctuary for living memories
            </p>
          </div>
        </div>

        {/* Center / Right status & action */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Garden sanctuary state */}
          <div className="hidden md:flex items-center gap-2 text-xs text-earth-600 bg-cream-100/70 border border-cream-200 px-3.5 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Late Spring</span>
            <span className="text-earth-300">•</span>
            <span>{bloomCount} Blooms Planted</span>
          </div>

          {/* Plant Memory Action */}
          <Button
            variant="primary"
            size="sm"
            onClick={onPlantClick}
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            Plant Memory
          </Button>
        </div>
      </div>
    </header>
  );
}
