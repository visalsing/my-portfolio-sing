<template>
    <section class="relative py-20 overflow-hidden" id="projects">
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
                    {{ t('my1_') }} <span
                        class="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                        {{ t('projects') }}
                    </span>{{ t('_my2') }}
                </h2>
                <p class="text-blue-200 text-lg max-w-2xl mx-auto">
                    A Collection of my recent work and creative solutions
                </p>
            </div>
            <!-- Projects Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="(project, index) in projects" :key="(project.id)" class="group relative bg-linear-to-br from-gray-800/50 to-blue-900/30 rounded-3xl
                overflow-hidden border backdrop-blur-sm hover:border-blue-400/40 transition-all duration-500
                hover:transform hover:-translate-y-2" :class="project.bordColor" :data-aos-delay="(index + 1) * 100">
                    <!-- Project Image -->
                    <div class="relative overflow-hidden">
                        <img :src="project.image" :alt="project.title"
                            class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500">
                        <div class="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent"></div>
                        <div class="absolute top-4 right-4">
                            <span class="px-3 py-1 text-white text-xs rounded-full font-semibold"
                                :class="project.badgColor">
                                {{ project.category }}
                            </span>
                        </div>
                    </div>

                    <!-- <img src="../../public/projects/admin-dashboard-1.png" alt=""> -->
                    <!-- Project Content -->
                    <div class="p-6">
                        <h3
                            class="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                            {{ project.title }}
                        </h3>
                        <p class="text-blue-100 text-sm leading-relaxed mb-4">
                            {{ project.desc }}
                        </p>
                        <!-- Technologies -->
                        <div class="flex flex-wrap gap-2 mb-4">
                            <span v-for="tech in project.technolg" :key="tech" class="px-2 py-1 border rounded text-xs"
                                :class="tech.class">
                                {{ tech.name }}
                            </span>
                        </div>
                        <!-- Project Links -->
                        <!-- <div class="flex gap-3">
                            <a v-for="link in project.links" :key="link.name" :href="link.url" :class="link.class"
                                class="flex items-center gap-2 transition-colors duration-300 text-sm font-medium">
                                <component :is="link.icon" class="w-4 h-4" />
                                {{ link.name }}
                            </a>
                        </div> -->
                        <div class="flex gap-3">
                            <template v-for="link in project.links" :key="link.name">

                                <!-- "View" → router-link with project id -->
                                <router-link v-if="link.name === 'View'"
                                    :to="{ name: 'EachProject', params: { id: project.id } }" :class="link.class"
                                    class="flex items-center gap-2 transition-colors duration-300 text-sm font-medium">
                                    <component :is="link.icon" class="w-4 h-4" />
                                    {{ link.name }}
                                </router-link>


                                <!-- all other links stay as <a> -->
                                <a v-else :href="link.url" :class="link.class"
                                    class="flex items-center gap-2 transition-colors duration-300 text-sm font-medium">
                                    <component :is="link.icon" class="w-4 h-4" />
                                    {{ link.name }}
                                </a>

                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <!-- CTA Section -->
            <div class="text-center mt-16" data-aos="fade-up">
                <div class="inline-flex flex-col sm:flex-row gap-4 items-center">
                    <router-link to="/projects" class="px-8 py-4 rounded-xl bg-linear-to-r
                    from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg 
                    hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 flex items-center">
                        View All Projects
                        <ArrowRightCircleIcon class="w-5 h-5 ml-2" />
                    </router-link>
                    <button class="px-8 py-4 rounded-xl border-2 border-blue-400 text-blue-400 font-semibold
                    hover:bg-blue-400/10 transition-all duration-300 flex items-center">
                        <ChatBubbleLeftRightIcon class="w-5 h-5 ml-2" />
                        &nbsp;Discuss Project
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { ref } from 'vue';
import { ArrowRightCircleIcon, ChatBubbleLeftRightIcon, ClockIcon, CodeBracketIcon, EyeIcon } from '@heroicons/vue/16/solid';
import { t } from './../stores/languages.js';

