import React, { useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { HeartIcon, ShieldIcon } from 'lucide-react';
import { BALANCE } from '../../data/balance';
import { IMAGES } from '../../data/images';
import type { CombatDisplay } from '../../hooks/useCombatRunner';
import { FloatLayer } from './FloatLayer';

interface PlayerSideProps {
  display: CombatDisplay;
}

export function PlayerSide({ display }: PlayerSideProps) {
  const tank = useAnimationControls();
  const flash = useAnimationControls();

  useEffect(() => {
    if (display.projectile === 0) return;
    void tank.start({ x: [0, 10, 0], transition: { duration: 0.18, ease: 'easeOut' } });
  }, [display.projectile, tank]);

  useEffect(() => {
    if (display.counterHit === 0) return;
    void tank.start({ x: [0, -8, 6, -4, 0], transition: { duration: 0.28, ease: 'easeOut' } });
    void flash.start({ opacity: [0, 0.55, 0], transition: { duration: 0.28, ease: 'easeOut' } });
  }, [display.counterHit, tank, flash]);

  const willPct = Math.max(0, Math.min(100, display.will / BALANCE.maxWill * 100));

  return (
    <div className="relative flex w-full flex-col items-center">
      <div className="mb-2 flex items-center gap-2">
        <FlagMark />
        <span className="font-display text-xl font-extrabold uppercase tracking-[0.2em] text-paper">Quân ta</span>
      </div>

      <div className="relative w-full max-w-[300px]">
        <FloatLayer floats={display.floats} target="player" className="-top-2" size="lg" />
        <motion.div animate={tank} className="relative overflow-hidden rounded-xl border-2 border-gold/40 bg-army shadow-xl">
          <img src={IMAGES.tank} alt="Xe tăng Quân đội nhân dân Việt Nam" className="aspect-[4/3] w-full object-cover" />
          <motion.div initial={{ opacity: 0 }} animate={flash} className="pointer-events-none absolute inset-0 bg-flag" />
          {display.armor > 0 &&
          <span className="absolute right-2 top-2 flex items-center gap-1 rounded bg-paper px-1.5 py-0.5 font-display text-sm font-bold text-ink shadow">
              <ShieldIcon className="h-3.5 w-3.5" />
              {display.armor}
            </span>
          }
        </motion.div>
      </div>

      <div className="mt-3 w-full max-w-[300px]">
        <div className="flex items-center justify-between font-display text-sm font-bold uppercase tracking-wide">
          <span className="flex items-center gap-1 text-paper/85">
            <HeartIcon className="h-3.5 w-3.5 fill-flag text-flag" /> Ý chí chiến đấu
          </span>
          <span>
            {display.will}/{BALANCE.maxWill}
          </span>
        </div>
        <div className="mt-1 h-3 overflow-hidden rounded-full bg-black/40 ring-1 ring-paper/10">
          <div className="h-full rounded-full bg-flag transition-[width] duration-300 ease-out" style={{ width: `${willPct}%` }} />
        </div>
      </div>
    </div>);

}

function FlagMark() {
  return (
    <svg viewBox="0 0 30 20" className="h-5 w-7 rounded-[2px] shadow" aria-label="Cờ Việt Nam" role="img">
      <rect width="30" height="20" fill="#C83B3B" />
      <polygon fill="#F5C842" points="15,4 16.76,9.27 22.3,9.27 17.82,12.53 19.52,17.8 15,14.55 10.48,17.8 12.18,12.53 7.7,9.27 13.24,9.27" />
    </svg>);

}