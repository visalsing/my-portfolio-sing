<template>
    <div class="min-h-screen bg-black text-white">
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
                        <li>
                            <div class="flex items-center">
                                <svg class="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="ml-1 text-sm font-semibold md:ml-2 text-transparent bg-clip-text"
                                    :style="{ backgroundImage: 'var(--logo-gradient)' }">{{ t('projects') }}</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <!-- ── Heading ── -->
                <div class="text-center mb-16" data-aos="fade-up">
                    <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
                        My
                        <span class="text-transparent bg-clip-text"
                            :style="{ backgroundImage: 'var(--logo-gradient)' }">
                            Projects
                        </span>
                    </h2>
                    <p class="text-lg max-w-2xl mx-auto" :style="{ color: 'var(--accent-text-muted)' }">
                        A Collection of my recent work and creative solutions
                    </p>
                </div>

                <!-- ── Filter Pills ── -->
                <div class="mt-12 mb-12">
                    <h4 class="text-xl font-bold text-white mb-6">Filter</h4>
                    <div class="flex flex-wrap gap-3">
                        <span v-for="tech in techStack" :key="tech" @click="selectedFilter = tech.toLowerCase()"
                            class="px-4 py-2 rounded-full text-sm font-medium cursor-pointer hover:scale-105 transition-all duration-300"
                            :style="selectedFilter === tech.toLowerCase()
                                ? {
                                    background: 'var(--cta-gradient)',
                                    color: '#fff',
                                    border: '1px solid transparent'
                                }
                                : {
                                    backgroundColor: 'var(--accent-bg)',
                                    border: '1px solid var(--accent-border)',
                                    color: 'var(--accent-text-muted)'
                                }"
                            @mouseenter="e => { if (selectedFilter !== tech.toLowerCase()) e.currentTarget.style.backgroundColor = 'var(--accent-bg-hover)' }"
                            @mouseleave="e => { if (selectedFilter !== tech.toLowerCase()) e.currentTarget.style.backgroundColor = 'var(--accent-bg)' }">
                            {{ tech }}
                        </span>
                    </div>
                </div>

                <!-- ── Projects Grid ── -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div v-for="(project, index) in filteredProjects" :key="project.id"
                        class="group relative rounded-3xl overflow-hidden backdrop-blur-sm transition-all duration-500 hover:-translate-y-2"
                        :data-aos-delay="(index + 1) * 100" :style="{
                            background: 'linear-gradient(to bottom right, rgba(31,41,55,0.50), var(--section-grad-to))',
                            border: `1px solid ${project.useAccent2 ? 'var(--accent-border-2-soft)' : 'var(--section-border)'}`
                        }" @mouseenter="e => e.currentTarget.style.borderColor = 'var(--accent-border-hover)'"
                        @mouseleave="e => e.currentTarget.style.borderColor = project.useAccent2 ? 'var(--accent-border-2-soft)' : 'var(--section-border)'">
                        <!-- Image -->
                        <div class="relative overflow-hidden">
                            <img :src="project.image" :alt="project.title"
                                class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent">
                            </div>

                            <!-- Category badge -->
                            <div class="absolute top-4 right-4">
                                <span class="px-3 py-1 text-white text-xs rounded-full font-semibold"
                                    :style="{ backgroundColor: project.useAccent2 ? 'var(--accent-to-mid)' : 'var(--accent-mid)' }">
                                    {{ project.category }}
                                </span>
                            </div>
                        </div>

                        <!-- Content -->
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-white mb-2 transition-colors duration-300"
                                @mouseenter="e => e.currentTarget.style.color = 'var(--accent-text)'"
                                @mouseleave="e => e.currentTarget.style.color = 'white'">
                                {{ project.title }}
                            </h3>
                            <p class="text-blue-100 text-sm leading-relaxed mb-4">{{ project.desc }}</p>

                            <!-- Tech pills -->
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span v-for="tech in project.technolg" :key="tech.name"
                                    class="px-2 py-1 border rounded text-xs" :style="tech.useAccent2
                                        ? { backgroundColor: 'var(--accent-border-2-soft)', borderColor: 'var(--accent-to-bg-hover)', color: 'var(--accent-to-pill-txt)' }
                                        : { backgroundColor: 'var(--accent-bg)', borderColor: 'var(--accent-border)', color: 'var(--accent-text-muted)' }
                                        ">
                                    {{ tech.name }}
                                </span>
                            </div>

                            <!-- Project Links -->
                            <div class="flex gap-3">
                                <template v-for="link in project.links" :key="link.name">

                                    <router-link v-if="link.name === 'View'"
                                        :to="{ name: 'EachProject', params: { id: project.id } }"
                                        class="flex items-center gap-2 transition-colors duration-300 text-sm font-medium"
                                        :style="{ color: link.useAccent2 ? 'var(--icon-accent-2)' : 'var(--accent-text)' }"
                                        @mouseenter="e => e.currentTarget.style.color = link.useAccent2 ? 'var(--accent-to-light)' : 'var(--accent-text-light)'"
                                        @mouseleave="e => e.currentTarget.style.color = link.useAccent2 ? 'var(--icon-accent-2)' : 'var(--accent-text)'">
                                        <component :is="link.icon" class="w-4 h-4" />
                                        {{ link.name }}
                                    </router-link>

                                    <a v-else :href="link.url"
                                        class="flex items-center gap-2 transition-colors duration-300 text-sm font-medium"
                                        :style="{ color: link.useAccent2 ? 'var(--icon-accent-2)' : 'var(--accent-text)' }"
                                        @mouseenter="e => e.currentTarget.style.color = link.useAccent2 ? 'var(--accent-to-light)' : 'var(--accent-text-light)'"
                                        @mouseleave="e => e.currentTarget.style.color = link.useAccent2 ? 'var(--icon-accent-2)' : 'var(--accent-text)'">
                                        <component :is="link.icon" class="w-4 h-4" />
                                        {{ link.name }}
                                    </a>

                                </template>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Empty state -->
                <div v-if="filteredProjects.length === 0" class="text-center py-20">
                    <p class="text-lg" :style="{ color: 'var(--accent-text-muted)' }">
                        No projects found for this filter.
                    </p>
                </div>

                <!-- ── CTA ── -->
                <div class="text-center mt-16">
                    <div class="inline-flex flex-col sm:flex-row gap-4 items-center">
                        <router-link to="/#projects"
                            class="px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center"
                            :style="{ background: 'var(--cta-gradient)' }"
                            @mouseenter="e => e.currentTarget.style.boxShadow = '0 10px 25px var(--accent-shadow)'"
                            @mouseleave="e => e.currentTarget.style.boxShadow = 'none'">
                            <ArrowLeftCircleIcon class="w-5 h-5 mr-2" />
                            Back to Homepage
                        </router-link>

                        <button
                            class="px-8 py-4 rounded-xl border-2 font-semibold transition-all duration-300 flex items-center"
                            :style="{ borderColor: 'var(--accent-text)', color: 'var(--accent-text)' }"
                            @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--accent-bg)'"
                            @mouseleave="e => e.currentTarget.style.backgroundColor = 'transparent'">
                            <ChatBubbleLeftRightIcon class="w-5 h-5 mr-2" />
                            Discuss Project
                        </button>
                    </div>
                </div>

            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
    ArrowLeftCircleIcon, ChatBubbleLeftRightIcon,
    ClockIcon, CodeBracketIcon, EyeIcon,
} from '@heroicons/vue/16/solid';
import { t } from './../../stores/languages.js';
import { HomeIcon } from '@heroicons/vue/24/solid';

