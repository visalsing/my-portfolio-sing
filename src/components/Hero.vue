<template>
    <section id="home_hero"
        class="relative w-full overflow-hidden min-h-screen flex flex-col justify-center pt-20 pb-32 md:pt-24 md:pb-36"
        :style="heroBgStyle">

        <!-- ── Backdrop: soft glows only (no page grid) ── -->
        <div class="hero-glow hero-glow-a" aria-hidden="true"></div>
        <div class="hero-glow hero-glow-b" aria-hidden="true"></div>

        <!-- ── Main ── -->
        <div class="w-full px-5 sm:px-8 md:px-12 lg:px-8 max-w-5xl lg:max-w-7xl mx-auto relative z-10">
            <div class="grid lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-12 items-center">

                <!-- ───────── LEFT: text ───────── -->
                <div class="lg:col-span-8 flex flex-col mt-16 md:mt-0 text-center lg:text-left">

                    <h1 class="font-extrabold tracking-tight text-4xl sm:text-5xl xl:text-6xl leading-[1.4]"
                        :style="{ color: 'var(--surface-text)' }" data-aos="fade-right">
                        <span class="block text-xl sm:text-2xl font-medium"
                            :style="{ color: 'var(--surface-text-sub)' }">
                            {{ t('hello_im') }}
                        </span>
                        <span class="inline-block py-1 text-transparent bg-clip-text"
                            :style="{ backgroundImage: 'var(--logo-gradient)' }">
                            {{ localHeroText.name }}
                        </span>
                        <span class="hero-bot" :class="`is-${botState}`" role="button" tabindex="0"
                            aria-label="Launch the robot" @click="launchBot" @keydown.enter.prevent="launchBot"
                            @keydown.space.prevent="launchBot">
                            <span class="bot-fly">
                                <img :src="robotImageUrl" alt="" draggable="false" class="bot-img" />
                                <span class="bot-flame">
                                    <span class="flame-glow"
                                        :style="{ background: 'var(--cta-gradient)', boxShadow: '0 10px 40px var(--accent-shadow, rgba(239,68,68,0.5))' }"></span>
                                    <span class="flame-mid"
                                        :style="{ background: 'var(--cta-gradient)', filter: 'drop-shadow(0 0 12px var(--accent-text, #ef4444))' }"></span>
                                    <span class="flame-core"></span>
                                </span>
                            </span>
                        </span>
                    </h1>

                    <!-- Role line (terminal style) -->
                    <div class="mt-3 flex items-center justify-center lg:justify-start gap-3 font-mono text-base md:text-lg"
                        data-aos="fade-right" data-aos-delay="100">
                        <span class="font-bold" :style="{ color: 'var(--accent-mid)' }">&gt;</span>
                        <span>
                            <span ref="typingText" :style="{ color: 'var(--surface-text)' }"></span><span class="cursor"
                                :style="{ backgroundColor: 'var(--accent-mid)', boxShadow: '0 0 10px var(--accent-mid)' }"
                                aria-hidden="true"></span>
                        </span>
                    </div>

                    <p class="mt-6 mx-auto lg:mx-0 max-w-2xl xl:max-w-3xl text-base md:text-lg leading-8"
                        :style="{ color: 'var(--surface-text-sub)' }" data-aos="fade-right" data-aos-delay="200">
                        {{ localHeroText.intro }}
                    </p>

                    <!-- Buttons -->
                    <div class="mt-9 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                        data-aos="fade-up" data-aos-delay="300">
                        <router-link to="/contact"
                            class="btn-primary group w-full sm:w-max px-8 py-4 rounded-xl inline-flex items-center justify-center text-white font-semibold text-lg transition-all duration-300"
                            :style="{ background: 'var(--cta-gradient)' }">
                            {{ t('contact_me') }}
                            <ArrowRightIcon class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </router-link>

                        <button @click="openCv"
                            class="btn-ghost group w-full sm:w-max px-8 py-4 rounded-xl inline-flex items-center justify-center border font-semibold text-lg backdrop-blur-md transition-all duration-300 cursor-pointer"
                            :style="{ borderColor: 'var(--accent-border)', color: 'var(--surface-text)' }">
                            <ArrowDownTrayIcon class="w-5 h-5 mr-3 group-hover:translate-y-0.5 transition-transform"
                                :style="{ color: 'var(--accent-mid)' }" />
                            {{ t('download_cv') }}
                        </button>
                    </div>

                    <!-- Stats card -->
                    <div class="mt-12 mx-auto lg:mx-0 w-max max-w-full flex items-start gap-10 sm:gap-12"
                        data-aos="fade-up" data-aos-delay="400">
                        <!-- Projects Stat -->
                        <div class="stat text-center">
                            <div class="h-8 flex items-center justify-center text-2xl font-bold"
                                :style="{ color: 'var(--accent-mid)' }">
                                {{ t('amount3') }}+
                            </div>
                            <div class="text-sm" :style="{ color: 'var(--accent-text-muted)' }">
                                {{ t('projects') }}
                            </div>
                        </div>

                        <!-- Years Stat -->
                        <div class="stat text-center">
                            <div class="h-8 flex items-center justify-center text-2xl font-bold"
                                :style="{ color: 'var(--accent-mid)' }">
                                {{ t('amount2') }}+
                            </div>
                            <div class="text-sm" :style="{ color: 'var(--accent-text-muted)' }">
                                {{ t('years') }}
                            </div>
                        </div>

                        <!-- Clients Stat -->
                        <div class="stat text-center">
                            <div class="h-8 flex items-center justify-center text-2xl font-bold"
                                :style="{ color: 'var(--accent-mid)' }">
                                {{ t('amount1') }}+
                            </div>
                            <div class="text-sm" :style="{ color: 'var(--accent-text-muted)' }">
                                {{ t('clients') }}
                            </div>
                        </div>

                        <!-- Share Button Stat -->
                        <div class="stat text-center">
                            <button @click="openShareModal"
                                class="group block mx-auto cursor-pointer active:scale-95 transition-transform">
                                <div class="h-8 flex items-center justify-center transition-colors"
                                    :style="{ color: 'var(--accent-mid)' }">
                                    <ShareIcon class="w-6 h-6" />
                                </div>
                                <div class="text-sm group-hover:opacity-80 transition-opacity"
                                    :style="{ color: 'var(--accent-text-muted)' }">
                                    {{ t('share') }}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- ───────── RIGHT: avatar (Smaller 4x6 Portrait Ratio) ───────── -->
                <div class="lg:col-span-4 flex justify-center lg:justify-end" data-aos="zoom-in" data-aos-delay="300">
                    <div
                        class="avatar-wrap relative w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[300px] aspect-[4/6]">

                        <!-- Corner brackets: only the corners the frame asks for, same radius as the frame → always aligned -->
                        <div v-if="frame.corners?.length" class="corner-frame" :style="cornerStyle" aria-hidden="true">
                            <span class="corner-ring"></span>
                        </div>

                        <!-- Glow behind -->
                        <div class="absolute inset-6 rounded-full blur-[90px] opacity-40 -z-10"
                            :style="{ backgroundColor: 'var(--accent-mid)' }"></div>

                        <!-- Frame -->
                        <div class="relative z-10 w-full h-full" :class="{ 'frame-spin': frame.effect === 'spin' }" :style="frameStyle">
                            <!-- Compare stage: drag the bar → black & white ⇄ normal color -->
                            <div ref="stageEl" class="compare w-full h-full overflow-hidden relative select-none"
                                :class="{ 'is-cyber': cyber }" :style="innerFrameStyle" @pointerdown="onPointerDown"
                                @pointermove="onPointerMove" @pointerup="onPointerUp" @pointercancel="onPointerUp"
                                @pointerenter="onEnter" @pointerleave="onLeave">

                                <div v-if="frame.grid" class="frame-grid absolute inset-0 pointer-events-none"
                                    aria-hidden="true"></div>

                                <!-- RIGHT side: normal color -->
                                <img :src="heroImg" alt="So Visalsing" loading="lazy" draggable="false"
                                    class="color-img absolute inset-0 w-full h-full object-cover object-top pointer-events-none" />

                                <!-- LEFT side: black & white -->
                                <div class="absolute inset-0 pointer-events-none"
                                    :style="{ clipPath: `inset(0 ${100 - split}% 0 0)` }">
                                    <img :src="heroImg" alt="" loading="lazy" draggable="false"
                                        class="bw-img absolute inset-0 w-full h-full object-cover object-top" />
                                </div>

                                <!-- Cyber filter (on hover): ONLY where the person is → the photo's own
                                     transparency is used as a mask (face, body, clothes) -->
                                <div class="cyber-tint pointer-events-none absolute inset-0" :style="cyberMask"
                                    aria-hidden="true"></div>
                                <div class="cyber-fx pointer-events-none absolute inset-0" :style="cyberMask"
                                    aria-hidden="true">
                                    <div class="cyber-mesh"></div>
                                    <div class="cyber-lines"></div>
                                    <div class="cyber-beam"></div>
                                </div>

                                <!-- Face scan: corner brackets + wireframe mesh -->
                                <div class="face-box pointer-events-none absolute" :class="{ on: faceHot }"
                                    :style="faceStyle" aria-hidden="true">
                                    <svg class="face-mesh" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <path :d="MESH.lines" class="mesh-lines" />
                                        <path :d="MESH.dots" class="mesh-dots" />
                                    </svg>
                                    <span class="fc fc-tl"></span>
                                    <span class="fc fc-tr"></span>
                                    <span class="fc fc-bl"></span>
                                    <span class="fc fc-br"></span>
                                    <span class="scan-label">SCANNING</span>
                                </div>

                                <!-- Divider bar + handle -->
                                <div class="compare-bar" :style="{ left: split + '%' }">
                                    <span class="compare-line" aria-hidden="true"></span>
                                    <button type="button" class="compare-handle" :class="{ hint: !touched }"
                                        role="slider" aria-label="Compare black and white with color" aria-valuemin="0"
                                        aria-valuemax="100" :aria-valuenow="Math.round(split)" @keydown="onKey">
                                        <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor"
                                            stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <!-- Keep labels outside the clipped compare stage so rounded frames cannot cut them off. -->
                            <span class="compare-chip compare-chip-left" :style="{ opacity: split > 22 ? 1 : 0 }">
                                B&amp;W
                            </span>
                            <span class="compare-chip compare-chip-right" :style="{ opacity: split < 78 ? 1 : 0 }">
                                Color
                            </span>
                        </div>

                        <!-- Status panel toggle (sits below the photo): hides / shows the "Currently working" badge -->
                        <button type="button" class="clear-toggle" :class="{ on: hideStatus }"
                            :aria-pressed="hideStatus" :title="hideStatus ? 'Show the status panel' : 'Hide the status panel'"
                            @click="toggleStatus">
                            <EyeIcon v-if="hideStatus" class="w-3.5 h-3.5" />
                            <EyeSlashIcon v-else class="w-3.5 h-3.5" />
                            <span>{{ hideStatus ? 'Show status' : 'Hide status' }}</span>
                        </button>

                        <!-- Status badge: rotates "currently working" ⇄ "open to freelance" · click → Contact -->
                        <button type="button" @click="nextStatus"
                            class="status-badge badge-float absolute -bottom-6 -left-3 sm:-left-8 z-20 block min-w-[235px] rounded-2xl border px-5 py-3.5 backdrop-blur-xl shadow-2xl text-left cursor-pointer"
                            :class="{ 'is-hidden': hideStatus }" :tabindex="hideStatus ? -1 : 0"
                            :style="glassStyle" :aria-label="`${status.label}: ${status.text}. Click to show the next status`">
                            <Transition name="status" mode="out-in">
                                <div :key="statusIndex">
                                    <p class="text-sm" :style="{ color: 'var(--accent-text)' }">{{ status.label }}</p>
                                    <p class="mt-1 flex items-center gap-2.5 font-semibold"
                                        :style="{ color: 'var(--surface-text)' }">
                                        <span class="relative flex h-2.5 w-2.5 shrink-0">
                                            <span
                                                class="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                                                :style="{ backgroundColor: status.dot }"></span>
                                            <span class="relative inline-flex h-2.5 w-2.5 rounded-full"
                                                :style="{ backgroundColor: status.dot }"></span>
                                        </span>
                                        {{ status.text }}
                                    </p>
                                </div>
                            </Transition>
                            <!-- progress dots -->
                            <span class="mt-2.5 flex items-center gap-1.5" aria-hidden="true">
                                <i v-for="(_, i) in STATUSES" :key="i" class="status-pip"
                                    :class="{ on: i === statusIndex }"></i>
                            </span>
                        </button>
                    </div>
                </div>

            </div>
        </div>

        <!-- ───────── CV preview modal ───────── -->
        <Teleport to="body">
            <Transition name="fade">
                <div v-if="isCvOpen"
                    class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm"
                    @click.self="closeCv">
                    <div class="cv-modal w-full max-w-3xl rounded-3xl border shadow-2xl flex flex-col overflow-hidden"
                        :style="{ backgroundColor: 'var(--surface-bg-3)', borderColor: 'var(--accent-border)' }"
                        role="dialog" aria-modal="true" aria-label="CV preview">

                        <!-- header -->
                        <div class="flex items-center gap-3 px-5 py-4 border-b"
                            :style="{ borderColor: 'var(--accent-border)' }">
                            <span
                                class="grid place-items-center w-9 h-9 rounded-xl text-white text-[11px] font-bold tracking-wider"
                                :style="{ background: 'var(--cta-gradient)' }">PDF</span>
                            <div class="min-w-0 flex-1">
                                <p class="truncate text-sm font-semibold" :style="{ color: 'var(--surface-text)' }">
                                    {{ CV_FILE_NAME }}</p>
                                <p class="text-xs" :style="{ color: 'var(--accent-text-muted)' }">CV preview</p>
                            </div>
                            <button @click="closeCv" aria-label="Close"
                                class="p-1.5 rounded-full opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                                :style="{ color: 'var(--surface-text)' }">
                                <XMarkIcon class="w-5 h-5" />
                            </button>
                        </div>

                        <!-- preview -->
                        <div class="relative bg-neutral-900/60">
                            <iframe v-if="cvPreviewUrl" :src="`${cvPreviewUrl}#toolbar=0&navpanes=0&view=FitH`"
                                title="CV preview" class="block w-full h-[62vh] sm:h-[68vh] border-0 bg-white"></iframe>
                            <div v-else class="h-[62vh] sm:h-[68vh] grid place-items-center text-sm"
                                :style="{ color: 'var(--accent-text-muted)' }">
                                <span class="inline-flex items-center gap-3">
                                    <span class="cv-spinner"></span> Loading preview…
                                </span>
                            </div>
                        </div>

                        <!-- footer -->
                        <div class="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t"
                            :style="{ borderColor: 'var(--accent-border)' }">
                            <a :href="cvPreviewUrl || undefined" target="_blank" rel="noopener"
                                class="text-xs underline-offset-4 hover:underline"
                                :style="{ color: 'var(--accent-text-muted)' }">Preview not showing? Open in new tab</a>

                            <div class="flex items-center gap-3 w-full sm:w-auto">
                                <button @click="closeCv"
                                    class="flex-1 sm:flex-none px-6 py-3 rounded-xl border font-semibold cursor-pointer transition-colors hover:bg-white/5"
                                    :style="{ borderColor: 'var(--accent-border)', color: 'var(--surface-text)' }">
                                    {{ dl.state === 'loading' ? 'Cancel download' : 'Cancel' }}
                                </button>

                                <button @click="downloadCv" :disabled="dl.state === 'loading'"
                                    class="dl-btn flex-1 sm:flex-none" :class="`is-${dl.state}`"
                                    :style="{ background: dl.state === 'done' ? '#059669' : 'var(--cta-gradient)' }">
                                    <span class="dl-fill"
                                        :style="{ width: dl.state === 'loading' ? dl.progress + '%' : '0%' }"></span>
                                    <span class="dl-icon">
                                        <ArrowDownTrayIcon v-if="dl.state === 'idle' || dl.state === 'error'"
                                            class="w-5 h-5" />
                                        <svg v-else viewBox="0 0 32 32" class="dl-ring">
                                            <circle class="ring-bg" cx="16" cy="16" r="13" />
                                            <circle class="ring-fg" cx="16" cy="16" r="13"
                                                :style="{ strokeDashoffset: RING_C * (1 - dl.progress / 100) }" />
                                            <path class="tick" d="M9.5 16.5l4.5 4.5 8.5-9" />
                                        </svg>
                                    </span>
                                    <span class="dl-label">
                                        <template v-if="dl.state === 'loading'">Downloading <b>{{
                                            Math.round(dl.progress) }}%</b></template>
                                        <template v-else-if="dl.state === 'done'">Downloaded</template>
                                        <template v-else-if="dl.state === 'error'">Retry download</template>
                                        <template v-else>Download</template>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>

        <!-- ───────── Share modal ───────── -->
        <Teleport to="body">
            <Transition name="fade">
                <div v-if="isShareModalOpen"
                    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    @click.self="closeShareModal">
                    <div class="w-full max-w-sm p-6 relative rounded-3xl border shadow-2xl text-center"
                        :style="{ backgroundColor: 'var(--surface-bg-3)', borderColor: 'var(--accent-border)' }">

                        <button @click="closeShareModal" aria-label="Close"
                            class="absolute top-4 right-4 p-1.5 rounded-full opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                            :style="{ color: 'var(--surface-text)' }">
                            <XMarkIcon class="w-5 h-5" />
                        </button>

                        <h3 class="text-xl font-bold mb-5" :style="{ color: 'var(--surface-text)' }">Share Portfolio
                        </h3>

                        <div class="bg-white p-4 rounded-2xl inline-block mb-6 shadow-inner">
                            <img src="../assets/images/qrcodes/sovisalsing-portfolio.png"
                                alt="Sovisalsing Portfolio QR Code" class="w-40 h-40 object-contain mx-auto" />
                        </div>

                        <div class="flex items-center gap-2 rounded-xl border p-2 pl-3"
                            :style="{ borderColor: 'var(--accent-border)' }">
                            <input type="text" readonly :value="shareUrl"
                                class="bg-transparent text-sm w-full focus:outline-none select-all"
                                :style="{ color: 'var(--surface-text-sub)' }" />
                            <button @click="copyShareLink"
                                class="p-2 rounded-lg text-white flex items-center justify-center min-w-[40px] cursor-pointer transition-all"
                                :style="{ background: isCopied ? '#059669' : 'var(--cta-gradient)' }">
                                <CheckIcon v-if="isCopied" class="w-5 h-5" />
                                <DocumentDuplicateIcon v-else class="w-5 h-5" />
                            </button>
                        </div>

                        <p v-if="isCopied" class="text-xs text-emerald-400 mt-2">Link copied to clipboard!</p>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </section>
