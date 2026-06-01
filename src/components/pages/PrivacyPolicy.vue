<template>
  <section class="relative py-24 min-h-screen overflow-hidden" :style="{ backgroundColor: 'var(--bg-color)' }">
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
      <div class="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] blur-[120px] rounded-full" :style="{ backgroundColor: 'var(--accent-glow)' }"></div>
    </div>

    <div class="relative z-10 max-w-4xl mx-auto px-6">

      <!-- Breadcrumb -->
      <nav class="flex mb-12" aria-label="Breadcrumb" data-aos="fade-down">
        <ol class="inline-flex items-center space-x-3">
          <li>
            <router-link to="/" class="group flex items-center text-sm font-medium text-gray-400">
              <HomeIcon class="w-4 h-4 mr-2 group-hover:text-[var(--accent-text)]" />
              <span class="group-hover:text-white transition-colors">Home</span>
            </router-link>
          </li>
          <li class="flex items-center">
            <ChevronRightIcon class="w-5 h-5 text-gray-600 mr-2" />
            <span class="text-sm font-semibold text-transparent bg-clip-text" :style="{ backgroundImage: 'var(--logo-gradient)' }">Privacy Policy</span>
          </li>
        </ol>
      </nav>

      <div class="mb-16" data-aos="fade-up">
        <h1 class="text-5xl font-black text-white mb-6 tracking-tight">
          Privacy <span class="text-transparent bg-clip-text" :style="{ backgroundImage: 'var(--logo-gradient)' }">Policy</span>
        </h1>
        <p class="text-lg opacity-60" :style="{ color: 'var(--surface-text)' }">Last Updated: May 2026</p>
      </div>

      <div class="space-y-10">
        <div v-for="(section, index) in privacyContent" :key="index" 
             class="p-8 rounded-3xl border backdrop-blur-xl transition-all hover:bg-white/[0.02]"
             :style="{ borderColor: 'var(--section-border)', backgroundColor: 'rgba(255,255,255,0.01)' }"
             data-aos="fade-up" :data-aos-delay="index * 100">
          
          <div class="flex items-start gap-6">
            <div class="hidden md:flex w-12 h-12 shrink-0 items-center justify-center font-bold rounded-xl border"
                 :style="{ backgroundColor: 'var(--accent-node-bg)', borderColor: 'var(--accent-border)', color: 'var(--accent-text)' }">
              0{{ index + 1 }}
            </div>
            <div>
              <h2 class="text-2xl font-bold text-white mb-4">{{ section.title }}</h2>
              <p class="text-gray-400 leading-relaxed">{{ section.body }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { HomeIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';

const privacyContent = ref([
  { title: 'Information Collection', body: 'I collect minimal data necessary to provide my services. This includes contact information provided through my contact form (name, email) and technical data like IP addresses collected via standard analytics to improve site performance.' },
  { title: 'How I Use Data', body: 'Your information is used strictly to communicate regarding your project inquiries, deliver requested services, and maintain the security of the Sing.dev platform.' },
  { title: 'Data Retention', body: 'I retain personal information only for as long as necessary to fulfill the purposes for which it was collected or to comply with legal obligations.' },
  { title: 'Your Rights', body: 'You have the right to request access to, correction of, or deletion of your personal data. Contact me at sovisalsing@gmail.com for any privacy concerns.' }
]);
</script>