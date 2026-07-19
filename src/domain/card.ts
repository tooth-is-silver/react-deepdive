import cardsData from '@/data/cards.json';

export interface Card {
  id: string;
  category: string;
  front: string;
  core: string;
  detail: string;
}

export const cards: Card[] = cardsData;

export const categories = [...new Set(cards.map((card) => card.category))].sort();
