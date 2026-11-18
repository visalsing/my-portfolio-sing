<template>
    <!-- Site-wide animated background. Chosen in Settings → Hero Background. -->
    <canvas v-if="isCanvasBg" ref="canvasEl" class="fixed inset-0 w-full h-full pointer-events-none"
        style="z-index: 1" aria-hidden="true" />
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { currentHeroBg } from '../stores/heroBg.js';

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
function particleColor(alpha) {
    return isDarkTheme()
        ? `rgba(200, 215, 255, ${alpha})`
        : `rgba(20, 30, 70, ${alpha})`;
}

function particlesEffect(canvas) {
    const MAX_DIST = 130;

    return runCanvas(canvas, {
        init: (c) => {
            const count = Math.max(40, Math.floor((c.width * c.height) / 9000));
            return Array.from({ length: count }, () => ({
                x: Math.random() * c.width,
                y: Math.random() * c.height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: Math.random() * 1.8 + 0.4,
                opacity: Math.random() * 0.55 + 0.15,
            }));
        },
        frame: (ctx, c, particles) => {
            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = c.width;
                else if (p.x > c.width) p.x = 0;
                if (p.y < 0) p.y = c.height;
                else if (p.y > c.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = particleColor(p.opacity);
                ctx.fill();
            }

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < MAX_DIST) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = particleColor((1 - dist / MAX_DIST) * 0.18);
                        ctx.lineWidth = 0.7;
                        ctx.stroke();
                    }
                }
            }
        },
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Floating bubbles  ('particles-bubbles')
// ─────────────────────────────────────────────────────────────────────────────
function bubbleColor(alpha) {
    return isDarkTheme()
        ? `rgba(150, 200, 255, ${alpha})`
        : `rgba(20, 60, 150, ${alpha})`;
}

function bubbleHighlight(alpha) {
    return isDarkTheme()
        ? `rgba(255, 255, 255, ${alpha})`
        : `rgba(255, 255, 255, ${alpha * 1.6})`;
}

function bubblesEffect(canvas) {
    return runCanvas(canvas, {
        init: (c) =>
            Array.from({ length: 40 }, () => ({
                x: Math.random() * c.width,
                y: c.height + Math.random() * c.height,
                r: Math.random() * 22 + 5,
                speed: Math.random() * 0.55 + 0.18,
                opacity: Math.random() * 0.22 + 0.04,
                drift: (Math.random() - 0.5) * 0.28,
                wobble: Math.random() * Math.PI * 2,
            })),
        frame: (ctx, c, bubbles) => {
            for (const b of bubbles) {
                b.y -= b.speed;
                b.wobble += 0.012;
                b.x += b.drift + Math.sin(b.wobble) * 0.25;
                b.opacity -= 0.00015;

                if (b.y + b.r < 0 || b.opacity <= 0) {
                    b.x = Math.random() * c.width;
                    b.y = c.height + b.r + Math.random() * 80;
                    b.opacity = Math.random() * 0.22 + 0.04;
                    b.wobble = Math.random() * Math.PI * 2;
                }

                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx.strokeStyle = bubbleColor(b.opacity);
                ctx.lineWidth = 1.3;
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(b.x - b.r * 0.32, b.y - b.r * 0.32, b.r * 0.22, 0, Math.PI * 2);
                ctx.fillStyle = bubbleHighlight(b.opacity * 1.8);
                ctx.fill();
            }
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
    return runCanvas(canvas, {
        init: (c) =>
            Array.from({ length: 80 }, () => ({
                x: Math.random() * c.width,
                y: Math.random() * c.height,
                length: Math.random() * 20 + 10,
                speed: Math.random() * 10 + 5,
                opacity: Math.random() * 0.4 + 0.1,
                width: Math.random() * 1 + 0.5,
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
                    d.speed = Math.random() * 10 + 5;
                }
            }
        },
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// Wiring: pick the effect from Settings → Hero Background
// ─────────────────────────────────────────────────────────────────────────────
const EFFECTS = {
    particles: particlesEffect,
    'particles-bubbles': bubblesEffect,
    rain: rainEffect,
};

const canvasEl = ref(null);
const isCanvasBg = computed(() => !!EFFECTS[currentHeroBg.value]);
let stopCurrent = null;

function stop() {
    if (stopCurrent) { stopCurrent(); stopCurrent = null; }
}

function restart() {
    stop();
    const canvas = canvasEl.value;
    const effect = EFFECTS[currentHeroBg.value];
    if (canvas && effect) stopCurrent = effect(canvas);
}

// flush: 'post' → runs after the <canvas> has been added/removed in the DOM
watch(currentHeroBg, restart, { flush: 'post' });
onMounted(restart);
onUnmounted(stop);
</script>