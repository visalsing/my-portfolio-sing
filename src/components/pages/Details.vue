<template>
    <!-- bg-[#080c14] -->
    <div class="details-page min-h-screen" :style="{ backgroundImage: 'var(--surface-bg)', color: 'var(--surface-text)' }">

        <!-- ── NAVBAR ── -->
        <div>
            <header :class="[
                'details-nav w-full z-[1000] transition-all duration-300 px-4 py-4 sm:px-6 flex justify-between items-center',
                'fixed top-0 left-0 lg:relative lg:top-auto lg:left-auto lg:z-20',
                /* Removed hardcoded #111827. Used var(--navbar-bg) with opacity */
                isMenuOpen ? 'bg-transparent' : 'backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none'
            ]"
                :style="!isMenuOpen ? { backgroundColor: 'color-mix(in srgb, var(--navbar-bg), transparent 50%)' } : {}">

                <!-- <div class="text-xl sm:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent relative z-[110]"
                    :style="{ backgroundImage: 'var(--logo-gradient)' }">
                    Dev <span class="font-black">Portfolio</span>
                </div> -->
                <!-- Keep the page identity and close control above the open mobile menu, like the home nav. -->
                <div class="flex items-center gap-2 relative z-[1100]">
                    <img :src="logoSrc" alt="Logo" class="w-8 h-8 object-contain rounded-xl" />
                    <div class="flex flex-col leading-tight">
                        <span class="text-lg sm:text-xl lg:text-2xl font-bold bg-clip-text text-transparent"
                            :style="{ backgroundImage: 'var(--logo-gradient)' }">So Visalsing</span>
                        <span class="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--surface-text-sub)]">Developer Portfolio</span>
                    </div>
                </div>

                <div class="lg:hidden relative z-[1100]">
                    <button type="button"
                        class="block focus:outline-none p-1.5 sm:p-2 rounded-lg backdrop-blur-sm border transition-all duration-300 shadow-lg cursor-pointer"
                        :style="{ backgroundColor: 'var(--navbar-bg)', borderColor: 'var(--surface-border)' }"
                        @click="isMenuOpen = !isMenuOpen">
                        <div class="relative w-6 h-6">
                            <span
                                :class="['absolute left-0 w-6 h-0.5 transition-all duration-300', isMenuOpen ? 'rotate-45 top-3' : 'top-1']"
                                :style="{ backgroundColor: 'var(--accent-text)' }">
                            </span>

                            <span
                                :class="['absolute left-0 w-6 h-0.5 transition-all duration-300', isMenuOpen ? 'opacity-0' : 'top-3 opacity-100']"
                                :style="{ backgroundColor: 'var(--accent-text)' }">
                            </span>

                            <span
                                :class="['absolute left-0 w-6 h-0.5 transition-all duration-300', isMenuOpen ? '-rotate-45 top-3' : 'top-5']"
                                :style="{ backgroundColor: 'var(--accent-text)' }">
                            </span>
                        </div>
                    </button>
                </div>

                <nav :class="[
                    'details-mobile-nav fixed inset-0 z-[1001] flex flex-col items-center justify-center overflow-y-auto pt-24 pb-24 transition-all duration-500 ease-in-out',
                    'lg:relative lg:inset-auto lg:flex-row lg:justify-between lg:overflow-visible lg:bg-transparent lg:py-0 lg:translate-y-0',
                    isMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto'
                ]" :style="{ backgroundColor: isMenuOpen ? 'var(--surface-bg)' : 'transparent' }">
                    <ul class="flex w-full max-w-xs flex-col items-center space-y-6 lg:w-auto lg:max-w-none lg:flex-row lg:space-x-5 lg:space-y-0">
                        <li v-for="item in Menu" :key="item.name" class="group relative">
                            <a :href="item.href"
                                class="relative block transition-colors duration-300 text-lg sm:text-xl lg:text-sm font-medium tracking-wide"
                                :style="{ color: activeSection === item.href ? 'color-mix(in srgb, var(--accent-text) 72%, #000 28%)' : 'var(--surface-text-sub)' }"
                                @mouseenter="e => { if (activeSection !== item.href) e.currentTarget.style.color = 'var(--accent-text)' }"
                                @mouseleave="e => { if (activeSection !== item.href) e.currentTarget.style.color = 'var(--surface-text-sub)' }"
                                @click.prevent="scrollToSection(item.href)">
                                {{ item.name }}
                                <span class="absolute -bottom-1 left-0 h-0.5 transition-all duration-300"
                                    :class="activeSection === item.href ? 'w-full' : 'w-0 group-hover:w-full'"
                                    :style="{ backgroundColor: activeSection === item.href ? 'color-mix(in srgb, var(--accent-text) 72%, #000 28%)' : 'var(--accent-text)' }"></span>
                            </a>
                        </li>
                    </ul>
                    <div class="mt-10 lg:mt-0 lg:ml-8">
                        <router-link to="/contact"
                            class="px-5 py-2.5 sm:px-7 sm:py-3 text-white rounded-full transition-all duration-300 text-sm font-semibold cursor-pointer"
                            :style="{ background: 'var(--cta-gradient)' }"
                            @mouseenter="e => e.currentTarget.style.boxShadow = '0 8px 24px var(--accent-shadow)'"
                            @mouseleave="e => e.currentTarget.style.boxShadow = 'none'">
                            Let's Talk
                        </router-link>
                    </div>
                </nav>
            </header>

            <!-- ✅ ADD THIS HERE — between the two headers -->
            <div class="fixed top-0 left-0 w-full h-4 z-[60] hidden lg:block" @mouseenter="isHoveringTop = true"></div>

            <header :class="[
                'details-sticky-nav fixed top-0 left-0 w-full z-50 transition-all duration-500 transform hidden lg:flex',
                (isStickyVisible && isHoveringTop) ? 'translate-y-0 opacity-90' : '-translate-y-full opacity-0'
            ]" class="justify-between items-center p-6 backdrop-blur-md shadow-2xl" :style="{
                backgroundColor: 'color-mix(in srgb, var(--navbar-bg) 85%, transparent)',
                borderBottom: '1px solid var(--surface-border)',
                boxShadow: '0 4px 30px var(--accent-shadow)'
            }" @mouseleave="isHoveringTop = false">
                <!-- <div class="text-3xl font-bold bg-clip-text text-transparent"
                    :style="{ backgroundImage: 'var(--logo-gradient)' }">
                    Dev <span class="font-black">Portfolio</span>
                </div> -->
                <!-- Sticky nav logo -->
                <div class="flex items-center gap-2">
                    <img :src="logoSrc" alt="Logo" class="w-8 h-8 object-contain rounded-xl" />
                    <div class="flex flex-col leading-tight">
                        <span class="text-xl 2xl:text-2xl font-bold bg-clip-text text-transparent"
                            :style="{ backgroundImage: 'var(--logo-gradient)' }">So Visalsing</span>
                        <span class="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--surface-text-sub)]">Developer Portfolio</span>
                    </div>
                </div>
                <nav class="flex items-center">
                    <ul class="flex flex-row space-x-5">
                        <li v-for="item in Menu" :key="item.name" class="group relative">
                            <a :href="item.href"
                                class="relative block transition-colors duration-300 text-sm font-medium tracking-wide"
                                :style="{ color: activeSection === item.href ? 'color-mix(in srgb, var(--accent-text) 72%, #000 28%)' : 'var(--surface-text-sub)' }"
                                @mouseenter="e => { if (activeSection !== item.href) e.currentTarget.style.color = 'var(--accent-text)' }"
                                @mouseleave="e => { if (activeSection !== item.href) e.currentTarget.style.color = 'var(--surface-text-sub)' }"
                                @click.prevent="scrollToSection(item.href)">
                                {{ item.name }}
                                <span class="absolute -bottom-1 left-0 h-0.5 transition-all duration-300"
                                    :class="activeSection === item.href ? 'w-full' : 'w-0 group-hover:w-full'"
                                    :style="{ backgroundColor: activeSection === item.href ? 'color-mix(in srgb, var(--accent-text) 72%, #000 28%)' : 'var(--accent-text)' }"></span>
                            </a>
                        </li>
                    </ul>
                    <div class="ml-8">
                        <router-link to="/contact"
                            class="px-6 py-2.5 text-white rounded-full transition-all duration-300 text-sm font-semibold cursor-pointer"
                            :style="{ background: 'var(--cta-gradient)' }"
                            @mouseenter="e => e.currentTarget.style.boxShadow = '0 8px 24px var(--accent-shadow)'"
                            @mouseleave="e => e.currentTarget.style.boxShadow = 'none'">
                            Let's Talk
                        </router-link>
                    </div>
                </nav>
            </header>
        </div>

        <!-- ── HERO SECTION ── -->
        <!-- <section class="relative pt-32 pb-24 px-6 overflow-hidden">
            <div class="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
                :style="{ backgroundColor: 'var(--accent-bg-hover)' }"></div>
            <div class="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
                :style="{ backgroundColor: 'var(--accent-bg)' }"></div>
            <div class="absolute inset-0 pointer-events-none"
                :style="{ backgroundImage: `linear-gradient(var(--accent-glow) 1px, transparent 1px), linear-gradient(90deg, var(--accent-glow) 1px, transparent 1px)`, backgroundSize: '60px 60px' }">
            </div>

            <div class="max-w-6xl mx-auto relative">
                <div class="flex items-center gap-3 mb-8" data-aos="fade-down">
                    <div class="w-8 h-px" :style="{ backgroundColor: 'var(--accent-mid)' }"></div>
                    <span class="font-mono text-sm tracking-widest uppercase" :style="{ color: 'var(--accent-text)' }">
                        {{ t('about_me') }}
                    </span>
                </div>

                <div id="profile">
                    <div class="mb-16" data-aos="fade-down" data-aos-delay="100">
                        <h1 class="text-6xl md:text-8xl font-black tracking-tighter leading-none">
                            WHO I
                            <span class="text-transparent bg-clip-text"
                                :style="{ backgroundImage: 'var(--logo-gradient)' }"> AM</span>
                        </h1>
                        <p class="font-mono mt-4 text-base md:text-lg"
                            :style="{ color: 'var(--accent-text)', opacity: 0.7 }">
                            // Building digital bridges between code and commerce.
                        </p>
                    </div>

                    <div class="grid lg:grid-cols-12 gap-12 items-start">
                        <div class="lg:col-span-7 space-y-8" data-aos="fade-right">
                            <div>
                                <h2 class="text-4xl md:text-5xl font-bold tracking-tight">Visalsing</h2>
                                <p class="text-lg mt-2" :style="{ color: 'var(--accent-text-muted)', opacity: 0.7 }">
                                    Software Developer & MarTech Specialist
                                </p>
                            </div>

                            <div class="max-w-2xl mx-auto p-6">
                                <div class="relative pl-5"
                                    style="border-left: 2px solid transparent; background-image: linear-gradient(#080c14,#080c14), var(--logo-gradient); background-origin: border-box; background-clip: padding-box, border-box;">
                                    <p class="text-gray-400 leading-relaxed text-base">
                                        As a Software Developer with a Bachelor's in Computer Science, I specialize in
                                        building robust web applications using the Laravel ecosystem and modern frontend
                                        technologies like Vue.js, Vite, and Tailwind CSS.
                                    </p>
                                    <transition name="fade">
                                        <div v-if="isExpanded"
                                            class="mt-3 text-gray-400 leading-relaxed text-base space-y-4">
                                            <p>Having moved beyond the junior phase of my career, I now focus on
                                                architecting full-stack solutions that prioritize performance and clean
                                                UI components using tools like Shadcn/ui and React.js.</p>
                                            <p>My experience spans the entire development lifecycle, from designing
                                                relational databases in PostgreSQL and MySQL to implementing secure API
                                                integrations and managing deployments in containerized environments.</p>
                                            <p>My technical foundation was solidified at the Royal University of Phnom
                                                Penh (RUPP), where I balanced rigorous software engineering coursework
                                                with leadership roles in team projects.</p>
                                            <p>Beyond engineering, I bring a human-centric perspective through
                                                multilingual content creation and digital sales experience, combining
                                                technical skill with communication and business understanding.</p>
                                        </div>
                                    </transition>
                                    <button @click="isExpanded = !isExpanded" class="mt-2 font-medium transition-colors"
                                        :style="{ color: 'var(--accent-text)' }"
                                        @mouseenter="e => e.currentTarget.style.color = 'var(--icon-accent-2)'"
                                        @mouseleave="e => e.currentTarget.style.color = 'var(--accent-text)'">
                                        {{ isExpanded ? 'See Less' : 'See More...' }}
                                    </button>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div v-for="info in personalInfo" :key="info.label"
                                    class="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 transition-all duration-300"
                                    @mouseenter="e => { e.currentTarget.style.borderColor = 'var(--accent-border)'; e.currentTarget.style.backgroundColor = 'var(--accent-bg)' }"
                                    @mouseleave="e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)' }">
                                    <p class="text-xs font-bold uppercase tracking-widest mb-1.5"
                                        :style="{ color: 'var(--accent-text)' }">{{ info.label }}</p>
                                    <p class="text-white font-medium">{{ info.value }}</p>
                                </div>
                            </div>

                            <div class="flex flex-wrap gap-3 pt-2">
                                <button
                                    class="px-6 py-3 text-white rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
                                    :style="{ background: 'var(--cta-gradient)' }"
                                    @mouseenter="e => e.currentTarget.style.boxShadow = '0 8px 24px var(--accent-shadow)'"
                                    @mouseleave="e => e.currentTarget.style.boxShadow = 'none'">
                                    Download CV
                                </button>
                                <button
                                    class="px-6 py-3 border rounded-full font-semibold text-sm transition-all duration-300"
                                    :style="{ borderColor: 'var(--accent-border)', color: 'var(--accent-text-muted)' }"
                                    @mouseenter="e => { e.currentTarget.style.borderColor = 'var(--accent-border-hover)'; e.currentTarget.style.backgroundColor = 'var(--accent-bg)' }"
                                    @mouseleave="e => { e.currentTarget.style.borderColor = 'var(--accent-border)'; e.currentTarget.style.backgroundColor = 'transparent' }">
                                    Let's Talk
                                </button>
                            </div>
                        </div>

                        <div class="lg:col-span-5 relative flex justify-center" data-aos="fade-left">
                            <div class="absolute inset-0 blur-3xl rounded-full scale-75"
                                :style="{ background: 'linear-gradient(to bottom right, var(--accent-bg-hover), var(--accent-bg))' }">
                            </div>
                            <div class="relative w-full max-w-sm">
                                <div class="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 rounded-tl-2xl"
                                    :style="{ borderColor: 'var(--accent-border-hover)' }"></div>
                                <div class="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 rounded-br-2xl"
                                    :style="{ borderColor: 'var(--accent-border-2)' }"></div>
                                <div class="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 group shadow-2xl"
                                    :style="{ boxShadow: '0 25px 50px var(--section-grad-to)' }">
                                    <img src="../../../public/hero-2.png" alt="Visalsing"
                                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>
                                <div class="absolute -bottom-5 -left-5 rounded-2xl px-4 py-3 shadow-xl border"
                                    :style="{ backgroundColor: 'var(--navbar-bg)', borderColor: 'var(--accent-border)' }">
                                    <p class="text-xs font-mono" :style="{ color: 'var(--accent-text)' }">Available for
                                        work</p>
                                    <div class="flex items-center gap-2 mt-1">
                                        <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                        <span class="text-white text-sm font-semibold">Open to opportunities</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->
        <section class="profile-section relative pt-32 sm:pt-36 pb-24 sm:pb-32 px-5 sm:px-8 overflow-hidden transition-colors duration-300">
            <div class="absolute top-10 left-[12%] w-[28rem] h-[28rem] rounded-full blur-[140px] pointer-events-none"
                :style="{ backgroundColor: 'var(--accent-bg-hover)' }"></div>
            <div class="absolute bottom-0 right-[8%] w-[24rem] h-[24rem] rounded-full blur-[120px] pointer-events-none"
                :style="{ backgroundColor: 'var(--accent-bg)' }"></div>
            <div class="absolute inset-0 pointer-events-none"
                :style="{ backgroundImage: `linear-gradient(var(--accent-glow) 1px, transparent 1px), linear-gradient(90deg, var(--accent-glow) 1px, transparent 1px)`, backgroundSize: '72px 72px', maskImage: 'linear-gradient(to bottom, black, transparent 90%)' }">
            </div>

            <div class="max-w-7xl mx-auto relative">
                <div class="flex items-center gap-3 mb-7" data-aos="fade-down">
                    <div class="w-10 h-px" :style="{ backgroundColor: 'var(--accent-mid)' }"></div>
                    <span class="font-mono text-xs sm:text-sm tracking-[0.22em] uppercase" :style="{ color: 'var(--accent-text)' }">
                        {{ t('about_me') }}
                    </span>
                </div>

                <div id="profile">
                    <div class="profile-title mb-12 sm:mb-16" data-aos="fade-down" data-aos-delay="100">
                        <h1 class="text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.07em] leading-[0.92]"
                            :style="{ color: 'var(--surface-text)' }">
                            WHO I
                            <span class="text-transparent bg-clip-text"
                                :style="{ backgroundImage: 'var(--logo-gradient)' }"> AM</span>
                        </h1>
                        <p class="font-mono mt-5 text-sm sm:text-base md:text-lg tracking-wide"
                            :style="{ color: 'var(--accent-text-muted)' }">
                            // Building digital bridges between code and commerce.
                        </p>
                    </div>

                    <div class="grid lg:grid-cols-12 gap-10 xl:gap-16 items-center">
                        <div class="lg:col-span-7 space-y-7" data-aos="fade-right">
                            <div>
                                <h2 class="text-4xl sm:text-5xl font-bold tracking-tight"
                                    :style="{ color: 'var(--surface-text)' }">Visalsing</h2>
                                <p class="mt-3 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm sm:text-base"
                                    :style="{ color: 'var(--accent-text-muted)', borderColor: 'var(--surface-border)', backgroundColor: 'var(--surface-card)' }">
                                    Software Developer & MarTech Specialist
                                </p>
                            </div>

                            <div class="profile-copy-card relative overflow-hidden rounded-2xl border p-5 sm:p-7"
                                :style="{ background: 'linear-gradient(145deg, var(--surface-card), var(--section-grad-to))', borderColor: 'var(--surface-border)' }">
                                    <p class="relative z-10 text-base sm:text-lg leading-8" :style="{ color: 'var(--surface-text-sub)' }">
                                        I’m a computer science graduate and software developer who enjoys building
                                        practical web applications. My experience includes Laravel and PHP projects,
                                        modern JavaScript tools, and hands-on support for business systems and data.
                                    </p>
                                    <transition name="fade">
                                        <div v-if="isExpanded" class="relative z-10 mt-4 leading-7 text-sm sm:text-base space-y-4"
                                            :style="{ color: 'var(--surface-text-sub)' }">
                                            <p>I’m currently developing my first freelance project: a café platform
                                                that brings point-of-sale and e-commerce features together. I work
                                                across its frontend, backend, database, integrations, and deployment
                                                using the tools suited to the project.</p>
                                            <p>In my Unilever roles, I supported system rollouts and data operations.
                                                That work strengthened my communication and adaptability while helping
                                                me understand how people use systems in their day-to-day work.</p>
                                            <p>I hold a Bachelor’s degree in Computer Science from the Royal
                                                University of Phnom Penh. Outside software development, I independently
                                                share Lao-language content on YouTube and have supported a small
                                                relative’s business with online product presentation.</p>
                                        </div>
                                    </transition>
                                    <button @click="isExpanded = !isExpanded"
                                        class="relative z-10 mt-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer hover:-translate-y-0.5"
                                        :style="{ color: 'var(--accent-text)', borderColor: 'var(--accent-border)', backgroundColor: 'var(--accent-bg)' }">
                                        {{ isExpanded ? 'See Less' : 'See More...' }}
                                    </button>
                            </div>

                            <!-- Grid Info Cards -->
                            <div class="profile-facts grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div v-for="info in personalInfo" :key="info.label"
                                    class="profile-fact group border rounded-2xl p-4 sm:p-5 transition-all duration-300"
                                    :style="{ backgroundColor: 'var(--card-bg-fallback)', borderColor: 'var(--surface-border)' }"
                                    @mouseenter="e => { e.currentTarget.style.borderColor = 'var(--accent-border)'; e.currentTarget.style.backgroundColor = 'var(--accent-bg)' }"
                                    @mouseleave="e => { e.currentTarget.style.borderColor = 'var(--surface-border)'; e.currentTarget.style.backgroundColor = 'var(--card-bg-fallback)' }">
                                    <p class="text-xs font-bold uppercase tracking-widest mb-1.5"
                                        :style="{ color: 'var(--accent-text)' }">{{ info.label }}</p>
                                    <p class="font-medium" :style="{ color: 'var(--surface-text)' }">{{ info.value }}
                                    </p>
                                </div>
                            </div>

                            <div class="flex flex-col sm:flex-row gap-3 pt-1">
                                <router-link to="/contact"
                                    class="group inline-flex w-full sm:w-max items-center justify-center rounded-xl px-7 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                                    :style="{ background: 'var(--cta-gradient)', boxShadow: '0 12px 28px -14px var(--accent-shadow-lg)' }">
                                    Let's Talk
                                    <ArrowRightIcon class="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </router-link>
                                <button type="button" @click="openCv"
                                    class="details-cv-btn btn-ghost group inline-flex w-full sm:w-max items-center justify-center rounded-xl border px-8 py-4 text-lg font-semibold backdrop-blur-md transition-all duration-300 cursor-pointer"
                                    :style="{ borderColor: 'var(--accent-border)', color: 'var(--surface-text)' }">
                                    <ArrowDownTrayIcon class="mr-3 h-5 w-5 transition-transform group-hover:translate-y-0.5"
                                        :style="{ color: 'var(--accent-mid)' }" />
                                    {{ t('download_cv') }}
                                </button>
                            </div>
                        </div>

                        <!-- Right Side Profile Image Layout -->
                        <div class="lg:col-span-5 relative flex justify-center lg:justify-end" data-aos="fade-left">
                            <div class="absolute inset-0 blur-3xl rounded-full scale-75"
                                :style="{ background: 'linear-gradient(to bottom right, var(--accent-bg-hover), var(--accent-bg))' }">
                            </div>
                            <div class="profile-portrait relative aspect-[4/5] w-full max-w-[27rem]">
                                <div v-if="profileFrame.corners?.length" class="details-corner-frame"
                                    :style="detailsCornerStyle" aria-hidden="true">
                                    <span class="details-corner-ring"></span>
                                </div>

                                <div class="details-photo-shell relative z-10 h-full w-full"
                                    :class="{ 'details-frame-spin': profileFrame.effect === 'spin' }"
                                    :style="detailsFrameStyle">
                                  <div class="profile-photo-frame relative h-full w-full overflow-hidden"
                                    :style="detailsInnerFrameStyle">
                                    <div v-if="profileFrame.grid" class="details-photo-grid" aria-hidden="true"></div>
                                    <Transition name="profile-photo" mode="out-in">
                                        <img :key="activeProfilePhoto.src" :src="activeProfilePhoto.src" :alt="activeProfilePhoto.alt"
                                            class="profile-photo-image absolute inset-0 h-full w-full"
                                            :class="activeProfilePhoto.fit === 'cover' ? 'object-cover' : 'object-contain'" />
                                    </Transition>

                                    <button type="button" class="profile-photo-arrow left-3" aria-label="Previous profile photo"
                                        @click="stepProfilePhoto(-1)">
                                        <ChevronLeftIcon class="h-5 w-5" />
                                    </button>
                                    <button type="button" class="profile-photo-arrow right-3" aria-label="Next profile photo"
                                        @click="stepProfilePhoto(1)">
                                        <ChevronRightIcon class="h-5 w-5" />
                                    </button>

                                    <div class="profile-photo-dots" aria-label="Choose a profile photo">
                                        <button v-for="(photo, index) in profilePhotos" :key="photo.src" type="button"
                                            class="profile-photo-dot" :class="{ active: index === profilePhotoIndex }"
                                            :aria-label="`Show profile photo ${index + 1}`" :aria-pressed="index === profilePhotoIndex"
                                            @click="profilePhotoIndex = index"></button>
                                    </div>
                                  </div>
                                </div>

                                <!-- Status panel: rotates between current work and availability -->
                                <button type="button" @click="nextStatus"
                                    class="status-badge badge-float absolute -bottom-6 -left-3 sm:-left-8 z-20 block min-w-[235px] rounded-2xl border px-5 py-3.5 backdrop-blur-xl shadow-2xl text-left cursor-pointer"
                                    :class="{ 'is-hidden': hideStatus }" :tabindex="hideStatus ? -1 : 0"
                                    :style="glassStyle"
                                    :aria-label="`${status.label}: ${status.text}. Click to show the next status`">
                                    <Transition name="status" mode="out-in">
                                        <div :key="statusIndex">
                                            <p class="text-sm" :style="{ color: 'var(--accent-text)' }">{{ status.label }}</p>
                                            <p class="mt-1 flex items-center gap-2.5 font-semibold"
                                                :style="{ color: 'var(--surface-text)' }">
                                                <span class="relative flex h-2.5 w-2.5 shrink-0">
                                                    <span class="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                                                        :style="{ backgroundColor: status.dot }"></span>
                                                    <span class="relative inline-flex h-2.5 w-2.5 rounded-full"
                                                        :style="{ backgroundColor: status.dot }"></span>
                                                </span>
                                                {{ status.text }}
                                            </p>
                                        </div>
                                    </Transition>
                                    <span class="mt-2.5 flex items-center gap-1.5" aria-hidden="true">
                                        <i v-for="(_, index) in STATUSES" :key="index" class="status-pip"
                                            :class="{ on: index === statusIndex }"></i>
                                    </span>
                                </button>

                                <button type="button" class="clear-toggle" :class="{ on: hideStatus }"
                                    :aria-pressed="hideStatus"
                                    :title="hideStatus ? 'Show the status panel' : 'Hide the status panel'"
                                    @click="toggleStatus">
                                    <EyeIcon v-if="hideStatus" class="w-3.5 h-3.5" />
                                    <EyeSlashIcon v-else class="w-3.5 h-3.5" />
                                    <span>{{ hideStatus ? 'Show status' : 'Hide status' }}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ── EXPERIENCE & EDUCATION ── -->
        <section class="details-section relative py-20 sm:py-28 px-5 sm:px-8" id="journey">
            <div class="max-w-7xl mx-auto">
                <div class="flex items-center gap-3 mb-4" data-aos="fade-right">
                    <div class="w-8 h-px" :style="{ backgroundColor: 'var(--accent-mid)' }"></div>
                    <span class="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase"
                        :style="{ color: 'var(--accent-text)' }">Experience</span>
                </div>
                <h2 class="mb-10 sm:mb-14 text-4xl sm:text-5xl font-black tracking-tight" data-aos="fade-right" data-aos-delay="100">
                    <span :style="{ color: 'var(--surface-text)' }">My</span> <span
                        class="text-transparent bg-clip-text"
                        :style="{ backgroundImage: 'var(--logo-gradient)' }">Journey</span>
                </h2>
                <p class="journey-intro -mt-8 mb-10 sm:mb-14 max-w-2xl text-sm sm:text-base leading-relaxed"
                    :style="{ color: 'var(--surface-text-sub)' }">
                    A look at the work I’ve done and the education that shaped my path.
                </p>
                <div class="grid lg:grid-cols-2 gap-5 sm:gap-7">

                    <!-- Work Experience -->
                    <div class="journey-column min-w-0" data-aos="fade-up">
                        <h3 class="journey-panel-heading text-xl font-bold mb-6 flex items-center gap-3">
                            <span class="w-9 h-9 rounded-xl flex items-center justify-center"
                                :style="{ backgroundColor: 'var(--icon-bg)', border: '1px solid var(--accent-border)' }">
                                <BriefcaseIcon class="w-5 h-5" :style="{ color: 'var(--icon-accent)' }" />
                            </span>
                            <span :style="{ color: 'var(--surface-text)' }">Work Experience</span>
                            <span class="journey-count ml-auto rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wider"
                                :style="{ color: 'var(--accent-text)', borderColor: 'var(--accent-border)', backgroundColor: 'var(--accent-bg)' }">
                                {{ workExperience.length }} ROLES
                            </span>
                        </h3>
                        <div class="journey-list relative space-y-4">
                            <div v-for="(job) in workExperience.slice(0, showMoreExperience ? workExperience.length : WORK_EXPERIENCE_PREVIEW)"
                                :key="job.id" class="journey-entry relative group">
                                <div class="journey-dot absolute left-[15px] top-5 w-3 h-3 rounded-full transition-all duration-300"
                                    :style="{ backgroundColor: 'var(--accent-mid)', boxShadow: '0 0 0 4px var(--accent-bg)' }"
                                    @mouseenter="e => e.currentTarget.style.boxShadow = '0 0 0 6px var(--accent-bg-hover)'"
                                    @mouseleave="e => e.currentTarget.style.boxShadow = '0 0 0 4px var(--accent-bg)'">
                                </div>
                                <div class="journey-entry-top mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                    <h4 class="min-w-0 flex-1 text-xl sm:text-2xl font-bold leading-snug"
                                        :style="{ color: 'var(--surface-text)' }">{{ job.position }}</h4>
                                    <div class="shrink-0 flex flex-row flex-wrap items-center gap-2 sm:flex-col sm:items-end sm:text-right">
                                        <p class="journey-period rounded-lg border px-2.5 py-1 text-[10px] sm:text-[11px] font-bold tracking-wide"
                                            :style="{ color: 'var(--accent-text)', borderColor: 'var(--accent-border)', backgroundColor: 'var(--accent-bg)' }">{{ job.period }}</p>
                                        <span v-if="job.working_status === 1 || job.working_status === 2"
                                            class="rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide"
                                            :style="job.working_status === 1
                                                ? { color: '#34d399', backgroundColor: 'rgba(52, 211, 153, 0.10)', borderColor: 'rgba(52, 211, 153, 0.35)' }
                                                : { color: '#fbbf24', backgroundColor: 'rgba(251, 191, 36, 0.10)', borderColor: 'rgba(251, 191, 36, 0.35)' }">
                                            {{ job.working_status === 1 ? 'Currently Working' : 'Paused / Rested' }}
                                        </span>
                                    </div>
                                </div>
                                <p class="mb-2 text-sm sm:text-base font-semibold tracking-wide"
                                    :style="{ color: 'var(--accent-text-muted)' }">{{ job.company }}</p>
                                <p class="text-sm leading-relaxed" :style="{ color: 'var(--surface-text-sub)' }">{{ job.desc }}</p>
                                <Transition name="expand">
                                    <ul v-if="expandedExpIds.has(job.id)"
                                        class="text-[var(--surface-text-sub)] text-sm leading-relaxed list-disc pl-5 space-y-2 overflow-hidden">
                                        <li v-for="(point, index) in job.desc_points" :key="index"
                                            class="hover:text-[var(--surface-text-sub)] transition-colors duration-200">
                                            {{ point }}
                                        </li>
                                    </ul>
                                </Transition>
                                <button @click="toggleExpandExp(job.id)"
                                    class="text-xs font-bold uppercase tracking-tighter mt-4 flex items-center gap-2 group/btn cursor-pointer"
                                    :style="{ color: job.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }">
                                    <span>{{ expandedExpIds.has(job.id) ? 'Show Less' : 'See Details' }}</span>
                                    <span class="transition-transform duration-300"
                                        :class="{ 'rotate-45': expandedExpIds.has(job.id) }">
                                        +
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div v-if="workExperience.length > WORK_EXPERIENCE_PREVIEW" class="flex justify-center mt-6">
                            <button type="button" @click="showMoreExperience = !showMoreExperience"
                                class="journey-toggle inline-flex rounded-xl border px-4 py-2.5 text-sm font-bold transition-all items-center gap-2 active:scale-95 cursor-pointer"
                                :style="{ color: 'var(--accent-text)', borderColor: 'var(--accent-border)', backgroundColor: 'var(--accent-bg)' }">
                                {{ showMoreExperience ? 'See Less' : 'See More' }}
                                <component :is="showMoreExperience ? ChevronUpIcon : ChevronDownIcon" class="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <!-- Education -->
                    <div class="journey-column min-w-0" data-aos="fade-up" data-aos-delay="150">
                        <h3 class="journey-panel-heading text-xl font-bold mb-6 flex items-center gap-3">
                            <span class="w-9 h-9 rounded-xl flex items-center justify-center"
                                :style="{ backgroundColor: 'var(--icon-bg-2)', border: '1px solid var(--accent-border-2-soft)' }">
                                <AcademicCapIcon class="w-5 h-5" :style="{ color: 'var(--icon-accent-2)' }" />
                            </span>
                            <span :style="{ color: 'var(--surface-text)' }">Education</span>
                            <span class="journey-count ml-auto rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wider"
                                :style="{ color: 'var(--icon-accent-2)', borderColor: 'var(--accent-border-2-soft)', backgroundColor: 'var(--accent-to-bg)' }">
                                {{ educationHistory.length }} ITEMS
                            </span>
                        </h3>
                        <div class="journey-list journey-list-education relative space-y-4">
                            <div v-for="(edu) in educationHistory.slice(0, EDUCATION_PREVIEW)" :key="edu.id"
                                class="journey-entry journey-entry-education relative group">
                                <div class="journey-dot absolute left-[15px] top-5 w-3 h-3 rounded-full transition-all duration-300"
                                    :style="{ backgroundColor: 'var(--icon-accent-2)', boxShadow: '0 0 0 4px var(--accent-to-bg)' }"
                                    @mouseenter="e => e.currentTarget.style.boxShadow = '0 0 0 6px var(--accent-to-bg-hover)'"
                                    @mouseleave="e => e.currentTarget.style.boxShadow = '0 0 0 4px var(--accent-to-bg)'">
                                </div>
                                <div class="journey-entry-top mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                    <h4 class="min-w-0 flex-1 text-xl sm:text-2xl font-bold leading-snug"
                                        :style="{ color: 'var(--surface-text)' }">{{ edu.title }}</h4>
                                    <p class="journey-period shrink-0 rounded-lg border px-2.5 py-1 text-[10px] sm:text-[11px] font-bold tracking-wide"
                                        :style="{ color: 'var(--icon-accent-2)', borderColor: 'var(--accent-border-2-soft)', backgroundColor: 'var(--accent-to-bg)' }">{{ edu.period }}</p>
                                </div>
                                <p class="mb-3 text-sm sm:text-base font-semibold tracking-wide"
                                    :style="{ color: 'var(--icon-accent-2)' }">{{ edu.institution }}</p>
                                <!-- <p class="text-gray-500 text-sm leading-relaxed">{{ edu.desc }}</p> -->
                                <p class="text-[var(--surface-text-sub)] text-sm leading-relaxed">
                                    <span v-if="!expandedEduTextIds.has(edu.id)">
                                        {{ edu.desc.substring(0, 200) }}...
                                    </span>

                                    <span v-else>
                                        {{ edu.desc }}
                                    </span>

                                    <button type="button" @click="toggleEduText(edu.id)"
                                        class="journey-more ml-1 inline font-bold cursor-pointer hover:underline uppercase text-[10px] tracking-widest"
                                        :style="{ color: edu.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }">
                                        {{ expandedEduTextIds.has(edu.id) ? t('show_less') : t('see_more') }}
                                    </button>
                                </p>
                            </div>
                            <transition name="fade">
                                <div v-if="showMoreEducation" class="journey-list journey-list-more space-y-4">
                                    <div v-for="(edu) in educationHistory.slice(EDUCATION_PREVIEW)" :key="edu.id"
                                        class="journey-entry journey-entry-education relative group">
                                        <div class="journey-dot absolute left-[15px] top-5 w-3 h-3 rounded-full transition-all duration-300"
                                            :style="{ backgroundColor: 'var(--icon-accent-2)', boxShadow: '0 0 0 4px var(--accent-to-bg)' }"
                                            @mouseenter="e => e.currentTarget.style.boxShadow = '0 0 0 6px var(--accent-to-bg-hover)'"
                                            @mouseleave="e => e.currentTarget.style.boxShadow = '0 0 0 4px var(--accent-to-bg)'">
                                        </div>
                                        <div class="journey-entry-top mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                            <h4 class="min-w-0 flex-1 text-xl sm:text-2xl font-bold leading-snug" :style="{ color: 'var(--surface-text)' }">{{ edu.title }}</h4>
                                            <p class="journey-period shrink-0 rounded-lg border px-2.5 py-1 text-[10px] sm:text-[11px] font-bold tracking-wide"
                                                :style="{ color: 'var(--icon-accent-2)', borderColor: 'var(--accent-border-2-soft)', backgroundColor: 'var(--accent-to-bg)' }">{{ edu.period }}</p>
                                        </div>
                                        <p class="mb-3 text-sm sm:text-base font-semibold tracking-wide" :style="{ color: 'var(--icon-accent-2)' }">{{ edu.institution }}</p>
                                        <p class="text-sm leading-relaxed" :style="{ color: 'var(--surface-text-sub)' }">{{ edu.desc }}</p>
                                    </div>
                                </div>
                            </transition>
                        </div>
                        <div v-if="educationHistory.length > EDUCATION_PREVIEW" class="flex justify-center mt-6">
                            <button @click="showMoreEducation = !showMoreEducation"
                                class="journey-toggle inline-flex rounded-xl border px-4 py-2.5 text-sm font-bold transition-all items-center gap-2 active:scale-95 cursor-pointer"
                                :style="{ color: 'var(--accent-text)', borderColor: 'var(--accent-border)', backgroundColor: 'var(--accent-bg)' }">
                                {{ showMoreEducation ? 'See Less' : 'See More' }}
                                <component :is="showMoreEducation ? ChevronUpIcon : ChevronDownIcon" class="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <!-- Additional Skills -->
                    <div class="journey-column journey-additional lg:col-span-2 min-w-0" data-aos="fade-up">
                        <h3 class="journey-panel-heading text-xl font-bold mb-6 flex items-center gap-3">
                            <span class="w-9 h-9 rounded-xl flex items-center justify-center"
                                :style="{ backgroundColor: 'var(--icon-bg)', border: '1px solid var(--accent-border)' }">
                                <BriefcaseIcon class="w-5 h-5" :style="{ color: 'var(--icon-accent)' }" />
                            </span>
                            <span :style="{ color: 'var(--surface-text)' }">Additional Experience & Activities</span>
                            <span class="journey-count ml-auto rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wider"
                                :style="{ color: 'var(--accent-text)', borderColor: 'var(--accent-border)', backgroundColor: 'var(--accent-bg)' }">
                                {{ additionalSkill.length }} ACTIVITIES
                            </span>
                        </h3>
                        <div class="journey-activities grid md:grid-cols-2 gap-x-10 gap-y-7">
                            <article v-for="(addSkill) in additionalSkill" :key="addSkill.id" class="journey-activity min-w-0">
                                <p class="journey-period mb-3 inline-flex rounded-lg border px-2.5 py-1 text-[10px] sm:text-[11px] font-bold tracking-wide"
                                    :style="{ color: 'var(--accent-text)', borderColor: 'var(--accent-border)', backgroundColor: 'var(--accent-bg)' }">{{ addSkill.period }}</p>
                                <h4 class="mb-1 text-xl sm:text-2xl font-bold leading-snug" :style="{ color: 'var(--surface-text)' }">{{ addSkill.title }}</h4>
                                <p class="mb-3 text-sm sm:text-base font-semibold tracking-wide" :style="{ color: 'var(--accent-text-muted)' }">{{ addSkill.company }}</p>
                                <p class="text-sm leading-relaxed" :style="{ color: 'var(--surface-text-sub)' }">{{ addSkill.desc }}</p>
                            </article>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- ── SKILLS & TECH STACK ── -->
        <section class="details-section relative py-20 sm:py-28 px-5 sm:px-8" id="skills">
            <div class="max-w-7xl mx-auto">
                <div class="flex items-center gap-3 mb-4" data-aos="fade-right">
                    <div class="w-8 h-px" :style="{ backgroundColor: 'var(--accent-mid)' }"></div>
                    <span class="font-mono text-sm tracking-widest uppercase"
                        :style="{ color: 'var(--accent-text)' }">Skills</span>
                </div>
                <h2 class="mb-10 sm:mb-14 text-4xl sm:text-5xl font-black tracking-tight" data-aos="fade-right" data-aos-delay="100">
                    <span :style="{ color: 'var(--surface-text)' }">Skills &</span> <span
                        class="text-transparent bg-clip-text" :style="{ backgroundImage: 'var(--logo-gradient)' }">
                        Tech Stack
                    </span>
                </h2>
                <div class="skills-layout grid lg:grid-cols-2 gap-x-14 gap-y-14 sm:gap-y-16">

                    <!-- Technical Skills -->
                    <div class="skill-group skill-technical min-w-0" data-aos="fade-up">
                        <h3 class="skill-group-heading text-xl sm:text-2xl font-bold mb-7 flex items-center gap-3">
                            <span class="w-9 h-9 rounded-xl flex items-center justify-center"
                                :style="{ backgroundColor: 'var(--icon-bg)', border: '1px solid var(--accent-border)' }">
                                <BriefcaseIcon class="w-5 h-5" :style="{ color: 'var(--icon-accent)' }" />
                            </span>
                            <span :style="{ color: 'var(--surface-text)' }">Technical Skills</span>
                        </h3>
                        <div class="space-y-8">
                            <div v-for="skill in technicalSkills.slice(0, TECHNICAL_SKILL_PREVIEW)" :key="skill.id" class="skill-progress-row group">
                                <div class="flex items-center justify-between mb-3">
                                    <span class="font-semibold flex items-center gap-2"
                                        :style="{ color: 'var(--accent-text-muted)' }">
                                        <component :is="skill.icon" class="w-5 h-5"
                                            :style="{ color: skill.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }" />
                                        {{ skill.title }}
                                    </span>
                                    <span class="text-sm"
                                        :style="{ color: skill.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }">
                                        {{ skill.percentage }} %
                                    </span>
                                </div>
                                <div class="skill-progress-track h-2 rounded-full overflow-hidden">
                                    <div class="skill-progress-fill h-full rounded-full transition-all duration-1000 group-hover:brightness-125"
                                        :style="{ width: skill.percentage + '%', background: 'var(--cta-gradient)' }">
                                    </div>
                                </div>
                            </div>
                            <transition name="fade">
                                <div v-if="showMoreTechnicalSkills" class="space-y-8">
                                    <div v-for="skill in technicalSkills.slice(TECHNICAL_SKILL_PREVIEW)" :key="skill.id" class="skill-progress-row group">
                                        <div class="flex items-center justify-between mb-3">
                                            <span class="font-semibold flex items-center gap-2" :style="{ color: 'var(--accent-text-muted)' }">
                                                <component :is="skill.icon" class="w-5 h-5"
                                                    :style="{ color: skill.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }" />
                                                {{ skill.title }}
                                            </span>
                                            <span class="text-sm"
                                                :style="{ color: skill.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }">
                                                {{ skill.percentage }} %
                                            </span>
                                        </div>
                                        <div class="skill-progress-track h-2 rounded-full overflow-hidden">
                                            <div class="skill-progress-fill h-full rounded-full transition-all duration-1000 group-hover:brightness-125"
                                                :style="{ width: skill.percentage + '%', background: 'var(--cta-gradient)' }"></div>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </div>
                        <div v-if="technicalSkills.length > TECHNICAL_SKILL_PREVIEW" class="flex justify-center mt-7">
                            <button @click="showMoreTechnicalSkills = !showMoreTechnicalSkills"
                                class="skill-expand-button inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-bold transition-all active:scale-95 cursor-pointer"
                                :style="{ color: 'var(--accent-text)', borderColor: 'var(--accent-border)', backgroundColor: 'var(--accent-bg)' }"
                                :aria-expanded="showMoreTechnicalSkills">
                                {{ showMoreTechnicalSkills ? 'See Less' : 'See More' }}
                                <component :is="showMoreTechnicalSkills ? ChevronUpIcon : ChevronDownIcon" class="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <!-- Tech Stack -->
                    <div class="skill-group skill-tech-stack min-w-0 lg:col-span-2" data-aos="fade-up" data-aos-delay="100">
                        <h3 class="skill-group-heading text-xl sm:text-2xl font-bold mb-7 flex items-center flex-wrap gap-3">
                            <span class="w-9 h-9 rounded-xl flex items-center justify-center"
                                :style="{ backgroundColor: 'var(--icon-bg-2)', border: '1px solid var(--accent-border-2-soft)' }">
                                <Squares2X2Icon class="w-5 h-5" :style="{ color: 'var(--icon-accent-2)' }" />
                            </span>

                            <span :style="{ color: 'var(--surface-text)' }">{{ t('tech_stack') }}</span>

                            <router-link to="/techstack"
                                class="flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all duration-300 group"
                                :style="{
                                    backgroundColor: 'var(--surface-card)',
                                    borderColor: 'var(--surface-border)',
                                    color: 'var(--surface-text-sub)'
                                }" @mouseenter="e => {
                                    e.currentTarget.style.backgroundColor = 'var(--accent-bg)';
                                    e.currentTarget.style.borderColor = 'var(--accent-border)';
                                    e.currentTarget.style.color = 'var(--surface-text)';
                                }" @mouseleave="e => {
                                    e.currentTarget.style.backgroundColor = 'var(--surface-card)';
                                    e.currentTarget.style.borderColor = 'var(--surface-border)';
                                    e.currentTarget.style.color = 'var(--surface-text-sub)';
                                }">

                                <span class="text-[10px] uppercase tracking-widest font-medium">
                                    {{ t('see_more') }}
                                </span>

                                <CursorArrowRippleIcon
                                    class="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-0.5"
                                    :style="{ color: 'var(--icon-accent-2)' }" />
                            </router-link>
                        </h3>

                        <div class="skill-tech-grid grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-7">
                            <div v-for="group in techStack.slice(0, TECH_PREVIEW)" :key="group.id" class="skill-tech-category">
                                <h4 class="skill-subheading text-base font-bold mb-3 flex items-center gap-2">
                                    <component :is="group.icon" class="w-5 h-5"
                                        :style="{ color: group.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }" />
                                    {{ group.title }}
                                </h4>
                                <div class="flex flex-wrap gap-2">
                                    <TechChip v-for="item in group.stack" :key="item" :name="item"
                                        :fallback-icon="group.icon" :accent2="group.useAccent2" />
                                </div>
                            </div>
                            <transition name="fade">
                                <div v-if="showMoreTech" class="skill-tech-grid grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-7 col-span-full">
                                    <div v-for="group in techStack.slice(TECH_PREVIEW)" :key="group.id" class="skill-tech-category">
                                        <h4 class="skill-subheading text-base font-bold mb-3 flex items-center gap-2">
                                            <component :is="group.icon" class="w-5 h-5"
                                                :style="{ color: group.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }" />
                                            <span :style="{ color: 'var(--surface-text-sub)' }">{{ group.title }}</span>
                                        </h4>
                                        <div class="flex flex-wrap gap-2">
                                            <TechChip v-for="item in group.stack" :key="item" :name="item"
                                                :fallback-icon="group.icon" :accent2="group.useAccent2" />
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </div>
                        <div class="flex justify-center mt-8">
                            <button @click="showMoreTech = !showMoreTech"
                                class="px-5 py-2 text-white rounded-full text-sm font-bold transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
                                :style="{ background: 'var(--cta-gradient)', boxShadow: '0 4px 15px var(--accent-shadow)' }"
                                @mouseenter="e => e.currentTarget.style.filter = 'brightness(1.15)'"
                                @mouseleave="e => e.currentTarget.style.filter = 'brightness(1)'">
                                {{ showMoreTech ? 'Show Less' : 'See More' }}
                                <component :is="showMoreTech ? ChevronUpIcon : ChevronDownIcon" class="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <!-- Linguistic Skills -->
                    <div class="skill-group skill-languages min-w-0" data-aos="fade-up">
                        <h3 class="skill-group-heading text-xl sm:text-2xl font-bold mb-7 flex items-center gap-3">
                            <span class="w-9 h-9 rounded-xl flex items-center justify-center"
                                :style="{ backgroundColor: 'var(--icon-bg)', border: '1px solid var(--accent-border)' }">
                                <LanguageIcon class="w-5 h-5" :style="{ color: 'var(--icon-accent)' }" />
                            </span>
                            <span :style="{ color: 'var(--surface-text)' }">Linguistic Skills</span>
                        </h3>
                        <div class="space-y-6">
                            <div v-for="language in languages" :key="language.id" class="skill-progress-row group">
                                <div class="flex items-center justify-between mb-3">
                                    <span class="font-semibold flex items-center gap-2 min-w-0"
                                        :style="{ color: 'var(--accent-text-muted)' }">
                                        <img :src="language.flag" :alt="language.title"
                                            class="h-3 w-5 shrink-0 rounded-sm object-cover" />
                                        <span :class="`font-native-${language.fontKey}`" class="truncate">
                                            {{ language.title }} <span class="font-medium opacity-80">({{ language.nativeName }})</span>
                                        </span>
                                    </span>
                                    <span class="text-sm"
                                        :style="{ color: language.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }">
                                        {{ language.percentage }} %
                                    </span>
                                </div>
                                <div class="skill-progress-track h-2 rounded-full overflow-hidden">
                                    <div class="skill-progress-fill h-full rounded-full transition-all duration-1000 group-hover:brightness-125"
                                        :style="{ width: language.percentage + '%', background: 'var(--cta-gradient)' }">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Soft Skills -->
                    <div class="skill-group min-w-0" data-aos="fade-up" data-aos-delay="100">
                        <h3 class="skill-group-heading text-xl sm:text-2xl font-bold mb-7 flex items-center gap-3">
                            <span class="w-9 h-9 rounded-xl flex items-center justify-center"
                                :style="{ backgroundColor: 'var(--icon-bg-2)', border: '1px solid var(--accent-border-2-soft)' }">
                                <LightBulbIcon class="w-5 h-5" :style="{ color: 'var(--icon-accent-2)' }" />
                            </span>
                            <span :style="{ color: 'var(--surface-text)' }">Soft Skills</span>
                        </h3>
                        <div class="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-7">
                            <div v-for="skill in softSkills" :key="skill.id" class="flex flex-col items-center group">
                                <div class="relative w-24 h-24 mb-4">
                                    <svg class="w-full h-full transform -rotate-90">
                                        <circle cx="48" cy="48" r="40" stroke="currentColor" stroke-width="6"
                                            fill="transparent" class="text-[var(--bg-surface-percent-bar)]" />
                                        <circle cx="48" cy="48" r="40" stroke-width="6" fill="transparent"
                                            :stroke-dasharray="2 * Math.PI * 40"
                                            :stroke-dashoffset="2 * Math.PI * 40 * (1 - skill.percentage / 100)"
                                            stroke-linecap="round"
                                            class="transition-all duration-1000 group-hover:brightness-125"
                                            :style="{ stroke: skill.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }" />
                                    </svg>
                                    <div class="absolute inset-0 flex items-center justify-center">
                                        <span class="text-[var(--surface-text-sub)] font-bold text-lg">{{
                                            skill.percentage }}%</span>
                                    </div>
                                </div>
                                <span class="font-medium text-center text-sm"
                                    :style="{ color: 'var(--accent-text-muted)' }">{{ skill.title }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Hobbies & Interests -->
                    <div class="skill-group min-w-0" data-aos="fade-up">
                        <h3 class="skill-group-heading text-xl sm:text-2xl font-bold mb-7 flex items-center gap-3">
                            <span class="w-9 h-9 rounded-xl flex items-center justify-center"
                                :style="{ backgroundColor: 'var(--icon-bg)', border: '1px solid var(--accent-border)' }">
                                <SparklesIcon class="w-5 h-5" :style="{ color: 'var(--icon-accent)' }" />
                            </span>
                            <span :style="{ color: 'var(--surface-text)' }">Hobbies & Interests</span>
                        </h3>
                        <div class="flex flex-wrap gap-3">
                            <span v-for="hobbyInterest in hobbiesInterests" :key="hobbyInterest.id"
                                class="skill-hobby-tag px-4 py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base"
                                :style="hobbyInterest.useAccent2
                                    ? { borderColor: 'var(--icon-accent-2)', backgroundColor: 'var(--accent-to-bg)' }
                                    : { borderColor: 'var(--accent-text)', backgroundColor: 'var(--accent-bg)' }"
                                @mouseenter="e => e.currentTarget.style.backgroundColor = hobbyInterest.useAccent2 ? 'var(--accent-to-bg-hover)' : 'var(--accent-bg-hover)'"
                                @mouseleave="e => e.currentTarget.style.backgroundColor = hobbyInterest.useAccent2 ? 'var(--accent-to-bg)' : 'var(--accent-bg)'">
                                {{ hobbyInterest.hobby }}
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- CV preview and download modal (same flow as Hero) -->
        <Teleport to="body">
            <Transition name="fade">
                <div v-if="isCvOpen"
                    class="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm"
                    @click.self="closeCv">
                    <div class="cv-modal w-full max-w-3xl rounded-3xl border shadow-2xl flex flex-col overflow-hidden"
                        :style="{ backgroundColor: 'var(--surface-bg-3)', borderColor: 'var(--accent-border)' }"
                        role="dialog" aria-modal="true" aria-label="CV preview">
                        <div class="flex items-center gap-3 px-5 py-4 border-b"
                            :style="{ borderColor: 'var(--accent-border)' }">
                            <span class="grid place-items-center w-9 h-9 rounded-xl text-white text-[11px] font-bold tracking-wider"
                                :style="{ background: 'var(--cta-gradient)' }">PDF</span>
                            <div class="min-w-0 flex-1">
                                <p class="truncate text-sm font-semibold" :style="{ color: 'var(--surface-text)' }">{{ CV_FILE_NAME }}</p>
                                <p class="text-xs" :style="{ color: 'var(--accent-text-muted)' }">CV preview</p>
                            </div>
                            <button type="button" @click="closeCv" aria-label="Close"
                                class="p-1.5 rounded-full opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                                :style="{ color: 'var(--surface-text)' }">
                                <XMarkIcon class="w-5 h-5" />
                            </button>
                        </div>

                        <div class="relative bg-neutral-900/60">
                            <iframe v-if="cvPreviewUrl" :src="`${cvPreviewUrl}#toolbar=0&navpanes=0&view=FitH`"
                                title="CV preview" class="block w-full h-[62vh] sm:h-[68vh] border-0 bg-white"></iframe>
                            <div v-else class="h-[62vh] sm:h-[68vh] grid place-items-center text-sm"
                                :style="{ color: 'var(--accent-text-muted)' }">
                                <span class="inline-flex items-center gap-3">
                                    <span class="cv-spinner"></span> Loading preview…
                                </span>
                            </div>
                        </div>

                        <div class="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t"
                            :style="{ borderColor: 'var(--accent-border)' }">
                            <a :href="cvPreviewUrl || undefined" target="_blank" rel="noopener"
                                class="text-xs underline-offset-4 hover:underline"
                                :style="{ color: 'var(--accent-text-muted)' }">Preview not showing? Open in new tab</a>
                            <div class="flex items-center gap-3 w-full sm:w-auto">
                                <button type="button" @click="closeCv"
                                    class="flex-1 sm:flex-none px-6 py-3 rounded-xl border font-semibold cursor-pointer transition-colors hover:bg-white/5"
                                    :style="{ borderColor: 'var(--accent-border)', color: 'var(--surface-text)' }">
                                    {{ dl.state === 'loading' ? 'Cancel download' : 'Cancel' }}
                                </button>
                                <button type="button" @click="downloadCv" :disabled="dl.state === 'loading'"
                                    class="dl-btn flex-1 sm:flex-none" :class="`is-${dl.state}`"
                                    :style="{ background: dl.state === 'done' ? '#059669' : 'var(--cta-gradient)' }">
                                    <span class="dl-fill" :style="{ width: dl.state === 'loading' ? dl.progress + '%' : '0%' }"></span>
                                    <span class="dl-icon">
                                        <ArrowDownTrayIcon v-if="dl.state === 'idle' || dl.state === 'error'" class="w-5 h-5" />
                                        <svg v-else viewBox="0 0 32 32" class="dl-ring">
                                            <circle class="ring-bg" cx="16" cy="16" r="13" />
                                            <circle class="ring-fg" cx="16" cy="16" r="13"
                                                :style="{ strokeDashoffset: RING_C * (1 - dl.progress / 100) }" />
                                            <path class="tick" d="M9.5 16.5l4.5 4.5 8.5-9" />
                                        </svg>
                                    </span>
                                    <span class="dl-label">
                                        <template v-if="dl.state === 'loading'">Downloading <b>{{ Math.round(dl.progress) }}%</b></template>
                                        <template v-else-if="dl.state === 'done'">Downloaded</template>
                                        <template v-else-if="dl.state === 'error'">Retry download</template>
                                        <template v-else>Download</template>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>

        <!-- ── Services placeholder ── -->
        <!-- <section class="py-24 px-6" id="services">
            <div class="max-w-6xl mx-auto">
                <div class="flex items-center gap-3 mb-4" data-aos="fade-right">
                    <div class="w-8 h-px" :style="{ backgroundColor: 'var(--accent-mid)' }"></div>
                    <span class="font-mono text-sm tracking-widest uppercase"
                        :style="{ color: 'var(--accent-text)' }">Services</span>
                </div>
                <h2 class="text-4xl font-black tracking-tight mb-16" data-aos="fade-right" data-aos-delay="100">
                    Skills & <span class="text-transparent bg-clip-text"
                        :style="{ backgroundImage: 'var(--logo-gradient)' }">My Services</span>
                </h2>
                <div class="grid md:grid-cols-2 gap-8"></div>
            </div>
        </section> -->

        <Footer />

        <BackToTop />
    </div>
</template>

<script setup>
import { BriefcaseIcon, AcademicCapIcon } from '@heroicons/vue/24/outline';
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { t } from './../../stores/languages.js';
import { useRouter } from 'vue-router';
import Footer from '../Footer.vue';
import TechChip from '../TechChip.vue';
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import {
    ArrowDownTrayIcon, ArrowRightIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, CircleStackIcon, ClipboardDocumentIcon,
    CloudArrowUpIcon, CloudIcon, CodeBracketIcon, CpuChipIcon,
    CursorArrowRippleIcon,
    DevicePhoneMobileIcon, LanguageIcon, LightBulbIcon, LockClosedIcon,
    MegaphoneIcon, PaintBrushIcon, ServerIcon, SparklesIcon,
    Squares2X2Icon, SwatchIcon, WrenchScrewdriverIcon,
} from '@heroicons/vue/16/solid';
import BackToTop from '../BackToTop.vue';


// import { computed } from 'vue';
import { currentScheme } from './../../stores/colorScheme.js';
import { currentProfileFrame, FRAME_STYLES } from './../../stores/profileFrame.js';

const logoSchemeMap = {
    'Blue-Cyan': 'logo-portfolio-blue-cyan.png',
    'Red-Scarlet': 'logo-portfolio-red-scarlet.png',
    'Purple-Pink': 'logo-portfolio-pink-purple.png',
    'Green-Dark': 'logo-portfolio-green-darkgreen.png',
    'Orange-Yellow': 'logo-portfolio-orange-yellow.png',
    'Rainbow': 'logo-portfolio-rainbow.png',
    'Black-Charcoal': 'logo-portfolio-black-charcoal-darkBg.png',
    'White-Smoke': 'logo-portfolio-white-smoke.png',
    'Bloody-Red':     'logo-portfolio-bloody-red.png',
    'Midnight-Blue':  'logo-portfolio-midnight-blue.png',
};

const logoSrc = computed(() => {
    const file = logoSchemeMap[currentScheme.value] ?? logoSchemeMap['Blue-Cyan'];
    return new URL(`../../assets/logos/${file}`, import.meta.url).href;
});
const profileFrame = computed(() => FRAME_STYLES[currentProfileFrame.value] ?? FRAME_STYLES.hud);
const detailsFrameStyle = computed(() => {
    const frame = profileFrame.value;
    const style = {
        background: frame.ring
            ? 'var(--cta-gradient)'
            : 'color-mix(in srgb, var(--surface-bg-3) 60%, transparent)',
        padding: frame.ring ? '6px' : '0',
        border: frame.ring ? 'none' : '1px solid var(--accent-border)',
        borderRadius: frame.borderRadius,
        boxShadow: '0 0 40px var(--accent-shadow), 0 0 100px var(--accent-shadow)',
        transition: 'border-radius .4s ease',
    };

    if (frame.effect === 'spin') delete style.background;
    if (frame.effect === 'neon') {
        style.background = 'color-mix(in srgb, var(--surface-bg-3) 45%, transparent)';
        style.border = '2px solid var(--accent-text)';
        style.boxShadow = '0 0 14px var(--accent-text), 0 0 48px var(--accent-shadow), inset 0 0 24px var(--accent-shadow)';
    }
    if (frame.effect === 'stack') {
        style.boxShadow = '14px 14px 0 -1px color-mix(in srgb, var(--accent-from) 38%, transparent), 28px 28px 0 -2px color-mix(in srgb, var(--accent-to) 20%, transparent), 0 0 60px var(--accent-shadow)';
    }
    if (frame.effect === 'double') {
        style.boxShadow = '0 0 0 6px var(--surface-bg-3), 0 0 0 8px var(--accent-from), 0 0 50px var(--accent-shadow)';
    }
    if (frame.clip) {
        style.clipPath = frame.clip;
        style.boxShadow = 'none';
    }
    return style;
});
const detailsInnerFrameStyle = computed(() => ({
    background: 'radial-gradient(circle at 50% 25%, color-mix(in srgb, var(--accent-mid) 28%, transparent), var(--surface-bg-3) 70%)',
    borderRadius: profileFrame.value.innerClip ? '0' : profileFrame.value.borderRadius,
    clipPath: profileFrame.value.innerClip || undefined,
}));
const CORNER_GAP = 14;
const FRAME_CORNERS = ['tl', 'tr', 'bl', 'br'];
const withExpandedCorners = (radius) => String(radius ?? '0').replace(/(\d*\.?\d+)px/g, (_, value) => {
    const number = parseFloat(value);
    return number > 0 ? `${number + CORNER_GAP}px` : '0px';
});
const detailsCornerStyle = computed(() => {
    const corners = profileFrame.value.corners || [];
    const style = {
        inset: `-${CORNER_GAP}px`,
        borderRadius: withExpandedCorners(profileFrame.value.borderRadius),
    };
    FRAME_CORNERS.forEach((corner) => {
        if (!corners.includes(corner)) style[`--details-c-${corner}`] = '0px';
    });
    style['--details-corner-angle'] = corners.length === 2 && corners.includes('bl') && corners.includes('tr') ? '45deg' : '135deg';
    return style;
});
const profilePhotos = [
    { src: `${import.meta.env.BASE_URL}profile/portrait-formal.png`, alt: 'So Visalsing in a formal suit and tie' },
    { src: `${import.meta.env.BASE_URL}profile/portrait-illustrated.png`, alt: 'Illustrated portrait of So Visalsing in a dark cap and shirt' },
    { src: `${import.meta.env.BASE_URL}profile/portrait-branded.png`, alt: 'So Visalsing portrait with his developer portfolio name and role', fit: 'contain' },
    { src: `${import.meta.env.BASE_URL}profile/portrait-hoodie.png`, alt: 'So Visalsing wearing a dark hoodie' },
];
const profilePhotoIndex = ref(0);
const activeProfilePhoto = computed(() => profilePhotos[profilePhotoIndex.value]);
const stepProfilePhoto = (step) => {
    profilePhotoIndex.value = (profilePhotoIndex.value + step + profilePhotos.length) % profilePhotos.length;
};
const STATUS_KEY = 'hero-hide-status';
const WORK_STATUS = { role: 'Data Support Specialist', company: '' };
const STATUSES = [
    {
        label: 'Currently working',
        text: WORK_STATUS.company ? `${WORK_STATUS.role} @ ${WORK_STATUS.company}` : WORK_STATUS.role,
        dot: '#fbbf24',
    },
    { label: 'Open to', text: 'Freelance & collaboration', dot: '#34d399' },
];
const statusIndex = ref(0);
const status = computed(() => STATUSES[statusIndex.value]);
let statusTimer = null;
const nextStatus = () => { statusIndex.value = (statusIndex.value + 1) % STATUSES.length; };
const glassStyle = {
    background: 'color-mix(in srgb, var(--surface-bg-3) 75%, transparent)',
    borderColor: 'var(--accent-border)',
};
const hideStatus = ref(false);
try { hideStatus.value = localStorage.getItem(STATUS_KEY) === '1'; } catch { /* storage blocked */ }
function toggleStatus() {
    hideStatus.value = !hideStatus.value;
    try { localStorage.setItem(STATUS_KEY, hideStatus.value ? '1' : '0'); } catch { /* storage blocked */ }
}
const CV_FILE_NAME = 'So Visalsing - CV Resumé CSE.pdf';
const RING_C = 2 * Math.PI * 13;
const isCvOpen = ref(false);
const cvPreviewUrl = ref('');
const dl = ref({ state: 'idle', progress: 0 });
let dlAbort = null;
let dlResetTimer = null;
let cvBlobPromise = null;

function getCvBlob() {
    if (!cvBlobPromise) {
        cvBlobPromise = import('../../assets/pdf/cv/So Visalsing - CV Resumé CSE.pdf?inline').then((module) => {
            const binary = atob(module.default.split(',')[1]);
            const bytes = new Uint8Array(binary.length);
            for (let index = 0; index < binary.length; index++) bytes[index] = binary.charCodeAt(index);
            return new Blob([bytes], { type: 'application/pdf' });
        });
        cvBlobPromise.catch(() => { cvBlobPromise = null; });
    }
    return cvBlobPromise;
}

async function loadCvPreview() {
    if (cvPreviewUrl.value) return;
    try {
        const blob = await getCvBlob();
        if (isCvOpen.value) cvPreviewUrl.value = URL.createObjectURL(blob);
    } catch (error) {
        console.error('CV preview failed:', error);
    }
}

const openCv = () => {
    isCvOpen.value = true;
    loadCvPreview();
};

function cancelDownload() {
    if (dlAbort) { dlAbort.abort(); dlAbort = null; }
    clearTimeout(dlResetTimer);
    dl.value = { state: 'idle', progress: 0 };
}

const closeCv = () => {
    cancelDownload();
    isCvOpen.value = false;
    if (cvPreviewUrl.value.startsWith('blob:')) URL.revokeObjectURL(cvPreviewUrl.value);
    cvPreviewUrl.value = '';
};

async function downloadCv() {
    if (dl.value.state === 'loading') return;
    clearTimeout(dlResetTimer);
    dl.value = { state: 'loading', progress: 0 };
    const controller = new AbortController();
    dlAbort = controller;
    const startTime = performance.now();
    const minimumDuration = 1800;
    let actualProgress = 0;
    let finished = false;
    let blob;

    const finish = () => {
        dl.value = { state: 'done', progress: 100 };
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = CV_FILE_NAME;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(link.href), 10000);
        dlAbort = null;
        dlResetTimer = setTimeout(() => { dl.value = { state: 'idle', progress: 0 }; }, 2600);
    };

    const animateProgress = () => {
        if (controller.signal.aborted) return;
        const elapsed = Math.min(1, (performance.now() - startTime) / minimumDuration);
        const eased = 1 - Math.pow(1 - elapsed, 2);
        const shown = Math.min(actualProgress, eased * 100);
        dl.value = { state: 'loading', progress: Math.max(dl.value.progress, shown) };
        if (finished && shown >= 100) return finish();
        requestAnimationFrame(animateProgress);
    };

    requestAnimationFrame(animateProgress);
    try {
        blob = await getCvBlob();
        actualProgress = 100;
        finished = true;
    } catch (error) {
        if (controller.signal.aborted) return;
        console.error('CV download failed:', error);
        controller.abort();
        dl.value = { state: 'error', progress: 0 };
    }
}

