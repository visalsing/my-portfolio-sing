<template>
    <div 
        class="hidden lg:block fixed top-0 left-0 w-full h-3 z-[70]" 
        @mouseenter="isHovering = true"
    ></div>

    <header 
        :class="[
            (isScrolled || isMenuOpen) ? 'fixed top-0 left-0 w-full z-50' : 'relative z-20',
            'transition-all duration-500 ease-in-out',
            (isMenuOpen || !isScrolled || isHovering) 
                ? 'translate-y-0 opacity-100' 
                : 'max-lg:translate-y-0 max-lg:opacity-100 -translate-y-full opacity-0'
        ]"
        @mouseleave="isHovering = false"
    >
        <div :class="[
            'flex justify-between items-center p-4 lg:p-6 transition-all duration-300',
            isScrolled || isMenuOpen ? 'bg-black/95 backdrop-blur-xl' : 'bg-transparent'
        ]">
            
            <div class="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Dev <span class="font-black">Portfolio</span>
            </div>

            <div class="lg:hidden z-[100]">
                <button type="button"
                    class="block focus:outline-none p-2 rounded-lg bg-blue-900/40 hover:bg-blue-800/60 transition-all duration-300"
                    @click="isMenuOpen = !isMenuOpen">
                    <div class="relative w-6 h-6">
                        <span :class="['absolute left-0 w-6 h-0.5 bg-blue-200 transition-all duration-300', isMenuOpen ? 'rotate-45 top-3' : 'top-1']"></span>
                        <span :class="['absolute left-0 w-6 h-0.5 bg-blue-200 transition-all duration-300', isMenuOpen ? 'opacity-0' : 'top-3 opacity-100']"></span>
                        <span :class="['absolute left-0 w-6 h-0.5 bg-blue-200 transition-all duration-300', isMenuOpen ? '-rotate-45 top-3' : 'top-5']"></span>
                    </div>
                </button>
            </div>

            <nav :class="[
                'fixed inset-0 min-h-screen bg-[#0a0f1a] flex flex-col items-center justify-center transition-all duration-500 ease-in-out z-[90]',
                'lg:static lg:min-h-0 lg:bg-transparent lg:flex-row lg:flex lg:w-auto lg:z-auto',
                isMenuOpen ? 'translate-x-0 opacity-100' : 'max-lg:translate-x-full max-lg:opacity-0 lg:opacity-100'
            ]">
                <ul class="flex flex-col items-center space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
                    <li v-for="item in Menu" :key="item.name" class="group">
                        <a :href="item.href"
                            class="relative block text-blue-100 hover:text-blue-400 transition-colors duration-300 text-2xl lg:text-base font-medium" 
                            @click="scrollToSection($event, item.href)">
                            {{ item.name }}
                            <span class="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    </li>
                </ul>
                <div class="mt-10 lg:mt-0 lg:ml-8">
                    <button class="px-10 py-3 lg:px-6 lg:py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-bold shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform">
                        Let's Talk
                    </button>
                </div>
            </nav>
        </div>
    </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const Menu = ref([
    { name: 'Home', href: '#home_hero' },
    { name: 'About Me', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contacts', href: '#contacts' }
]);

const isMenuOpen = ref(false);
const isScrolled = ref(false);
const isHovering = ref(false);

watch(isMenuOpen, (open) => {
    document.body.style.overflow = open ? 'hidden' : '';
});

const handleScroll = () => {
    isScrolled.value = window.scrollY > 50;
};

const scrollToSection = (event, href) => {
    event.preventDefault();
    isMenuOpen.value = false;
    isHovering.value = false;
    
    if (href === '#home_hero') {
        // Fix: Force Home to scroll to the very top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        const targetId = href.replace('#', '');
        const section = document.getElementById(targetId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
    window.history.pushState(null, null, href);
};

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<style scoped>
html { scroll-behavior: smooth; }

/* This ensures that when you click 'About', the sticky header 
   doesn't cover the title. 
*/
section {
    scroll-margin-top: 80px;
}
</style>