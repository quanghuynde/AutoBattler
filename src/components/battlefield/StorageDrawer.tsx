import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArchiveIcon, XIcon } from 'lucide-react';
import { BALANCE } from '../../data/balance';
import type { Player } from '../../types/game';
import { ownedCount } from '../../utils/inventory';
import { InventorySlot } from '../cards/InventorySlot';
import { TrashZone } from '../cards/TrashZone';

interface StorageDrawerProps {
  open: boolean;
  player: Player;
  disabled: boolean;
  onClose: () => void;
}

export function StorageDrawer({ open, player, disabled, onClose }: StorageDrawerProps) {
  return (
    <AnimatePresence>
      {open &&
      <motion.section
        aria-label="Kho lưu trữ"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="absolute inset-x-0 bottom-0 z-30 border-t-2 border-gold/50 bg-army-800/95 px-3 pb-3 pt-2 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] backdrop-blur-sm">
        
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold uppercase tracking-wide">
              <ArchiveIcon className="h-5 w-5 text-gold" /> Kho lưu trữ
            </h2>
            <span className="text-xs text-paper/60">
              Tổng sở hữu {ownedCount(player)}/{BALANCE.maxFormation + BALANCE.maxStorage} · Thẻ trong kho không tham gia chiến đấu. Kéo hai thẻ giống nhau, cùng sao vào nhau để
              nâng sao.
            </span>
            <TrashZone disabled={disabled} className="ml-auto py-1.5" />
            <button type="button" onClick={onClose} aria-label="Đóng kho" className="grid h-8 w-8 place-items-center rounded-md hover:bg-white/10">
              <XIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="scrollbar-thin overflow-x-auto">
            <div className="grid h-[150px] min-w-[900px] grid-cols-12 gap-2">
              {Array.from({ length: BALANCE.maxStorage }, (_, i) =>
            <InventorySlot key={i} loc={{ zone: 'storage', index: i }} card={player.storage[i]} disabled={disabled} />
            )}
            </div>
          </div>
        </motion.section>
      }
    </AnimatePresence>);

}