const handleCvKeydown = (event) => {
    if (event.key === 'Escape' && isCvOpen.value) closeCv();
};

const router = useRouter();

const Menu = ref([
    { name: 'Home', href: '/#about' },
    { name: 'Profile', href: '#profile' },
    { name: 'Experiences', href: '#journey' },
    { name: 'Skills', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'Settings', href: '/settings' },
]);

const isMenuOpen = ref(false);
const isStickyVisible = ref(false);
const isHoveringTop = ref(false);
const activeSection = ref('#profile');
const isExpanded = ref(false);

const personalInfo = [
    { label: 'Full Name', value: 'Visalsing' },
    { label: 'Nationality', value: 'Cambodian / Khmer' },
    { label: 'Place of Birth', value: 'Kampot' },
    { label: 'Present Address', value: 'Phnom Penh' },
];

const workExperience = [
    {
        id: 3,
        period: 'Sep 2026 - Present',
        position: 'Freelance Full-Stack Developer',
        company: 'Café ខ្មោច',
        working_status: 1,
        useAccent2: false,
        desc: 'Developing an ongoing café platform that combines point-of-sale (POS) and e-commerce features. I began this first freelance project on September 28, 2026.',
        desc_points: [
            'Frontend: HTML, CSS, JavaScript, React.js, Vite.js, and Tailwind CSS.',
            'Backend & Database: Node.js, Express.js, SQL, PostgreSQL, and NeonDB.',
            'Tools, APIs, Deployment & AI: Git, GitHub, REST APIs, Postman, EmailJS, Telegram, PWA, Vercel, Render, Claude, Codex, and Gemini.'
        ]
    },
    {
        id: 4,
        period: 'Sep 2026 - Dec 2026',
        position: 'Data Support Specialist',
        company: 'Unilever',
        working_status: 1,
        useAccent2: true,
        desc: 'Supporting data operations at Unilever from September 16 to December 15, 2026.',
        desc_points: [
            'Data Entry: Updated and maintained records using Excel and internal systems.',
            'Data Checks: Reviewed information for missing or inconsistent entries and followed up when details needed clarification.',
            'Organization: Used Excel to organize, sort, and filter data for team reference.',
            'Team Support: Helped colleagues locate, update, and understand information in the system.',
            'Coordination: Worked with team members to collect and verify information needed for accurate records.'
        ]
    },
    {
        id: 5,
        period: 'Jun 2026 - Sep 2026',
        position: 'System Rollouts Support Specialist',
        company: 'Unilever',
        working_status: 0,
        useAccent2: false,
        desc: 'Supported system rollouts at Unilever from June 16 to September 15, 2026. This assignment ended before I moved into Data Support.',
        desc_points: [
            'User Support: Worked with administrators and staff from different professional backgrounds during system rollouts.',
            'Training: Learned system workflows and guided users through key features and everyday tasks.',
            'Field Support: Visited three district teams (DTs) to assist with rollout, answer questions, and support system adoption.',
            'Issue Follow-up: Gathered user feedback and helped communicate questions or issues to the relevant team.',
            'Adaptability: Adjusted explanations and support to suit each team’s needs and level of technical experience.'
        ]
    },
    {
        id: 1,
        period: 'Sep 2024 - Feb 2026',
        position: 'Junior Software Developer',
        company: 'GPAS.IO.CO,Ltd',
        desc: "Worked for 1 year and 5 months at GPAS.IO.CO,Ltd",
        desc_points: [
            "Frontend: Developed responsive UI using Blade, HTML, JavaScript, and Bootstrap.",
            "Backend: Built server-side logic and database schemas with Laravel and MySQL.",
            "APIs: Designed and integrated RESTful APIs for system connectivity.",
            "Marketing: Managed Mautic automation for email marketing campaigns.",
            "Teamwork: Collaborated in Agile cycles to ship features and fix bugs.",
            "Internationalization: Implemented multi-language switching and localization features."
        ]
    },
    {
        id: 2,
        period: 'Nov 2023 - Mar 2024',
        position: 'Interned Web Developer',
        company: 'Code Clans',
        desc: "Interned for 5 months at Code Clans",
        desc_points: [
            "Frontend: Developed responsive, mobile-first interfaces using Bootstrap and jQuery.",
            "Backend: Built dynamic web features and managed databases with PHP and MySQL.",
            "CMS: Customized and maintained WordPress, Joomla and Ecwid sites, including theme and plugin adjustments."
        ]
    },
];
// This set will store the IDs of the expanded cards
const expandedExpIds = ref(new Set());
const toggleExpandExp = (id) => {
    if (expandedExpIds.value.has(id)) {
        expandedExpIds.value.delete(id);
    } else {
        expandedExpIds.value.add(id);
    }
};

