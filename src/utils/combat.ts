import { BALANCE } from '../data/balance';
import { TAG_LABELS } from '../data/labels';
import type { CardDefinition, CardInstance, CombatEvent, CombatState, Player, Stage } from '../types/game';
import { baseDamage, getCardDef, starMultiplier, supportBuffValue } from './cards';
import { comboDamagePercent, evaluateCombos, startOfBattleBonuses } from './combo';
import { calculateDamage, clampResistance, counterDamage } from './damage';
import { fieldedCards } from './inventory';
import { reachedMilestones } from './reward';

export interface CombatContext {
  player: Player;
  stage: Stage;
}

interface Fielded {
  slot: number;
  card: CardInstance;
  def: CardDefinition;
}

export function initCombat(will: number): CombatState {
  return {
    turn: 0,
    totalDamage: 0,
    resistance: 0,
    armor: 0,
    will,
    milestones: BALANCE.milestones.map(() => false),
    passed: false,
    finished: false,
    skillActivations: 0,
    triggeredCombos: []
  };
}

export function isSkillReady(cooldown: number, turn: number): boolean {
  return cooldown <= 1 || turn % cooldown === 0;
}

export function getFielded(player: Player): Fielded[] {
  return fieldedCards(player).
  map(({ slot, card }) => ({ slot, card, def: getCardDef(card.cardId) })).
  filter((f): f is Fielded => Boolean(f.def));
}

export function teamSupportPercent(fielded: Fielded[]): number {
  const sum = fielded.filter((f) => f.def.type === 'support').reduce((acc, f) => acc + supportBuffValue(f.def, f.card.star), 0);
  return Math.min(BALANCE.supportBuffCap, sum);
}

/**
 * Resolves exactly one turn. Pure: given the same state and context it always
 * returns the same next state, so each turn is computed once and stored atomically.
 */
export function resolveTurn(state: CombatState, ctx: CombatContext): {state: CombatState;events: CombatEvent[];} {
  if (state.finished) return { state, events: [] };

  const turn = state.turn + 1;
  const events: CombatEvent[] = [];
  const fielded = getFielded(ctx.player);
  const evaluation = evaluateCombos(fielded.map((f) => f.def.id));
  const triggered = new Set(state.triggeredCombos);

  let resistance = state.resistance;
  let armor = state.armor;
  let will = state.will;
  let total = state.totalDamage;
  let skillActivations = state.skillActivations;
  let pendingResistance = 0;

  // 1. Start-of-turn effects
  evaluation.activeTags.forEach((t) => triggered.add(`${TAG_LABELS[t.tag]} ×${t.count}`));
  if (turn === 1) {
    const bonus = startOfBattleBonuses(evaluation);
    evaluation.activeSpecials.forEach((combo) => {
      if (combo.effect.kind === 'startResistance' || combo.effect.kind === 'startArmor') {
        triggered.add(combo.name);
        events.push({ type: 'combo', text: `${combo.name}: ${combo.description}` });
      }
    });
    pendingResistance += bonus.resistance;
    armor += bonus.armor;
  }
  pendingResistance += evaluation.resistancePerTurn;

  // 2. Support skills
  fielded.
  filter((f) => f.def.type === 'support').
  forEach((f) => {
    const { skill } = f.def;
    if (!isSkillReady(skill.cooldown, turn)) return;
    const m = starMultiplier(f.card.star);
    let text = '';
    const e = skill.effect;
    if (e.kind === 'resistance') {
      pendingResistance += e.amount;
      text = `+${e.amount} Kháng chiến`;
    } else if (e.kind === 'armor') {
      const value = Math.round(e.amount * m);
      armor += value;
      text = `+${value} giáp`;
    } else if (e.kind === 'heal') {
      const value = Math.round(e.amount * m);
      will = Math.min(BALANCE.maxWill, will + value);
      text = `+${value} Ý chí`;
    } else {
      return;
    }
    skillActivations += 1;
    events.push({ type: 'support', slot: f.slot, skill: skill.name, text, armorAfter: armor, willAfter: will });
  });

  // 3. Apply Kháng chiến
  if (pendingResistance > 0) {
    const before = resistance;
    resistance = clampResistance(resistance + pendingResistance);
    if (resistance > before) events.push({ type: 'resistance', amount: resistance - before, total: resistance });
  }

  // 4. Attacks (5. combos are evaluated per hit)
  const supportPercent = teamSupportPercent(fielded);
  fielded.
  filter((f) => f.def.type === 'attack').
  forEach((f) => {
    const { skill } = f.def;
    const combo = comboDamagePercent(evaluation, turn, resistance);
    combo.sources.forEach((s) => triggered.add(s));

    let bonus = 0;
    let resistanceGain = 0;
    let skillName: string | undefined;
    if (isSkillReady(skill.cooldown, turn)) {
      const e = skill.effect;
      if (e.kind === 'bonusDamage') {
        bonus = e.percent;
        skillName = skill.name;
      } else if (e.kind === 'strikeResistance') {
        bonus = e.percent;
        resistanceGain = e.resistance;
        skillName = skill.name;
      } else if (e.kind === 'conditionalDamage' && resistance >= e.minResistance) {
        bonus = e.percent;
        skillName = skill.name;
      }
    }
    if (skillName) skillActivations += 1;

    const damage = calculateDamage({
      baseDamage: baseDamage(f.def) * (1 + bonus),
      star: f.card.star,
      resistance,
      supportPercent,
      comboPercent: combo.percent,
      enemyResist: ctx.stage.enemy.resist
    });
    total += damage;
    events.push({ type: 'attack', slot: f.slot, damage, skill: skillName });

    if (resistanceGain > 0) {
      const before = resistance;
      resistance = clampResistance(resistance + resistanceGain);
      if (resistance > before) events.push({ type: 'resistance', amount: resistance - before, total: resistance });
    }
  });

  // 6. Enemy counterattack
  if (BALANCE.counterTurns.includes(turn)) {
    const raw = counterDamage(ctx.stage.id);
    const blocked = Math.min(armor, raw);
    armor -= blocked;
    will = Math.max(0, will - (raw - blocked));
    events.push({ type: 'counter', damage: raw - blocked, blocked, willAfter: will, armorAfter: armor });
  }

  // 7. Milestones
  const reached = reachedMilestones(total, ctx.stage.target);
  const milestones = reached.map((r, i) => r || state.milestones[i]);
  milestones.forEach((r, i) => {
    if (r && !state.milestones[i]) events.push({ type: 'milestone', index: i });
  });

  const finished = turn >= BALANCE.maxTurns || will <= 0;

  return {
    state: {
      turn,
      totalDamage: total,
      resistance,
      armor,
      will,
      milestones,
      passed: milestones[0],
      finished,
      skillActivations,
      triggeredCombos: Array.from(triggered)
    },
    events
  };
}