import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { LockIcon } from 'lucide-react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { useCardActions } from '../../contexts/CardActionsContext';
import { useGameStore } from '../../hooks/useGameStore';
import { useUiStore } from '../../hooks/useUiStore';
import type { CardInstance, CardLocation } from '../../types/game';
import { resolveDrop, unlockStageForSlot } from '../../utils/inventory';
import { DraggableCard } from './DraggableCard';

interface InventorySlotProps {
  loc: CardLocation;
  card: CardInstance | null;
  locked?: boolean;
  disabled?: boolean;
  active?: boolean;
  activeSkill?: string | null;
  overlay?: React.ReactNode;
  className?: string;
}

export function InventorySlot({ loc, card, locked, disabled, active, activeSkill, overlay, className }: InventorySlotProps) {
  const id = `${loc.zone}:${loc.index}`;
  const player = useGameStore((s) => s.player);
  const highlightUid = useUiStore((s) => s.highlightUid);
  const { openDetail } = useCardActions();
  const { setNodeRef, isOver, active: dragItem } = useDroppable({ id, data: { loc }, disabled: locked || disabled });

  let state: 'idle' | 'valid' | 'invalid' = 'idle';
  if (isOver && dragItem) {
    const from = dragItem.data.current?.loc as CardLocation | undefined;
    if (from && !(from.zone === loc.zone && from.index === loc.index)) {
      state = resolveDrop(player, from, loc).ok ? 'valid' : 'invalid';
    }
  }

  if (locked) {
    const stage = unlockStageForSlot(loc.index);
    return (
      <button
        type="button"
        onClick={() => toast(`Vị trí ${loc.index + 1} đang khóa`, { description: `Mở khóa sau khi vượt qua màn ${stage}.` })}
        className={twMerge(
          'flex h-full w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-paper/15 bg-black/20 text-paper/40 transition-colors duration-150 hover:border-paper/30 hover:text-paper/60',
          className
        )}
        aria-label={`Vị trí ${loc.index + 1} đang khóa, mở sau màn ${stage}`}>
        
        <LockIcon className="h-5 w-5" />
        <span className="font-display text-xs font-semibold uppercase tracking-wide">Màn {stage}</span>
      </button>);

  }

  return (
    <div
      ref={setNodeRef}
      className={twMerge(
        'relative flex h-full w-full items-center justify-center rounded-lg transition-[background-color,box-shadow] duration-150',
        !card && 'border border-dashed border-gold/25 bg-army-900/40',
        state === 'valid' && 'bg-gold/15 shadow-[0_0_0_2px_#D8AD62]',
        state === 'invalid' && 'bg-flag/15 shadow-[0_0_0_2px_#C83B3B]',
        className
      )}>
      
      {card ?
      <DraggableCard
        id={id}
        loc={loc}
        card={card}
        disabled={disabled}
        active={active}
        activeSkill={activeSkill}
        highlight={highlightUid === card.uid}
        onOpen={() => openDetail(card, loc)} /> :


      <span className="font-display text-sm font-semibold text-paper/25">{loc.index + 1}</span>
      }
      {overlay}
    </div>);

}