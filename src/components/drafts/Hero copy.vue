<template>
    <section class="relative w-full overflow-hidden min-h-screen flex items-center" id="home_hero">
        <div class="w-full px-5 sm:px-8 md:px-12 lg:px-8 max-w-5xl 
        lg:max-w-7xl mx-auto relative z-10">
            <div class="grid lg:grid-cols-2 gap-10 xl:gap-14 items-center">
                <div class="flex flex-col md:mt-0 mt-20 justify-center">
                    <div class="text-white lg:text-left" data-aos="fade-right">
                        <h1 class="text-white font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
                            Hi, I'm <span class="text-transparent bg-clip-text bg-linear-to-r from-blue-400
                        to-cyan-400">
                                Visalsing
                            </span>👋
                        </h1>
                        <!-- <p class="text-blue-200 font-medium text-lg md:text-xl mt-4" data-aos="fade-right"
                            data-aos-delay="100">
                            Full-Stack Developer & UI/UX Designer
                        </p> -->
                        <p class="text-blue-200 font-medium text-lg md:text-xl mt-4" data-aos="fade-right"
                            data-aos-delay="100">
                            <span ref="typingText"></span><span class="cursor">|</span>
                        </p>

                    </div>
                    <p class="text-gray-300 pt-6 text-center lg:text-left mx-auto max-w-xl text-lg leading-relaxed"
                        data-aos="fade-right" data-aos-delay="200">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                        of type and scrambled it to make a type specimen book.
                    </p>
                    <div class="flex items-center gap-4 pt-8 flex-col sm:flex-row sm:w-max sm:mx-auto lg:mx-0"
                        data-aos="fade-up" data-aos-delay="300">
                        <button class="px-8 md:px-10 py-4 rounded-xl relative group w-full sm:w-max flex justify-center overflow-hidden
                    bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500
                    transition-all duration-300">
                            <span class="relative flex items-center justify-center text-white font-semibold text-lg">
                                Contact Me
                                <ArrowRightIcon class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                        <button class="border-2 border-blue-400 px-8 md:px-10 py-4 rounded-xl relative group w-full sm:w-max flex
                    justify-center hover:bg-blue-400/10 transition-all duration-300">
                            <div class="flex items-center justify-center relative">
                                <ArrowDownTrayIcon
                                    class="w-5 h-5 text-blue-400 group-hover:translate-y-1 transition-transform" />
                                <span class="pl-3 text-blue-400 font-semibold text-lg">
                                    Download CV
                                </span>
                            </div>
                        </button>
                    </div>
                    <div class="flex items-center justify-center lg:justify-start gap-8 pt-12" data-oas="fade-up"
                        data-aos-delay="400">
                        <div class="text-center">
                            <div class="text-2xl font-bold text-blue-400">50+</div>
                            <div class="text-blue-200 text-sm">Projects</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-blue-400">3+</div>
                            <div class="text-blue-200 text-sm">Years</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-blue-400">40+</div>
                            <div class="text-blue-200 text-sm">Clients</div>
                        </div>
                    </div>
                </div>
                <!-- Image -->
                <!-- <div class="relative z-10 bg-linear-to-r from-blue-600 to-cyan-600 shadow-2xl 
                rounded-[50%_40%_30%_60%/60%_30%_70%_30%] p-4 backdrop-blur-sm border border-blue-500/30-translate-y-6"
                    data-aos="zoom-in" data-aos-delay="500">
                    <div class="rounded-xl overflow-hidden">
                        <img src="../../public/hero.png" alt="Sing - Full-Stack Developer" loading="lazy"
                            class="w-[500px] h-[500px] object-contain-translate-y-8">
                    </div>
                </div>
                <div
                    class="absolute -top-2 -right-4 w-10 h-10 bg-blue-400 rounded-full blur-sm opacity-6 animate-pulse">
                </div> -->
                <!-- Image -->
                <!-- <div class="relative z-10 mx-auto lg:mx-0
    bg-linear-to-r from-blue-600 to-cyan-600
    shadow-2xl backdrop-blur-sm border border-blue-500/30
    rounded-[50%_40%_30%_60%/60%_30%_70%_30%]
    p-4
    w-[260px] h-[260px]
    sm:w-[320px] sm:h-[320px]
    md:w-[400px] md:h-[400px]
    lg:w-[520px] lg:h-[520px]
    xl:w-[600px] xl:h-[600px]" data-aos="zoom-in" data-aos-delay="500">
                    <div class="w-full h-full rounded-xl overflow-hidden">
                        <img src="../../public/hero.png" alt="Sing - Full-Stack Developer" loading="lazy"
                            class="w-full h-full object-contain" />
                    </div>

                    -- floating dot --
                    <div class="absolute -top-4 -right-4 w-10 h-10
        bg-blue-400 rounded-full blur-md opacity-60 animate-pulse"></div>
                </div> -->

                <div class="relative z-10 mx-auto lg:mx-0
    bg-linear-to-r from-blue-600 to-cyan-600
    shadow-2xl backdrop-blur-sm border border-blue-500/30
    rounded-[50%_40%_30%_60%/60%_30%_70%_30%]
    p-4
    w-[260px] h-[260px]
    sm:w-[320px] sm:h-[320px]
    md:w-[400px] md:h-[400px]
    lg:w-[520px] lg:h-[520px]
    xl:w-[600px] xl:h-[600px]" data-aos="zoom-in" data-aos-delay="500">

                    <div class="w-full h-full rounded-xl overflow-hidden relative z-10">
                        <img src="../../public/hero.png" alt="Sing" loading="lazy"
                            class="w-full h-full object-contain" />
                    </div>

                    <div class="absolute inset-0 pointer-events-none z-20">

                        <div class="absolute top-[2%] left-[38%] animate-float-slow">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg"
                                class="w-8 h-8 md:w-12 md:h-12" alt="Laravel" />
                        </div>
                        <div class="absolute top-[8%] left-[10%] animate-float-delayed">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
                                class="w-8 h-8 md:w-12 md:h-12" alt="Vue" />
                        </div>
                        <div class="absolute top-[12%] right-[10%] animate-float-slow-delayed">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                                class="w-8 h-8 md:w-12 md:h-12" alt="React" />
                        </div>
                        <div class="absolute top-[28%] left-[-10%] animate-float">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
                                class="w-7 h-7 md:w-11 md:h-11" alt="Tailwind" />
                        </div>
                        <div class="absolute top-[25%] right-[-10%] animate-float-reverse">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg"
                                class="w-7 h-7 md:w-11 md:h-11" alt="Bootstrap" />
                        </div>
                        <div class="absolute top-[-8%] left-[50%] animate-float">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                                class="w-8 h-8 md:w-12 md:h-12" alt="Node" />
                        </div>
                        <div class="absolute top-[55%] left-[-12%] animate-float-delayed">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
                                class="w-7 h-7 md:w-11 md:h-11 bg-white rounded-full p-1" alt="Express" />
                        </div>

                        <div class="absolute top-[42%] left-[-15%] animate-float-slow">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
                                class="w-7 h-7 md:w-10 md:h-10" alt="MySQL" />
                        </div>
                        <div class="absolute top-[38%] right-[-15%] animate-float-delayed">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
                                class="w-7 h-7 md:w-10 md:h-10" alt="PostgreSQL" />
                        </div>
                        <div class="absolute top-[52%] right-[-12%] animate-float-slow-delayed">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
                                class="w-7 h-7 md:w-10 md:h-10" alt="MongoDB" />
                        </div>
                        <div class="absolute top-[68%] right-[5%] animate-float">
                            <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg"
                                class="w-7 h-7 md:w-10 md:h-10" alt="Postman" />
                        </div>
                        <div class="absolute top-[72%] left-[15%] animate-float-reverse">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
                                class="w-7 h-7 md:w-10 md:h-10" alt="Git" />
                        </div>
                        <div class="absolute top-[20%] left-[2%] animate-float-delayed">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg"
                                class="w-6 h-6 md:w-9 md:h-9" alt="Vite" />
                        </div>

                        <div class="absolute top-[-2%] left-[25%] animate-float-slow opacity-60">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg"
                                class="w-5 h-5 md:w-7 md:h-7" alt="PHP" />
                        </div>
                        <div class="absolute top-[18%] left-[-5%] animate-float-delayed opacity-60">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                                class="w-6 h-6 md:w-8 md:h-8 rounded" alt="JS" />
                        </div>
                        <div class="absolute top-[32%] right-[2%] animate-float opacity-60">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                                class="w-6 h-6 md:w-8 md:h-8" alt="Python" />
                        </div>
                        <div class="absolute top-[65%] left-[-5%] animate-float-reverse opacity-60">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg"
                                class="w-5 h-5 md:w-7 md:h-7" alt="C" />
                        </div>
                        <div class="absolute top-[58%] right-[2%] animate-float opacity-60">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"
                                class="w-5 h-5 md:w-7 md:h-7" alt="C++" />
                        </div>
                        <div class="absolute top-[5%] left-[65%] animate-float-slow opacity-60">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
                                class="w-6 h-6 md:w-8 md:h-8" alt="HTML" />
                        </div>
                        <div class="absolute top-[15%] right-[-2%] animate-float-delayed opacity-60">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
                                class="w-6 h-6 md:w-8 md:h-8" alt="CSS" />
                        </div>
                    </div>

                    <!-- -- floating dot -- -->
                    <div class="absolute -top-4 -right-4 w-10 h-10
        bg-blue-400 rounded-full blur-md opacity-60 animate-pulse"></div>
                </div>



            </div>
        </div>
    </section>
