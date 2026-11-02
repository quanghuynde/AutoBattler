import React from 'react';
import { ArrowLeftRightIcon, BookOpenIcon, LinkIcon, ShieldIcon, SwordsIcon, Trash2Icon, ZapIcon } from 'lucide-react';
import { CATEGORY_LABELS, TAG_LABELS, TIER_COLORS, TYPE_LABELS } from '../../data/labels';
import { useGameStore } from '../../hooks/useGameStore';
import type { CardInstance, CardLocation } from '../../types/game';
import { cardPower, formatPercent, getCardDef, resolveCard, skillValueLabel, supportBuffValue } from '../../utils/cards';
import { partnersOf } from '../../utils/combo';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { StarRow } from '../common/StarRow';

interface CardDetailModalProps {
  open: boolean;
  instance: CardInstance | null;
  loc?: CardLocation;
  canManage: boolean;
  onClose: () => void;
  onToggleZone: (loc: CardLocation) => void;
  onSell: (loc: CardLocation) => void;
}

export function CardDetailModal({ open, instance, loc, canManage, onClose, onToggleZone, onSell }: CardDetailModalProps) {
  const player = useGameStore((s) => s.player);
  const card = instance ? resolveCard(instance) : null;
  const ownedIds = new Set([...player.formation, ...player.storage].filter(Boolean).map((c) => c!.cardId));

  return (
    <Modal
      open={open && Boolean(card)}
      onClose={onClose}
      tone="paper"
      size="lg"
      title={card?.name}
      subtitle={card ? `${CATEGORY_LABELS[card.category]} · ${card.years}` : undefined}
      footer={
      card && loc && canManage ?
      <>
            <Button variant="paper" onClick={() => onToggleZone(loc)}>
              <ArrowLeftRightIcon className="h-4 w-4" />
              {loc.zone === 'formation' ? 'Đưa vào kho' : 'Đưa vào đội hình'}
            </Button>
            <Button variant="primary" onClick={() => onSell(loc)}>
              <Trash2Icon className="h-4 w-4" />
              Bán · {card.sellPrice} xu
            </Button>
          </> :
      undefined
      }>
      
      {card &&
      <div className="grid gap-5 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <div className="overflow-hidden rounded-lg border-4" style={{ borderColor: TIER_COLORS[card.tier] }}>
              <img src={card.image} alt={`Minh họa ${card.name}`} className="aspect-[4/3] w-full object-cover sepia-[.25]" />
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <dt className="text-ink-400">Cấp thẻ</dt>
                <dd className="font-display text-lg font-bold">Cấp {card.tier}</dd>
              </div>
              <div>
                <dt className="text-ink-400">Cấp sao</dt>
                <dd className="flex h-7 items-center">
                  <span className="rounded bg-ink px-1.5 py-1">
                    <StarRow star={card.star} size="h-3.5 w-3.5" />
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-ink-400">{card.type === 'attack' ? 'Sát thương / lượt' : 'Buff toàn đội'}</dt>
                <dd className="flex items-center gap-1 font-display text-lg font-bold">
                  {card.type === 'attack' ?
                <>
                      <SwordsIcon className="h-4 w-4 text-flag" />
                      {cardPower(card, card.star)}
                    </> :

                <>
                      <ShieldIcon className="h-4 w-4 text-army" />+{formatPercent(supportBuffValue(card, card.star))}
                    </>
                }
                </dd>
              </div>
              <div>
                <dt className="text-ink-400">Giá mua / bán</dt>
                <dd className="font-display text-lg font-bold">
                  {card.buyPrice} / {card.sellPrice} xu
                </dd>
              </div>
            </dl>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-1.5">
              <span className={`rounded px-2 py-0.5 text-xs font-semibold text-paper ${card.type === 'attack' ? 'bg-flag' : 'bg-army'}`}>
                {TYPE_LABELS[card.type]}
              </span>
              {card.tags.map((t) =>
            <span key={t} className="rounded border border-ink/25 px-2 py-0.5 text-xs font-semibold">
                  {TAG_LABELS[t]}
                </span>
            )}
            </div>

            <section className="rounded-lg bg-ink p-3 text-paper">
              <h3 className="flex items-center gap-1.5 font-display text-lg font-bold uppercase text-gold">
                <ZapIcon className="h-4 w-4" />
                {card.skill.name}
              </h3>
              <p className="mt-1 text-sm text-paper/85">{card.skill.description}</p>
              <p className="mt-1.5 text-xs text-paper/55">
                Hồi chiêu {card.skill.cooldown} lượt · Hiệu lực hiện tại: {skillValueLabel(card, card.star)}
              </p>
            </section>

            <section>
              <h3 className="flex items-center gap-1.5 font-display text-base font-bold uppercase">
                <BookOpenIcon className="h-4 w-4" />
                Tư liệu lịch sử
              </h3>
              <p className="mt-1 text-sm font-semibold leading-relaxed text-ink">{card.summary}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{card.history}</p>
            </section>

            {partnersOf(card.id).length > 0 &&
          <section>
                <h3 className="flex items-center gap-1.5 font-display text-base font-bold uppercase">
                  <LinkIcon className="h-4 w-4" />
                  Kết hợp đặc biệt
                </h3>
                <ul className="mt-1 space-y-1.5">
                  {partnersOf(card.id).map(({ combo, partnerIds }) =>
              <li key={combo.id} className="text-sm">
                      <span className="font-semibold">{combo.name}</span> — với{' '}
                      {partnerIds.map((id) =>
                <span key={id} className={ownedIds.has(id) ? 'font-semibold text-army' : 'text-ink-400'}>
                          {getCardDef(id)?.name}
                        </span>
                )}
                      <span className="block text-xs text-ink-400">{combo.description}</span>
                    </li>
              )}
                </ul>
              </section>
          }

            {card.sources.length > 0 &&
          <section className="border-t border-ink/15 pt-3">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-400">Nguồn tham khảo</h3>
                <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs text-ink-600">
                  {card.sources.map((s) =>
              <li key={s}>{s}</li>
              )}
                </ul>
              </section>
          }
          </div>
        </div>
      }
    </Modal>);

}