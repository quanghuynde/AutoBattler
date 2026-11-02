import React, { useState } from 'react';
import { CoinsIcon, HomeIcon, RefreshCwIcon, SwordsIcon } from 'lucide-react';
import { toast } from 'sonner';
import { BALANCE } from '../../data/balance';
import { useCardActions } from '../../contexts/CardActionsContext';
import { getStage, useGameStore } from '../../hooks/useGameStore';
import { useSound } from '../../hooks/useSound';
import { useUiStore } from '../../hooks/useUiStore';
import { hasRoom } from '../../utils/inventory';
import { tierOdds } from '../../utils/shop';
import { Button } from '../common/Button';
import { GameLogo } from '../common/GameLogo';
import { GuideModal } from '../modals/GuideModal';
import { ArmyPanel } from './ArmyPanel';
import { ShopItemCard } from './ShopItemCard';
export function ShopView() {
  const player = useGameStore((s) => s.player);
  const shop = useGameStore((s) => s.shop);
  const buyItem = useGameStore((s) => s.buyItem);
  const refreshShop = useGameStore((s) => s.refreshShop);
  const closeShop = useGameStore((s) => s.closeShop);
  const setView = useUiStore((s) => s.setView);
  const flashCard = useUiStore((s) => s.flashCard);
  const {
    openDetail
  } = useCardActions();
  const play = useSound();
  const [guide, setGuide] = useState(false);
  const stage = getStage(player.stage);
  const odds = tierOdds(player.stage);
  const room = hasRoom(player);
  const buy = (id: string) => {
    const r = buyItem(id);
    if (r.ok) {
      play('buy');
      if (r.uid) flashCard(r.uid);
      toast.success(r.message ?? 'Đã mua thẻ');
    } else {
      play('error');
      toast.error(r.message);
    }
  };
  const refresh = () => {
    const r = refreshShop();
    if (r.ok) play('click');else {
      play('error');
      toast.error(r.message);
    }
  };
  return <div className="min-h-screen w-full bg-army-900 text-paper">
      <header className="sticky top-0 z-20 flex flex-wrap items-center gap-4 border-b border-gold/20 bg-army-900/95 px-4 py-2 backdrop-blur">
        <GameLogo compact />
        <div className="border-l border-gold/15 pl-4 leading-tight">
          <p className="font-display text-base font-bold uppercase">Cửa hàng hậu cần</p>
          <p className="text-xs text-paper/55">
            Chuẩn bị cho màn {stage.id}: {stage.name} ({stage.period})
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-md bg-black/30 px-3 py-1">
          <CoinsIcon className="h-5 w-5 text-gold" />
          <span className="font-display text-2xl font-bold text-gold">{player.coins}</span>
          <span className="text-xs text-paper/60">xu</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button type="button" aria-label="Hướng dẫn" onClick={() => setGuide(true)} className="grid h-9 w-9 place-items-center rounded-md hover:bg-white/10">
            <div className="h-5 w-5" />
          </button>
          <button type="button" aria-label="Về trang chủ" onClick={() => setView('home')} className="grid h-9 w-9 place-items-center rounded-md hover:bg-white/10">
            <HomeIcon className="h-5 w-5" />
          </button>
          <Button variant="primary" onClick={closeShop}>
            <SwordsIcon className="h-4 w-4" /> Vào trận
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-[1360px] space-y-5 px-4 py-5">
        <section aria-label="Thẻ đang bán">
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <h1 className="font-display text-3xl font-extrabold uppercase tracking-wide">Tuyển mộ lực lượng</h1>
              <p className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-paper/55">
                <span>Tỷ lệ cấp thẻ màn {player.stage}:</span>
                {odds.map((o, i) => <span key={i} className={o === 0 ? 'text-paper/25' : ''}>
                    C{i + 1} {o}%
                  </span>)}
              </p>
            </div>
            <Button variant="dark" className="ml-auto" onClick={refresh} disabled={player.coins < BALANCE.refreshCost}>
              <RefreshCwIcon className="h-4 w-4" /> Refresh · {BALANCE.refreshCost} xu
            </Button>
          </div>
          {!room && <p className="mt-3 rounded-md border border-flag/40 bg-flag/15 px-3 py-2 text-sm">
              Đội hình và kho đã đầy. Hãy bán hoặc ghép thẻ để có chỗ mua thêm.
            </p>}
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {shop.map((item) => <ShopItemCard key={item.id} item={item} coins={player.coins} hasRoom={room} onBuy={() => buy(item.id)} onInspect={() => openDetail({
            uid: item.id,
            cardId: item.cardId,
            star: item.star
          })} />)}
          </div>
        </section>

        <ArmyPanel player={player} />
      </main>

      <GuideModal open={guide} onClose={() => setGuide(false)} />
    </div>;
}