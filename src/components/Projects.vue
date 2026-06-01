<template>
    <section class="relative py-20 overflow-hidden" id="projects">
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <!-- ── Heading ── -->
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold text-[var(--surface-text)] mb-4">
                    {{ t('my1_') }}
                    <span class="text-transparent bg-clip-text" :style="{ backgroundImage: 'var(--logo-gradient)' }">{{
                        t('projects') }}</span>{{ t('_my2') }}
                </h2>
                <p class="text-lg max-w-2xl mx-auto" :style="{ color: 'var(--accent-text-muted)' }">
                    A Collection of my recent work and creative solutions
                </p>
            </div>

            <!-- ── Projects Grid ── -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="(project, index) in projects" :key="project.id"
                    class="group relative rounded-3xl overflow-hidden backdrop-blur-sm transition-all duration-500 hover:-translate-y-2"
                    :data-aos-delay="(index + 1) * 100" :style="{
                        // background: 'linear-gradient(to bottom right, rgba(31,41,55,0.50), var(--section-grad-to))',
                        background: 'linear-gradient(to bottom right, var(--surface-card), var(--section-grad-to))',
                        border: `1px solid ${project.useAccent2 ? 'var(--accent-border-2-soft)' : 'var(--section-border)'}`
                    }" @mouseenter="e => e.currentTarget.style.borderColor = 'var(--accent-border-hover)'"
                    @mouseleave="e => e.currentTarget.style.borderColor = project.useAccent2 ? 'var(--accent-border-2-soft)' : 'var(--section-border)'">
                    <!-- Project Image -->
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

                    <!-- Project Content -->
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-[var(--surface-text)] mb-2 transition-colors duration-300"
                            @mouseenter="e => e.currentTarget.style.color = 'var(--accent-text)'"
                            @mouseleave="e => e.currentTarget.style.color = 'var(--surface-text-sub)'">
                            {{ project.title }}
                        </h3>
                        <p class="text-[var(--surface-text-sub)] text-sm leading-relaxed mb-4">{{ project.desc }}</p>

                        <!-- Tech pills -->
                        <div class="flex flex-wrap gap-2 mb-4">
                            <span v-for="tech in project.technolg" :key="tech.name"
                                class="px-2 py-1 border rounded text-xs" :style="tech.useAccent2
                                    ? {
                                        backgroundColor: 'var(--accent-border-2-soft)',
                                        borderColor: 'var(--accent-to-bg-hover)',
                                        // color: 'var(--accent-to-pill-txt)'
                                        color: 'var(--accent-to-pill-txt-dynamic)'
                                    }
                                    : {
                                        backgroundColor: 'var(--accent-bg)',
                                        borderColor: 'var(--accent-border)',
                                        // color: 'var(--accent-text-muted)'
                                        color: 'var(--accent-text)'
                                    }
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

            <!-- ── CTA ── -->
            <div class="text-center mt-16" data-aos="fade-up">
                <div class="inline-flex flex-col sm:flex-row gap-4 items-center">

                    <router-link to="/projects"
                        class="px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center"
                        :style="{ background: 'var(--cta-gradient)' }"
                        @mouseenter="e => e.currentTarget.style.boxShadow = '0 10px 25px var(--accent-shadow)'"
                        @mouseleave="e => e.currentTarget.style.boxShadow = 'none'">
                        View All Projects
                        <ArrowRightCircleIcon class="w-5 h-5 ml-2" />
                    </router-link>

                    <button
                        class="px-8 py-4 rounded-xl border-2 font-semibold transition-all duration-300 flex items-center"
                        :style="{ borderColor: 'var(--accent-text)', color: 'var(--accent-text)' }"
                        @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--accent-bg)'"
                        @mouseleave="e => e.currentTarget.style.backgroundColor = 'transparent'">
                        <ChatBubbleLeftRightIcon class="w-5 h-5 ml-2" />
                        &nbsp;Discuss Project
                    </button>

                </div>
            </div>
        </div>
    </section>
    <!-- <img src="../../src/assets/images/projects/admin-dashboard.png" alt=""> -->
</template>

<script setup>
import { ref } from 'vue';
import { ArrowRightCircleIcon, ChatBubbleLeftRightIcon, CodeBracketIcon, EyeIcon } from '@heroicons/vue/16/solid';
import { t } from './../stores/languages.js';

