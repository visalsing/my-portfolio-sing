<template>
  <!-- ─── Primary Nav ─── -->
  <header
    :class="[
      'w-full z-[100] transition-all duration-300 px-4 py-4 sm:px-6 flex justify-between items-center',
      'fixed top-0 left-0 lg:relative lg:top-auto lg:left-auto lg:z-20',
      isMenuOpen ? 'bg-transparent' : 'backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none'
    ]"
    :style="!isMenuOpen
      ? { backgroundColor: 'color-mix(in srgb, var(--surface-bg-3))' }
      : {}"
  >
    <!-- Logo -->
    <div
      class="text-xl sm:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent relative z-[110]"
      :style="{ backgroundImage: 'var(--logo-gradient)' }"
    >
      Dev <span class="font-black">Portfolio</span>
    </div>

    <!-- Mobile hamburger -->
    <div class="lg:hidden relative z-[110]">
      <button
        type="button"
        class="block focus:outline-none p-1.5 sm:p-2 rounded-lg backdrop-blur-sm border transition-all duration-300 shadow-lg"
        :style="{
          backgroundColor: 'var(--navbar-bg)',
          borderColor: 'var(--nav-btn-border)'
        }"
        @click="isMenuOpen = !isMenuOpen"
      >
        <div class="relative w-6 h-6">
          <span
            :class="['absolute left-0 w-6 h-0.5 transition-all duration-300', isMenuOpen ? 'rotate-45 top-3' : 'top-1']"
            :style="{ backgroundColor: 'var(--accent-text-muted)' }"
          ></span>
          <span
            :class="['absolute left-0 w-6 h-0.5 transition-all duration-300', isMenuOpen ? 'opacity-0' : 'top-3 opacity-100']"
            :style="{ backgroundColor: 'var(--accent-text-muted)' }"
          ></span>
          <span
            :class="['absolute left-0 w-6 h-0.5 transition-all duration-300', isMenuOpen ? '-rotate-45 top-3' : 'top-5']"
            :style="{ backgroundColor: 'var(--accent-text-muted)' }"
          ></span>
        </div>
      </button>
    </div>

    <!-- Nav links (mobile overlay) -->
    <nav
      :class="[
        'fixed inset-0 z-[80] flex flex-col items-center justify-center transition-all duration-500 ease-in-out',
        'lg:relative lg:bg-transparent lg:flex lg:justify-between lg:flex-row lg:inset-auto lg:translate-y-0',
        isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 lg:opacity-100'
      ]"
      :style="{ backgroundColor: isMenuOpen ? 'var(--surface-bg)' : 'transparent' }"
    >
      <ul class="flex flex-col items-center space-y-6 lg:flex-row lg:space-x-5 lg:space-y-0">
        <li v-for="item in Menu" :key="item.name" class="group relative">
          <a
            :href="item.href"
            class="relative block transition-colors duration-300 text-lg sm:text-xl lg:text-sm font-medium tracking-wide"
            :style="{ color: activeSection === item.href ? 'var(--accent-text)' : '' }"
            :class="activeSection !== item.href ? 'text-gray-400' : ''"
            @mouseenter="e => { if (activeSection !== item.href) e.currentTarget.style.color = 'var(--accent-text)' }"
            @mouseleave="e => { if (activeSection !== item.href) e.currentTarget.style.color = '' }"
            @click.prevent="scrollToSection(item.href)"
          >
            {{ t(item.name) }}
            <span
              class="absolute -bottom-1 left-0 h-0.5 transition-all duration-300"
              :class="activeSection === item.href ? 'w-full' : 'w-0 group-hover:w-full'"
              :style="{ backgroundColor: 'var(--accent-text)' }"
            ></span>
          </a>
        </li>
      </ul>

      <!-- CTA button -->
      <div class="mt-10 lg:mt-0 lg:ml-8">
        <button
          class="px-5 py-2.5 sm:px-7 sm:py-3 text-white rounded-full transition-all duration-300 text-sm font-semibold"
          :style="{ background: 'var(--cta-gradient)' }"
          @mouseenter="e => e.currentTarget.style.boxShadow = '0 8px 24px var(--accent-shadow)'"
          @mouseleave="e => e.currentTarget.style.boxShadow = 'none'"
        >
          {{ t('lets_talk') }}
        </button>
      </div>
    </nav>
  </header>

  <!-- ─── Top-hover sentinel (desktop) ─── -->
  <div
    class="fixed top-0 left-0 w-full h-4 z-[60] hidden lg:block"
    @mouseenter="isHoveringTop = true"
  ></div>

  <!-- ─── Sticky Nav (desktop, hover-reveal) ─── -->
  <header
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-500 transform hidden lg:flex',
      isStickyVisible && isHoveringTop ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    ]"
    class="justify-between items-center p-6 backdrop-blur-md"
    :style="{
      backgroundColor: 'var(--surface-bg), transparent',
      boxShadow: '0 4px 30px var(--accent-shadow)'
    }"
    @mouseleave="isHoveringTop = false"
  >
    <!-- Logo -->
    <div
      class="text-3xl font-bold bg-clip-text text-transparent"
      :style="{ backgroundImage: 'var(--logo-gradient)' }"
    >
      Dev <span class="font-black">Portfolio</span>
    </div>

    <nav class="flex items-center">
      <ul class="flex flex-row space-x-5">
        <li v-for="item in Menu" :key="item.name" class="group relative">
          <a
            :href="item.href"
            class="relative block transition-colors duration-300 text-sm font-medium tracking-wide"
            :style="{ color: activeSection === item.href ? 'var(--accent-text)' : '' }"
            :class="activeSection !== item.href ? 'text-gray-400' : ''"
            @mouseenter="e => { if (activeSection !== item.href) e.currentTarget.style.color = 'var(--accent-text)' }"
            @mouseleave="e => { if (activeSection !== item.href) e.currentTarget.style.color = '' }"
            @click.prevent="scrollToSection(item.href)"
          >
            {{ t(item.name) }}
            <span
              class="absolute -bottom-1 left-0 h-0.5 transition-all duration-300"
              :class="activeSection === item.href ? 'w-full' : 'w-0 group-hover:w-full'"
              :style="{ backgroundColor: 'var(--accent-text)' }"
            ></span>
          </a>
        </li>
      </ul>

      <div class="ml-8">
        <button
          class="px-6 py-2.5 text-white rounded-full transition-all duration-300 text-sm font-semibold"
          :style="{ background: 'var(--cta-gradient)' }"
          @mouseenter="e => e.currentTarget.style.boxShadow = '0 8px 24px var(--accent-shadow)'"
          @mouseleave="e => e.currentTarget.style.boxShadow = 'none'"
        >
          {{ t('lets_talk') }}
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { t } from './../stores/languages.js';

