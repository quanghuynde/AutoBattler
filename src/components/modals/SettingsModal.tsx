import React, { useState } from 'react';
import { SparklesIcon, Trash2Icon, Volume2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { useGameStore } from '../../hooks/useGameStore';
import { useMetaStore } from '../../hooks/useMetaStore';
import { useUiStore } from '../../hooks/useUiStore';
import type { Settings } from '../../types/game';
import { Button } from '../common/Button';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { Modal } from '../common/Modal';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export function SettingsModal({ open, onClose }: SettingsModalProps) {
  const settings = useMetaStore((s) => s.settings);
  const setSetting = useMetaStore((s) => s.setSetting);
  const resetCollection = useMetaStore((s) => s.resetCollection);
  const resetGame = useGameStore((s) => s.resetGame);
  const setView = useUiStore((s) => s.setView);
  const [confirmReset, setConfirmReset] = useState(false);

  const rows: {key: keyof Settings;label: string;hint: string;icon: React.ReactNode;}[] = [
  { key: 'sound', label: 'Âm thanh', hint: 'Hiệu ứng âm thanh khi đánh, mua, ghép thẻ.', icon: <Volume2Icon className="h-5 w-5" /> },
  { key: 'effects', label: 'Hiệu ứng đầy đủ', hint: 'Tắt để trận đấu diễn ra nhanh hơn.', icon: <SparklesIcon className="h-5 w-5" /> }];


  return (
    <>
      <Modal open={open} onClose={onClose} title="Cài đặt" size="sm">
        <ul className="divide-y divide-gold/10">
          {rows.map((r) =>
          <li key={r.key} className="flex items-center gap-3 py-3">
              <span className="text-gold">{r.icon}</span>
              <div className="flex-1">
                <p className="font-semibold">{r.label}</p>
                <p className="text-xs text-paper/55">{r.hint}</p>
              </div>
              <button
              type="button"
              role="switch"
              aria-checked={settings[r.key]}
              aria-label={r.label}
              onClick={() => setSetting(r.key, !settings[r.key])}
              className={`relative h-6 w-11 rounded-full transition-colors duration-150 ${settings[r.key] ? 'bg-gold' : 'bg-paper/20'}`}>
              
                <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper shadow transition-transform duration-150 ease-out ${
                settings[r.key] ? 'translate-x-5' : 'translate-x-0.5'}`
                } />
              
              </button>
            </li>
          )}
        </ul>
        <div className="mt-4 rounded-lg border border-flag/40 bg-flag/10 p-3">
          <p className="font-semibold text-paper">Xóa dữ liệu</p>
          <p className="mt-0.5 text-xs text-paper/60">Xóa tiến trình hiện tại và bộ sưu tập để chơi lại từ đầu.</p>
          <Button variant="primary" size="sm" className="mt-3" onClick={() => setConfirmReset(true)}>
            <Trash2Icon className="h-4 w-4" /> Xóa dữ liệu
          </Button>
        </div>
      </Modal>
      <ConfirmDialog
        open={confirmReset}
        danger
        title="Xóa toàn bộ dữ liệu?"
        message="Toàn bộ tiến trình, xu, đội hình và bộ sưu tập sẽ bị xóa vĩnh viễn. Cài đặt âm thanh được giữ lại."
        confirmLabel="Xóa vĩnh viễn"
        onCancel={() => setConfirmReset(false)}
        onConfirm={() => {
          resetGame();
          resetCollection();
          setConfirmReset(false);
          onClose();
          setView('home');
          toast.success('Đã xóa dữ liệu. Sẵn sàng cho hành trình mới.');
        }} />
      
    </>);

}