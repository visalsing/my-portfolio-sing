<template>
    <section class="relative py-20 bg-black overflow-hidden" id="portfolio-map">
        <div
            class="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem]">
        </div>
        <div
            class="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none">
        </div>

        <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            <nav class="flex mb-12" aria-label="Breadcrumb" data-aos="fade-down">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                    <li class="inline-flex items-center">
                        <router-link to="/"
                            class="group inline-flex items-center text-xs font-bold tracking-wider text-gray-400 hover:text-white transition-all duration-300">
                            <div class="mr-2">
                                <HomeIcon class="breadcrumb-home-icon w-4 h-4 text-gray-400" />
                            </div>
                            <span class="breadcrumb-home-text">{{ t('home') }}</span>
                        </router-link>
                    </li>
                    <li class="flex items-center">
                        <router-link to="/map"
                            class="group inline-flex items-center text-xs font-bold tracking-wider text-gray-400 hover:text-white transition-all duration-300">
                            <svg class="w-4 h-4 text-gray-600 mr-2 group-hover:text-white transition-colors duration-300"
                                fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                            <span class="breadcrumb-home-text">{{ t('portfolio_map') }}</span>
                        </router-link>
                    </li>
                </ol>
            </nav>

            <div class="text-center mb-20" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
                    {{ t('portfolio_') }}
                    <span class="text-transparent bg-clip-text" :style="{ backgroundImage: 'var(--logo-gradient)' }">{{
                        t('map') }}</span>
                </h2>
                <p class="text-sm md:text-base tracking-widest max-w-xl mx-auto font-bold text-gray-400"
                    data-aos="fade-up" data-aos-delay="100">
                    Structural directory of system modules and navigation nodes.
                </p>
            </div>

            <div class="bg-[#0c0d12] border-2 border-gray-800 rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/5 max-w-3xl mx-auto"
                data-aos="fade-up">

                <div
                    class="flex items-center justify-between px-6 py-4 bg-[#06070a] border-b border-gray-800 select-none">
                    <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 rounded-full bg-red-500/40 border border-red-500/60"></div>
                        <div class="w-3 h-3 rounded-full bg-yellow-500/40 border border-yellow-500/60"></div>
                        <div class="w-3 h-3 rounded-full bg-green-500/40 border border-green-500/60"></div>
                    </div>
                    <div class="text-xs font-mono tracking-widest text-gray-400 font-bold">
                        system_architecture.map</div>
                    <div class="w-16"></div>
                </div>

                <div class="p-6 md:p-10 font-mono text-sm md:text-base text-gray-300 space-y-1 select-none">

                    <div class="flex items-center space-x-3 pb-5 border-b border-gray-800 mb-6">
                        <div class="p-2 rounded-lg bg-gray-900 border border-gray-700 text-white">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-18 0A2.25 2.25 0 002.25 15v4.5a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25V15a2.25 2.25 0 00-2.25-2.25m-18 0h18" />
                            </svg>
                        </div>
                        <span class="text-white font-bold tracking-wider text-base md:text-lg">root/portfolio/</span>
                    </div>

                    <div class="space-y-1">
                        <template v-for="(route, rIdx) in mapNodes" :key="route.name">

                            <div
                                class="flex items-center group py-2 px-3 rounded-xl hover:bg-white/[0.04] transition-all duration-200">
                                <span
                                    class="text-gray-500 font-bold tracking-normal mr-4 w-12 flex-shrink-0 group-hover:text-gray-300 transition-colors duration-200">
                                    {{ rIdx === mapNodes.length - 1 ? '└──' : '├──' }}
                                </span>

                                <div
                                    class="mr-3 text-gray-400 group-hover:text-white transition-colors duration-300 dynamic-icon-color">
                                    <svg v-if="route.subDir" class="w-4 h-4" fill="none" stroke="currentColor"
                                        stroke-width="2.5" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M2.25 12V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44.505.75 1.05.75h9.382A2.25 2.25 0 0121.75 10.5V12m-19.5 0h19.5m-19.5 0v7.5A2.25 2.25 0 004.5 21.75h15a2.25 2.25 0 002.25-2.25V12" />
                                    </svg>
                                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                </div>

                                <router-link :to="route.path"
                                    class="relative font-bold tracking-wide transition-all duration-300 pl-0 group-hover:pl-3 flex items-center">
                                    <span
                                        class="absolute left-0 top-1 bottom-1 w-[2px] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center rounded-full"
                                        :style="{ background: 'var(--logo-gradient)' }">
                                    </span>

                                    <span class="text-white group-hover:gradient-text transition-all duration-300">
                                        {{ route.name }}
                                    </span>
                                </router-link>
                            </div>

                            <template v-if="route.subDir">
                                <div v-for="(sub, sIdx) in route.subDir" :key="sub.name"
                                    class="flex items-center group py-2 px-3 rounded-xl hover:bg-white/[0.04] transition-all duration-200">
                                    <span
                                        class="text-gray-500 font-bold tracking-normal mr-4 w-12 flex-shrink-0 group-hover:text-gray-300 transition-colors duration-200">
                                        │&nbsp;&nbsp;&nbsp;&nbsp;{{ sIdx === route.subDir.length - 1 ? '└──' : '├──' }}
                                    </span>

                                    <div class="w-2 h-2 rounded-full bg-gray-700 transition-all duration-300 mr-4 ml-1.5 dynamic-bullet"
                                        :style="{ '--bullet-gradient': 'var(--logo-gradient)' }"></div>

                                    <router-link :to="sub.path"
                                        class="text-gray-300 font-semibold tracking-wide group-hover:text-white transition-colors duration-200">
                                        {{ sub.name }}
                                    </router-link>
                                </div>
                            </template>

                        </template>
                    </div>
                </div>
            </div>

            <div class="text-center mt-16" data-aos="fade-up" data-aos-delay="400">
                <div class="inline-flex flex-col sm:flex-row gap-4 items-center">
                    <router-link :to="backPath"
                        class="px-8 py-4 rounded-xl text-white text-sm tracking-widest font-black transition-all duration-300 hover:scale-[1.03] border-2 border-white/10 flex items-center backdrop-blur-md shadow-lg"
                        :style="{ background: 'var(--cta-gradient)' }"
                        @mouseenter="e => e.currentTarget.style.boxShadow = '0 12px 35px var(--accent-shadow)'"
                        @mouseleave="e => e.currentTarget.style.boxShadow = 'none'">
                        <ArrowLeftCircleIcon class="w-5 h-5 mr-2" />
                        {{ t('click_to_return') }}
                    </router-link>
                </div>
            </div>

        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { t } from './../../stores/languages.js';
