import React, { useState } from 'react';
import { CheckCircle2Icon, CoinsIcon, XCircleIcon } from 'lucide-react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { BALANCE } from '../../data/balance';
import { questions } from '../../data/questions';
import { useGameStore } from '../../hooks/useGameStore';
import { useSound } from '../../hooks/useSound';
import type { Stage } from '../../types/game';
import { Modal } from '../common/Modal';

interface HistoryModalProps {
  open: boolean;
  onClose: () => void;
  stage: Stage;
  allowQuiz: boolean;
}

export function HistoryModal({ open, onClose, stage, allowQuiz }: HistoryModalProps) {
  const answered = useGameStore((s) => Boolean(s.quizAnswered[stage.id]));
  const answerQuiz = useGameStore((s) => s.answerQuiz);
  const play = useSound();
  const [choice, setChoice] = useState<number | null>(null);
  const question = questions.find((q) => q.stage === stage.id);
  const { history } = stage;

  const submit = (idx: number) => {
    if (!question || answered || choice !== null) return;
    setChoice(idx);
    const correct = idx === question.answer;
    const r = answerQuiz(stage.id, correct);
    if (r.ok && correct) {
      play('coin');
      toast.success(`Chính xác! +${BALANCE.quizReward} xu`);
    } else if (r.ok) {
      play('error');
    }
  };

  const revealed = choice !== null || answered;

  return (
    <Modal open={open} onClose={onClose} tone="paper" size="lg" title={history.title} subtitle={`Màn ${stage.id} · ${stage.period}`}>
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <p className="text-sm leading-relaxed text-ink-600">{history.summary}</p>
          <h3 className="mt-4 font-display text-base font-bold uppercase">Mốc thời gian</h3>
          <ol className="mt-2 border-l-2 border-flag/50 pl-4">
            {history.timeline.map((t) =>
            <li key={t.time} className="relative pb-3 last:pb-0">
                <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-flag" />
                <p className="font-display text-sm font-bold text-flag">{t.time}</p>
                <p className="text-sm text-ink-600">{t.text}</p>
              </li>
            )}
          </ol>
          <h3 className="mt-4 font-display text-base font-bold uppercase">Nhân vật & sự kiện liên quan</h3>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {history.related.map((r) =>
            <span key={r} className="rounded border border-ink/20 px-2 py-0.5 text-xs font-semibold">
                {r}
              </span>
            )}
          </div>
          <h3 className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-400">Nguồn tham khảo</h3>
          <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs text-ink-600">
            {history.sources.map((s) =>
            <li key={s}>{s}</li>
            )}
          </ul>
        </div>

        {question &&
        <section className="h-fit rounded-lg bg-ink p-4 text-paper">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold uppercase text-gold">Câu hỏi lịch sử</h3>
              <span className="flex items-center gap-1 text-xs text-paper/70">
                <CoinsIcon className="h-3.5 w-3.5 text-gold" /> +{BALANCE.quizReward} xu
              </span>
            </div>
            <p className="mt-2 font-semibold">{question.question}</p>
            <div className="mt-3 grid gap-2">
              {question.options.map((opt, i) => {
              const isAnswer = i === question.answer;
              const isChoice = i === choice;
              return (
                <button
                  key={opt}
                  type="button"
                  disabled={!allowQuiz || revealed}
                  onClick={() => submit(i)}
                  className={twMerge(
                    'flex items-center justify-between rounded-md border px-3 py-2 text-left text-sm transition-colors duration-150',
                    !revealed && 'border-paper/20 hover:border-gold hover:bg-gold/10',
                    revealed && isAnswer && 'border-gold bg-gold text-ink',
                    revealed && isChoice && !isAnswer && 'border-flag bg-flag/30',
                    revealed && !isAnswer && !isChoice && 'border-paper/10 text-paper/50'
                  )}>
                  
                    {opt}
                    {revealed && isAnswer && <CheckCircle2Icon className="h-4 w-4" />}
                    {revealed && isChoice && !isAnswer && <XCircleIcon className="h-4 w-4" />}
                  </button>);

            })}
            </div>
            {revealed &&
          <p className="mt-3 text-sm text-paper/80">
                {choice !== null && choice !== question.answer && <strong className="text-flag">Chưa chính xác. </strong>}
                {choice === null && answered && <span className="text-paper/60">Bạn đã trả lời câu hỏi này. </span>}
                {question.explanation}
              </p>
          }
            {!allowQuiz && !revealed && <p className="mt-3 text-xs text-paper/55">Vượt màn để mở câu hỏi nhận thưởng.</p>}
          </section>
        }
      </div>
    </Modal>);

}