<template>
    <!-- Site-wide animated background. Chosen in Settings → Hero Background. -->
    <canvas v-if="isCanvasBg" ref="canvasEl"
        :class="preview ? 'absolute inset-0 w-full h-full pointer-events-none' : 'fixed inset-0 w-full h-full pointer-events-none'"
        :style="{ zIndex: preview ? 0 : 1 }" aria-hidden="true" />
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { currentHeroBg } from '../stores/heroBg.js';

const props = defineProps({
    effect: { type: String, default: null },
    preview: { type: Boolean, default: false },
});
const activeEffect = computed(() => props.effect ?? currentHeroBg.value);

// ── Theme helper (reads class set by themeMode store) ───────────────────────
function isDarkTheme() {
    const html = document.documentElement;
    // light surfaces: theme-light, theme-white  ·  dark surfaces: theme-dark, theme-black, theme-abyss
    if (html.classList.contains('theme-light') || html.classList.contains('theme-white')) return false;
    if (html.classList.contains('theme-dark') || html.classList.contains('theme-black') || html.classList.contains('theme-abyss')) return true;
    if (html.classList.contains('theme-device')) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
}

// ── Tiny runner shared by all effects ───────────────────────────────────────
// init(canvas) → state (called on start and on every resize)
// frame(ctx, canvas, state) → draws one frame
// returns a stop() function
function runCanvas(canvas, { init, frame }) {
    const ctx = canvas.getContext('2d');
    let state;
    let raf = null;

    const setup = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        state = init(canvas);
    };
    setup();

    const loop = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        frame(ctx, canvas, state);
        raf = requestAnimationFrame(loop);
    };
    loop();

    const ro = new ResizeObserver(setup);
    ro.observe(canvas);

    return () => {
        if (raf) cancelAnimationFrame(raf);
        ro.disconnect();
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Connected dot network  ('particles')
// ─────────────────────────────────────────────────────────────────────────────
function accentColor() {
    return getComputedStyle(document.documentElement).getPropertyValue('--accent-text').trim()
        || getComputedStyle(document.documentElement).getPropertyValue('--accent-mid').trim()
        || (isDarkTheme() ? '#c8d7ff' : '#142046');
}

function particlesEffect(canvas) {
    const thumbnail = canvas.offsetHeight <= 120;
    const maxDistance = thumbnail ? 54 : 130;

    return runCanvas(canvas, {
        init: (c) => {
            const count = thumbnail
                ? Math.max(7, Math.floor((c.width * c.height) / 1500))
                : Math.max(40, Math.floor((c.width * c.height) / 9000));
            return Array.from({ length: count }, () => ({
                x: Math.random() * c.width,
                y: Math.random() * c.height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: thumbnail ? Math.random() * 0.5 + 0.7 : Math.random() * 1.4 + 1.1,
                opacity: thumbnail ? Math.random() * 0.2 + 0.55 : Math.random() * 0.3 + 0.7,
            }));
        },
        frame: (ctx, c, particles) => {
            const color = accentColor();
            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = c.width;
                else if (p.x > c.width) p.x = 0;
                if (p.y < 0) p.y = c.height;
                else if (p.y > c.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.globalAlpha = p.opacity;
                ctx.fillStyle = color;
                ctx.shadowColor = color;
                ctx.shadowBlur = thumbnail ? 2 : 7;
                ctx.fill();
            }
            ctx.shadowBlur = 0;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < maxDistance) {
                        ctx.globalAlpha = (1 - dist / maxDistance) * (thumbnail ? 0.24 : 0.48);
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = color;
                        ctx.lineWidth = thumbnail ? 0.65 : 1;
                        ctx.stroke();
                    }
                }
            }
            ctx.globalAlpha = 1;
        },
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Floating bubbles  ('particles-bubbles')
// ─────────────────────────────────────────────────────────────────────────────
// Binary Stream: drifting 1s and 0s mixed with a denser, softly connected particle field.
function binaryStreamEffect(canvas) {
    const thumbnail = canvas.offsetHeight <= 120;
    const maxLinkDistance = thumbnail ? 48 : 105;

    return runCanvas(canvas, {
        init: (c) => {
            const particleCount = thumbnail
                ? Math.max(5, Math.floor((c.width * c.height) / 2600))
                : Math.max(40, Math.floor((c.width * c.height) / 18000));
            const columnCount = thumbnail
                ? Math.max(3, Math.floor(c.width / 58))
                : Math.max(10, Math.floor(c.width / 76));

            return {
                particles: Array.from({ length: particleCount }, () => ({
                    x: Math.random() * c.width,
                    y: Math.random() * c.height,
                    vx: (Math.random() - 0.5) * 0.24,
                    vy: (Math.random() - 0.5) * 0.24,
                    radius: Math.random() * 1.5 + 0.5,
                    opacity: Math.random() * 0.35 + 0.12,
                })),
                streams: Array.from({ length: columnCount }, (_, index) => ({
                    x: ((index + 0.5) / columnCount) * c.width + (Math.random() - 0.5) * 24,
                    y: Math.random() * c.height,
                    speed: Math.random() * 0.45 + 0.45,
                    length: thumbnail ? Math.floor(Math.random() * 2) + 3 : Math.floor(Math.random() * 7) + 6,
                    spacing: thumbnail ? 12 : 22,
                    size: thumbnail ? Math.random() * 1.5 + 7 : Math.random() * 5 + 13,
                    opacity: thumbnail ? Math.random() * 0.18 + 0.3 : Math.random() * 0.22 + 0.22,
                    bits: Array.from({ length: thumbnail ? 4 : 13 }, () => Math.random() > 0.5 ? '1' : '0'),
                })),
            };
        },
        frame: (ctx, c, state) => {
            const ink = accentColor();
            for (const stream of state.streams) {
                stream.y += stream.speed;
                if (stream.y - stream.length * stream.spacing > c.height) {
                    stream.y = -Math.random() * c.height * 0.45;
                    stream.x = Math.random() * c.width;
                }

                ctx.font = `${stream.size}px ui-monospace, monospace`;
                ctx.textAlign = 'center';
                for (let i = 0; i < stream.length; i++) {
                    if (Math.random() < 0.018) stream.bits[i] = stream.bits[i] === '1' ? '0' : '1';
                    ctx.globalAlpha = stream.opacity * (1 - i / (stream.length + 1));
                    ctx.fillStyle = ink;
                    ctx.fillText(stream.bits[i], stream.x, stream.y - i * stream.spacing);
                }
            }

            const particles = state.particles;
            const particleInk = ink;
            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = c.width;
                else if (p.x > c.width) p.x = 0;
                if (p.y < 0) p.y = c.height;
                else if (p.y > c.height) p.y = 0;

                ctx.globalAlpha = p.opacity;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = particleInk;
                ctx.fill();
            }

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.hypot(dx, dy);
                    if (distance < maxLinkDistance) {
                        ctx.globalAlpha = (1 - distance / maxLinkDistance) * (thumbnail ? 0.16 : 0.12);
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = particleInk;
                        ctx.lineWidth = thumbnail ? 0.45 : 0.65;
                        ctx.stroke();
                    }
                }
            }

            ctx.globalAlpha = 1;
        },
    });
}

