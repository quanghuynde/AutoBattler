import React, { useCallback, useMemo, useState } from 'react';
import { DndContext, DragOverlay, MouseSensor, TouchSensor, useSensor, useSensors, type DragEndEvent, type DragStartEvent } from '@dnd-kit/core';
import { toast } from 'sonner';
import { CardActionsContext } from '../../contexts/CardActionsContext';
import { useGameStore, type ActionResult } from '../../hooks/useGameStore';
import { useSound } from '../../hooks/useSound';
import { useUiStore } from '../../hooks/useUiStore';
import type { CardInstance, CardLocation } from '../../types/game';
import { getCardDef, sellPrice } from '../../utils/cards';
import { getAt } from '../../utils/inventory';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { CardDetailModal } from '../modals/CardDetailModal';
import { CardView } from './CardView';

export function CardActionsProvider({ children }: {children: React.ReactNode;}) {
  const moveCard = useGameStore((s) => s.moveCard);
  const toggleZone = useGameStore((s) => s.toggleZone);
  const sellCard = useGameStore((s) => s.sellCard);
  const phase = useGameStore((s) => s.phase);
  const player = useGameStore((s) => s.player);
  const flashCard = useUiStore((s) => s.flashCard);
  const play = useSound();

  const [dragCard, setDragCard] = useState<CardInstance | null>(null);
  const [detail, setDetail] = useState<{instance: CardInstance;loc?: CardLocation;} | null>(null);
  const [pendingSell, setPendingSell] = useState<CardLocation | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 160, tolerance: 6 } })
  );

  const handleResult = useCallback(
    (r: ActionResult) => {
      if (r.ok) {
        if (r.kind === 'merge' && r.uid) {
          play('merge');
          flashCard(r.uid);
          toast.success('Nâng sao thành công!', { description: 'Chỉ số của thẻ đã được tăng.' });
        } else {
          play('click');
        }
      } else if (r.message) {
        play('error');
        toast.error(r.message);
      }
    },
    [play, flashCard]
  );

  const requestSell = useCallback(
    (loc: CardLocation) => {
      if (phase === 'battle') {
        play('error');
        toast.error('Không thể bán thẻ khi trận đấu đang diễn ra.');
        return;
      }
      setPendingSell(loc);
    },
    [phase, play]
  );

  const onDragStart = (e: DragStartEvent) => {
    setDragCard(e.active.data.current?.card as CardInstance ?? null);
  };

  const onDragEnd = (e: DragEndEvent) => {
    setDragCard(null);
    const from = e.active.data.current?.loc as CardLocation | undefined;
    if (!from || !e.over) return;
    if (e.over.id === 'trash') {
      requestSell(from);
      return;
    }
    const to = e.over.data.current?.loc as CardLocation | undefined;
    if (!to || to.zone === from.zone && to.index === from.index) return;
    handleResult(moveCard(from, to));
  };

  const sellTarget = pendingSell ? getAt(player, pendingSell) : null;
  const sellDef = sellTarget ? getCardDef(sellTarget.cardId) : undefined;

  const value = useMemo(
    () => ({
      openDetail: (instance: CardInstance, loc?: CardLocation) => setDetail({ instance, loc }),
      requestSell,
      isDragging: dragCard !== null
    }),
    [requestSell, dragCard]
  );

  return (
    <CardActionsContext.Provider value={value}>
      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragCancel={() => setDragCard(null)}>
        {children}
        <DragOverlay dropAnimation={null}>
          {dragCard &&
          <div className="h-[165px] w-[118px] rotate-2 cursor-grabbing">
              <CardView instance={dragCard} showTooltip={false} />
            </div>
          }
        </DragOverlay>
      </DndContext>

      <CardDetailModal
        open={detail !== null}
        instance={detail?.instance ?? null}
        loc={detail?.loc}
        canManage={phase !== 'battle' && Boolean(detail?.loc)}
        onClose={() => setDetail(null)}
        onToggleZone={(loc) => {
          handleResult(toggleZone(loc));
          setDetail(null);
        }}
        onSell={(loc) => {
          setDetail(null);
          requestSell(loc);
        }} />
      

      <ConfirmDialog
        open={pendingSell !== null && Boolean(sellDef)}
        title="Bán thẻ?"
        danger
        confirmLabel={sellDef && sellTarget ? `Bán +${sellPrice(sellDef.tier, sellTarget.star)} xu` : 'Bán'}
        message={
        sellDef && sellTarget ?
        <p>
              Bạn sẽ bán <strong className="text-gold">{sellDef.name}</strong> ({sellTarget.star} sao, cấp {sellDef.tier}) và nhận lại{' '}
              <strong className="text-gold">{sellPrice(sellDef.tier, sellTarget.star)} xu</strong>. Thao tác này không thể hoàn tác.
            </p> :
        null
        }
        onCancel={() => setPendingSell(null)}
        onConfirm={() => {
          if (pendingSell) {
            const r = sellCard(pendingSell);
            if (r.ok) {
              play('coin');
              toast.success(r.message ?? 'Đã bán thẻ');
            } else {
              play('error');
              toast.error(r.message);
            }
          }
          setPendingSell(null);
        }} />
      
    </CardActionsContext.Provider>);

}