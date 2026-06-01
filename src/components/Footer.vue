<template>
    <footer class="relative border-t" :style="{
        backgroundColor: 'var(--footer-bg-color)',
        borderColor: 'var(--section-border)'
    }">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 py-12">

            <div class="grid grid-cols-1 md:grid-cols-4 gap-12">

                <div class="md:col-span-2">
                    <div class="text-2xl font-bold bg-clip-text text-transparent mb-4"
                        :style="{ backgroundImage: 'var(--logo-gradient)' }">
                        Sing.dev
                    </div>

                    <p class="text-sm leading-relaxed max-w-md" :style="{ color: 'var(--surface-text-sub)' }">
                        Building the future of the web with precision and passion. I specialize in
                        transforming complex ideas into seamless digital experiences, from
                        architecting robust backends to crafting pixel-perfect interfaces.
                        Let's build something extraordinary together.
                    </p>

                    <div class="flex gap-4 mt-6">
                        <a v-for="contact in contactLinks" :key="contact.label" :href="contact.href"
                            class="p-2 rounded-lg transition-all hover:scale-110 shadow-sm" :style="{
                                backgroundColor: 'var(--accent-bg)',
                                border: '1px solid var(--accent-border)',
                                color: 'var(--accent-text)'
                            }" @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--accent-bg-hover)'"
                            @mouseleave="e => e.currentTarget.style.backgroundColor = 'var(--accent-bg)'">
                            <component :is="contact.icon" class="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <div>
                    <h3 class="text-[var(--surface-text)] font-bold mb-4">Navigation</h3>
                    <ul class="space-y-3">
                        <li v-for="link in quickLinks" :key="link.name">
                            <a :href="link.href" class="text-sm transition-all hover:pl-2"
                                :style="{ color: 'var(--accent-text-muted)' }"
                                @mouseenter="e => e.currentTarget.style.color = 'var(--accent-text)'"
                                @mouseleave="e => e.currentTarget.style.color = 'var(--accent-text-muted)'">
                                {{ link.name }}
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-[var(--surface-text)] font-bold mb-4">Core Expertise</h3>
                    <ul class="space-y-3">
                        <li v-for="service in services" :key="service">
                            <span class="text-sm opacity-80" :style="{ color: 'var(--surface-text-sub)' }">
                                {{ service }}
                            </span>
                        </li>
                    </ul>
                </div>

            </div>

            <div class="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
                :style="{ borderColor: 'var(--section-border)' }">
                <div class="flex flex-col items-center md:items-start gap-1">
                    <p class="text-xs font-mono tracking-tighter" :style="{ color: 'var(--accent-text-muted)' }">
                        DESIGNED & DEVELOPED BY SING
                    </p>
                    <p class="text-sm font-medium" :style="{ color: 'var(--surface-text)' }">
                        © 2026 Sing.dev. All rights reserved.
                    </p>
                </div>

                <!-- <div class="flex gap-8 mt-6 md:mt-0">
                    <a
                        v-for="policy in policyLinks"
                        :key="policy.name"
                        :href="policy.href"
                        class="text-xs uppercase tracking-widest transition-colors font-bold"
                        :style="{ color: 'var(--accent-text-muted)' }"
                        @mouseenter="e => e.currentTarget.style.color = 'var(--accent-text)'"
                        @mouseleave="e => e.currentTarget.style.color = 'var(--accent-text-muted)'"
                    >
                        {{ policy.name }}
                    </a>
                </div> -->
                <div class="flex gap-8 mt-6 md:mt-0">
                    <template v-for="policy in policyLinks" :key="policy.name">
                        <a v-if="policy.href" :href="policy.href"
                            class="text-xs uppercase tracking-widest transition-colors font-bold"
                            :style="{ color: 'var(--accent-text-muted)' }"
                            @mouseenter="e => e.currentTarget.style.color = 'var(--accent-text)'"
                            @mouseleave="e => e.currentTarget.style.color = 'var(--accent-text-muted)'">
                            {{ policy.name }}
                        </a>

                        <div v-else class="relative" ref="moreMenuRef">
                            <button @click="toggleMore"
                                class="text-xs uppercase tracking-widest transition-colors font-bold flex items-center gap-1 outline-none cursor-pointer"
                                :style="{ color: isMoreOpen ? 'var(--accent-text)' : 'var(--accent-text-muted)' }">
                                {{ policy.name }}
                                <svg class="w-3 h-3 transition-transform duration-300"
                                    :class="{ 'rotate-180': isMoreOpen }" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <div v-show="isMoreOpen"
                                class="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 p-1.5 rounded-xl border z-50 shadow-2xl backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-2"
                                :style="{
                                    backgroundColor: 'var(--footer-bg-color)',
                                    borderColor: 'var(--section-border)'
                                }">

                                <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-r border-b"
                                    :style="{ backgroundColor: 'var(--footer-bg-color)', borderColor: 'var(--section-border)' }">
                                </div>

                                <div class="relative space-y-1">
                                    <router-link to="/privacy-policy"
                                        class="flex items-center px-4 py-2.5 text-[10px] uppercase tracking-wider font-bold rounded-lg transition-all duration-200 hover:bg-white/[0.08]"
                                        :style="{ color: 'var(--accent-text-muted)' }" @click="isMoreOpen = false">
                                        Privacy Policy
                                    </router-link>

                                    <router-link to="/read-more"
                                        class="flex items-center px-4 py-2.5 text-[10px] uppercase tracking-wider font-bold rounded-lg transition-all duration-200 hover:bg-white/[0.08]"
                                        :style="{ color: 'var(--accent-text-muted)' }" @click="isMoreOpen = false">
                                        Read More
                                    </router-link>

                                    <router-link to="/faqs"
                                        class="flex items-center px-4 py-2.5 text-[10px] uppercase tracking-wider font-bold rounded-lg transition-all duration-200 hover:bg-white/[0.08]"
                                        :style="{ color: 'var(--accent-text-muted)' }" @click="isMoreOpen = false">
                                        FAQs
                                    </router-link>

                                    <router-link to="/portfolio-map"
                                        class="flex items-center px-4 py-2.5 text-[10px] uppercase tracking-wider font-bold rounded-lg transition-all duration-200 hover:bg-white/[0.08]"
                                        :style="{ color: 'var(--accent-text-muted)' }" @click="isMoreOpen = false">
                                        Portfolio Map
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>

        </div>
    </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/vue/24/outline';

