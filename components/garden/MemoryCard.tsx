'use client';

import React, { useState } from 'react';
import { MemoryFlower } from '@/types/garden';
import { FlowerIllustration } from './FlowerIllustration';
import { BloomStageBadge, MoodBadge } from '../ui/Badge';

interface MemoryCardProps {
  memory: MemoryFlower;
  onSelect?: (memory: MemoryFlower) => void;
  onNourish?: (id: string) => void;
}

export function MemoryCard({ memory, onSelect, onNourish }: MemoryCardProps) {
  const [waterCount, setWaterCount] = useState(memory.waterCount);
  const [isWatering, setIsWatering] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleWater = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWatering(true);
    setWaterCount((prev) => prev + 1);
    if (onNourish) {
      onNourish(memory.id);
    }
    setTimeout(() => {
      setIsWatering(false);
    }, 600);
  };

  return (
    <article
      onClick={() => onSelect?.(memory)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between rounded-3xl p-6 glass-card glass-card-hover cursor-pointer border border-cream-200/90 hover:border-sage-300 transition-all duration-300 overflow-hidden"
    >
      {/* Background soft botanical gradient */}
      <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-sage-100/50 blur-2xl group-hover:bg-petal-100/40 transition-colors duration-500 pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <MoodBadge mood={memory.mood} />
          <BloomStageBadge stage={memory.bloomStage} />
        </div>

        {/* Date planted */}
        <span className="text-[11px] font-medium text-earth-400 shrink-0 tracking-wide">
          {memory.plantedDate}
        </span>
      </div>

      {/* Central Botanical Display */}
      <div className="my-2 flex items-center justify-center py-2">
        <FlowerIllustration
          type={memory.flowerType}
          stage={memory.bloomStage}
          size="lg"
          isHovered={isHovered}
        />
      </div>

      {/* Title & Narrative */}
      <div className="mt-2 space-y-2">
        <h3 className="text-xl font-serif font-medium text-earth-900 group-hover:text-sage-700 transition-colors leading-snug">
          {memory.title}
        </h3>
        <p className="text-sm text-earth-600 line-clamp-3 leading-relaxed font-sans font-normal">
          {memory.reflection}
        </p>
      </div>

      {/* Tags and Location */}
      <div className="mt-4 pt-3 border-t border-cream-200/60 flex items-center justify-between text-xs text-earth-500">
        <div className="flex flex-wrap gap-1.5 items-center">
          {memory.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[11px] text-earth-500 hover:text-earth-800 bg-cream-100/80 px-2 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
          {memory.tags.length > 3 && (
            <span className="text-[10px] text-earth-400">+{memory.tags.length - 3}</span>
          )}
        </div>

        {/* Nourish / Water Button */}
        <button
          onClick={handleWater}
          title="Nourish memory with attention"
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
            isWatering
              ? 'bg-sage-200 text-sage-900 scale-105'
              : 'text-sage-700 hover:bg-sage-100/80'
          }`}
        >
          <span className={`transition-transform duration-300 ${isWatering ? 'scale-125' : ''}`}>
            💧
          </span>
          <span>{waterCount}</span>
        </button>
      </div>
    </article>
  );
}
