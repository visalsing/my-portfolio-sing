// ── TechCard.js ──
// Save to: src/stores/techcard.js  (or wherever you import it from)
//
// NEW theme.css variables used here — add these to your theme.css if missing:
//
//   (none — only uses existing --surface-* vars)

import { defineComponent, h, ref } from 'vue';

// ── Image Analyzer ──────────────────────────────────────────────────────────
function analyzeImage(imgEl) {
  try {
    const SIZE = 32;
    const canvas = document.createElement('canvas');
    canvas.width = SIZE; canvas.height = SIZE;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imgEl, 0, 0, SIZE, SIZE);
    const { data } = ctx.getImageData(0, 0, SIZE, SIZE);

    let totalR = 0, totalG = 0, totalB = 0;
    let bestColor = null, bestScore = -1;
    let visiblePixels = 0, darkPixels = 0;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
      if (a < 100) continue;
      visiblePixels++;
      totalR += r; totalG += g; totalB += b;
      if ((r + g + b) / 3 < 60) darkPixels++;

      const rn = r / 255, gn = g / 255, bn = b / 255;
      const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
      const l = (max + min) / 2;
      const d = max - min;
      const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
      const score = s * (1 - Math.abs(l - 0.5) * 1.5);
      if (score > bestScore) { bestScore = score; bestColor = { r, g, b }; }
    }

    if (visiblePixels === 0) return { type: 'fallback' };
    const avgBrightness = (totalR + totalG + totalB) / (visiblePixels * 3);
    const darkRatio = darkPixels / visiblePixels;

    if (avgBrightness < 80 || darkRatio > 0.6) return { type: 'dark' };
    if (bestScore > 0.08 && bestColor) return { type: 'colored', color: bestColor };
    return { type: 'light' };
  } catch {
    return { type: 'fallback' };
  }
}

// ── Style resolver ───────────────────────────────────────────────────────────
function getStyles(a) {
  if (!a || a.type === 'fallback') {
    return {
      imgFilter: 'none',
      imgFilterHover: 'brightness(1.1)',
      shadowIdle:  '0 0 10px 2px rgba(99,102,241,0.20)',
      shadowHover: '0 0 20px 6px rgba(99,102,241,0.45)',
      borderIdle:  'rgba(99,102,241,0.25)',
      borderHover: 'rgba(99,102,241,0.70)',
      overlayColor: 'rgba(99,102,241,0.07)',
      rgb: '99,102,241',
    };
  }
  if (a.type === 'dark') {
    return {
      imgFilter: 'brightness(1.15)',
      imgFilterHover: 'brightness(1.5) drop-shadow(0 0 5px rgba(255,255,255,0.55))',
      shadowIdle:  '0 0 10px 3px rgba(255,255,255,0.12)',
      shadowHover: '0 0 22px 7px rgba(255,255,255,0.38)',
      borderIdle:  'rgba(255,255,255,0.18)',
      borderHover: 'rgba(255,255,255,0.58)',
      overlayColor: 'rgba(255,255,255,0.04)',
      rgb: '255,255,255',
    };
  }
  if (a.type === 'colored') {
    const { r, g, b } = a.color;
    const rgb = `${r},${g},${b}`;
    return {
      imgFilter: 'none',
      imgFilterHover: `brightness(1.1) drop-shadow(0 0 4px rgba(${rgb},0.7))`,
      shadowIdle:  `0 0 10px 2px rgba(${rgb},0.25)`,
      shadowHover: `0 0 22px 7px rgba(${rgb},0.55)`,
      borderIdle:  `rgba(${rgb},0.30)`,
      borderHover: `rgba(${rgb},0.80)`,
      overlayColor: `rgba(${rgb},0.07)`,
      rgb,
    };
  }
  // light / greyscale
  return {
    imgFilter: 'none',
    imgFilterHover: 'brightness(1.15)',
    shadowIdle:  '0 0 8px 2px rgba(120,120,120,0.15)',
    shadowHover: '0 0 18px 5px rgba(120,120,120,0.35)',
    borderIdle:  'rgba(120,120,120,0.20)',
    borderHover: 'rgba(120,120,120,0.55)',
    overlayColor: 'rgba(120,120,120,0.05)',
    rgb: '120,120,120',
  };
}

