import React, { useMemo, useState } from 'react';
import { ArrowLeftIcon, LockIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { CardView } from '../components/cards/CardView';
import { CardDetailModal } from '../components/modals/CardDetailModal';
import { cards } from '../data/cards';
import { CATEGORY_LABELS, TIER_COLORS, TYPE_LABELS } from '../data/labels';
import { stages } from '../data/stages';
import { useMetaStore } from '../hooks/useMetaStore';
import { useUiStore } from '../hooks/useUiStore';
import type { CardCategory, CardInstance } from '../types/game';

type Status = 'all' | 'unlocked' | 'locked';

const CATEGORIES = Object.keys(CATEGORY_LABELS) as CardCategory[];

export function CollectionPage() {
  const unlocked = useMetaStore((s) => s.unlockedCards);
  const setView = useUiStore((s) => s.setView);
  const [category, setCategory] = useState<CardCategory | 'all'>('all');
  const [tier, setTier] = useState('all');
  const [type, setType] = useState('all');
  const [period, setPeriod] = useState('all');
  const [status, setStatus] = useState<Status>('all');
  const [detail, setDetail] = useState<CardInstance | null>(null);

  const filtered = useMemo(
    () =>
    cards.filter((c) => {
      const isUnlocked = unlocked.includes(c.id);
      if (category !== 'all' && c.category !== category) return false;
      if (tier !== 'all' && c.tier !== Number(tier)) return false;
      if (type !== 'all' && c.type !== type) return false;
      if (period !== 'all' && c.period !== Number(period)) return false;
      if (status === 'unlocked' && !isUnlocked) return false;
      if (status === 'locked' && isUnlocked) return false;
      return true;
    }),
    [unlocked, category, tier, type, period, status]
  );

  const pct = Math.round(unlocked.length / cards.length * 100);

  return (
    <main className="min-h-screen w-full bg-army-900 px-3 py-4 sm:px-6">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setView('home')}
            className="flex h-10 items-center gap-2 rounded-md px-3 font-display font-bold uppercase text-paper transition-colors duration-150 hover:bg-white/10">
            
            <ArrowLeftIcon className="h-5 w-5" /> Trang chủ
          </button>
        </div>

        <div className="paper-texture rounded-xl border border-ink/20 p-4 text-ink shadow-2xl sm:p-6">
          <header className="flex flex-wrap items-end gap-4 border-b-2 border-ink/80 pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-flag">Hồ sơ lưu trữ</p>
              <h1 className="font-display text-4xl font-extrabold uppercase leading-none sm:text-5xl">Bộ sưu tập lịch sử</h1>
            </div>
            <div className="ml-auto w-full max-w-xs">
              <div className="flex justify-between text-sm font-semibold">
                <span>Đã mở khóa</span>
                <span>
                  {unlocked.length}/{cards.length}
                </span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-ink/15">
                <div className="h-full bg-flag" style={{ width: `${pct}%` }} />
              </div>
            </div>
          </header>

          <nav aria-label="Phân loại" className="scrollbar-thin -mx-1 mt-4 flex gap-1 overflow-x-auto px-1">
            {(['all', ...CATEGORIES] as const).map((c) =>
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={twMerge(
                'whitespace-nowrap rounded-md px-3 py-1.5 font-display text-sm font-bold uppercase tracking-wide transition-colors duration-150',
                category === c ? 'bg-ink text-paper' : 'text-ink-600 hover:bg-ink/10'
              )}>
              
                {c === 'all' ? 'Tất cả' : CATEGORY_LABELS[c]}
              </button>
            )}
          </nav>

          <div className="mt-3 flex flex-wrap gap-2">
            <FilterSelect label="Cấp thẻ" value={tier} onChange={setTier} options={[['all', 'Mọi cấp'], ...[1, 2, 3, 4, 5].map((t) => [String(t), `Cấp ${t}`] as [string, string])]} />
            <FilterSelect label="Loại thẻ" value={type} onChange={setType} options={[['all', 'Mọi loại'], ['attack', TYPE_LABELS.attack], ['support', TYPE_LABELS.support]]} />
            <FilterSelect
              label="Giai đoạn"
              value={period}
              onChange={setPeriod}
              options={[['all', 'Mọi giai đoạn'], ...stages.map((s) => [String(s.id), `${s.period} · ${s.name}`] as [string, string])]} />
            
            <FilterSelect
              label="Trạng thái"
              value={status}
              onChange={(v) => setStatus(v as Status)}
              options={[['all', 'Tất cả'], ['unlocked', 'Đã mở khóa'], ['locked', 'Chưa mở khóa']]} />
            
          </div>

          {filtered.length === 0 ?
          <p className="py-16 text-center text-ink-400">Không có hồ sơ nào khớp bộ lọc.</p> :

          <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {filtered.map((c) => {
              const isUnlocked = unlocked.includes(c.id);
              return (
                <li key={c.id} className="flex flex-col">
                    {isUnlocked ?
                  <div className="aspect-[5/7] w-full">
                        <CardView instance={{ uid: c.id, cardId: c.id, star: 1 }} onClick={() => setDetail({ uid: c.id, cardId: c.id, star: 1 })} />
                      </div> :

                  <div
                    className="flex aspect-[5/7] w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-ink/85 text-paper/50"
                    style={{ borderColor: TIER_COLORS[c.tier] }}>
                    
                        <LockIcon className="h-6 w-6" />
                        <span className="font-display text-sm font-bold uppercase">Cấp {c.tier}</span>
                        <span className="px-2 text-center text-[11px]">Sở hữu thẻ trong ván chơi để mở hồ sơ</span>
                      </div>
                  }
                    <p className="mt-2 text-xs font-semibold text-ink-400">{isUnlocked ? `${c.years} · ${CATEGORY_LABELS[c.category]}` : '???'}</p>
                  </li>);

            })}
            </ul>
          }
        </div>
      </div>

      <CardDetailModal open={detail !== null} instance={detail} canManage={false} onClose={() => setDetail(null)} onToggleZone={() => undefined} onSell={() => undefined} />
    </main>);

}

function FilterSelect({ label, value, onChange, options }: {label: string;value: string;onChange: (v: string) => void;options: [string, string][];}) {
  return (
    <label className="flex items-center gap-2 rounded-md border border-ink/25 bg-paper px-2 py-1 text-sm">
      <span className="text-ink-400">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="bg-transparent font-semibold text-ink outline-none">
        {options.map(([v, l]) =>
        <option key={v} value={v}>
            {l}
          </option>
        )}
      </select>
    </label>);

}