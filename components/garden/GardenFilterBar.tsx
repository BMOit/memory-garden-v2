'use client';

import React from 'react';
import { Mood } from '@/types/garden';

interface GardenFilterBarProps {
  viewMode: 'canvas' | 'journal';
  onViewModeChange: (mode: 'canvas' | 'journal') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedMood: Mood | 'all';
  onMoodChange: (mood: Mood | 'all') => void;
}

export function GardenFilterBar({
  viewMode,
  onViewModeChange,
  searchQuery,
  onSearchChange,
  selectedMood,
  onMoodChange,
}: GardenFilterBarProps) {
  const moods: { id: Mood | 'all'; label: string; dot?: string }[] = [
    { id: 'all', label: 'All Flora' },
    { id: 'peaceful', label: 'Peaceful', dot: 'bg-sage-400' },
    { id: 'joyful', label: 'Joyful', dot: 'bg-pollen-400' },
    { id: 'nostalgic', label: 'Nostalgic', dot: 'bg-petal-400' },
    { id: 'grateful', label: 'Grateful', dot: 'bg-sage-500' },
    { id: 'melancholy', label: 'Melancholy', dot: 'bg-earth-400' },
    { id: 'inspired', label: 'Inspired', dot: 'bg-pollen-500' },
  ];

  return (
    <div className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 py-4 mb-6 border-b border-cream-200/80">
      {/* Left: View Mode Switcher */}
      <div className="inline-flex p-1 rounded-full bg-cream-100/90 border border-cream-200 self-start md:self-auto shrink-0 shadow-inner">
        <button
          onClick={() => onViewModeChange('canvas')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
            viewMode === 'canvas'
              ? 'bg-white text-earth-900 shadow-sm font-semibold'
              : 'text-earth-600 hover:text-earth-900'
          }`}
        >
          <span>🌿</span>
          <span>Living Garden</span>
        </button>
        <button
          onClick={() => onViewModeChange('journal')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
            viewMode === 'journal'
              ? 'bg-white text-earth-900 shadow-sm font-semibold'
              : 'text-earth-600 hover:text-earth-900'
          }`}
        >
          <span>📖</span>
          <span>Botanical Journal</span>
        </button>
      </div>

      {/* Middle/Right: Search & Mood filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
        {/* Search Input */}
        <div className="relative min-w-[220px]">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-earth-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search memories or tags..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-full bg-white/80 border border-cream-200 focus:outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-200/50 text-earth-800 placeholder-earth-400 transition-all"
          />
        </div>

        {/* Mood Filter Pills (Scrollable horizontally on mobile) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {moods.map((mood) => {
            const isSelected = selectedMood === mood.id;
            return (
              <button
                key={mood.id}
                onClick={() => onMoodChange(mood.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all ${
                  isSelected
                    ? 'bg-sage-700 text-cream-50 shadow-xs'
                    : 'bg-white/70 text-earth-600 hover:bg-cream-100 border border-cream-200'
                }`}
              >
                {mood.dot && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${mood.dot} ${
                      isSelected ? 'ring-2 ring-white/50' : ''
                    }`}
                  />
                )}
                <span>{mood.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
