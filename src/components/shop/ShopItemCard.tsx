import React from 'react';
import { CoinsIcon, ShoppingCartIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { TYPE_LABELS } from '../../data/labels';
import type { ShopItem } from '../../types/game';
import { buyPrice, getCardDef } from '../../utils/cards';
import { CardView } from '../cards/CardView';

interface ShopItemCardProps {
  item: ShopItem;
  coins: number;
  hasRoom: boolean;
  onBuy: () => void;
  onInspect: () => void;
}

export function ShopItemCard({ item, coins, hasRoom, onBuy, onInspect }: ShopItemCardProps) {
  const def = getCardDef(item.cardId);
  if (!def) return null;
  const price = buyPrice(def.tier);
  const affordable = coins >= price;
  const reason = item.sold ? 'Đã mua' : !affordable ? 'Không đủ xu' : !hasRoom ? 'Hết chỗ' : null;

  return (
    <article className={twMerge('flex flex-col rounded-xl border border-gold/20 bg-army-800 p-3', item.sold && 'opacity-45')}>
      <div className="mx-auto aspect-[5/7] w-full max-w-[170px]">
        <CardView instance={{ uid: item.id, cardId: item.cardId, star: item.star }} onClick={onInspect} />
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-xs">
        <span className={`rounded px-1.5 py-0.5 font-semibold ${def.type === 'attack' ? 'bg-flag' : 'bg-army-600'}`}>{TYPE_LABELS[def.type]}</span>
        <span className="text-paper/60">Cấp {def.tier}</span>
      </div>
      <p className="mt-1.5 font-display text-sm font-bold uppercase text-gold">{def.skill.name}</p>
      <p className="mb-3 mt-0.5 line-clamp-3 text-xs leading-snug text-paper/70">{def.skill.description}</p>
      <button
        type="button"
        onClick={onBuy}
        disabled={reason !== null}
        className="mt-auto flex h-10 items-center justify-center gap-2 rounded-md bg-gold font-display text-base font-bold uppercase text-ink transition-colors duration-150 hover:bg-gold-300 disabled:cursor-not-allowed disabled:bg-paper/15 disabled:text-paper/50">
        
        {reason ??
        <>
            <ShoppingCartIcon className="h-4 w-4" /> Mua
            <span className="flex items-center gap-0.5">
              · {price} <CoinsIcon className="h-3.5 w-3.5" />
            </span>
          </>
        }
      </button>
    </article>);

}