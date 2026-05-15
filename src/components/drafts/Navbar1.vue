<template>
  <div 
    class="hidden md:block fixed top-0 left-0 w-full h-4 z-50" 
    @mouseenter="showNavbar = true"
  ></div>

  <header 
    :class="[
      'fixed top-0 left-0 w-full transition-all duration-500 ease-in-out z-40',
      // PC Logic: Slide up/down based on hover. Mobile Logic: Always visible/fixed.
      showNavbar ? 'translate-y-0 opacity-100' : 'md:-translate-y-full md:opacity-0'
    ]"
    @mouseleave="handleMouseLeave"
  >
    <div class="flex justify-between items-center p-6 bg-black/80 backdrop-blur-md md:bg-transparent">
      
      <div class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        Dev <span class="font-black">Portfolio</span>
      </div>

      <div class="md:hidden z-30">
        <button type="button"
          class="block focus:outline-none p-2 rounded-lg bg-blue-800/50 hover:bg-blue-700/50"
          @click="isMenuOpen = !isMenuOpen">
          <div class="relative w-6 h-6">
            <span :class="[`absolute left-0 w-6 h-0.5 bg-blue-200 transition-all duration-300`, isMenuOpen ? 'rotate-45 top-3 ' : 'top-1']"></span>
            <span :class="[`absolute left-0 w-6 h-0.5 bg-blue-200 transition-all duration-300`, isMenuOpen ? 'opacity-0 ' : 'top-3 opacity-100']"></span>
            <span :class="[`absolute left-0 w-6 h-0.5 bg-blue-200 transition-all duration-300`, isMenuOpen ? '-rotate-45 top-3 ' : 'top-5']"></span>
          </div>
        </button>
      </div>

      <nav :class="[
          `fixed inset-0 z-20 flex flex-col items-center justify-center bg-[#111827] md:relative md:bg-transparent md:flex md:flex-row`, 
          isMenuOpen ? 'flex' : 'hidden'
        ]">
        <ul class="flex flex-col items-center space-y-5 md:flex-row md:space-x-5 md:space-y-0">
          <li v-for="item in Menu" :key="item.name" class="group relative">
            <a :href="item.href"
              class="relative block text-blue-100 hover:text-blue-400 transition-all duration-300 text-xl md:text-base font-medium group" 
              @click.prevent="scrollToSection(item.href)">
              {{ item.name }}
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
        </ul>
        <div class="mt-8 md:mt-0 md:ml-8">
          <button class="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
            Let's Talk
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const Menu = ref([
  {name: 'Home', href:'#home_hero'},
  {name:'Services', href:'#services'},
  {name:'About Me', href:'#about'},
  {name:'Skills', href:'#skills'},
  {name:'Projects', href:'#projects'},
  {name:'Testimonials', href:'#testimonials'},
  {name:'Contacts', href:'#contacts'}
]);

const isMenuOpen = ref(false);
const showNavbar = ref(true); // Default to true so it's visible at the start

// Handle scroll: Show navbar when at the very top, hide it when scrolling down
const handleScroll = () => {
  if (window.scrollY < 50) {
    showNavbar.value = true;
  } else if (!isMenuOpen.value) {
    showNavbar.value = false;
  }
};

const handleMouseLeave = () => {
  // Only hide on mouse leave if we aren't at the very top
  if (window.scrollY > 50) {
    showNavbar.value = false;
  }
};

const scrollToSection = (href) => {
  isMenuOpen.value = false;
  const section = document.querySelector(href);
  if(section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>