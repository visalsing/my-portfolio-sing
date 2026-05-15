<template>
    <div class="min-h-screen text-white" :style="{ backgroundColor: 'var(--surface-bg-3)' }">
        <section class="relative py-20 overflow-hidden" id="settings">

            <!-- Background glow -->
            <div class="pointer-events-none absolute inset-0 opacity-10"
                :style="{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, var(--accent-mid), transparent)' }">
            </div>

            <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <!-- ── Breadcrumb ── -->
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
                                <svg class="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="ml-1 text-sm font-semibold md:ml-2 text-transparent bg-clip-text"
                                    :style="{ backgroundImage: 'var(--logo-gradient)' }">
                                    {{ t('settings') }}
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <!-- ── Heading ── -->
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-5xl font-bold mb-4" :style="{ color: 'var(--surface-text)' }">
                        <span class="bg-clip-text text-transparent"
                            :style="{ backgroundImage: 'var(--logo-gradient)' }">
                            {{ t('settings') }}
                        </span>
                    </h2>
                    <p class="text-lg" :style="{ color: 'var(--accent-text-muted)' }">
                        {{ t('customize') }}
                    </p>
                </div>

                <div class="space-y-8">

                    <!-- ── 1. Portfolio Themes ── -->
                    <div class="rounded-3xl p-8 accent-card">
                        <div class="flex items-center gap-4 mb-6">
                            <div class="p-3 rounded-2xl icon-box-1">
                                <SunIcon class="w-6 h-6" />
                            </div>
                            <h3 class="text-2xl font-semibold" :style="{ color: 'var(--surface-text)' }">
                                {{ t('portfolio_themes') }}
                            </h3>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <button v-for="theme in themes" :key="theme.name"
                                class="flex items-center justify-center gap-3 p-4 rounded-xl border transition-all duration-300 group"
                                :style="currentTheme === theme.name
                                    ? { borderColor: 'var(--accent-text)', backgroundColor: 'var(--accent-bg)' }
                                    : { borderColor: 'rgba(75,85,99,1)', }" @click="setThemeMode(theme.name)">
                                <div class="relative flex items-center justify-center gap-3 w-full">
                                    <component :is="theme.icon" class="w-5 h-5 transition-colors"
                                        :style="{ color: currentTheme === theme.name ? 'var(--accent-text)' : 'var(--surface-text-sub)' }" />
                                    <span class="transition-colors"
                                        :style="{ color: currentTheme === theme.name ? 'var(--surface-text)' : 'var(--surface-text-sub)' }">
                                        {{ theme.label }}
                                    </span>
                                    <!-- Active checkmark -->
                                    <div v-if="currentTheme === theme.name"
                                        class="absolute -top-5 -right-5 w-4 h-4 rounded-full flex items-center justify-center text-white"
                                        :style="{ backgroundColor: 'var(--accent-text)' }">
                                        <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="3"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    <!-- ── 2. Accent Colors ── -->
                    <div class="rounded-3xl p-8 accent-card">
                        <div class="flex items-center gap-4 mb-6">
                            <div class="p-3 rounded-2xl icon-box-2">
                                <SwatchIcon class="w-6 h-6" />
                            </div>
                            <h3 class="text-2xl font-semibold" :style="{ color: 'var(--surface-text)' }">
                                {{ t('accent_colors') }}
                            </h3>
                        </div>

                        <!-- <div class="flex flex-wrap gap-4">
                            <button
                                v-for="color in colorSchemes"
                                :key="color.name"
                                class="flex-1 min-w-[140px] group relative p-4 rounded-xl border transition-all duration-300 overflow-hidden"
                                :style="currentScheme === color.name
                                    ? { borderColor: color.from, backgroundColor: `${color.from}18` }
                                    : { borderColor: 'rgba(75,85,99,1)' }"
                                @click="setColorScheme(color.name)"
                            >
                                <div class="relative flex flex-col items-center gap-2">
                                    <div class="flex -space-x-2">
                                        <div class="w-7 h-7 rounded-full border-2 shadow-md transition-transform group-hover:scale-110"
                                            :style="{ backgroundColor: color.from, borderColor: 'var(--surface-bg-3)' }"></div>
                                        <div class="w-7 h-7 rounded-full border-2 shadow-md transition-transform group-hover:scale-110"
                                            :style="{ backgroundColor: color.to, borderColor: 'var(--surface-bg-3)' }"></div>
                                    </div>
                                    <span class="text-sm font-medium transition-colors"
                                        :style="currentScheme === color.name ? { color: color.from } : { color: 'var(--surface-text-sub)' }">
                                        {{ color.name }}
                                    </span>
                                    -- Active checkmark --
                                    <div v-if="currentScheme === color.name"
                                        class="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white"
                                        :style="{ backgroundColor: color.from }">
                                        <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                            </button>
                        </div> -->

                        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            <button v-for="color in colorSchemes" :key="color.name"
                                class="group relative p-4 rounded-xl border transition-all duration-300 overflow-hidden"
                                :style="currentScheme === color.name
                                    ? { borderColor: color.from, backgroundColor: `${color.from}18` }
                                    : { borderColor: 'rgba(75,85,99,1)', }" @click="setColorScheme(color.name)">
                                <div class="relative flex flex-col items-center gap-2">
                                    <div class="flex -space-x-2">
                                        <div class="w-7 h-7 rounded-full border-2 shadow-md transition-transform group-hover:scale-110"
                                            :style="{ backgroundColor: color.from, borderColor: 'var(--surface-bg-3)' }">
                                        </div>
                                        <div class="w-7 h-7 rounded-full border-2 shadow-md transition-transform group-hover:scale-110"
                                            :style="{ backgroundColor: color.to, borderColor: 'var(--surface-bg-3)' }">
                                        </div>
                                    </div>
                                    <span class="text-sm font-medium transition-colors"
                                        :style="currentScheme === color.name ? { color: color.from } : { color: 'var(--surface-text-sub)' }">
                                        {{ color.name }}
                                    </span>
                                    <div v-if="currentScheme === color.name"
                                        class="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white"
                                        :style="{ backgroundColor: color.from }">
                                        <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="3"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    <!-- ── 3. Languages ── -->
                    <!-- <div class="rounded-3xl p-8 accent-card">
                        <div class="flex items-center gap-4 mb-6">
                            <div class="p-3 rounded-2xl icon-box-3">
                                <LanguageIcon class="w-6 h-6" />
                            </div>
                            <h3 class="text-2xl font-semibold" :style="{ color: 'var(--surface-text)' }">
                                {{ t('languages') }}
                            </h3>
                        </div>

                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <button v-for="lang in languages" :key="lang.code"
                                class="p-4 rounded-xl border transition-all duration-300 text-center group" :style="currentLang === lang.code
                                    ? { borderColor: 'var(--accent-text)', backgroundColor: 'var(--accent-bg)' }
                                    : { borderColor: 'rgba(75,85,99,1)' }" @click="setLanguage(lang.code)">
                                <div class="mb-1">
                                    <img :src="lang.flag" :alt="lang.name"
                                        class="w-8 h-auto rounded-sm inline-block object-cover shadow-sm" />
                                </div>
                                <div class="font-medium text-sm transition-colors"
                                    :style="{ color: currentLang === lang.code ? 'var(--accent-text)' : 'var(--surface-text)' }">
                                    {{ lang.native }}
                                </div>
                                <div class="text-[10px] uppercase tracking-widest"
                                    :style="{ color: 'var(--surface-text-dim)' }">
                                    {{ lang.name }}
                                </div>
                            </button>
                        </div>

                        -- Active checkmark --
                        <div v-if="currentTheme === theme.name"
                            class="absolute -top-5 -right-5 w-4 h-4 rounded-full flex items-center justify-center text-white"
                            :style="{ backgroundColor: 'var(--accent-text)' }">
                            <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="3"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div> -->
                    <div class="rounded-3xl p-8 accent-card">
                        <div class="flex items-center gap-4 mb-6">
                            <div class="p-3 rounded-2xl icon-box-3">
                                <LanguageIcon class="w-6 h-6" />
                            </div>
                            <h3 class="text-2xl font-semibold" :style="{ color: 'var(--surface-text)' }">
                                {{ t('languages') }}
                            </h3>
                        </div>

                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <button v-for="lang in languages" :key="lang.code"
                                class="relative p-4 rounded-xl border transition-all duration-300 text-center group overflow-hidden"
                                :style="currentLang === lang.code
                                    ? { borderColor: 'var(--accent-text)', backgroundColor: 'var(--accent-bg)' }
                                    : { borderColor: 'rgba(75,85,99,1)' }" @click="setLanguage(lang.code)">

                                <div class="mb-1">
                                    <img :src="lang.flag" :alt="lang.name"
                                        class="w-8 h-auto rounded-sm inline-block object-cover shadow-sm" />
                                </div>
                                <div class="font-medium text-sm transition-colors"
                                    :style="{ color: currentLang === lang.code ? 'var(--accent-text)' : 'var(--surface-text)' }">
                                    {{ lang.native }}
                                </div>
                                <div class="text-[10px] uppercase tracking-widest"
                                    :style="{ color: 'var(--surface-text-dim)' }">
                                    {{ lang.name }}
                                </div>

                                <div v-if="currentLang === lang.code"
                                    class="absolute top-3 right-3 w-4 h-4 rounded-full flex items-center justify-center text-white shadow-sm"
                                    :style="{ backgroundColor: 'var(--accent-text)' }">
                                    <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="3"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>

                </div>

                <!-- ── Footer actions ── -->
                <div class="text-center mt-16">
                    <div class="inline-flex flex-col sm:flex-row gap-4 items-center">
                        <router-link to="/"
                            class="px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 flex items-center gap-2"
                            :style="{ background: 'var(--cta-gradient)' }"
                            @mouseenter="e => e.currentTarget.style.boxShadow = '0 10px 28px var(--accent-shadow-lg)'"
                            @mouseleave="e => e.currentTarget.style.boxShadow = 'none'">
                            <ArrowLeftCircleIcon class="w-5 h-5" />
                            {{ t('save_return') }}
                        </router-link>

                        <button
                            class="px-8 py-4 rounded-xl border-2 font-semibold transition-all duration-300 flex items-center gap-2"
                            style="border-color: rgba(248,113,113,0.50); color: #f87171;" @click="resetSettings"
                            @mouseenter="e => e.currentTarget.style.backgroundColor = 'rgba(248,113,113,0.10)'"
                            @mouseleave="e => e.currentTarget.style.backgroundColor = 'transparent'">
                            <ArrowPathIcon class="w-5 h-5" />
                            {{ t('reset') }}
                        </button>
                    </div>
                </div>

            </div>
        </section>
    </div>