// useAccent2: true  → cyan/accent-2 side vars
// useAccent2: false → blue/accent side vars
const projects = ref([
    {
        id: 1,
        title: "Admin Dashboard",
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
        image: '../../src/assets/images/projects/admin-dashboard.png',
        category: 'Dashboard',
        useAccent2: false,
        technolg: [
            { name: "React.js", useAccent2: false },
            { name: "Tailwind CSS", useAccent2: true },
        ],
        links: [
            { name: "Live Demo", url: "#", icon: EyeIcon, useAccent2: false },
            { name: "Code", url: "#", icon: CodeBracketIcon, useAccent2: true },
            { name: "View", url: "#", icon: EyeIcon, useAccent2: false },
        ],
    },
    {
        id: 2,
        title: "Portfolio Website",
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
        image: '../../src/assets/images/projects/portfolio-web.png',
        category: 'Portfolio',
        useAccent2: true,
        technolg: [
            { name: "Vue,hs", useAccent2: true },
            { name: "Tailwind CSS", useAccent2: false },
        ],
        links: [
            { name: "Live Demo", url: "https://my-portfolio-sing.vercel.app/", icon: EyeIcon, useAccent2: false },
            { name: "Code", url: "https://github.com/visalsing/my-portfolio-sing", icon: CodeBracketIcon, useAccent2: true },
            { name: "View", url: "", icon: EyeIcon, useAccent2: false },
        ],
    },
    // {
    //     id: 3,
    //     title: "Social Media Platform",
    //     desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    //     image: '../public/project3.png',
    //     category: 'Social',
    //     useAccent2: false,
    //     technolg: [
    //         { name: "Vue.js", useAccent2: false },
    //         { name: "D3.js", useAccent2: true },
    //         { name: "Express", useAccent2: false },
    //     ],
    //     links: [
    //         { name: "Live Demo", url: "#", icon: EyeIcon, useAccent2: false },
    //         { name: "Code", url: "#", icon: CodeBracketIcon, useAccent2: true },
    //         { name: "View", url: "#", icon: EyeIcon, useAccent2: false },
    //     ],
    // },
    // {
    //     id: 4,
    //     title: "Restaurant Website",
    //     desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    //     image: '../public/project4.png',
    //     category: 'Social',
    //     useAccent2: true,
    //     technolg: [
    //         { name: "React", useAccent2: true },
    //         { name: "Socket.io", useAccent2: false },
    //         { name: "PostgreSQL", useAccent2: true },
    //     ],
    //     links: [
    //         { name: "Live Demo", url: "#", icon: EyeIcon, useAccent2: false },
    //         { name: "Code", url: "#", icon: CodeBracketIcon, useAccent2: true },
    //         { name: "View", url: "#", icon: EyeIcon, useAccent2: false },
    //     ],
    // },
    // {
    //     id: 5,
    //     title: "Loyalty Program",
    //     desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    //     image: '../public/projects/loyalty-program.png',
    //     category: 'Loyalty',
    //     useAccent2: false,
    //     technolg: [
    //         { name: "Vue.js", useAccent2: false },
    //         { name: "D3.js", useAccent2: true },
    //         { name: "Express", useAccent2: false },
    //     ],
    //     links: [
    //         { name: "Live Demo", url: "https://loyalty.gpas.co/en-us/admin/login", icon: EyeIcon, useAccent2: false },
    //         { name: "Code", url: "#", icon: CodeBracketIcon, useAccent2: true },
    //         { name: "View", url: "#", icon: EyeIcon, useAccent2: false },
    //     ],
    // },
    {
        id: 3,
        title: "Spider15 - Classified Ads",
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
        image: '../../src/assets/images/projects/spider15.png',
        category: 'Social',
        useAccent2: true,
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
            { name: "Live Demo", url: "https://spider15.com/", icon: EyeIcon, useAccent2: false },
            { name: "Code", url: "#", icon: CodeBracketIcon, useAccent2: true },
            { name: "View", url: "#", icon: EyeIcon, useAccent2: false },
        ],
    },
    // {
    //     id: 7,
    //     title: "Tinode",
    //     desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    //     image: '../public/projects/loyalty-program.png',
    //     category: 'Loyalty',
    //     useAccent2: false,
    //     technolg: [
    //         { name: "Tinode", useAccent2: false },
    //         { name: "REST APIs", useAccent2: true },
    //         { name: "Postman", useAccent2: false },
    //     ],
    //     links: [
    //         { name: "Live Demo", url: "https://loyalty.gpas.co/en-us/admin/login", icon: EyeIcon, useAccent2: false },
    //         { name: "Code", url: "#", icon: CodeBracketIcon, useAccent2: true },
    //         { name: "View", url: "#", icon: EyeIcon, useAccent2: false },
    //     ],
    // },
    {
        id: 4,
        title: "Mautic - Email Marketing",
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
        image: '../../src/assets/images/projects/mautic.png',
        category: 'Marketing',
        useAccent2: true,
        technolg: [
            { name: "Mautic", useAccent2: true },
            { name: "REST APIs", useAccent2: false },
            { name: "Email SMTP", useAccent2: true },
            { name: "Symfony", useAccent2: false },
            { name: "MySQL", useAccent2: true },
            { name: "Postman", useAccent2: false },
        ],
        links: [
            { name: "Live Demo", url: "https://marketing.gpas.co/", icon: EyeIcon, useAccent2: false },
            { name: "Code", url: "#", icon: CodeBracketIcon, useAccent2: true },
            { name: "View", url: "#", icon: EyeIcon, useAccent2: false },
        ],
    },
]);
</script>