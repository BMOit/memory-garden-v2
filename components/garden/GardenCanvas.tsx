'use client';

import React, { useState } from 'react';
import { MemoryFlower } from '@/types/garden';
import { FlowerIllustration } from './FlowerIllustration';

interface GardenCanvasProps {
  memories: MemoryFlower[];
  onSelectMemory: (memory: MemoryFlower) => void;
  onPlantNew: () => void;
}

export function GardenCanvas({
  memories,
  onSelectMemory,
  onPlantNew,
}: GardenCanvasProps) {
  const [hoveredMemoryId, setHoveredMemoryId] = useState<string | null>(null);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-cream-300/80 bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6] to-[#EAE2D5] shadow-xl shadow-earth-900/5 p-6 sm:p-10">
      {/* Decorative Garden Sunlight Overlay */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-pollen-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-sage-100/50 rounded-full blur-3xl pointer-events-none" />

      {/* Garden Atmosphere Banner */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-cream-300/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-sage-600 uppercase tracking-widest mb-1">
            <span className="w-2 h-2 rounded-full bg-sage-500 animate-pulse" />
            <span>Sanctuary Soil Bed • Plot A</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-medium text-earth-900">
            The Living Garden
          </h2>
          <p className="text-xs sm:text-sm text-earth-600 mt-0.5">
            Hover over flowers to sense their story, or tap to open their journal entry.
          </p>
        </div>

        {/* Ambient Legend */}
        <div className="flex items-center gap-3 text-xs bg-white/70 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-cream-200">
          <span className="text-earth-500 flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-petal-400" /> Blooming
          </span>
          <span className="text-earth-500 flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-pollen-400" /> Radiant
          </span>
          <span className="text-earth-500 flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-sage-400" /> Sprouting
          </span>
        </div>
      </div>

      {/* Garden Plots Grid */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {memories.map((memory, index) => {
          const isHovered = hoveredMemoryId === memory.id;
          const swayClass = index % 2 === 0 ? 'animate-sway' : 'animate-sway-reverse';

          return (
            <div
              key={memory.id}
              onClick={() => onSelectMemory(memory)}
              onMouseEnter={() => setHoveredMemoryId(memory.id)}
              onMouseLeave={() => setHoveredMemoryId(null)}
              className="group relative flex flex-col items-center justify-end rounded-2xl p-4 min-h-[220px] cursor-pointer transition-all duration-300 hover:scale-[1.03]"
            >
              {/* Soil mound texture underneath flower */}
              <div className="absolute bottom-3 w-28 h-10 rounded-[50%] bg-[#DFD5C8]/80 group-hover:bg-[#D5C7B6] border border-[#CDBEAA]/50 transition-colors shadow-inner flex items-center justify-center">
                <span className="text-[10px] text-earth-500/70 font-mono tracking-tighter">
                  plot #{index + 1}
                </span>
              </div>

              {/* Memory preview card on hover */}
              <div
                className={`absolute -top-16 left-1/2 -translate-x-1/2 w-48 p-2.5 rounded-xl bg-white/95 backdrop-blur-md shadow-xl border border-cream-200 pointer-events-none transition-all duration-200 z-30 ${
                  isHovered
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-2 scale-95'
                }`}
              >
                <p className="text-xs font-serif font-medium text-earth-900 truncate">
                  {memory.title}
                </p>
                <div className="flex items-center justify-between text-[10px] text-earth-500 mt-1">
                  <span>{memory.plantedDate}</span>
                  <span className="text-sage-700">💧 {memory.waterCount}</span>
                </div>
              </div>

              {/* Botanical Swaying Flower */}
              <div className={`relative z-10 mb-2 ${swayClass}`}>
                <FlowerIllustration
                  type={memory.flowerType}
                  stage={memory.bloomStage}
                  size="xl"
                  isHovered={isHovered}
                />
              </div>

              {/* Plant label placard */}
              <div className="relative z-10 text-center mt-2">
                <p className="text-xs font-medium text-earth-800 group-hover:text-sage-800 transition-colors truncate max-w-[130px]">
                  {memory.title}
                </p>
                <p className="text-[11px] text-earth-500 capitalize">
                  {memory.flowerType.replace('_', ' ')}
                </p>
              </div>
            </div>
          );
        })}

        {/* Empty Soil Plot: Invitations to Plant */}
        <div
          onClick={onPlantNew}
          className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-cream-300/90 hover:border-sage-400 p-6 min-h-[220px] cursor-pointer transition-all duration-300 hover:bg-cream-100/60"
        >
          <div className="w-14 h-14 rounded-full bg-cream-100 group-hover:bg-sage-100 text-earth-400 group-hover:text-sage-700 flex items-center justify-center transition-all duration-300 group-hover:scale-110 mb-3 shadow-inner">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p className="text-sm font-serif font-medium text-earth-700 group-hover:text-sage-800">
            Plant New Memory
          </p>
          <p className="text-[11px] text-earth-400 text-center mt-1">
            Nurture another moment in this soil
          </p>
        </div>
      </div>
    </div>
  );
}
