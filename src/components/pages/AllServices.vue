<template>
    <section class="relative py-20 overflow-hidden" id="services" style="background-color: #000;">
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <!-- Breadcrumb -->
            <nav class="flex mb-8" aria-label="Breadcrumb" data-aos="fade-down">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                    <li class="inline-flex items-center">
                        <router-link to="/"
                            class="group inline-flex items-center text-sm font-medium text-gray-400 transition-all duration-300">

                            <div class=" mr-2">
                                <HomeIcon class="breadcrumb-home-icon w-4 h-4" />
                            </div>

                            <span class="breadcrumb-home-text">
                                Home
                            </span>
                        </router-link>
                    </li>
                    <li>
                        <div class="flex items-center">
                            <svg class="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="ml-1 text-sm font-semibold md:ml-2 text-transparent bg-clip-text"
                                :style="{ backgroundImage: 'var(--logo-gradient)' }">
                                {{ t('services') }}
                            </span>
                        </div>
                    </li>
                </ol>
            </nav>

            <!-- ── Heading ── -->
            <div class="text-center m-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
                    {{ t('my1_') }}
                    <span class="text-transparent bg-clip-text" :style="{ backgroundImage: 'var(--logo-gradient)' }">{{
                        t('services') }}</span>{{ t('_my2') }}
                </h2>
                <p class="text-lg max-w-2xl mx-auto" :style="{ color: 'var(--accent-text-muted)' }" data-aos="fade-up"
                    data-aos-delay="100">
                    {{ t('services_subtitle') }}
                </p>
            </div>

            <!-- ── Service Cards ── -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="(service, index) in services" :key="service.id" data-aos="fade-up"
                    :data-aos-delay="(index * 100) + 200"
                    class="group relative p-8 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 cursor-default"
                    :style="{
                        background: 'linear-gradient(to bottom right, rgba(31,41,55,0.50), var(--section-grad-to))',
                        border: '1px solid var(--section-border)'
                    }" @mouseenter="e => {
                        e.currentTarget.style.borderColor = 'var(--accent-border-hover)'
                    }" @mouseleave="e => {
                        e.currentTarget.style.borderColor = 'var(--section-border)'
                    }">
                    <!-- Hover glow overlay -->
                    <div class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        :style="{ backgroundColor: 'var(--accent-glow)' }"></div>

                    <!-- Icon box -->
                    <div class="relative z-10 mb-6">
                        <div class="inline-flex items-center justify-center w-16 h-16 rounded-xl border group-hover:scale-110 transition-transform duration-300"
                            :style="{
                                background: 'linear-gradient(to right, var(--icon-bg), var(--icon-bg-2))',
                                borderColor: 'var(--accent-border)'
                            }">
                            <component :is="service.icon" class="w-8 h-8" :style="{ color: 'var(--icon-accent)' }" />
                        </div>
                    </div>

                    <!-- Text -->
                    <div class="relative z-10">
                        <h3
                            class="text-xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-[var(--accent-text)]">
                            {{ service.name }}
                        </h3>
                        <p class="text-blue-100 leading-relaxed">
                            {{ service.desc }}
                        </p>
                    </div>

                    <!-- Arrow -->
                    <div
                        class="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                        <router-link to="/services/detail">
                            <ArrowRightIcon class="w-6 h-6" :style="{ color: 'var(--icon-accent-2)' }" />
                        </router-link>
                    </div>
                </div>
            </div>

            <!-- ── CTA ── -->
            <div class="text-center mt-16" data-aos="fade-up" data-aos-delay="800">
                <div class="inline-flex flex-col sm:flex-row gap-4 items-center">

                    <router-link to="/#services"
                        class="px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center"
                        :style="{ background: 'var(--cta-gradient)' }"
                        @mouseenter="e => e.currentTarget.style.boxShadow = '0 10px 25px var(--accent-shadow)'"
                        @mouseleave="e => e.currentTarget.style.boxShadow = 'none'">
                        <ArrowLeftCircleIcon class="w-5 h-5 mr-2" />
                        Back to Home Page
                    </router-link>

                    <button
                        class="px-8 py-4 rounded-xl border-2 font-semibold transition-all duration-300 flex items-center"
                        :style="{
                            borderColor: 'var(--accent-text)',
                            color: 'var(--accent-text)'
                        }" @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--accent-bg)'"
                        @mouseleave="e => e.currentTarget.style.backgroundColor = 'transparent'">
                        Get In Touch
                        <ChatBubbleLeftRightIcon class="w-5 h-5 ml-2" />
                    </button>
                </div>
            </div>

        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { t } from './../../stores/languages.js';
