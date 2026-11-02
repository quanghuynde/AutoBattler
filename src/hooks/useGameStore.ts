import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { BALANCE } from '../data/balance';
import { cards } from '../data/cards';
import { stages } from '../data/stages';
import type { BattleResult, CardInstance, CardLocation, CombatEvent, CombatState, GameState, Player } from '../types/game';
import { getCardDef, sellPrice } from '../utils/cards';
import { initCombat, resolveTurn } from '../utils/combat';
import { getAt, moveToOtherZone, placeNewCard, removeAt, resolveDrop, fieldedCards, slotsAfterClearing } from '../utils/inventory';
import { shuffle, uid } from '../utils/random';
import { mergeClaimed, milestoneCoins } from '../utils/reward';
import { generateShop } from '../utils/shop';
import { useMetaStore } from './useMetaStore';

export type ActionResult = {ok: true;message?: string;uid?: string;kind?: string;} | {ok: false;message: string;};

interface GameActions {
  newGame: () => void;
  confirmStarter: (uids: string[]) => ActionResult;
  moveCard: (from: CardLocation, to: CardLocation) => ActionResult;
  toggleZone: (from: CardLocation) => ActionResult;
  sellCard: (loc: CardLocation) => ActionResult;
  buyItem: (itemId: string) => ActionResult;
  refreshShop: () => ActionResult;
  openShop: () => ActionResult;
  closeShop: () => void;
  startBattle: () => ActionResult;
  advanceTurn: () => {state: CombatState;events: CombatEvent[];} | null;
  finishBattle: () => void;
  continueAfterResult: () => void;
  answerQuiz: (stage: number, correct: boolean) => ActionResult;
  resetGame: () => void;
}

export type GameStore = GameState & GameActions;

function emptyPlayer(): Player {
  return {
    coins: BALANCE.startingCoins,
    will: BALANCE.startingWill,
    stage: 1,
    unlockedSlots: BALANCE.startingSlots,
    formation: Array.from({ length: BALANCE.maxFormation }, () => null),
    storage: Array.from({ length: BALANCE.maxStorage }, () => null)
  };
}

const initialState: GameState = {
  active: false,
  phase: 'starter',
  player: emptyPlayer(),
  starterChoices: [],
  combat: null,
  lastResult: null,
  shop: [],
  shopStage: 0,
  claimedMilestones: {},
  quizAnswered: {},
  clearedStages: []
};

export function getStage(id: number) {
  return stages.find((s) => s.id === id) ?? stages[0];
}

function rollStarterCards(): CardInstance[] {
  const pool = cards.filter((c) => c.tier === 1 && c.type === 'attack');
  return shuffle(pool).
  slice(0, 3).
  map((c) => ({ uid: uid(), cardId: c.id, star: 1 as const }));
}

