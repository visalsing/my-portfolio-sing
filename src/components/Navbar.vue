<template>
  <header :class="[
    'w-full z-[100] transition-all duration-300 px-4 py-4 sm:px-6 flex justify-between items-center',
    'fixed top-0 left-0',
    isMenuOpen ? 'bg-transparent' : 'backdrop-blur-md'
  ]" :style="!isMenuOpen ? { backgroundColor: 'color-mix(in srgb, var(--surface-bg-3))' } : {}" id="primary-nav">

    <div class="flex items-center gap-2 relative z-[110]">
      <img :src="logoSrc" alt="Logo" class="w-8 h-8 object-contain rounded-xl" />
      <div class="text-xl sm:text-2xl font-bold bg-clip-text text-transparent"
        :style="{ backgroundImage: 'var(--logo-gradient)' }">
        Dev <span class="font-black">Portfolio</span>
      </div>
    </div>

    <div class="hamburger-btn relative z-[110]">
      <button type="button"
        class="block focus:outline-none p-1.5 sm:p-2 rounded-lg backdrop-blur-sm border transition-all duration-300 shadow-lg"
        :style="{
          backgroundColor: 'var(--navbar-bg)',
          borderColor: 'var(--nav-btn-border)'
        }" @click="isMenuOpen = !isMenuOpen">
        <div class="relative w-6 h-6">
          <span :class="['absolute left-0 w-6 h-0.5 transition-all duration-300', isMenuOpen ? 'rotate-45 top-3' : 'top-1']"
            :style="{ backgroundColor: 'var(--accent-text-muted)' }"></span>
          <span :class="['absolute left-0 w-6 h-0.5 transition-all duration-300', isMenuOpen ? 'opacity-0' : 'top-3 opacity-100']"
            :style="{ backgroundColor: 'var(--accent-text-muted)' }"></span>
          <span :class="['absolute left-0 w-6 h-0.5 transition-all duration-300', isMenuOpen ? '-rotate-45 top-3' : 'top-5']"
            :style="{ backgroundColor: 'var(--accent-text-muted)' }"></span>
        </div>
      </button>
    </div>