</template>

<script setup>
import { ArrowRightIcon, ArrowDownTrayIcon } from '@heroicons/vue/16/solid';
import { ref, unref, onMounted, onUnmounted, computed } from 'vue';
import { t, currentLang } from './../stores/languages';
import { currentHeroBg, getHeroBgUrl } from './../stores/heroBg.js';
import { currentProfileFrame, FRAME_STYLES } from './../stores/profileFrame.js';
import { currentScheme, robotSchemeMap } from './../stores/colorScheme.js';
import {
    ShareIcon,
    DocumentDuplicateIcon,
    CheckIcon,
    XMarkIcon,
    EyeIcon,
    EyeSlashIcon
} from '@heroicons/vue/24/outline';

const heroImg = `${import.meta.env.BASE_URL}myphoto-rmbg.png`;

// Flying robot (same robot + accent color scheme as the 404 page)
const robotImageUrl = computed(() => {
    const fileName = robotSchemeMap[currentScheme.value] || 'robot-blue-cyan-rmbg.png';
    return new URL(`../assets/images/robots404/${fileName}`, import.meta.url).href;
});

// Click the robot → it blasts off, stays away for a few seconds, then flies back
const botState = ref('idle');   // idle | launch | gone | return
let botTimers = [];
function launchBot() {
    if (botState.value !== 'idle') return;
    botState.value = 'launch';
    const later = (fn, ms) => botTimers.push(setTimeout(fn, ms));
    later(() => { botState.value = 'gone'; }, 1150);        // out of sight
    later(() => { botState.value = 'return'; }, 1150 + 3000); // away for ~3 s
    later(() => { botState.value = 'idle'; }, 1150 + 3000 + 1500);
}

