<template>
    <section class="relative w-full overflow-hidden min-h-screen flex items-center py-16 md:py-20" id="home_hero"
        :style="heroBgStyle">

        <!-- ── Canvas: Connected dot network ── -->
        <canvas v-if="currentHeroBg === 'particles'" ref="particleCanvas"
            class="absolute inset-0 w-full h-full pointer-events-none z-0" />

        <!-- ── Canvas: Floating bubbles ── -->
        <canvas v-if="currentHeroBg === 'particles-bubbles'" ref="bubblesCanvas"
            class="absolute inset-0 w-full h-full pointer-events-none z-0" />

        <canvas v-if="currentHeroBg === 'rain'" ref="rainCanvas"
            class="absolute inset-0 w-full h-full pointer-events-none z-0" />

        <!-- Main -->
        <div class="w-full px-5 sm:px-8 md:px-12 lg:px-8 max-w-5xl lg:max-w-7xl mx-auto relative z-10">
            <div class="grid lg:grid-cols-2 gap-10 xl:gap-14 items-center">

                <div class="flex flex-col md:mt-0 mt-20 justify-center">
                    <div class="lg:text-left" data-aos="fade-right">
                        <!-- <h1 class="font-bold text-4xl md:text-5xl lg:text-5xl leading-[1.4]"
                            :style="{ color: 'var(--surface-text)' }">
                            {{ t('hi_im') }}
                            <span class="text-transparent bg-clip-text inline-block"
                                :style="{ backgroundImage: 'var(--logo-gradient)' }">
                                {{ t('visalsing') }}
                            </span>👋
                        </h1> -->
                        <h1 class="font-bold text-4xl md:text-5xl lg:text-5xl leading-[1.4]"
                            :style="{ color: 'var(--surface-text)' }">
                            {{ t('hi_im') }}
                            <span class="text-transparent bg-clip-text inline-block"
                                :style="{ backgroundImage: 'var(--logo-gradient)' }">
                                {{ localHeroText.name }}
                            </span>👋
                        </h1>
                        <p class="font-medium text-lg md:text-xl mt-4" :style="{ color: 'var(--accent-text-muted)' }"
                            data-aos="fade-right" data-aos-delay="100">
                            <span ref="typingText"></span><span class="cursor">|</span>
                        </p>
                    </div>

                    <!-- <p class="pt-6 text-center lg:text-left mx-auto max-w-xl text-lg leading-relaxed"
                        :style="{ color: 'var(--surface-text-sub)' }" data-aos="fade-right" data-aos-delay="200">
                        {{ t('hero_long_text') }}
                    </p> -->

                    <p class="pt-6 text-center lg:text-left mx-auto max-w-xl text-lg leading-relaxed"
                        :style="{ color: 'var(--surface-text-sub)' }" data-aos="fade-right" data-aos-delay="200">
                        {{ localHeroText.intro }}
                    </p>

                    <div class="flex items-center gap-4 pt-8 flex-col sm:flex-row sm:w-max sm:mx-auto lg:mx-0"
                        data-aos="fade-up" data-aos-delay="300">
                        <!-- Contact Me -->
                        <router-link to="/#contacts"
                            class="px-8 md:px-10 py-4 rounded-xl relative group w-full sm:w-max flex justify-center overflow-hidden transition-all duration-300"
                            :style="{ background: 'var(--cta-gradient)' }"
                            @mouseenter="e => e.currentTarget.style.filter = 'brightness(1.15)'"
                            @mouseleave="e => e.currentTarget.style.filter = 'brightness(1)'">
                            <span class="relative flex items-center justify-center text-white font-semibold text-lg">
                                {{ t('contact_me') }}
                                <ArrowRightIcon class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </router-link>

                        <!-- Download CV -->
                        <button
                            class="px-8 md:px-10 py-4 rounded-xl relative group w-full sm:w-max flex justify-center border-2 transition-all duration-300"
                            :style="{
                                borderColor: 'var(--accent-text)',
                                color: 'var(--accent-text)'
                            }" @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--accent-bg)'"
                            @mouseleave="e => e.currentTarget.style.backgroundColor = 'transparent'">
                            <div class="flex items-center justify-center relative">
                                <ArrowDownTrayIcon class="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                                <span class="pl-3 font-semibold text-lg">{{ t('download_cv') }}</span>
                            </div>
                        </button>
                    </div>
                </div>

                <!-- Profile image -->
                <!-- <div class="relative group">
                    <div class="relative group flex justify-center lg:justify-end">
                        <div class="relative z-10 backdrop-blur-sm rounded-full p-4
                            w-full max-w-[280px]
                            sm:max-w-[350px]
                            md:max-w-[450px]
                            lg:max-w-[480px]
                            xl:max-w-[550px]
                            aspect-square" :style="{
                                background: 'var(--cta-gradient)',
                                border: '1px solid var(--accent-border)',
                                boxShadow: `0 0 20px var(--accent-shadow), 0 0 60px var(--accent-shadow), 0 0 100px var(--accent-shadow)`
                            }" data-aos="zoom-in" data-aos-delay="500">
                            <div class="w-full h-full rounded-full overflow-hidden relative z-10">
                                <img src="../../public/hero-2.png" alt="Sing" loading="lazy"
                                    class="w-full h-full object-contain" />
                            </div>
                        </div>
                        <div class="absolute inset-0 blur-[100px] rounded-full -z-10 opacity-50"
                            :style="{ backgroundColor: 'var(--accent-bg)' }"></div>
                    </div>

                    <-- Floating orbs ->
                    <div class="absolute top-0 -left-4 w-12 h-12 rounded-full blur-sm animate-float-slow"
                        :style="{ backgroundColor: 'var(--accent-bg-hover)' }"></div>
                    <div class="absolute bottom-10 -right-4 w-16 h-16 rounded-full blur-sm animate-float-reverse"
                        :style="{ backgroundColor: 'var(--accent-bg)' }"></div>
                    <div
                        class="absolute top-1/2 -left-12 w-8 h-8 bg-white/10 rounded-full blur-sm animate-float-delayed">
                    </div>

                    <-- Background glow ->
                    <div class="absolute inset-0 blur-[100px] rounded-full -z-10"
                        :style="{ backgroundColor: 'var(--accent-bg)' }"></div>
                </div> -->

                <!-- Profile image -->
                <div class="relative group">
                    <div class="relative group flex justify-center lg:justify-end">
                        <div class="relative z-10 backdrop-blur-sm p-4
        w-full max-w-[280px]
        sm:max-w-[350px]
        md:max-w-[450px]
        lg:max-w-[480px]
        xl:max-w-[550px]
        aspect-square" :style="frameStyle" data-aos="zoom-in" data-aos-delay="500">
                            <div class="w-full h-full overflow-hidden relative z-10" :style="innerFrameStyle">
                                <img src="../../public/hero-2.png" alt="Sing" loading="lazy"
                                    class="w-full h-full object-contain" />
                            </div>
                        </div>
                        <div class="absolute inset-0 blur-[100px] rounded-full -z-10 opacity-50"
                            :style="{ backgroundColor: 'var(--accent-bg)' }"></div>
                    </div>

                    <!-- Floating orbs -->
                    <div class="absolute top-0 -left-4 w-12 h-12 rounded-full blur-sm animate-float-slow"
                        :style="{ backgroundColor: 'var(--accent-bg-hover)' }"></div>
                    <div class="absolute bottom-10 -right-4 w-16 h-16 rounded-full blur-sm animate-float-reverse"
                        :style="{ backgroundColor: 'var(--accent-bg)' }"></div>
                    <div
                        class="absolute top-1/2 -left-12 w-8 h-8 bg-white/10 rounded-full blur-sm animate-float-delayed">
                    </div>

                    <!-- Background glow -->
                    <div class="absolute inset-0 blur-[100px] rounded-full -z-10"
                        :style="{ backgroundColor: 'var(--accent-bg)' }"></div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ArrowRightIcon, ArrowDownTrayIcon } from '@heroicons/vue/16/solid';
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue';
import { t } from './../stores/languages';
import { currentHeroBg, backgroundImages } from './../stores/heroBg.js';
import { currentTheme } from './../stores/themeMode.js';
import { currentProfileFrame, FRAME_STYLES } from './../stores/profileFrame.js';

