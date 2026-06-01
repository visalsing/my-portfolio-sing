<template>
    <footer
        class="relative border-t"
        :style="{
            backgroundColor: 'var(--footer-bg-color)', // #0E131F #0F1623
            borderColor:     'var(--section-border)'
        }"
    >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 py-12">

            <!-- ── Top Grid ── -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">

                <!-- Brand -->
                <div class="md:col-span-2">
                    <div
                        class="text-2xl font-bold bg-clip-text text-transparent mb-4"
                        :style="{ backgroundImage: 'var(--logo-gradient)' }"
                    >
                        Sing.dev
                    </div>

                    <p class="text-sm leading-relaxed max-w-md" :style="{ color: 'var(--surface-text-sub)' }">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                        Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                        Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
                    </p>

                    <!-- Contact icon buttons -->
                    <div class="flex gap-4 mt-6">
                        <a
                            v-for="contact in contactLinks"
                            :key="contact.label"
                            :href="contact.href"
                            class="p-2 rounded-lg transition-all"
                            :style="{
                                backgroundColor: 'var(--accent-bg)',
                                border:          '1px solid var(--accent-border)',
                                color:           'var(--accent-text)'
                            }"
                            @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--accent-bg-hover)'"
                            @mouseleave="e => e.currentTarget.style.backgroundColor = 'var(--accent-bg)'"
                        >
                            <component :is="contact.icon" class="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <!-- Quick Links -->
                <div>
                    <h3 class="text-[var(--surface-text-sub)] font-semibold mb-4">Quick Links</h3>
                    <ul class="space-y-2">
                        <li v-for="link in quickLinks" :key="link.name">
                            <a
                                :href="link.href"
                                class="text-sm transition-colors"
                                :style="{ color: 'var(--accent-text)' }"
                                @mouseenter="e => e.currentTarget.style.color = 'var(--accent-to-pill-txt-dynamic)'"
                                @mouseleave="e => e.currentTarget.style.color = 'var(--accent-text-muted)'"
                            >
                                {{ link.name }}
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Services -->
                <div>
                    <h3 class="text-[var(--surface-text-sub)] font-semibold mb-4">Services</h3>
                    <ul class="space-y-2">
                        <li v-for="service in services" :key="service">
                            <span class="text-sm" :style="{ color: 'var(--accent-text)' }">
                                {{ service }}
                            </span>
                        </li>
                    </ul>
                </div>

            </div>

            <!-- ── Bottom Bar ── -->
            <div
                class="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center"
                :style="{ borderColor: 'var(--section-border)' }"
            >
                <p class="text-sm" :style="{ color: 'var(--accent-text)' }">
                    © 2026 Sing. All rights reserved.
                </p>

                <div class="flex gap-6 mt-4 md:mt-0">
                    <a
                        v-for="policy in policyLinks"
                        :key="policy.name"
                        :href="policy.href"
                        class="text-sm transition-colors"
                        :style="{ color: 'var(--accent-text)' }"
                        @mouseenter="e => e.currentTarget.style.color = 'var(--accent-text-light)'"
                        @mouseleave="e => e.currentTarget.style.color = 'var(--accent-text)'"
                    >
                        {{ policy.name }}
                    </a>
                </div>
            </div>

        </div>
    </footer>
</template>

<script setup>
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/vue/24/outline';

const contactLinks = [
    { label: 'Email',    href: 'mailto:sovisalsing@gmail.com', icon: EnvelopeIcon },
    { label: 'Phone',    href: 'tel:+855962521705',            icon: PhoneIcon    },
    { label: 'Location', href: '#contact',                     icon: MapPinIcon   },
];

const quickLinks = [
    { name: 'Home',         href: '#home'         },
    { name: 'About',        href: '#about'        },
    { name: 'Services',     href: '#services'     },
    { name: 'Projects',     href: '#projects'     },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact',      href: '#contact'      },
];

const services = [
    'Web Development',
    'Mobile Development',
    'UI/UX Design',
    'Technical Writing',
    'Consultation',
];

const policyLinks = [
    { name: 'Privacy Policy',   href: '#' },
    { name: 'Terms of Service', href: '#' },
];
</script>