<template>
    <section class="relative w-full overflow-hidden min-h-screen flex items-center py-16 md:py-20" id="home_hero">
        <div class="w-full px-5 sm:px-8 md:px-12 lg:px-8 max-w-5xl lg:max-w-7xl mx-auto relative z-10">
            <div class="grid lg:grid-cols-2 gap-10 xl:gap-14 items-center">

                <div class="flex flex-col md:mt-0 mt-20 justify-center">
                    <div class="lg:text-left" data-aos="fade-right">
                        <h1
                            class="font-bold text-4xl md:text-5xl lg:text-6xl leading-tight"
                            :style="{ color: 'var(--surface-text)' }"
                        >
                            {{ t('hi_im') }}
                            <span
                                class="text-transparent bg-clip-text"
                                :style="{ backgroundImage: 'var(--logo-gradient)' }"
                            >
                                {{ t('visalsing') }}
                            </span>👋
                        </h1>
                        <p
                            class="font-medium text-lg md:text-xl mt-4"
                            :style="{ color: 'var(--accent-text-muted)' }"
                            data-aos="fade-right"
                            data-aos-delay="100"
                        >
                            <span ref="typingText"></span><span class="cursor">|</span>
                        </p>
                    </div>

                    <p
                        class="pt-6 text-center lg:text-left mx-auto max-w-xl text-lg leading-relaxed"
                        :style="{ color: 'var(--surface-text-sub)' }"
                        data-aos="fade-right"
                        data-aos-delay="200"
                    >
                        {{ t('hero_long_text') }}
                    </p>

                    <div
                        class="flex items-center gap-4 pt-8 flex-col sm:flex-row sm:w-max sm:mx-auto lg:mx-0"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        <!-- Contact Me -->
                        <router-link
                            to="/#contacts"
                            class="px-8 md:px-10 py-4 rounded-xl relative group w-full sm:w-max flex justify-center overflow-hidden transition-all duration-300"
                            :style="{ background: 'var(--cta-gradient)' }"
                            @mouseenter="e => e.currentTarget.style.filter = 'brightness(1.15)'"
                            @mouseleave="e => e.currentTarget.style.filter = 'brightness(1)'"
                        >
                            <span class="relative flex items-center justify-center text-white font-semibold text-lg">
                                {{ t('contact_me') }}
                                <ArrowRightIcon class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </router-link>

                        <!-- Download CV -->
                        <button
                            class="px-8 md:px-10 py-4 rounded-xl relative group w-full sm:w-max flex justify-center border-2 transition-all duration-300"
                            :style="{
                                borderColor: 'var(--accent-text)',
                                color: 'var(--accent-text)'
                            }"
                            @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--accent-bg)'"
                            @mouseleave="e => e.currentTarget.style.backgroundColor = 'transparent'"
                        >
                            <div class="flex items-center justify-center relative">
                                <ArrowDownTrayIcon class="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                                <span class="pl-3 font-semibold text-lg">{{ t('download_cv') }}</span>
                            </div>
                        </button>
                    </div>
                </div>

                <!-- Profile image -->
                <div class="relative group">
                    <div
                        class="relative z-10 mx-auto lg:mx-0 backdrop-blur-sm rounded-full p-4
                               w-[260px] h-[260px]
                               sm:w-[320px] sm:h-[320px]
                               md:w-[400px] md:h-[400px]
                               lg:w-[500px] lg:h-[500px]
                               xl:w-[550px] xl:h-[550px]"
                        :style="{
                            background: 'var(--cta-gradient)',
                            border: '1px solid var(--accent-border)',
                            boxShadow: `0 0 20px var(--accent-shadow), 0 0 60px var(--accent-shadow), 0 0 100px var(--accent-shadow)`
                        }"
                        data-aos="zoom-in"
                        data-aos-delay="500"
                    >
                        <div class="w-full h-full rounded-full overflow-hidden relative z-10">
                            <img
                                src="../../public/hero-2.png"
                                alt="Sing"
                                loading="lazy"
                                class="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    <!-- Floating orbs -->
                    <div
                        class="absolute top-0 -left-4 w-12 h-12 rounded-full blur-sm animate-float-slow"
                        :style="{ backgroundColor: 'var(--accent-bg-hover)' }"
                    ></div>
                    <div
                        class="absolute bottom-10 -right-4 w-16 h-16 rounded-full blur-sm animate-float-reverse"
                        :style="{ backgroundColor: 'var(--accent-bg)' }"
                    ></div>
                    <!-- neutral decorative — intentionally fixed -->
                    <div class="absolute top-1/2 -left-12 w-8 h-8 bg-white/10 rounded-full blur-sm animate-float-delayed"></div>

                    <!-- Background glow -->
                    <div
                        class="absolute inset-0 blur-[100px] rounded-full -z-10"
                        :style="{ backgroundColor: 'var(--accent-bg)' }"
                    ></div>
                </div>

            </div>
        </div>
    </section>
</template>

<script setup>
import { ArrowRightIcon, ArrowDownTrayIcon } from '@heroicons/vue/16/solid';
import { ref, onMounted } from 'vue';
import { t } from './../stores/languages';

const typingText = ref(null);
const roles = [
    "Web Developer",
    "Front-end Developer",
    "Back-end Developer",
    "UX/UI Designer",
    "API Integrator",
    "Email Marketer"
];

onMounted(() => {
    let roleIndex = 0, charIndex = 0, isDeleting = false;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        typingText.value.textContent = isDeleting
            ? currentRole.substring(0, charIndex--)
            : currentRole.substring(0, charIndex++);

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentRole.length + 1) {
            speed = 1500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();
});
</script>

<style scoped>
@keyframes float {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    33%       { transform: translateY(-15px) translateX(10px); }
    66%       { transform: translateY(10px) translateX(-10px); }
}
@keyframes float-reverse {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    33%       { transform: translateY(15px) translateX(-10px); }
    66%       { transform: translateY(-10px) translateX(10px); }
}

.animate-float-slow    { animation: float 8s ease-in-out infinite; }
.animate-float-reverse { animation: float-reverse 10s ease-in-out infinite; }
.animate-float-delayed { animation: float 7s ease-in-out infinite 2s; }

.cursor { animation: blink 1s infinite; }
@keyframes blink { 50% { opacity: 0; } }
</style>