<nav :class="[
  'fixed inset-0 z-[80] flex flex-col items-center justify-start transition-all duration-500 ease-in-out overflow-y-auto pt-24 pb-24',
  isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
]" :style="{ backgroundColor: isMenuOpen ? 'var(--surface-bg)' : 'transparent' }" id="mobile-nav">

    <!-- <nav :class="[
      'fixed inset-0 z-[80] flex flex-col items-center justify-center transition-all duration-500 ease-in-out',
      isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    ]" 
    :style="{ backgroundColor: isMenuOpen ? 'var(--surface-bg)' : 'transparent' }" id="mobile-nav"> -->
      <ul class="flex flex-col items-center space-y-6 w-full max-w-xs">
        <li v-for="item in Menu" :key="item.name" class="group relative w-full text-center">
          
          <template v-if="item.name !== 'more'">
            <a :href="item.href"
              class="relative inline-block transition-colors duration-300 text-lg sm:text-xl font-medium tracking-wide"
              :style="{ color: activeSection === item.href ? 'var(--accent-text)' : '' }"
              :class="activeSection !== item.href ? 'text-gray-400' : ''"
              @mouseenter="e => { if (activeSection !== item.href) e.currentTarget.style.color = 'var(--accent-text)' }"
              @mouseleave="e => { if (activeSection !== item.href) e.currentTarget.style.color = '' }"
              @click.prevent="scrollToSection(item.href)">
              {{ t(item.name) }}
              <span class="absolute -bottom-1 left-0 h-0.5 transition-all duration-300"
                :class="activeSection === item.href ? 'w-full' : 'w-0 group-hover:w-full'"
                :style="{ backgroundColor: 'var(--accent-text)' }"></span>
            </a>
          </template>

          <template v-else>
            <button @click="isMobileMoreOpen = !isMobileMoreOpen" 
              class="flex items-center justify-center gap-2 mx-auto text-lg sm:text-xl font-medium tracking-wide text-gray-400 transition-colors duration-300 hover:text-[var(--accent-text)]">
              <span>{{ t(item.name) }}</span>
              <svg :class="['w-4 h-4 transition-transform duration-300', isMobileMoreOpen ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div :class="['grid transition-all duration-300 ease-in-out', isMobileMoreOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 pointer-events-none']">
              <div class="overflow-hidden bg-white/5 backdrop-blur-md rounded-xl border border-white/10 mx-4 px-2">
                <div class="flex flex-col py-2">
                  <a v-for="sub in moreDropdownItems" :key="sub.name" :href="sub.href"
                    class="px-4 py-2.5 text-base text-gray-400 font-medium rounded-lg hover:bg-white/5 transition-all duration-300 text-center block"
                    @mouseenter="e => e.currentTarget.style.color = 'var(--accent-text)'"
                    @mouseleave="e => e.currentTarget.style.color = ''"
                    @click.prevent="scrollToSection(sub.href)">
                    {{ sub.name }}
                  </a>
                </div>
              </div>
            </div>
          </template>

        </li>
      </ul>
      
      <div class="mt-10">
        <router-link to="/contact"
          class="px-5 py-2.5 sm:px-7 sm:py-3 text-white rounded-full transition-all duration-300 text-sm font-semibold cursor-pointer"
          :style="{ background: 'var(--cta-gradient)' }"
          @mouseenter="e => e.currentTarget.style.boxShadow = '0 8px 24px var(--accent-shadow)'"
          @mouseleave="e => e.currentTarget.style.boxShadow = 'none'">
          {{ t('lets_talk') }}
        </router-link>
      </div>
    </nav>

    <nav class="desktop-nav items-center" id="desktop-nav">
      <ul class="flex flex-row space-x-5 items-center">
        <li v-for="item in Menu" :key="item.name" :class="['group relative', item.name === 'more' ? 'py-2' : '']">
          
          <template v-if="item.name !== 'more'">
            <a :href="item.href"
              class="relative block transition-colors duration-300 text-sm font-medium tracking-wide"
              :style="{ color: activeSection === item.href ? 'var(--accent-text)' : '' }"
              :class="activeSection !== item.href ? 'text-gray-400' : ''"
              @mouseenter="e => { if (activeSection !== item.href) e.currentTarget.style.color = 'var(--accent-text)' }"
              @mouseleave="e => { if (activeSection !== item.href) e.currentTarget.style.color = '' }"
              @click.prevent="scrollToSection(item.href)">
              {{ t(item.name) }}
              <span class="absolute -bottom-1 left-0 h-0.5 transition-all duration-300"
                :class="activeSection === item.href ? 'w-full' : 'w-0 group-hover:w-full'"
                :style="{ backgroundColor: 'var(--accent-text)' }"></span>
            </a>
          </template>

          <template v-else>
            <div class="flex items-center gap-1 cursor-pointer transition-colors duration-300 text-sm font-medium tracking-wide text-gray-400 group-hover:text-[var(--accent-text)]">
              <span>{{ t(item.name) }}</span>
              <svg class="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            <div class="absolute right-0 top-full pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50 w-48">
              <div class="rounded-xl border border-white/10 p-2 backdrop-blur-xl" :style="{ backgroundColor: 'var(--surface-bg-3, rgba(20,20,20,0.85))', boxShadow: '0 10px 30px var(--accent-shadow)' }">
                <div class="flex flex-col space-y-0.5">
                  <a v-for="sub in moreDropdownItems" :key="sub.name" :href="sub.href"
                    class="px-4 py-2 text-sm text-gray-400 font-medium rounded-lg hover:bg-white/5 transition-all duration-200 block"
                    @mouseenter="e => e.currentTarget.style.color = 'var(--accent-text)'"
                    @mouseleave="e => e.currentTarget.style.color = ''"
                    @click.prevent="scrollToSection(sub.href)">
                    {{ sub.name }}
                  </a>
                </div>
              </div>
            </div>
          </template>

        </li>
      </ul>
      <div class="ml-8">
        <router-link to="/contact"
          class="px-6 py-2.5 text-white rounded-full transition-all duration-300 text-sm font-semibold cursor-pointer"
          :style="{ background: 'var(--cta-gradient)' }"
          @mouseenter="e => e.currentTarget.style.boxShadow = '0 8px 24px var(--accent-shadow)'"
          @mouseleave="e => e.currentTarget.style.boxShadow = 'none'">
          {{ t('lets_talk') }}
        </router-link>
      </div>
    </nav>
  </header>

  <div class="fixed top-0 left-0 w-full h-4 z-[60] sentinel-desktop" @mouseenter="isHoveringTop = true"></div>

  <header :class="[
    'fixed top-0 left-0 w-full z-50 transition-all duration-500 transform sticky-nav',
    isStickyVisible && isHoveringTop ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
  ]" class="justify-between items-center p-6 backdrop-blur-md" :style="{
    backgroundColor: 'var(--surface-bg), transparent',
    boxShadow: '0 4px 30px var(--accent-shadow)'
  }" @mouseleave="isHoveringTop = false">

    <div class="flex items-center gap-2">
      <img :src="logoSrc" alt="Logo" class="w-8 h-8 object-contain rounded-xl" />
      <div class="text-3xl font-bold bg-clip-text text-transparent"
        :style="{ backgroundImage: 'var(--logo-gradient)' }">
        Dev <span class="font-black">Portfolio</span>
      </div>
    </div>

    <nav class="flex items-center">
      <ul class="flex flex-row space-x-5 items-center">
        <li v-for="item in Menu" :key="item.name" :class="['group relative', item.name === 'more' ? 'py-2' : '']">
          
          <template v-if="item.name !== 'more'">
            <a :href="item.href"
              class="relative block transition-colors duration-300 text-sm font-medium tracking-wide"
              :style="{ color: activeSection === item.href ? 'var(--accent-text)' : '' }"
              :class="activeSection !== item.href ? 'text-gray-400' : ''"
              @mouseenter="e => { if (activeSection !== item.href) e.currentTarget.style.color = 'var(--accent-text)' }"
              @mouseleave="e => { if (activeSection !== item.href) e.currentTarget.style.color = '' }"
              @click.prevent="scrollToSection(item.href)">
              {{ t(item.name) }}
              <span class="absolute -bottom-1 left-0 h-0.5 transition-all duration-300"
                :class="activeSection === item.href ? 'w-full' : 'w-0 group-hover:w-full'"
                :style="{ backgroundColor: 'var(--accent-text)' }"></span>
            </a>
          </template>

          <template v-else>
            <div class="flex items-center gap-1 cursor-pointer transition-colors duration-300 text-sm font-medium tracking-wide text-gray-400 group-hover:text-[var(--accent-text)]">
              <span>{{ t(item.name) }}</span>
              <svg class="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            <div class="absolute right-0 top-full pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50 w-48">
              <div class="rounded-xl border border-white/10 p-2 backdrop-blur-xl" :style="{ backgroundColor: 'var(--surface-bg-3, rgba(20,20,20,0.85))', boxShadow: '0 10px 30px var(--accent-shadow)' }">
                <div class="flex flex-col space-y-0.5">
                  <a v-for="sub in moreDropdownItems" :key="sub.name" :href="sub.href"
                    class="px-4 py-2 text-sm text-gray-400 font-medium rounded-lg hover:bg-white/5 transition-all duration-200 block"
                    @mouseenter="e => e.currentTarget.style.color = 'var(--accent-text)'"
                    @mouseleave="e => e.currentTarget.style.color = ''"
                    @click.prevent="scrollToSection(sub.href)">
                    {{ sub.name }}
                  </a>
                </div>
              </div>
            </div>
          </template>

        </li>
      </ul>
      <div class="ml-8">
        <router-link to="/contact"
          class="px-6 py-2.5 text-white rounded-full transition-all duration-300 text-sm font-semibold cursor-pointer"
          :style="{ background: 'var(--cta-gradient)' }"
          @mouseenter="e => e.currentTarget.style.boxShadow = '0 8px 24px var(--accent-shadow)'"
          @mouseleave="e => e.currentTarget.style.boxShadow = 'none'">
          {{ t('lets_talk') }}
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { t } from './../stores/languages.js';

