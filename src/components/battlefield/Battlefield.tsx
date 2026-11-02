import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2Icon, LinkIcon, SwordsIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { BALANCE } from '../../data/balance';
import { IMAGES } from '../../data/images';
import type { CombatDisplay } from '../../hooks/useCombatRunner';
import type { Stage } from '../../types/game';
import { Button } from '../common/Button';
import { EnemySide } from './EnemySide';
import { MilestoneTrack } from './MilestoneTrack';
import { PlayerSide } from './PlayerSide';

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

export function Battlefield({ stage, display, inBattle, fieldedCount, activeCombos, onStart, onOpenCombos }: BattlefieldProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <img src={IMAGES.battlefield} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-army-900/70" />

      {activeCombos.length > 0 &&
      <button
        type="button"
        onClick={onOpenCombos}
        className="absolute left-3 top-3 z-10 flex max-w-[calc(100%-1.5rem)] flex-wrap items-center gap-1.5 rounded-md bg-black/40 px-2 py-1.5 text-left transition-colors duration-150 hover:bg-black/55">
        
          <LinkIcon className="h-3.5 w-3.5 text-gold" />
          {activeCombos.slice(0, 5).map((c) =>
        <span key={c} className="rounded bg-gold/90 px-1.5 py-0.5 font-display text-xs font-bold uppercase text-ink">
              {c}
            </span>
        )}
          {activeCombos.length > 5 && <span className="text-xs text-paper/70">+{activeCombos.length - 5}</span>}
        </button>
      }

      <div className="relative grid h-full grid-cols-2 content-center items-center gap-x-4 gap-y-6 px-4 pb-4 pt-14 md:grid-cols-[1fr_minmax(260px,340px)_1fr] md:gap-6 md:px-8">
        <PlayerSide display={display} />

        <div className="order-last col-span-2 flex flex-col items-center md:order-none md:col-span-1">
          <span className="font-display text-5xl font-extrabold italic text-flag drop-shadow-[0_2px_0_rgba(0,0,0,0.6)] md:text-6xl">VS</span>

          {inBattle ?
          <>
              <div className="mt-2 flex items-center gap-2">
                <span className="font-display text-lg font-bold uppercase tracking-wide">
                  Lượt {Math.max(display.turn, 1)}/{BALANCE.maxTurns}
                </span>
                <span className="flex gap-0.5">
                  {Array.from({ length: BALANCE.maxTurns }, (_, i) =>
                <span
                  key={i}
                  className={twMerge(
                    'h-2 w-3 rounded-sm',
                    i < display.turn ? 'bg-gold' : 'bg-paper/15',
                    BALANCE.counterTurns.includes(i + 1) && i >= display.turn && 'bg-flag/40'
                  )} />

                )}
                </span>
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-paper/60">Tổng sát thương</p>
              <p className="font-display text-5xl font-extrabold tabular-nums text-gold">{display.damage.toLocaleString('vi-VN')}</p>
              <p className="text-sm text-paper/60">mục tiêu {stage.target.toLocaleString('vi-VN')}</p>
            </> :

          <>
              <p className="mt-2 text-center font-display text-lg font-bold uppercase tracking-wide">{stage.name}</p>
              <p className="text-sm text-paper/60">Mục tiêu {stage.target.toLocaleString('vi-VN')} sát thương</p>
              <Button variant="primary" size="lg" className="mt-4 w-full" onClick={onStart} disabled={fieldedCount === 0}>
                <SwordsIcon className="h-5 w-5" />
                Xuất kích
              </Button>
              <p className="mt-2 text-center text-xs text-paper/55">
                {fieldedCount === 0 ? 'Đưa ít nhất 1 thẻ vào đội hình.' : 'Kéo thả để sắp xếp đội hình trước khi xuất kích.'}
              </p>
            </>
          }

          <div className="mt-4 w-full">
            <MilestoneTrack damage={display.damage} target={stage.target} reached={display.milestones} />
          </div>
          <AnimatePresence>
            {inBattle && display.milestones[0] &&
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="mt-2 flex items-center gap-1 text-xs font-semibold text-gold">
              
                <CheckCircle2Icon className="h-3.5 w-3.5" /> Đã đủ điều kiện vượt màn
              </motion.p>
            }
          </AnimatePresence>
          {!inBattle && <p className="mt-2 text-[11px] text-paper/50">* Bắt buộc đạt mốc 1 để vượt màn</p>}
        </div>

        <EnemySide stage={stage} display={display} />
      </div>

      <AnimatePresence>
        {display.projectile > 0 &&
        <motion.span
          key={display.projectile}
          initial={{ left: '30%', opacity: 0 }}
          animate={{ left: '66%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 0.26, ease: 'easeOut' }}
          className="pointer-events-none absolute top-[40%] z-20 hidden h-1.5 w-20 rounded-full bg-gold shadow-[0_0_10px_#D8AD62] md:block" />

        }
      </AnimatePresence>

      <AnimatePresence>
        {display.banner &&
        <motion.div
          key={display.banner}
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="absolute left-1/2 top-3 z-20 -translate-x-1/2 whitespace-nowrap rounded-md bg-gold px-4 py-1.5 font-display text-base font-bold uppercase text-ink shadow-lg">
          
            {display.banner}
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}