// ── Hero Section Translations Data Structure ──────────────────────────────────
const heroData = {
    name: {
        en: "So Visalsing",
        km: "សោ វិសាលស៊ីង",
        zh: "So Visalsing"
    },
    introtext: {
        en: "I'm So Visalsing, and a software developer. My skills are to create and develop website, front-end, back-end, responsive design, email marketing and more. Here is my CV below! You can click on the button to download my CV.",
        km: "ខ្ញុំឈ្មោះវិសាលស៊ីងនិងជាអ្នកសរសេរកម្មវិធីសូហ្វវែរ។ ជំនាញរបស់ខ្ញុំគឺបង្កើតនិងសរសេរគេហទំព័រ Frontend Backend ការរចនាResponsive អ៊ីមែលទីផ្សារ និងបន្ថែមពីនេះទៀត។ ខាងក្រោមនេះគឺជាCVរបស់ខ្ញុំ។ លោកអ្នកអាចចុចទៅលើប៊ូតុងដើម្បីទាញយក CV របស់ខ្ញុំ។",
        zh: "我是 Visalsing，一名软件开发人员。我的技能包括网站创建与开发、前端、后端、响应式设计、邮件营销等。这是我的简历！您可以点击按钮下载。"
    }
};

// Automatically reads the active locale by querying the DOM's data-lang attribute seen in image_404278.png
const localHeroText = computed(() => {
    // Falls back safely if the DOM element isn't rendered yet
    const activeLang = document.documentElement.getAttribute('data-lang') || 'en';
    
    return {
        name: heroData.name[activeLang] || heroData.name['en'],
        intro: heroData.introtext[activeLang] || heroData.introtext['en']
    };
});