// ── Status badge (edit this!) ───────────────────────────────────────────────
// You are currently employed → the badge says so, and shows you're still open to
// freelance / collaboration. Put your workplace name in `company` (or leave '' to hide it).
const WORK = { role: 'Data Support Specialist', company: '' };

const STATUSES = [
    {
        label: 'Currently working',
        text: WORK.company ? `${WORK.role} @ ${WORK.company}` : WORK.role,
        dot: '#fbbf24',   // amber = busy at work
    },
    {
        label: 'Open to',
        text: 'Freelance & collaboration',
        dot: '#34d399',   // green = available
    },
    // {
    //     label: 'Available for Work',
    //     text: 'Open to opportunities',
    //     dot: '#34d399',   // green = available
    // },
];
const statusIndex = ref(0);
const status = computed(() => STATUSES[statusIndex.value]);
let statusTimer = null;
const nextStatus = () => {
    statusIndex.value = (statusIndex.value + 1) % STATUSES.length;
};

const glassStyle = {
    background: 'color-mix(in srgb, var(--surface-bg-3) 75%, transparent)',
    borderColor: 'var(--accent-border)',
};

// ── CV preview + download ───────────────────────────────────────────────────
const CV_FILE_NAME = 'So Visalsing - CV Resumé CSE.pdf';
const RING_C = 2 * Math.PI * 13;   // circumference of the progress ring (r = 13)

const isCvOpen = ref(false);
const dl = ref({ state: 'idle', progress: 0 });   // idle | loading | done | error
let dlAbort = null;
let dlResetTimer = null;

// The PDF is bundled INSIDE a JavaScript chunk (base64, loaded only when the modal opens)
// and turned into a Blob in memory. No .pdf URL is ever requested, so download managers
// (IDM etc.) have nothing to intercept.
let cvBlobPromise = null;
function getCvBlob() {
    if (!cvBlobPromise) {
        cvBlobPromise = import('../assets/pdf/cv/So Visalsing - CV Resumé CSE.pdf?inline').then((m) => {
            const b64 = m.default.split(',')[1];
            const bin = atob(b64);
            const bytes = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
            return new Blob([bytes], { type: 'application/pdf' });
        });
        cvBlobPromise.catch(() => { cvBlobPromise = null; });
    }
    return cvBlobPromise;
}

const cvPreviewUrl = ref('');

