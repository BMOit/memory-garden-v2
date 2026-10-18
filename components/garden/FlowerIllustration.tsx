import React from 'react';
import { BloomStage, FlowerType } from '@/types/garden';

interface FlowerIllustrationProps {
  type: FlowerType;
  stage: BloomStage;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isHovered?: boolean;
}

export function FlowerIllustration({
  type,
  stage,
  className = '',
  size = 'md',
  isHovered = false,
}: FlowerIllustrationProps) {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  };

  // Helper for rendering bloom stage overlay / sprout
  if (stage === 'sprout') {
    return (
      <div className={`relative flex items-center justify-center ${sizeMap[size]} ${className}`}>
        <svg
          viewBox="0 0 100 100"
          className={`w-full h-full transition-transform duration-500 ${isHovered ? 'scale-110 -translate-y-1' : ''}`}
          fill="none"
        >
          {/* Earth mound */}
          <ellipse cx="50" cy="85" rx="28" ry="6" fill="#DFD3C8" />
          <ellipse cx="50" cy="84" rx="20" ry="4" fill="#C5B2A1" />
          {/* Main Stem */}
          <path
            d="M 50 84 Q 50 62 48 48"
            stroke="#5C8A67"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Left Leaf */}
          <path
            d="M 48 60 C 35 55 30 42 38 40 C 44 38 48 52 48 60 Z"
            fill="#7DA687"
          />
          {/* Right Leaf */}
          <path
            d="M 49 54 C 62 50 68 38 60 36 C 54 34 50 46 49 54 Z"
            fill="#A3BFAB"
          />
          {/* Dew drop */}
          <circle cx="39" cy="41" r="2.5" fill="#FAF8F5" fillOpacity="0.8" />
        </svg>
      </div>
    );
  }

  // Render specific botanical flower
  return (
    <div className={`relative flex items-center justify-center ${sizeMap[size]} ${className}`}>
      {/* Radiant ambient glow */}
      {stage === 'radiant' && (
        <div className="absolute inset-0 rounded-full bg-pollen-200/50 blur-xl animate-breathe pointer-events-none" />
      )}

      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full transition-transform duration-500 ${
          isHovered ? 'scale-110 -translate-y-1' : ''
        } ${stage === 'radiant' ? 'drop-shadow-[0_4px_12px_rgba(217,158,38,0.25)]' : 'drop-shadow-sm'}`}
        fill="none"
      >
        {/* Soil shadow base */}
        <ellipse cx="50" cy="88" rx="20" ry="4" fill="#DFD3C8" fillOpacity="0.7" />

        {/* Botanical stem */}
        <path
          d="M 50 86 Q 49 60 50 42"
          stroke="#466D4F"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Stem Leaves */}
        <path
          d="M 49 68 C 36 64 34 52 41 50 C 47 48 49 60 49 68 Z"
          fill="#5C8A67"
        />
        <path
          d="M 51 60 C 64 56 66 44 59 42 C 53 40 51 52 51 60 Z"
          fill="#7DA687"
        />

        {/* Flower Heads based on Flower Type */}
        {type === 'peony' && (
          <g transform="translate(0, -6)">
            {/* Outer petals */}
            <circle cx="50" cy="38" r="18" fill="#F1D2D2" />
            <circle cx="42" cy="35" r="14" fill="#E4AEAE" />
            <circle cx="58" cy="35" r="14" fill="#E4AEAE" />
            <circle cx="50" cy="28" r="13" fill="#D38989" />
            {/* Inner layered petals */}
            <circle cx="47" cy="36" r="10" fill="#BE6666" />
            <circle cx="53" cy="37" r="9" fill="#D38989" />
            <circle cx="50" cy="39" r="6" fill="#F9EBEB" />
          </g>
        )}

        {type === 'lavender' && (
          <g transform="translate(0, -10)">
            {/* Lavender spikes */}
            <ellipse cx="50" cy="46" rx="6" ry="4" fill="#B3A2C7" />
            <ellipse cx="50" cy="39" rx="7" ry="5" fill="#9D88B9" />
            <ellipse cx="50" cy="31" rx="6.5" ry="5" fill="#886EAA" />
            <ellipse cx="50" cy="23" rx="5.5" ry="4.5" fill="#75589C" />
            <ellipse cx="50" cy="16" rx="4" ry="4" fill="#886EAA" />
            {/* Delicate tips */}
            <circle cx="46" cy="38" r="2.5" fill="#D9CDE8" />
            <circle cx="54" cy="30" r="2.5" fill="#D9CDE8" />
          </g>
        )}

        {type === 'marigold' && (
          <g transform="translate(0, -6)">
            {/* Radiant golden marigold rosettes */}
            <circle cx="50" cy="38" r="18" fill="#F8E5B8" />
            <circle cx="50" cy="38" r="15" fill="#F2D288" />
            {/* Petal cluster */}
            <path
              d="M 50 20 L 53 32 L 64 25 L 58 35 L 70 38 L 58 41 L 64 51 L 53 44 L 50 56 L 47 44 L 36 51 L 42 41 L 30 38 L 42 35 L 36 25 L 47 32 Z"
              fill="#E9BA54"
            />
            <circle cx="50" cy="38" r="8" fill="#D99E26" />
            <circle cx="50" cy="38" r="4" fill="#886F5C" />
          </g>
        )}

        {type === 'wild_rose' && (
          <g transform="translate(0, -6)">
            {/* 5 graceful rose petals */}
            <ellipse cx="50" cy="24" rx="10" ry="12" fill="#F1D2D2" />
            <ellipse cx="37" cy="34" rx="11" ry="9" fill="#E4AEAE" />
            <ellipse cx="63" cy="34" rx="11" ry="9" fill="#E4AEAE" />
            <ellipse cx="42" cy="46" rx="10" ry="9" fill="#D38989" />
            <ellipse cx="58" cy="46" rx="10" ry="9" fill="#D38989" />
            {/* Flower Heart */}
            <circle cx="50" cy="37" r="7" fill="#FCF4DF" />
            <circle cx="50" cy="37" r="4" fill="#D99E26" />
          </g>
        )}

        {type === 'chamomile' && (
          <g transform="translate(0, -6)">
            {/* White petals */}
            <ellipse cx="50" cy="22" rx="5" ry="11" fill="#FAF8F5" stroke="#EAE3D9" strokeWidth="0.8" />
            <ellipse cx="50" cy="52" rx="5" ry="11" fill="#FAF8F5" stroke="#EAE3D9" strokeWidth="0.8" />
            <ellipse cx="35" cy="37" rx="11" ry="5" fill="#FAF8F5" stroke="#EAE3D9" strokeWidth="0.8" />
            <ellipse cx="65" cy="37" rx="11" ry="5" fill="#FAF8F5" stroke="#EAE3D9" strokeWidth="0.8" />
            <ellipse cx="39" cy="26" rx="6" ry="10" transform="rotate(-45 39 26)" fill="#FAF8F5" stroke="#EAE3D9" strokeWidth="0.8" />
            <ellipse cx="61" cy="26" rx="6" ry="10" transform="rotate(45 61 26)" fill="#FAF8F5" stroke="#EAE3D9" strokeWidth="0.8" />
            <ellipse cx="39" cy="48" rx="6" ry="10" transform="rotate(45 39 48)" fill="#FAF8F5" stroke="#EAE3D9" strokeWidth="0.8" />
            <ellipse cx="61" cy="48" rx="6" ry="10" transform="rotate(-45 61 48)" fill="#FAF8F5" stroke="#EAE3D9" strokeWidth="0.8" />
            {/* Raised golden dome */}
            <circle cx="50" cy="37" r="9" fill="#E9BA54" />
            <circle cx="48" cy="35" r="3" fill="#FCF4DF" fillOpacity="0.7" />
          </g>
        )}

        {type === 'forget_me_not' && (
          <g transform="translate(0, -6)">
            {/* Sky blue petals */}
            <circle cx="50" cy="27" r="8" fill="#B8D5E5" />
            <circle cx="40" cy="36" r="8" fill="#A3C7DC" />
            <circle cx="60" cy="36" r="8" fill="#A3C7DC" />
            <circle cx="44" cy="46" r="8" fill="#8BB5D1" />
            <circle cx="56" cy="46" r="8" fill="#8BB5D1" />
            {/* Center yellow eye */}
            <circle cx="50" cy="37" r="5" fill="#FAF8F5" />
            <circle cx="50" cy="37" r="3" fill="#E9BA54" />
          </g>
        )}

        {type === 'fern' && (
          <g transform="translate(0, -6)">
            {/* Arching lush fronds */}
            <path
              d="M 50 70 C 45 45 30 30 18 25"
              stroke="#466D4F"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 50 70 C 52 45 65 30 78 22"
              stroke="#5C8A67"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 50 70 C 50 40 48 20 46 12"
              stroke="#7DA687"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        )}

        {type === 'jasmine' && (
          <g transform="translate(0, -6)">
            {/* Starry scented jasmine */}
            <polygon
              points="50,18 55,32 70,36 57,44 60,60 50,48 40,60 43,44 30,36 45,32"
              fill="#FAF8F5"
              stroke="#EAE3D9"
              strokeWidth="1"
            />
            <circle cx="50" cy="38" r="4" fill="#F8E5B8" />
          </g>
        )}

        {/* Radiance sparkles for radiant bloom */}
        {stage === 'radiant' && (
          <g>
            <circle cx="28" cy="20" r="1.5" fill="#D99E26" className="animate-pulse" />
            <circle cx="72" cy="18" r="2" fill="#D99E26" className="animate-pulse" />
            <circle cx="80" cy="42" r="1.5" fill="#E9BA54" className="animate-pulse" />
            <circle cx="20" cy="46" r="1.8" fill="#E9BA54" className="animate-pulse" />
          </g>
        )}
      </svg>
    </div>
  );
}
