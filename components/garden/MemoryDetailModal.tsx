'use client';

import React from 'react';
import { Modal } from '../ui/Modal';
import { FlowerIllustration } from './FlowerIllustration';
import { BloomStageBadge, MoodBadge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { MemoryFlower } from '@/types/garden';

interface MemoryDetailModalProps {
  memory: MemoryFlower | null;
  isOpen: boolean;
  onClose: () => void;
  onNourish: (id: string) => void;
}

export function MemoryDetailModal({
  memory,
  isOpen,
  onClose,
  onNourish,
}: MemoryDetailModalProps) {
  if (!memory) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={memory.title}
      subtitle={`Planted in ${memory.season || 'Spring'} • ${memory.plantedDate}`}
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Flower Showcase */}
        <div className="relative flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-b from-cream-100/60 to-cream-200/40 border border-cream-200/90 overflow-hidden">
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <MoodBadge mood={memory.mood} />
            <BloomStageBadge stage={memory.bloomStage} />
          </div>

          <div className="my-2 animate-float">
            <FlowerIllustration
              type={memory.flowerType}
              stage={memory.bloomStage}
              size="xl"
            />
          </div>

          <div className="mt-2 text-center">
            <p className="text-xs font-mono uppercase tracking-wider text-earth-400">
              Variety: {memory.flowerType.replace('_', ' ')}
            </p>
          </div>
        </div>

        {/* Narrative */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-earth-700 uppercase tracking-wider">
            Memory Reflection
          </h4>
          <p className="text-base text-earth-800 leading-relaxed font-serif whitespace-pre-line italic">
            &ldquo;{memory.reflection}&rdquo;
          </p>
        </div>

        {/* Details & Sensory notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-cream-200/80 text-xs">
          {memory.location && (
            <div>
              <span className="text-earth-400 font-medium">Setting / Location:</span>
              <p className="text-earth-700 font-medium mt-0.5">{memory.location}</p>
            </div>
          )}

          <div>
            <span className="text-earth-400 font-medium">Attention Nourished:</span>
            <p className="text-sage-700 font-medium mt-0.5">
              💧 Watered {memory.waterCount} times
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 items-center pt-2">
          {memory.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-earth-600 bg-cream-100 px-3 py-1 rounded-full border border-cream-200"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action footer */}
        <div className="pt-4 border-t border-cream-200 flex items-center justify-between">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onNourish(memory.id)}
            icon={<span>💧</span>}
          >
            Nourish Memory ({memory.waterCount})
          </Button>

          <Button variant="outline" size="sm" onClick={onClose}>
            Close Journal
          </Button>
        </div>
      </div>
    </Modal>
  );
}
