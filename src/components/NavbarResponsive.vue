<template>
    <header :class="[
        'w-full z-[100] transition-all duration-300 p-6 flex justify-between items-center',
        'fixed top-0 left-0 nav:relative nav:top-auto nav:left-auto nav:z-20',
        isMenuOpen ? 'bg-transparent' : 'bg-[#111827]/50 backdrop-blur-md nav:bg-transparent nav:backdrop-blur-none'
    ]">
        <div class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent relative z-[110]">
            Dev <span class="font-black">Portfolio</span>
        </div>

        <div class="nav:hidden relative z-[110]">
            <button type="button"
                class="block focus:outline-none p-2 rounded-lg bg-blue-800/50 backdrop-blur-sm border border-blue-400/20 hover:bg-blue-700/50 transition-all duration-300 shadow-lg"
                @click="isMenuOpen = !isMenuOpen">
                <div class="relative w-6 h-6">
                    <span :class="['absolute left-0 w-6 h-0.5 bg-blue-200 transition-all duration-300', isMenuOpen ? 'rotate-45 top-3' : 'top-1']"></span>
                    <span :class="['absolute left-0 w-6 h-0.5 bg-blue-200 transition-all duration-300', isMenuOpen ? 'opacity-0' : 'top-3 opacity-100']"></span>
                    <span :class="['absolute left-0 w-6 h-0.5 bg-blue-200 transition-all duration-300', isMenuOpen ? '-rotate-45 top-3' : 'top-5']"></span>
                </div>
            </button>
        </div>

        <nav :class="[
            'fixed inset-0 z-[80] flex flex-col items-center justify-center bg-[#111827] transition-all duration-500 ease-in-out',
            'nav:relative nav:bg-transparent nav:flex nav:justify-between nav:flex-row nav:inset-auto nav:translate-y-0',
            isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 nav:opacity-100'
        ]">
            <ul class="flex flex-col items-center space-y-6 nav:flex-row nav:space-x-5 nav:space-y-0">
                <li v-for="item in Menu" :key="item.name" class="group relative">
                    <a :href="item.href"
                       :class="[
                           'relative block transition-all duration-300 text-xl nav:text-sm font-medium tracking-wide group',
                           activeSection === item.href ? 'text-blue-400' : 'text-blue-100 hover:text-blue-400'
                       ]"
                       @click.prevent="scrollToSection(item.href)">
                        {{ item.name }}
                        <span :class="[
                            'absolute -bottom-1 left-0 h-0.5 bg-blue-400 transition-all duration-300',
                            activeSection === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                        ]"></span>
                    </a>
                </li>
            </ul>
            <div class="mt-10 nav:mt-0 nav:ml-8">
                <button class="px-7 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 text-base nav:text-sm">
                    Let's Talk
                </button>
            </div>
        </nav>
    </header>

    <div
        class="fixed top-0 left-0 w-full h-4 z-[60] hidden nav:block"
        @mouseenter="isHoveringTop = true"
    ></div>

    <header
        :class="[
            'fixed top-0 left-0 w-full z-50 transition-all duration-500 transform hidden nav:flex',
            (isStickyVisible && isHoveringTop) ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        ]"
        class="justify-between items-center p-6 bg-[#111827]/90 backdrop-blur-md shadow-2xl"
        @mouseleave="isHoveringTop = false"
    >
        <div class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Dev <span class="font-black">Portfolio</span>
        </div>

        <nav class="flex items-center">
            <ul class="flex flex-row space-x-5">
                <li v-for="item in Menu" :key="item.name" class="group relative">
                    <a :href="item.href"
                       :class="[
                           'relative block transition-all duration-300 text-sm font-medium tracking-wide group',
                           activeSection === item.href ? 'text-blue-400' : 'text-blue-100 hover:text-blue-400'
                       ]"
                       @click.prevent="scrollToSection(item.href)">
                        {{ item.name }}
                        <span :class="[
                            'absolute -bottom-1 left-0 h-0.5 bg-blue-400 transition-all duration-300',
                            activeSection === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                        ]"></span>
                    </a>
                </li>
            </ul>
            <div class="ml-8">
                <button class="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 text-sm">
                    Let's Talk
                </button>
            </div>
        </nav>
    </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const Menu = ref([
    { name: 'Home',         href: '#home_hero' },
    { name: 'About Me',     href: '#about' },
    { name: 'Skills',       href: '#skills' },
    { name: 'Services',     href: '#services' },
    { name: 'Projects',     href: '#projects' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contacts',     href: '#contacts' },
    { name: 'Settings',     href: '/settings' },
]);

const isMenuOpen     = ref(false);
const isStickyVisible = ref(false);
const isHoveringTop  = ref(false);
const activeSection  = ref('#home_hero');

watch(isMenuOpen, (newVal) => {
    document.body.style.overflow = newVal ? 'hidden' : '';
});

const handleScroll = () => {
    isStickyVisible.value = window.scrollY > 400;
    const scrollPosition = window.scrollY + 100;

    Menu.value.forEach((item) => {
        if (item.href.startsWith('#')) {
            const section = document.querySelector(item.href);
            if (section) {
                const top    = section.offsetTop;
                const height = section.offsetHeight;
                if (scrollPosition >= top && scrollPosition < top + height) {
                    activeSection.value = item.href;
                }
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
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    document.body.style.overflow = '';
});
</script>