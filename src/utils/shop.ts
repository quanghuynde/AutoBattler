import { BALANCE } from '../data/balance';
import { cards } from '../data/cards';
import type { CardType, ShopItem, Tier } from '../types/game';
import { pickRandom, uid, weightedIndex } from './random';

export function tierOdds(stage: number): number[] {
  const row = BALANCE.shopOdds.find((r) => stage >= r.from && stage <= r.to);
  return row ? row.odds : BALANCE.shopOdds[BALANCE.shopOdds.length - 1].odds;
}

export function rollTier(stage: number): Tier {
  return weightedIndex(tierOdds(stage)) + 1 as Tier;
}

export function rollType(): CardType {
  return Math.random() < BALANCE.attackChance ? 'attack' : 'support';
}

function pickCardId(tier: Tier, type: CardType): string {
  const exact = cards.filter((c) => c.tier === tier && c.type === type);
  const pool = exact.length > 0 ? exact : cards.filter((c) => c.tier === tier);
  return (pickRandom(pool) ?? cards[0]).id;
}

export function createShopItem(stage: number, forceType?: CardType): ShopItem {
  const tier = rollTier(stage);
  const type = forceType ?? rollType();
  return { id: uid('s'), cardId: pickCardId(tier, type), star: 1, sold: false };
}

/** 5 random slots, duplicates allowed, guarantees at least one support card. */
export function generateShop(stage: number): ShopItem[] {
  const items = Array.from({ length: BALANCE.shopSize }, () => createShopItem(stage));
  const hasSupport = items.some((i) => cards.find((c) => c.id === i.cardId)?.type === 'support');
  if (!hasSupport) {
    const idx = Math.floor(Math.random() * items.length);
    items[idx] = createShopItem(stage, 'support');
  }
  return items;
}