import React from 'react';
import { BloomStage, Mood } from '@/types/garden';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'sage' | 'petal' | 'earth' | 'pollen' | 'cream' | 'neutral';
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

export function Badge({
  children,
  variant = 'sage',
  size = 'sm',
  className = '',
}: BadgeProps) {
  const sizeStyles = {
    xs: 'text-[10px] px-2 py-0.5 tracking-wide',
    sm: 'text-xs px-2.5 py-0.75 tracking-normal',
    md: 'text-sm px-3 py-1',
  };

  const variantStyles = {
    sage: 'bg-sage-100 text-sage-800 border border-sage-200/80',
    petal: 'bg-petal-100 text-petal-700 border border-petal-200/80',
    earth: 'bg-earth-100 text-earth-800 border border-earth-200/80',
    pollen: 'bg-pollen-100 text-pollen-700 border border-pollen-200/80',
    cream: 'bg-cream-100 text-earth-700 border border-cream-200',
    neutral: 'bg-white/80 text-earth-600 border border-cream-200 backdrop-blur-sm',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export function MoodBadge({ mood }: { mood: Mood }) {
  const moodConfig: Record<
    Mood,
    { label: string; dotColor: string; variant: BadgeProps['variant'] }
  > = {
    peaceful: { label: 'Peaceful', dotColor: 'bg-sage-400', variant: 'sage' },
    joyful: { label: 'Joyful Bloom', dotColor: 'bg-pollen-400', variant: 'pollen' },
    nostalgic: { label: 'Sweet Nostalgia', dotColor: 'bg-petal-400', variant: 'petal' },
    grateful: { label: 'Deep Gratitude', dotColor: 'bg-sage-500', variant: 'sage' },
    melancholy: { label: 'Tender Melancholy', dotColor: 'bg-earth-400', variant: 'earth' },
    inspired: { label: 'Inspired Light', dotColor: 'bg-pollen-500', variant: 'pollen' },
    romantic: { label: 'Romantic Petal', dotColor: 'bg-petal-500', variant: 'petal' },
  };

  const config = moodConfig[mood] || moodConfig.peaceful;

  return (
    <Badge variant={config.variant} size="xs">
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor} shrink-0`} />
      <span>{config.label}</span>
    </Badge>
  );
}

export function BloomStageBadge({ stage }: { stage: BloomStage }) {
  const stageConfig: Record<
    BloomStage,
    { label: string; icon: string; variant: BadgeProps['variant'] }
  > = {
    sprout: { label: 'Fresh Sprout', icon: '🌱', variant: 'sage' },
    bud: { label: 'Tender Bud', icon: '🌿', variant: 'earth' },
    bloom: { label: 'Full Bloom', icon: '🌸', variant: 'petal' },
    radiant: { label: 'Radiant Flower', icon: '✨', variant: 'pollen' },
    evergreen: { label: 'Evergreen Memory', icon: '🍃', variant: 'sage' },
  };

  const config = stageConfig[stage] || stageConfig.bloom;

  return (
    <Badge variant={config.variant} size="xs">
      <span className="text-[11px] leading-none">{config.icon}</span>
      <span>{config.label}</span>
    </Badge>
  );
}
