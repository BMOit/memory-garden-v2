'use client';

import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { FlowerIllustration } from './FlowerIllustration';
import { Button } from '../ui/Button';
import { BloomStage, FlowerType, MemoryFlower, Mood } from '@/types/garden';

interface PlantMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlant: (memory: Omit<MemoryFlower, 'id' | 'waterCount' | 'plotCoord'>) => void;
}

const flowerOptions: { type: FlowerType; name: string; meaning: string }[] = [
  { type: 'peony', name: 'Peony', meaning: 'Joy & Abundance' },
  { type: 'lavender', name: 'Lavender', meaning: 'Peace & Healing' },
  { type: 'marigold', name: 'Marigold', meaning: 'Warmth & Energy' },
  { type: 'wild_rose', name: 'Wild Rose', meaning: 'Love & Tenderness' },
  { type: 'chamomile', name: 'Chamomile', meaning: 'Patience & Calm' },
  { type: 'forget_me_not', name: 'Forget-Me-Not', meaning: 'Enduring Memories' },
  { type: 'fern', name: 'Emerald Fern', meaning: 'Quiet Reflection' },
  { type: 'jasmine', name: 'Star Jasmine', meaning: 'Grace & Inspiration' },
];

const moodOptions: { mood: Mood; label: string }[] = [
  { mood: 'peaceful', label: 'Peaceful' },
  { mood: 'joyful', label: 'Joyful' },
  { mood: 'nostalgic', label: 'Nostalgic' },
  { mood: 'grateful', label: 'Grateful' },
  { mood: 'melancholy', label: 'Melancholy' },
  { mood: 'inspired', label: 'Inspired' },
];

export function PlantMemoryModal({
  isOpen,
  onClose,
  onPlant,
}: PlantMemoryModalProps) {
  const [title, setTitle] = useState('');
  const [reflection, setReflection] = useState('');
  const [selectedFlower, setSelectedFlower] = useState<FlowerType>('peony');
  const [selectedMood, setSelectedMood] = useState<Mood>('peaceful');
  const [bloomStage, setBloomStage] = useState<BloomStage>('bloom');
  const [tagsInput, setTagsInput] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !reflection.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    onPlant({
      title: title.trim(),
      reflection: reflection.trim(),
      flowerType: selectedFlower,
      bloomStage,
      mood: selectedMood,
      tags: tags.length ? tags : ['memory', 'garden'],
      location: location.trim() || undefined,
      plantedDate: 'Today',
      season: 'Late Spring',
    });

    // Reset fields
    setTitle('');
    setReflection('');
    setTagsInput('');
    setLocation('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Plant a New Memory"
      subtitle="Nurture a Moment"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Flower Selection with Live Preview */}
        <div>
          <label className="block text-xs font-semibold text-earth-700 uppercase tracking-wider mb-2">
            Choose Flower Variety
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {flowerOptions.map((f) => {
              const isSelected = selectedFlower === f.type;
              return (
                <button
                  type="button"
                  key={f.type}
                  onClick={() => setSelectedFlower(f.type)}
                  className={`flex flex-col items-center p-3 rounded-2xl border text-center transition-all ${
                    isSelected
                      ? 'bg-sage-50 border-sage-500 ring-2 ring-sage-300 shadow-xs'
                      : 'bg-white/80 border-cream-200 hover:border-cream-300'
                  }`}
                >
                  <FlowerIllustration type={f.type} stage="bloom" size="sm" />
                  <span className="text-xs font-serif font-medium text-earth-900 mt-1">
                    {f.name}
                  </span>
                  <span className="text-[10px] text-earth-400 leading-tight">
                    {f.meaning}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mood Selection */}
        <div>
          <label className="block text-xs font-semibold text-earth-700 uppercase tracking-wider mb-2">
            Emotional Atmosphere
          </label>
          <div className="flex flex-wrap gap-2">
            {moodOptions.map((m) => {
              const isSelected = selectedMood === m.mood;
              return (
                <button
                  type="button"
                  key={m.mood}
                  onClick={() => setSelectedMood(m.mood)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-sage-700 text-cream-50'
                      : 'bg-white/70 text-earth-600 border border-cream-200 hover:bg-cream-100'
                  }`}
                >
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bloom Stage Selection */}
        <div>
          <label className="block text-xs font-semibold text-earth-700 uppercase tracking-wider mb-2">
            Initial Bloom Growth Stage
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { stage: 'sprout' as BloomStage, label: '🌱 Fresh Sprout' },
              { stage: 'bud' as BloomStage, label: '🌿 Tender Bud' },
              { stage: 'bloom' as BloomStage, label: '🌸 In Full Bloom' },
              { stage: 'radiant' as BloomStage, label: '✨ Radiant Flora' },
            ].map((s) => {
              const isSelected = bloomStage === s.stage;
              return (
                <button
                  type="button"
                  key={s.stage}
                  onClick={() => setBloomStage(s.stage)}
                  className={`px-3 py-1.5 rounded-2xl text-xs font-medium border text-center transition-all ${
                    isSelected
                      ? 'bg-sage-100 border-sage-500 text-sage-900 font-semibold ring-1 ring-sage-400'
                      : 'bg-white/70 border-cream-200 text-earth-600 hover:bg-cream-100'
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Memory Title */}
        <div>
          <label className="block text-xs font-semibold text-earth-700 uppercase tracking-wider mb-1.5">
            Memory Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Afternoon tea on grandmother's porch"
            className="w-full px-4 py-2.5 rounded-2xl bg-white/90 border border-cream-200 focus:outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-200/50 text-sm text-earth-900 placeholder-earth-400"
          />
        </div>

        {/* Narrative */}
        <div>
          <label className="block text-xs font-semibold text-earth-700 uppercase tracking-wider mb-1.5">
            Story & Reflection
          </label>
          <textarea
            required
            rows={3}
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="What feelings, scents, words, or sights made this moment unforgettable?"
            className="w-full px-4 py-2.5 rounded-2xl bg-white/90 border border-cream-200 focus:outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-200/50 text-sm text-earth-900 placeholder-earth-400 resize-none"
          />
        </div>

        {/* Metadata: Tags & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-earth-700 uppercase tracking-wider mb-1.5">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="childhood, summer, home"
              className="w-full px-4 py-2 rounded-2xl bg-white/90 border border-cream-200 focus:outline-none focus:border-sage-400 text-xs text-earth-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-earth-700 uppercase tracking-wider mb-1.5">
              Location / Setting (optional)
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Kyoto Garden, 2024"
              className="w-full px-4 py-2 rounded-2xl bg-white/90 border border-cream-200 focus:outline-none focus:border-sage-400 text-xs text-earth-900"
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-2 flex items-center justify-end gap-3 border-t border-cream-200/80">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            }
          >
            Plant Blossom into Soil
          </Button>
        </div>
      </form>
    </Modal>
  );
}
