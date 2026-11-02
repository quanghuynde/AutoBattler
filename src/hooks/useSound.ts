import { useCallback } from 'react';
import { playSound, type SoundName } from '../utils/sound';
import { useMetaStore } from './useMetaStore';

export function useSound(): (name: SoundName) => void {
  const enabled = useMetaStore((s) => s.settings.sound);
  return useCallback((name: SoundName) => playSound(name, enabled), [enabled]);
}