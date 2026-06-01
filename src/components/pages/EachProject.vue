<template>
    <div class="min-h-screen bg-[var(--surface-bg)] text-[var(--surface-text)]">
        <section class="relative py-20 overflow-hidden" id="projects">
            <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <!-- ── Breadcrumb ── -->
                <nav class="flex mb-8" aria-label="Breadcrumb" data-aos="fade-down">
                    <ol class="inline-flex items-center space-x-1 md:space-x-3">
                        <li class="inline-flex items-center">
                            <router-link to="/#projects"
                                class="group inline-flex items-center text-sm font-medium text-gray-400 transition-all duration-300">
                                <div class="mr-2">
                                    <HomeIcon class="breadcrumb-home-icon w-4 h-4" />
                                </div>
                                <span class="breadcrumb-home-text">{{ t('home') }}</span>
                            </router-link>
                        </li>
                        <li class="flex items-center">
                            <router-link to="/projects"
                                class="group inline-flex items-center text-sm font-medium text-gray-400 transition-all duration-300">
                                <svg class="w-6 h-6 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="breadcrumb-home-text">{{ t('projects') }}</span>
                            </router-link>
                        </li>
                        <li>
                            <div class="flex items-center">
                                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="ml-1 text-sm font-semibold md:ml-2 text-transparent bg-clip-text"
                                    :style="{ backgroundImage: 'var(--logo-gradient)' }">
                                    <template v-for="project in projects" :key="project.id">
                                        <span v-if="projectId === null || project.id === projectId">
                                            {{ project.title }}
                                        </span>
                                    </template>
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <!-- ── Heading ── -->
                <div class="text-center mb-16" data-aos="fade-up">
                    <h2 class="text-4xl md:text-5xl font-bold text-[var(--surface-text)] mb-4">
                        {{ t('my1_') }}
                        <span class="text-transparent bg-clip-text"
                            :style="{ backgroundImage: 'var(--logo-gradient)' }">
                            {{ t('projects') }}
                        </span>{{ t('_my2') }}
                    </h2>
                    <p class="text-lg max-w-2xl mx-auto" :style="{ color: 'var(--accent-text)' }">
                        A Collection of my recent work and creative solutions
                    </p>
                </div>

                <!-- ── Project Cards ── -->
                <div class="space-y-24">
                    <div v-for="(project, pIndex) in projects" :key="project.id">
                        <div v-if="projectId === null || project.id === projectId"
                            class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                            <!-- ── Slideshow ── -->
                            <div class="lg:col-span-7 space-y-4">
                                <div
                                    class="relative group rounded-3xl overflow-hidden border border-white/10 bg-[ var(--surface-bg-3)] aspect-video">
                                    <transition name="fade" mode="out-in">
                                        <img :key="project.currentSlide" :src="project.slides[project.currentSlide]"
                                            class="w-full h-full object-cover" />
                                    </transition>

                                    <!-- Zoom button -->
                                    <button @click="openZoom(pIndex)"
                                        class="absolute top-4 right-4 z-30 p-3 rounded-xl bg-[var(--surface-bg)]/40 backdrop-blur-md border border-white/10 text-[var(--surface-text)] transition-all opacity-0 group-hover:opacity-100"
                                        :style="''"
                                        @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--accent-mid)'"
                                        @mouseleave="e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.40)'">
                                        <MagnifyingGlassPlusIcon class="w-5 h-5" />
                                    </button>

                                    <!-- Slide counter -->
                                    <div
                                        class="absolute bottom-6 left-6 z-20 bg-[var(--surface-bg)]/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                                        <span class="text-xs font-bold tracking-widest uppercase"
                                            :style="{ color: 'var(--accent-text-muted)' }">
                                            Slide {{ project.currentSlide + 1 }} / {{ project.slides.length }}
                                        </span>
                                    </div>

                                    <!-- Prev / Next arrows -->
                                    <div
                                        class="absolute inset-y-0 px-4 flex items-center justify-between w-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        <button @click="prevSlide(pIndex)"
                                            class="p-2 rounded-full bg-[var(--surface-bg)]/50 text-[var(--surface-text)] transition-all pointer-events-auto"
                                            @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--accent-mid)'"
                                            @mouseleave="e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.50)'">
                                            <ArrowLeftCircleIcon class="w-8 h-8" />
                                        </button>
                                        <button @click="nextSlide(pIndex)"
                                            class="p-2 rounded-full bg-[var(--surface-bg)]/50 text-[var(--surface-text)] transition-all pointer-events-auto"
                                            @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--accent-mid)'"
                                            @mouseleave="e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.50)'">
                                            <ArrowRightCircleIcon class="w-8 h-8" />
                                        </button>
                                    </div>
                                </div>

                                <!-- Thumbnails -->
                                <div class="flex gap-4 overflow-x-auto pb-4 pt-2 custom-scrollbar scroll-smooth">
                                    <div v-for="(slide, sIndex) in project.slides" :key="sIndex"
                                        :ref="el => { if (el) thumbRefs[pIndex + '-' + sIndex] = el }"
                                        @click="project.currentSlide = sIndex"
                                        class="flex-shrink-0 w-32 aspect-video rounded-xl border-2 overflow-hidden cursor-pointer transition-all"
                                        :style="project.currentSlide === sIndex
                                            ? { borderColor: 'var(--accent-mid)', transform: 'scale(0.95)', boxShadow: '0 4px 15px var(--accent-shadow)' }
                                            : { borderColor: 'rgba(255,255,255,0.10)', opacity: '0.4' }"
                                        @mouseenter="e => { if (project.currentSlide !== sIndex) e.currentTarget.style.opacity = '1' }"
                                        @mouseleave="e => { if (project.currentSlide !== sIndex) e.currentTarget.style.opacity = '0.4' }">
                                        <img :src="slide" class="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>

                            <!-- ── Info Panel ── -->
                            <div class="lg:col-span-5 space-y-6 pt-4">
                                <h3 class="text-4xl font-bold text-[var(--surface-text-sub)]">{{ project.title }}</h3>

                                <p class="text-lg leading-relaxed"
                                    :style="{ color: 'var(--surface-text-sub)', opacity: 0.7 }">
                                    {{ project.desc }}
                                </p>

                                <!-- Tech pills -->
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="tech in project.technolg" :key="tech.name"
                                        class="px-3 py-1 border rounded-lg text-xs font-medium" :style="tech.useAccent2
                                            ? { backgroundColor: 'var(--accent-border-2-soft)', borderColor: 'var(--accent-to-bg-hover)', color: 'var(--icon-accent-2)' }
                                            : { backgroundColor: 'var(--accent-bg)', borderColor: 'var(--accent-border)', color: 'var(--accent-text)' }
                                            ">
                                        {{ tech.name }}
                                    </span>
                                </div>

                                <!-- ── Links ── -->
                                <!-- Accent-tinted glass buttons: not plain white, not solid color -->
                                <div class="flex flex-wrap gap-4 pt-6">
                                    <a v-for="link in project.links" :key="link.name" :href="link.url"
                                        class="flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all duration-300"
                                        :style="link.useAccent2
                                            ? {
                                                backgroundColor: 'var(--accent-border-2-soft)',
                                                border: '1px solid var(--accent-border-2)',
                                                color: 'var(--icon-accent-2)',
                                            }
                                            : {
                                                backgroundColor: 'var(--accent-bg)',
                                                border: '1px solid var(--accent-border)',
                                                color: 'var(--accent-text)',
                                            }
                                            " @mouseenter="e => {
                                                if (link.useAccent2) {
                                                    e.currentTarget.style.backgroundColor = 'var(--accent-to-bg-hover)'
                                                    e.currentTarget.style.borderColor = 'var(--icon-accent-2)'
                                                    e.currentTarget.style.boxShadow = '0 4px 15px var(--accent-border-2)'
                                                } else {
                                                    e.currentTarget.style.backgroundColor = 'var(--accent-bg-hover)'
                                                    e.currentTarget.style.borderColor = 'var(--accent-text)'
                                                    e.currentTarget.style.boxShadow = '0 4px 15px var(--accent-shadow)'
                                                }
                                            }" @mouseleave="e => {
                                                if (link.useAccent2) {
                                                    e.currentTarget.style.backgroundColor = 'var(--accent-border-2-soft)'
                                                    e.currentTarget.style.borderColor = 'var(--accent-border-2)'
                                                    e.currentTarget.style.boxShadow = 'none'
                                                } else {
                                                    e.currentTarget.style.backgroundColor = 'var(--accent-bg)'
                                                    e.currentTarget.style.borderColor = 'var(--accent-border)'
                                                    e.currentTarget.style.boxShadow = 'none'
                                                }
                                            }">
                                        <component :is="link.icon" class="w-5 h-5" />
                                        {{ link.name }}
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ── Zoom Modal ── -->
        <transition name="scale">
            <div v-if="isZoomed"
                class="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--surface-bg)]/95 backdrop-blur-xl"
                tabindex="0">
                <button @click="isZoomed = false"
                    class="absolute top-8 right-8 z-[110] text-[var(--surface-text)]/50 hover:text-[var(--surface-text)] transition-colors">
                    <XMarkIcon class="w-10 h-10" />
                </button>
                <button @click="prevSlide(activeProjectIndex)" class="absolute left-8 z-[110] p-4 transition-all"
                    :style="{ color: 'rgba(255,255,255,0.30)' }"
                    @mouseenter="e => e.currentTarget.style.color = 'var(--accent-text)'"
                    @mouseleave="e => e.currentTarget.style.color = 'rgba(255,255,255,0.30)'">
                    <ArrowLeftIcon class="w-12 h-12" />
                </button>

                <div class="relative max-w-5xl w-full h-full flex flex-col items-center justify-center p-4">
                    <transition name="fade" mode="out-in">
                        <img :key="projects[activeProjectIndex].currentSlide"
                            :src="projects[activeProjectIndex].slides[projects[activeProjectIndex].currentSlide]"
                            class="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl" />
                    </transition>
                    <p class="mt-6 font-mono tracking-tighter uppercase text-sm"
                        :style="{ color: 'var(--accent-text-muted)' }">
                        Viewing Slide {{ projects[activeProjectIndex].currentSlide + 1 }} of
                        {{ projects[activeProjectIndex].slides.length }}
                    </p>
                </div>

                <button @click="nextSlide(activeProjectIndex)" class="absolute right-8 z-[110] p-4 transition-all"
                    :style="{ color: 'rgba(255,255,255,0.30)' }"
                    @mouseenter="e => e.currentTarget.style.color = 'var(--accent-text)'"
                    @mouseleave="e => e.currentTarget.style.color = 'rgba(255,255,255,0.30)'">
                    <ArrowRightIcon class="w-12 h-12" />
                </button>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
