export type BloomStage = 'sprout' | 'bud' | 'bloom' | 'radiant' | 'evergreen';

export type FlowerType =
  | 'peony'
  | 'lavender'
  | 'marigold'
  | 'wild_rose'
  | 'chamomile'
  | 'forget_me_not'
  | 'fern'
  | 'jasmine';

export type Mood =
  | 'peaceful'
  | 'joyful'
  | 'nostalgic'
  | 'grateful'
  | 'melancholy'
  | 'inspired'
  | 'romantic';

export interface MemoryFlower {
  id: string;
  title: string;
  reflection: string;
  plantedDate: string;
  flowerType: FlowerType;
  bloomStage: BloomStage;
  mood: Mood;
  tags: string[];
  location?: string;
  season?: string;
  waterCount: number;
  lastWatered?: string;
  plotCoord: { row: number; col: number };
}

export interface GardenSummary {
  name: string;
  subtitle: string;
  season: string;
  weather: string;
  soilCondition: string;
  totalBlooms: number;
  activeGardens: number;
}
