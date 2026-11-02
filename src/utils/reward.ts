import { BALANCE } from '../data/balance';

export function milestoneThresholds(target: number): number[] {
  return BALANCE.milestones.map((m) => Math.round(target * m.ratio));
}

export function reachedMilestones(totalDamage: number, target: number): boolean[] {
  return milestoneThresholds(target).map((t) => totalDamage >= t);
}

/** Coins for reached milestones that were not already claimed for this stage. */
export function milestoneCoins(reached: boolean[], claimed: boolean[] = []): number {
  return BALANCE.milestones.reduce((sum, m, i) => reached[i] && !claimed[i] ? sum + m.coins : sum, 0);
}

export function mergeClaimed(reached: boolean[], claimed: boolean[] = []): boolean[] {
  return BALANCE.milestones.map((_, i) => Boolean(reached[i] || claimed[i]));
}