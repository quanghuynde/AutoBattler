import { BALANCE } from '../data/balance';
import type { CardInstance, CardLocation, Player, Star } from '../types/game';
import { uid } from './random';

export function getAt(player: Player, loc: CardLocation): CardInstance | null {
  const list = loc.zone === 'formation' ? player.formation : player.storage;
  return list[loc.index] ?? null;
}

function withSlot(player: Player, loc: CardLocation, value: CardInstance | null): Player {
  if (loc.zone === 'formation') {
    const formation = [...player.formation];
    formation[loc.index] = value;
    return { ...player, formation };
  }
  const storage = [...player.storage];
  storage[loc.index] = value;
  return { ...player, storage };
}

export function isValidLocation(player: Player, loc: CardLocation): boolean {
  if (loc.zone === 'formation') return loc.index >= 0 && loc.index < player.unlockedSlots;
  return loc.index >= 0 && loc.index < BALANCE.maxStorage;
}

export type MergeCheck = {ok: true;} | {ok: false;reason: string;};

export function canMerge(a: CardInstance, b: CardInstance): MergeCheck {
  if (a.cardId !== b.cardId) return { ok: false, reason: 'Chỉ ghép được hai thẻ giống nhau.' };
  if (a.star !== b.star) return { ok: false, reason: 'Hai thẻ phải cùng số sao.' };
  if (a.star >= 3) return { ok: false, reason: 'Thẻ đã đạt tối đa 3 sao.' };
  return { ok: true };
}

export function mergeInstances(a: CardInstance): CardInstance {
  return { uid: uid(), cardId: a.cardId, star: a.star + 1 as Star };
}

export type DropResult =
{ok: true;kind: 'move' | 'swap' | 'merge';player: Player;merged?: CardInstance;} |
{ok: false;reason: string;};

/** Handles a drag from one slot to another: move, swap (within formation) or merge. */
export function resolveDrop(player: Player, from: CardLocation, to: CardLocation): DropResult {
  if (from.zone === to.zone && from.index === to.index) return { ok: false, reason: '' };
  if (!isValidLocation(player, to)) return { ok: false, reason: 'Vị trí này đang bị khóa.' };
  const source = getAt(player, from);
  if (!source) return { ok: false, reason: '' };
  const target = getAt(player, to);

  if (!target) {
    const moved = withSlot(withSlot(player, from, null), to, source);
    return { ok: true, kind: 'move', player: moved };
  }

  const check = canMerge(source, target);
  if (check.ok) {
    const merged = mergeInstances(source);
    const next = withSlot(withSlot(player, from, null), to, merged);
    return { ok: true, kind: 'merge', player: next, merged };
  }

  if (from.zone === 'formation' && to.zone === 'formation') {
    const swapped = withSlot(withSlot(player, from, target), to, source);
    return { ok: true, kind: 'swap', player: swapped };
  }

  return { ok: false, reason: check.reason };
}

export function firstEmptyFormation(player: Player): number {
  for (let i = 0; i < player.unlockedSlots; i++) if (!player.formation[i]) return i;
  return -1;
}

export function firstEmptyStorage(player: Player): number {
  return player.storage.findIndex((c) => !c);
}

/** Adds a card to the first free formation slot, else storage. Returns null if full. */
export function placeNewCard(player: Player, card: CardInstance): {player: Player;location: CardLocation;} | null {
  const f = firstEmptyFormation(player);
  if (f >= 0) return { player: withSlot(player, { zone: 'formation', index: f }, card), location: { zone: 'formation', index: f } };
  const s = firstEmptyStorage(player);
  if (s >= 0) return { player: withSlot(player, { zone: 'storage', index: s }, card), location: { zone: 'storage', index: s } };
  return null;
}

export function removeAt(player: Player, loc: CardLocation): Player {
  return withSlot(player, loc, null);
}

export function moveToOtherZone(player: Player, from: CardLocation): DropResult {
  const card = getAt(player, from);
  if (!card) return { ok: false, reason: '' };
  if (from.zone === 'storage') {
    const f = firstEmptyFormation(player);
    if (f < 0) return { ok: false, reason: 'Đội hình đã đầy hoặc chưa mở thêm vị trí.' };
    return resolveDrop(player, from, { zone: 'formation', index: f });
  }
  const s = firstEmptyStorage(player);
  if (s < 0) return { ok: false, reason: 'Kho lưu trữ đã đầy.' };
  return resolveDrop(player, from, { zone: 'storage', index: s });
}

export function ownedCount(player: Player): number {
  return player.formation.filter(Boolean).length + player.storage.filter(Boolean).length;
}

export function hasRoom(player: Player): boolean {
  return firstEmptyFormation(player) >= 0 || firstEmptyStorage(player) >= 0;
}

export function fieldedCards(player: Player): {slot: number;card: CardInstance;}[] {
  return player.formation.
  slice(0, player.unlockedSlots).
  map((card, slot) => card ? { slot, card } : null).
  filter((x): x is {slot: number;card: CardInstance;} => x !== null);
}

/** Slots unlocked after clearing a stage: stage 1 → 3 … stage 5 → 7. */
export function slotsAfterClearing(stage: number, current: number): number {
  if (stage > BALANCE.lastUnlockStage) return current;
  return Math.max(current, Math.min(BALANCE.maxFormation, BALANCE.startingSlots + stage));
}

export function unlockStageForSlot(slotIndex: number): number {
  return slotIndex - BALANCE.startingSlots + 1;
}