import {
    ArrowLeftCircleIcon, ArrowRightCircleIcon,
    ArrowLeftIcon, ArrowRightIcon,
    EyeIcon, CodeBracketIcon,
    MagnifyingGlassPlusIcon, XMarkIcon,
} from '@heroicons/vue/24/solid';
import { HomeIcon } from '@heroicons/vue/24/outline';
import { t } from './../../stores/languages.js';
import { useRoute } from 'vue-router';

const route = useRoute();
const projectId = ref(Number(route.params.id) || null);

const isZoomed = ref(false);
const activeProjectIndex = ref(0);
const thumbRefs = ref({});

// useAccent2: false → primary accent (blue side)
// useAccent2: true  → secondary accent (cyan side)
const projects = ref([
    {
        id: 1,
        title: 'Admin Dashboard',
        desc: 'Interactive gallery with auto-scrolling thumbnails and zoom navigation.',
        category: 'Dashboard',
        slides: [
            '../../../public/projects/admin-dashboard.png',
            '../../../public/projects/admin-dashboard-1.png',
            '../../../public/projects/admin-dashboard-2.png',
        ],
        currentSlide: 0,
        technolg: [
            { name: "React.js", useAccent2: false },
            { name: "Tailwind CSS", useAccent2: true },
        ],
        links: [
            { name: 'Live Demo', url: '#', icon: EyeIcon, useAccent2: false },
            { name: 'Code', url: '#', icon: CodeBracketIcon, useAccent2: true },
        ],
    },
    {
        id: 2,
        title: 'Portfolio Website',
        desc: 'Interactive gallery with auto-scrolling thumbnails and zoom navigation.',
        category: 'Portfolio',
        slides: [
            '../../../public/projects/portfolio-web.png',
            '../../../public/projects/portfolio-web-1.png',
            '../../../public/projects/portfolio-web-2.png',
            '../../../public/projects/portfolio-web-3.png',
            '../../../public/projects/portfolio-web-4.png',
        ],
        currentSlide: 0,
        technolg: [
            { name: "React.js", useAccent2: false },
            { name: "Tailwind CSS", useAccent2: true },
        ],
        links: [
            { name: 'Live Demo', url: '#', icon: EyeIcon, useAccent2: false },
            { name: 'Code', url: '#', icon: CodeBracketIcon, useAccent2: true },
        ],
    },
    {
        id: 3,
        title: 'Social Media Platform',
        desc: 'Interactive gallery with auto-scrolling thumbnails and zoom navigation.',
        category: 'Social',
        slides: [
            '../../../public/project3.png',
        ],
        currentSlide: 0,
        technolg: [
            { name: "Vue.js", useAccent2: false },
            { name: "D3.js", useAccent2: true },
            { name: "Express", useAccent2: false },
        ],
        links: [
            { name: 'Live Demo', url: '#', icon: EyeIcon, useAccent2: false },
            { name: 'Code', url: '#', icon: CodeBracketIcon, useAccent2: true },
        ],
    },
    {
        id: 4,
        title: 'Restaurant Website',
        desc: 'Interactive gallery with auto-scrolling thumbnails and zoom navigation.',
        category: 'social',
        slides: [
            '../../../public/project4.png',
        ],
        currentSlide: 0,
        technolg: [
            { name: "React", useAccent2: false },
            { name: "Socket.io", useAccent2: true },
            { name: "PostgreSQL", useAccent2: false },
        ],
        links: [
            { name: 'Live Demo', url: '#', icon: EyeIcon, useAccent2: false },
            { name: 'Code', url: '#', icon: CodeBracketIcon, useAccent2: true },
        ],
    },
    {
        id: 5,
        title: 'Loyalty Program',
        desc: 'Interactive gallery with auto-scrolling thumbnails and zoom navigation.',
        category: 'Loyalty',
        slides: [
            '../../../public/projects/loyalty-program.png',
            '../../../public/projects/loyalty-program-0.png',
            '../../../public/projects/loyalty-program-1.png',
            '../../../public/projects/loyalty-program-2.png',
            '../../../public/projects/loyalty-program-3.png',
            '../../../public/projects/loyalty-program-4.png',
            '../../../public/projects/loyalty-program-5.png',
            '../../../public/projects/loyalty-program-6.png',
            '../../../public/projects/loyalty-program-7.png',
            '../../../public/projects/loyalty-program-8.png',
            '../../../public/projects/loyalty-program-9.png',
            '../../../public/projects/loyalty-program-10.png',
        ],
        currentSlide: 0,
        technolg: [
            { name: "Vue.js", useAccent2: false },
            { name: "D3.js", useAccent2: true },
            { name: "Express", useAccent2: false },
        ],
        links: [
            { name: 'Live Demo', url: 'https://loyalty.gpas.co/en-us/admin', icon: EyeIcon, useAccent2: false },
            { name: 'Code', url: '#', icon: CodeBracketIcon, useAccent2: true },
        ],
    },
    {
        id: 6,
        title: 'Spider15 - Classified Ads',
        desc: 'Interactive gallery with auto-scrolling thumbnails and zoom navigation.',
        category: 'Social',
        slides: [
            '../../../public/projects/spider15.png',
            '../../../public/projects/spider15-0.png',
            '../../../public/projects/spider15-1.png',
            '../../../public/projects/spider15-2.png',
            '../../../public/projects/spider15-3.png',
            '../../../public/projects/spider15-4.png',
            '../../../public/projects/spider15-5.png',
            '../../../public/projects/spider15-6.png',
            '../../../public/projects/spider15-7.png',
            '../../../public/projects/spider15-8.png',
            '../../../public/projects/spider15-9.png',
            '../../../public/projects/spider15-10.png',
        ],
        currentSlide: 0,
        technolg: [
            { name: "Laravel", useAccent2: true },
            { name: "Blade", useAccent2: false },
            { name: "Bootstrap", useAccent2: true },
            { name: "MySQL", useAccent2: false },
            { name: "REST APIs", useAccent2: true },
            { name: "Postman", useAccent2: false },
            { name: "DigitalOcean", useAccent2: true },
        ],
        links: [
            { name: 'Live Demo', url: 'https://spider15.com/', icon: EyeIcon, useAccent2: false },
            { name: 'Code', url: '#', icon: CodeBracketIcon, useAccent2: true },
        ],
    },
    {
        id: 6,
        title: 'Spider15 - Classified Ads',
        desc: 'Interactive gallery with auto-scrolling thumbnails and zoom navigation.',
        category: 'Social',
        slides: [
            '../../../public/projects/spider15.png',
            '../../../public/projects/spider15-0.png',
            '../../../public/projects/spider15-1.png',
            '../../../public/projects/spider15-2.png',
            '../../../public/projects/spider15-3.png',
            '../../../public/projects/spider15-4.png',
            '../../../public/projects/spider15-5.png',
            '../../../public/projects/spider15-6.png',
            '../../../public/projects/spider15-7.png',
            '../../../public/projects/spider15-8.png',
            '../../../public/projects/spider15-9.png',
            '../../../public/projects/spider15-10.png',
        ],
        currentSlide: 0,
        technolg: [
            { name: "Laravel", useAccent2: true },
            { name: "Blade", useAccent2: false },
            { name: "Bootstrap", useAccent2: true },
            { name: "MySQL", useAccent2: false },
            { name: "REST APIs", useAccent2: true },
            { name: "Postman", useAccent2: false },
            { name: "DigitalOcean", useAccent2: true },
        ],
        links: [
            { name: 'Live Demo', url: 'https://spider15.com/', icon: EyeIcon, useAccent2: false },
            { name: 'Code', url: '#', icon: CodeBracketIcon, useAccent2: true },
        ],
    },
    {
        id: 7,
        title: 'Tinode',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        category: 'Loyalty',
        slides: [
            '../../../public/projects/spider15.png',
        ],
        technolg: [
            { name: "Tinode", useAccent2: false },
            { name: "REST APIs", useAccent2: true },
            { name: "Postman", useAccent2: false },
        ],
        links: [
            { name: "Live Demo", url: "#", icon: EyeIcon, useAccent2: false },
            { name: "Code", url: "#", icon: CodeBracketIcon, useAccent2: true },
        ],
    },
    {
        id: 8,
        title: 'Mautic - Email Marketing',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        category: 'Social',
        slides: [
            '../../../public/projects/mautic.png',
        ],
        technolg: [
            { name: "Mautic", useAccent2: true },
            { name: "REST APIs", useAccent2: false },
            { name: "Email SMTP", useAccent2: true },
            { name: "Symfony", useAccent2: false },
            { name: "MySQL", useAccent2: true },
            { name: "Postman", useAccent2: false },
        ],
        links: [
            { name: "Live Demo", url: "https://marketing.gpas.co/s/", icon: EyeIcon, useAccent2: false },
            { name: "Code", url: "#", icon: CodeBracketIcon, useAccent2: true },
        ],
    },
]);

