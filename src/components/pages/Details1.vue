<template>

    <div class="min-h-screen bg-black text-white">
        <header class="flex justify-between items-center p-6 bg-opacity-50 relative z-20">
            <div class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                <!-- bg-linear-to-r -->
                Dev <span class="font-black">Portfolio</span>
            </div>
            <div class="md:hidden z-30">
                <button type="button"
                    class="block focus:outline-none p-2 rounded-lg bg-blue-800/50 hover:bg-blue-700/50 transition-all duration-300"
                    @click="isMenuOpen = !isMenuOpen">
                    <div class="relative w-6 h-6">
                        <span :class="[`absolute left-0 w-6 h-0.5 bg-blue-200 transition-all duration-300`,
                            isMenuOpen ? 'rotate-45 top-3 ' : 'top-1'
                        ]"></span>
                        <span :class="[`absolute left-0 w-6 h-0.5 bg-blue-200 transition-all duration-300`,
                            isMenuOpen ? 'opacity-0 ' : 'top-3 opacity-100'
                        ]"></span>
                        <span :class="[`absolute left-0 w-6 h-0.5 bg-blue-200 transition-all duration-300`,
                            isMenuOpen ? '-rotate-45 top-3 ' : 'top-5'
                        ]"></span>
                    </div>
                </button>
            </div>
            <nav :class="[
                `fixed inset-0 z-20 flex flex-col items-center justify-center bg-[#111827] md:relative md:bg-transparent md:flex
            md:justify-between md:flex-row `,
                isMenuOpen ? 'block' : 'hidden'
            ]">
                <!-- <ul class="flex flex-col items-center space-y-5 md:flex-row md:space-x-5 md:space-y-0">
                <li v-for="item in Menu" :key="item.name" class="group relative">
                    <a :href="item.href" class="relative block text-blue-100 hover:text-blue-400 transition-all 
                duration-300 text-xl md:text-base font-medium group" @click="scrollToSection(item.href)">
                        {{ item.name }}
                        <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all
                duration-300 group-hover:w-full"></span>
                    </a>
                </li>
            </ul> -->
                <div class="mt-8 md:mt-0 md:ml-8">
                    <router-link to="/#about" class="px-6 py-2.5 bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-full
            hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                        Back
                    </router-link>
                </div>
            </nav>
        </header>

        <section class="py-24 px-6 bg-black text-white">
            <div class="max-w-6xl mx-auto">

                <div class="mb-16 border-b border-white/10 pb-10" data-aos="fade-down">
                    <h1 class="text-6xl md:text-8xl font-black tracking-tighter">
                        ABOUT <span class="text-blue-500">ME</span>
                    </h1>
                    <p class="text-blue-400 font-mono mt-4 text-lg">
                        // Building digital bridges between code and commerce.
                    </p>
                </div>

                <div class="grid lg:grid-cols-12 gap-12 items-start mb-32">

                    <div class="lg:col-span-8 space-y-8" data-aos="fade-right">
                        <div>
                            <h2 class="text-5xl font-bold mb-2">Visalsing</h2>
                            <p class="text-2xl text-gray-400">Software Developer & MarTech Specialist</p>
                        </div>

                        <div
                            class="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-4 bg-[#0a0a0a] p-8 rounded-2xl border border-white/5">
                            <div>
                                <p class="text-blue-500 text-xs font-black uppercase mb-1">Full Name</p>
                                <p class="text-lg font-medium">Visalsing</p>
                            </div>
                            <div>
                                <p class="text-blue-500 text-xs font-black uppercase mb-1">Nationality</p>
                                <p class="text-lg font-medium">Cambodian / Khmer</p>
                            </div>
                            <div>
                                <p class="text-blue-500 text-xs font-black uppercase mb-1">Date of Birth</p>
                                <p class="text-lg font-medium">March, 2003</p>
                            </div>
                            <div>
                                <p class="text-blue-500 text-xs font-black uppercase mb-1">Place of Birth</p>
                                <p class="text-lg font-medium">Phnom Penh</p>
                            </div>
                            <div>
                                <p class="text-blue-500 text-xs font-black uppercase mb-1">Present Address</p>
                                <p class="text-lg font-medium">Phnom Penh</p>
                            </div>
                            <div>
                                <p class="text-blue-500 text-xs font-black uppercase mb-1">Languages</p>
                                <p class="text-lg font-medium text-gray-300">EN(C1), KH, LA, CN</p>
                            </div>
                        </div>
                    </div>

                    <div class="lg:col-span-4 relative" data-aos="fade-left">
                        <div class="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full"></div>

                        <div
                            class="relative max-w-sm mx-auto aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 group">
                            <img src="../../../public/hero-2.png" alt="Visalsing"
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                    </div>
                </div>

                <div class="grid md:grid-cols-2 gap-8">

                    <div class="bg-[#111] p-10 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-colors"
                        data-aos="fade-up">
                        <h3 class="text-2xl font-bold mb-8 flex items-center gap-3">
                            <BriefcaseIcon class="w-6 h-6 text-blue-500" /> Work Experience
                        </h3>
                        <div class="border-l-2 border-blue-500/20 pl-6 space-y-10">
                            <div class="relative">
                                <div
                                    class="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]">
                                </div>
                                <p class="text-sm text-blue-400 font-bold uppercase">2024 - 2026</p>
                                <h4 class="text-xl font-bold text-white mt-1">Junior Software Developer</h4>
                                <p class="text-gray-500 text-sm mt-2">
                                    Specialized in Laravel API development, Postman testing, and Mautic marketing
                                    automation.
                                </p>
                            </div>
                            <div class="relative">
                                <div
                                    class="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]">
                                </div>
                                <p class="text-sm text-blue-400 font-bold uppercase">2024 - 2026</p>
                                <h4 class="text-xl font-bold text-white mt-1">Junior Software Developer</h4>
                                <p class="text-gray-500 text-sm mt-2">
                                    Specialized in Laravel API development, Postman testing, and Mautic marketing
                                    automation.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-[#111] p-10 rounded-3xl border border-white/5 hover:border-cyan-500/30 transition-colors"
                        data-aos="fade-up" data-aos-delay="200">
                        <h3 class="text-2xl font-bold mb-8 flex items-center gap-3">
                            <AcademicCapIcon class="w-6 h-6 text-cyan-500" /> Education History
                        </h3>
                        <div class="border-l-2 border-cyan-500/20 pl-6 space-y-10">
                            <div class="relative">
                                <div
                                    class="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]">
                                </div>
                                <p class="text-sm text-cyan-400 font-bold uppercase">2020 - 2024</p>
                                <h4 class="text-xl font-bold text-white mt-1">Bachelor of Computer Science</h4>
                                <p class="text-gray-500 text-sm mt-2">
                                    Focused on web ecosystems and software architecture.
                                </p>
                            </div>
                            <div class="relative">
                                <div
                                    class="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]">
                                </div>
                                <p class="text-sm text-cyan-400 font-bold uppercase">2020 - 2024</p>
                                <h4 class="text-xl font-bold text-white mt-1">Bachelor of Computer Science</h4>
                                <p class="text-gray-500 text-sm mt-2">
                                    Focused on web ecosystems and software architecture.
                                </p>
                            </div>
                            <div class="relative">
                                <div
                                    class="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]">
                                </div>
                                <p class="text-sm text-cyan-400 font-bold uppercase">2020 - 2024</p>
                                <h4 class="text-xl font-bold text-white mt-1">Bachelor of Computer Science</h4>
                                <p class="text-gray-500 text-sm mt-2">
                                    Focused on web ecosystems and software architecture.
                                </p>
                            </div>
                            <div class="relative">
                                <div
                                    class="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]">
                                </div>
                                <p class="text-sm text-cyan-400 font-bold uppercase">2020 - 2024</p>
                                <h4 class="text-xl font-bold text-white mt-1">Bachelor of Computer Science</h4>
                                <p class="text-gray-500 text-sm mt-2">
                                    Focused on web ecosystems and software architecture.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { BriefcaseIcon, AcademicCapIcon } from '@heroicons/vue/24/outline'
</script>