// ── Component ────────────────────────────────────────────────────────────────
const TechCard = defineComponent({
  name: 'TechCard',
  props: {
    tech: { type: Object, required: true },
  },
  emits: ['select'],
  setup(props, { emit }) {
    const analysis = ref(null);

    function onImageLoad(e) {
      const imgEl = e.target;
      const isRemote =
        typeof props.tech.logo === 'string' &&
        (props.tech.logo.startsWith('http://') || props.tech.logo.startsWith('https://'));

      if (isRemote) {
        const probe = new Image();
        probe.crossOrigin = 'anonymous';
        probe.onload  = () => { analysis.value = analyzeImage(probe); };
        probe.onerror = () => { analysis.value = { type: 'fallback' }; };
        probe.src = props.tech.logo + (props.tech.logo.includes('?') ? '&' : '?') + '_c=1';
      } else {
        analysis.value = analyzeImage(imgEl);
      }
    }

    return () => {
      const s = getStyles(analysis.value);

      return h('div', {
        class: 'tech-card group relative p-4 sm:p-6 rounded-xl transition-all duration-300 hover:-translate-y-2 text-center cursor-pointer',
        style: {
          background:     'var(--surface-card)',
          border:         '1px solid var(--surface-border)',
          backdropFilter: 'blur(8px)',
          // Per-card CSS vars used by <style> hover rules in TechStack.vue
          '--shadow-idle':       s.shadowIdle,
          '--shadow-hover':      s.shadowHover,
          '--border-idle':       s.borderIdle,
          '--border-hover':      s.borderHover,
          '--img-filter':        s.imgFilter,
          '--img-filter-hover':  s.imgFilterHover,
        },
        onClick: () => emit('select', { ...props.tech, _styles: s }),
      }, [

        // ── Logo box ──
        h('div', { class: 'relative z-10 flex justify-center mb-3 sm:mb-4' }, [
          h('div', {
            class: 'logo-box w-12 h-12 sm:w-16 sm:h-16 p-2 sm:p-3 rounded-lg transition-all duration-300',
            style: {
              background: 'var(--surface-bg-3)',
              border:     `1px solid ${s.borderIdle}`,
              boxShadow:  s.shadowIdle,
            },
          }, [
            h('img', {
              src:         props.tech.logo,
              alt:         props.tech.name,
              class:       'logo-img w-full h-full object-contain transition-all duration-300',
              style:       { filter: s.imgFilter },
              crossorigin: 'anonymous',
              onLoad:      onImageLoad,
            }),
          ]),
        ]),

        // ── Text ──
        h('div', { class: 'relative z-10' }, [
          h('h3', {
            class: 'text-sm sm:text-base font-bold mb-1',
            style: { color: 'var(--surface-text)' },
          }, props.tech.name),
          h('div', { class: 'flex flex-col space-y-0.5' }, [
            h('span', {
              class: 'text-[10px] sm:text-xs uppercase tracking-wider font-semibold',
              style: { color: 'var(--accent-text)' },
            }, props.tech.category),
            h('span', {
              class: 'text-[8px] sm:text-[10px] uppercase tracking-wide',
              style: { color: 'var(--surface-text-dim)' },
            }, props.tech.type),
          ]),
        ]),

        // ── Hover radial tint overlay ──
        h('div', {
          class: 'absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none',
          style: { background: `radial-gradient(ellipse at 50% 0%, ${s.overlayColor} 0%, transparent 70%)` },
        }),
      ]);
    };
  },
});

export default TechCard;