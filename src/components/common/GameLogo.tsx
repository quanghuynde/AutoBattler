import React from 'react';
import { StarIcon } from 'lucide-react';

export function GameLogo({ compact = false }: {compact?: boolean;}) {
  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded bg-flag">
          <StarIcon className="h-4 w-4 fill-gold text-gold" />
        </span>
        <span className="hidden font-display text-base font-extrabold uppercase leading-[0.95] tracking-wide text-paper sm:block">
          Kháng chiến
          <span className="block text-[11px] font-semibold tracking-[0.2em] text-gold">Dòng lịch sử</span>
        </span>
      </div>);

  }
  return (
    <div className="text-center">
      <h1 className="font-display text-6xl font-extrabold uppercase leading-[0.9] tracking-wide text-paper sm:text-8xl">Kháng chiến</h1>
      <p className="mt-2 font-display text-2xl font-bold uppercase tracking-[0.35em] text-gold sm:text-3xl">Dòng lịch sử</p>
    </div>);

}