const router = useRouter();

const Menu = ref([
  { name: 'home', href: '#home_hero' },
  { name: 'about_me', href: '#about' },
  { name: 'skills', href: '#skills' },
  { name: 'services', href: '#services' },
  { name: 'projects', href: '#projects' },
  { name: 'testimonials', href: '#testimonials' },
  { name: 'contacts', href: '#contacts' },
  { name: 'settings', href: '/settings' },
  { name: 'more', href: '#more_options' }
]);

const moreDropdownItems = ref([
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Login',     href: '/login' },
  { name: 'Logout',    href: '/logout' },
  { name: 'Read More', href: '/read-more' },
  { name: 'Portfolio Map',       href: '/portfolio-map' }
]);

const isMenuOpen = ref(false);
const isMobileMoreOpen = ref(false);
const isStickyVisible = ref(false);
const isHoveringTop = ref(false);
const activeSection = ref('#home_hero');

watch(isMenuOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : '';
  if(!val) isMobileMoreOpen.value = false;
});

const handleScroll = () => {
  isStickyVisible.value = window.scrollY > 400;
  const scrollPosition = window.scrollY + 100;
  Menu.value.forEach((item) => {
    if (!item.href.startsWith('#')) return;
    const section = document.querySelector(item.href);
    if (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        activeSection.value = item.href;
      }
    }
  });
};

