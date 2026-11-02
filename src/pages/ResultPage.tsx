import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, BookOpenIcon, CheckIcon, CoinsIcon, LockOpenIcon, RotateCcwIcon, ZapIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { Button } from '../components/common/Button';
import { HistoryModal } from '../components/modals/HistoryModal';
import { BALANCE } from '../data/balance';
import { IMAGES } from '../data/images';
import { stages } from '../data/stages';
import { getStage, useGameStore } from '../hooks/useGameStore';
import { milestoneThresholds } from '../utils/reward';

const EASE = [0.23, 1, 0.32, 1] as const;

export function ResultPage() {
  const result = useGameStore((s) => s.lastResult);
  const coins = useGameStore((s) => s.player.coins);
  const quizDone = useGameStore((s) => result ? Boolean(s.quizAnswered[result.stage]) : false);
  const continueAfterResult = useGameStore((s) => s.continueAfterResult);
  const [history, setHistory] = useState(false);

  if (!result) return null;
  const stage = getStage(result.stage);
  const thresholds = milestoneThresholds(stage.target);
  const isLast = result.stage >= stages.length;

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-army-900 px-4 py-8">
      <img src={IMAGES.battlefield} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-army-900/75" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: EASE }}
        className="relative mx-auto max-w-4xl">
        
        <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-paper/60">
          Màn {stage.id} · {stage.period}
        </p>
        <h1 className={twMerge('mt-1 text-center font-display text-6xl font-extrabold uppercase sm:text-7xl', result.passed ? 'text-gold' : 'text-flag')}>
          {result.passed ? 'Vượt màn' : 'Thất bại'}
        </h1>
        <p className="mt-1 text-center font-display text-2xl font-bold uppercase">{stage.name}</p>
        {result.endedByWill &&
        <p className="mt-2 text-center text-sm text-paper/70">
            Ý chí chiến đấu đã cạn. {result.passed ? 'Bạn vẫn vượt màn nhờ đã đạt mốc 1.' : 'Chưa đạt mốc 1 — hãy củng cố đội hình và thử lại.'}
          </p>
        }
        {!result.passed && !result.endedByWill &&
        <p className="mt-2 text-center text-sm text-paper/70">Chưa đạt mốc sát thương đầu tiên. Hãy củng cố đội hình và thử lại.</p>
        }

        <div className="mt-8 grid gap-4 md:grid-cols-[1.3fr_1fr]">
          <section className="rounded-xl border border-gold/20 bg-army-800/90 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/55">Tổng sát thương</p>
            <p className="font-display text-6xl font-extrabold tabular-nums text-gold">{result.totalDamage.toLocaleString('vi-VN')}</p>
            <p className="text-sm text-paper/55">Mục tiêu {stage.target.toLocaleString('vi-VN')}</p>
            <ol className="mt-4 grid grid-cols-4 gap-2">
              {thresholds.map((t, i) =>
              <li
                key={i}
                className={twMerge('rounded-md p-2 text-center', result.milestones[i] ? 'bg-gold text-ink' : 'bg-black/30 text-paper/45')}>
                
                  <span className="flex items-center justify-center gap-1 font-display text-sm font-bold uppercase">
                    {result.milestones[i] && <CheckIcon className="h-3.5 w-3.5" />}Mốc {i + 1}
                  </span>
                  <span className="block font-display text-base font-bold">{t.toLocaleString('vi-VN')}</span>
                  <span className="text-[11px] font-semibold">+{BALANCE.milestones[i].coins} xu</span>
                </li>
              )}
            </ol>
          </section>

          <section className="rounded-xl border border-gold/20 bg-army-800/90 p-5">
            <dl className="space-y-3">
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-paper/70">
                  <CoinsIcon className="h-4 w-4 text-gold" /> Xu nhận được
                </dt>
                <dd className="font-display text-2xl font-bold text-gold">+{result.coinsEarned}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-paper/70">
                  <ZapIcon className="h-4 w-4 text-gold" /> Lượt kích hoạt kỹ năng
                </dt>
                <dd className="font-display text-2xl font-bold">{result.skillActivations}</dd>
              </div>
              <div className="flex items-center justify-between text-sm">
                <dt className="text-paper/70">Số xu hiện có</dt>
                <dd className="font-semibold">{coins}</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-paper/55">Combo đã kích hoạt</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {result.combos.length === 0 && <span className="text-sm text-paper/45">Chưa có combo nào</span>}
              {result.combos.map((c) =>
              <span key={c} className="rounded bg-gold/15 px-2 py-0.5 text-xs font-semibold text-gold">
                  {c}
                </span>
              )}
            </div>
          </section>
        </div>

        {result.unlockedSlot &&
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, delay: 0.15, ease: EASE }}
          className="mt-4 flex items-center gap-3 rounded-xl border border-gold bg-gold/15 p-4">
          
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-gold text-ink">
              <LockOpenIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-xl font-bold uppercase text-gold">Mở khóa vị trí chiến đấu {result.unlockedSlot}</p>
              <p className="text-sm text-paper/70">Đội hình của bạn giờ có {result.unlockedSlot} vị trí.</p>
            </div>
          </motion.div>
        }

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button variant="dark" size="lg" onClick={() => setHistory(true)}>
            <BookOpenIcon className="h-5 w-5" /> Kiến thức lịch sử
            {result.passed && !quizDone && <span className="rounded bg-flag px-1.5 text-xs">+1 xu</span>}
          </Button>
          <Button variant={result.passed ? 'gold' : 'primary'} size="lg" onClick={continueAfterResult}>
            {result.passed ?
            <>
                {isLast ? 'Hoàn thành hành trình' : 'Tiếp tục'} <ArrowRightIcon className="h-5 w-5" />
              </> :

            <>
                <RotateCcwIcon className="h-5 w-5" /> Đánh lại màn
              </>
            }
          </Button>
        </div>
      </motion.div>

      <HistoryModal open={history} onClose={() => setHistory(false)} stage={stage} allowQuiz={result.passed} />
    </main>);

}