// ── Typing effect ─────────────────────────────────────────────────────────────
const typingText = ref(null);
const roles = [
    "Web Developer",
    "Front-end Developer",
    "Back-end Developer",
    "UX/UI Designer",
    "API Integrator",
    "Email Marketer"
];
onMounted(() => {
    let roleIndex = 0, charIndex = 0, isDeleting = false;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        typingText.value.textContent = isDeleting
            ? currentRole.substring(0, charIndex--)
            : currentRole.substring(0, charIndex++);

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentRole.length + 1) {
            speed = 1500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();
});

// ── Hero background style (image-based backgrounds) ───────────────────────────
const heroBgStyle = computed(() => {
    const imgUrl = backgroundImages[currentHeroBg.value];
    if (!imgUrl) return {};
    return {
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url(${imgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        transition: 'background-image 0.4s ease',
    };
});

// ─────────────────────────────────────────────────────────────────────────────
// SHARED THEME HELPER
// Reads the class your themeMode store puts on <html>:
//   theme-dark   → always dark
//   theme-light  → always light
//   theme-device → follow OS preference
// ─────────────────────────────────────────────────────────────────────────────
function isDarkTheme() {
    const html = document.documentElement;
    if (html.classList.contains('theme-dark')) return true;
    if (html.classList.contains('theme-light')) return false;
    if (html.classList.contains('theme-device')) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true; // :root default in themes.css is dark
}

// ─────────────────────────────────────────────────────────────────────────────
// CANVAS 1 — Connected dot network  (currentHeroBg === 'particles')
// ─────────────────────────────────────────────────────────────────────────────
const particleCanvas = ref(null);
let particleAnimId = null;
let particleResizeObs = null;

function buildParticleColor(alpha) {
    return isDarkTheme()
        ? `rgba(200, 215, 255, ${alpha})`  // light bluish-white on dark bg
        : `rgba(20,  30,  70,  ${alpha})`; // dark navy on light bg
}

function startParticles(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    };
    resize();

    const makeParticles = () => {
        const count = Math.max(40, Math.floor((canvas.width * canvas.height) / 9000));
        return Array.from({ length: count }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            r: Math.random() * 1.8 + 0.4,
            opacity: Math.random() * 0.55 + 0.15,
        }));
    };

    let particles = makeParticles();
    const MAX_DIST = 130;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = canvas.width;
            else if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            else if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = buildParticleColor(p.opacity);
            ctx.fill();
        }

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MAX_DIST) {
                    const alpha = (1 - dist / MAX_DIST) * 0.18;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = buildParticleColor(alpha);
                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                }
            }
        }

        particleAnimId = requestAnimationFrame(draw);
    }

    draw();

    particleResizeObs = new ResizeObserver(() => {
        resize();
        particles = makeParticles();
    });
    particleResizeObs.observe(canvas);
}

function stopParticles() {
    if (particleAnimId) { cancelAnimationFrame(particleAnimId); particleAnimId = null; }
    if (particleResizeObs) { particleResizeObs.disconnect(); particleResizeObs = null; }
}

