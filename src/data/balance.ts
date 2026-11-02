import type { TagComboTier } from '../types/game';

/**
 * All gameplay tuning numbers live here so balance can be adjusted
 * without touching the engines or UI.
 */
export const BALANCE = {
  startingCoins: 0,
  startingWill: 100,
  maxWill: 100,
  /** Will restored when moving on to the next stage. */
  willRegenBetweenStages: 40,
  /** Will restored to full when retrying a failed stage. */
  resetWillOnRetry: true,

  startingSlots: 2,
  maxFormation: 7,
  maxStorage: 12,
  /** Slots unlock after clearing stages 1..5 (slot = stage + 2). */
  lastUnlockStage: 5,

  maxTurns: 8,
  counterTurns: [2, 4, 6, 8],
  counterBase: 6,
  counterPerStage: 1.5,

  maxResistance: 20,
  resistancePerPoint: 0.02,
  supportBuffCap: 0.4,
  comboCap: 0.25,
  enemyResistCap: 0.2,

  starMultiplier: { 1: 1, 2: 1.7, 3: 2.5 } as Record<number, number>,
  tierDamage: { 1: 70, 2: 105, 3: 150, 4: 205, 5: 270 } as Record<number, number>,
  tierPrice: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 } as Record<number, number>,
  mergedSellRatio: 0.7,

  milestones: [
  { ratio: 0.4, coins: 2 },
  { ratio: 0.6, coins: 1 },
  { ratio: 0.8, coins: 2 },
  { ratio: 1, coins: 3 }],

  quizReward: 1,

  shopSize: 5,
  refreshCost: 1,
  attackChance: 0.6,
  /** Tier odds (percent for tier 1..5) by stage range. */
  shopOdds: [
  { from: 1, to: 2, odds: [75, 20, 5, 0, 0] },
  { from: 3, to: 4, odds: [55, 31, 13, 1, 0] },
  { from: 5, to: 6, odds: [35, 36, 24, 4, 1] },
  { from: 7, to: 8, odds: [18, 35, 32, 11, 4] },
  { from: 9, to: 10, odds: [10, 25, 38, 18, 9] }],


  /** Ordered from highest to lowest — only the highest matching tier applies. */
  tagComboTiers: [
  { count: 4, damage: 0.25, resistancePerTurn: 2 },
  { count: 3, damage: 0.18, resistancePerTurn: 1 },
  { count: 2, damage: 0.1, resistancePerTurn: 0 }] as
  TagComboTier[]
};