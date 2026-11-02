import { createContext, useContext } from 'react';
import type { CardInstance, CardLocation } from '../types/game';

export interface CardActions {
  openDetail: (instance: CardInstance, loc?: CardLocation) => void;
  requestSell: (loc: CardLocation) => void;
  isDragging: boolean;
}

export const CardActionsContext = createContext<CardActions | null>(null);

export function useCardActions(): CardActions {
  const ctx = useContext(CardActionsContext);
  if (!ctx) throw new Error('useCardActions must be used inside CardActionsProvider');
  return ctx;
}