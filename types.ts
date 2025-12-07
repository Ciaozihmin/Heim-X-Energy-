
export interface ColorDefinition {
  name: string;
  hex: string;
  description: string;
  textColor: string;
}

export interface BrandElement {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: 'rune' | 'type' | 'cross';
}

export enum SectionId {
  HERO = 'hero',
  CONCEPT = 'concept',
  PALETTE = 'palette',
  PHILOSOPHY = 'philosophy'
}

export interface SlideBlock {
  cn?: string;
  en?: string;
}

export interface InstagramSlide {
  id: number;
  layout: 'cover' | 'standard' | 'quote' | 'final';
  heading?: string; // New short title for the simplified view
  title?: string;
  subtitle?: string;
  blocks: SlideBlock[];
  footer?: string;
}

export interface Team {
  id: string;
  name: string;
  enName: string;
  role: 'research' | 'internal' | 'external' | 'publicity';
  description: string;
}
