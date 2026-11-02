export type SoundName = 'hit' | 'merge' | 'buy' | 'coin' | 'error' | 'counter' | 'milestone' | 'victory' | 'defeat' | 'click' | 'buff';

type Tone = {freq: number;dur: number;type?: OscillatorType;delay?: number;gain?: number;};

const SOUNDS: Record<SoundName, Tone[]> = {
  hit: [{ freq: 180, dur: 0.08, type: 'square', gain: 0.05 }],
  merge: [
  { freq: 523, dur: 0.1 },
  { freq: 659, dur: 0.1, delay: 0.08 },
  { freq: 784, dur: 0.18, delay: 0.16 }],

  buy: [{ freq: 660, dur: 0.08 }, { freq: 880, dur: 0.1, delay: 0.06 }],
  coin: [{ freq: 988, dur: 0.06 }, { freq: 1319, dur: 0.12, delay: 0.05 }],
  error: [{ freq: 200, dur: 0.15, type: 'sawtooth', gain: 0.04 }],
  counter: [{ freq: 110, dur: 0.22, type: 'sawtooth', gain: 0.06 }],
  milestone: [{ freq: 784, dur: 0.1 }, { freq: 1047, dur: 0.2, delay: 0.1 }],
  victory: [
  { freq: 523, dur: 0.15 },
  { freq: 659, dur: 0.15, delay: 0.15 },
  { freq: 784, dur: 0.15, delay: 0.3 },
  { freq: 1047, dur: 0.35, delay: 0.45 }],

  defeat: [{ freq: 330, dur: 0.2 }, { freq: 247, dur: 0.35, delay: 0.2 }],
  click: [{ freq: 440, dur: 0.04, gain: 0.03 }],
  buff: [{ freq: 600, dur: 0.08, type: 'triangle' }, { freq: 900, dur: 0.1, type: 'triangle', delay: 0.06 }]
};

let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Ctor = window.AudioContext ?? (window as unknown as {webkitAudioContext?: typeof AudioContext;}).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

export function playSound(name: SoundName, enabled: boolean): void {
  if (!enabled) return;
  const audio = getContext();
  if (!audio) return;
  SOUNDS[name].forEach((tone) => {
    const start = audio.currentTime + (tone.delay ?? 0);
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = tone.type ?? 'sine';
    osc.frequency.value = tone.freq;
    gain.gain.setValueAtTime(tone.gain ?? 0.07, start);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + tone.dur);
    osc.connect(gain).connect(audio.destination);
    osc.start(start);
    osc.stop(start + tone.dur + 0.02);
  });
}