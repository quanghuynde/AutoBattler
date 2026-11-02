import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import type { FloatTarget, FloatTone, FloatingText } from '../../hooks/useCombatRunner';

interface FloatLayerProps {
  floats: FloatingText[];
  target: FloatTarget;
  className?: string;
  size?: 'sm' | 'lg';
}

const TONES: Record<FloatTone, string> = {
  damage: 'text-gold',
  buff: 'text-paper bg-army-600/90 px-1.5 rounded',
  armor: 'text-ink bg-paper/90 px-1.5 rounded',
  counter: 'text-paper bg-flag px-1.5 rounded'
};

export function FloatLayer({ floats, target, className, size = 'sm' }: FloatLayerProps) {
  const items = floats.filter((f) => f.target === target).slice(-3);
  return (
    <div className={twMerge('pointer-events-none absolute left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-0.5', className)}>
      <AnimatePresence>
        {items.map((f) =>
        <motion.span
          key={f.id}
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className={twMerge(
            'whitespace-nowrap font-display font-extrabold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]',
            size === 'lg' ? 'text-3xl' : 'text-lg',
            f.tone !== 'damage' && (size === 'lg' ? 'text-base' : 'text-xs'),
            TONES[f.tone]
          )}>
          
            {f.text}
          </motion.span>
        )}
      </AnimatePresence>
    </div>);

}