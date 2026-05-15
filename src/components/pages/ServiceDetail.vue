<template>
    <section class="relative py-20 bg-black overflow-hidden" id="services">
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <!-- ── Breadcrumb ── -->
            <nav class="flex mb-8" aria-label="Breadcrumb" data-aos="fade-down">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                    <li class="inline-flex items-center">
                        <router-link to="/"
                            class="group inline-flex items-center text-sm font-medium text-gray-400 transition-all duration-300">
                            <div class="mr-2">
                                <HomeIcon class="breadcrumb-home-icon w-4 h-4" />
                            </div>
                            <span class="breadcrumb-home-text">{{ t('home') }}</span>
                        </router-link>
                    </li>
                    <li class="flex items-center">
                        <router-link to="/services"
                            class="group inline-flex items-center text-sm font-medium text-gray-400 transition-all duration-300">
                            <svg class="w-6 h-6 text-gray-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                            </svg>
                            <span class="breadcrumb-home-text">{{ t('services') }}</span>
                        </router-link>
                    </li>
                    <li>
                        <div class="flex items-center">
                            <svg class="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                            </svg>
                            <span
                                class="ml-1 text-sm font-semibold md:ml-2 text-transparent bg-clip-text"
                                :style="{ backgroundImage: 'var(--logo-gradient)' }"
                            >{{ t('details') }}</span>
                        </div>
                    </li>
                </ol>
            </nav>

            <!-- ── Heading ── -->
            <div class="text-center m-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
                    {{ t('my1_') }}
                    <span
                        class="text-transparent bg-clip-text"
                        :style="{ backgroundImage: 'var(--logo-gradient)' }"
                    >{{ t('services') }}</span>{{ t('_my2') }}
                </h2>
                <p
                    class="text-lg max-w-2xl mx-auto"
                    :style="{ color: 'var(--accent-text-muted)' }"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    {{ t('services_subtitle') }}
                </p>
            </div>

            <!-- ── Timeline ── -->
            <div class="relative mt-12">

                <!-- Center vertical line -->
                <div
                    class="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] hidden md:block"
                    :style="{
                        backgroundColor: 'var(--accent-line)',
                        boxShadow:       '0 0 10px var(--accent-line-glow)'
                    }"
                    data-aos="fade-down"
                    data-aos-duration="1500"
                ></div>

                <div class="space-y-12 md:space-y-6">
                    <div
                        v-for="(service, index) in services"
                        :key="service.id"
                        class="relative flex flex-col md:flex-row items-start w-full"
                        :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
                    >
                        <!-- Content side -->
                        <div
                            class="w-full md:w-1/2 px-4 md:px-16 flex"
                            :class="index % 2 === 0 ? 'md:justify-end md:text-right' : 'md:justify-start md:text-left'"
                            :data-aos="index % 2 === 0 ? 'fade-right' : 'fade-left'"
                            data-aos-duration="1000"
                        >
                            <div
                                class="max-w-md w-full flex flex-col"
                                :class="index % 2 === 0 ? 'md:items-end' : 'md:items-start'"
                            >
                                <!-- Mobile number badge -->
                                <div
                                    class="md:hidden w-10 h-10 mb-4 flex items-center justify-center font-bold rounded-lg border"
                                    :style="{
                                        backgroundColor: 'var(--accent-node-bg)',
                                        borderColor:     service.useAccent2 ? 'var(--icon-accent-2)' : 'var(--accent-text)',
                                        color:           service.useAccent2 ? 'var(--icon-accent-2)' : 'var(--accent-text)',
                                        boxShadow:       service.useAccent2
                                            ? '0 0 10px var(--accent-border-2)'
                                            : '0 0 10px var(--accent-shadow)'
                                    }"
                                >
                                    {{ index + 1 }}
                                </div>

                                <!-- Title -->
                                <h3
                                    class="text-2xl font-bold text-white tracking-tight mb-2 transition-colors duration-300 cursor-default"
                                    @mouseenter="e => e.currentTarget.style.color = service.useAccent2 ? 'var(--icon-accent-2)' : 'var(--accent-text)'"
                                    @mouseleave="e => e.currentTarget.style.color = 'white'"
                                >
                                    {{ service.name }}
                                </h3>

                                <!-- Underline bar -->
                                <div
                                    class="w-24 h-[2px] mb-4 transition-all duration-500"
                                    :style="{
                                        backgroundColor: service.useAccent2 ? 'var(--icon-accent-2)' : 'var(--accent-text)',
                                        boxShadow:       service.useAccent2
                                            ? '0 0 8px var(--accent-border-2)'
                                            : '0 0 8px var(--accent-shadow)'
                                    }"
                                ></div>

                                <!-- Description -->
                                <p class="text-gray-400 text-lg leading-relaxed">
                                    {{ service.desc }}
                                </p>
                            </div>
                        </div>

                        <!-- Center number node (desktop) -->
                        <div
                            class="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center z-20"
                            data-aos="zoom-in"
                            data-aos-delay="200"
                        >
                            <div
                                class="w-12 h-12 flex items-center justify-center font-bold rounded-xl border-2 transition-transform duration-300 hover:scale-110"
                                :style="{
                                    backgroundColor: 'var(--accent-node-bg)',
                                    borderColor:     service.useAccent2 ? 'var(--icon-accent-2)' : 'var(--accent-text)',
                                    color:           service.useAccent2 ? 'var(--icon-accent-2)' : 'var(--accent-text)',
                                    boxShadow:       service.useAccent2
                                        ? '0 0 20px var(--accent-border-2)'
                                        : '0 0 20px var(--accent-shadow)'
                                }"
                            >
                                {{ index + 1 }}
                            </div>
                        </div>

                        <div class="hidden md:block md:w-1/2"></div>
                    </div>
                </div>
            </div>

            <!-- ── CTA ── -->
            <div class="text-center mt-16" data-aos="fade-up" data-aos-delay="800">
                <div class="inline-flex flex-col sm:flex-row gap-4 items-center">
                    <router-link
                        to="/services"
                        class="px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center"
                        :style="{ background: 'var(--cta-gradient)' }"
                        @mouseenter="e => e.currentTarget.style.boxShadow = '0 10px 25px var(--accent-shadow)'"
                        @mouseleave="e => e.currentTarget.style.boxShadow = 'none'"
                    >
                        <ArrowLeftCircleIcon class="w-5 h-5 mr-2" />
                        {{ t('click_to_return') }}
                    </router-link>
                </div>
            </div>

        </div>
    </section>