const projects = ref([
    {
        id: 1,
        title: "Admin Dashboard",
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
        image: '../../public/projects/admin-dashboard.png',
        category: 'Full-Stack',
        bordColor: 'border-blue-500/20',
        badgColor: "bg-blue-500",
        technolg: [
            {
                name: "Vue.js",
                class: 'bg-blue-500/20 border-blue-400/30 text-blue-200'
            },
            {
                name: "Node.js",
                class: 'bg-blue-500/20 border-blue-400/30 text-blue-200'
            },
            {
                name: "MongoDB",
                class: 'bg-blue-500/20 border-blue-400/30 text-blue-200'
            },
        ],
        links: [
            {
                name: "Live Demo", url: "#", icon: EyeIcon,
                class: 'text-blue-400 hover:text-blue-300'
            },
            {
                name: "Code", url: "#", icon: CodeBracketIcon,
                class: 'text-cyan-400 hover:text-cyan-300'
            },
            {
                name: "View", url: "#", icon: EyeIcon,
                class: 'text-blue-400 hover:text-blue-300'
            },
        ]
    },
    {
        id: 2,
        title: "Portfolio Website",
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
        image: '../../public/projects/portfolio-web.png',
        category: 'Portfolio',
        bordColor: 'border-cyan-500/20',
        badgColor: "bg-cyan-500",
        technolg: [
            {
                name: "React Native",
                class: 'bg-cyan-500/20 border-cyan-400/30 text-cyan-200'
            },
            {
                name: "Firebase",
                class: 'bg-blue-500/20 border-blue-400/30 text-blue-200'
            },
            {
                name: "Redux",
                class: 'bg-cyan-500/20 border-cyan-400/30 text-cyan-200'
            },
        ],
        links: [
            {
                name: "Live Demo", url: "#", icon: EyeIcon,
                class: 'text-blue-400 hover:text-blue-300'
            },
            {
                name: "Code", url: "#", icon: CodeBracketIcon,
                class: 'text-cyan-400 hover:text-cyan-300'
            },
            {
                name: "View", url: "#", icon: EyeIcon,
                class: 'text-blue-400 hover:text-blue-300'
            },
        ]
    },
    {
        id: 3,
        title: "Social Media Platform",
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
        image: '../public/project3.png',
        category: 'Social',
        bordColor: 'border-blue-500/20',
        badgColor: "bg-blue-500",
        technolg: [
            {
                name: "Vue.js",
                class: 'bg-blue-500/20 border-blue-400/30 text-blue-200'
            },
            {
                name: "D3.js",
                class: 'bg-cyan-500/20 border-cyan-400/30 text-cyan-200'
            },
            {
                name: "Express",
                class: 'bg-blue-500/20 border-blue-400/30 text-blue-200'
            },
        ],
        links: [
            {
                name: "Live Demo", url: "#", icon: EyeIcon,
                class: 'text-blue-400 hover:text-blue-300'
            },
            {
                name: "Code", url: "#", icon: CodeBracketIcon,
                class: 'text-cyan-400 hover:text-cyan-300'
            },
            {
                name: "View", url: "#", icon: EyeIcon,
                class: 'text-blue-400 hover:text-blue-300'
            },
        ]
    },
    {
        id: 4,
        title: "Restaurant Website",
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
        image: '../public/project4.png',
        category: 'Social',
        bordColor: 'border-cyan-500/20',
        badgColor: "bg-cyan-500",
        technolg: [
            {
                name: "React",
                class: 'bg-cyan-500/20 border-cyan-400/30 text-cyan-200'
            },
            {
                name: "Socket.io",
                class: 'bg-blue-500/20 border-blue-400/30 text-blue-200'
            },
            {
                name: "PostgreSQL",
                class: 'bg-cyan-500/20 border-cyan-400/30 text-cyan-200'
            },
        ],
        links: [
            {
                name: "Live Demo", url: "#", icon: EyeIcon,
                class: 'text-blue-400 hover:text-blue-300'
            },
            {
                name: "Code", url: "#", icon: CodeBracketIcon,
                class: 'text-cyan-400 hover:text-cyan-300'
            },
            {
                name: "View", url: "#", icon: EyeIcon,
                class: 'text-blue-400 hover:text-blue-300'
            },
        ]
    },
])
</script>