</template>

<script setup>
import { currentLang, t, setLanguage } from './../../stores/languages.js';
import { currentScheme, setColorScheme } from './../../stores/colorScheme.js';
import { currentTheme, setThemeMode } from './../../stores/themeMode.js';
import {
    ArrowLeftCircleIcon, ArrowPathIcon,
    SunIcon, MoonIcon, ComputerDesktopIcon,
    SwatchIcon, LanguageIcon, HomeIcon,
} from '@heroicons/vue/24/outline';

const themes = [
    { name: 'Light', label: 'Light', icon: SunIcon },
    { name: 'Dark', label: 'Dark', icon: MoonIcon },
    { name: 'Device', label: 'Device', icon: ComputerDesktopIcon },
];

const colorSchemes = [
    { name: 'Blue-Cyan', from: '#60a5fa', to: '#22d3ee' },
    { name: 'Red-Scarlet', from: '#f87171', to: '#fb923c' },
    { name: 'Purple-Pink', from: '#a855f7', to: '#ec4899' },
    { name: 'Green-Dark', from: '#4ade80', to: '#059669' },
    { name: 'Orange-Yellow', from: '#fb923c', to: '#facc15' },
];

const languages = [
    { name: 'Khmer', native: 'ភាសាខ្មែរ', code: 'km', flag: 'https://flagcdn.com/w80/kh.png' },
    { name: 'English', native: 'English', code: 'en', flag: 'https://flagcdn.com/w80/gb.png' },
    { name: 'Chinese', native: '中文', code: 'zh', flag: 'https://flagcdn.com/w80/tw.png' },
    { name: 'French', native: 'Français', code: 'fr', flag: 'https://flagcdn.com/w80/fr.png' },
    { name: 'Lao', native: 'ພາສາລາວ', code: 'lo', flag: 'https://flagcdn.com/w80/la.png' },
    { name: 'Burmese', native: 'မြန်မာဘာသာ', code: 'my', flag: 'https://flagcdn.com/w80/mm.png' },
    { name: 'Thai', native: 'ภาษาไทย', code: 'th', flag: 'https://flagcdn.com/w80/th.png' },
    { name: 'Japanese', native: '日本語 / にほんご', code: 'ja', flag: 'https://flagcdn.com/w80/jp.png' },
    { name: 'Korean', native: '한국어', code: 'ko', flag: 'https://flagcdn.com/w80/kr.png' },
    { name: 'Filipino', native: 'Pilipino', code: 'fil', flag: 'https://flagcdn.com/w80/ph.png' },
    { name: 'German', native: 'Deutsch', code: 'de', flag: 'https://flagcdn.com/w80/de.png' },
    { name: 'Spanish', native: 'Español', code: 'es', flag: 'https://flagcdn.com/w80/es.png' },

];

function resetSettings() {
    setColorScheme('Blue-Cyan');
    setLanguage('en');
    setThemeMode('Dark');
}
</script>

<style scoped>
.group:hover .breadcrumb-home-text {
    background: var(--logo-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 600;
}

.group:hover .breadcrumb-home-icon {
    background: var(--logo-gradient);
    -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>') no-repeat center;
    mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>') no-repeat center;
    -webkit-mask-size: contain;
    mask-size: contain;
    color: transparent;
}
</style>