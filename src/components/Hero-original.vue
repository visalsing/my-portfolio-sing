<template>
    <!-- <section class="relative w-full overflow-hidden min-h-screen flex items-center" id="home_hero"> -->
    <section class="relative w-full overflow-hidden min-h-screen flex items-center py-16 md:py-20" id="home_hero">
        <div class="w-full px-5 sm:px-8 md:px-12 lg:px-8 max-w-5xl lg:max-w-7xl mx-auto relative z-10">
            <div class="grid lg:grid-cols-2 gap-10 xl:gap-14 items-center">

                <div class="flex flex-col md:mt-0 mt-20 justify-center">
                    <div class="text-white lg:text-left" data-aos="fade-right">
                        <h1 class="text-white font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
                            {{ t('hi_im') }} <span
                                class="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                                {{t('visalsing')}}
                            </span>👋
                            <!-- --accent-from -->
                        </h1>
                        <p class="text-blue-200 font-medium text-lg md:text-xl mt-4" data-aos="fade-right"
                            data-aos-delay="100">
                            <span ref="typingText"></span><span class="cursor">|</span>
                        </p>
                    </div>
                    <p class="text-gray-300 pt-6 text-center lg:text-left mx-auto max-w-xl text-lg leading-relaxed"
                        data-aos="fade-right" data-aos-delay="200">
                        {{ t('hero_long_text') }}
                    </p>
                    <div class="flex items-center gap-4 pt-8 flex-col sm:flex-row sm:w-max sm:mx-auto lg:mx-0"
                        data-aos="fade-up" data-aos-delay="300">
                        <!-- <button
                            class="px-8 md:px-10 py-4 rounded-xl relative group w-full sm:w-max flex justify-center overflow-hidden
                    bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 transition-all duration-300">
                            <span class="relative flex items-center justify-center text-white font-semibold text-lg">
                                Contact Me
                                <ArrowRightIcon class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button> -->

                        <!-- <a href="https://web.telegram.org/a/" target="_blank"
    class="px-8 md:px-10 py-4 rounded-xl relative group w-full sm:w-max flex justify-center overflow-hidden
bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 transition-all duration-300">
    
    <span class="relative flex items-center justify-center text-white font-semibold text-lg">
        Contact Me
        <ArrowRightIcon class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </span>

</a> -->

                        <!-- <a href="../components/pages/Details.vue" target="_blank" class="px-8 md:px-10 py-4 rounded-xl relative group w-full sm:w-max flex justify-center overflow-hidden
bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 transition-all duration-300">

                            <span class="relative flex items-center justify-center text-white font-semibold text-lg">
                                Contact Me
                                <ArrowRightIcon class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>

                        </a> -->

                        <router-link to="/details" class="px-8 md:px-10 py-4 rounded-xl relative group w-full sm:w-max flex justify-center overflow-hidden
bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 transition-all duration-300">

                            <span class="relative flex items-center justify-center text-white font-semibold text-lg">
                                {{ t('contact_me') }}
                                <ArrowRightIcon class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>

                        </router-link>

                        <button class="border-2 border-blue-400 px-8 md:px-10 py-4 rounded-xl relative group w-full sm:w-max flex
                    justify-center hover:bg-blue-400/10 transition-all duration-300">
                            <div class="flex items-center justify-center relative">
                                <ArrowDownTrayIcon
                                    class="w-5 h-5 text-blue-400 group-hover:translate-y-1 transition-transform" />
                                <span class="pl-3 text-blue-400 font-semibold text-lg">{{ t('download_cv') }}</span>
                            </div>
                        </button>
                    </div>
                </div>

                <!-- shadow-[0_0_50px_rgba(37,99,235,0.3)] -->
                <div class="relative group">
                    <div class="relative z-10 mx-auto lg:mx-0
                        bg-linear-to-r from-blue-600 to-cyan-600
                        
                        shadow-[0_0_20px_rgba(59,130,246,0.25),0_0_40px_rgba(6,182,212,0.2),0_0_70px_rgba(6,182,212,0.15)]
                        backdrop-blur-sm border border-blue-500/30
                        rounded-full
                        p-4
                        w-[260px] h-[260px]
                        sm:w-[320px] sm:h-[320px]
                        md:w-[400px] md:h-[400px]
                        lg:w-[500px] lg:h-[500px]
                        xl:w-[550px] xl:h-[550px]" data-aos="zoom-in" data-aos-delay="500">

                        <div class="w-full h-full rounded-full overflow-hidden relative z-10">
                            <img src="../../public/hero-2.png" alt="Sing" loading="lazy"
                                class="w-full h-full object-contain" />
                        </div>
                    </div>

                    <div
                        class="absolute top-0 -left-4 w-12 h-12 bg-blue-500/20 rounded-full blur-sm animate-float-slow">
                    </div>
                    <div
                        class="absolute bottom-10 -right-4 w-16 h-16 bg-cyan-500/20 rounded-full blur-sm animate-float-reverse">
                    </div>
                    <div
                        class="absolute top-1/2 -left-12 w-8 h-8 bg-white/10 rounded-full blur-sm animate-float-delayed">
                    </div>

                    <div class="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full -z-10"></div>

                    <!-- <div class="absolute inset-0 pointer-events-none z-20">

                        <div class="absolute top-[5%] left-[10%] animate-float-slow">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
                                class="w-10 h-10 md:w-16 md:h-16 opacity-90" alt="Vue" />
                        </div>

                        <div class="absolute top-[8%] right-[12%] animate-float-delayed">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                                class="w-10 h-10 md:w-16 md:h-16 opacity-90" alt="Node" />
                        </div>

                        <div class="absolute top-[40%] right-[-5%] animate-float-reverse">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                                class="w-10 h-10 md:w-14 md:h-14 opacity-80" alt="React" />
                        </div>

                        <div class="absolute top-[35%] left-[-8%] animate-float">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg"
                                class="w-10 h-10 md:w-14 md:h-14 opacity-80" alt="Laravel" />
                        </div>

                        <div class="absolute bottom-[10%] left-[5%] animate-float-reverse">
                            <img src="https://www.vectorlogo.zone/logos/mysql/mysql-official.svg"
                                class="w-20 h-20 md:w-24 md:h-24 opacity-90 drop-shadow-[0_0_15px_rgba(0,117,143,0.6)]"
                                alt="MySQL" />
                        </div>

                        <div class="absolute bottom-[10%] right-[15%] animate-float-slow-delayed">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
                                class="w-9 h-9 md:w-12 md:h-12 opacity-80" alt="Postgres" />
                        </div>
                    </div> -->
                </div>

            </div>
        </div>
    </section>
</template>

<script setup>
import { ArrowRightIcon, ArrowDownTrayIcon } from '@heroicons/vue/16/solid';
import { ref, onMounted } from 'vue';
import { currentLang, t, setLanguage } from './../stores/languages';

const typingText = ref(null)
const roles = ["Web Developer", "Front-end Developer", "Back-end Developer", "UX/UI Designer", "API Integrator", "Email Marketer"]

onMounted(() => {
    let roleIndex = 0; let charIndex = 0; let isDeleting = false;
    function typeEffect() {
        const currentRole = roles[roleIndex]
        typingText.value.textContent = isDeleting ? currentRole.substring(0, charIndex--) : currentRole.substring(0, charIndex++)
        let speed = isDeleting ? 40 : 80
        if (!isDeleting && charIndex === currentRole.length + 1) { speed = 1500; isDeleting = true; }
        else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; }
        setTimeout(typeEffect, speed)
    }
    typeEffect()
})
</script>

<style scoped>
@keyframes float {

    0%,
    100% {
        transform: translateY(0px) translateX(0px);
    }

    33% {
        transform: translateY(-15px) translateX(10px);
    }

    66% {
        transform: translateY(10px) translateX(-10px);
    }
}

@keyframes float-reverse {

    0%,
    100% {
        transform: translateY(0px) translateX(0px);
    }

    33% {
        transform: translateY(15px) translateX(-10px);
    }

    66% {
        transform: translateY(-10px) translateX(10px);
    }
}

.animate-float-slow {
    animation: float 8s ease-in-out infinite;
}

.animate-float-reverse {
    animation: float-reverse 10s ease-in-out infinite;
}

.animate-float-delayed {
    animation: float 7s ease-in-out infinite 2s;
}

.cursor {
    animation: blink 1s infinite;
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}
</style>