// ── Slide logic ─────────────────────────────────────────────
const syncThumbScroll = async (pIndex, sIndex) => {
    await nextTick();
    const target = thumbRefs.value[`${pIndex}-${sIndex}`];
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
};

const nextSlide = (index) => {
    const p = projects.value[index];
    p.currentSlide = (p.currentSlide + 1) % p.slides.length;
    syncThumbScroll(index, p.currentSlide);
};

const prevSlide = (index) => {
    const p = projects.value[index];
    p.currentSlide = (p.currentSlide - 1 + p.slides.length) % p.slides.length;
    syncThumbScroll(index, p.currentSlide);
};

watch(() => projects.value.map(p => p.currentSlide), (newVals, oldVals) => {
    newVals.forEach((val, idx) => { if (val !== oldVals[idx]) syncThumbScroll(idx, val); });
}, { deep: true });

const openZoom = (index) => { activeProjectIndex.value = index; isZoomed.value = true; };

const handleKeydown = (e) => {
    if (!isZoomed.value) return;
    if (e.key === 'ArrowRight') nextSlide(activeProjectIndex.value);
    if (e.key === 'ArrowLeft') prevSlide(activeProjectIndex.value);
    if (e.key === 'Escape') isZoomed.value = false;
};

onMounted(() => window.addEventListener('keydown', handleKeydown));
onUnmounted(() => window.removeEventListener('keydown', handleKeydown));
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.scale-enter-from,
.scale-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

/* Themed scrollbar */
.custom-scrollbar::-webkit-scrollbar {
    height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: var(--logo-gradient);
    border-radius: 10px;
}

.custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: var(--accent-text) rgba(255, 255, 255, 0.05);
}

/* Breadcrumb hover — text */
.group:hover .breadcrumb-home-text {
    background: var(--logo-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 600;
}

/* Breadcrumb hover — icon */
.group:hover .breadcrumb-home-icon {
    background: var(--logo-gradient);
    -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>') no-repeat center;
    mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>') no-repeat center;
    -webkit-mask-size: contain;
    mask-size: contain;
    color: transparent;
}
</style>