</template>
<script setup>
import { ArrowRightIcon, ArrowDownTrayIcon } from '@heroicons/vue/16/solid';

// ---------------------------------------------------------------------------------
import { ref, onMounted } from 'vue'

const typingText = ref(null)

const roles = [
    "Front-end Developer",
    "Back-end Developer",
    "UX/UI Designer",
    "API Integrator",
    "API Developer",
    "API Tester",
    "Email Marketer",
    "Polyglot Tasker"
]

onMounted(() => {

    let roleIndex = 0
    let charIndex = 0
    let isDeleting = false

    function typeEffect() {

        const currentRole = roles[roleIndex]

        if (!isDeleting) {
            typingText.value.textContent = currentRole.substring(0, charIndex++)
        } else {
            typingText.value.textContent = currentRole.substring(0, charIndex--)
        }

        let speed = isDeleting ? 40 : 80

        if (!isDeleting && charIndex === currentRole.length + 1) {
            speed = 1500
            isDeleting = true
        }
        else if (isDeleting && charIndex === 0) {
            isDeleting = false
            roleIndex = (roleIndex + 1) % roles.length
        }

        setTimeout(typeEffect, speed)
    }

    typeEffect()
})
</script>

<style scoped>
/* Smooth flight loops */
@keyframes float {

    0%,
    100% {
        transform: translateY(0px) translateX(0px);
    }

    33% {
        transform: translateY(-8px) translateX(4px);
    }

    66% {
        transform: translateY(4px) translateX(-4px);
    }
}

@keyframes float-reverse {

    0%,
    100% {
        transform: translateY(0px) translateX(0px);
    }

    33% {
        transform: translateY(8px) translateX(-4px);
    }

    66% {
        transform: translateY(-4px) translateX(4px);
    }
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}

.animate-float-slow {
    animation: float 9s ease-in-out infinite;
}

.animate-float-delayed {
    animation: float 7s ease-in-out infinite 1s;
}

.animate-float-slow-delayed {
    animation: float 10s ease-in-out infinite 1.5s;
}

.animate-float-reverse {
    animation: float-reverse 8s ease-in-out infinite;
}

/* Clean looks - no shadows */
@keyframes orbit {

    0%,
    100% {
        transform: translate(0, 0);
    }

    50% {
        transform: translate(10px, -10px);
    }
}

.z-20 img {
    /* This makes them blend better into the dark theme */
    filter: grayscale(20%) brightness(0.9);
    transition: all 0.4s ease;
}

.z-20 img:hover {
    filter: grayscale(0%) brightness(1.1);
    transform: scale(1.2) translateY(-5px);
    opacity: 1 !important;
}
</style>


<!-- 20:01 -->