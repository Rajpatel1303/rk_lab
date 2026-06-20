/**
 * Web Audio API Kinetic Sound Synthesizer Node
 * Programmatically constructs clean, non-intrusive sound effects for HUD interaction.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  // Resume context if suspended (browser security blocks audio before first user gesture)
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Clean UI micro-interaction ticks/clicks
 */
export function playHoverTick() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sine";
    // Short high-frequency subtle pop
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.04);

    // Extremely quiet amplitude to avoid annoyingly loud pops
    gainNode.gain.setValueAtTime(0.005, now);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, now + 0.04);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  } catch (e) {
    // Suppress audio context errors silently (e.g. if blocked by browser policy)
  }
}

/**
 * Slightly damp mechanical button hover tick (for menus)
 */
export function playMenuHover() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(850, now);
    osc.frequency.exponentialRampToValueAtTime(550, now + 0.03);

    gainNode.gain.setValueAtTime(0.006, now);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, now + 0.03);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.03);
  } catch (e) {
    // Silent catch
  }
}

/**
 * Clean dual-frequency success/action confirmation chime (clicks)
 */
export function playSelectTick() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    
    // Low mechanical transient click
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.frequency.setValueAtTime(120, now);
    osc1.frequency.exponentialRampToValueAtTime(40, now + 0.08);
    gain1.gain.setValueAtTime(0.02, now);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.08);

    // Warm chord tone chime
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(980, now);
    osc2.frequency.setValueAtTime(1180, now + 0.03); // minor step sweep
    gain2.gain.setValueAtTime(0.015, now);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now);
    osc2.stop(now + 0.16);
  } catch (e) {
    // Silent catch
  }
}

/**
 * Dynamic sci-fi telemetry warp sweep frequency sweep
 */
export function playSciFiWarpSweep() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(1800, now + 0.4);

    gainNode.gain.setValueAtTime(0.002, now);
    gainNode.gain.linearRampToValueAtTime(0.012, now + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, now + 0.4);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  } catch (e) {
    // Silent catch
  }
}