const fail = (message: string): ActionResult => ({ ok: false, message });

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      newGame: () => {
        set({ ...initialState, player: emptyPlayer(), active: true, phase: 'starter', starterChoices: rollStarterCards() });
      },

      confirmStarter: (uids) => {
        const { starterChoices, phase } = get();
        if (phase !== 'starter') return fail('Đã hoàn tất chọn thẻ ban đầu.');
        const picked = starterChoices.filter((c) => uids.includes(c.uid));
        if (picked.length !== 2) return fail('Hãy chọn đúng 2 thẻ để đưa vào đội hình.');
        const rest = starterChoices.filter((c) => !uids.includes(c.uid));
        const player = emptyPlayer();
        player.formation[0] = picked[0];
        player.formation[1] = picked[1];
        rest.forEach((c, i) => {
          player.storage[i] = c;
        });
        useMetaStore.getState().unlockCards(starterChoices.map((c) => c.cardId));
        set({ player, phase: 'prep', starterChoices: [] });
        return { ok: true };
      },

      moveCard: (from, to) => {
        if (get().phase === 'battle') return fail('Không thể sắp xếp thẻ khi trận đấu đang diễn ra.');
        const result = resolveDrop(get().player, from, to);
        if (!result.ok) return fail(result.reason);
        set({ player: result.player });
        return { ok: true, kind: result.kind, uid: result.merged?.uid };
      },

      toggleZone: (from) => {
        if (get().phase === 'battle') return fail('Không thể sắp xếp thẻ khi trận đấu đang diễn ra.');
        const result = moveToOtherZone(get().player, from);
        if (!result.ok) return fail(result.reason || 'Không thể di chuyển thẻ.');
        set({ player: result.player });
        return { ok: true, kind: result.kind, uid: result.merged?.uid };
      },

      sellCard: (loc) => {
        const { phase, player } = get();
        if (phase === 'battle') return fail('Không thể bán thẻ khi trận đấu đang diễn ra.');
        const card = getAt(player, loc);
        const def = card ? getCardDef(card.cardId) : undefined;
        if (!card || !def) return fail('Không tìm thấy thẻ.');
        const coins = sellPrice(def.tier, card.star);
        set({ player: { ...removeAt(player, loc), coins: player.coins + coins } });
        return { ok: true, message: `Đã bán ${def.name} (+${coins} xu)` };
      },

      buyItem: (itemId) => {
        const { shop, player, phase } = get();
        if (phase !== 'shop') return fail('Cửa hàng chỉ mở giữa các trận.');
        const item = shop.find((i) => i.id === itemId);
        const def = item ? getCardDef(item.cardId) : undefined;
        if (!item || !def || item.sold) return fail('Thẻ này không còn bán.');
        const price = BALANCE.tierPrice[def.tier];
        if (player.coins < price) return fail('Không đủ xu để mua thẻ này.');
        const instance: CardInstance = { uid: uid(), cardId: item.cardId, star: item.star };
        const placed = placeNewCard(player, instance);
        if (!placed) return fail('Đội hình và kho đã đầy. Hãy bán hoặc ghép thẻ trước.');
        const fresh = useMetaStore.getState().unlockCards([item.cardId]);
        set({
          player: { ...placed.player, coins: player.coins - price },
          shop: shop.map((i) => i.id === itemId ? { ...i, sold: true } : i)
        });
        const where = placed.location.zone === 'formation' ? 'đội hình' : 'kho';
        const extra = fresh.length > 0 ? ' · Mở khóa hồ sơ mới!' : '';
        return { ok: true, uid: instance.uid, message: `Đã mua ${def.name} vào ${where}${extra}` };
      },

      refreshShop: () => {
        const { player, phase } = get();
        if (phase !== 'shop') return fail('Cửa hàng chỉ mở giữa các trận.');
        if (player.coins < BALANCE.refreshCost) return fail('Không đủ xu để làm mới cửa hàng.');
        set({ player: { ...player, coins: player.coins - BALANCE.refreshCost }, shop: generateShop(player.stage), shopStage: player.stage });
        return { ok: true };
      },

      openShop: () => {
        const { phase, player, shopStage } = get();
        if (phase !== 'prep') return fail('Chỉ mở cửa hàng khi chưa bắt đầu trận.');
        if (shopStage !== player.stage) set({ shop: generateShop(player.stage), shopStage: player.stage });
        set({ phase: 'shop' });
        return { ok: true };
      },

      closeShop: () => {
        if (get().phase === 'shop') set({ phase: 'prep' });
      },

      startBattle: () => {
        const { phase, player } = get();
        if (phase !== 'prep') return fail('Không thể bắt đầu trận lúc này.');
        if (fieldedCards(player).length === 0) return fail('Hãy đưa ít nhất 1 thẻ vào đội hình.');
        set({ phase: 'battle', combat: initCombat(player.will) });
        return { ok: true };
      },

      advanceTurn: () => {
        const { phase, combat, player } = get();
        if (phase !== 'battle' || !combat || combat.finished) return null;
        const result = resolveTurn(combat, { player, stage: getStage(player.stage) });
        set({ combat: result.state });
        return result;
      },

      finishBattle: () => {
        const { phase, combat, player, claimedMilestones, clearedStages } = get();
        if (phase !== 'battle' || !combat || !combat.finished) return;
        const stage = player.stage;
        const claimed = claimedMilestones[stage] ?? [];
        const coins = combat.passed ? milestoneCoins(combat.milestones, claimed) : 0;
        const newSlots = combat.passed ? slotsAfterClearing(stage, player.unlockedSlots) : player.unlockedSlots;
        const result: BattleResult = {
          stage,
          passed: combat.passed,
          totalDamage: combat.totalDamage,
          milestones: combat.milestones,
          coinsEarned: coins,
          skillActivations: combat.skillActivations,
          combos: combat.triggeredCombos,
          unlockedSlot: newSlots > player.unlockedSlots ? newSlots : null,
          endedByWill: combat.will <= 0
        };
        set({
          phase: 'result',
          combat: null,
          lastResult: result,
          player: { ...player, coins: player.coins + coins, will: combat.will, unlockedSlots: newSlots },
          claimedMilestones: combat.passed ? { ...claimedMilestones, [stage]: mergeClaimed(combat.milestones, claimed) } : claimedMilestones,
          clearedStages: combat.passed && !clearedStages.includes(stage) ? [...clearedStages, stage] : clearedStages
        });
      },

      continueAfterResult: () => {
        const { phase, lastResult, player } = get();
        if (phase !== 'result' || !lastResult) return;
        if (!lastResult.passed) {
          set({ phase: 'prep', player: { ...player, will: BALANCE.resetWillOnRetry ? BALANCE.maxWill : player.will } });
          return;
        }
        if (player.stage >= stages.length) {
          set({ phase: 'victory' });
          return;
        }
        const next = player.stage + 1;
        set({
          phase: 'shop',
          player: { ...player, stage: next, will: Math.min(BALANCE.maxWill, player.will + BALANCE.willRegenBetweenStages) },
          shop: generateShop(next),
          shopStage: next
        });
      },

      answerQuiz: (stage, correct) => {
        const { quizAnswered, player } = get();
        if (quizAnswered[stage]) return fail('Bạn đã trả lời câu hỏi của màn này.');
        set({
          quizAnswered: { ...quizAnswered, [stage]: true },
          player: correct ? { ...player, coins: player.coins + BALANCE.quizReward } : player
        });
        return { ok: true };
      },

      resetGame: () => set({ ...initialState, player: emptyPlayer() })
    }),
    {
      name: 'kc_save_v1',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      // Never persist transient combat/animation values — an interrupted battle restarts cleanly.
      partialize: (s) => ({
        active: s.active,
        phase: s.phase === 'battle' ? 'prep' : s.phase,
        player: s.player,
        starterChoices: s.starterChoices,
        combat: null,
        lastResult: s.lastResult,
        shop: s.shop,
        shopStage: s.shopStage,
        claimedMilestones: s.claimedMilestones,
        quizAnswered: s.quizAnswered,
        clearedStages: s.clearedStages
      })
    }
  )
);