import React, { useMemo, useState } from 'react';
import { PlayIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Battlefield } from '../components/battlefield/Battlefield';
import { FormationBar } from '../components/battlefield/FormationBar';
import { StorageDrawer } from '../components/battlefield/StorageDrawer';
import { TopBar } from '../components/battlefield/TopBar';
import { CardActionsProvider } from '../components/cards/CardActionsProvider';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { ComboModal } from '../components/modals/ComboModal';
import { GuideModal } from '../components/modals/GuideModal';
import { SettingsModal } from '../components/modals/SettingsModal';
import { StageInfoModal } from '../components/modals/StageInfoModal';
import { TAG_LABELS } from '../data/labels';
import { useCombatRunner } from '../hooks/useCombatRunner';
import { getStage, useGameStore } from '../hooks/useGameStore';
import { useSound } from '../hooks/useSound';
import { useUiStore } from '../hooks/useUiStore';
import { evaluateCombos } from '../utils/combo';
import { fieldedCards } from '../utils/inventory';

type Panel = 'guide' | 'settings' | 'combo' | 'info' | null;

export function GamePage() {
  const phase = useGameStore((s) => s.phase);
  const player = useGameStore((s) => s.player);
  const startBattle = useGameStore((s) => s.startBattle);
  const openShop = useGameStore((s) => s.openShop);
  const setView = useUiStore((s) => s.setView);
  const play = useSound();

  const [paused, setPaused] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);
  const [storageOpen, setStorageOpen] = useState(false);

  const inBattle = phase === 'battle';
  const stage = getStage(player.stage);
  const display = useCombatRunner(paused || inBattle && panel !== null);

  const fielded = fieldedCards(player);
  const activeCombos = useMemo(() => {
    const evaluation = evaluateCombos(fielded.map((f) => f.card.cardId));
    return [...evaluation.activeTags.map((t) => `${TAG_LABELS[t.tag]} ×${t.count}`), ...evaluation.activeSpecials.map((c) => c.name)];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player.formation, player.unlockedSlots]);

  const coins = player.coins;
  const will = inBattle ? display.will : player.will;

  const handleStart = () => {
    const r = startBattle();
    if (!r.ok) {
      play('error');
      toast.error(r.message);
      return;
    }
    setStorageOpen(false);
    setPaused(false);
  };

  const handleShop = () => {
    const r = openShop();
    if (!r.ok) {
      play('error');
      toast.error(r.message);
    }
  };

  return (
    <CardActionsProvider>
      <div className="flex min-h-screen w-full flex-col bg-army-900 text-paper md:h-screen md:min-h-[640px]">
        <TopBar
          stage={stage}
          coins={coins}
          will={will}
          resistance={inBattle ? display.resistance : 0}
          floats={display.floats}
          inBattle={inBattle}
          paused={paused}
          onTogglePause={() => setPaused((p) => !p)}
          onHelp={() => setPanel('guide')}
          onSettings={() => setPanel('settings')}
          onHome={() => setView('home')} />
        

        <main className="relative min-h-[560px] flex-1 md:min-h-0">
          <Battlefield
            stage={stage}
            display={display}
            inBattle={inBattle}
            fieldedCount={fielded.length}
            activeCombos={activeCombos}
            onStart={handleStart}
            onOpenCombos={() => setPanel('combo')} />
          
          <StorageDrawer open={storageOpen} player={player} disabled={inBattle} onClose={() => setStorageOpen(false)} />
        </main>

        <FormationBar
          player={player}
          display={display}
          inBattle={inBattle}
          storageOpen={storageOpen}
          onToggleStorage={() => setStorageOpen((o) => !o)}
          onOpenShop={handleShop}
          onOpenCombos={() => setPanel('combo')}
          onOpenInfo={() => setPanel('info')} />
        
      </div>

      <Modal
        open={inBattle && paused && panel === null}
        onClose={() => setPaused(false)}
        title="Tạm dừng"
        size="sm"
        footer={
        <>
            <Button variant="ghost" onClick={() => setPanel('guide')}>
              Hướng dẫn
            </Button>
            <Button variant="gold" onClick={() => setPaused(false)}>
              <PlayIcon className="h-4 w-4" /> Tiếp tục trận
            </Button>
          </>
        }>
        
        <p className="text-paper/80">
          Trận đấu đang tạm dừng ở lượt {Math.max(display.turn, 1)}. Tổng sát thương hiện tại:{' '}
          <strong className="text-gold">{display.damage.toLocaleString('vi-VN')}</strong>.
        </p>
      </Modal>
      <GuideModal open={panel === 'guide'} onClose={() => setPanel(null)} />
      <SettingsModal open={panel === 'settings'} onClose={() => setPanel(null)} />
      <ComboModal open={panel === 'combo'} onClose={() => setPanel(null)} player={player} />
      <StageInfoModal open={panel === 'info'} onClose={() => setPanel(null)} stage={stage} player={player} />
    </CardActionsProvider>);

}