import {
    CloudArrowUpIcon, ArrowRightIcon, ChatBubbleLeftRightIcon,
    CodeBracketIcon, CommandLineIcon, PaintBrushIcon, DocumentTextIcon,
    CpuChipIcon, EnvelopeIcon, VideoCameraIcon, DevicePhoneMobileIcon,
    WindowIcon, PhotoIcon, ChatBubbleBottomCenterTextIcon,
    MagnifyingGlassCircleIcon, ServerIcon, LanguageIcon,
    ArrowRightCircleIcon,
    ArrowLeftCircleIcon,
    HomeIcon,
} from '@heroicons/vue/24/outline';

const services = ref([
    { id: 1, icon: CodeBracketIcon, name: 'Web Frontend Development', desc: 'Creating beautiful, responsive, and fast user interfaces using modern tools like Vue.js, React, and Tailwind CSS.' },
    { id: 2, icon: CommandLineIcon, name: 'Web Backend Development', desc: 'Building the "brains" of your application, handling server logic, and managing secure databases with Laravel and Node.js.' },
    { id: 3, icon: PaintBrushIcon, name: 'Web Designing', desc: 'Designing modern and professional website layouts that look great on both desktop and mobile screens.' },
    { id: 4, icon: DocumentTextIcon, name: 'Technical Writing', desc: 'Writing clear, easy-to-understand guides, documentation, and tutorials for software and coding projects.' },
    { id: 5, icon: CpuChipIcon, name: 'API Integration & Development', desc: 'Connecting different software services together and building custom APIs to share data between platforms.' },
    { id: 6, icon: EnvelopeIcon, name: 'Email Marketing', desc: 'Setting up automated email systems and newsletters to keep your customers engaged and informed.' },
    { id: 7, icon: VideoCameraIcon, name: 'Content Creation', desc: 'Making educational videos and social media content to explain technology and teach coding skills.' },
    { id: 8, icon: DevicePhoneMobileIcon, name: 'Mobile App Development', desc: 'Building useful and smooth mobile applications for iOS and Android using Flutter and Dart.' },
    { id: 9, icon: WindowIcon, name: 'UI/UX Design', desc: 'Focusing on how users interact with your app to make sure it is easy, intuitive, and enjoyable to use.' },
    { id: 10, icon: CloudArrowUpIcon, name: 'DevOps & Deployment', desc: 'Moving your code to the cloud and managing servers on AWS or DigitalOcean to keep your site online 24/7.' },
    { id: 11, icon: PhotoIcon, name: 'Graphic Design', desc: 'Creating visual assets, logos, and digital graphics using Photoshop and Canva to boost your brand identity.' },
    { id: 12, icon: ChatBubbleBottomCenterTextIcon, name: 'Automation & ChatBot', desc: 'Creating smart Telegram bots and automated workflows to save time and handle tasks automatically.' },
    { id: 13, icon: MagnifyingGlassCircleIcon, name: 'System Testing', desc: 'Testing software to find bugs and ensure everything works perfectly before it reaches your users.' },
    { id: 14, icon: ServerIcon, name: 'System Administration', desc: 'Setting up and maintaining computers, local networks, and development environments like XAMPP or Docker.' },
    { id: 15, icon: LanguageIcon, name: 'Translation Services', desc: 'Providing accurate translation and localization between Khmer, English, Chinese, and other regional languages.' },
]);
</script>

<style scoped>
/* 1. The Text Hover Logic */
.group:hover .breadcrumb-home-text {
    background: var(--logo-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 600;
}

/* 2. The Icon Hover Logic (The Fix) */
.group:hover .breadcrumb-home-icon {
    /* We turn the icon into a block that takes the gradient */
    background: var(--logo-gradient);
    
    /* We use the icon shape as a mask so only the house shape shows the background */
    -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>') no-repeat center;
    mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>') no-repeat center;
    
    -webkit-mask-size: contain;
    mask-size: contain;
    
    /* Hide the actual original icon pixels so only the mask shows */
    color: transparent;
}
</style>