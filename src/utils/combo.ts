import { BALANCE } from '../data/balance';
import { specialCombos } from '../data/combos';
import { ALL_TAGS } from '../data/labels';
import type { Combo, ComboTag, TagComboTier } from '../types/game';
import { getCardDef } from './cards';

export interface ActiveTagCombo {
  tag: ComboTag;
  count: number;
  tier: TagComboTier;
}

export interface ComboEvaluation {
  tagCounts: Record<ComboTag, number>;
  activeTags: ActiveTagCombo[];
  activeSpecials: Combo[];
  bestTagDamage: number;
  resistancePerTurn: number;
}

function tierFor(count: number): TagComboTier | null {
  return BALANCE.tagComboTiers.find((t) => count >= t.count) ?? null;
}

/** Evaluates combos for the given fielded card ids. Tags count distinct cards. */
export function evaluateCombos(cardIds: string[]): ComboEvaluation {
  const unique = Array.from(new Set(cardIds));
  const tagCounts = Object.fromEntries(ALL_TAGS.map((t) => [t, 0])) as Record<ComboTag, number>;
  unique.forEach((id) => {
    getCardDef(id)?.tags.forEach((tag) => {
      tagCounts[tag] += 1;
    });
  });

  const activeTags: ActiveTagCombo[] = [];
  ALL_TAGS.forEach((tag) => {
    const tier = tierFor(tagCounts[tag]);
    if (tier) activeTags.push({ tag, count: tagCounts[tag], tier });
  });

  const activeSpecials = specialCombos.filter((combo) => combo.cardIds.every((id) => unique.includes(id)));
  const bestTagDamage = activeTags.reduce((max, t) => Math.max(max, t.tier.damage), 0);
  const resistancePerTurn = activeTags.reduce((sum, t) => sum + t.tier.resistancePerTurn, 0);

  return { tagCounts, activeTags, activeSpecials, bestTagDamage, resistancePerTurn };
}

/** Combo damage percent for a given turn (capped). Returns names of contributing combos. */
export function comboDamagePercent(
evaluation: ComboEvaluation,
turn: number,
resistance: number)
: {percent: number;sources: string[];} {
  let percent = evaluation.bestTagDamage;
  const sources: string[] = [];
  evaluation.activeSpecials.forEach((combo) => {
    const e = combo.effect;
    if (e.kind === 'turnDamage' && e.turn === turn) {
      percent += e.percent;
      sources.push(combo.name);
    } else if (e.kind === 'fromTurnDamage' && turn >= e.fromTurn) {
      percent += e.percent;
      sources.push(combo.name);
    } else if (e.kind === 'conditionalAttack' && resistance >= e.minResistance) {
      percent += e.percent;
      sources.push(combo.name);
    }
  });
  return { percent: Math.min(BALANCE.comboCap, percent), sources };
}

export function startOfBattleBonuses(evaluation: ComboEvaluation): {resistance: number;armor: number;} {
  let resistance = 0;
  let armor = 0;
  evaluation.activeSpecials.forEach((combo) => {
    if (combo.effect.kind === 'startResistance') resistance += combo.effect.amount;
    if (combo.effect.kind === 'startArmor') armor += combo.effect.amount;
  });
  return { resistance, armor };
}

/** Other cards that form a special combo with the given card. */
export function partnersOf(cardId: string): {combo: Combo;partnerIds: string[];}[] {
  return specialCombos.
  filter((c) => c.cardIds.includes(cardId)).
  map((combo) => ({ combo, partnerIds: combo.cardIds.filter((id) => id !== cardId) }));
}