watch(particleCanvas, async (canvas) => {
    stopParticles();
    if (canvas) { await nextTick(); startParticles(canvas); }
});

watch(currentTheme, () => {
    if (particleCanvas.value) { stopParticles(); startParticles(particleCanvas.value); }
});

// ─────────────────────────────────────────────────────────────────────────────
// CANVAS 2 — Floating bubbles  (currentHeroBg === 'particles-bubbles')
// ─────────────────────────────────────────────────────────────────────────────
const bubblesCanvas = ref(null);
let bubblesAnimId = null;
let bubblesResizeObs = null;

function buildBubbleColor(alpha) {
    return isDarkTheme()
        ? `rgba(150, 200, 255, ${alpha})`  // soft blue on dark
        : `rgba(20,  60,  150, ${alpha})`; // deep blue on light
}

function buildBubbleHighlight(alpha) {
    return isDarkTheme()
        ? `rgba(255, 255, 255, ${alpha})`
        : `rgba(255, 255, 255, ${alpha * 1.6})`;
}

function startBubbles(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    };
    resize();

    const makeBubbles = () =>
        Array.from({ length: 40 }, () => ({
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * canvas.height,
            r: Math.random() * 22 + 5,
            speed: Math.random() * 0.55 + 0.18,
            opacity: Math.random() * 0.22 + 0.04,
            drift: (Math.random() - 0.5) * 0.28,
            wobble: Math.random() * Math.PI * 2,
        }));

    let bubbles = makeBubbles();

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const b of bubbles) {
            b.y -= b.speed;
            b.wobble += 0.012;
            b.x += b.drift + Math.sin(b.wobble) * 0.25;
            b.opacity -= 0.00015;

            if (b.y + b.r < 0 || b.opacity <= 0) {
                b.x = Math.random() * canvas.width;
                b.y = canvas.height + b.r + Math.random() * 80;
                b.opacity = Math.random() * 0.22 + 0.04;
                b.wobble = Math.random() * Math.PI * 2;
            }

            // Outer circle stroke
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
            ctx.strokeStyle = buildBubbleColor(b.opacity);
            ctx.lineWidth = 1.3;
            ctx.stroke();

            // Inner top-left shine
            const shineR = b.r * 0.22;
            const shineX = b.x - b.r * 0.32;
            const shineY = b.y - b.r * 0.32;
            ctx.beginPath();
            ctx.arc(shineX, shineY, shineR, 0, Math.PI * 2);
            ctx.fillStyle = buildBubbleHighlight(b.opacity * 1.8);
            ctx.fill();
        }

        bubblesAnimId = requestAnimationFrame(draw);
    }

    draw();

    bubblesResizeObs = new ResizeObserver(() => {
        resize();
        bubbles = makeBubbles();
    });
    bubblesResizeObs.observe(canvas);
}

function stopBubbles() {
    if (bubblesAnimId) { cancelAnimationFrame(bubblesAnimId); bubblesAnimId = null; }
    if (bubblesResizeObs) { bubblesResizeObs.disconnect(); bubblesResizeObs = null; }
}

watch(bubblesCanvas, async (canvas) => {
    stopBubbles();
    if (canvas) { await nextTick(); startBubbles(canvas); }
});

watch(currentTheme, () => {
    if (bubblesCanvas.value) { stopBubbles(); startBubbles(bubblesCanvas.value); }
});
// ─────────────────────────────────────────────────────────────────────────────
// CANVAS 3 — Raindrops (currentHeroBg === 'rain')
// ─────────────────────────────────────────────────────────────────────────────
const rainCanvas = ref(null);
let rainAnimId = null;
let rainResizeObs = null;

// function buildRainColor(alpha) {
//     return isDarkTheme()
//         ? `rgba(100, 150, 255, ${alpha})` // Blue rain on dark
//         : `rgba(0, 50, 150, ${alpha})`;   // Deep blue rain on light
// }

function buildRainColor(alpha) {
    return isDarkTheme()
        ? `rgba(255, 255, 255, ${alpha})` // White/Light rain on dark backgrounds
        : `rgba(0, 0, 0, ${alpha * 0.8})`; // Black/Dark rain on light backgrounds
}

