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
  damage: 'text-amber-300 drop-shadow-[0_2px_6px_rgba(0,0,0,1)] drop-shadow-[0_0_14px_rgba(245,158,11,0.9)] [text-shadow:_0_2px_4px_#000]',
  buff: 'text-paper bg-army-600/95 px-2 py-0.5 rounded-md shadow-lg border border-army-400/30 font-bold',
  armor: 'text-ink bg-paper/95 px-2 py-0.5 rounded-md font-extrabold shadow-lg border border-white/50',
  counter: 'text-paper bg-flag/95 px-2 py-0.5 rounded-md font-extrabold shadow-lg border border-red-300/40'
};

export function FloatLayer({ floats, target, className, size = 'sm' }: FloatLayerProps) {
  const items = floats.filter((f) => f.target === target).slice(-3);
  return (
    <div
      className={twMerge(
        'pointer-events-none absolute left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-1 [transform:translateZ(90px)]',
        className
      )}
    >
      <AnimatePresence>
        {items.map((f) => (
          <motion.span
            key={f.id}
            initial={{ opacity: 0, y: 14, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1.15 }}
            exit={{ opacity: 0, y: -24, scale: 0.95 }}
            transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
            className={twMerge(
              'whitespace-nowrap font-display font-black tracking-wide',
              size === 'lg' ? 'text-3xl md:text-4xl' : 'text-lg md:text-xl',
              f.tone !== 'damage' && (size === 'lg' ? 'text-sm md:text-base' : 'text-xs'),
              TONES[f.tone]
            )}
          >
            {f.text}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