const WORK_EXPERIENCE_PREVIEW = 3;
const showMoreExperience = ref(false);
const EDUCATION_PREVIEW = 3;
const showMoreEducation = ref(false);
const educationHistory = [
    {
        id: 1,
        period: '2020 - 2024',
        title: 'Bachelor Degree of Computer Science',
        institution: 'Royal University of Phnom Penh (RUPP)',
        desc: `
        I graduated as a Bachelor Degree at Royal University of Phnom Penh (RUPP) in 2024.
        My major skill was Computer Science and Engineering. 
        I was a Generation 24. 
        There were subjects in those skills such as Web Application, Management of Information System (MIS),
        Project Management, Programmings, Database, Softskills and etc.
        I involved in group assignment that I was an active members, and I was sometimes also a lead of project.
        `,
    },
    {
        id: 2,
        period: '2023 - 2024',
        title: 'Basic Web and PHP + Laravel Course',
        institution: 'Instinct Institute',
        desc: `
        A focused course covering front-end and back-end web development. I learned HTML, CSS, JavaScript,
        Bootstrap, jQuery, Git, and GitHub, along with the basics of deployment and hosting. On the back end,
        I studied PHP, SQL, MySQL, Laravel, Blade templates, and local development with WAMP.
        `,
    },
    {
        id: 3,
        period: '2020 - 2023',
        title: 'General English Programme (GEP)',
        institution: 'Australian Centre of Education (ACE)',
        desc: `
        Completed the full programme in 2023, focusing on the four core language pillars: advanced reading, academic writing, and confident speaking and listening. These three years helped me build the fluency needed to navigate international environments and handle complex documentation comfortably.
        `,
    },
    {
        id: 4,
        period: '2022 - 2023',
        title: 'Dart + Flutter Course',
        institution: 'ETEC',
        desc: `A deep dive into the world of mobile apps. I learned how to use Dart and Flutter to build smooth, cross-platform applications for both iOS and Android, focusing on state management, custom UI widgets, and connecting apps to real-time data via APIs.`,
    },
    {
        id: 5,
        period: '2020 - 2022',
        title: 'C/C++ & Java Course',
        institution: 'ETEC',
        desc: `This is where I built my core logic. I started with C and C++ to understand low-level programming and memory management, then moved into Java to master Object-Oriented Programming (OOP) and complex system architecture.`,
    },
];
// Track which specific education text blocks are expanded
const expandedEduTextIds = ref(new Set());