function startRain(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    };
    resize();

    const makeRain = () =>
        Array.from({ length: 80 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            length: Math.random() * 20 + 10,
            speed: Math.random() * 10 + 5,
            opacity: Math.random() * 0.4 + 0.1,
            width: Math.random() * 1 + 0.5
        }));

    let drops = makeRain();

    // function draw() {
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);

    //     for (const d of drops) {
    //         ctx.beginPath();
    //         ctx.moveTo(d.x, d.y);
    //         ctx.lineTo(d.x, d.y + d.length);
    //         ctx.strokeStyle = buildRainColor(d.opacity);
    //         ctx.lineWidth = d.width;
    //         ctx.lineCap = 'round';
    //         ctx.stroke();

    //         d.y += d.speed;
    //         if (d.y > canvas.height) {
    //             d.y = -d.length;
    //             d.x = Math.random() * canvas.width;
    //         }
    //     }
    //     rainAnimId = requestAnimationFrame(draw);
    // }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const d of drops) {
            // We use a slightly higher alpha for the "head" of the drop
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(d.x, d.y + d.length);

            // Create a subtle fade effect for each drop
            const gradient = ctx.createLinearGradient(d.x, d.y, d.x, d.y + d.length);
            gradient.addColorStop(0, buildRainColor(0));         // Top of drop (invisible)
            gradient.addColorStop(1, buildRainColor(d.opacity)); // Bottom of drop (full opacity)

            ctx.strokeStyle = gradient;
            ctx.lineWidth = d.width;
            ctx.lineCap = 'round';
            ctx.stroke();

            // Movement logic
            d.y += d.speed;

            // Reset drop when it leaves the screen
            if (d.y > canvas.height) {
                d.y = -d.length;
                d.x = Math.random() * canvas.width;
                d.speed = Math.random() * 10 + 5; // Re-randomize speed for variety
            }
        }
        rainAnimId = requestAnimationFrame(draw);
    }

    draw();
    rainResizeObs = new ResizeObserver(() => {
        resize();
        drops = makeRain();
    });
    rainResizeObs.observe(canvas);
}

function stopRain() {
    if (rainAnimId) { cancelAnimationFrame(rainAnimId); rainAnimId = null; }
    if (rainResizeObs) { rainResizeObs.disconnect(); rainResizeObs = null; }
}

watch(rainCanvas, async (canvas) => {
    stopRain();
    if (canvas) { await nextTick(); startRain(canvas); }
});

// ─────────────────────────────────────────────────────────────────────────────
// CLEANUP — stop all canvases when component unmounts
// ─────────────────────────────────────────────────────────────────────────────
onUnmounted(() => {
    stopParticles();
    stopBubbles();
    stopRain();
});

// Profile Frame ----------------------------------------------------------------

const frameStyle = computed(() => {
    const f = FRAME_STYLES[currentProfileFrame.value] ?? FRAME_STYLES.circle;
    return {
        background: 'var(--cta-gradient)',
        border: '1px solid var(--accent-border)',
        boxShadow: `0 0 20px var(--accent-shadow), 0 0 60px var(--accent-shadow), 0 0 100px var(--accent-shadow)`,
        clipPath: f.useClip ? f.clipPath : undefined,
        borderRadius: f.useClip ? '0' : f.borderRadius,
        transition: 'clip-path 0.4s ease, border-radius 0.4s ease',
    };
});

const innerFrameStyle = computed(() => {
    const f = FRAME_STYLES[currentProfileFrame.value] ?? FRAME_STYLES.circle;
    return {
        borderRadius: f.useClip ? '0' : f.borderRadius,
        clipPath: f.useClip ? f.clipPath : undefined,
        transition: 'clip-path 0.4s ease, border-radius 0.4s ease',
    };
});

</script>

<style scoped>
h1 {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    overflow: visible !important;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0px) translateX(0px);
    }

    33% {
        transform: translateY(-15px) translateX(10px);
    }

    66% {
        transform: translateY(10px) translateX(-10px);
    }
}

@keyframes float-reverse {

    0%,
    100% {
        transform: translateY(0px) translateX(0px);
    }

    33% {
        transform: translateY(15px) translateX(-10px);
    }

    66% {
        transform: translateY(-10px) translateX(10px);
    }
}

.animate-float-slow {
    animation: float 8s ease-in-out infinite;
}

.animate-float-reverse {
    animation: float-reverse 10s ease-in-out infinite;
}

.animate-float-delayed {
    animation: float 7s ease-in-out infinite 2s;
}

.cursor {
    animation: blink 1s infinite;
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}
</style>