import React from 'react';
import { CoinsIcon, HeartIcon, HomeIcon, PauseIcon, PlayIcon, SettingsIcon } from 'lucide-react';
import { BALANCE } from '../../data/balance';
import type { FloatingText } from '../../hooks/useCombatRunner';
import type { Stage } from '../../types/game';
import { ResistanceMeter } from './ResistanceMeter';
import { GameLogo } from '../common/GameLogo';
interface TopBarProps {
  stage: Stage;
  coins: number;
  will: number;
  resistance: number;
  floats: FloatingText[];
  inBattle: boolean;
  paused: boolean;
  onTogglePause: () => void;
  onHelp: () => void;
  onSettings: () => void;
  onHome: () => void;
}
export function TopBar({
  stage,
  coins,
  will,
  resistance,
  floats,
  inBattle,
  paused,
  onTogglePause,
  onHelp,
  onSettings,
  onHome
}: TopBarProps) {
  const willPct = Math.max(0, Math.min(100, will / BALANCE.maxWill * 100));
  return <header className="relative z-20 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-gold/20 bg-army-900 px-3 py-2 sm:px-4">
      <GameLogo compact />

      <div className="flex items-center gap-2 border-l border-gold/15 pl-4">
        <span className="rounded bg-flag px-2 py-0.5 font-display text-sm font-bold uppercase text-paper">Màn {stage.id}</span>
        <div className="hidden leading-tight md:block">
          <p className="font-display text-sm font-bold uppercase text-paper">{stage.name}</p>
          <p className="text-[11px] text-paper/55">{stage.period}</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 rounded-md bg-black/25 px-2.5 py-1" title="Xu">
        <CoinsIcon className="h-4 w-4 text-gold" />
        <span className="font-display text-lg font-bold text-gold">{coins}</span>
      </div>

      <div className="flex min-w-[150px] items-center gap-2" title="Ý chí chiến đấu">
        <HeartIcon className="h-4 w-4 shrink-0 fill-flag text-flag" />
        <div className="flex-1">
          <div className="flex justify-between font-display text-xs uppercase tracking-wide">
            <span className="font-bold text-paper/80">Ý chí</span>
            <span className="font-bold">{will}</span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-paper/10">
            <div className="h-full rounded-full bg-flag transition-[width] duration-300 ease-out" style={{
            width: `${willPct}%`
          }} />
          </div>
        </div>
      </div>

      <ResistanceMeter value={resistance} floats={floats} className="min-w-[220px] flex-1 lg:max-w-[360px]" />

      <div className="ml-auto flex items-center gap-1">
        {inBattle && <button type="button" onClick={onTogglePause} className="flex h-9 items-center gap-1.5 rounded-md bg-gold px-3 font-display text-sm font-bold uppercase text-ink transition-colors duration-150 hover:bg-gold-300">
            {paused ? <PlayIcon className="h-4 w-4" /> : <PauseIcon className="h-4 w-4" />}
            {paused ? 'Tiếp tục' : 'Tạm dừng'}
          </button>}
        <IconButton label="Hướng dẫn" onClick={onHelp}>
          <div className="h-5 w-5" />
        </IconButton>
        <IconButton label="Cài đặt" onClick={onSettings}>
          <SettingsIcon className="h-5 w-5" />
        </IconButton>
        <IconButton label="Về trang chủ" onClick={onHome}>
          <HomeIcon className="h-5 w-5" />
        </IconButton>
      </div>
    </header>;
}
function IconButton({
  label,
  onClick,
  children




}: {label: string;onClick: () => void;children: React.ReactNode;}) {
  return <button type="button" onClick={onClick} aria-label={label} title={label} className="grid h-9 w-9 place-items-center rounded-md text-paper/75 transition-colors duration-150 hover:bg-white/10 hover:text-paper">
      {children}
    </button>;
}