function bubbleHighlight(alpha) {
    return isDarkTheme()
        ? `rgba(255, 255, 255, ${alpha})`
        : `rgba(255, 255, 255, ${alpha * 1.6})`;
}

function bubblesEffect(canvas) {
    const thumbnail = canvas.offsetHeight <= 120;
    return runCanvas(canvas, {
        init: (c) =>
            Array.from({ length: thumbnail ? 7 : 40 }, () => ({
                x: Math.random() * c.width,
                y: thumbnail ? Math.random() * c.height : c.height + Math.random() * c.height,
                r: thumbnail ? Math.random() * 5 + 4 : Math.random() * 22 + 5,
                speed: Math.random() * 0.55 + 0.18,
                opacity: thumbnail ? Math.random() * 0.22 + 0.2 : Math.random() * 0.22 + 0.04,
                drift: (Math.random() - 0.5) * 0.28,
                wobble: Math.random() * Math.PI * 2,
            })),
        frame: (ctx, c, bubbles) => {
            const color = accentColor();
            for (const b of bubbles) {
                b.y -= b.speed;
                b.wobble += 0.012;
                b.x += b.drift + Math.sin(b.wobble) * 0.25;
                b.opacity -= 0.00015;

                if (b.y + b.r < 0 || b.opacity <= 0) {
                    b.x = Math.random() * c.width;
                    b.y = thumbnail ? c.height + b.r : c.height + b.r + Math.random() * 80;
                    b.opacity = thumbnail ? Math.random() * 0.22 + 0.2 : Math.random() * 0.22 + 0.04;
                    b.wobble = Math.random() * Math.PI * 2;
                }

                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx.globalAlpha = b.opacity;
                ctx.strokeStyle = color;
                ctx.lineWidth = thumbnail ? 0.9 : 1.3;
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(b.x - b.r * 0.32, b.y - b.r * 0.32, b.r * 0.22, 0, Math.PI * 2);
                ctx.globalAlpha = 1;
                ctx.fillStyle = bubbleHighlight(b.opacity * 1.8);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
        },
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Raindrops  ('rain')
// ─────────────────────────────────────────────────────────────────────────────
function rainColor(alpha) {
    return isDarkTheme()
        ? `rgba(255, 255, 255, ${alpha})`
        : `rgba(0, 0, 0, ${alpha * 0.8})`;
}

function rainEffect(canvas) {
    const thumbnail = canvas.offsetHeight <= 120;
    return runCanvas(canvas, {
        init: (c) =>
            Array.from({ length: thumbnail ? 18 : 80 }, () => ({
                x: Math.random() * c.width,
                y: Math.random() * c.height,
                length: thumbnail ? Math.random() * 7 + 6 : Math.random() * 20 + 10,
                speed: thumbnail ? Math.random() * 2 + 3 : Math.random() * 10 + 5,
                opacity: thumbnail ? Math.random() * 0.25 + 0.25 : Math.random() * 0.4 + 0.1,
                width: thumbnail ? Math.random() * 0.4 + 0.55 : Math.random() * 1 + 0.5,
            })),
        frame: (ctx, c, drops) => {
            for (const d of drops) {
                ctx.beginPath();
                ctx.moveTo(d.x, d.y);
                ctx.lineTo(d.x, d.y + d.length);

                const gradient = ctx.createLinearGradient(d.x, d.y, d.x, d.y + d.length);
                gradient.addColorStop(0, rainColor(0));
                gradient.addColorStop(1, rainColor(d.opacity));

                ctx.strokeStyle = gradient;
                ctx.lineWidth = d.width;
                ctx.lineCap = 'round';
                ctx.stroke();

                d.y += d.speed;
                if (d.y > c.height) {
                    d.y = -d.length;
                    d.x = Math.random() * c.width;
                    d.speed = thumbnail ? Math.random() * 2 + 3 : Math.random() * 10 + 5;
                }
            }
        },
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// Wiring: pick the effect from Settings → Hero Background
// ─────────────────────────────────────────────────────────────────────────────
const inCodePointRange = (start, end, scriptPattern) =>
    Array.from({ length: end - start + 1 }, (_, index) => String.fromCodePoint(start + index))
        .filter((character) => scriptPattern.test(character) && /\p{Letter}/u.test(character));

const CHAM_BASE = String.fromCodePoint(0xaa06);
const CHAM_VOWEL_SIGNS = [0xaa29, 0xaa2a, 0xaa2b, 0xaa2c, 0xaa2d, 0xaa2e, 0xaa2f, 0xaa30, 0xaa31, 0xaa32];
const CHAM_GLYPHS = [
    ...inCodePointRange(0xaa00, 0xaa28, /\p{Script=Cham}/u),
    ...inCodePointRange(0xaa40, 0xaa4d, /\p{Script=Cham}/u),
    ...CHAM_VOWEL_SIGNS.map((codePoint) => CHAM_BASE + String.fromCodePoint(codePoint)),
    ...Array.from({ length: 10 }, (_, digit) => String.fromCodePoint(0xaa50 + digit)),
];

const SCRIPT_GLYPHS = [
    // Khmer letters and digits. Dependent vowel marks always follow អ as their carrier.
    ...'ក ខ គ ឃ ង ច ឆ ជ ញ ដ ឋ ឌ ណ ត ថ ទ ធ ន ប ផ ព ភ ម យ រ ល វ ស ហ អ ឥ ឦ'.split(' '),
    ...'អា អិ អី អឹ អឺ អុ អូ អួ អើ អឿ អៀ អេ អែ អៃ អោ អៅ'.split(' '),
    ...'០ ១ ២ ៣ ៤ ៥ ៦ ៧ ៨ ៩'.split(' '),
    // Cham letters, consonant-carried dependent vowels, and Cham numerals.
    ...CHAM_GLYPHS,
    // Mon uses Myanmar script; include Mon-specific letters and Myanmar numerals.
    ...'က ခ ဂ င စ ဆ ဇ ည တ ထ ဒ န ပ ဖ မ ယ ရ လ ဝ သ ဟ အ ဨ ၚ ၛ ၜ ၝ'.split(' '),
    ...'အာ အိ အီ အု အူ အေ အဲ အဳ အဴ'.split(' '),
    ...'၀ ၁ ၂ ၃ ၄ ၅ ၆ ၇ ၈ ၉'.split(' '),
    // Lao letters and numerals; dependent vowels remain attached to the carrier ອ.
    ...'ກ ຂ ຄ ງ ຈ ສ ຊ ຍ ດ ຕ ຖ ທ ນ ບ ປ ຜ ຝ ພ ຟ ມ ຢ ຣ ລ ວ ຫ ອ'.split(' '),
    ...'ອາ ອິ ອີ ອຶ ອື ອຸ ອູ ອົ'.split(' '),
    ...'໐ ໑ ໒ ໓ ໔ ໕ ໖ ໗ ໘ ໙'.split(' '),
    // Burmese letters, vowel-carrier examples, and Myanmar numerals.
    ...'က ခ ဂ ဃ င စ ဆ ဇ ဉ ည ဋ ဌ ဍ ဎ ဏ တ ထ ဒ ဓ န ပ ဖ ဗ ဘ မ ယ ရ လ ဝ သ ဟ အ'.split(' '),
    ...'အာ အိ အီ အု အူ အေ အဲ'.split(' '),
    // Chinese Han characters and Zhuyin/Bopomofo symbols.
    ...'汉 字 中 文 你 好 山 水 火 月 日 我 的 是 国 人 风 云 星 天 地 花 龙 东 学 生 世 界 語 體 學 風 雲 龍 東 國 書 開 電'.split(' '),
    ...'ㄅ ㄆ ㄇ ㄈ ㄉ ㄊ ㄋ ㄌ ㄍ ㄎ ㄏ ㄐ ㄑ ㄒ ㄓ ㄔ ㄕ ㄖ ㄗ ㄘ ㄙ ㄧ ㄨ ㄩ ㄚ ㄛ ㄜ ㄝ ㄞ ㄟ ㄠ ㄡ ㄢ ㄣ ㄤ ㄥ ㄦ'.split(' '),
    // Japanese Hiragana and Katakana; Hangul syllable blocks for Korean.
    ...'あ い う え お か き く け こ さ し す せ そ た ち つ て と な に ぬ ね の は ひ ふ へ ほ ま み む め も や ゆ よ ら り る れ ろ わ を ん'.split(' '),
    ...'ア イ ウ エ オ カ キ ク ケ コ サ シ ス セ ソ タ チ ツ テ ト ナ ニ ヌ ネ ノ ハ ヒ フ ヘ ホ マ ミ ム メ モ ヤ ユ ヨ ラ リ ル レ ロ ワ ヲ ン'.split(' '),
    ...'가 나 다 라 마 바 사 아 자 차 카 타 파 하 한 글'.split(' '),
    // Devanagari letters, carrier-based vowel examples, and digits.
    ...'अ आ इ ई उ ऊ ऋ ए ऐ ओ औ क ख ग घ च ज त द न प ब म य र ल व श स ह'.split(' '),
    ...'का कि की कु कू कृ के कै को कौ'.split(' '),
    ...'० १ २ ३ ४ ५ ६ ७ ८ ९'.split(' '),
    // Latin, Greek, and Cyrillic alphabets.
    ...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''),
    ...'Α Β Γ Δ Ε Ζ Η Θ Ι Κ Λ Μ Ν Ξ Ο Π Ρ Σ Τ Υ Φ Χ Ψ Ω α β γ δ ε ζ η θ ι κ λ μ ν ξ ο π ρ σ τ υ φ χ ψ ω'.split(' '),
    ...'А Б В Г Д Е Ё Ж З И Й К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Ъ Ы Ь Э Ю Я а б в г д е ё ж з и й к л м н о п р с т у ф х ц ч ш щ ъ ы ь э ю я'.split(' '),
];

function scriptDriftEffect(canvas) {
    const thumbnail = canvas.offsetHeight <= 120;
    return runCanvas(canvas, {
        init: (c) => {
            const count = thumbnail
                ? Math.max(10, Math.floor((c.width * c.height) / 850))
                : Math.max(80, Math.floor((c.width * c.height) / 15000));

            return Array.from({ length: count }, () => ({
                x: Math.random() * c.width,
                y: Math.random() * c.height,
                glyph: SCRIPT_GLYPHS[Math.floor(Math.random() * SCRIPT_GLYPHS.length)],
                size: thumbnail ? Math.random() * 3 + 8 : Math.random() * 12 + 12,
                speed: thumbnail ? Math.random() * 0.22 + 0.12 : Math.random() * 0.38 + 0.12,
                opacity: thumbnail ? Math.random() * 0.18 + 0.24 : Math.random() * 0.15 + 0.1,
                phase: Math.random() * Math.PI * 2,
            }));
        },
        frame: (ctx, c, glyphs) => {
            const ink = accentColor();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            for (const item of glyphs) {
                item.y += item.speed;
                item.phase += 0.012;
                item.x += Math.sin(item.phase) * 0.08;

                if (item.y > c.height + item.size) {
                    item.y = -item.size;
                    item.x = Math.random() * c.width;
                    item.glyph = SCRIPT_GLYPHS[Math.floor(Math.random() * SCRIPT_GLYPHS.length)];
                }

                ctx.font = `${item.size}px "Kantumruy Pro", "Noto Sans Cham", "Noto Sans Myanmar", "Noto Sans Lao Looped", "Noto Sans Devanagari", "Noto Sans JP", "Noto Sans KR", "Noto Sans TC", "Noto Sans SC", "Noto Sans", sans-serif`;
                ctx.globalAlpha = item.opacity * (0.82 + Math.sin(item.phase) * 0.18);
                ctx.fillStyle = ink;
                ctx.fillText(item.glyph, item.x, item.y);
            }

            ctx.globalAlpha = 1;
        },
    });
}

const EFFECTS = {
    particles: particlesEffect,
    'script-drift': scriptDriftEffect,
    'binary-stream': binaryStreamEffect,
    'particles-bubbles': bubblesEffect,
    rain: rainEffect,
};

const canvasEl = ref(null);
const isCanvasBg = computed(() => !!EFFECTS[activeEffect.value]);
let stopCurrent = null;

function stop() {
    if (stopCurrent) { stopCurrent(); stopCurrent = null; }
}

function restart() {
    stop();
    const canvas = canvasEl.value;
    const effect = EFFECTS[activeEffect.value];
    if (canvas && effect) stopCurrent = effect(canvas);
}

// flush: 'post' → runs after the <canvas> has been added/removed in the DOM
watch(activeEffect, restart, { flush: 'post' });
onMounted(restart);
onUnmounted(stop);
</script>