const router = useRouter();

const Menu = ref([
  { name: 'home',         href: '#home_hero' },
  { name: 'about_me',     href: '#about' },
  { name: 'skills',       href: '#skills' },
  { name: 'services',     href: '#services' },
  { name: 'projects',     href: '#projects' },
  { name: 'testimonials', href: '#testimonials' },
  { name: 'contacts',     href: '#contacts' },
  { name: 'settings',     href: '/settings' },
]);

const isMenuOpen      = ref(false);
const isStickyVisible = ref(false);
const isHoveringTop   = ref(false);
const activeSection   = ref('#home_hero');

watch(isMenuOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : '';
});

const handleScroll = () => {
  isStickyVisible.value = window.scrollY > 400;
  const scrollPosition  = window.scrollY + 100;

  Menu.value.forEach((item) => {
    if (!item.href.startsWith('#')) return;
    const section = document.querySelector(item.href);
    if (section) {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        activeSection.value = item.href;
      }
    }
  });
};

const scrollToSection = (href) => {
  isMenuOpen.value    = false;
  isHoveringTop.value = false;
  document.body.style.overflow = '';

  if (href.startsWith('/')) {
    router.push(href);
  } else {
    const section = document.querySelector(href);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(()  => window.addEventListener('scroll', handleScroll));
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.body.style.overflow = '';
});
</script>