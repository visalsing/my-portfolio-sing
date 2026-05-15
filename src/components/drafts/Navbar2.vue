<template>
    <div 
        class="hidden md:block fixed top-0 left-0 w-full h-3 z-[60]" 
        @mouseenter="isHovering = true"
    ></div>

    <header 
        :class="[
            isScrolled ? 'fixed top-0 left-0 w-full z-50' : 'relative z-20',
            'transition-all duration-500 ease-in-out',
            // Show header if: menu is open OR at top of page OR hovering at top
            (isMenuOpen || !isScrolled || isHovering) ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        ]"
        @mouseleave="isHovering = false"
    >
        <div :class="[
            'flex justify-between items-center p-6 transition-all duration-300',
            isScrolled || isMenuOpen ? 'bg-black/95 backdrop-blur-xl' : 'bg-transparent'
        ]">
            
            <div class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Dev <span class="font-black">Portfolio</span>
            </div>

            <div class="md:hidden z-[60]">
                <button type="button"
                    class="block focus:outline-none p-2 rounded-lg bg-blue-800/50 hover:bg-blue-700/50 transition-all duration-300"
                    @click="isMenuOpen = !isMenuOpen">
                    <div class="relative w-6 h-6">
                        <span :class="['absolute left-0 w-6 h-0.5 bg-blue-200 transition-all duration-300', isMenuOpen ? 'rotate-45 top-3' : 'top-1']"></span>
                        <span :class="['absolute left-0 w-6 h-0.5 bg-blue-200 transition-all duration-300', isMenuOpen ? 'opacity-0' : 'top-3 opacity-100']"></span>
                        <span :class="['absolute left-0 w-6 h-0.5 bg-blue-200 transition-all duration-300', isMenuOpen ? '-rotate-45 top-3' : 'top-5']"></span>
                    </div>
                </button>
            </div>

            <nav :class="[
                // Mobile: Full screen overlay
                'fixed inset-0 min-h-screen bg-[#0a0f1a]/98 flex flex-col items-center justify-center transition-all duration-500 ease-in-out',
                // Desktop: Standard horizontal nav
                'md:static md:min-h-0 md:bg-transparent md:flex-row md:flex md:w-auto',
                // Toggle Logic
                isMenuOpen ? 'translate-x-0 opacity-100' : 'max-md:translate-x-full max-md:opacity-0 md:opacity-100'
            ]">
                <ul class="flex flex-col items-center space-y-8 md:flex-row md:space-x-8 md:space-y-0">
                    <li v-for="item in Menu" :key="item.name" class="group">
                        <a :href="item.href"
                            class="relative block text-blue-100 hover:text-blue-400 transition-colors duration-300 text-2xl md:text-base font-medium" 
                            @click="scrollToSection($event, item.href)">
                            {{ item.name }}
                            <span class="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    </li>
                </ul>

                <div class="mt-10 md:mt-0 md:ml-8">
                    <button class="px-8 py-3 md:px-6 md:py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full hover:scale-105 active:scale-95 transition-all font-semibold shadow-lg shadow-blue-500/20">
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

/**
 * FIX: Watch isMenuOpen to prevent body scrolling when 
 * the mobile menu is active. This keeps the user focused on the menu.
 */
watch(isMenuOpen, (open) => {
    if (open) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

const handleScroll = () => {
    // Threshold of 50px to change header background
    isScrolled.value = window.scrollY > 50;
};

/**
 * FIX: Handlers for navigation
 * 1. Prevent default anchor behavior
 * 2. Close menu IMMEDIATELY so user can see the scroll animation
 * 3. Use smooth scroll API
 */
const scrollToSection = (event, href) => {
    event.preventDefault(); // Stop immediate jump
    
    // Close mobile menu
    isMenuOpen.value = false;
    isHovering.value = false;
    
    // Perform smooth scroll
    const targetId = href.replace('#', '');
    const section = document.getElementById(targetId);
    
    if (section) {
        // We use a slight timeout if the menu transition is very slow, 
        // but with duration-500, immediate call works best.
        section.scrollIntoView({ behavior: 'smooth' });
        
        // Update URL without jumping
        window.history.pushState(null, null, href);
    }
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    // Cleanup body scroll if component unmounts
    document.body.style.overflow = '';
});
</script>

<style scoped>
/* Ensure the smooth scroll works even if JS fails */
html {
    scroll-behavior: smooth;
}
</style>