</template>

<script setup>
import {
    CodeBracketIcon, DevicePhoneMobileIcon,
    DocumentTextIcon, EnvelopeIcon, PaintBrushIcon,
} from '@heroicons/vue/16/solid';
import { ref, onMounted } from 'vue';
import { t } from './../../stores/languages.js';
import {
    ArrowLeftCircleIcon, ChatBubbleBottomCenterTextIcon,
    CloudArrowUpIcon, CommandLineIcon, CpuChipIcon,
    HomeIcon, LanguageIcon, MagnifyingGlassCircleIcon,
    PhotoIcon, ServerIcon, VideoCameraIcon, WindowIcon,
} from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';

// useAccent2: false → var(--accent-text)   [primary,   odd  items: 1,3,5,7...]
// useAccent2: true  → var(--icon-accent-2) [secondary, even items: 2,4,6,8...]
const services = ref([
    {
        id: 1, useAccent2: false,
        icon: CodeBracketIcon,
        name: 'Web Frontend Development',
        desc: 'Creating beautiful, responsive, and fast user interfaces using modern tools like Vue.js, React, and Tailwind CSS.',
    },
    {
        id: 2, useAccent2: true,
        icon: CommandLineIcon,
        name: 'Web Backend Development',
        desc: 'Building the "brains" of your application, handling server logic, and managing secure databases with Laravel and Node.js.',
    },
    {
        id: 3, useAccent2: false,
        icon: PaintBrushIcon,
        name: 'Web Designing',
        desc: 'Designing modern and professional website layouts that look great on both desktop and mobile screens.',
    },
    {
        id: 4, useAccent2: true,
        icon: DocumentTextIcon,
        name: 'Technical Writing',
        desc: 'Writing clear, easy-to-understand guides, documentation, and tutorials for software and coding projects.',
    },
    {
        id: 5, useAccent2: false,
        icon: CpuChipIcon,
        name: 'API Integration & Development',
        desc: 'Connecting different software services together and building custom APIs to share data between platforms.',
    },
    {
        id: 6, useAccent2: true,
        icon: EnvelopeIcon,
        name: 'Email Marketing',
        desc: 'Setting up automated email systems and newsletters to keep your customers engaged and informed.',
    },
    {
        id: 7, useAccent2: false,
        icon: VideoCameraIcon,
        name: 'Content Creation',
        desc: 'Making educational videos and social media content to explain technology and teach coding skills.',
    },
    {
        id: 8, useAccent2: true,
        icon: DevicePhoneMobileIcon,
        name: 'Mobile App Development',
        desc: 'Building useful and smooth mobile applications for iOS and Android using Flutter and Dart.',
    },
    {
        id: 9, useAccent2: false,
        icon: WindowIcon,
        name: 'UI/UX Design',
        desc: 'Focusing on how users interact with your app to make sure it is easy, intuitive, and enjoyable to use.',
    },
    {
        id: 10, useAccent2: true,
        icon: CloudArrowUpIcon,
        name: 'DevOps & Deployment',
        desc: 'Moving your code to the cloud and managing servers on AWS or DigitalOcean to keep your site online 24/7.',
    },
    {
        id: 11, useAccent2: false,
        icon: PhotoIcon,
        name: 'Graphic Design',
        desc: 'Creating visual assets, logos, and digital graphics using Photoshop and Canva to boost your brand identity.',
    },
    {
        id: 12, useAccent2: true,
        icon: ChatBubbleBottomCenterTextIcon,
        name: 'Automation & ChatBot',
        desc: 'Creating smart Telegram bots and automated workflows to save time and handle tasks automatically.',
    },
    {
        id: 13, useAccent2: false,
        icon: MagnifyingGlassCircleIcon,
        name: 'System Testing',
        desc: 'Testing software to find bugs and ensure everything works perfectly before it reaches your users.',
    },
    {
        id: 14, useAccent2: true,
        icon: ServerIcon,
        name: 'System Administration',
        desc: 'Setting up and maintaining computers, local networks, and development environments like XAMPP or Docker.',
    },
    {
        id: 15, useAccent2: false,
        icon: LanguageIcon,
        name: 'Translation Services',
        desc: 'Providing accurate translation and localization between Khmer, English, Chinese, and other regional languages.',
    },
]);

const router = useRouter();
const backPath = ref('/#services');

onMounted(() => {
    const previousPath = window.history.state?.back;
    if (previousPath) {
        if (previousPath.includes('/services'))   backPath.value = '/services';
        else if (previousPath.includes('#services')) backPath.value = '/#services';
    }
});
</script>

<style scoped>
.absolute.left-1\/2 {
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.1);
}

/* Breadcrumb hover — text gradient */
.group:hover .breadcrumb-home-text {
    background: var(--logo-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 600;
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