async function loadCvPreview() {
    if (cvPreviewUrl.value) return;
    try {
        cvPreviewUrl.value = URL.createObjectURL(await getCvBlob());
    } catch (err) {
        console.error('CV preview failed:', err);
    }
}

const openCv = () => { isCvOpen.value = true; loadCvPreview(); };

function cancelDownload() {
    if (dlAbort) { dlAbort.abort(); dlAbort = null; }
    clearTimeout(dlResetTimer);
    dl.value = { state: 'idle', progress: 0 };
}

const closeCv = () => {
    cancelDownload();
    isCvOpen.value = false;
    if (cvPreviewUrl.value.startsWith('blob:')) URL.revokeObjectURL(cvPreviewUrl.value);
    cvPreviewUrl.value = '';
};

async function downloadCv() {
    if (dl.value.state === 'loading') return;
    clearTimeout(dlResetTimer);
    dl.value = { state: 'loading', progress: 0 };

    const ctrl = new AbortController();
    dlAbort = ctrl;
    const MIN_MS = 1800;                 // keep the animation visible even for a fast local file
    const t0 = performance.now();
    let real = 0;                        // real progress 0..100
    let finished = false;
    let blob = null;

    // smooth display: never faster than real progress, never faster than the timeline
    const raf = () => {
        if (ctrl.signal.aborted) return;
        const timeline = Math.min(1, (performance.now() - t0) / MIN_MS);
        const eased = 1 - Math.pow(1 - timeline, 2);
        const shown = Math.min(real, eased * 100);
        dl.value = { state: 'loading', progress: Math.max(dl.value.progress, shown) };
        if (finished && shown >= 100) return finish();
        requestAnimationFrame(raf);
    };

    const finish = () => {
        dl.value = { state: 'done', progress: 100 };
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = CV_FILE_NAME;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 10000);
        dlAbort = null;
        dlResetTimer = setTimeout(() => { dl.value = { state: 'idle', progress: 0 }; }, 2600);
    };

    requestAnimationFrame(raf);

    try {
        blob = await getCvBlob();
        real = 100;
        finished = true;
    } catch (err) {
        if (ctrl.signal.aborted) return;
        console.error('CV download failed:', err);
        ctrl.abort();   // stops the progress loop
        dl.value = { state: 'error', progress: 0 };
    }
}

const isShareModalOpen = ref(false);
const isCopied = ref(false);
const shareUrl = ref('https://my-portfolio-sing.vercel.app/');

const openShareModal = () => { isShareModalOpen.value = true; };
const closeShareModal = () => { isShareModalOpen.value = false; isCopied.value = false; };

