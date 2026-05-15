<template>
    <div class="min-h-screen bg-black text-white">
        <section class="relative py-20 overflow-hidden" id="settings">
            <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div class="text-center mb-16" data-aos="fade-up">
                    <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
                        <span class="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                            {{t('settings')}}
                        </span>
                    </h2>
                    <p class="text-blue-200 text-lg">
                        {{t('customize')}}
                    </p>
                </div>

                <div class="space-y-8">

                    <div
                        class="bg-linear-to-br from-gray-800/50 to-blue-900/20 rounded-3xl p-8 border border-blue-500/20 backdrop-blur-sm">
                        <div class="flex items-center gap-4 mb-6">
                            <div class="p-3 bg-blue-500/20 rounded-2xl">
                                <SunIcon class="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 class="text-2xl font-semibold">{{t('portfolio_themes')}}</h3>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <button v-for="theme in themes" :key="theme.name"
                                class="flex items-center justify-center gap-3 p-4 rounded-xl border transition-all duration-300 group"
                                :class="selectedTheme === theme.name ? 'border-blue-400 bg-blue-400/10' : 'border-gray-700 hover:border-blue-400/40 bg-gray-900/40'">
                                <component :is="theme.icon" class="w-5 h-5"
                                    :class="selectedTheme === theme.name ? 'text-blue-400' : 'text-gray-400'" />
                                <span :class="selectedTheme === theme.name ? 'text-white' : 'text-gray-400'">{{
                                    theme.name }}</span>
                            </button>
                        </div>
                    </div>

                    <div
                        class="bg-linear-to-br from-gray-800/50 to-blue-900/20 rounded-3xl p-8 border border-blue-500/20 backdrop-blur-sm">
                        <div class="flex items-center gap-4 mb-6">
                            <div class="p-3 bg-cyan-500/20 rounded-2xl">
                                <SwatchIcon class="w-6 h-6 text-cyan-400" />
                            </div>
                            <h3 class="text-2xl font-semibold">{{t('accent_colors')}}</h3>
                        </div>

                        <div class="flex flex-wrap gap-4">
                            <button v-for="color in colorSchemes" :key="color.name"
                                class="flex-1 min-w-[140px] group relative p-4 rounded-xl border border-gray-700 hover:border-white/20 transition-all duration-300 overflow-hidden">
                                <div class="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
                                    :class="color.bg"></div>
                                <div class="relative flex flex-col items-center gap-2">
                                    <div class="flex -space-x-2">
                                        <div class="w-6 h-6 rounded-full border border-black" :class="color.from"></div>
                                        <div class="w-6 h-6 rounded-full border border-black" :class="color.to"></div>
                                    </div>
                                    <span class="text-sm font-medium text-gray-300 group-hover:text-white">{{ color.name
                                    }}</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div
                        class="bg-linear-to-br from-gray-800/50 to-blue-900/20 rounded-3xl p-8 border border-blue-500/20 backdrop-blur-sm">
                        <div class="flex items-center gap-4 mb-6">
                            <div class="p-3 bg-indigo-500/20 rounded-2xl">
                                <LanguageIcon class="w-6 h-6 text-indigo-400" />
                            </div>
                            <h3 class="text-2xl font-semibold">{{t('languages')}}</h3>
                        </div>

                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <!-- <button v-for="lang in languages" :key="lang.code"
                                class="p-4 rounded-xl border border-gray-700 hover:bg-white/5 transition-all text-center">
                                <div class="text-2xl mb-1">{{ lang.flag }}</div>
                                <div class="font-medium">{{ lang.name }}</div>
                                <div class="text-[10px] text-gray-500 uppercase tracking-widest">{{ lang.native }}</div>
                            </button> -->


                            <button v-for="lang in languages" :key="lang.code" @click="setLanguage(lang.code)"
                                class="p-4 rounded-xl border transition-all text-center"
                                :class="currentLang === lang.code ? 'border-blue-400 bg-blue-400/10' : 'border-gray-700'">
                                <div class="text-2xl mb-1">{{ lang.flag }}</div>
                                <div class="font-medium">{{ lang.name }}</div>
                            </button>

                            <!-- <span class="...">{{ t('settings') }}</span>
                            <p class="...">{{ t('customize') }}</p>
                            <h3 class="text-2xl font-semibold">{{ t('portfolio_themes') }}</h3>
                            <h3 class="text-2xl font-semibold">{{ t('accent_colors') }}</h3>
                            <h3 class="text-2xl font-semibold">{{ t('language') }}</h3> -->



                        </div>
                    </div>

                </div>

                <div class="text-center mt-16">
                    <div class="inline-flex flex-col sm:flex-row gap-4 items-center">
                        <router-link to="/"
                            class="px-8 py-4 rounded-xl bg-linear-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 flex items-center">
                            <ArrowLeftCircleIcon class="w-5 h-5 mr-2" />
                            {{t('save_return')}}
                        </router-link>
                        <button
                            class="px-8 py-4 rounded-xl border-2 border-red-400/50 text-red-400 font-semibold hover:bg-red-400/10 transition-all duration-300 flex items-center">
                            {{t('reset')}}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { currentLang, t, setLanguage } from './../../stores/languages.js'; // Adjust path as needed
import {
    ArrowLeftCircleIcon,
    SunIcon,
    MoonIcon,
    ComputerDesktopIcon,
    SwatchIcon,
    LanguageIcon
} from '@heroicons/vue/24/outline';

const selectedTheme = ref('Dark');

const themes = [
    { name: 'Light', icon: SunIcon },
    { name: 'Dark', icon: MoonIcon },
    { name: 'Device', icon: ComputerDesktopIcon },
];

const colorSchemes = [
    { name: 'Blue-Cyan', from: 'bg-blue-400', to: 'bg-cyan-400', bg: 'bg-blue-500' },
    { name: 'Red-Scarlet', from: 'bg-red-500', to: 'bg-orange-600', bg: 'bg-red-500' },
    { name: 'Purple-Pink', from: 'bg-purple-500', to: 'bg-pink-500', bg: 'bg-purple-500' },
    { name: 'Green-Dark', from: 'bg-green-400', to: 'bg-emerald-700', bg: 'bg-green-500' },
    { name: 'Orange-Yellow', from: 'bg-orange-500', to: 'bg-yellow-400', bg: 'bg-orange-500' },
];

const languages = [
    { name: 'Khmer', native: 'ភាសាខ្មែរ', code: 'km', flag: '🇰🇭' },
    { name: 'English', native: 'English', code: 'en', flag: '🇺🇸' },
    { name: 'Chinese', native: '中文', code: 'zh', flag: '🇨🇳' },
    { name: 'French', native: 'Français', code: 'fr', flag: '🇫🇷' },
];

</script>