import React, { useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { CrosshairIcon, ShieldHalfIcon } from 'lucide-react';
import type { CombatDisplay } from '../../hooks/useCombatRunner';
import type { Stage } from '../../types/game';
import { counterDamage } from '../../utils/damage';
import { FloatLayer } from './FloatLayer';

interface EnemySideProps {
  stage: Stage;
  display: CombatDisplay;
}

export function EnemySide({ stage, display }: EnemySideProps) {
  const body = useAnimationControls();
  const flash = useAnimationControls();

  useEffect(() => {
    if (display.enemyHit === 0) return;
    void body.start({ x: [0, 6, -5, 3, 0], transition: { duration: 0.22, ease: 'easeOut' } });
    void flash.start({ opacity: [0, 0.4, 0], transition: { duration: 0.2, ease: 'easeOut' } });
  }, [display.enemyHit, body, flash]);

  useEffect(() => {
    if (display.counterHit === 0) return;
    void body.start({ x: [0, -18, 0], transition: { duration: 0.26, ease: 'easeOut' } });
  }, [display.counterHit, body]);

  const pct = Math.min(100, display.damage / stage.target * 100);
  const isChallenge = stage.enemy.kind === 'challenge';

  return (
    <div className="relative flex w-full flex-col items-center">
      <div className="mb-2 flex items-center gap-2">
        <CrosshairIcon className="h-5 w-5 text-paper/70" />
        <span className="font-display text-xl font-extrabold uppercase tracking-[0.2em] text-paper">{isChallenge ? 'Thử thách' : 'Đối thủ'}</span>
      </div>

      <div className="relative w-full max-w-[300px]">
        <FloatLayer floats={display.floats} target="enemy" className="-top-2" size="lg" />
        <motion.div animate={body} className="relative overflow-hidden rounded-xl border-2 border-paper/20 bg-ink shadow-xl">
          <img src={stage.enemy.image} alt={stage.enemy.name} className="aspect-[4/3] w-full object-cover grayscale-[.2]" />
          <motion.div initial={{ opacity: 0 }} animate={flash} className="pointer-events-none absolute inset-0 bg-paper" />
          <div className="absolute inset-x-0 bottom-0 bg-ink/85 px-3 py-2">
            <p className="font-display text-base font-bold uppercase leading-tight text-paper">{stage.enemy.name}</p>
            <p className="line-clamp-1 text-[11px] text-paper/60">{stage.enemy.description}</p>
          </div>
        </motion.div>
      </div>

      <div className="mt-3 w-full max-w-[300px]">
        <div className="flex items-center justify-between font-display text-sm font-bold uppercase tracking-wide">
          <span className="text-paper/85">Sát thương nhận</span>
          <span>{Math.round(pct)}%</span>
        </div>
        <div className="mt-1 h-3 overflow-hidden rounded-full bg-black/40 ring-1 ring-paper/10">
          <div className="h-full rounded-full bg-gold transition-[width] duration-300 ease-out" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-paper/60">
          <span className="flex items-center gap-1">
            <ShieldHalfIcon className="h-3 w-3" /> Kháng {Math.round(stage.enemy.resist * 100)}%
          </span>
          <span>Phản công lượt 2·4·6·8: −{counterDamage(stage.id)} Ý chí</span>
        </div>
      </div>
    </div>);

}