import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookMarkedIcon, PlayIcon, RotateCcwIcon, SettingsIcon } from 'lucide-react';
import { Button } from '../components/common/Button';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { GameLogo } from '../components/common/GameLogo';
import { GuideModal } from '../components/modals/GuideModal';
import { SettingsModal } from '../components/modals/SettingsModal';
import { IMAGES } from '../data/images';
import { useGameStore, getStage } from '../hooks/useGameStore';
import { useUiStore } from '../hooks/useUiStore';
export function HomePage() {
  const active = useGameStore((s) => s.active);
  const phase = useGameStore((s) => s.phase);
  const player = useGameStore((s) => s.player);
  const newGame = useGameStore((s) => s.newGame);
  const setView = useUiStore((s) => s.setView);
  const [confirmNew, setConfirmNew] = useState(false);
  const [guide, setGuide] = useState(false);
  const [settings, setSettings] = useState(false);
  const hasProgress = active && phase !== 'victory';
  const startNew = () => {
    newGame();
    setView('game');
  };
  return <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-army-900 px-4 py-10">
      <img src={IMAGES.homeHero} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-army-900/65" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-army-900/60" />

      <motion.div initial={{
      opacity: 0,
      y: 12
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1]
    }} className="relative flex w-full max-w-xl flex-col items-center">
        <GameLogo />
        <p className="mt-6 max-w-md text-center text-base leading-relaxed text-paper/85 sm:text-lg">
          Hành trình lịch sử không chỉ được ghi nhớ. Hãy tự mình tập hợp sức mạnh và vượt qua những thử thách.
        </p>

        <nav aria-label="Menu chính" className="mt-10 flex w-full max-w-xs flex-col gap-3">
          <Button variant="primary" size="lg" onClick={() => hasProgress ? setConfirmNew(true) : startNew()}>
            <PlayIcon className="h-5 w-5" /> Bắt đầu chơi
          </Button>
          <Button variant="gold" size="lg" disabled={!active} onClick={() => setView('game')}>
            <RotateCcwIcon className="h-5 w-5" /> Tiếp tục
          </Button>
          {active && <p className="-mt-1 text-center text-xs text-paper/60">
              {phase === 'victory' ? 'Đã hoàn thành hành trình' : `Màn ${player.stage}: ${getStage(player.stage).name} · ${player.coins} xu`}
            </p>}
          <div className="mt-2 grid grid-cols-3 gap-2">
            <Button variant="dark" size="sm" className="h-11 flex-col gap-0.5 px-1 text-xs" onClick={() => setView('collection')}>
              <BookMarkedIcon className="h-4 w-4" /> Bộ sưu tập
            </Button>
            <Button variant="dark" size="sm" className="h-11 flex-col gap-0.5 px-1 text-xs" onClick={() => setGuide(true)}>
              <div className="h-4 w-4" /> Hướng dẫn
            </Button>
            <Button variant="dark" size="sm" className="h-11 flex-col gap-0.5 px-1 text-xs" onClick={() => setSettings(true)}>
              <SettingsIcon className="h-4 w-4" /> Cài đặt
            </Button>
          </div>
        </nav>
      </motion.div>

      <ConfirmDialog open={confirmNew} danger title="Bắt đầu ván mới?" message={`Bạn đang có tiến trình chưa hoàn thành ở màn ${player.stage}. Bắt đầu ván mới sẽ xóa tiến trình hiện tại (bộ sưu tập vẫn được giữ).`} confirmLabel="Chơi ván mới" onCancel={() => setConfirmNew(false)} onConfirm={() => {
      setConfirmNew(false);
      startNew();
    }} />
      <GuideModal open={guide} onClose={() => setGuide(false)} />
      <SettingsModal open={settings} onClose={() => setSettings(false)} />
    </main>;
}