const toggleEduText = (id) => {
    if (expandedEduTextIds.value.has(id)) {
        expandedEduTextIds.value.delete(id);
    } else {
        expandedEduTextIds.value.add(id);
    }
};

const additionalSkill = [
    {
        id: 1,
        period: '2024 - 2026',
        title: 'Digital Sales Assistant',
        company: 'A Small Business',
        desc: 'Supported a small relative’s retail business by photographing store products—including solar fans, solar lights, and electronic mosquito killer lights—and presenting them clearly for online customers.',
    },
    {
        id: 2,
        period: 'Nov 2025 - Present',
        title: 'Independent Lao Language Content Sharer',
        company: 'Personal YouTube Channel',
        desc: 'Since November 2, 2025, I have independently created and shared Lao-language content on YouTube, drawing on my personal knowledge and interest. This is self-directed knowledge sharing; I do not present myself as a teacher or tutor.',
    },
];

const TECH_PREVIEW = 3;
const showMoreTech = ref(false);
const TECHNICAL_SKILL_PREVIEW = 5;
const showMoreTechnicalSkills = ref(false);

const frontends = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'XML', 'Vue.js', 'Vite', 'React.js', 'Next.js', 'Nuxt.js', 'jQuery', 'Tailwind CSS', 'Bootstrap', 'Shadcn/ui', 'Material UI'];
const backends = ['PHP', 'SQL', 'Java', 'C#', 'Python', 'Laravel', 'Laravel Backpack', 'Node.js', 'Express.js', 'SpringBoot', 'ASP.NET', 'Flask', 'Django'];
const mobiles = ['Dart', 'Flutter'];
const programmings = ['C', 'C++'];
const databaseOrms = ['MySQL', 'PostgreSQL', 'MongoDB', 'NeonDB', 'SQLite', 'Prisma ORM', 'GraphQL'];
const apiSecurities = ['REST APIs', 'Postman', 'JWT'];
const cmsMartketingtechs = ['WordPress', 'Drupal', 'Joomla', 'Ecwid', 'Mautic', 'OneSignal', 'Tinode', 'TelegramBot'];
const devopsDeployments = ['Git', 'GitHub', 'GitLab', 'Netlify', 'Vercel', 'Patheon', 'Apache', 'Docker', 'DigitalOcean', 'AWS', 'Linux', 'Ubuntu'];
const developmenttools = ['VS Code', 'PWA', 'WAMPP', 'XAMPP', 'Laragon', 'Ngrok', 'Navicat', 'phpMyAdmin'];
const designs = ['Figma', 'Photoshop', 'Canva', 'CapCut', 'Responsive Design'];
const productivities = [
    'Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint',
    'Google Docs', 'Google Sheets', 'Google Slides', 'Notion', 'Basic Computer Fundamentals',
];
const aiAssistants = ['Claude', 'Gemini', 'ChatGPT', 'Copilot'];
const dataAnalytics = ['Power BI', 'Tableau'];

