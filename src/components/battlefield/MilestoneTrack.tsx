import React from 'react';
import { CheckIcon, CoinsIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { BALANCE } from '../../data/balance';
import { milestoneThresholds } from '../../utils/reward';

interface MilestoneTrackProps {
  damage: number;
  target: number;
  reached: boolean[];
}

export function MilestoneTrack({ damage, target, reached }: MilestoneTrackProps) {
  const thresholds = milestoneThresholds(target);
  const pct = Math.min(100, damage / target * 100);
  return (
    <div className="w-full">
      <div className="relative h-3 rounded-full bg-black/40 ring-1 ring-paper/10">
        <div className="h-full rounded-full bg-gold transition-[width] duration-300 ease-out" style={{ width: `${pct}%` }} />
        {thresholds.map((t, i) =>
        <span
          key={i}
          className={twMerge('absolute top-1/2 h-5 w-0.5 -translate-y-1/2', reached[i] ? 'bg-paper' : 'bg-paper/30')}
          style={{ left: `calc(${BALANCE.milestones[i].ratio * 100}% - 1px)` }} />

        )}
      </div>
      <ol className="mt-2 grid grid-cols-4 gap-1">
        {thresholds.map((t, i) =>
        <li
          key={i}
          className={twMerge(
            'flex flex-col items-center rounded-md px-1 py-1 text-center transition-colors duration-200',
            reached[i] ? 'bg-gold text-ink' : 'bg-black/30 text-paper/60'
          )}>
          
            <span className="flex items-center gap-1 font-display text-[11px] font-bold uppercase">
              {reached[i] && <CheckIcon className="h-3 w-3" />}
              Mốc {i + 1}
              {i === 0 && !reached[0] && <span className="text-flag">*</span>}
            </span>
            <span className="font-display text-sm font-bold leading-tight">{t.toLocaleString('vi-VN')}</span>
            <span className="flex items-center gap-0.5 text-[10px] font-semibold">
              <CoinsIcon className="h-2.5 w-2.5" />+{BALANCE.milestones[i].coins}
            </span>
          </li>
        )}
      </ol>
    </div>);

}