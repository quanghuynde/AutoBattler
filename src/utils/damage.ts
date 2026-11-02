import { BALANCE } from '../data/balance';
import { starMultiplier } from './cards';

export interface DamageInput {
  baseDamage: number;
  star: number;
  resistance: number;
  supportPercent: number;
  comboPercent: number;
  enemyResist: number;
}

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function clampResistance(points: number): number {
  return clamp(Math.floor(points), 0, BALANCE.maxResistance);
}

/** Hệ số Kháng chiến = 1 + điểm × 0.02 */
export function resistanceMultiplier(points: number): number {
  return 1 + clampResistance(points) * BALANCE.resistancePerPoint;
}

/**
 * Sát thương cuối = Cơ bản × Sao × Kháng chiến × Hỗ trợ × Combo × Kháng cự.
 * Pure and deterministic so it can be unit tested in isolation.
 */
export function calculateDamage(input: DamageInput): number {
  const base = clamp(input.baseDamage, 0, Number.MAX_SAFE_INTEGER);
  if (base === 0) return 0;
  const star = starMultiplier(input.star);
  const resistance = resistanceMultiplier(input.resistance);
  const support = 1 + clamp(input.supportPercent, 0, BALANCE.supportBuffCap);
  const combo = 1 + clamp(input.comboPercent, 0, BALANCE.comboCap);
  const enemy = 1 - clamp(input.enemyResist, 0, BALANCE.enemyResistCap);
  return Math.round(base * star * resistance * support * combo * enemy);
}

/** Ý chí damage per enemy counterattack: ceil(6 + 1.5 × stage). */
export function counterDamage(stage: number): number {
  return Math.ceil(BALANCE.counterBase + BALANCE.counterPerStage * stage);
}