const techStack = [
    { id: 1, title: 'Front-end', icon: CodeBracketIcon, useAccent2: false, stack: frontends },
    { id: 2, title: 'Back-end', icon: ServerIcon, useAccent2: true, stack: backends },
    { id: 3, title: 'Mobile', icon: DevicePhoneMobileIcon, useAccent2: false, stack: mobiles },
    { id: 4, title: 'Programming', icon: CpuChipIcon, useAccent2: true, stack: programmings },
    { id: 5, title: 'Databases & ORM', icon: CircleStackIcon, useAccent2: false, stack: databaseOrms },
    { id: 6, title: 'APIs & Security', icon: LockClosedIcon, useAccent2: true, stack: apiSecurities },
    { id: 7, title: 'CMS & Marketing Tech', icon: MegaphoneIcon, useAccent2: false, stack: cmsMartketingtechs },
    { id: 8, title: 'DevOps & Deployment', icon: CloudArrowUpIcon, useAccent2: true, stack: devopsDeployments },
    { id: 9, title: 'Development Tools', icon: WrenchScrewdriverIcon, useAccent2: false, stack: developmenttools },
    { id: 10, title: 'Designs', icon: SwatchIcon, useAccent2: true, stack: designs },
    { id: 11, title: 'Productivities', icon: ClipboardDocumentIcon, useAccent2: false, stack: productivities },
    { id: 12, title: 'LLMs & AI Assistants', icon: SparklesIcon, useAccent2: true, stack: aiAssistants },
    { id: 13, title: 'Data Analytics & BI', icon: CircleStackIcon, useAccent2: false, stack: dataAnalytics },
];

