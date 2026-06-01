<template>
  <section class="relative py-24 min-h-screen overflow-hidden" :style="{ backgroundColor: 'var(--bg-color)' }">
    <div class="relative z-10 max-w-4xl mx-auto px-6">

      <!-- ── Breadcrumb ── -->
      <nav class="flex mb-8" aria-label="Breadcrumb" data-aos="fade-down">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <router-link to="/" class="group inline-flex items-center text-sm font-medium transition-all duration-300"
              style="color: var(--surface-text-sub);">
              <div class="mr-2">
                <HomeIcon class="breadcrumb-home-icon w-4 h-4" />
              </div>
              <span class="breadcrumb-home-text">Home</span>
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
                :style="{ backgroundImage: 'var(--logo-gradient)' }">Terms of Services</span>
            </div>
          </li>
        </ol>
      </nav>

      <div class="text-center mb-20" data-aos="zoom-out">
        <h1 class="text-5xl md:text-6xl font-black text-[var(--surface-text)] mb-4 uppercase tracking-tighter">
          Terms of <span class="text-transparent bg-clip-text"
            :style="{ backgroundImage: 'var(--logo-gradient)' }">Service</span>
        </h1>
        <div class="w-24 h-1 mx-auto" :style="{ backgroundImage: 'var(--logo-gradient)' }"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="(term, index) in terms" :key="index"
          class="group p-1 rounded-[2rem] transition-all hover:scale-[1.02]"
          :style="{ background: 'var(--section-border)' }">
          <div class="h-full bg-[var(--bg-color)] p-8 rounded-[1.9rem] flex flex-col">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-2 h-2 rounded-full" :style="{ backgroundColor: 'var(--accent-text)' }"></div>
              <h3 class="font-bold text-xl text-[var(--surface-text-sub)]">{{ term.title }}</h3>
            </div>
            <p class="text-sm opacity-60 leading-relaxed text-[var(--surface-text-sub)]">{{ term.desc }}</p>
          </div>
        </div>
      </div>

      <div class="mt-20 text-center p-12 rounded-[3rem] border border-dashed"
        :style="{ borderColor: 'var(--accent-border)' }">
        <p class="text-gray-400 mb-6">Questions regarding these terms?</p>
        <a href="mailto:sovisalsing@gmail.com" class="px-10 py-4 rounded-full text-white font-bold transition-all"
          :style="{ background: 'var(--cta-gradient)' }">
          Contact Support
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

import {
  CloudArrowUpIcon, ArrowRightIcon, ChatBubbleLeftRightIcon,
  CodeBracketIcon, CommandLineIcon, PaintBrushIcon, DocumentTextIcon,
  CpuChipIcon, EnvelopeIcon, VideoCameraIcon, DevicePhoneMobileIcon,
  WindowIcon, PhotoIcon, ChatBubbleBottomCenterTextIcon,
  MagnifyingGlassCircleIcon, ServerIcon, LanguageIcon,
  ArrowLeftCircleIcon, HomeIcon, MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline';
import { ChevronRightIcon } from '@heroicons/vue/16/solid';

const terms = ref([
  { title: 'Service Scope', desc: 'I provide digital services including web development, UI/UX design, and consulting as detailed in specific project agreements.' },
  { title: 'Intellectual Property', desc: 'Upon full payment, the ownership of final code and designs is transferred to the client, while I retain the right to showcase the work in my portfolio.' },
  { title: 'Payment Terms', desc: 'Projects typically require a 50% deposit upfront. Final deliverables are released once the remaining balance is settled.' },
  { title: 'Limitation of Liability', desc: 'Sing.dev is not liable for indirect or consequential damages arising from the use of delivered software once it has been accepted by the client.' }
]);
</script>

<style scoped>
/* ── Breadcrumb hover effects (unchanged) ─────────────────────────────────── */
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