const scrollToSection = (href) => {
  isMenuOpen.value = false;
  isHoveringTop.value = false;
  isMobileMoreOpen.value = false;
  document.body.style.overflow = '';
  
  if (href.startsWith('/')) {
    router.push(href);
  } else {
    const section = document.querySelector(href);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.body.style.overflow = '';
});

import { currentScheme } from './../stores/colorScheme.js';

const logoSchemeMap = {
  'Blue-Cyan':      'logo-portfolio-blue-cyan.png',
  'Red-Scarlet':    'logo-portfolio-red-scarlet.png',
  'Purple-Pink':    'logo-portfolio-pink-purple.png',
  'Green-Dark':     'logo-portfolio-green-darkgreen.png',
  'Orange-Yellow':  'logo-portfolio-orange-yellow.png',
  'Rainbow':        'logo-portfolio-rainbow.png',
  'Black-Charcoal': 'logo-portfolio-black-charcoal-darkBg.png',
  'White-Smoke':    'logo-portfolio-white-smoke.png',
  'Bloody-Red':     'logo-portfolio-bloody-red.png',
  'Midnight-Blue':  'logo-portfolio-midnight-blue.png',
};

const logoSrc = computed(() => {
  const file = logoSchemeMap[currentScheme.value] ?? logoSchemeMap['Blue-Cyan'];
  return new URL(`../assets/logos/${file}`, import.meta.url).href;
});
</script>

<style scoped>
.group:hover .absolute {
  display: block;
}

.hamburger-btn  { display: block; }
.desktop-nav    { display: none; }
#primary-nav    { position: fixed; top: 0; left: 0; }
.sentinel-desktop { display: none; }
.sticky-nav     { display: none; }

@media (min-width: 1150px) {
  .hamburger-btn  { display: none; }
  .desktop-nav    { display: flex; }
  #mobile-nav     { display: none !important; }
  #primary-nav    { position: relative; top: auto; left: auto; z-index: 20; background: transparent !important; backdrop-filter: none; }
  .sentinel-desktop { display: block; }
  .sticky-nav     { display: flex; }
}





/* Mobile nav scrollbar — only applies inside the mobile menu panel */
#mobile-nav::-webkit-scrollbar {
  width: 6px; /* slimmer than the global 10px, fits the panel better */
}

#mobile-nav::-webkit-scrollbar-track {
  background: var(--scrollbar-track);
}

#mobile-nav::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb);
  border-radius: 10px;
  border: 1px solid var(--scrollbar-track);
}

#mobile-nav::-webkit-scrollbar-thumb:hover {
  background: var(--scrollbar-thumb-hover);
}

/* Firefox */
#mobile-nav {
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
}

</style>