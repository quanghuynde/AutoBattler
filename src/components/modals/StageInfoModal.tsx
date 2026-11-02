import React from 'react';
import type { Player, Stage } from '../../types/game';
import { formatPercent } from '../../utils/cards';
import { getFielded, teamSupportPercent } from '../../utils/combat';
import { counterDamage } from '../../utils/damage';
import { Modal } from '../common/Modal';

interface StageInfoModalProps {
  open: boolean;
  onClose: () => void;
  stage: Stage;
  player: Player;
}

export function StageInfoModal({ open, onClose, stage, player }: StageInfoModalProps) {
  const fielded = getFielded(player);
  const rows: [string, string][] = [
  ['Giai đoạn', stage.period],
  ['Đối thủ / thử thách', stage.enemy.name],
  ['Mục tiêu sát thương', stage.target.toLocaleString('vi-VN')],
  ['Kháng sát thương của đối thủ', formatPercent(stage.enemy.resist)],
  ['Phản công (lượt 2, 4, 6, 8)', `−${counterDamage(stage.id)} Ý chí`],
  ['Thẻ trong đội hình', `${fielded.length}/${player.unlockedSlots}`],
  ['Buff hỗ trợ hiện tại', `+${formatPercent(teamSupportPercent(fielded))} (tối đa 40%)`]];

  return (
    <Modal open={open} onClose={onClose} title={`Màn ${stage.id}: ${stage.name}`} subtitle={stage.description} size="md">
      <img src={stage.enemy.image} alt={stage.enemy.name} className="mb-4 aspect-[21/9] w-full rounded-lg object-cover" />
      <p className="mb-4 text-sm text-paper/75">{stage.enemy.description}</p>
      <dl className="divide-y divide-gold/10">
        {rows.map(([k, v]) =>
        <div key={k} className="flex justify-between gap-4 py-2 text-sm">
            <dt className="text-paper/60">{k}</dt>
            <dd className="text-right font-semibold">{v}</dd>
          </div>
        )}
      </dl>
    </Modal>);

}