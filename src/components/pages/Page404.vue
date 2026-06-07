<template>
  <section
    class="relative min-h-screen py-20 flex items-center overflow-hidden"
    id="not-found"
    style="background-color: var(--surface-bg);"
  >
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

      <nav class="flex mb-8" aria-label="Breadcrumb" data-aos="fade-down">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <router-link
              to="/"
              class="group inline-flex items-center text-sm font-medium transition-all duration-300"
              style="color: var(--surface-text-sub);"
            >
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
              <span
                class="ml-1 text-sm font-semibold md:ml-2 text-transparent bg-clip-text"
                :style="{ backgroundImage: 'var(--cta-gradient)' }"
              >404</span>
            </div>
          </li>
        </ol>
      </nav>

      <div class="text-center my-auto py-12" data-aos="fade-up">
        
        <h1 
          class="text-8xl md:text-9xl font-extrabold tracking-tighter mb-4 cursor-default select-none transition-transform duration-500 hover:scale-105 text-transparent bg-clip-text"
          :style="{ backgroundImage: 'var(--cta-gradient)' }"
        >
          404
        </h1>

        <div
          class="w-24 h-[2px] mx-auto mb-8 transition-all duration-500"
          :style="{
            backgroundColor: 'var(--accent-text)',
            boxShadow: '0 0 12px var(--accent-shadow)',
          }"
        />

        <h2 class="text-3xl md:text-4xl font-bold mb-4" style="color: var(--surface-text);">
          {{ t('page_not_found') || 'Page Not Found' }}
        </h2>
        
        <p class="text-lg max-w-md mx-auto mb-12" style="color: var(--surface-text-sub);">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div class="inline-flex flex-col sm:flex-row gap-4 items-center justify-center" data-aos="fade-up" data-aos-delay="200">
          <router-link
            to="/"
            class="px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center"
            :style="{ background: 'var(--cta-gradient)' }"
            @mouseenter="e => e.currentTarget.style.boxShadow = '0 10px 25px var(--accent-shadow)'"
            @mouseleave="e => e.currentTarget.style.boxShadow = 'none'"
          >
            <ArrowLeftCircleIcon class="w-5 h-5 mr-2" />
            {{ t('back_to_safety') || 'Return Home' }}
          </router-link>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { t } from './../../stores/languages.js';
import { 
  HomeIcon, 
  ArrowLeftCircleIcon 
} from '@heroicons/vue/24/outline';
</script>

<style scoped>
/* ── Breadcrumb hover: text ── */
.group:hover .breadcrumb-home-text {
  background: var(--logo-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
}

/* ── Breadcrumb hover: icon ── */
.group:hover .breadcrumb-home-icon {
  background: var(--logo-gradient);
  -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>') no-repeat center;
  mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>') no-repeat center;
  -webkit-mask-size: contain;
  mask-size: contain;
  color: transparent;
}
</style>