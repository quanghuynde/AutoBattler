import React, { useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { HeartIcon, ShieldIcon, SparklesIcon } from 'lucide-react';
import { BALANCE } from '../../data/balance';
import { IMAGES } from '../../data/images';
import type { CombatDisplay } from '../../hooks/useCombatRunner';
import { FloatLayer } from './FloatLayer';

interface PlayerSide3DProps {
  display: CombatDisplay;
}

export function PlayerSide3D({ display }: PlayerSide3DProps) {
  const tankControls = useAnimationControls();
  const flashControls = useAnimationControls();
  const muzzleControls = useAnimationControls();

  // Tank firing recoil & muzzle blast
  useEffect(() => {
    if (display.projectile === 0) return;
    void tankControls.start({
      x: [0, -12, 4, 0],
      y: [0, 4, -2, 0],
      rotateZ: [0, -2.5, 0.5, 0],
      transition: { duration: 0.28, ease: 'easeOut' }
    });
    void muzzleControls.start({
      scale: [0, 1.4, 0],
      opacity: [1, 0.9, 0],
      transition: { duration: 0.22, ease: 'easeOut' }
    });
  }, [display.projectile, tankControls, muzzleControls]);

  // Tank damaged recoil & hit flash
  useEffect(() => {
    if (display.counterHit === 0) return;
    void tankControls.start({
      x: [0, -14, 10, -6, 2, 0],
      y: [0, 6, -4, 2, 0],
      rotateZ: [0, -4, 3, -1, 0],
      transition: { duration: 0.38, ease: 'easeOut' }
    });
    void flashControls.start({
      opacity: [0, 0.65, 0],
      transition: { duration: 0.32, ease: 'easeOut' }
    });
  }, [display.counterHit, tankControls, flashControls]);

  const willPct = Math.max(0, Math.min(100, (display.will / BALANCE.maxWill) * 100));

  return (
    <div className="relative flex w-full flex-col items-center [perspective:1000px]">
      {/* 3D Title Header */}
      <div className="mb-3 flex items-center gap-2 [transform:translateZ(20px)]">
        <FlagMark3D />
        <span className="font-display text-xl font-extrabold uppercase tracking-[0.2em] text-paper drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Quân ta
        </span>
      </div>

      {/* 3D Platform & Mechanized Tank Container */}
      <div className="relative w-full max-w-[320px] [transform-style:preserve-3d]">
        <FloatLayer floats={display.floats} target="player" className="top-14 z-50" size="lg" />

        {/* 3D Pedestal Base / Ground Shadow */}
        <div
          className="pointer-events-none absolute -bottom-6 left-1/2 h-20 w-72 -translate-x-1/2 rounded-full bg-gold/15 blur-xl [transform:rotateX(75deg)]"
        />
        <div
          className="pointer-events-none absolute -bottom-3 left-1/2 h-10 w-64 -translate-x-1/2 rounded-[50%] bg-black/60 blur-md [transform:rotateX(70deg)]"
        />

        {/* 3D Hexagonal Pedestal Stand */}
        <div
          className="relative rounded-2xl border-2 border-gold/60 bg-gradient-to-b from-army-800 via-army-900 to-black p-2.5 shadow-[0_16px_36px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.25)] [transform:rotateX(8deg)_rotateY(10deg)_translateZ(10px)]"
        >
          {/* Neon tactical rim */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-gold/40" />

          {/* 3D Tank Showcase Card */}
          <motion.div
            animate={tankControls}
            className="relative overflow-hidden rounded-xl border border-gold/40 bg-army-950 shadow-2xl [transform-style:preserve-3d]"
          >
            <img
              src={IMAGES.tank}
              alt="Xe tăng Quân đội nhân dân Việt Nam"
              className="aspect-[4/3] w-full object-cover transition-transform duration-300"
            />

            {/* Vietnam Waving Flag in 3D */}
            <div className="absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded bg-black/70 px-2 py-0.5 text-[11px] font-bold text-gold backdrop-blur-sm border border-gold/30 [transform:translateZ(18px)]">
              <span className="inline-block h-2.5 w-3.5 rounded-[2px] bg-flag relative overflow-hidden">
                <span className="absolute inset-0 flex items-center justify-center text-[7px] text-gold font-bold">★</span>
              </span>
              <span>T-54B</span>
            </div>

            {/* Hit damage flash overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={flashControls}
              className="pointer-events-none absolute inset-0 bg-flag/80 z-20"
            />

            {/* 3D Muzzle Flash burst on cannon fire */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={muzzleControls}
              className="pointer-events-none absolute right-1 top-[42%] z-30 h-14 w-14 -translate-y-1/2 rounded-full bg-gradient-to-r from-gold via-amber-400 to-transparent blur-[2px] [transform:translateZ(30px)]"
            >
              <div className="h-full w-full rounded-full bg-white blur-sm opacity-90" />
            </motion.div>

            {/* 3D Armor Indicator Badge */}
            {display.armor > 0 && (
              <span className="absolute right-2 top-2 z-20 flex items-center gap-1 rounded bg-gold px-2 py-0.5 font-display text-xs font-bold text-ink shadow-[0_2px_8px_rgba(216,173,98,0.6)] [transform:translateZ(25px)]">
                <ShieldIcon className="h-3.5 w-3.5" />
                {display.armor} GIÁP
              </span>
            )}

            {/* 3D Holographic Base Grid Bar */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-2 text-center">
              <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-gold/90">
                <SparklesIcon className="h-3 w-3" /> Lực lượng cơ động
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3D Holographic Ý Chí Status HUD */}
      <div className="mt-4 w-full max-w-[320px] rounded-xl border border-paper/15 bg-black/60 p-2.5 backdrop-blur-md shadow-lg [transform:translateZ(15px)]">
        <div className="flex items-center justify-between font-display text-sm font-bold uppercase tracking-wide">
          <span className="flex items-center gap-1.5 text-paper/90">
            <HeartIcon className="h-4 w-4 fill-flag text-flag drop-shadow-[0_0_6px_rgba(217,37,43,0.8)]" />
            Ý chí chiến đấu
          </span>
          <span className="text-paper tabular-nums">
            {display.will} / {BALANCE.maxWill}
          </span>
        </div>
        <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-black/60 p-0.5 ring-1 ring-paper/15">
          <div
            className="h-full rounded-full bg-gradient-to-r from-flag to-rose-400 transition-[width] duration-300 ease-out shadow-[0_0_8px_rgba(217,37,43,0.8)]"
            style={{ width: `${willPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function FlagMark3D() {
  return (
    <span className="inline-grid h-5 w-7 place-items-center rounded-[3px] bg-flag text-[10px] text-gold font-bold shadow-[0_0_8px_rgba(217,37,43,0.6)] border border-gold/40">
      ★
    </span>
  );
}

