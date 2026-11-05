import React, { useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { CrosshairIcon, ShieldHalfIcon, SkullIcon } from 'lucide-react';
import type { CombatDisplay } from '../../hooks/useCombatRunner';
import type { Stage } from '../../types/game';
import { counterDamage } from '../../utils/damage';
import { FloatLayer } from './FloatLayer';

interface EnemySide3DProps {
  stage: Stage;
  display: CombatDisplay;
}

export function EnemySide3D({ stage, display }: EnemySide3DProps) {
  const fortressControls = useAnimationControls();
  const flashControls = useAnimationControls();
  const counterMuzzle = useAnimationControls();

  // Hit reaction: structural tremor & flash
  useEffect(() => {
    if (display.enemyHit === 0) return;
    void fortressControls.start({
      x: [0, 10, -8, 5, -2, 0],
      y: [0, -4, 3, -2, 0],
      rotateZ: [0, 2, -1.8, 1, 0],
      transition: { duration: 0.32, ease: 'easeOut' }
    });
    void flashControls.start({
      opacity: [0, 0.75, 0],
      transition: { duration: 0.24, ease: 'easeOut' }
    });
  }, [display.enemyHit, fortressControls, flashControls]);

  // Enemy counterattack lunge & fire
  useEffect(() => {
    if (display.counterHit === 0) return;
    void fortressControls.start({
      x: [0, -20, 4, 0],
      scale: [1, 1.04, 0.98, 1],
      transition: { duration: 0.34, ease: 'easeOut' }
    });
    void counterMuzzle.start({
      scale: [0, 1.5, 0],
      opacity: [1, 0.85, 0],
      transition: { duration: 0.24, ease: 'easeOut' }
    });
  }, [display.counterHit, fortressControls, counterMuzzle]);

  const pct = Math.min(100, (display.damage / stage.target) * 100);
  const isChallenge = stage.enemy.kind === 'challenge';

  return (
    <div className="relative flex w-full flex-col items-center [perspective:1000px]">
      {/* 3D Title Header */}
      <div className="mb-3 flex items-center gap-2 [transform:translateZ(20px)]">
        <CrosshairIcon className="h-5 w-5 text-paper/80 drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
        <span className="font-display text-xl font-extrabold uppercase tracking-[0.2em] text-paper drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {isChallenge ? 'Thử thách' : 'Đối thủ'}
        </span>
      </div>

      {/* 3D Platform & Fortified Outpost Container */}
      <div className="relative w-full max-w-[320px] [transform-style:preserve-3d]">
        <FloatLayer floats={display.floats} target="enemy" className="top-14 z-50" size="lg" />

        {/* 3D Pedestal Base / Ground Shadow */}
        <div
          className="pointer-events-none absolute -bottom-6 left-1/2 h-20 w-72 -translate-x-1/2 rounded-full bg-red-500/10 blur-xl [transform:rotateX(75deg)]"
        />
        <div
          className="pointer-events-none absolute -bottom-3 left-1/2 h-10 w-64 -translate-x-1/2 rounded-[50%] bg-black/60 blur-md [transform:rotateX(70deg)]"
        />

        {/* 3D Concrete Fortified Stand */}
        <div
          className="relative rounded-2xl border-2 border-paper/30 bg-gradient-to-b from-stone-800 via-stone-900 to-black p-2.5 shadow-[0_16px_36px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] [transform:rotateX(8deg)_rotateY(-10deg)_translateZ(10px)]"
        >
          {/* Tactical warning rim */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-red-500/30" />

          {/* 3D Fortress Showcase Card */}
          <motion.div
            animate={fortressControls}
            className="relative overflow-hidden rounded-xl border border-paper/20 bg-stone-950 shadow-2xl [transform-style:preserve-3d]"
          >
            <img
              src={stage.enemy.image}
              alt={stage.enemy.name}
              className="aspect-[4/3] w-full object-cover grayscale-[.15] transition-transform duration-300"
            />

            {/* Stage Identification Tag in 3D */}
            <div className="absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded bg-black/75 px-2 py-0.5 text-[11px] font-bold text-paper backdrop-blur-sm border border-paper/20 [transform:translateZ(18px)]">
              <SkullIcon className="h-3 w-3 text-red-400" />
              <span>Màn {stage.id}</span>
            </div>

            {/* Red / White Hit Damage Flash */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={flashControls}
              className="pointer-events-none absolute inset-0 bg-red-600/70 z-20"
            />

            {/* Counterattack muzzle flash burst */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={counterMuzzle}
              className="pointer-events-none absolute left-2 top-[42%] z-30 h-14 w-14 -translate-y-1/2 rounded-full bg-gradient-to-l from-red-600 via-rose-500 to-transparent blur-[2px] [transform:translateZ(30px)]"
            >
              <div className="h-full w-full rounded-full bg-white blur-sm opacity-90" />
            </motion.div>

            {/* Description overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent px-3 py-2 text-left [transform:translateZ(16px)]">
              <p className="font-display text-sm font-bold uppercase leading-tight text-paper drop-shadow">
                {stage.enemy.name}
              </p>
              <p className="line-clamp-1 text-[11px] text-paper/70">{stage.enemy.description}</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3D Holographic Sát Thương Nhận Status HUD */}
      <div className="mt-4 w-full max-w-[320px] rounded-xl border border-paper/15 bg-black/60 p-2.5 backdrop-blur-md shadow-lg [transform:translateZ(15px)]">
        <div className="flex items-center justify-between font-display text-sm font-bold uppercase tracking-wide">
          <span className="text-paper/90">Sát thương nhận</span>
          <span className="text-gold tabular-nums drop-shadow-[0_0_8px_rgba(216,173,98,0.6)]">
            {Math.round(pct)}%
          </span>
        </div>
        <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-black/60 p-0.5 ring-1 ring-paper/15">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 via-gold to-yellow-300 transition-[width] duration-300 ease-out shadow-[0_0_8px_rgba(216,173,98,0.7)]"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-paper/75 font-medium">
          <span className="flex items-center gap-1 text-gold/90">
            <ShieldHalfIcon className="h-3.5 w-3.5" /> Kháng {Math.round(stage.enemy.resist * 100)}%
          </span>
          <span className="text-red-300/90 font-mono">
            Phản công: −{counterDamage(stage.id)} Ý chí
          </span>
        </div>
      </div>
    </div>
  );
}

