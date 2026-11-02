import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Trash2Icon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface TrashZoneProps {
  disabled?: boolean;
  className?: string;
}

export function TrashZone({ disabled, className }: TrashZoneProps) {
  const { setNodeRef, isOver, active } = useDroppable({ id: 'trash', disabled });
  return (
    <div
      ref={setNodeRef}
      title={disabled ? 'Không thể bán thẻ trong trận' : 'Kéo thẻ vào đây để bán'}
      className={twMerge(
        'flex items-center justify-center gap-2 rounded-lg border border-dashed px-3 py-2 font-display text-sm font-bold uppercase tracking-wide transition-colors duration-150',
        disabled ? 'border-paper/10 text-paper/25' : 'border-flag/50 text-flag',
        active && !disabled && 'bg-flag/10',
        isOver && !disabled && 'border-flag bg-flag/30 text-paper',
        className
      )}>
      
      <Trash2Icon className="h-4 w-4" />
      Bán thẻ
    </div>);

}