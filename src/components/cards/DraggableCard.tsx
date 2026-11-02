import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { twMerge } from 'tailwind-merge';
import type { CardInstance, CardLocation } from '../../types/game';
import { CardView } from './CardView';

interface DraggableCardProps {
  id: string;
  loc: CardLocation;
  card: CardInstance;
  disabled?: boolean;
  active?: boolean;
  activeSkill?: string | null;
  highlight?: boolean;
  onOpen: () => void;
}

export function DraggableCard({ id, loc, card, disabled, active, activeSkill, highlight, onOpen }: DraggableCardProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: `card:${id}`, data: { loc, card }, disabled });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      aria-label="Thẻ bài — nhấn để xem chi tiết, kéo để di chuyển"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
      className={twMerge(
        'aspect-[5/7] h-full max-h-full max-w-full touch-none rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-gold',
        isDragging && 'opacity-30',
        !disabled && 'cursor-grab active:cursor-grabbing'
      )}>
      
      <CardView instance={card} active={active} activeSkill={activeSkill} highlight={highlight} onClick={onOpen} />
    </div>);

}