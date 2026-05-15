<template>
    <section class="relative py-20 overflow-hidden" id="testimonials">
        <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            <!-- ── Heading ── -->
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
                    {{ t('client1_') }}
                    <span
                        class="text-transparent bg-clip-text"
                        :style="{ backgroundImage: 'var(--logo-gradient)' }"
                    >{{ t('testimonials') }}</span>{{ t('_client2') }}
                </h2>
                <p class="text-lg" :style="{ color: 'var(--accent-text-muted)' }">
                    What people say about working with me
                </p>
            </div>

            <!-- ── Cards ── -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                    v-for="(testimonial, index) in testimonials"
                    :key="testimonial.id"
                    class="rounded-2xl p-6 backdrop-blur-sm transition-all duration-300"
                    :style="{
                        background:  'linear-gradient(to bottom right, rgba(31,41,55,0.50), var(--section-grad-to))',
                        border:      '1px solid var(--section-border)'
                    }"
                    data-aos="fade-up"
                    :data-aos-delay="index * 100"
                    @mouseenter="e => e.currentTarget.style.borderColor = 'var(--accent-text)'"
                    @mouseleave="e => e.currentTarget.style.borderColor = 'var(--section-border)'"
                >
                    <!-- Stars -->
                    <div class="flex gap-1 mb-4">
                        <StarIcon
                            v-for="n in 5"
                            :key="n"
                            class="w-5 h-5"
                            :style="{ color: 'var(--accent-star)' }"
                        />
                    </div>

                    <!-- Text -->
                    <p class="text-blue-100 text-sm leading-relaxed mb-6">
                        "{{ testimonial.text }}"
                    </p>

                    <!-- Client -->
                    <div class="flex items-center gap-4">
                        <div
                            class="w-12 h-12 rounded-full overflow-hidden border-2"
                            :style="{ borderColor: 'var(--accent-border-hover)' }"
                        >
                            <img
                                :src="testimonial.avatar"
                                :alt="testimonial.name"
                                class="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <p class="text-white font-semibold">{{ testimonial.name }}</p>
                            <p class="text-sm" :style="{ color: 'var(--accent-text-light)' }">
                                {{ testimonial.position }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<script setup>
import { StarIcon } from '@heroicons/vue/16/solid';
// 1. Remove the imports of the images
import { t } from './../stores/languages.js';

const testimonials = [
    {
        id: 1,
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
        name: "Sarah Johnson",
        position: "CEO, TechCorp",
        // 2. Use the path string directly
        avatar: "/person1.jpg", 
    },
    {
        id: 2,
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
        name: "Michael Chen",
        position: "Product Manager",
        avatar: "/person2.jpg",
    },
    {
        id: 3,
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
        name: "Emily Davis",
        position: "Startup Founder",
        avatar: "/person3.jpeg",
    },
];
</script>

<!-- <script setup>
import { StarIcon } from '@heroicons/vue/16/solid';
import person1 from '../../public/person1.jpg';
import person2 from '../../public/person2.jpg';
import person3 from '../../public/person3.jpeg';
import { t } from './../stores/languages.js';

const testimonials = [
    {
        id: 1,
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
        name: "Sarah Johnson",
        position: "CES, TechCorp",
        avatar: person1,
    },
    {
        id: 2,
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
        name: "Michael Chen",
        position: "Product Manager",
        avatar: person2,
    },
    
    {
        id: 3,
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
        name: "Emily Davis",
        position: "Startup Founder",
        avatar: person3,
    },
];
</script> -->