import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookMarkedIcon, HomeIcon, RotateCcwIcon, StarIcon } from 'lucide-react';
import { Button } from '../components/common/Button';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { cards } from '../data/cards';
import { IMAGES } from '../data/images';
import { stages } from '../data/stages';
import { useGameStore } from '../hooks/useGameStore';
import { useMetaStore } from '../hooks/useMetaStore';
import { useUiStore } from '../hooks/useUiStore';

export function VictoryPage() {
  const cleared = useGameStore((s) => s.clearedStages.length);
  const coins = useGameStore((s) => s.player.coins);
  const claimed = useGameStore((s) => s.claimedMilestones);
  const newGame = useGameStore((s) => s.newGame);
  const unlocked = useMetaStore((s) => s.unlockedCards.length);
  const setView = useUiStore((s) => s.setView);
  const [confirm, setConfirm] = useState(false);
  const milestoneCount = Object.values(claimed).reduce((sum, list) => sum + list.filter(Boolean).length, 0);

  const stats: [string, string][] = [
  ['Màn đã vượt', `${cleared}/${stages.length}`],
  ['Mốc sát thương đạt', `${milestoneCount}/${stages.length * 4}`],
  ['Hồ sơ lịch sử', `${unlocked}/${cards.length}`],
  ['Xu còn lại', `${coins}`]];


  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-army-900 px-4 py-10">
      <img src={IMAGES.homeHero} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-army-900/70" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full max-w-3xl text-center">
        
        <StarIcon className="mx-auto h-14 w-14 fill-gold text-gold" />
        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-paper/70">1930 — nay</p>
        <h1 className="mt-1 font-display text-6xl font-extrabold uppercase leading-none text-paper sm:text-7xl">Hoàn thành hành trình</h1>
        <p className="mx-auto mt-4 max-w-xl text-paper/80">
          Bạn đã đi qua 10 chặng đường lịch sử — từ ngày Đảng ra đời, qua các cuộc kháng chiến giành độc lập, thống nhất đất nước đến công cuộc Đổi mới và hội nhập.
        </p>
        <dl className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-gold/30 bg-gold/20 sm:grid-cols-4">
          {stats.map(([k, v]) =>
          <div key={k} className="bg-army-800/95 px-3 py-4">
              <dd className="font-display text-3xl font-bold text-gold">{v}</dd>
              <dt className="mt-0.5 text-xs text-paper/60">{k}</dt>
            </div>
          )}
        </dl>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button variant="gold" size="lg" onClick={() => setView('collection')}>
            <BookMarkedIcon className="h-5 w-5" /> Bộ sưu tập
          </Button>
          <Button variant="primary" size="lg" onClick={() => setConfirm(true)}>
            <RotateCcwIcon className="h-5 w-5" /> Chơi lại từ đầu
          </Button>
          <Button variant="dark" size="lg" onClick={() => setView('home')}>
            <HomeIcon className="h-5 w-5" /> Trang chủ
          </Button>
        </div>
      </motion.div>
      <ConfirmDialog
        open={confirm}
        title="Chơi lại từ đầu?"
        message="Ván mới sẽ bắt đầu từ màn 1. Bộ sưu tập thẻ của bạn vẫn được giữ nguyên."
        confirmLabel="Bắt đầu"
        onCancel={() => setConfirm(false)}
        onConfirm={() => {
          setConfirm(false);
          newGame();
        }} />
      
    </main>);

}