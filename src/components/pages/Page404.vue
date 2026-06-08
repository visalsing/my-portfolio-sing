<template>
  <section class="relative min-h-screen py-12 flex items-center justify-center overflow-hidden" id="not-found"
    style="background-color: var(--surface-bg);">
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] rounded-full blur-[140px] opacity-15 pointer-events-none"
      :style="{ background: 'var(--cta-gradient)' }"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col min-h-[85vh] justify-between">

      <nav class="flex mb-4" aria-label="Breadcrumb" data-aos="fade-down">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <router-link to="/" class="group inline-flex items-center text-sm font-medium transition-all duration-300"
              style="color: var(--surface-text-sub);">
              <div class="mr-2">
                <HomeIcon class="breadcrumb-home-icon w-4 h-4" />
              </div>
              <span class="breadcrumb-home-text">{{ t('home') || 'Home' }}</span>
            </router-link>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="w-6 h-6" style="color: var(--surface-text-dim);" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd" />
              </svg>
              <span class="ml-1 text-sm font-semibold md:ml-2 text-transparent bg-clip-text"
                :style="{ backgroundImage: 'var(--cta-gradient)' }">{{t('page404')}}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div class="text-center my-auto py-6" data-aos="fade-up">

        <div class="inline-flex flex-col md:flex-row items-center justify-center gap-6 md:gap-14 mb-8 select-none">

          <h1
            class="text-[9rem] sm:text-[11rem] md:text-[14rem] font-black tracking-tighter leading-none text-transparent bg-clip-text order-1 md:order-2"
            :style="{ backgroundImage: 'var(--cta-gradient)' }">
            {{t('page404')}}
          </h1>

          <div class="w-40 sm:w-48 md:w-52 animated-float order-2 md:order-1 flex flex-col items-center relative">

            <img :src="robotImageUrl" alt="Floating Robot"
              class="w-full h-auto filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-105 relative z-10">

            <div class="w-12 h-24 -mt-4 relative z-0 flex flex-col items-center pointer-events-none">

              <div class="absolute inset-x-0 top-0 h-full rounded-b-full blur-[12px] opacity-60 mix-blend-screen"
                :style="{
                  background: 'var(--cta-gradient)',
                  boxShadow: '0 10px 40px var(--accent-shadow, rgba(239,68,68,0.5))'
                }">
              </div>

              <div class="absolute inset-x-2 inset-y-0 rounded-b-full blur-[1px] animated-flame mix-blend-screen"
                :style="{
                  background: 'var(--cta-gradient)',
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 15%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%)',
                  webkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 15%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%)',
                  filter: 'drop-shadow(0 0 12px var(--accent-text, #ef4444))'
                }">
              </div>

              <div
                class="absolute top-0 w-4 h-[75%] rounded-b-full blur-[0.5px] opacity-100 animated-flame-inner mix-blend-screen"
                :style="{
                  background: 'linear-gradient(to bottom, #ffffff 30%, var(--accent-text, #ef4444) 90%, transparent 100%)',
                  boxShadow: '0 0 10px #ffffff, 0 4px 12px var(--accent-text, #ef4444)'
                }">
              </div>
            </div>

            <div class="w-20 h-2 bg-black/40 rounded-full blur-[5px] mt-12 animated-shadow"></div>
          </div>

        </div>

        <div class="w-20 h-[3px] mx-auto mb-8 rounded-full transition-all duration-500" :style="{
          backgroundColor: 'var(--accent-text)',
          boxShadow: '0 0 16px var(--accent-shadow)',
        }" />

        <h2 class="text-3xl md:text-4xl font-bold mb-3 tracking-tight" style="color: var(--surface-text);">
          {{ t('page_not_found') || 'Page Not Found' }}
        </h2>

        <p class="text-base max-w-md mx-auto mb-10 leading-relaxed" style="color: var(--surface-text-sub);">
          {{ t('text404') }}
        </p>

        <div class="inline-flex flex-col sm:flex-row gap-4 items-center justify-center" data-aos="fade-up"
          data-aos-delay="200">
          <router-link to="/"
            class="px-8 py-3.5 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-[1.03] flex items-center shadow-lg active:scale-95"
            :style="{ background: 'var(--cta-gradient)' }"
            @mouseenter="e => e.currentTarget.style.boxShadow = '0 12px 30px var(--accent-shadow)'"
            @mouseleave="e => e.currentTarget.style.boxShadow = 'none'">
            <ArrowLeftCircleIcon class="w-5 h-5 mr-2" />
            {{ t('back_to_safety') || 'Return Home' }}
          </router-link>
        </div>

      </div>

      <div class="h-6"></div>
    </div>
  </section>
</template>

<script setup>
import { t } from './../../stores/languages.js';
import {
  HomeIcon,
  ArrowLeftCircleIcon
} from '@heroicons/vue/24/outline';

import { computed } from 'vue';

// Import reactive current configuration
import { currentScheme, robotSchemeMap } from './../../stores/colorScheme.js';

// Compute the dynamic image URL safely for Vite bundling
const robotImageUrl = computed(() => {
  const fileName = robotSchemeMap[currentScheme.value] || 'robot-blue-cyan-rmbg.png';
  return new URL(`../../assets/images/robots404/${fileName}`, import.meta.url).href;
});
</script>

<style scoped>
/* ── Floating & Flying Keyframes ── */
@keyframes float {
  0% {
    transform: translateY(0px) rotate(0deg);
  }

  50% {
    transform: translateY(-16px) rotate(-1.5deg);
  }

  100% {
    transform: translateY(0px) rotate(0deg);
  }
}

/* Flame Engine Flickering Effects */
@keyframes flicker {

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

@keyframes shadowShrink {

  0%,
  100% {
    transform: scale(1);
    opacity: 0.35;
  }

  50% {
    transform: scale(0.7);
    opacity: 0.12;
  }
}

.animated-float {
  animation: float 4s ease-in-out infinite;
}

.animated-flame {
  animation: flicker 0.15s ease-in-out infinite;
  transform-origin: top center;
}

.animated-flame-inner {
  animation: flicker 0.1s ease-in-out infinite alternate;
  transform-origin: top center;
}

.animated-shadow {
  animation: shadowShrink 4s ease-in-out infinite;
}

/* ── Breadcrumb UI styles ── */
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