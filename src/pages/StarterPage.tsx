import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { CardView } from '../components/cards/CardView';
import { Button } from '../components/common/Button';
import { GameLogo } from '../components/common/GameLogo';
import { GuideModal } from '../components/modals/GuideModal';
import { IMAGES } from '../data/images';
import { useGameStore } from '../hooks/useGameStore';
import { useMetaStore } from '../hooks/useMetaStore';
import { useSound } from '../hooks/useSound';
import { getCardDef } from '../utils/cards';

export function StarterPage() {
  const choices = useGameStore((s) => s.starterChoices);
  const confirmStarter = useGameStore((s) => s.confirmStarter);
  const newGame = useGameStore((s) => s.newGame);
  const tutorialSeen = useMetaStore((s) => s.tutorialSeen);
  const markTutorialSeen = useMetaStore((s) => s.markTutorialSeen);
  const play = useSound();
  const [selected, setSelected] = useState<string[]>([]);
  const [guide, setGuide] = useState(!tutorialSeen);

  if (choices.length === 0) {
    return (
      <main className="grid min-h-screen place-items-center bg-army-900">
        <Button variant="primary" onClick={newGame}>
          Nhận thẻ khởi đầu
        </Button>
      </main>);

  }

  const toggle = (uid: string) => {
    play('click');
    setSelected((s) => s.includes(uid) ? s.filter((x) => x !== uid) : s.length >= 2 ? [s[1], uid] : [...s, uid]);
  };

  const confirm = () => {
    const r = confirmStarter(selected);
    if (!r.ok) {
      play('error');
      toast.error(r.message);
    } else {
      play('buy');
      toast.success('Đội hình đã sẵn sàng!', { description: 'Thẻ còn lại đã được đưa vào kho lưu trữ.' });
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-army-900 px-4 py-6">
      <img src={IMAGES.battlefield} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-army-900/70" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center">
        <GameLogo compact />
        <h1 className="mt-8 text-center font-display text-4xl font-extrabold uppercase tracking-wide sm:text-5xl">Chọn đội hình xuất phát</h1>
        <p className="mt-2 max-w-xl text-center text-paper/75">
          Bạn được cấp 3 thẻ tấn công cấp 1. Chọn <strong className="text-gold">2 thẻ</strong> để đưa vào 2 vị trí chiến đấu — thẻ còn lại sẽ vào kho lưu trữ.
        </p>

        <div className="mt-10 grid w-full grid-cols-1 justify-items-center gap-8 sm:grid-cols-3">
          {choices.map((c, i) => {
            const def = getCardDef(c.cardId);
            const order = selected.indexOf(c.uid);
            const isSelected = order >= 0;
            return (
              <motion.div
                key={c.uid}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
                className="flex w-[220px] flex-col items-center">
                
                <button
                  type="button"
                  onClick={() => toggle(c.uid)}
                  aria-pressed={isSelected}
                  className={twMerge(
                    'relative h-[308px] w-[220px] rounded-xl transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold',
                    isSelected && 'shadow-[0_0_0_4px_#D8AD62]'
                  )}>
                  
                  <CardView instance={c} showTooltip={false} />
                  {isSelected &&
                  <span className="absolute -right-3 -top-3 grid h-9 w-9 place-items-center rounded-full bg-gold font-display text-lg font-bold text-ink shadow-lg">
                      {order + 1}
                    </span>
                  }
                </button>
                {def &&
                <div className="mt-3 text-center">
                    <p className="font-display text-sm font-bold uppercase text-gold">{def.skill.name}</p>
                    <p className="mt-0.5 text-xs leading-snug text-paper/70">{def.skill.description}</p>
                    <p className="mt-1 text-[11px] text-paper/45">{isSelected ? `Vị trí chiến đấu ${order + 1}` : 'Chưa chọn — sẽ vào kho'}</p>
                  </div>
                }
              </motion.div>);

          })}
        </div>

        <Button variant="primary" size="lg" className="mt-10 min-w-[280px]" disabled={selected.length !== 2} onClick={confirm}>
          <CheckIcon className="h-5 w-5" /> Xác nhận đội hình ({selected.length}/2)
        </Button>
      </div>

      <GuideModal
        open={guide}
        onClose={() => {
          setGuide(false);
          markTutorialSeen();
        }} />
      
    </main>);

}