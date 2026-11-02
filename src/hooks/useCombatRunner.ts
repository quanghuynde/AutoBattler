import { useEffect, useRef, useState } from 'react';
import { BALANCE } from '../data/balance';
import type { CombatEvent } from '../types/game';
import { playSound } from '../utils/sound';
import { useGameStore } from './useGameStore';
import { useMetaStore } from './useMetaStore';

export type FloatTarget = 'enemy' | 'player' | 'resistance' | number;
export type FloatTone = 'damage' | 'buff' | 'armor' | 'counter';

export interface FloatingText {
  id: number;
  target: FloatTarget;
  text: string;
  tone: FloatTone;
}

export interface CombatDisplay {
  turn: number;
  damage: number;
  resistance: number;
  will: number;
  armor: number;
  milestones: boolean[];
  activeSlot: number | null;
  activeSkill: string | null;
  floats: FloatingText[];
  enemyHit: number;
  counterHit: number;
  projectile: number;
  banner: string | null;
}

const BASE_DURATION: Record<CombatEvent['type'], number> = {
  combo: 700,
  support: 420,
  resistance: 260,
  attack: 440,
  counter: 650,
  milestone: 380
};

function emptyDisplay(will: number): CombatDisplay {
  return {
    turn: 0,
    damage: 0,
    resistance: 0,
    will,
    armor: 0,
    milestones: BALANCE.milestones.map(() => false),
    activeSlot: null,
    activeSkill: null,
    floats: [],
    enemyHit: 0,
    counterHit: 0,
    projectile: 0,
    banner: null
  };
}

/**
 * Drives the auto battle: asks the store to resolve one turn at a time (the store is the single
 * source of truth), then replays that turn's events purely for presentation.
 */
export function useCombatRunner(paused: boolean): CombatDisplay {
  const phase = useGameStore((s) => s.phase);
  const playerWill = useGameStore((s) => s.player.will);
  const [display, setDisplay] = useState<CombatDisplay>(() => emptyDisplay(playerWill));
  const pausedRef = useRef(paused);
  const floatId = useRef(0);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    if (phase !== 'battle') {
      setDisplay(emptyDisplay(useGameStore.getState().player.will));
      return;
    }

    let cancelled = false;
    const sleep = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));
    const speed = () => useMetaStore.getState().settings.effects ? 1 : 0.45;
    const sound = (name: Parameters<typeof playSound>[0]) => playSound(name, useMetaStore.getState().settings.sound);
    const waitPaused = async () => {
      while (pausedRef.current && !cancelled) await sleep(120);
    };
    const step = async (ms: number) => {
      await sleep(ms * speed());
      await waitPaused();
    };
    const addFloat = (target: FloatTarget, text: string, tone: FloatTone) => {
      const id = ++floatId.current;
      setDisplay((d) => ({ ...d, floats: [...d.floats, { id, target, text, tone }] }));
      window.setTimeout(() => setDisplay((d) => ({ ...d, floats: d.floats.filter((f) => f.id !== id) })), 850 * speed());
    };

    const applyEvent = (ev: CombatEvent) => {
      switch (ev.type) {
        case 'attack':
          setDisplay((d) => ({
            ...d,
            activeSlot: ev.slot,
            activeSkill: ev.skill ?? null,
            damage: d.damage + ev.damage,
            projectile: d.projectile + 1,
            enemyHit: d.enemyHit + 1
          }));
          addFloat(ev.slot, `${ev.damage}`, 'damage');
          addFloat('enemy', `-${ev.damage}`, 'damage');
          sound('hit');
          break;
        case 'support':
          setDisplay((d) => ({ ...d, activeSlot: ev.slot, activeSkill: ev.skill, armor: ev.armorAfter, will: ev.willAfter }));
          addFloat(ev.slot, ev.text, ev.text.includes('giáp') ? 'armor' : 'buff');
          sound('buff');
          break;
        case 'resistance':
          setDisplay((d) => ({ ...d, resistance: ev.total }));
          addFloat('resistance', `+${ev.amount} Kháng chiến`, 'buff');
          break;
        case 'counter':
          setDisplay((d) => ({ ...d, activeSlot: null, activeSkill: null, will: ev.willAfter, armor: ev.armorAfter, counterHit: d.counterHit + 1 }));
          addFloat('player', ev.damage > 0 ? `-${ev.damage} Ý chí` : 'Chặn hoàn toàn', 'counter');
          if (ev.blocked > 0) addFloat('player', `Giáp chặn ${ev.blocked}`, 'armor');
          sound('counter');
          break;
        case 'milestone':
          setDisplay((d) => {
            const milestones = [...d.milestones];
            milestones[ev.index] = true;
            return { ...d, milestones, banner: `Đạt mốc ${ev.index + 1}` };
          });
          sound('milestone');
          break;
        case 'combo':
          setDisplay((d) => ({ ...d, banner: ev.text }));
          sound('buff');
          break;
      }
    };

    const initial = useGameStore.getState();
    setDisplay(() => {
      const c = initial.combat;
      const base = emptyDisplay(c?.will ?? initial.player.will);
      return c ?
      { ...base, turn: c.turn, damage: c.totalDamage, resistance: c.resistance, armor: c.armor, milestones: c.milestones } :
      base;
    });

    (async () => {
      await step(500);
      while (!cancelled) {
        await waitPaused();
        if (cancelled) return;
        const store = useGameStore.getState();
        const result = store.advanceTurn();
        if (!result) {
          if (store.combat?.finished) store.finishBattle();
          return;
        }
        setDisplay((d) => ({ ...d, turn: result.state.turn, banner: null }));
        for (const ev of result.events) {
          if (cancelled) return;
          applyEvent(ev);
          await step(BASE_DURATION[ev.type]);
          if (ev.type === 'combo' || ev.type === 'milestone') setDisplay((d) => ({ ...d, banner: null }));
        }
        if (cancelled) return;
        const s = result.state;
        setDisplay((d) => ({
          ...d,
          damage: s.totalDamage,
          resistance: s.resistance,
          armor: s.armor,
          will: s.will,
          milestones: s.milestones,
          activeSlot: null,
          activeSkill: null
        }));
        if (s.finished) {
          sound(s.passed ? 'victory' : 'defeat');
          await step(1000);
          if (!cancelled) useGameStore.getState().finishBattle();
          return;
        }
        await step(450);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [phase]);

  return display;
}