import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FlameIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { BALANCE } from '../../data/balance';
import type { FloatingText } from '../../hooks/useCombatRunner';

interface ResistanceMeterProps {
  value: number;
  floats?: FloatingText[];
  className?: string;
}

export function ResistanceMeter({ value, floats = [], className }: ResistanceMeterProps) {
  const full = value >= BALANCE.maxResistance;
  const bonus = Math.round(value * BALANCE.resistancePerPoint * 100);
  return (
    <div className={twMerge('relative flex items-center gap-2', className)} title="Kháng chiến: mỗi điểm +2% sát thương toàn đội (tối đa 20)">
      <FlameIcon className={twMerge('h-4 w-4 shrink-0', value > 0 ? 'text-flag' : 'text-paper/40')} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2 font-display text-xs uppercase tracking-wide">
          <span className="font-bold text-paper/80">Kháng chiến</span>
          <span className={twMerge('font-bold', full ? 'text-gold' : 'text-paper')}>
            {full ? 'ĐẦY' : `${value}/${BALANCE.maxResistance}`} · +{bonus}%
          </span>
        </div>
        <div className="mt-1 grid grid-cols-20 gap-px" style={{ gridTemplateColumns: `repeat(${BALANCE.maxResistance}, minmax(0, 1fr))` }}>
          {Array.from({ length: BALANCE.maxResistance }, (_, i) =>
          <span
            key={i}
            className={twMerge(
              'h-2 rounded-[1px] transition-colors duration-200',
              i < value ? full ? 'bg-gold' : 'bg-flag' : 'bg-paper/10'
            )} />

          )}
        </div>
      </div>
      <AnimatePresence>
        {floats.
        filter((f) => f.target === 'resistance').
        map((f) =>
        <motion.span
          key={f.id}
          initial={{ opacity: 0, y: 6, scale: 0.96 }}
          animate={{ opacity: 1, y: -2, scale: 1 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="pointer-events-none absolute -bottom-6 right-0 whitespace-nowrap rounded bg-flag px-1.5 py-0.5 font-display text-xs font-bold text-paper">
          
              {f.text}
            </motion.span>
        )}
      </AnimatePresence>
    </div>);

}