const copyShareLink = async () => {
    try {
        await navigator.clipboard.writeText(shareUrl.value);
        isCopied.value = true;
        setTimeout(() => { isCopied.value = false; }, 2500);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
};

const onKeydown = (e) => {
    if (e.key !== 'Escape') return;
    if (isCvOpen.value) closeCv(); else closeShareModal();
};

const heroData = {
    name: {
        en: "So Visalsing",
        km: "សោ វិសាលស៊ីង",
        zh: "So Visalsing"
    },
    introtext: {
        en: "I'm a Software Developer passionate about building digital solutions. My background in computer science and information technology, combined with practical experience in software development, system implementation, and data support, drives my interest in creating meaningful and practical solutions.",
        km: "ខ្ញុំជាអ្នកអភិវឌ្ឍន៍កម្មវិធីសូហ្វវែរ ដែលមានចំណាប់អារម្មណ៍លើការបង្កើតដំណោះស្រាយឌីជីថល។ ដោយផ្អែកលើមូលដ្ឋានចំណេះដឹងផ្នែកវិទ្យាសាស្ត្រកុំព្យូទ័រ និងព័ត៌មានវិទ្យា រួមជាមួយបទពិសោធន៍ការងារជាក់ស្តែងក្នុងការអភិវឌ្ឍកម្មវិធី ការដាក់ឱ្យប្រើប្រាស់ប្រព័ន្ធ និងការទ្រទ្រង់ទិន្នន័យ ខ្ញុំតែងតែចាប់អារម្មណ៍លើការបង្កើតដំណោះស្រាយដែលមានអត្ថន័យ និងអាចប្រើប្រាស់បានជាក់ស្តែង។",
        zh: "我是一名软件开发人员，热衷于构建数字化解决方案。我拥有计算机科学与信息技术方面的学术背景，并具备软件开发、系统实施和数据支持方面的实践经验。这些经历激励我不断探索新技术、解决问题，并创造有意义且实用的解决方案。",
        fr: "Je suis développeur logiciel et passionné par la création de solutions numériques. Grâce à ma formation en informatique et en technologies de l'information, ainsi qu'à mon expérience pratique en développement logiciel, en déploiement de systèmes et en assistance aux données, je suis motivé par la création de solutions pertinentes et concrètes.",
        lo: "ຂ້ອຍເປັນນັກພັດທະນາຊອບແວ ທີ່ມີຄວາມສົນໃຈໃນການສ້າງສັນວິທີແກ້ໄຂດ້ານດິຈິຕອນ. ພື້ນຖານຄວາມຮູ້ຂອງຂ້ອຍປະກອບມີວິທະຍາສາດຄອມພິວເຕີ ແລະ ເຕັກໂນໂລຊີສາລະສົນເທດ ຄຽງຄູ່ກັບປະສົບການຕົວຈິງໃນການພັດທະນາຊອບແວ, ການນຳລະບົບໄປໃຊ້ງານ ແລະ ການສະໜັບສະໜູນດ້ານຂໍ້ມູນ. ສິ່ງເຫຼົ່ານີ້ຜັກດັນໃຫ້ຂ້ອຍມຸ່ງໝັ້ນໃນການສ້າງວິທີແກ້ໄຂທີ່ມີຄຸນຄ່າ ແລະ ນຳໃຊ້ໄດ້ຈິງ.",
    }
};

const localHeroText = computed(() => {
    const lang = unref(currentLang) || 'en';
    return {
        name: heroData.name[lang] || heroData.name.en,
        intro: heroData.introtext[lang] || heroData.introtext.en,
    };
});

const typingText = ref(null);
const roles = [
    "Software Developer",
    "Web Developer",
    "Full-stack Developer",
    "UX/UI Designer",
    "System Implementer",
    "Data Analyst",
    // "Front-end Developer",
    // "Back-end Developer",
    // "API Integrator",
    // "Email Marketer"
];
let typingTimer = null;

onMounted(() => {
    document.addEventListener('keydown', onKeydown);

    let roleIndex = 0, charIndex = 0, isDeleting = false;

    function typeEffect() {
        if (!typingText.value) return;
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

        typingTimer = setTimeout(typeEffect, speed);
    }

    typeEffect();
});

const heroBgStyle = computed(() => {
    const imgUrl = getHeroBgUrl(currentHeroBg.value);
    if (!imgUrl) return {};

    const isStars = currentHeroBg.value === 'stars';

    return {
        backgroundImage: isStars
            ? `url(${imgUrl})`
            : `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url(${imgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        transition: 'background-image 0.4s ease',
    };
});

onUnmounted(() => {
    clearTimeout(typingTimer);
    document.removeEventListener('keydown', onKeydown);
});

const frame = computed(() => FRAME_STYLES[currentProfileFrame.value] ?? FRAME_STYLES.circle);

const frameStyle = computed(() => {
    const f = frame.value;
    const fx = f.effect;
    const style = {
        background: f.ring
            ? 'var(--cta-gradient)'
            : 'color-mix(in srgb, var(--surface-bg-3) 60%, transparent)',
        padding: f.ring ? '6px' : '0',
        border: f.ring ? 'none' : '1px solid var(--accent-border)',
        borderRadius: f.borderRadius,
        boxShadow: '0 0 40px var(--accent-shadow), 0 0 100px var(--accent-shadow)',
        transition: 'border-radius 0.4s ease',
    };

    // Animated conic ring comes from the .frame-spin class, so no inline background
    if (fx === 'spin') delete style.background;

    if (fx === 'neon') {
        style.background = 'color-mix(in srgb, var(--surface-bg-3) 45%, transparent)';
        style.border = '2px solid var(--accent-text)';
        style.boxShadow = '0 0 14px var(--accent-text), 0 0 48px var(--accent-shadow), inset 0 0 24px var(--accent-shadow)';
    }
    if (fx === 'stack') {
        style.boxShadow = '14px 14px 0 -1px color-mix(in srgb, var(--accent-from) 38%, transparent), 28px 28px 0 -2px color-mix(in srgb, var(--accent-to) 20%, transparent), 0 0 60px var(--accent-shadow)';
    }
    if (fx === 'double') {
        style.boxShadow = '0 0 0 6px var(--surface-bg-3), 0 0 0 8px var(--accent-from), 0 0 50px var(--accent-shadow)';
    }

    // Cut-corner frames: clip-path would also clip a shadow, so the soft glow behind the frame is used instead
    if (f.clip) {
        style.clipPath = f.clip;
        style.boxShadow = 'none';
    }
    return style;
});

const innerFrameStyle = computed(() => {
    const f = frame.value;
    return {
        background: 'radial-gradient(circle at 50% 25%, color-mix(in srgb, var(--accent-mid) 28%, transparent), var(--surface-bg-3) 70%)',
        borderRadius: f.innerClip ? '0' : f.borderRadius,
        clipPath: f.innerClip || undefined,
        transition: 'border-radius 0.4s ease',
    };
});

// ── Corner brackets: same radius as the frame, pushed out by CORNER_GAP ─────
const CORNER_GAP = 14;
const ALL_CORNERS = ['tl', 'tr', 'bl', 'br'];
const growRadius = (r, d) => String(r ?? '0').replace(/(\d*\.?\d+)px/g, (_, n) => {
    const v = parseFloat(n);
    return v > 0 ? `${v + d}px` : '0px';   // sharp corners stay sharp
});
const cornerStyle = computed(() => {
    const list = frame.value.corners || [];
    const st = {
        inset: `-${CORNER_GAP}px`,
        borderRadius: growRadius(frame.value.borderRadius, CORNER_GAP),
    };
    // corners that are not wanted get a zero-size mask patch (= hidden)
    ALL_CORNERS.forEach((c) => { if (!list.includes(c)) st[`--c-${c}`] = '0px'; });
    // gradient runs along the diagonal that the visible corners sit on
    const antiDiagonal = list.length === 2 && list.includes('bl') && list.includes('tr');
    st['--corner-angle'] = antiDiagonal ? '45deg' : '135deg';
    return st;
});

// ── Status panel toggle: hide / show the "Currently working · Open to" badge ─
const STATUS_KEY = 'hero-hide-status';
const hideStatus = ref(false);
try { hideStatus.value = localStorage.getItem(STATUS_KEY) === '1'; } catch { /* storage blocked */ }

function toggleStatus() {
    hideStatus.value = !hideStatus.value;
    try { localStorage.setItem(STATUS_KEY, hideStatus.value ? '1' : '0'); } catch { /* storage blocked */ }
}

// ── Compare slider (black & white ⇄ normal color) ───────────────────────────
const split = ref(50);        // % of the frame showing black & white (from the left)
const stageEl = ref(null);
const touched = ref(false);   // hides the pulsing hint after first use

let dragging = false;
let introRaf = null;
let introTimer = null;

function setFromEvent(e) {
    const r = stageEl.value.getBoundingClientRect();
    split.value = Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100));
}

function cancelIntro() {
    if (introRaf) { cancelAnimationFrame(introRaf); introRaf = null; }
    clearTimeout(introTimer);
}

function animateSplit(to, ms = 1400) {
    const from = split.value;
    const t0 = performance.now();
    const step = (now) => {
        const k = Math.min(1, (now - t0) / ms);
        const eased = 1 - Math.pow(1 - k, 3);
        split.value = from + (to - from) * eased;
        introRaf = k < 1 ? requestAnimationFrame(step) : null;
    };
    introRaf = requestAnimationFrame(step);
}

function onPointerDown(e) {
    cancelIntro();
    touched.value = true;
    setSpot(e);
    if (e.pointerType !== 'mouse') cyber.value = true;   // touch: effect while pressing
    dragging = true;
    stageEl.value.setPointerCapture(e.pointerId);
    setFromEvent(e);
}

function onPointerMove(e) {
    setSpot(e);
    if (dragging) setFromEvent(e);
}

function onPointerUp(e) {
    dragging = false;
    if (e.pointerType !== 'mouse') {
        clearTimeout(cyberTimer);
        cyberTimer = setTimeout(() => { cyber.value = false; }, 900);
    }
    try { stageEl.value.releasePointerCapture(e.pointerId); } catch { /* not captured */ }
}

function onKey(e) {
    const step = e.shiftKey ? 10 : 3;
    if (e.key === 'ArrowLeft') split.value = Math.max(0, split.value - step);
    else if (e.key === 'ArrowRight') split.value = Math.min(100, split.value + step);
    else if (e.key === 'Home') split.value = 0;
    else if (e.key === 'End') split.value = 100;
    else return;
    e.preventDefault();
    cancelIntro();
    touched.value = true;
}

onMounted(() => {
    // Intro: the black & white side sweeps in from the left
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
        split.value = 50;
    } else {
        split.value = 0;
        introTimer = setTimeout(() => animateSplit(50), 700);
    }
});

// ── Cyber filter (hover) ────────────────────────────────────────────────────
const cyber = ref(false);
let cyberTimer = null;

const faceHot = ref(false);

// Cyber filter is a spotlight that follows the pointer (only that part gets filtered)
function setSpot(e) {
    const el = stageEl.value;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
    const px = (x / r.width) * 100;
    const py = (y / r.height) * 100;
    faceHot.value = px > FACE.x - 6 && px < FACE.x + FACE.w + 6 && py > FACE.y - 6 && py < FACE.y + FACE.h + 6;
}

function onEnter(e) { if (e.pointerType === 'mouse') { setSpot(e); cyber.value = true; } }
function onLeave(e) { if (e.pointerType === 'mouse') { cyber.value = false; faceHot.value = false; } }

// The photo itself is the mask → effects only appear on the person (alpha channel)
const cyberMask = { '--photo': `url(${heroImg})` };

// Where the face is, as % of the frame (left → right, top → bottom).
// Adjust these 4 numbers if the brackets/mesh don't sit exactly on the face.
const FACE = { x: 27, y: 14, w: 46, h: 43 };
const faceStyle = {
    left: `${FACE.x}%`,
    top: `${FACE.y}%`,
    width: `${FACE.w}%`,
    height: `${FACE.h}%`,
};

// Low-poly wireframe for the face (generated once, stable "random" with a seed)
function seededRandom(seed) {
    let a = seed;
    return () => {
        a |= 0; a = (a + 0x6D2B79F5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const MESH = (() => {
    const rnd = seededRandom(7);
    const cols = 9, rows = 11;
    const pts = [];
    for (let j = 0; j <= rows; j++) {
        pts[j] = [];
        for (let i = 0; i <= cols; i++) {
            pts[j][i] = {
                x: i / cols + (rnd() - 0.5) * (0.55 / cols),
                y: j / rows + (rnd() - 0.5) * (0.55 / rows),
            };
        }
    }
    // face-shaped area: an ellipse that gets narrower toward the chin
    const inside = (p) => {
        const dx = (p.x - 0.5) / 0.5;
        const dy = (p.y - 0.5) / 0.5;
        const rx = p.y > 0.55 ? 1 - (p.y - 0.55) * 0.9 : 1;
        return (dx / rx) ** 2 + dy ** 2 <= 1;
    };
    const f = (n) => (n * 100).toFixed(1);
    let lines = '';
    let dots = '';
    const seg = (a, b) => {
        if (inside(a) && inside(b)) lines += `M${f(a.x)} ${f(a.y)}L${f(b.x)} ${f(b.y)}`;
    };
    for (let j = 0; j <= rows; j++) {
        for (let i = 0; i <= cols; i++) {
            const a = pts[j][i];
            if (i < cols) seg(a, pts[j][i + 1]);
            if (j < rows) seg(a, pts[j + 1][i]);
            if (i < cols && j < rows) seg(a, pts[j + 1][i + 1]);
            if (inside(a)) dots += `M${f(a.x)} ${f(a.y)}h0.01`;
        }
    }
    return { lines, dots };
})();

onMounted(() => {
    statusTimer = setInterval(nextStatus, 4200);
});

onUnmounted(() => {
    clearInterval(statusTimer);
    botTimers.forEach(clearTimeout);
    cancelDownload();
    cancelIntro();
    clearTimeout(cyberTimer);
});
</script>

<style scoped>
h1 {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    overflow: visible !important;
}

.frame-grid {
    background-image:
        linear-gradient(color-mix(in srgb, var(--accent-mid) 22%, transparent) 1px, transparent 1px),
        linear-gradient(90deg, color-mix(in srgb, var(--accent-mid) 22%, transparent) 1px, transparent 1px);
    background-size: 34px 34px;
    -webkit-mask-image: radial-gradient(ellipse 85% 85% at 50% 50%, #000 30%, transparent 100%);
    mask-image: radial-gradient(ellipse 85% 85% at 50% 50%, #000 30%, transparent 100%);
}

.hero-glow {
    position: absolute;
    border-radius: 9999px;
    filter: blur(130px);
    opacity: 0.2;
    pointer-events: none;
    z-index: 0;
}

.hero-glow-a {
    top: -12%;
    left: -10%;
    width: 42rem;
    height: 42rem;
    background: var(--accent-mid);
}

.hero-glow-b {
    bottom: -18%;
    right: -12%;
    width: 36rem;
    height: 36rem;
    background: var(--accent-to);
}

.btn-primary {
    box-shadow: 0 10px 30px -10px var(--accent-shadow-lg, var(--accent-shadow));
}

.btn-primary:hover {
    filter: brightness(1.12);
    transform: translateY(-2px);
}

.btn-ghost:hover {
    background-color: var(--accent-bg);
    border-color: var(--accent-text);
    transform: translateY(-2px);
}

/* ── Corner brackets (follow the frame's corner radius) ───────────────── */
@property --corner-len {
    syntax: '<length>';
    inherits: false;
    initial-value: 72px;
}

.corner-frame {
    --corner-len: 72px;
    position: absolute;
    pointer-events: none;
    /* Decorative brackets sit behind the portrait and its compare labels. */
    z-index: 5;
    transition: --corner-len 0.5s ease, border-radius 0.4s ease;
    /* only the wanted corners of the ring stay visible (--c-tl etc. are set to 0px for hidden ones) */
    -webkit-mask:
        linear-gradient(#000 0 0) top left / var(--c-tl, var(--corner-len)) var(--c-tl, var(--corner-len)) no-repeat,
        linear-gradient(#000 0 0) top right / var(--c-tr, var(--corner-len)) var(--c-tr, var(--corner-len)) no-repeat,
        linear-gradient(#000 0 0) bottom left / var(--c-bl, var(--corner-len)) var(--c-bl, var(--corner-len)) no-repeat,
        linear-gradient(#000 0 0) bottom right / var(--c-br, var(--corner-len)) var(--c-br, var(--corner-len)) no-repeat;
    mask:
        linear-gradient(#000 0 0) top left / var(--c-tl, var(--corner-len)) var(--c-tl, var(--corner-len)) no-repeat,
        linear-gradient(#000 0 0) top right / var(--c-tr, var(--corner-len)) var(--c-tr, var(--corner-len)) no-repeat,
        linear-gradient(#000 0 0) bottom left / var(--c-bl, var(--corner-len)) var(--c-bl, var(--corner-len)) no-repeat,
        linear-gradient(#000 0 0) bottom right / var(--c-br, var(--corner-len)) var(--c-br, var(--corner-len)) no-repeat;
}

.corner-ring {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 2px;                      /* line thickness */
    background: linear-gradient(var(--corner-angle, 135deg), var(--accent-from), var(--accent-to));
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
}

.avatar-wrap:hover .corner-frame {
    --corner-len: 96px;
}

/* ── "Aura" frame: slowly rotating gradient ring ──────────────────────── */
@property --frame-angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
}

.frame-spin {
    background: conic-gradient(from var(--frame-angle), var(--accent-from), var(--accent-to), var(--accent-mid, var(--accent-from)), var(--accent-from));
    animation: frame-rotate 6s linear infinite;
}

@keyframes frame-rotate {
    to {
        --frame-angle: 360deg;
    }
}

@media (prefers-reduced-motion: reduce) {
    .frame-spin {
        animation: none;
    }
}

/* ── Clear view toggle ─────────────────────────────────────────────────── */
.clear-toggle {
    position: absolute;
    top: calc(100% + 2.75rem);         /* below the photo, never on top of it */
    left: 50%;
    transform: translateX(-50%);
    z-index: 30;
    display: inline-flex;
    width: max-content;
    white-space: nowrap;
    align-items: center;
    gap: 6px;
    padding: 6px 14px 6px 11px;
    font: 600 10px/1.7 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    border-radius: 9999px;
    border: 1px solid var(--accent-border);
    background: color-mix(in srgb, var(--surface-bg-3) 70%, transparent);
    color: var(--surface-text-sub);
    -webkit-backdrop-filter: blur(6px);
    backdrop-filter: blur(6px);
    cursor: pointer;
    outline: none;
    transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}

.clear-toggle:hover,
.clear-toggle:focus-visible {
    color: var(--surface-text);
    border-color: var(--accent-text);
}

.clear-toggle.on {
    background: var(--cta-gradient);
    border-color: transparent;
    color: #fff;
}

.badge-float {
    animation: bob 5s ease-in-out infinite;
}

@keyframes bob {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-8px);
    }
}

/* ── Flying robot (replaces the waving hand) ───────────────────────────── */
.hero-bot {
    display: inline-block;
    vertical-align: middle;
    margin-left: 0.6rem;
    width: 3.6rem;
}

@media (min-width: 640px) {
    .hero-bot {
        width: 4.4rem;
    }
}

@media (min-width: 1280px) {
    .hero-bot {
        width: 5.4rem;
    }
}

.hero-bot {
    cursor: pointer;
    outline: none;
    -webkit-tap-highlight-color: transparent;
}

.hero-bot:focus-visible {
    border-radius: 12px;
    box-shadow: 0 0 0 3px var(--accent-text);
}

.hero-bot.is-launch {
    animation: bot-launch 1.15s cubic-bezier(0.5, 0, 0.9, 0.4) forwards;
    pointer-events: none;
}

.hero-bot.is-gone {
    visibility: hidden;
    pointer-events: none;
}

.hero-bot.is-return {
    animation: bot-return 1.5s cubic-bezier(0.2, 0.7, 0.3, 1) both;
    pointer-events: none;
}

/* engine roars while flying */
.hero-bot.is-launch .bot-flame,
.hero-bot.is-return .bot-flame {
    transform: translateX(-50%) scaleY(2.4) scaleX(1.25);
    transform-origin: top center;
}

.bot-flame {
    transition: transform 0.25s ease;
}

@keyframes bot-launch {
    0% {
        transform: translateY(0) scale(1) rotate(0deg);
        opacity: 1;
    }

    18% {
        transform: translateY(10px) scale(0.94, 1.04) rotate(0deg);
        opacity: 1;
    }

    100% {
        transform: translateY(-115vh) scale(0.55) rotate(6deg);
        opacity: 0;
    }
}

@keyframes bot-return {
    0% {
        transform: translateY(-115vh) scale(0.55) rotate(-6deg);
        opacity: 0;
    }

    15% {
        opacity: 1;
    }

    75% {
        transform: translateY(8px) scale(1.04) rotate(0deg);
        opacity: 1;
    }

    100% {
        transform: translateY(0) scale(1) rotate(0deg);
        opacity: 1;
    }
}

@media (prefers-reduced-motion: reduce) {

    .hero-bot.is-launch,
    .hero-bot.is-return {
        animation: none;
    }
}

.bot-fly {
    position: relative;
    display: block;
    animation: bot-float 4s ease-in-out infinite;
}

.bot-img {
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
    height: auto;
    filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.5));
}

.bot-flame {
    position: absolute;
    z-index: 0;
    left: 50%;
    top: 90%;
    width: 24%;
    height: 46%;
    transform: translateX(-50%);
    pointer-events: none;
}

.bot-flame>span {
    position: absolute;
    display: block;
    transform-origin: top center;
}

.flame-glow {
    inset: 0;
    border-radius: 0 0 9999px 9999px;
    filter: blur(8px);
    opacity: 0.6;
    mix-blend-mode: screen;
}

.flame-mid {
    top: 0;
    bottom: 0;
    left: 16%;
    right: 16%;
    border-radius: 0 0 9999px 9999px;
    filter: blur(1px);
    mix-blend-mode: screen;
    -webkit-mask-image: linear-gradient(to bottom, #000 15%, rgba(0, 0, 0, 0.7) 50%, transparent 100%);
    mask-image: linear-gradient(to bottom, #000 15%, rgba(0, 0, 0, 0.7) 50%, transparent 100%);
    animation: bot-flicker 0.15s ease-in-out infinite;
}

.flame-core {
    top: 0;
    left: 50%;
    width: 33%;
    height: 75%;
    margin-left: -16.5%;
    border-radius: 0 0 9999px 9999px;
    background: linear-gradient(to bottom, #fff 30%, var(--accent-text, #ef4444) 90%, transparent 100%);
    box-shadow: 0 0 10px #fff, 0 4px 12px var(--accent-text, #ef4444);
    mix-blend-mode: screen;
    animation: bot-flicker 0.1s ease-in-out infinite alternate;
}

@keyframes bot-float {

    0%,
    100% {
        transform: translateY(0) rotate(0deg);
    }

    50% {
        transform: translateY(-10px) rotate(-1.5deg);
    }
}

@keyframes bot-flicker {

    0%,
    100% {
        transform: scaleX(1) scaleY(1);
        opacity: 0.85;
    }

    25% {
        transform: scaleX(1.15) scaleY(0.9) skewX(1deg);
        opacity: 0.95;
    }

    50% {
        transform: scaleX(0.9) scaleY(1.2);
        opacity: 0.8;
    }

    75% {
        transform: scaleX(1.05) scaleY(0.95) skewX(-1deg);
        opacity: 1;
    }
}

@media (prefers-reduced-motion: reduce) {

    .bot-fly,
    .flame-mid,
    .flame-core {
        animation: none;
    }
}

.cursor {
    display: inline-block;
    width: 3px;
    height: 1.25em;
    margin-left: 3px;
    vertical-align: middle;
    position: relative;
    top: -0.06em;
    border-radius: 2px;
    animation: blink 1s steps(1) infinite;
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}

/* ── CV download button: fill → ring % → tick ─────────────────────────── */
.dl-btn {
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-width: 200px;
    padding: 11px 24px;
    border-radius: 12px;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 10px 30px -10px var(--accent-shadow);
    transition: filter 0.2s ease, transform 0.2s ease, background 0.4s ease;
}

.dl-btn:hover:not(:disabled) {
    filter: brightness(1.12);
    transform: translateY(-1px);
}

.dl-btn:disabled {
    cursor: progress;
}

.cv-spinner {
    width: 18px;
    height: 18px;
    border-radius: 9999px;
    border: 2px solid var(--accent-border);
    border-top-color: var(--accent-mid);
    animation: cv-spin 0.8s linear infinite;
}

@keyframes cv-spin {
    to {
        transform: rotate(360deg);
    }
}

.dl-fill {
    position: absolute;
    inset: 0 auto 0 0;
    background: rgba(255, 255, 255, 0.22);
    transition: width 0.12s linear;
}

.dl-icon,
.dl-label {
    position: relative;
}

.dl-label b {
    display: inline-block;
    min-width: 2.6ch;
    font-variant-numeric: tabular-nums;
}

.dl-ring {
    width: 30px;
    height: 30px;
    transform: rotate(-90deg);
    overflow: visible;
}

.ring-bg,
.ring-fg {
    fill: none;
    stroke-width: 3;
}

.ring-bg {
    stroke: rgba(255, 255, 255, 0.28);
}

.ring-fg {
    stroke: #fff;
    stroke-linecap: round;
    stroke-dasharray: 81.68;
    transition: stroke-dashoffset 0.12s linear;
}

.tick {
    fill: none;
    stroke: #fff;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 26;
    stroke-dashoffset: 26;
    opacity: 0;
    transform: rotate(90deg);
    transform-origin: 16px 16px;
}

.dl-btn.is-done .ring-fg {
    fill: rgba(255, 255, 255, 0.22);
    animation: ring-pop 0.5s ease-out;
    transform-origin: center;
}

.dl-btn.is-done .tick {
    opacity: 1;
    animation: tick-draw 0.45s 0.15s ease-out forwards;
}

@keyframes tick-draw {
    to {
        stroke-dashoffset: 0;
    }
}

@keyframes ring-pop {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.18);
    }

    100% {
        transform: scale(1);
    }
}

/* ── Status badge ─────────────────────────────────────────────────────── */
.status-badge {
    transition: border-color 0.25s ease, box-shadow 0.25s ease, opacity 0.35s ease, visibility 0.35s;
}

/* Hidden via the toggle: the badge fades out so the whole photo is visible */
.status-badge.is-hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
}

.status-badge:hover {
    border-color: var(--accent-text);
    box-shadow: 0 20px 40px -12px var(--accent-shadow);
}

.status-enter-active,
.status-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.status-enter-from {
    opacity: 0;
    transform: translateY(8px);
}

.status-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}

.status-pip {
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 9999px;
    background: var(--accent-border);
    transition: width 0.3s ease, background 0.3s ease;
}

.status-pip.on {
    width: 18px;
    background: var(--accent-mid);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* ── Compare slider ───────────────────────────────────────────────────── */
.compare {
    cursor: ew-resize;
    touch-action: pan-y;
    -webkit-user-select: none;
    user-select: none;
}

.bw-img {
    filter: grayscale(1) contrast(1.08) brightness(0.95);
}

/* ── Cyber filter (on hover) ──────────────────────────────────────────── */
.compare {
    --cy1: var(--accent-from);
    --cy2: var(--accent-to);
    --cy3: var(--accent-mid, var(--accent-from));
    --cy-light: color-mix(in srgb, var(--cy1) 45%, white);
    --spot: 95px;
    --mx: 50%;
    --my: 40%;
}

.cyber-hud,
.cyber-tint,
.cyber-fx,
.face-box {
    opacity: 0;
    transition: opacity 0.45s ease;
}

.is-cyber .cyber-fx {
    opacity: 1;
}

.is-cyber .face-box.on {
    opacity: 1;
}

.is-cyber .cyber-tint {
    opacity: 0.88;
}

/* Photo transparency = mask → effect only on the person */
.cyber-tint,
.cyber-fx {
    /* spotlight around the pointer  ∩  the person's silhouette */
    -webkit-mask-image: radial-gradient(circle var(--spot) at var(--mx) var(--my), #000 25%, transparent 100%), var(--photo);
    mask-image: radial-gradient(circle var(--spot) at var(--mx) var(--my), #000 25%, transparent 100%), var(--photo);
    -webkit-mask-size: 100% 100%, cover;
    mask-size: 100% 100%, cover;
    -webkit-mask-position: 0 0, top;
    mask-position: 0 0, top;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-composite: source-in;
    mask-composite: intersect;
}

/* neon duotone: recolors the person, keeps the light/dark of the photo */
.cyber-tint {
    background: linear-gradient(160deg, var(--cy1) 0%, var(--cy2) 55%, var(--cy3) 100%);
    mix-blend-mode: color;
}

.color-img,
.bw-img {
    transition: filter 0.45s ease;
}

.cyber-mesh {
    position: absolute;
    inset: 0;
    opacity: 0.5;
    background-image:
        repeating-linear-gradient(0deg, color-mix(in srgb, var(--cy-light) 75%, transparent) 0 1px, transparent 1px 20px),
        repeating-linear-gradient(60deg, color-mix(in srgb, var(--cy-light) 75%, transparent) 0 1px, transparent 1px 23px),
        repeating-linear-gradient(120deg, color-mix(in srgb, var(--cy-light) 75%, transparent) 0 1px, transparent 1px 23px);
}

.cyber-lines {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(to bottom, transparent 0 2px, color-mix(in srgb, var(--cy2) 30%, transparent) 2px 3px);
}

.cyber-beam {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 20%;
    background: linear-gradient(to bottom, transparent, color-mix(in srgb, var(--cy-light) 70%, transparent), transparent);
    transform: translateY(-100%);
}

.is-cyber .cyber-beam {
    animation: cyber-beam 2.6s linear infinite;
}

@keyframes cyber-beam {
    from {
        transform: translateY(-100%);
    }

    to {
        transform: translateY(500%);
    }
}

/* HUD arcs behind the person */
.hud-arcs circle {
    fill: none;
    stroke: var(--cy1);
    stroke-linecap: round;
    transform-box: fill-box;
    transform-origin: center;
}

.is-cyber .arc-a {
    animation: cyber-spin 18s linear infinite;
}

.is-cyber .arc-b {
    animation: cyber-spin 26s linear infinite reverse;
}

@keyframes cyber-spin {
    to {
        transform: rotate(360deg);
    }
}

/* Face scan: brackets lock on + wireframe */
.face-box {
    transform: scale(1.1);
    transition: opacity 0.45s ease, transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
    z-index: 12;
}

.is-cyber .face-box.on {
    transform: scale(1);
}

.face-mesh {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    -webkit-mask-image: radial-gradient(ellipse at center, #000 55%, transparent 100%);
    mask-image: radial-gradient(ellipse at center, #000 55%, transparent 100%);
    filter: drop-shadow(0 0 4px var(--cy1));
}

.mesh-lines {
    fill: none;
    stroke: var(--cy-light);
    stroke-width: 0.8;
    vector-effect: non-scaling-stroke;
}

.mesh-dots {
    fill: none;
    stroke: var(--cy-light);
    stroke-width: 3;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
}

.is-cyber .mesh-lines {
    animation: mesh-flicker 2.2s ease-in-out infinite;
}

@keyframes mesh-flicker {

    0%,
    100% {
        opacity: 0.55;
    }

    50% {
        opacity: 1;
    }
}

.fc {
    position: absolute;
    width: 22px;
    height: 22px;
    border: 0 solid var(--cy1);
    filter: drop-shadow(0 0 5px var(--cy1));
}

.fc-tl {
    top: -6px;
    left: -6px;
    border-top-width: 2px;
    border-left-width: 2px;
    border-top-left-radius: 4px;
}

.fc-tr {
    top: -6px;
    right: -6px;
    border-top-width: 2px;
    border-right-width: 2px;
    border-top-right-radius: 4px;
}

.fc-bl {
    bottom: -6px;
    left: -6px;
    border-bottom-width: 2px;
    border-left-width: 2px;
    border-bottom-left-radius: 4px;
}

.fc-br {
    bottom: -6px;
    right: -6px;
    border-bottom-width: 2px;
    border-right-width: 2px;
    border-bottom-right-radius: 4px;
}

.scan-label {
    position: absolute;
    left: 50%;
    bottom: -24px;
    transform: translateX(-50%);
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font: 600 9px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.22em;
    color: var(--cy1);
    text-shadow: 0 0 8px var(--cy1);
}

.scan-label::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 9999px;
    background: var(--cy1);
    box-shadow: 0 0 8px var(--cy1);
}

.is-cyber .scan-label::before {
    animation: cyber-blink 0.9s steps(2) infinite;
}

@keyframes cyber-blink {
    50% {
        opacity: 0.15;
    }
}

@media (prefers-reduced-motion: reduce) {

    .is-cyber .cyber-beam,
    .is-cyber .arc-a,
    .is-cyber .arc-b,
    .is-cyber .mesh-lines,
    .is-cyber .scan-label::before {
        animation: none;
    }
}

.compare-chip {
    position: absolute;
    top: clamp(22px, 7%, 32px);
    z-index: 40;
    padding: 2px 10px;
    font: 600 10px/1.7 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    border-radius: 9999px;
    border: 1px solid var(--accent-border);
    background: color-mix(in srgb, var(--surface-bg-3) 70%, transparent);
    color: var(--surface-text-sub);
    -webkit-backdrop-filter: blur(6px);
    backdrop-filter: blur(6px);
    pointer-events: none;
    transition: opacity 0.3s ease;
}

.compare-chip-left {
    left: clamp(18px, 7%, 28px);
}

.compare-chip-right {
    right: clamp(18px, 7%, 28px);
}

.compare-bar {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 0;
    z-index: 20;
    pointer-events: none;
}

.compare-line {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -1px;
    width: 2px;
    background: linear-gradient(to bottom, transparent, var(--accent-from) 20%, var(--accent-to) 80%, transparent);
    box-shadow: 0 0 14px var(--accent-shadow);
}

.compare-handle {
    position: absolute;
    top: 50%;
    left: 0;
    width: 44px;
    height: 44px;
    margin: -22px 0 0 -22px;
    display: grid;
    place-items: center;
    border-radius: 9999px;
    color: #fff;
    background: var(--cta-gradient);
    border: 2px solid rgba(255, 255, 255, 0.35);
    box-shadow: 0 8px 24px -6px var(--accent-shadow), 0 0 0 4px color-mix(in srgb, var(--surface-bg-3) 40%, transparent);
    cursor: ew-resize;
    pointer-events: auto;
    outline: none;
    transition: transform 0.2s ease;
}

.compare-handle:hover,
.compare-handle:focus-visible {
    transform: scale(1.1);
}

.compare-handle:focus-visible {
    box-shadow: 0 0 0 3px var(--accent-text);
}

/* Pulsing ring until the first interaction */
.compare-handle.hint::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 9999px;
    border: 2px solid var(--accent-from);
    animation: handle-ping 1.8s ease-out infinite;
}

@keyframes handle-ping {
    from {
        transform: scale(1);
        opacity: 0.8;
    }

    to {
        transform: scale(1.7);
        opacity: 0;
    }
}

@media (prefers-reduced-motion: reduce) {
    .compare-handle.hint::after {
        animation: none;
    }
}

</style>
