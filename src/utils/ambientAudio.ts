import { resolveThemeId, ThemeId, ThemeTapSound } from '../themes/themes';

const MUTE_STORAGE_KEY = 'sarson_subah_muted';

interface ThemeSynthProfile {
  droneFreqs: [number, number];
  scale: number[];
  pattern: number[];
  stepMs: number;
  oscType: OscillatorType;
  overtoneRatio: number;
  overtoneGain: number;
  attackSec: number;
  decaySec: number;
  percussivePulse?: boolean;
  doubleStrike?: boolean;
}

const THEME_SYNTH_PROFILES: Record<ThemeId, ThemeSynthProfile> = {
  // Sarson Subah: Plucked Tumbi-like bright folk pentatonic
  sarson_subah: {
    droneFreqs: [146.83, 220.0], // D3 + A3
    scale: [293.66, 329.63, 392.0, 440.0, 523.25, 587.33],
    pattern: [0, 2, 3, 5, 3, 2, 1, 2],
    stepMs: 650,
    oscType: 'triangle',
    overtoneRatio: 2.0,
    overtoneGain: 0.35,
    attackSec: 0.015,
    decaySec: 1.1,
    percussivePulse: true,
  },
  // Sunehri Dhoop: Serene Rabab / Dilruba morning raga (Asa)
  anand_karaj: {
    droneFreqs: [146.83, 220.0],
    scale: [293.66, 329.63, 370.0, 392.0, 440.0, 493.88, 587.33],
    pattern: [0, 1, 2, 4, 5, 4, 2, 1],
    stepMs: 820,
    oscType: 'sine',
    overtoneRatio: 2.0,
    overtoneGain: 0.22,
    attackSec: 0.08,
    decaySec: 1.75,
    percussivePulse: true,
  },
  // Kesariya Gulab: Sitar-like shimmer with sympathetic resonance
  kesariya_gulab: {
    droneFreqs: [130.81, 196.0], // C3 + G3
    scale: [261.63, 293.66, 329.63, 370.0, 392.0, 440.0, 493.88, 523.25],
    pattern: [0, 2, 4, 5, 7, 5, 3, 2],
    stepMs: 780,
    oscType: 'sawtooth',
    overtoneRatio: 3.0,
    overtoneGain: 0.18,
    attackSec: 0.03,
    decaySec: 1.65,
    doubleStrike: true,
  },
  // Paithani: Soft Bansuri flute
  paithani: {
    droneFreqs: [146.83, 220.0],
    scale: [293.66, 329.63, 370.0, 440.0, 493.88, 587.33],
    pattern: [0, 1, 2, 3, 4, 5, 3, 1],
    stepMs: 920,
    oscType: 'sine',
    overtoneRatio: 2.0,
    overtoneGain: 0.12,
    attackSec: 0.18,
    decaySec: 1.9,
  },
  // Bandhani Rang: Soft Dholak & Reed rhythm (Garba cadence)
  bandhani_garba: {
    droneFreqs: [130.81, 196.0],
    scale: [261.63, 293.66, 349.23, 392.0, 440.0, 523.25],
    pattern: [0, 2, 3, 2, 4, 5, 3, 1],
    stepMs: 560,
    oscType: 'triangle',
    overtoneRatio: 1.5,
    overtoneGain: 0.25,
    attackSec: 0.04,
    decaySec: 1.0,
    percussivePulse: true,
  },
  // Lal Paar: Rabindra / Esraj bowed warm tone
  alpona: {
    droneFreqs: [130.81, 196.0],
    scale: [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 523.25],
    pattern: [0, 2, 4, 6, 5, 4, 2, 1],
    stepMs: 960,
    oscType: 'sine',
    overtoneRatio: 2.0,
    overtoneGain: 0.22,
    attackSec: 0.22,
    decaySec: 2.1,
  },
  // Madhubani: Folk harmonium & plucked string
  madhubani: {
    droneFreqs: [138.59, 207.65], // C#3 + G#3
    scale: [277.18, 311.13, 349.23, 415.3, 466.16, 554.37],
    pattern: [0, 1, 3, 4, 3, 1, 2, 0],
    stepMs: 680,
    oscType: 'triangle',
    overtoneRatio: 2.0,
    overtoneGain: 0.28,
    attackSec: 0.05,
    decaySec: 1.35,
    percussivePulse: true,
  },
  // Kanjeevaram: Carnatic Veena (Mohanam raga)
  kanjeevaram: {
    droneFreqs: [130.81, 196.0],
    scale: [261.63, 293.66, 329.63, 392.0, 440.0, 523.25],
    pattern: [0, 1, 2, 3, 4, 5, 3, 2],
    stepMs: 820,
    oscType: 'triangle',
    overtoneRatio: 2.0,
    overtoneGain: 0.3,
    attackSec: 0.025,
    decaySec: 1.75,
  },
  // Pochampally: Nadaswaram / Kalyani flute
  pochampally: {
    droneFreqs: [146.83, 220.0],
    scale: [293.66, 329.63, 370.0, 415.3, 440.0, 493.88, 587.33],
    pattern: [0, 2, 4, 6, 5, 4, 2, 1],
    stepMs: 840,
    oscType: 'sine',
    overtoneRatio: 3.0,
    overtoneGain: 0.16,
    attackSec: 0.14,
    decaySec: 1.8,
  },
  // Mysore Silk: Mysore Veena & Chime (Hamsadhwani raga)
  mysore_silk: {
    droneFreqs: [130.81, 196.0],
    scale: [261.63, 293.66, 329.63, 392.0, 493.88, 523.25],
    pattern: [0, 2, 3, 4, 5, 4, 3, 2],
    stepMs: 790,
    oscType: 'sine',
    overtoneRatio: 2.5,
    overtoneGain: 0.2,
    attackSec: 0.02,
    decaySec: 1.7,
  },
  // Kasavu: Sopanam flute & gentle rhythm
  kasavu: {
    droneFreqs: [146.83, 220.0],
    scale: [293.66, 329.63, 392.0, 440.0, 523.25, 587.33],
    pattern: [0, 1, 2, 3, 2, 4, 3, 0],
    stepMs: 860,
    oscType: 'sine',
    overtoneRatio: 2.0,
    overtoneGain: 0.15,
    attackSec: 0.12,
    decaySec: 1.85,
    percussivePulse: true,
  },
  // Zamurrad: Santoor / Qanun hammered strings
  nikah: {
    droneFreqs: [130.81, 196.0],
    scale: [261.63, 293.66, 329.63, 370.0, 392.0, 440.0, 493.88, 523.25],
    pattern: [0, 2, 4, 7, 6, 4, 3, 1],
    stepMs: 720,
    oscType: 'triangle',
    overtoneRatio: 2.0,
    overtoneGain: 0.32,
    attackSec: 0.012,
    decaySec: 1.5,
    doubleStrike: true,
  },
  // Gulabi Jaali: Warm ghazal santoor & sarangi cadence
  mehfil_e_gulab: {
    droneFreqs: [138.59, 207.65],
    scale: [277.18, 311.13, 349.23, 392.0, 415.3, 493.88, 554.37],
    pattern: [0, 2, 3, 5, 6, 5, 3, 1],
    stepMs: 760,
    oscType: 'triangle',
    overtoneRatio: 2.0,
    overtoneGain: 0.28,
    attackSec: 0.016,
    decaySec: 1.6,
    doubleStrike: true,
  },
  // Ivory Grove: Gentle harp & chime arpeggio
  white_aisle: {
    droneFreqs: [130.81, 196.0],
    scale: [261.63, 293.66, 329.63, 392.0, 493.88, 523.25, 659.25],
    pattern: [0, 2, 3, 5, 6, 5, 3, 2],
    stepMs: 840,
    oscType: 'sine',
    overtoneRatio: 2.0,
    overtoneGain: 0.16,
    attackSec: 0.018,
    decaySec: 1.95,
  },
  // Moti Gulabi: Pure crystal chime & jal-tarang bowls
  kamal: {
    droneFreqs: [146.83, 220.0],
    scale: [293.66, 329.63, 392.0, 440.0, 523.25, 587.33],
    pattern: [0, 2, 4, 5, 4, 2, 3, 1],
    stepMs: 880,
    oscType: 'sine',
    overtoneRatio: 2.5,
    overtoneGain: 0.18,
    attackSec: 0.015,
    decaySec: 1.85,
  },
  // Blush Modern: Soft Celesta / Piano arpeggio
  blush_modern: {
    droneFreqs: [130.81, 196.0],
    scale: [261.63, 329.63, 392.0, 493.88, 523.25, 659.25],
    pattern: [0, 1, 2, 3, 4, 5, 3, 2],
    stepMs: 800,
    oscType: 'sine',
    overtoneRatio: 2.0,
    overtoneGain: 0.14,
    attackSec: 0.02,
    decaySec: 1.9,
  },
};

