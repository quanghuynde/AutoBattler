import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShieldIcon, SwordsIcon, TrendingUpIcon, ZapIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { TIER_COLORS } from '../../data/labels';
import type { CardInstance } from '../../types/game';
import { cardPower, formatPercent, resolveCard, skillValueLabel, supportBuffValue } from '../../utils/cards';
import { StarRow } from '../common/StarRow';

interface CardViewProps {
  instance: CardInstance;
  active?: boolean;
  activeSkill?: string | null;
  highlight?: boolean;
  onClick?: () => void;
  className?: string;
  showTooltip?: boolean;
}

const EASE = [0.23, 1, 0.32, 1] as const;

export function CardView({ instance, active, activeSkill, highlight, onClick, className, showTooltip = true }: CardViewProps) {
  const card = resolveCard(instance);
  if (!card) return null;
  const color = TIER_COLORS[card.tier];
  const isAttack = card.type === 'attack';

  return (
    <motion.div
      animate={{ scale: active ? 1.1 : 1, y: active ? -6 : 0 }}
      transition={{ duration: 0.18, ease: EASE }}
      onClick={onClick}
      className={twMerge(
        'group relative flex h-full w-full select-none flex-col rounded-lg bg-paper text-ink shadow-[0_4px_10px_rgba(0,0,0,0.35)]',
        onClick && 'cursor-pointer',
        active && 'z-20',
        className
      )}
      style={{
        border: `2px solid ${color}`,
        boxShadow: active ? `0 0 0 2px ${color}, 0 8px 20px rgba(0,0,0,0.45)` : undefined
      }}>
      
      <div className="relative min-h-0 flex-[1.15] overflow-hidden rounded-t-[6px] bg-army">
        <img src={card.image} alt="" draggable={false} className="h-full w-full object-cover sepia-[.3]" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-1">
          <span className="rounded px-1 font-display text-[11px] font-bold leading-4 text-ink" style={{ backgroundColor: color }}>
            C{card.tier}
          </span>
          <span className="rounded bg-ink/80 px-1 py-0.5">
            <StarRow star={card.star} size="h-2.5 w-2.5" />
          </span>
        </div>
        <span
          className={twMerge(
            'absolute bottom-1 left-1 grid h-5 w-5 place-items-center rounded-full text-paper',
            isAttack ? 'bg-flag' : 'bg-army'
          )}
          title={isAttack ? 'Thẻ tấn công' : 'Thẻ hỗ trợ'}>
          
          {isAttack ? <SwordsIcon className="h-3 w-3" /> : <ShieldIcon className="h-3 w-3" />}
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-1.5 pb-1 pt-0.5">
        <p className="line-clamp-2 font-display text-[12px] font-bold uppercase leading-[1.1] sm:text-[13px]">{card.name}</p>
        <div className="mt-auto flex items-center justify-between gap-1 pt-0.5">
          <span className="flex items-center gap-0.5 font-display text-[13px] font-bold">
            {isAttack ?
            <>
                <SwordsIcon className="h-3 w-3 text-flag" />
                {cardPower(card, card.star)}
              </> :

            <>
                <TrendingUpIcon className="h-3 w-3 text-army" />+{formatPercent(supportBuffValue(card, card.star))}
              </>
            }
          </span>
          <span className="relative">
            <span className="flex items-center gap-0.5 rounded bg-ink px-1 font-display text-[10px] font-semibold text-gold">
              <ZapIcon className="h-2.5 w-2.5" />
              {card.skill.cooldown}
            </span>
            {showTooltip &&
            <span className="pointer-events-none absolute bottom-full right-0 z-40 mb-2 hidden w-52 rounded-md border border-gold/30 bg-ink p-2 text-left text-paper shadow-xl group-hover:block">
                <span className="block font-display text-sm font-bold uppercase text-gold">{card.skill.name}</span>
                <span className="mt-0.5 block text-[11px] leading-snug text-paper/85">{card.skill.description}</span>
                <span className="mt-1 block text-[10px] text-paper/60">
                  Hồi chiêu: {card.skill.cooldown} lượt · {skillValueLabel(card, card.star)}
                </span>
              </span>
            }
          </span>
        </div>
      </div>

      <AnimatePresence>
        {active && activeSkill &&
        <motion.span
          initial={{ opacity: 0, y: 4, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.16, ease: EASE }}
          className="absolute -top-3 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded bg-gold px-1.5 py-0.5 font-display text-[11px] font-bold uppercase text-ink shadow">
          
            {activeSkill}
          </motion.span>
        }
      </AnimatePresence>

      <AnimatePresence>
        {highlight &&
        <motion.span
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="pointer-events-none absolute inset-0 grid place-items-center rounded-lg bg-gold/35 ring-4 ring-gold">
          
            <span className="rounded bg-ink px-2 py-0.5 font-display text-sm font-bold uppercase text-gold">Lên sao!</span>
          </motion.span>
        }
      </AnimatePresence>
    </motion.div>);

}