import { HomeIcon, ArrowLeftCircleIcon } from '@heroicons/vue/24/outline';

const mapNodes = ref([
    { name: 'Home', path: '/' },
    {
        name: 'About',
        path: '/about',
        subDir: [
            { name: 'Details', path: '/about/details' }
        ]
    },
    {
        name: 'Skills',
        path: '/skills',
        subDir: [
            { name: 'Tech Stack', path: '/skills/tech-stack' },
            { name: 'Soft Skills', path: '/skills/soft-skills' }
        ]
    },
    {
        name: 'Services',
        path: '/services',
        subDir: [
            { name: 'All Services', path: '/services/all' }
        ]
    },
    {
        name: 'Projects',
        path: '/projects',
        subDir: [
            { name: 'All Projects', path: '/projects/all' }
        ]
    },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contacts', path: '/contacts' },
    { name: 'Settings', path: '/settings' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-of-service' },
    { name: 'FAQs', path: '/faqs' }
]);

const router = useRouter();
const backPath = ref('/');

onMounted(() => {
    const previousPath = window.history.state?.back;
    if (previousPath) {
        backPath.value = previousPath;
    }
});
</script>

<style scoped>
/* High Contrast Tree Text Hover State to use Global Logo Gradient safely */
.group:hover .group-hover\:text-transparent {
    -webkit-background-clip: text !important;
    background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
}

/* Sub-Directory active bullet point background transition logic */
.group:hover .dynamic-bullet {
    background: var(--bullet-gradient);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
}

/* Breadcrumb hover — text gradient */
.group:hover .breadcrumb-home-text {
    background: var(--logo-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* Breadcrumb hover — icon gradient mask */
.group:hover .breadcrumb-home-icon {
    background: var(--logo-gradient);
    -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>') no-repeat center;
    mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>') no-repeat center;
    -webkit-mask-size: contain;
    mask-size: contain;
    color: transparent;
}
</style>