const technicalSkills = [
    { id: 1, title: 'Front-end Development', icon: CodeBracketIcon, useAccent2: false, percentage: 84 },
    { id: 2, title: 'Back-end Development', icon: ServerIcon, useAccent2: true, percentage: 79 },
    { id: 3, title: 'Web Design', icon: PaintBrushIcon, useAccent2: false, percentage: 68 },
    { id: 4, title: 'Mobile Developer', icon: DevicePhoneMobileIcon, useAccent2: true, percentage: 50 },
    { id: 5, title: 'DevOps & Cloud', icon: CloudIcon, useAccent2: false, percentage: 40 },
    { id: 6, title: 'Marketing & Automation', icon: MegaphoneIcon, useAccent2: false, percentage: 50 },
    { id: 7, title: 'API Architecture', icon: CircleStackIcon, useAccent2: false, percentage: 70 },
    { id: 8, title: 'UX/UI Design', icon: PaintBrushIcon, useAccent2: true, percentage: 88 },
    { id: 9, title: 'System Rollouts & User Training', icon: CloudArrowUpIcon, useAccent2: true, percentage: 75 },
    { id: 10, title: 'Data Support & Excel', icon: CircleStackIcon, useAccent2: false, percentage: 65 },
];

const languages = [
    { id: 1, title: 'Khmer', nativeName: 'ភាសាខ្មែរ', fontKey: 'km', flag: new URL('../../assets/images/flags/cambodia-flag.png', import.meta.url).href, useAccent2: false, percentage: 92 },
    { id: 2, title: 'English', nativeName: 'English', fontKey: 'en', flag: new URL('../../assets/images/flags/uk-flag.png', import.meta.url).href, useAccent2: true, percentage: 87 },
    { id: 3, title: 'Chinese', nativeName: '中文', fontKey: 'zh', flag: new URL('../../assets/images/flags/taiwan-flag.png', import.meta.url).href, useAccent2: false, percentage: 22 },
    { id: 4, title: 'French', nativeName: 'Français', fontKey: 'fr', flag: new URL('../../assets/images/flags/france-flag.png', import.meta.url).href, useAccent2: true, percentage: 10 },
    { id: 5, title: 'Lao', nativeName: 'ພາສາລາວ', fontKey: 'lo', flag: new URL('../../assets/images/flags/laos-flag.png', import.meta.url).href, useAccent2: false, percentage: 59 },
];