const selectedFilter = ref('all');

// useAccent2: false → primary (blue side)
// useAccent2: true  → secondary (cyan side)
// neutral: true     → grey (in-progress / neutral links)
const projects = ref([
    {
        id: 1, useAccent2: false,
        title: 'E-Commerce Platform',
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
        image: '../public/project1.png',
        category: 'Full-Stack',
        filters: ['web'],
        technolg: [
            { name: 'Vue.js', useAccent2: false },
            { name: 'Node.js', useAccent2: true },
            { name: 'MongoDB', useAccent2: false },
        ],
        links: [
            { name: 'Live Demo', url: '#', icon: EyeIcon, useAccent2: false },
            { name: 'Code', url: '#', icon: CodeBracketIcon, useAccent2: true },
            { name: 'View', url: '#', icon: EyeIcon, useAccent2: false },
        ],
    },
    {
        id: 2, useAccent2: true,
        title: 'Portfolio App',
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
        image: '../public/project2.png',
        category: 'Portfolio',
        filters: ['web'],
        technolg: [
            { name: 'React Native', useAccent2: true },
            { name: 'Firebase', useAccent2: false },
            { name: 'Redux', useAccent2: true },
        ],
        links: [
            { name: 'Live Demo', url: '#', icon: EyeIcon, useAccent2: false },
            { name: 'Code', url: '#', icon: CodeBracketIcon, useAccent2: true },
            { name: 'View', url: '#', icon: EyeIcon, useAccent2: false },
        ],
    },
    {
        id: 3, useAccent2: false,
        title: 'Social Media Platform',
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
        image: '../public/project3.png',
        category: 'Social',
        filters: ['web', 'mobile'],
        technolg: [
            { name: 'Vue.js', useAccent2: false },
            { name: 'D3.js', useAccent2: true },
            { name: 'Express', useAccent2: false },
        ],
        links: [
            { name: 'Live Demo', url: '#', icon: EyeIcon, useAccent2: false },
            { name: 'Code', url: '#', icon: CodeBracketIcon, useAccent2: true },
            { name: 'View', url: '#', icon: EyeIcon, useAccent2: false },
        ],
    },
    {
        id: 4, useAccent2: true,
        title: 'Restaurant Website',
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
        image: '../public/project4.png',
        category: 'Social',
        filters: ['web'],
        technolg: [
            { name: 'React', useAccent2: true },
            { name: 'Socket.io', useAccent2: false },
            { name: 'PostgreSQL', useAccent2: true },
        ],
        links: [
            { name: 'Live Demo', url: '#', icon: EyeIcon, useAccent2: false },
            { name: 'Code', url: '#', icon: CodeBracketIcon, useAccent2: true },
            { name: 'View', url: '#', icon: EyeIcon, useAccent2: false },
        ],
    },
    {
        id: 5, useAccent2: false,
        title: 'Portfolio Website',
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
        image: '../public/project5.png',
        category: 'Social',
        filters: ['web'],
        technolg: [
            { name: 'Vue.js', useAccent2: false },
            { name: 'Tailwind CSS', useAccent2: true },
            { name: 'AOS', useAccent2: false },
        ],
        links: [
            { name: 'Live Demo', url: '#', icon: EyeIcon, useAccent2: false },
            { name: 'Code', url: '#', icon: CodeBracketIcon, useAccent2: true },
            { name: 'View', url: '#', icon: EyeIcon, useAccent2: false },
        ],
    },
    {
        id: 6, useAccent2: true,
        title: 'Dashboard',
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
        image: '../public/project6.png',
        category: 'Social',
        filters: ['web'],
        technolg: [
            { name: 'Dashboard', useAccent2: false, neutral: true },
        ],
        links: [
            { name: 'In Progress', url: '#', icon: ClockIcon, useAccent2: false, neutral: true },
        ],
    },
]);

const techStack = ['All', 'Web', 'Mobile', 'Presentation', 'UX/UI', 'Content'];

const filteredProjects = computed(() => {
    if (selectedFilter.value === 'all') return projects.value;
    return projects.value.filter(p =>
        p.filters.includes(selectedFilter.value.toLowerCase())
    );
});
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