interface ActiveSynthVoice {
  themeId: ThemeId;
  gainNode: GainNode;
  drones: OscillatorNode[];
  intervalId: number;
}

class AmbientWeddingAudio {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeVoice: ActiveSynthVoice | null = null;
  private activeHtmlAudio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private isMuted = false;
  private currentThemeId: ThemeId = 'sarson_subah';
  private currentAudioSrc = '';

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const storedMute = window.localStorage.getItem(MUTE_STORAGE_KEY);
        if (storedMute === '1') {
          this.isMuted = true;
        }
      } catch {
        // Ignore storage error
      }
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Starts music after the user's first explicit tap on the invitation.
   * Never autoplays before user interaction.
   */
  public start(themeId?: string, audioSrc?: string): void {
    if (typeof window === 'undefined') return;
    if (themeId) this.currentThemeId = resolveThemeId(themeId);
    if (audioSrc !== undefined) this.currentAudioSrc = audioSrc;

    if (this.isPlaying) {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return;
    }

    this.isPlaying = true;
    this.ensureContext();
    this.crossfadeToTheme(this.currentThemeId, this.currentAudioSrc, 0.8);
  }

  /**
   * Cross-fades the music over 1.2s when the active theme changes.
   * If music hasn't started yet (pre-tap), only records the theme for when the user taps.
   */
  public setTheme(themeId: string, audioSrc: string = ''): void {
    const resolved = resolveThemeId(themeId);
    const changed = this.currentThemeId !== resolved || this.currentAudioSrc !== audioSrc;
    this.currentThemeId = resolved;
    this.currentAudioSrc = audioSrc;

    if (!this.isPlaying || !changed) return;
    this.crossfadeToTheme(resolved, audioSrc, 1.2);
  }

  /**
   * Plays a short synthesized micro-sound for a theme's `tapSound` token + subtle haptic,
   * ONLY when sound is unmuted and `prefers-reduced-motion` is false.
   */
  public playTapSound(tapSound: ThemeTapSound): void {
    if (typeof window === 'undefined' || this.isMuted) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    try {
      navigator.vibrate?.(10);
    } catch {
      // Ignore vibrate error
    }

    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      let freq = 523.25;
      let endFreq = 659.25;
      let dur = 0.22;
      let type: OscillatorType = 'sine';

      switch (tapSound as string) {
        case 'dhol_tap':
          freq = 155;
          endFreq = 98;
          dur = 0.16;
          type = 'triangle';
          break;
        case 'rabab_strum':
          freq = 392.0;
          endFreq = 587.33;
          dur = 0.28;
          type = 'triangle';
          break;
        case 'santoor_pluck':
          freq = 587.33;
          endFreq = 880.0;
          dur = 0.25;
          type = 'triangle';
          break;
        case 'temple_bell':
        case 'chime_bell':
        case 'soft_bell':
        case 'singing_bowl':
          // Soft neutral chime (glockenspiel-like pure sine chime)
          freq = 1046.5;
          endFreq = 1567.98;
          dur = 0.35;
          type = 'sine';
          break;
        case 'shankh_soft':
          freq = 293.66;
          endFreq = 329.63;
          dur = 0.38;
          type = 'sine';
          break;
        case 'dandiya_click':
          freq = 1046.5;
          endFreq = 783.99;
          dur = 0.12;
          type = 'triangle';
          break;
        case 'ghungroo_chime':
          freq = 987.77;
          endFreq = 1318.5;
          dur = 0.22;
          type = 'sine';
          break;
        case 'veena_pluck':
          freq = 329.63;
          endFreq = 440.0;
          dur = 0.26;
          type = 'triangle';
          break;
        case 'flute_breath':
          freq = 440.0;
          endFreq = 523.25;
          dur = 0.3;
          type = 'sine';
          break;
        case 'piano_note':
        default:
          freq = 523.25;
          endFreq = 659.25;
          dur = 0.24;
          type = 'sine';
          break;
      }

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + dur);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + dur + 0.02);
    } catch {
      // Ignore audio synth error
    }
  }

  /**
   * Plays soft synthesized firework crackles and a small auspicious chime
   * when the countdown scratch card reveals. Plays nothing when muted or under reduced motion.
   */
  public playFireworksRevealSound(): void {
    if (typeof window === 'undefined' || this.isMuted) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;

      // 1. Small warm bell chime (two harmonic sine tones)
      const chimeFreqs = [587.33, 880.0, 1174.66]; // D5, A5, D6
      chimeFreqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const startAt = now + idx * 0.09;
        osc.frequency.setValueAtTime(freq, startAt);
        gain.gain.setValueAtTime(0.0001, startAt);
        gain.gain.linearRampToValueAtTime(0.11 / (idx + 1), startAt + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.95);
        osc.connect(gain);
        gain.connect(this.masterGain!);
        osc.start(startAt);
        osc.stop(startAt + 1.0);
      });

      // 2. Soft synthesized sparkler/firework crackle bursts using short filtered noise buffer
      const sampleRate = ctx.sampleRate || 44100;
      const noiseDuration = 0.06;
      const bufferSize = Math.floor(sampleRate * noiseDuration);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
      }

      const crackleTimes = [0.12, 0.28, 0.52, 0.64, 0.92, 1.08, 1.35, 1.55];
      crackleTimes.forEach((offset) => {
        const src = ctx.createBufferSource();
        src.buffer = noiseBuffer;
        const bandpass = ctx.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.setValueAtTime(1800 + Math.random() * 1400, now + offset);
        bandpass.Q.setValueAtTime(2.2, now + offset);

        const gain = ctx.createGain();
        const t0 = now + offset;
        gain.gain.setValueAtTime(0.0001, t0);
        gain.gain.linearRampToValueAtTime(0.09, t0 + 0.006);
        gain.gain.exponentialRampToValueAtTime(0.0001, t0 + noiseDuration);

        src.connect(bandpass);
        bandpass.connect(gain);
        gain.connect(this.masterGain!);
        src.start(t0);
        src.stop(t0 + noiseDuration + 0.01);
      });
    } catch {
      // Ignore audio synth error
    }
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(MUTE_STORAGE_KEY, muted ? '1' : '0');
      } catch {
        // Ignore storage error
      }
    }

    if (this.activeHtmlAudio) {
      this.activeHtmlAudio.muted = muted;
    }

    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(muted ? 0.0001 : 0.16, now + 0.35);
    }
  }

  public stop(): void {
    this.isPlaying = false;
    if (this.activeVoice) {
      this.disposeSynthVoice(this.activeVoice, 0.2);
      this.activeVoice = null;
    }
    if (this.activeHtmlAudio) {
      this.activeHtmlAudio.pause();
      this.activeHtmlAudio = null;
    }
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return null;
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0.0001 : 0.16, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  private crossfadeToTheme(themeId: ThemeId, audioSrc: string, fadeSeconds: number): void {
    const prevVoice = this.activeVoice;
    const prevHtml = this.activeHtmlAudio;
    this.activeVoice = null;
    this.activeHtmlAudio = null;

    if (prevVoice) {
      this.disposeSynthVoice(prevVoice, fadeSeconds);
    }
    if (prevHtml) {
      this.fadeOutHtmlAudio(prevHtml, fadeSeconds);
    }

    const trimmedSrc = (audioSrc || '').trim();
    if (trimmedSrc) {
      try {
        const audio = new Audio(trimmedSrc);
        audio.loop = true;
        audio.muted = this.isMuted;
        audio.volume = 0;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              this.activeHtmlAudio = audio;
              this.fadeInHtmlAudio(audio, fadeSeconds);
            })
            .catch(() => {
              this.startSynthVoice(themeId, fadeSeconds);
            });
          return;
        }
      } catch {
        // Fallback to synth
      }
    }

    this.startSynthVoice(themeId, fadeSeconds);
  }

  private fadeInHtmlAudio(audio: HTMLAudioElement, fadeSeconds: number): void {
    const steps = 12;
    const stepTime = (fadeSeconds * 1000) / steps;
    let currentStep = 0;
    const id = window.setInterval(() => {
      currentStep += 1;
      if (this.activeHtmlAudio !== audio) {
        window.clearInterval(id);
        return;
      }
      audio.volume = Math.min(0.85, (currentStep / steps) * 0.85);
      if (currentStep >= steps) {
        window.clearInterval(id);
      }
    }, stepTime);
  }

  private fadeOutHtmlAudio(audio: HTMLAudioElement, fadeSeconds: number): void {
    const startVol = audio.volume;
    const steps = 12;
    const stepTime = (fadeSeconds * 1000) / steps;
    let currentStep = 0;
    const id = window.setInterval(() => {
      currentStep += 1;
      audio.volume = Math.max(0, startVol * (1 - currentStep / steps));
      if (currentStep >= steps) {
        window.clearInterval(id);
        audio.pause();
      }
    }, stepTime);
  }

  private startSynthVoice(themeId: ThemeId, fadeSeconds: number): void {
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    const resolved = resolveThemeId(themeId);
    const profile = THEME_SYNTH_PROFILES[resolved] || THEME_SYNTH_PROFILES.sarson_subah;
    const now = ctx.currentTime;

    const voiceGain = ctx.createGain();
    voiceGain.gain.setValueAtTime(0.0001, now);
    voiceGain.gain.linearRampToValueAtTime(1.0, now + Math.max(0.2, fadeSeconds));
    voiceGain.connect(this.masterGain);

    // Warm Tanpura / Shruti Drone
    const drones: OscillatorNode[] = [];
    profile.droneFreqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const droneGain = ctx.createGain();
      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      droneGain.gain.setValueAtTime(idx === 0 ? 0.14 : 0.08, now);
      osc.connect(droneGain);
      droneGain.connect(voiceGain);
      osc.start(now);
      drones.push(osc);
    });

    let step = 0;
    const playStep = () => {
      if (!this.ctx || !this.isPlaying || this.isMuted) return;
      const scaleIdx = profile.pattern[step % profile.pattern.length];
      const freq = profile.scale[scaleIdx % profile.scale.length];
      this.triggerThemeNote(ctx, voiceGain, freq, profile, step);

      if (profile.doubleStrike) {
        window.setTimeout(() => {
          if (this.ctx && this.isPlaying && !this.isMuted) {
            this.triggerThemeNote(ctx, voiceGain, freq * 1.0015, profile, step, 0.55);
          }
        }, 120);
      }
      step += 1;
    };

    playStep();
    const intervalId = window.setInterval(playStep, profile.stepMs);

    this.activeVoice = {
      themeId: resolved,
      gainNode: voiceGain,
      drones,
      intervalId,
    };
  }

  private triggerThemeNote(
    ctx: AudioContext,
    destination: GainNode,
    freq: number,
    profile: ThemeSynthProfile,
    step: number,
    amplitudeScale: number = 1
  ): void {
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const overtone = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const noteGain = ctx.createGain();
      const overtoneGain = ctx.createGain();

      osc.type = profile.oscType;
      osc.frequency.setValueAtTime(freq, now);

      overtone.type = 'sine';
      overtone.frequency.setValueAtTime(freq * profile.overtoneRatio, now);
      overtoneGain.gain.setValueAtTime(profile.overtoneGain * amplitudeScale, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(freq * 3.2, now);

      const peakGain = 0.22 * amplitudeScale;
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.linearRampToValueAtTime(peakGain, now + profile.attackSec);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + profile.attackSec + profile.decaySec);

      osc.connect(filter);
      overtone.connect(overtoneGain);
      overtoneGain.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(destination);

      osc.start(now);
      overtone.start(now);
      const stopTime = now + profile.attackSec + profile.decaySec + 0.08;
      osc.stop(stopTime);
      overtone.stop(stopTime);

      if (profile.percussivePulse && step % 2 === 0 && amplitudeScale === 1) {
        const drumOsc = ctx.createOscillator();
        const drumGain = ctx.createGain();
        drumOsc.type = 'sine';
        const basePitch = step % 4 === 0 ? 112 : 148;
        drumOsc.frequency.setValueAtTime(basePitch * 1.25, now);
        drumOsc.frequency.exponentialRampToValueAtTime(basePitch, now + 0.09);

        drumGain.gain.setValueAtTime(0.0001, now);
        drumGain.gain.linearRampToValueAtTime(0.11, now + 0.012);
        drumGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

        drumOsc.connect(drumGain);
        drumGain.connect(destination);
        drumOsc.start(now);
        drumOsc.stop(now + 0.25);
      }
    } catch {
      // Ignore transient Web Audio scheduling errors
    }
  }

  private disposeSynthVoice(voice: ActiveSynthVoice, fadeSeconds: number): void {
    window.clearInterval(voice.intervalId);
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      voice.gainNode.gain.cancelScheduledValues(now);
      voice.gainNode.gain.setValueAtTime(voice.gainNode.gain.value, now);
      voice.gainNode.gain.linearRampToValueAtTime(0.0001, now + Math.max(0.15, fadeSeconds));
      window.setTimeout(() => {
        voice.drones.forEach((d) => {
          try {
            d.stop();
            d.disconnect();
          } catch {
            // Ignore
          }
        });
        try {
          voice.gainNode.disconnect();
        } catch {
          // Ignore
        }
      }, fadeSeconds * 1000 + 80);
    } catch {
      // Ignore
    }
  }
}

export const ambientAudio = new AmbientWeddingAudio();