const softSkills = [
    { id: 1, title: 'Resilience & Optimistic', useAccent2: false, percentage: 85 },
    { id: 2, title: 'Analytic Thinking', useAccent2: true, percentage: 79 },
    { id: 3, title: 'Active Growth Mindset', useAccent2: false, percentage: 87 },
    { id: 4, title: 'Continuous Learning', useAccent2: true, percentage: 88 },
    { id: 5, title: 'Adaptability', useAccent2: false, percentage: 92 },
    { id: 6, title: 'Problem-Solving & Debugging', useAccent2: true, percentage: 76 },
    { id: 7, title: 'Self-Directed Learning', useAccent2: false, percentage: 75 },
    { id: 8, title: 'Teamwork & Communication', useAccent2: true, percentage: 60 },
];

const hobbiesInterests = [
    { id: 1, hobby: 'Reading Books', useAccent2: false },
    { id: 2, hobby: 'Learning Languages', useAccent2: true },
    { id: 3, hobby: 'Content Creation', useAccent2: false },
    { id: 4, hobby: 'Open Source Contributing', useAccent2: true },
    { id: 5, hobby: 'Project-Based Learning', useAccent2: false },
    { id: 6, hobby: 'Photography', useAccent2: true },
];

watch(isMenuOpen, (val) => { document.body.style.overflow = val ? 'hidden' : ''; });

const handleScroll = () => {
    isStickyVisible.value = window.scrollY > 400;
    const scrollPosition = window.scrollY + 100;
    Menu.value.forEach((item) => {
        if (item.href.startsWith('#')) {
            const section = document.querySelector(item.href);
            if (section) {
                const top = section.offsetTop, height = section.offsetHeight;
                if (scrollPosition >= top && scrollPosition < top + height) activeSection.value = item.href;
            }
        }
    });
};

const scrollToSection = (href) => {
    isMenuOpen.value = false; isHoveringTop.value = false;
    document.body.style.overflow = '';
    if (href.startsWith('/')) router.push(href);
    else document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleCvKeydown);
    statusTimer = setInterval(nextStatus, 4200);
});
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    document.removeEventListener('keydown', handleCvKeydown);
    clearInterval(statusTimer);
    closeCv();
    document.body.style.overflow = '';
});
</script>

<style scoped>
.details-page {
    overflow-x: clip;
    isolation: isolate;
}

.details-nav {
    min-height: 78px;
    border-bottom: 1px solid var(--surface-border);
}

.details-sticky-nav {
    border-bottom: 1px solid var(--surface-border);
}

.profile-section {
    background: color-mix(in srgb, var(--surface-bg-3) 74%, transparent);
    -webkit-backdrop-filter: blur(20px) saturate(135%);
    backdrop-filter: blur(20px) saturate(135%);
    border-top: 1px solid color-mix(in srgb, var(--surface-border) 75%, transparent);
    border-bottom: 1px solid color-mix(in srgb, var(--accent-mid) 18%, var(--surface-border));
    box-shadow: inset 0 1px 0 color-mix(in srgb, var(--surface-text) 4%, transparent);
}

.profile-section::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 8%;
    width: 84%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent-mid), var(--icon-accent-2), transparent);
    opacity: .55;
}

.profile-title h1 {
    text-wrap: balance;
}

.profile-copy-card {
    box-shadow: 0 20px 55px -40px var(--accent-shadow-lg);
}

.profile-copy-card::before {
    content: '';
    position: absolute;
    top: 1.5rem;
    bottom: 1.5rem;
    left: 0;
    width: 3px;
    border-radius: 0 999px 999px 0;
    background: linear-gradient(to bottom, var(--accent-mid), var(--icon-accent-2));
    opacity: .9;
}

.profile-copy-card::after {
    content: '';
    position: absolute;
    width: 12rem;
    height: 12rem;
    top: -8rem;
    right: -5rem;
    border-radius: 9999px;
    background: var(--accent-mid);
    filter: blur(72px);
    opacity: .12;
    pointer-events: none;
}

.profile-fact {
    position: relative;
    overflow: hidden;
    box-shadow: 0 14px 34px -30px var(--accent-shadow-lg);
    transition: transform .25s ease, border-color .25s ease, background-color .25s ease;
}

.profile-fact::after {
    content: '';
    position: absolute;
    inset: 0 auto 0 0;
    width: 2px;
    background: linear-gradient(to bottom, var(--accent-mid), var(--icon-accent-2));
    opacity: .55;
}

.profile-fact:hover {
    transform: translateY(-2px);
}

.profile-portrait {
    isolation: isolate;
}

.details-photo-shell {
    box-sizing: border-box;
}

