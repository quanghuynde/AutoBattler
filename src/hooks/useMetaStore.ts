import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Settings } from '../types/game';

interface MetaStore {
  unlockedCards: string[];
  settings: Settings;
  tutorialSeen: boolean;
  unlockCards: (ids: string[]) => string[];
  setSetting: (key: keyof Settings, value: boolean) => void;
  markTutorialSeen: () => void;
  resetCollection: () => void;
}

export const useMetaStore = create<MetaStore>()(
  persist(
    (set, get) => ({
      unlockedCards: [],
      settings: { sound: true, effects: true },
      tutorialSeen: false,
      unlockCards: (ids) => {
        const current = get().unlockedCards;
        const fresh = Array.from(new Set(ids)).filter((id) => !current.includes(id));
        if (fresh.length > 0) set({ unlockedCards: [...current, ...fresh] });
        return fresh;
      },
      setSetting: (key, value) => set((s) => ({ settings: { ...s.settings, [key]: value } })),
      markTutorialSeen: () => set({ tutorialSeen: true }),
      resetCollection: () => set({ unlockedCards: [], tutorialSeen: false })
    }),
    { name: 'kc_meta_v1', storage: createJSONStorage(() => localStorage) }
  )
);