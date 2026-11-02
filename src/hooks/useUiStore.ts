import { create } from 'zustand';

export type View = 'home' | 'game' | 'collection';

interface UiStore {
  view: View;
  highlightUid: string | null;
  setView: (view: View) => void;
  flashCard: (uid: string) => void;
}

export const useUiStore = create<UiStore>()((set) => ({
  view: 'home',
  highlightUid: null,
  setView: (view) => set({ view }),
  flashCard: (uid) => {
    set({ highlightUid: uid });
    window.setTimeout(() => set((s) => s.highlightUid === uid ? { highlightUid: null } : s), 1200);
  }
}));