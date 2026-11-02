import React from 'react';
import { CheckCircle2Icon, CircleDashedIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { BALANCE } from '../../data/balance';
import { specialCombos } from '../../data/combos';
import { ALL_TAGS, TAG_LABELS } from '../../data/labels';
import type { Player } from '../../types/game';
import { getCardDef } from '../../utils/cards';
import { evaluateCombos } from '../../utils/combo';
import { fieldedCards } from '../../utils/inventory';
import { Modal } from '../common/Modal';

interface ComboModalProps {
  open: boolean;
  onClose: () => void;
  player: Player;
}

export function ComboModal({ open, onClose, player }: ComboModalProps) {
  const fieldedIds = fieldedCards(player).map((f) => f.card.cardId);
  const evaluation = evaluateCombos(fieldedIds);
  const lowest = BALANCE.tagComboTiers[BALANCE.tagComboTiers.length - 1];

  return (
    <Modal open={open} onClose={onClose} title="Combo" subtitle="Chỉ tính các thẻ khác nhau đang ở trong đội hình. Tổng combo sát thương tối đa +25%." size="lg">
      <section>
        <h3 className="font-display text-lg font-bold uppercase tracking-wide text-gold">Combo nhãn</h3>
        <table className="mt-2 w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-paper/50">
            <tr>
              <th className="py-1.5 font-semibold">Nhãn</th>
              <th className="py-1.5 font-semibold">Số thẻ</th>
              <th className="py-1.5 font-semibold">Hiệu ứng</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/10">
            {ALL_TAGS.map((tag) => {
              const count = evaluation.tagCounts[tag];
              const active = evaluation.activeTags.find((t) => t.tag === tag);
              const next = [...BALANCE.tagComboTiers].reverse().find((t) => t.count > count);
              return (
                <tr key={tag} className={active ? 'text-paper' : 'text-paper/45'}>
                  <td className="py-2 font-semibold">
                    <span className="flex items-center gap-1.5">
                      {active ? <CheckCircle2Icon className="h-4 w-4 text-gold" /> : <CircleDashedIcon className="h-4 w-4" />}
                      {TAG_LABELS[tag]}
                    </span>
                  </td>
                  <td className="py-2 font-display text-base font-bold">{count}</td>
                  <td className="py-2">
                    {active ?
                    <span className="text-gold">
                        +{Math.round(active.tier.damage * 100)}% sát thương
                        {active.tier.resistancePerTurn > 0 && `, +${active.tier.resistancePerTurn} Kháng chiến/lượt`}
                      </span> :

                    <span>Cần thêm {(next ?? lowest).count - count} thẻ để kích hoạt</span>
                    }
                    {active && next && <span className="block text-xs text-paper/45">Thêm {next.count - count} thẻ để lên mức kế tiếp</span>}
                  </td>
                </tr>);

            })}
          </tbody>
        </table>
      </section>

      <section className="mt-6">
        <h3 className="font-display text-lg font-bold uppercase tracking-wide text-gold">Combo đặc biệt</h3>
        <ul className="mt-2 grid gap-2 md:grid-cols-2">
          {specialCombos.map((combo) => {
            const active = evaluation.activeSpecials.some((c) => c.id === combo.id);
            const missing = combo.cardIds.filter((id) => !fieldedIds.includes(id));
            return (
              <li
                key={combo.id}
                className={twMerge('rounded-lg border p-3', active ? 'border-gold bg-gold/10' : 'border-paper/10 bg-black/15 text-paper/50')}>
                
                <p className={twMerge('flex items-center gap-1.5 font-display text-base font-bold uppercase', active && 'text-gold')}>
                  {active ? <CheckCircle2Icon className="h-4 w-4" /> : <CircleDashedIcon className="h-4 w-4" />}
                  {combo.name}
                </p>
                <p className="mt-0.5 text-sm">{combo.description}</p>
                <p className="mt-1.5 text-xs">
                  {combo.cardIds.map((id, i) =>
                  <span key={id}>
                      {i > 0 && ' + '}
                      <span className={missing.includes(id) ? 'text-flag' : 'text-paper'}>{getCardDef(id)?.name}</span>
                    </span>
                  )}
                </p>
                {!active && <p className="mt-1 text-xs">Còn thiếu: {missing.map((id) => getCardDef(id)?.name).join(', ')}</p>}
              </li>);

          })}
        </ul>
      </section>
    </Modal>);

}