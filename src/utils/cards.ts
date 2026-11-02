import { BALANCE } from '../data/balance';
import { cards } from '../data/cards';
import type { Card, CardDefinition, CardInstance, Star, Tier } from '../types/game';

const CARD_MAP: Record<string, CardDefinition> = Object.fromEntries(cards.map((c) => [c.id, c]));

export function getCardDef(id: string): CardDefinition | undefined {
  return CARD_MAP[id];
}

export function starMultiplier(star: number): number {
  return BALANCE.starMultiplier[star] ?? 1;
}

export function buyPrice(tier: Tier): number {
  return BALANCE.tierPrice[tier] ?? tier;
}

/**
 * Mua thẻ bằng bao nhiêu xu thì bán được bấy nhiêu xu (thẻ 1 sao hoàn lại 100% giá mua).
 * Thẻ đã hợp nhất (2, 3 sao) nhận lại 70% tổng số xu của số lượng thẻ đã ghép.
 */
export function sellPrice(tier: Tier, star: Star): number {
  const unitPrice = buyPrice(tier);
  if (star === 1) return unitPrice;
  const copies = Math.pow(2, star - 1);
  const totalCost = copies * unitPrice;
  return Math.max(star, Math.round(totalCost * (BALANCE.mergedSellRatio ?? 0.7)));
}

export function baseDamage(def: CardDefinition): number {
  return def.type === 'attack' ? BALANCE.tierDamage[def.tier] ?? 0 : 0;
}

/** Damage before team multipliers (base × star). */
export function cardPower(def: CardDefinition, star: Star): number {
  return Math.round(baseDamage(def) * starMultiplier(star));
}

export function supportBuffValue(def: CardDefinition, star: Star): number {
  return (def.supportBuff ?? 0) * starMultiplier(star);
}

export function resolveCard(inst: CardInstance): Card | null {
  const def = getCardDef(inst.cardId);
  if (!def) return null;
  return {
    ...def,
    uid: inst.uid,
    star: inst.star,
    buyPrice: buyPrice(def.tier),
    sellPrice: sellPrice(def.tier, inst.star)
  };
}

/** Short human-readable effect value scaled by star, used on card faces. */
export function skillValueLabel(def: CardDefinition, star: Star): string {
  const e = def.skill.effect;
  const m = starMultiplier(star);
  switch (e.kind) {
    case 'bonusDamage':
      return `+${Math.round(e.percent * 100)}% đòn`;
    case 'strikeResistance':
      return `+${e.resistance} KC`;
    case 'conditionalDamage':
      return `KC≥${e.minResistance}`;
    case 'resistance':
      return `+${e.amount} KC`;
    case 'armor':
      return `${Math.round(e.amount * m)} giáp`;
    case 'heal':
      return `+${Math.round(e.amount * m)} Ý chí`;
  }
}

export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}