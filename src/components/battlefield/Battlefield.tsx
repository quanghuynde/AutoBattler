import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BoxIcon, CheckCircle2Icon, CompassIcon, LinkIcon, SwordsIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { BALANCE } from '../../data/balance';
import { IMAGES } from '../../data/images';
import type { CombatDisplay } from '../../hooks/useCombatRunner';
import type { Stage } from '../../types/game';
import { Button } from '../common/Button';
import { CombatFx3D } from './CombatFx3D';
import { EnemySide3D } from './EnemySide3D';
import { MilestoneTrack } from './MilestoneTrack';
import { PlayerSide3D } from './PlayerSide3D';

interface BattlefieldProps {
  stage: Stage;
  display: CombatDisplay;
  inBattle: boolean;
  fieldedCount: number;
  activeCombos: string[];
  onStart: () => void;
  onOpenCombos: () => void;
}

const EASE = [0.23, 1, 0.32, 1] as const;

export function Battlefield({
  stage,
  display,
  inBattle,
  fieldedCount,
  activeCombos,
  onStart,
  onOpenCombos
}: BattlefieldProps) {
  // Interactive 3D mouse parallax camera tilt
  const [tilt, setTilt] = useState({ rotateX: 6, rotateY: 0 });
  const [cameraMode, setCameraMode] = useState<'3d-tactical' | '3d-cinematic'>('3d-tactical');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    const maxRotX = cameraMode === '3d-tactical' ? 10 : 16;
    const maxRotY = cameraMode === '3d-tactical' ? 12 : 20;
    setTilt({
      rotateX: 6 - ny * maxRotX,
      rotateY: nx * maxRotY
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: cameraMode === '3d-tactical' ? 6 : 12, rotateY: 0 });
  };

  const toggleCameraMode = () => {
    setCameraMode((prev) => (prev === '3d-tactical' ? '3d-cinematic' : '3d-tactical'));
    setTilt({ rotateX: cameraMode === '3d-tactical' ? 12 : 6, rotateY: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-full w-full overflow-hidden select-none [perspective:1200px]"
    >
      {/* Background Military Map Texture with Vignette */}
      <img
        src={IMAGES.battlefield}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-50 scale-105 transition-transform duration-700 ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-army-950/85 via-army-900/70 to-army-950/95" />

      {/* 3D Real-time Ballistic Canvas Overlay */}
      <CombatFx3D display={display} inBattle={inBattle} />

      {/* Top Left: Active Combos List */}
      {activeCombos.length > 0 && (
        <button
          type="button"
          onClick={onOpenCombos}
          className="absolute left-3 top-3 z-30 flex max-w-[calc(100%-1.5rem)] flex-wrap items-center gap-1.5 rounded-md bg-black/60 backdrop-blur-md px-2.5 py-1.5 text-left transition-colors duration-150 hover:bg-black/75 border border-paper/15 shadow-lg"
        >
          <LinkIcon className="h-3.5 w-3.5 text-gold" />
          {activeCombos.slice(0, 5).map((c) => (
            <span
              key={c}
              className="rounded bg-gold/90 px-1.5 py-0.5 font-display text-xs font-bold uppercase text-ink shadow-sm"
            >
              {c}
            </span>
          ))}
          {activeCombos.length > 5 && (
            <span className="text-xs text-paper/70">+{activeCombos.length - 5}</span>
          )}
        </button>
      )}

      {/* Top Right: 3D Perspective Mode Indicator & Toggle */}
      <div className="absolute right-3 top-3 z-30 flex items-center gap-2">
        <button
          type="button"
          onClick={toggleCameraMode}
          className="flex items-center gap-1.5 rounded-full border border-gold/40 bg-black/60 px-3 py-1 font-display text-xs font-bold uppercase tracking-wider text-gold shadow-md backdrop-blur-md hover:bg-gold hover:text-ink transition-colors"
          title="Nhấn để đổi góc nhìn 3D"
        >
          <BoxIcon className="h-3.5 w-3.5" />
          <span>{cameraMode === '3d-tactical' ? 'Sa bàn 3D' : 'Góc quay 3D'}</span>
        </button>
      </div>

      {/* 3D Tilted Floor Grid (Tactical Holographic Terrain) */}
      <div
        className="pointer-events-none absolute inset-x-[-20%] bottom-[-15%] h-[75%] opacity-45 [transform:rotateX(66deg)_translateZ(-50px)] [transform-origin:bottom_center]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(216, 173, 98, 0.22) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(216, 173, 98, 0.22) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 15%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 15%, transparent 75%)'
        }}
      >
        {/* Animated radar rings on the 3D ground */}
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/30 animate-pulse" />
        <div className="absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/15" />
      </div>

      {/* Main 3D Battlefield Stage Container */}
      <motion.div
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className="relative grid h-full grid-cols-2 content-center items-center gap-x-4 gap-y-6 px-4 pb-4 pt-14 md:grid-cols-[1fr_minmax(260px,360px)_1fr] md:gap-6 md:px-8 [transform-style:preserve-3d]"
      >
        {/* Left: 3D Player Unit (Quân Ta) */}
        <PlayerSide3D display={display} />

        {/* Center: Command Center Deck & Milestone Track */}
        <div className="order-last col-span-2 flex flex-col items-center md:order-none md:col-span-1 [transform:translateZ(30px)]">
          {/* 3D Metallic VS Badge */}
          <div className="relative flex items-center justify-center">
            <span className="font-display text-5xl font-extrabold italic text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 via-flag to-red-700 drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)] md:text-6xl tracking-tight">
              VS
            </span>
          </div>

          {inBattle ? (
            <>
              <div className="mt-2 flex items-center gap-2">
                <span className="font-display text-lg font-bold uppercase tracking-wide text-paper drop-shadow">
                  Lượt {Math.max(display.turn, 1)}/{BALANCE.maxTurns}
                </span>
                <span className="flex gap-0.5">
                  {Array.from({ length: BALANCE.maxTurns }, (_, i) => (
                    <span
                      key={i}
                      className={twMerge(
                        'h-2 w-3 rounded-sm transition-all duration-300',
                        i < display.turn ? 'bg-gold shadow-[0_0_6px_#D8AD62]' : 'bg-paper/20',
                        BALANCE.counterTurns.includes(i + 1) &&
                          i >= display.turn &&
                          'bg-flag/50 ring-1 ring-flag/60'
                      )}
                    />
                  ))}
                </span>
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-paper/70">
                Tổng sát thương
              </p>
              <p className="font-display text-5xl font-extrabold tabular-nums text-gold drop-shadow-[0_0_15px_rgba(216,173,98,0.5)]">
                {display.damage.toLocaleString('vi-VN')}
              </p>
              <p className="text-sm text-paper/70">
                Mục tiêu: {stage.target.toLocaleString('vi-VN')}
              </p>
            </>
          ) : (
            <>
              <p className="mt-2 text-center font-display text-xl font-bold uppercase tracking-wide text-gold drop-shadow">
                {stage.name}
              </p>
              <p className="text-sm text-paper/75">
                Mục tiêu {stage.target.toLocaleString('vi-VN')} sát thương
              </p>
              <Button
                variant="primary"
                size="lg"
                className="mt-4 w-full shadow-[0_8px_20px_rgba(217,37,43,0.5)] hover:shadow-[0_10px_25px_rgba(217,37,43,0.7)] transition-all duration-200"
                onClick={onStart}
                disabled={fieldedCount === 0}
              >
                <SwordsIcon className="h-5 w-5" />
                Xuất kích
              </Button>
              <p className="mt-2 text-center text-xs text-paper/60">
                {fieldedCount === 0
                  ? 'Đưa ít nhất 1 thẻ vào đội hình.'
                  : 'Kéo thả để sắp xếp đội hình trước khi xuất kích.'}
              </p>
            </>
          )}

          {/* 3D Milestone Track */}
          <div className="mt-4 w-full rounded-xl bg-black/40 p-2 backdrop-blur-sm border border-paper/10 shadow-lg">
            <MilestoneTrack
              damage={display.damage}
              target={stage.target}
              reached={display.milestones}
            />
          </div>

          <AnimatePresence>
            {inBattle && display.milestones[0] && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="mt-2 flex items-center gap-1 text-xs font-semibold text-gold drop-shadow-[0_0_8px_rgba(216,173,98,0.7)]"
              >
                <CheckCircle2Icon className="h-3.5 w-3.5" /> Đã đủ điều kiện vượt màn
              </motion.p>
            )}
          </AnimatePresence>
          {!inBattle && (
            <p className="mt-2 text-[11px] text-paper/60 flex items-center gap-1">
              <CompassIcon className="h-3 w-3 text-gold" />* Bắt buộc đạt mốc 1 để vượt màn
            </p>
          )}
        </div>

        {/* Right: 3D Enemy Outpost (Đối Thủ) */}
        <EnemySide3D stage={stage} display={display} />
      </motion.div>

      {/* Milestone / Combo Floating Banner */}
      <AnimatePresence>
        {display.banner && (
          <motion.div
            key={display.banner}
            initial={{ opacity: 0, y: -8, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="absolute left-1/2 top-4 z-40 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gradient-to-r from-amber-500 via-gold to-yellow-400 px-5 py-2 font-display text-base font-extrabold uppercase text-ink shadow-[0_8px_25px_rgba(216,173,98,0.6)] border border-yellow-200"
          >
            {display.banner}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
