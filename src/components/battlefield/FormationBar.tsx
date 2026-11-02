import React from 'react';
import { ArchiveIcon, InfoIcon, LinkIcon, StoreIcon } from 'lucide-react';
import { BALANCE } from '../../data/balance';
import type { CombatDisplay } from '../../hooks/useCombatRunner';
import type { Player } from '../../types/game';
import { InventorySlot } from '../cards/InventorySlot';
import { TrashZone } from '../cards/TrashZone';
import { FloatLayer } from './FloatLayer';

interface FormationBarProps {
  player: Player;
  display: CombatDisplay;
  inBattle: boolean;
  storageOpen: boolean;
  onToggleStorage: () => void;
  onOpenShop: () => void;
  onOpenCombos: () => void;
  onOpenInfo: () => void;
}

export function FormationBar({ player, display, inBattle, storageOpen, onToggleStorage, onOpenShop, onOpenCombos, onOpenInfo }: FormationBarProps) {
  const storageCount = player.storage.filter(Boolean).length;
  return (
    <section aria-label="Đội hình chiến đấu" className="relative z-10 flex flex-col border-t border-gold/25 bg-army-800 md:h-[25vh] md:min-h-[210px] md:flex-row">
      <div className="scrollbar-thin min-w-0 flex-1 overflow-x-auto">
        <div className="grid h-[200px] min-w-[700px] grid-cols-7 gap-2 px-3 pb-3 pt-4 md:h-full">
          {Array.from({ length: BALANCE.maxFormation }, (_, i) => {
            const card = player.formation[i];
            const active = display.activeSlot === i;
            return (
              <InventorySlot
                key={i}
                loc={{ zone: 'formation', index: i }}
                card={card}
                locked={i >= player.unlockedSlots}
                disabled={inBattle}
                active={active}
                activeSkill={active ? display.activeSkill : null}
                overlay={<FloatLayer floats={display.floats} target={i} className="-top-4" />} />);


          })}
        </div>
      </div>

      <aside className="grid grid-cols-4 gap-2 border-t border-gold/15 p-3 md:w-[220px] md:grid-cols-2 md:content-center md:border-l md:border-t-0">
        <SideButton icon={<ArchiveIcon className="h-4 w-4" />} label={`Kho thẻ ${storageCount}/${BALANCE.maxStorage}`} onClick={onToggleStorage} active={storageOpen} />
        <SideButton icon={<StoreIcon className="h-4 w-4" />} label="Cửa hàng" onClick={onOpenShop} disabled={inBattle} />
        <SideButton icon={<LinkIcon className="h-4 w-4" />} label="Combo" onClick={onOpenCombos} />
        <SideButton icon={<InfoIcon className="h-4 w-4" />} label="Thông tin" onClick={onOpenInfo} />
        <TrashZone disabled={inBattle} className="col-span-4 md:col-span-2" />
      </aside>
    </section>);

}

function SideButton({ icon, label, onClick, disabled, active }: {icon: React.ReactNode;label: string;onClick: () => void;disabled?: boolean;active?: boolean;}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex h-14 flex-col items-center justify-center gap-0.5 rounded-md border px-1 font-display text-[12px] font-bold uppercase leading-tight tracking-wide transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-35 ${
      active ? 'border-gold bg-gold text-ink' : 'border-gold/25 bg-army-700 text-paper hover:border-gold/60 hover:bg-army-600'}`
      }>
      
      {icon}
      <span className="whitespace-nowrap">{label}</span>
    </button>);

}