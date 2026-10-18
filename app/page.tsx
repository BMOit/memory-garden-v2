'use client';

import React, { useState, useMemo } from 'react';
import { initialMemories } from '@/data/initialMemories';
import { MemoryFlower, Mood } from '@/types/garden';
import { GardenNavbar } from '@/components/garden/GardenNavbar';
import { GardenHero } from '@/components/garden/GardenHero';
import { GardenFilterBar } from '@/components/garden/GardenFilterBar';
import { GardenCanvas } from '@/components/garden/GardenCanvas';
import { MemoryCard } from '@/components/garden/MemoryCard';
import { PlantMemoryModal } from '@/components/garden/PlantMemoryModal';
import { MemoryDetailModal } from '@/components/garden/MemoryDetailModal';
import { Button } from '@/components/ui/Button';

export default function Home() {
  const [memories, setMemories] = useState<MemoryFlower[]>(initialMemories);
  const [viewMode, setViewMode] = useState<'canvas' | 'journal'>('canvas');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState<Mood | 'all'>('all');

  // Modals state
  const [isPlantModalOpen, setIsPlantModalOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<MemoryFlower | null>(null);

  // Filter memories based on search query and mood
  const filteredMemories = useMemo(() => {
    return memories.filter((mem) => {
      const matchesMood = selectedMood === 'all' || mem.mood === selectedMood;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        mem.title.toLowerCase().includes(q) ||
        mem.reflection.toLowerCase().includes(q) ||
        mem.tags.some((t) => t.toLowerCase().includes(q)) ||
        (mem.location && mem.location.toLowerCase().includes(q));

      return matchesMood && matchesSearch;
    });
  }, [memories, selectedMood, searchQuery]);

  // Aggregate stats
  const totalNourished = useMemo(() => {
    return memories.reduce((acc, m) => acc + m.waterCount, 0);
  }, [memories]);

  // Nourish interaction handler
  const handleNourish = (id: string) => {
    setMemories((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const nextCount = m.waterCount + 1;
          const nextStage =
            nextCount > 25 ? 'radiant' : nextCount > 10 ? 'bloom' : m.bloomStage;
          return {
            ...m,
            waterCount: nextCount,
            bloomStage: nextStage,
          };
        }
        return m;
      })
    );

    // Also update selectedMemory if currently inspecting
    if (selectedMemory && selectedMemory.id === id) {
      setSelectedMemory((prev) =>
        prev
          ? {
              ...prev,
              waterCount: prev.waterCount + 1,
              bloomStage:
                prev.waterCount + 1 > 25
                  ? 'radiant'
                  : prev.waterCount + 1 > 10
                  ? 'bloom'
                  : prev.bloomStage,
            }
          : null
      );
    }
  };

  // Plant new memory handler
  const handlePlantMemory = (
    newMemData: Omit<MemoryFlower, 'id' | 'waterCount' | 'plotCoord'>
  ) => {
    const newFlower: MemoryFlower = {
      ...newMemData,
      id: `mem-${Date.now()}`,
      waterCount: 1,
      plotCoord: { row: Math.floor(memories.length / 4), col: memories.length % 4 },
    };

    setMemories((prev) => [newFlower, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-parchment text-earth-900 selection:bg-sage-100 selection:text-sage-900">
      {/* Top Botanical Sanctuary Navbar */}
      <GardenNavbar
        onPlantClick={() => setIsPlantModalOpen(true)}
        bloomCount={memories.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Hero Sanctuary Greeting */}
        <GardenHero
          totalBlooms={memories.length}
          totalNourished={totalNourished}
        />

        {/* View Mode & Filter Controls */}
        <GardenFilterBar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedMood={selectedMood}
          onMoodChange={setSelectedMood}
        />

        {/* Dynamic Garden View: Living Canvas or Journal Grid */}
        {filteredMemories.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-cream-100/50 border border-cream-200/80 p-8 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-cream-200/60 flex items-center justify-center text-3xl">
              🍂
            </div>
            <h3 className="text-xl font-serif font-medium text-earth-800">
              No blossoms found in this corner
            </h3>
            <p className="text-sm text-earth-500 max-w-md mx-auto">
              No memories match your current search or mood filters. Try clearing your
              filters or planting a fresh bloom.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedMood('all');
                }}
              >
                Clear Filters
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsPlantModalOpen(true)}
              >
                Plant a Memory
              </Button>
            </div>
          </div>
        ) : viewMode === 'canvas' ? (
          <GardenCanvas
            memories={filteredMemories}
            onSelectMemory={(m) => setSelectedMemory(m)}
            onPlantNew={() => setIsPlantModalOpen(true)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMemories.map((memory) => (
              <MemoryCard
                key={memory.id}
                memory={memory}
                onSelect={(m) => setSelectedMemory(m)}
                onNourish={handleNourish}
              />
            ))}
          </div>
        )}
      </main>

      {/* Peaceful Botanical Footer */}
      <footer className="mt-auto border-t border-cream-200/90 bg-cream-100/40 py-8 text-center text-xs text-earth-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <p className="font-serif italic text-earth-700 text-sm">
            Memory Garden V2 — Cultivated with peace, nostalgia, and botanical care.
          </p>
          <p className="text-earth-400">
            Next.js 16 • React 19 • Tailwind CSS v4 • Phase 1 Visual Design System
          </p>
        </div>
      </footer>

      {/* Modals */}
      <PlantMemoryModal
        isOpen={isPlantModalOpen}
        onClose={() => setIsPlantModalOpen(false)}
        onPlant={handlePlantMemory}
      />

      <MemoryDetailModal
        memory={selectedMemory}
        isOpen={!!selectedMemory}
        onClose={() => setSelectedMemory(null)}
        onNourish={handleNourish}
      />
    </div>
  );
}
