import React from 'react';
import { BALANCE } from '../../data/balance';
import type { Player } from '../../types/game';
import { ownedCount } from '../../utils/inventory';
import { InventorySlot } from '../cards/InventorySlot';
import { TrashZone } from '../cards/TrashZone';

interface ArmyPanelProps {
  player: Player;
}

export function ArmyPanel({ player }: ArmyPanelProps) {
  return (
    <section aria-label="Đội hình và kho thẻ" className="rounded-xl border border-gold/20 bg-army-800/90 p-4">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide">Đội hình & kho thẻ</h2>
        <span className="text-xs text-paper/55">
          {ownedCount(player)}/{BALANCE.maxFormation + BALANCE.maxStorage} thẻ · Kéo thả để sắp xếp, ghép hai thẻ giống nhau để nâng sao
        </span>
        <TrashZone className="ml-auto" />
      </div>

      <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
        Đội hình chiến đấu ({player.formation.slice(0, player.unlockedSlots).filter(Boolean).length}/{player.unlockedSlots})
      </h3>
      <div className="scrollbar-thin mt-2 overflow-x-auto">
        <div className="grid h-[170px] min-w-[700px] grid-cols-7 gap-2">
          {Array.from({ length: BALANCE.maxFormation }, (_, i) =>
          <InventorySlot key={i} loc={{ zone: 'formation', index: i }} card={player.formation[i]} locked={i >= player.unlockedSlots} />
          )}
        </div>
      </div>

      <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-paper/60">
        Kho lưu trữ ({player.storage.filter(Boolean).length}/{BALANCE.maxStorage})
      </h3>
      <div className="scrollbar-thin mt-2 overflow-x-auto">
        <div className="grid h-[150px] min-w-[960px] grid-cols-12 gap-2">
          {Array.from({ length: BALANCE.maxStorage }, (_, i) =>
          <InventorySlot key={i} loc={{ zone: 'storage', index: i }} card={player.storage[i]} />
          )}
        </div>
      </div>
    </section>);

}