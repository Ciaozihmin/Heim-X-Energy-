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
  title?: string;
  subtitle?: string;
  blocks: SlideBlock[];
  footer?: string;
}