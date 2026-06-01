<template>
    <section class="relative py-20 bg-[var(--surface-bg)]" id="read-more-book">

        <!-- ── Breadcrumb ── -->
        <div class="relative z-10 max-w-5xl mx-auto px-6">
            <nav class="flex mb-8" aria-label="Breadcrumb" data-aos="fade-down">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                    <li class="inline-flex items-center">
                        <router-link to="/"
                            class="group inline-flex items-center text-sm font-medium text-gray-400 transition-all duration-300">
                            <div class="mr-2">
                                <HomeIcon class="breadcrumb-home-icon w-4 h-4" />
                            </div>
                            <span class="breadcrumb-home-text">{{ t('home') }}</span>
                        </router-link>
                    </li>
                    <li>
                        <div class="flex items-center">
                            <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                            <span
                                class="ml-1 md:ml-2 inline-block py-1 text-sm font-semibold leading-loose text-transparent bg-clip-text"
                                :style="{ backgroundImage: 'var(--logo-gradient)' }">
                                {{ t('Read More') }}
                            </span>
                        </div>
                    </li>
                </ol>
            </nav>
        </div>

        <div class="items-center justify-center min-h-screen flex flex-col overflow-hidden">
            <!-- ── Heading ── -->
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold mb-4" style="color: var(--surface-text);">
                    <span class="text-transparent bg-clip-text" :style="{ backgroundImage: 'var(--logo-gradient)' }">
                        {{ t('read') }}
                    </span>{{ t('more') }}
                </h2>
                <p class="text-lg max-w-2xl mx-auto" style="color: var(--surface-text-sub);" data-aos="fade-up"
                    data-aos-delay="100">
                    A digital notebook tracking my journey from the first line of code to modern web development.
                </p>
            </div>

            <div class="absolute w-96 h-96 rounded-full bg-[var(--accent-border-2-soft)] blur-3xl opacity-20 top-10 left-10 pointer-events-none"></div>
            <div class="absolute w-96 h-96 rounded-full bg-[var(--accent-bg)] blur-3xl opacity-20 bottom-10 right-10 pointer-events-none"></div>

            <!-- Book -->
            <div class="relative w-full max-w-5xl px-4 flex flex-col items-center perspective-container">

                <!--
                    Desktop: grid-cols-2 (two-page spread)
                    Mobile:  grid-cols-1 (single page)
                    On mobile currentPage drives which single page shows.
                    On desktop currentSpread drives which pair shows.
                -->
                <div class="relative w-full bg-[#f0e6d2] rounded-2xl shadow-[0_35px_75px_rgba(0,0,0,0.3)] border border-[#decfa6] overflow-hidden transform-style-3d
                            grid grid-cols-1 md:grid-cols-2
                            aspect-[9/13] md:aspect-[16/10]
                            min-h-[480px] md:min-h-[500px]
                            max-h-[640px] md:max-h-[600px]">

                    <!-- Spine (desktop only) -->
                    <div class="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 bg-gradient-to-r from-black/[0.12] via-transparent to-black/[0.12] z-30 pointer-events-none"></div>
                    <div class="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-black/[0.2] z-30 pointer-events-none"></div>

                    <!-- ── LEFT PAGE (desktop) / ODD PAGE (mobile) ── -->
                    <!-- On mobile: hide this panel when currentPage is even -->
                    <div
                        class="h-full p-8 md:p-12 flex flex-col justify-between border-r border-[#eddcc4] relative bg-gradient-to-l from-[#faf5eb] to-[#fcf9f2] overflow-hidden select-none"
                        :class="{ 'hidden md:flex': isMobileEvenPage }">

                        <transition :name="flipDirection === 'next' ? 'turn-page-left' : 'turn-page-right'" mode="out-in">
                            <div :key="currentSpread" class="flex-1 flex flex-col justify-between h-full overflow-hidden">

                                <!-- Spread 1 left -->
                                <div v-if="currentSpread === 1" class="flex-1 overflow-y-auto pr-1 book-scrollbar">
                                    <span class="text-xs uppercase tracking-widest font-mono text-amber-700/60 block mb-2">Chapter I // My Start</span>
                                    <h2 class="text-2xl md:text-3xl font-serif font-bold text-neutral-800 mb-4 leading-tight">Learning to Build</h2>
                                    <div class="prose prose-neutral text-sm md:text-base text-neutral-600 space-y-4 font-serif leading-relaxed">
                                        <p>Welcome to my little corner of the internet. I've been coding for about two years now, and this digital notebook is a place for me to show what I've been working on and learning along the way.</p>
                                        <p>For me, coding isn't just about making things work—it's about trying to make them clean and easy for normal people to use. I still have a whole lot to learn, but I enjoy the challenge of taking a messy problem and figuring out a neat way to solve it.</p>
                                        <p class="italic text-neutral-500 border-l-2 border-amber-600/30 pl-4 py-1 bg-amber-50/40">"Every mistake is just another step toward figuring things out."</p>
                                    </div>
                                </div>

                                <!-- Spread 2 left -->
                                <div v-else-if="currentSpread === 2" class="flex-1 overflow-y-auto pr-1 book-scrollbar">
                                    <span class="text-xs uppercase tracking-widest font-mono text-amber-700/60 block mb-2">Chapter II // My Focus</span>
                                    <h2 class="text-2xl md:text-3xl font-serif font-bold text-neutral-800 mb-4 leading-tight">Keeping It Simple</h2>
                                    <div class="prose prose-neutral text-sm md:text-base text-neutral-600 space-y-4 font-serif leading-relaxed">
                                        <p>When I first started out, I just wanted to get things onto the screen. But over the last two years, I've realized how important it is to think about the person on the other side of the app.</p>
                                        <p>I try my best to focus on smooth transitions and making sure buttons and menus respond exactly how you'd expect. My goal is to write tidy components so that when someone else opens my code, it makes sense to them without a headache.</p>
                                    </div>
                                </div>

                                <!-- Spread 3 left -->
                                <div v-else-if="currentSpread === 3" class="flex-1 overflow-y-auto pr-1 book-scrollbar">
                                    <span class="text-xs uppercase tracking-widest font-mono text-amber-700/60 block mb-2">Chapter III // My Tools</span>
                                    <h2 class="text-2xl md:text-3xl font-serif font-bold text-neutral-800 mb-4 leading-tight">Learning with AI</h2>
                                    <div class="prose prose-neutral text-sm md:text-base text-neutral-600 space-y-4 font-serif leading-relaxed">
                                        <p>As a junior developer, I use every helpful resource I can find. Tools like Claude and Gemini have been incredible mentors for me when I get stuck on tricky bugs or want to see a better way to format my logic.</p>
                                        <p>I don't use them to write code for me blindly. Instead, I like to treat them as study partners—asking them why something works or using them to double-check my work so I can learn the right habits early on.</p>
                                    </div>
                                </div>

                                <!-- Spread 4 left -->
                                <div v-else-if="currentSpread === 4" class="flex-1 overflow-y-auto pr-1 book-scrollbar">
                                    <span class="text-xs uppercase tracking-widest font-mono text-amber-700/60 block mb-2">Chapter IV // Inspiration</span>
                                    <h2 class="text-2xl md:text-3xl font-serif font-bold text-neutral-800 mb-4 leading-tight">Standing on Tall Shoulders</h2>
                                    <div class="prose prose-neutral text-sm md:text-base text-neutral-600 space-y-4 font-serif leading-relaxed">
                                        <p>Nobody learns how to code in a vacuum. I am incredibly grateful for the developers who share their knowledge online so people like me can grow.</p>
                                        <p>I want to give a huge, honest thank you to <strong class="text-neutral-800 underline decoration-amber-600/50">OauliCode</strong>. Their amazing tutorials gave me the baseline layout and structure for this exact book design.</p>
                                        <p>Once I understood their tutorial, I took the code and played around with it—adding my own style tweaks, breaking things, fixing them, and customizing the project to fit my own personality.</p>
                                    </div>
                                </div>

                                <div class="pt-4 mt-2 border-t border-neutral-200/60 flex justify-between text-[10px] font-mono text-neutral-400 shrink-0">
                                    <span>LEARNING LOG</span>
                                    <span>PAGE {{ leftPageNumber }}</span>
                                </div>
                            </div>
                        </transition>
                    </div>

                    <!-- ── RIGHT PAGE (desktop) / EVEN PAGE (mobile) ── -->
                    <!-- On mobile: hide this panel when currentPage is odd -->
                    <div
                        class="h-full p-8 md:p-12 flex flex-col justify-between relative bg-gradient-to-r from-[#faf5eb] to-[#fcf9f2] overflow-hidden select-none"
                        :class="{ 'hidden md:flex': isMobileOddPage }">

                        <transition :name="flipDirection === 'next' ? 'turn-page-right' : 'turn-page-left'" mode="out-in">
                            <div :key="currentSpread" class="flex-1 flex flex-col justify-between h-full overflow-hidden">

                                <!-- Spread 1 right -->
                                <div v-if="currentSpread === 1" class="flex-1 flex flex-col overflow-hidden">
                                    <h3 class="text-xs font-serif font-bold tracking-wide uppercase text-neutral-400 mb-3">Things I Practice With</h3>
                                    <div class="grid grid-cols-2 gap-2 overflow-y-auto pr-1 book-scrollbar flex-1 mb-3">
                                        <div v-for="tech in stack" :key="tech.name"
                                            class="p-2 bg-neutral-100/60 border border-neutral-200/50 rounded-xl flex items-center gap-2.5 transition-all hover:bg-white hover:shadow-sm">
                                            <div class="w-6 h-6 flex items-center justify-center bg-white/80 rounded-lg p-1 border border-neutral-200/40 shrink-0">
                                                <img :src="getIconUrl(tech.icon)" :alt="tech.name" class="w-full h-full object-contain filter grayscale-[20%]" />
                                            </div>
                                            <div class="flex flex-col min-w-0">
                                                <span class="text-neutral-800 font-semibold text-[11px] font-mono truncate">{{ tech.name }}</span>
                                                <span class="text-[8px] text-neutral-400 uppercase tracking-wider font-mono mt-0.5 truncate">{{ tech.type }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p class="text-[11px] text-neutral-400 font-serif italic border-t border-neutral-100 pt-2 shrink-0">
                                        These are the languages and tools I use on a weekly basis to build out my ideas.
                                    </p>
                                </div>

                                <!-- Spread 2 right -->
                                <div v-else-if="currentSpread === 2" class="flex-1 overflow-y-auto pr-1 book-scrollbar flex flex-col justify-between">
                                    <div>
                                        <h3 class="text-xs font-serif font-bold tracking-wide uppercase text-neutral-400 mb-2">Why I Choose This Stack</h3>
                                        <div class="space-y-3 font-serif text-neutral-600 text-xs md:text-sm leading-relaxed">
                                            <p><strong>Vue 3:</strong> Learning the Composition API has completely changed how I think about organizing logic. It feels clear and forces me to write cleaner code.</p>
                                            <p><strong>Vite & Tailwind:</strong> Vite keeps things fast so I don't waste time waiting for builds, and Tailwind helps me play around with layouts and responsive UI without getting lost in massive CSS files.</p>
                                        </div>
                                    </div>
                                    <div class="mt-4 p-3 bg-neutral-100/50 border border-neutral-200/40 rounded-xl">
                                        <span class="text-[9px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">My Daily Goal</span>
                                        <div class="w-full bg-neutral-200 h-1 rounded-full overflow-hidden">
                                            <div class="bg-amber-700/60 h-full w-[100%]"></div>
                                        </div>
                                        <div class="flex justify-between items-center text-[9px] font-mono text-neutral-500 mt-1">
                                            <span>Commitment to Learning</span>
                                            <span class="font-bold">Every Day</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Spread 3 right -->
                                <div v-else-if="currentSpread === 3" class="flex-1 overflow-y-auto pr-1 book-scrollbar flex flex-col justify-between">
                                    <div>
                                        <h3 class="text-xs font-serif font-bold tracking-wide uppercase text-neutral-400 mb-2">Good Habits I'm Building</h3>
                                        <p class="text-xs md:text-sm text-neutral-600 font-serif mb-3 leading-relaxed">Beyond just writing syntax, I am trying to build reliable development habits that will help me work effectively as a supportive team member.</p>
                                        <div class="p-3 bg-neutral-100/60 border border-neutral-200/50 rounded-xl space-y-2 font-mono text-[11px] text-neutral-700">
                                            <div class="flex items-center gap-2">
                                                <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                                <span><strong>Git:</strong> Writing descriptive commit logs</span>
                                            </div>
                                            <div class="flex items-center gap-2">
                                                <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                                <span><strong>Vercel:</strong> Learning how to deploy safely</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p class="font-serif text-xs text-neutral-400 italic mt-4">Checking for bugs locally before pushing to GitHub has saved me quite a few times!</p>
                                </div>

                                <!-- Spread 4 right -->
                                <div v-else-if="currentSpread === 4" class="flex-1 overflow-y-auto pr-1 book-scrollbar flex flex-col justify-between">
                                    <div>
                                        <h3 class="text-xs font-serif font-bold tracking-wide uppercase text-neutral-400 mb-2">Looking Forward</h3>
                                        <p class="text-xs md:text-sm text-neutral-600 font-serif mb-3 leading-relaxed">If you want to look at the foundational materials that got me excited to try out this specific interactive layout, you can find them here:</p>
                                        <div class="p-3 bg-amber-50/60 border border-amber-200/40 rounded-xl mb-4">
                                            <span class="text-[10px] font-mono text-amber-800 uppercase block mb-0.5">OauliCode Channel</span>
                                            <a href="https://www.youtube.com/@OauliCode" target="_blank"
                                                class="text-xs font-mono text-amber-700 underline break-all hover:text-amber-900 block transition-colors">
                                                https://www.youtube.com/@OauliCode
                                            </a>
                                        </div>
                                        <p class="font-serif text-xs md:text-sm text-neutral-600 italic leading-relaxed border-l-2 border-neutral-300 pl-3">
                                            "I know I still have a long way to go, but I'm excited to keep learning from everyone I cross paths with."
                                        </p>
                                    </div>
                                    <p class="font-serif text-xs text-neutral-500 mt-4">Thanks for taking the time to read through my notebook. Back to writing more code!</p>
                                </div>

                                <div class="pt-4 mt-2 border-t border-neutral-200/60 flex justify-between text-[10px] font-mono text-neutral-400 items-center shrink-0">
                                    <span>PAGE {{ rightPageNumber }}</span>
                                    <div class="flex gap-1.5 z-40 relative">
                                        <button @click="prevPage"
                                            :disabled="currentPage === 1"
                                            class="p-1 rounded-md border border-neutral-300 bg-white/80 hover:bg-neutral-200 disabled:opacity-25 transition-all cursor-pointer shadow-sm active:scale-95"
                                            aria-label="Previous Page">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-3.5 h-3.5 text-neutral-700">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                            </svg>
                                        </button>
                                        <button @click="nextPage"
                                            :disabled="currentPage === totalPages"
                                            class="p-1 rounded-md border border-neutral-300 bg-white/80 hover:bg-neutral-200 disabled:opacity-25 transition-all cursor-pointer shadow-sm active:scale-95"
                                            aria-label="Next Page">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-3.5 h-3.5 text-neutral-700">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </transition>
                    </div>

                </div>

                <!-- Book spine layers -->
                <div class="w-[99.3%] h-1.5 bg-[#ebdcbfa1] border border-[#d6c79d] rounded-b-xl shadow-md opacity-95 -mt-[1px] z-10 pointer-events-none"></div>
                <div class="w-[98.6%] h-1.5 bg-[#e4d2a9a1] border border-[#cbba8d] rounded-b-xl shadow-sm opacity-70 -mt-[1px] z-0 pointer-events-none"></div>

                <!-- ── Pagination: 8 dots, one per page ── -->
                <div class="mt-8 flex flex-col items-center gap-2 w-full px-4">
                    <span class="text-[10px] font-mono text-neutral-400 uppercase tracking-widest select-none">
                        Page {{ currentPage }} / {{ totalPages }}
                    </span>
                    <div class="flex items-center justify-center gap-1 flex-wrap">
                        <button
                            v-for="p in totalPages"
                            :key="p"
                            @click="jumpToPage(p)"
                            class="relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-600"
                            :aria-label="'Go to page ' + p"
                            :aria-current="currentPage === p ? 'true' : undefined">
                            <span
                                class="block rounded-full transition-all duration-300"
                                :class="currentPage === p
                                    ? 'w-4 h-4 bg-amber-600 shadow-[0_0_8px_rgba(180,120,40,0.45)]'
                                    : 'w-2.5 h-2.5 bg-neutral-300 hover:bg-neutral-400'">
                            </span>
                        </button>
                    </div>
                </div>

            </div>

            <div class="text-center mt-16" data-aos="fade-up" data-aos-delay="400">
                <div class="inline-flex flex-col sm:flex-row gap-4 items-center">
                    <router-link :to="backPath"
                        class="px-8 py-4 rounded-xl text-white text-sm tracking-widest font-black transition-all duration-300 hover:scale-[1.03] border-2 border-white/10 flex items-center backdrop-blur-md shadow-lg"
                        :style="{ background: 'var(--cta-gradient)' }"
                        @mouseenter="e => e.currentTarget.style.boxShadow = '0 12px 35px var(--accent-shadow)'"
                        @mouseleave="e => e.currentTarget.style.boxShadow = 'none'">
                        <ArrowLeftCircleIcon class="w-5 h-5 mr-2" />
                        {{ t('click_to_return') }}
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { t } from './../../stores/languages.js';
import { useRouter } from 'vue-router';

import {
    ArrowLeftIcon, CodeBracketIcon, CommandLineIcon, PaintBrushIcon,
    DocumentTextIcon, CpuChipIcon, EnvelopeIcon, VideoCameraIcon,
    DevicePhoneMobileIcon, WindowIcon, CloudArrowUpIcon, PhotoIcon,
    ChatBubbleBottomCenterTextIcon, MagnifyingGlassCircleIcon,
    ServerIcon, LanguageIcon, HomeIcon, ArrowLeftCircleIcon
} from '@heroicons/vue/24/outline';

// ── State ──────────────────────────────────────────────────────────────────
const totalPages   = 8;          // 4 spreads × 2 pages each
const totalSpreads = 4;

// currentPage is the single source of truth (1–8)
const currentPage  = ref(1);
const flipDirection = ref('next');

// ── Derived ────────────────────────────────────────────────────────────────
// Which spread to show (1–4)
const currentSpread = computed(() => Math.ceil(currentPage.value / 2));

// Page numbers printed in the footer
const leftPageNumber  = computed(() => (currentSpread.value * 2) - 1);
const rightPageNumber = computed(() => currentSpread.value * 2);

// Mobile visibility helpers
// On mobile we show one panel at a time based on whether currentPage is odd or even
const isMobileEvenPage = computed(() => currentPage.value % 2 === 0); // hide left panel
const isMobileOddPage  = computed(() => currentPage.value % 2 !== 0); // hide right panel

// ── Navigation ─────────────────────────────────────────────────────────────
const nextPage = () => {
    if (currentPage.value < totalPages) {
        flipDirection.value = 'next';
        currentPage.value++;
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        flipDirection.value = 'prev';
        currentPage.value--;
    }
};

const jumpToPage = (p) => {
    flipDirection.value = p > currentPage.value ? 'next' : 'prev';
    currentPage.value = p;
};

// ── Data ───────────────────────────────────────────────────────────────────
const stack = [
    { name: "Vue.js",      type: "Framework",       icon: "vuejs.svg" },
    { name: "Vite.js",     type: "Build Tool",       icon: "vitejs.svg" },
    { name: "JavaScript",  type: "Language",         icon: "javascript.svg" },
    { name: "JSON",        type: "Data System",      icon: "json.svg" },
    { name: "HTML",        type: "Structure",        icon: "html.svg" },
    { name: "CSS",         type: "Style",            icon: "css.svg" },
    { name: "Git",         type: "Version Control",  icon: "git.svg" },
    { name: "GitHub",      type: "Platform",         icon: "github.svg" },
    { name: "Claude",      type: "AI Tool",          icon: "claude.svg" },
    { name: "Gemini",      type: "AI Tool",          icon: "gemini.svg" },
    { name: "Vercel",      type: "Deployment",       icon: "vercel.svg" },
    { name: "VS Code",     type: "Editor",           icon: "vscode.svg" }
];

const getIconUrl = (iconName) => {
    return new URL(`../../assets/techstack/${iconName}`, import.meta.url).href;
};
</script>

<style scoped>
.perspective-container {
    perspective: 1600px;
}

.transform-style-3d {
    transform-style: preserve-3d;
}

/* Page flip transitions */
.turn-page-left-enter-active,
.turn-page-left-leave-active,
.turn-page-right-enter-active,
.turn-page-right-leave-active {
    transition: opacity 0.45s ease-in-out, transform 0.45s ease-in-out, filter 0.45s ease;
}

.turn-page-left-enter-from {
    opacity: 0;
    transform: rotateY(35deg) scale(0.98);
    filter: brightness(0.8);
}
.turn-page-left-leave-to {
    opacity: 0;
    transform: rotateY(-35deg) scale(0.98);
    filter: brightness(0.7);
}
.turn-page-right-enter-from {
    opacity: 0;
    transform: rotateY(-35deg) scale(0.98);
    filter: brightness(0.8);
}
.turn-page-right-leave-to {
    opacity: 0;
    transform: rotateY(35deg) scale(0.98);
    filter: brightness(0.7);
}

/* Ultra-thin, barely-visible scrollbar */
.book-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(180, 160, 120, 0.18) transparent;
}
.book-scrollbar::-webkit-scrollbar {
    width: 2px;
}
.book-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.book-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(180, 160, 120, 0.18);
    border-radius: 9px;
}
.book-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(140, 120, 90, 0.32);
}

/* Dotted background */
#read-more-book {
    background-image: radial-gradient(var(--section-border, #decfa6) 0.8px, transparent 0.8px);
    background-size: 24px 24px;
}

/* Breadcrumb hover — text */
.group:hover .breadcrumb-home-text {
    background: var(--logo-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 600;
}

/* Breadcrumb hover — icon */
.group:hover .breadcrumb-home-icon {
    background: var(--logo-gradient);
    -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>') no-repeat center;
    mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>') no-repeat center;
    -webkit-mask-size: contain;
    mask-size: contain;
    color: transparent;
}
</style>