.details-corner-frame {
    --details-corner-len: 72px;
    position: absolute;
    z-index: 5;
    pointer-events: none;
    transition: --details-corner-len .5s ease, border-radius .4s ease;
    -webkit-mask:
        linear-gradient(#000 0 0) top left / var(--details-c-tl, var(--details-corner-len)) var(--details-c-tl, var(--details-corner-len)) no-repeat,
        linear-gradient(#000 0 0) top right / var(--details-c-tr, var(--details-corner-len)) var(--details-c-tr, var(--details-corner-len)) no-repeat,
        linear-gradient(#000 0 0) bottom left / var(--details-c-bl, var(--details-corner-len)) var(--details-c-bl, var(--details-corner-len)) no-repeat,
        linear-gradient(#000 0 0) bottom right / var(--details-c-br, var(--details-corner-len)) var(--details-c-br, var(--details-corner-len)) no-repeat;
    mask:
        linear-gradient(#000 0 0) top left / var(--details-c-tl, var(--details-corner-len)) var(--details-c-tl, var(--details-corner-len)) no-repeat,
        linear-gradient(#000 0 0) top right / var(--details-c-tr, var(--details-corner-len)) var(--details-c-tr, var(--details-corner-len)) no-repeat,
        linear-gradient(#000 0 0) bottom left / var(--details-c-bl, var(--details-corner-len)) var(--details-c-bl, var(--details-corner-len)) no-repeat,
        linear-gradient(#000 0 0) bottom right / var(--details-c-br, var(--details-corner-len)) var(--details-c-br, var(--details-corner-len)) no-repeat;
}

.details-corner-ring {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 2px;
    background: linear-gradient(var(--details-corner-angle, 135deg), var(--accent-from), var(--accent-to));
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
}

.profile-portrait:hover .details-corner-frame {
    --details-corner-len: 96px;
}

.details-photo-grid {
    position: absolute;
    inset: 0;
    z-index: 2;
    background-image:
        linear-gradient(color-mix(in srgb, var(--accent-mid) 22%, transparent) 1px, transparent 1px),
        linear-gradient(90deg, color-mix(in srgb, var(--accent-mid) 22%, transparent) 1px, transparent 1px);
    background-size: 34px 34px;
    -webkit-mask-image: radial-gradient(ellipse 85% 85% at 50% 50%, #000 30%, transparent 100%);
    mask-image: radial-gradient(ellipse 85% 85% at 50% 50%, #000 30%, transparent 100%);
    pointer-events: none;
}

.profile-photo-frame {
    box-sizing: border-box;
}

@property --details-frame-angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
}

.details-frame-spin {
    background: conic-gradient(from var(--details-frame-angle), var(--accent-from), var(--accent-to), var(--accent-mid, var(--accent-from)), var(--accent-from));
    animation: details-frame-rotate 6s linear infinite;
}

@keyframes details-frame-rotate {
    to { --details-frame-angle: 360deg; }
}

.profile-photo-image {
    z-index: 1;
}

.profile-photo-arrow {
    position: absolute;
    top: 50%;
    z-index: 2;
    display: grid;
    width: 2.5rem;
    height: 2.5rem;
    place-items: center;
    transform: translateY(-50%);
    border: 1px solid var(--accent-border);
    border-radius: 9999px;
    background: color-mix(in srgb, var(--surface-bg-3) 82%, transparent);
    color: var(--surface-text);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    cursor: pointer;
    transition: background-color .2s ease, border-color .2s ease, color .2s ease, scale .2s ease;
}

.profile-photo-arrow:hover {
    scale: 1.08;
    border-color: var(--accent-text);
    background: var(--accent-bg-hover);
    color: var(--accent-text);
}

.profile-photo-dots {
    position: absolute;
    bottom: .8rem;
    left: 50%;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: .45rem;
    padding: .45rem .6rem;
    transform: translateX(-50%);
    border: 1px solid color-mix(in srgb, var(--surface-border) 70%, transparent);
    border-radius: 9999px;
    background: color-mix(in srgb, var(--surface-bg-3) 82%, transparent);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
}

.profile-photo-dot {
    width: .45rem;
    height: .45rem;
    padding: 0;
    border: 0;
    border-radius: 9999px;
    background: var(--surface-text-sub);
    opacity: .65;
    cursor: pointer;
    transition: width .2s ease, opacity .2s ease, background-color .2s ease;
}

.profile-photo-dot.active {
    width: 1.15rem;
    background: var(--accent-mid);
    opacity: 1;
}

.profile-photo-enter-active,
.profile-photo-leave-active {
    transition: opacity .22s ease, transform .22s ease;
}

.profile-photo-enter-from,
.profile-photo-leave-to {
    transform: scale(.985);
    opacity: 0;
}

.clear-toggle {
    position: absolute;
    top: calc(100% + 2.75rem);
    left: 50%;
    z-index: 30;
    display: inline-flex;
    width: max-content;
    align-items: center;
    gap: 6px;
    padding: 6px 14px 6px 11px;
    transform: translateX(-50%);
    border: 1px solid var(--accent-border);
    border-radius: 9999px;
    outline: none;
    background: color-mix(in srgb, var(--surface-bg-3) 70%, transparent);
    color: var(--surface-text-sub);
    font: 600 10px/1.7 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: .12em;
    text-transform: uppercase;
    white-space: nowrap;
    -webkit-backdrop-filter: blur(6px);
    backdrop-filter: blur(6px);
    cursor: pointer;
    transition: background .25s ease, color .25s ease, border-color .25s ease;
}

.clear-toggle:hover,
.clear-toggle:focus-visible {
    border-color: var(--accent-text);
    color: var(--surface-text);
}

.clear-toggle.on {
    border-color: transparent;
    background: var(--cta-gradient);
    color: #fff;
}

.badge-float {
    animation: badge-bob 5s ease-in-out infinite;
}

@keyframes badge-bob {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
}

.status-badge {
    transition: border-color .25s ease, box-shadow .25s ease, opacity .35s ease, visibility .35s;
}

.status-badge.is-hidden {
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
}

.status-badge:hover {
    border-color: var(--accent-text);
    box-shadow: 0 20px 40px -12px var(--accent-shadow);
}

.status-enter-active,
.status-leave-active {
    transition: opacity .3s ease, transform .3s ease;
}

.status-enter-from {
    transform: translateY(8px);
    opacity: 0;
}

.status-leave-to {
    transform: translateY(-8px);
    opacity: 0;
}

.status-pip {
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 9999px;
    background: var(--accent-border);
    transition: width .3s ease, background .3s ease;
}

.status-pip.on {
    width: 18px;
    background: var(--accent-mid);
}

.details-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: min(78rem, 92vw);
    height: 1px;
    transform: translateX(-50%);
    background: linear-gradient(90deg, transparent, var(--surface-border), transparent);
}

.details-panel {
    position: relative;
    overflow: hidden;
    box-shadow: 0 24px 70px -56px var(--accent-shadow-lg);
    backdrop-filter: blur(14px);
}

.details-panel::before {
    content: '';
    position: absolute;
    inset: 0 12% auto;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent-mid), var(--icon-accent-2), transparent);
    opacity: .45;
    pointer-events: none;
}

.details-panel:hover {
    transform: translateY(-3px);
    box-shadow: 0 28px 70px -48px var(--accent-shadow-lg);
}

.details-panel > h3 {
    padding-bottom: 1.1rem;
    border-bottom: 1px solid var(--surface-border);
}

.timeline-item {
    padding-bottom: 1.4rem;
    border-bottom: 1px solid color-mix(in srgb, var(--surface-border) 85%, transparent);
}

.timeline-item:last-child {
    padding-bottom: 0;
    border-bottom: 0;
}

.details-cv-btn:hover {
    background-color: var(--accent-bg);
    border-color: var(--accent-text);
    transform: translateY(-1px);
    box-shadow: 0 10px 28px -16px var(--accent-shadow-lg);
}

.dl-btn {
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-width: 200px;
    padding: 11px 24px;
    border-radius: 12px;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 10px 30px -10px var(--accent-shadow);
    transition: filter .2s ease, transform .2s ease, background .4s ease;
}

.dl-btn:hover:not(:disabled) {
    filter: brightness(1.12);
    transform: translateY(-1px);
}

.dl-btn:disabled {
    cursor: progress;
}

.cv-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid var(--accent-border);
    border-top-color: var(--accent-mid);
    border-radius: 9999px;
    animation: cv-spin .8s linear infinite;
}

@keyframes cv-spin {
    to { transform: rotate(360deg); }
}

.dl-fill {
    position: absolute;
    inset: 0 auto 0 0;
    background: rgba(255, 255, 255, .22);
    transition: width .12s linear;
}

.dl-icon,
.dl-label {
    position: relative;
}

.dl-label b {
    display: inline-block;
    min-width: 2.6ch;
    font-variant-numeric: tabular-nums;
}

.dl-ring {
    width: 30px;
    height: 30px;
    overflow: visible;
    transform: rotate(-90deg);
}

.ring-bg,
.ring-fg {
    fill: none;
    stroke-width: 3;
}

.ring-bg {
    stroke: rgba(255, 255, 255, .28);
}

.ring-fg {
    stroke: #fff;
    stroke-linecap: round;
    stroke-dasharray: 81.68;
    transition: stroke-dashoffset .12s linear;
}

.tick {
    fill: none;
    stroke: #fff;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 26;
    stroke-dashoffset: 26;
    opacity: 0;
    transform: rotate(90deg);
    transform-origin: 16px 16px;
}

.dl-btn.is-done .ring-fg {
    fill: rgba(255, 255, 255, .22);
    animation: ring-pop .5s ease-out;
    transform-origin: center;
}

.dl-btn.is-done .tick {
    opacity: 1;
    animation: tick-draw .45s .15s ease-out forwards;
}

@keyframes tick-draw {
    to { stroke-dashoffset: 0; }
}

@keyframes ring-pop {
    50% { transform: scale(1.18); }
}

.details-cv-btn:focus-visible,
.details-page button:focus-visible,
.details-page a:focus-visible {
    outline: 2px solid var(--accent-mid);
    outline-offset: 3px;
}

@media (max-width: 640px) {
    .details-panel > h3 {
        margin-bottom: 1.5rem;
    }

}

@media (prefers-reduced-motion: reduce) {
    .details-panel,
    .details-cv-btn,
    .profile-fact {
        transition: none !important;
    }

    .cv-spinner,
    .dl-btn.is-done .ring-fg,
    .dl-btn.is-done .tick {
        animation: none !important;
    }

    .badge-float {
        animation: none !important;
    }

    .profile-photo-arrow,
    .profile-photo-dot,
    .profile-photo-enter-active,
    .profile-photo-leave-active {
        transition: none !important;
    }

    .details-frame-spin {
        animation: none !important;
    }

    .profile-portrait:hover .details-corner-frame {
        --details-corner-len: 72px;
    }

    .details-panel:hover,
    .details-cv-btn:hover {
        transform: none;
    }
}

.journey-intro {
    text-wrap: pretty;
}

.journey-panel-heading {
    min-height: 3rem;
    border-bottom: 1px solid var(--surface-border);
    padding-bottom: 1.25rem;
}

.journey-column {
    min-width: 0;
}

.journey-additional {
    margin-top: 1rem;
}

.journey-count {
    white-space: nowrap;
}

.journey-list {
    isolation: isolate;
}

.journey-list::before {
    content: '';
    position: absolute;
    left: 21px;
    top: 0.65rem;
    bottom: 0.65rem;
    z-index: -1;
    width: 1px;
    background: linear-gradient(to bottom, var(--accent-mid), color-mix(in srgb, var(--accent-mid) 12%, transparent));
    opacity: .55;
}

.journey-list-education::before {
    background: linear-gradient(to bottom, var(--icon-accent-2), color-mix(in srgb, var(--icon-accent-2) 12%, transparent));
}

.journey-entry {
    min-width: 0;
    padding: 0 0 1.2rem 2.8rem;
    border: 0;
    border-bottom: 1px solid color-mix(in srgb, var(--surface-border) 85%, transparent);
    background: transparent;
    transition: opacity .2s ease;
}

.journey-entry:last-child {
    padding-bottom: 0;
    border-bottom: 0;
}

.journey-entry:hover {
    opacity: .92;
}

.journey-dot {
    z-index: 1;
}

.journey-period {
    white-space: nowrap;
}

.journey-activity {
    min-width: 0;
    padding-left: 1rem;
    border-left: 2px solid var(--accent-border);
}

.journey-activity:nth-child(even) {
    border-left-color: var(--accent-border-2-soft);
}

.journey-activity:hover {
    border-left-color: var(--accent-text);
}

.journey-more,
.journey-toggle {
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
}

.journey-toggle:hover {
    transform: translateY(-1px);
    border-color: var(--accent-text);
    background-color: var(--accent-bg-hover);
}

.skill-group {
    min-width: 0;
}

#skills {
    scroll-margin-top: 6rem;
}

@media (min-width: 1024px) {
    .skills-layout {
        grid-template-rows: auto auto auto;
    }

    .skill-technical {
        grid-column: 1;
        grid-row: 1;
    }

    .skill-languages {
        grid-column: 2;
        grid-row: 1;
    }

    .skill-tech-stack {
        grid-column: 1 / -1;
        grid-row: 2;
    }

    .skill-group:nth-last-child(2) {
        grid-column: 1;
        grid-row: 3;
    }

    .skill-group:last-child {
        grid-column: 2;
        grid-row: 3;
    }
}

.skill-group-heading {
    min-height: 3.4rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--surface-border);
}

.skill-tech-stack {
    padding-block: .25rem .5rem;
}

.skill-subheading {
    color: var(--surface-text-sub);
}

.skill-tech-tag {
    background: var(--accent-bg);
    border: 1px solid var(--accent-border);
    color: var(--accent-text-muted);
}

.skill-tech-tag:hover {
    transform: translateY(-2px);
    border-color: var(--accent-text);
    background: var(--accent-bg-hover);
}

.skill-progress-track {
    background: var(--bg-surface-percent-bar);
}

.skill-progress-fill {
    box-shadow: 0 0 14px color-mix(in srgb, var(--accent-mid) 28%, transparent);
}

.skill-hobby-tag {
    border: 1px solid var(--surface-border);
    color: var(--surface-text-sub);
}

.skill-hobby-tag:hover {
    transform: translateY(-2px);
    color: var(--surface-text);
    border-color: var(--accent-border);
}

@media (max-width: 640px) {
    .journey-panel-heading {
        gap: .7rem;
        font-size: 1.05rem;
    }

    .journey-entry {
        padding: 0 0 1rem 2.65rem;
    }

    .journey-entry-top {
        align-items: flex-start;
    }

    .skills-layout {
        row-gap: 2.75rem;
    }

    #skills {
        scroll-margin-top: 5rem;
    }

    .skill-group-heading {
        font-size: 1.15rem;
        margin-bottom: 1.25rem;
    }

    .skill-tech-grid {
        grid-template-columns: minmax(0, 1fr);
    }
}

@media (prefers-reduced-motion: reduce) {
    .journey-entry,
    .journey-toggle {
        transition: none;
    }

    .journey-toggle:hover {
        transform: none;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-5px);
}
</style>