const isMoreOpen = ref(false);
const moreMenuRef = ref(null);

const toggleMore = (event) => {
    event.stopPropagation(); // Prevent immediate closing from the document listener
    isMoreOpen.value = !isMoreOpen.value;
};

// Close menu when clicking anywhere else
const closeMenu = (e) => {
    if (moreMenuRef.value && !moreMenuRef.value.contains(e.target)) {
        isMoreOpen.value = false;
    }
};

onMounted(() => document.addEventListener('click', closeMenu));
onUnmounted(() => document.removeEventListener('click', closeMenu));

const contactLinks = [
    { label: 'Email', href: 'mailto:sovisalsing@gmail.com', icon: EnvelopeIcon },
    { label: 'Phone', href: 'tel:+855962521705', icon: PhoneIcon },
    { label: 'Location', href: '#contact', icon: MapPinIcon },
];

const quickLinks = [
    { name: 'Home Portfolio', href: '#home' },
    { name: 'About Expertise', href: '#about' },
    { name: 'My Services', href: '#services' },
    { name: 'Recent Work', href: '#projects' },
    { name: 'Contact Me', href: '#contact' },
];

const services = [
    'Full-Stack Web Systems',
    'Mobile Application Dev',
    'UI/UX Product Design',
    'API Architecture',
    'DevOps & Cloud Solutions',
];

const policyLinks = [
    // { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-services' },
    { name: 'More' },
];
</script>