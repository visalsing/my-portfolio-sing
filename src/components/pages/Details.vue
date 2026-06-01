<template>
    <!-- bg-[#080c14] -->
    <div class="min-h-screen text-white" :style="{ backgroundImage: 'var(--surface-bg)' }">

        <!-- ── NAVBAR ── -->
        <div>
            <header :class="[
                'w-full z-[100] transition-all duration-300 px-4 py-4 sm:px-6 flex justify-between items-center',
                'fixed top-0 left-0 lg:relative lg:top-auto lg:left-auto lg:z-20',
                /* Removed hardcoded #111827. Used var(--navbar-bg) with opacity */
                isMenuOpen ? 'bg-transparent' : 'backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none'
            ]"
                :style="!isMenuOpen ? { backgroundColor: 'color-mix(in srgb, var(--navbar-bg), transparent 50%)' } : {}">

                <div class="text-xl sm:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent relative z-[110]"
                    :style="{ backgroundImage: 'var(--logo-gradient)' }">
                    Dev <span class="font-black">Portfolio</span>
                </div>

                <div class="lg:hidden relative z-[110]">
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
                    'fixed inset-0 z-[80] flex flex-col items-center justify-center transition-all duration-500 ease-in-out',
                    'lg:relative lg:bg-transparent lg:flex lg:justify-between lg:flex-row lg:inset-auto lg:translate-y-0',
                    isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 lg:opacity-100'
                ]" :style="{ backgroundColor: isMenuOpen ? 'var(--surface-bg)' : 'transparent' }">
                    <ul class="flex flex-col items-center space-y-6 lg:flex-row lg:space-x-5 lg:space-y-0">
                        <li v-for="item in Menu" :key="item.name" class="group relative">
                            <a :href="item.href"
                                class="relative block transition-colors duration-300 text-lg sm:text-xl lg:text-sm font-medium tracking-wide"
                                :style="{ color: activeSection === item.href ? 'var(--accent-text)' : 'var(--surface-text-sub)' }"
                                @mouseenter="e => { if (activeSection !== item.href) e.currentTarget.style.color = 'var(--accent-text)' }"
                                @mouseleave="e => { if (activeSection !== item.href) e.currentTarget.style.color = 'var(--surface-text-sub)' }"
                                @click.prevent="scrollToSection(item.href)">
                                {{ item.name }}
                                <span class="absolute -bottom-1 left-0 h-0.5 transition-all duration-300"
                                    :class="activeSection === item.href ? 'w-full' : 'w-0 group-hover:w-full'"
                                    :style="{ backgroundColor: 'var(--accent-text)' }"></span>
                            </a>
                        </li>
                    </ul>
                    <div class="mt-10 lg:mt-0 lg:ml-8">
                        <button
                            class="px-5 py-2.5 sm:px-7 sm:py-3 text-white rounded-full transition-all duration-300 text-sm font-semibold cursor-pointer"
                            :style="{ background: 'var(--cta-gradient)' }"
                            @mouseenter="e => e.currentTarget.style.boxShadow = '0 8px 24px var(--accent-shadow)'"
                            @mouseleave="e => e.currentTarget.style.boxShadow = 'none'">
                            Let's Talk
                        </button>
                    </div>
                </nav>
            </header>

            <header :class="[
                'fixed top-0 left-0 w-full z-50 transition-all duration-500 transform hidden lg:flex',
                (isStickyVisible && isHoveringTop) ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
            ]" class="justify-between items-center p-6 backdrop-blur-md shadow-2xl"
                :style="{ backgroundColor: 'var(--navbar-bg)', borderBottom: '1px solid var(--surface-border)' }"
                @mouseleave="isHoveringTop = false">
                <div class="text-3xl font-bold bg-clip-text text-transparent"
                    :style="{ backgroundImage: 'var(--logo-gradient)' }">
                    Dev <span class="font-black">Portfolio</span>
                </div>
                <nav class="flex items-center">
                    <ul class="flex flex-row space-x-5">
                        <li v-for="item in Menu" :key="item.name" class="group relative">
                            <a :href="item.href"
                                class="relative block transition-colors duration-300 text-sm font-medium tracking-wide"
                                :style="{ color: activeSection === item.href ? 'var(--accent-text)' : 'var(--surface-text-sub)' }"
                                @mouseenter="e => { if (activeSection !== item.href) e.currentTarget.style.color = 'var(--accent-text)' }"
                                @mouseleave="e => { if (activeSection !== item.href) e.currentTarget.style.color = 'var(--surface-text-sub)' }"
                                @click.prevent="scrollToSection(item.href)">
                                {{ item.name }}
                                <span class="absolute -bottom-1 left-0 h-0.5 transition-all duration-300"
                                    :class="activeSection === item.href ? 'w-full' : 'w-0 group-hover:w-full'"
                                    :style="{ backgroundColor: 'var(--accent-text)' }"></span>
                            </a>
                        </li>
                    </ul>
                    <div class="ml-8">
                        <button
                            class="px-6 py-2.5 text-white rounded-full transition-all duration-300 text-sm font-semibold cursor-pointer"
                            :style="{ background: 'var(--cta-gradient)' }"
                            @mouseenter="e => e.currentTarget.style.boxShadow = '0 8px 24px var(--accent-shadow)'"
                            @mouseleave="e => e.currentTarget.style.boxShadow = 'none'">
                            Let's Talk
                        </button>
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
        <section class="relative pt-32 pb-24 px-6 overflow-hidden transition-colors duration-300"
            :style="{ backgroundColor: 'var(--surface-bg)' }">
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
                        <h1 class="text-6xl md:text-8xl font-black tracking-tighter leading-none"
                            :style="{ color: 'var(--surface-text)' }">
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
                                <h2 class="text-4xl md:text-5xl font-bold tracking-tight"
                                    :style="{ color: 'var(--surface-text)' }">Visalsing</h2>
                                <p class="text-lg mt-2" :style="{ color: 'var(--accent-text-muted)', opacity: 0.7 }">
                                    Software Developer & MarTech Specialist
                                </p>
                            </div>

                            <div class="max-w-2xl mx-auto p-6">
                                <!-- Updated fallback backgrounds using variables for the border-gradient trick -->
                                <div class="relative pl-5"
                                    style="border-left: 2px solid transparent; background-origin: border-box; background-clip: padding-box, border-box;"
                                    :style="{ backgroundImage: `linear-gradient(var(--surface-bg-2), var(--surface-bg-2)), var(--logo-gradient)` }">
                                    <p class="leading-relaxed text-base" :style="{ color: 'var(--surface-text-sub)' }">
                                        As a Software Developer with a Bachelor's in Computer Science, I specialize in
                                        building robust web applications using the Laravel ecosystem and modern frontend
                                        technologies like Vue.js, Vite, and Tailwind CSS.
                                    </p>
                                    <transition name="fade">
                                        <div v-if="isExpanded" class="mt-3 leading-relaxed text-base space-y-4"
                                            :style="{ color: 'var(--surface-text-sub)' }">
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
                                    <button @click="isExpanded = !isExpanded"
                                        class="mt-2 font-medium transition-colors cursor-pointer"
                                        :style="{ color: 'var(--accent-text)' }"
                                        @mouseenter="e => e.currentTarget.style.color = 'var(--icon-accent-2)'"
                                        @mouseleave="e => e.currentTarget.style.color = 'var(--accent-text)'">
                                        {{ isExpanded ? 'See Less' : 'See More...' }}
                                    </button>
                                </div>
                            </div>

                            <!-- Grid Info Cards -->
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div v-for="info in personalInfo" :key="info.label"
                                    class="border rounded-2xl p-5 transition-all duration-300"
                                    :style="{ backgroundColor: 'var(--card-bg-fallback)', borderColor: 'var(--surface-border)' }"
                                    @mouseenter="e => { e.currentTarget.style.borderColor = 'var(--accent-border)'; e.currentTarget.style.backgroundColor = 'var(--accent-bg)' }"
                                    @mouseleave="e => { e.currentTarget.style.borderColor = 'var(--surface-border)'; e.currentTarget.style.backgroundColor = 'var(--card-bg-fallback)' }">
                                    <p class="text-xs font-bold uppercase tracking-widest mb-1.5"
                                        :style="{ color: 'var(--accent-text)' }">{{ info.label }}</p>
                                    <p class="font-medium" :style="{ color: 'var(--surface-text)' }">{{ info.value }}
                                    </p>
                                </div>
                            </div>

                            <div class="flex flex-wrap gap-3 pt-2">
                                <button
                                    class="px-6 py-3 text-white rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 cursor-pointer"
                                    :style="{ background: 'var(--cta-gradient)' }"
                                    @mouseenter="e => e.currentTarget.style.boxShadow = '0 8px 24px var(--accent-shadow)'"
                                    @mouseleave="e => e.currentTarget.style.boxShadow = 'none'">
                                    Download CV
                                </button>
                                <button
                                    class="px-6 py-3 border rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer"
                                    :style="{ borderColor: 'var(--accent-border)', color: 'var(--accent-text-muted)' }"
                                    @mouseenter="e => { e.currentTarget.style.borderColor = 'var(--accent-border-hover)'; e.currentTarget.style.backgroundColor = 'var(--accent-bg)' }"
                                    @mouseleave="e => { e.currentTarget.style.borderColor = 'var(--accent-border)'; e.currentTarget.style.backgroundColor = 'transparent' }">
                                    Let's Talk
                                </button>
                            </div>
                        </div>

                        <!-- Right Side Profile Image Layout -->
                        <div class="lg:col-span-5 relative flex justify-center" data-aos="fade-left">
                            <div class="absolute inset-0 blur-3xl rounded-full scale-75"
                                :style="{ background: 'linear-gradient(to bottom right, var(--accent-bg-hover), var(--accent-bg))' }">
                            </div>
                            <div class="relative w-full max-w-sm">
                                <div class="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 rounded-tl-2xl"
                                    :style="{ borderColor: 'var(--accent-border-hover)' }"></div>
                                <div class="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 rounded-br-2xl"
                                    :style="{ borderColor: 'var(--accent-border-2)' }"></div>

                                <div class="aspect-[4/5] rounded-3xl overflow-hidden border group shadow-2xl"
                                    :style="{ boxShadow: '0 25px 50px var(--section-grad-to)', borderColor: 'var(--surface-border)' }">
                                    <img src="../../../public/hero-2.png" alt="Visalsing"
                                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>

                                <!-- Availability Tag -->
                                <div class="absolute -bottom-5 -left-5 rounded-2xl px-4 py-3 shadow-xl border"
                                    :style="{ backgroundColor: 'var(--navbar-bg)', borderColor: 'var(--surface-border)' }">
                                    <p class="text-xs font-mono" :style="{ color: 'var(--accent-text)' }">Available for
                                        work</p>
                                    <div class="flex items-center gap-2 mt-1">
                                        <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                        <span class="text-sm font-semibold"
                                            :style="{ color: 'var(--surface-text)' }">Open to opportunities</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ── EXPERIENCE & EDUCATION ── -->
        <section class="py-24 px-6" id="journey">
            <div class="max-w-6xl mx-auto">
                <div class="flex items-center gap-3 mb-4" data-aos="fade-right">
                    <div class="w-8 h-px" :style="{ backgroundColor: 'var(--accent-mid)' }"></div>
                    <span class="font-mono text-sm tracking-widest uppercase"
                        :style="{ color: 'var(--accent-text)' }">Experience</span>
                </div>
                <h2 class="text-4xl font-black tracking-tight mb-16" data-aos="fade-right" data-aos-delay="100">
                    <span :style="{ color: 'var(--surface-text)' }">My</span> <span
                        class="text-transparent bg-clip-text"
                        :style="{ backgroundImage: 'var(--logo-gradient)' }">Journey</span>
                </h2>
                <div class="grid md:grid-cols-2 gap-8">

                    <!-- Work Experience -->
                    <div class="rounded-3xl p-8 transition-all duration-300 border border-white/[0.06]"
                        :style="{ background: 'linear-gradient(to bottom right, rgba(255,255,255,0.03), var(--section-grad-to))' }"
                        @mouseenter="e => e.currentTarget.style.borderColor = 'var(--accent-border)'"
                        @mouseleave="e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'"
                        data-aos="fade-up">
                        <h3 class="text-xl font-bold mb-8 flex items-center gap-3">
                            <span class="w-9 h-9 rounded-xl flex items-center justify-center"
                                :style="{ backgroundColor: 'var(--icon-bg)', border: '1px solid var(--accent-border)' }">
                                <BriefcaseIcon class="w-5 h-5" :style="{ color: 'var(--icon-accent)' }" />
                            </span>
                            <span :style="{ color: 'var(--surface-text)' }">Work Experience</span>
                        </h3>
                        <div class="relative pl-6 space-y-8 border-l" :style="{ borderColor: 'var(--section-border)' }">
                            <div v-for="(job) in workExperience" :key="job.id" class="relative group">
                                <div class="absolute -left-[calc(1.5rem+6.2px)] top-1.5 w-3 h-3 rounded-full transition-all duration-300"
                                    :style="{ backgroundColor: 'var(--accent-mid)', boxShadow: '0 0 0 4px var(--accent-bg)' }"
                                    @mouseenter="e => e.currentTarget.style.boxShadow = '0 0 0 6px var(--accent-bg-hover)'"
                                    @mouseleave="e => e.currentTarget.style.boxShadow = '0 0 0 4px var(--accent-bg)'">
                                </div>
                                <p class="text-xs font-bold uppercase tracking-widest mb-1"
                                    :style="{ color: 'var(--accent-text)' }">{{ job.period }}</p>
                                <h4 class="text-base font-bold text-[var(--surface-text-sub)]">{{ job.position }}</h4>
                                <p class="text-xs font-medium mt-0.5 mb-2"
                                    :style="{ color: 'var(--accent-text-muted)', opacity: 0.6 }">{{ job.company }}</p>
                                <p class="text-gray-500 text-sm leading-relaxed">{{ job.desc }}</p>
                                <!--  -->
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
                    </div>

                    <!-- Education -->
                    <div class="rounded-3xl p-8 transition-all duration-300 border border-white/[0.06]"
                        :style="{ background: 'linear-gradient(to bottom right, rgba(255,255,255,0.03), var(--accent-border-2-soft))' }"
                        @mouseenter="e => e.currentTarget.style.borderColor = 'var(--accent-border-2)'"
                        @mouseleave="e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'"
                        data-aos="fade-up" data-aos-delay="150">
                        <h3 class="text-xl font-bold mb-8 flex items-center gap-3">
                            <span class="w-9 h-9 rounded-xl flex items-center justify-center"
                                :style="{ backgroundColor: 'var(--icon-bg-2)', border: '1px solid var(--accent-border-2-soft)' }">
                                <AcademicCapIcon class="w-5 h-5" :style="{ color: 'var(--icon-accent-2)' }" />
                            </span>
                            <span :style="{ color: 'var(--surface-text)' }">Education</span>
                        </h3>
                        <div class="relative pl-6 space-y-8 border-l"
                            :style="{ borderColor: 'var(--accent-border-2-soft)' }">
                            <div v-for="(edu) in educationHistory.slice(0, EDUCATION_PREVIEW)" :key="edu.id"
                                class="relative group">
                                <div class="absolute -left-[calc(1.5rem+6.2px)] top-1.5 w-3 h-3 rounded-full transition-all duration-300"
                                    :style="{ backgroundColor: 'var(--icon-accent-2)', boxShadow: '0 0 0 4px var(--accent-to-bg)' }"
                                    @mouseenter="e => e.currentTarget.style.boxShadow = '0 0 0 6px var(--accent-to-bg-hover)'"
                                    @mouseleave="e => e.currentTarget.style.boxShadow = '0 0 0 4px var(--accent-to-bg)'">
                                </div>
                                <p class="text-xs font-bold uppercase tracking-widest mb-1"
                                    :style="{ color: 'var(--icon-accent-2)' }">{{ edu.period }}</p>
                                <h4 class="text-base font-bold text-[var(--surface-text-sub)]">{{ edu.title }}</h4>
                                <p class="text-xs font-medium mt-0.5 mb-2"
                                    :style="{ color: 'var(--icon-accent-2)', opacity: 0.6 }">{{ edu.institution }}</p>
                                <!-- <p class="text-gray-500 text-sm leading-relaxed">{{ edu.desc }}</p> -->
                                <p class="text-[var(--surface-text-sub)] text-sm leading-relaxed">
                                    <span v-if="!expandedEduTextIds.has(edu.id)">
                                        {{ edu.desc.substring(0, 200) }}...
                                    </span>

                                    <span v-else>
                                        {{ edu.desc }}
                                    </span>

                                    <span @click="toggleEduText(edu.id)"
                                        class="ml-1 font-bold cursor-pointer hover:underline uppercase text-[10px] tracking-widest"
                                        :style="{ color: edu.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }">
                                        {{ expandedEduTextIds.has(edu.id) ? t('show_less') : t('see_more') }}
                                    </span>
                                </p>
                            </div>
                            <transition name="fade">
                                <div v-if="showMoreEducation" class="space-y-8">
                                    <div v-for="(edu) in educationHistory.slice(EDUCATION_PREVIEW)" :key="edu.id"
                                        class="relative group">
                                        <div class="absolute -left-[calc(1.5rem+6.2px)] top-1.5 w-3 h-3 rounded-full transition-all duration-300"
                                            :style="{ backgroundColor: 'var(--icon-accent-2)', boxShadow: '0 0 0 4px var(--accent-to-bg)' }"
                                            @mouseenter="e => e.currentTarget.style.boxShadow = '0 0 0 6px var(--accent-to-bg-hover)'"
                                            @mouseleave="e => e.currentTarget.style.boxShadow = '0 0 0 4px var(--accent-to-bg)'">
                                        </div>
                                        <p class="text-xs font-bold uppercase tracking-widest mb-1"
                                            :style="{ color: 'var(--icon-accent-2)' }">{{ edu.period }}</p>
                                        <h4 class="text-base font-bold text-[var(--surface-text-sub)]">{{ edu.title }}
                                        </h4>
                                        <p class="text-xs font-medium mt-0.5 mb-2"
                                            :style="{ color: 'var(--icon-accent-2)', opacity: 0.6 }">{{ edu.institution
                                            }}</p>
                                        <p class="text-gray-500 text-sm leading-relaxed">{{ edu.desc }}</p>
                                    </div>
                                </div>
                            </transition>
                        </div>
                        <div v-if="educationHistory.length > EDUCATION_PREVIEW" class="flex justify-center mt-8">
                            <button @click="showMoreEducation = !showMoreEducation"
                                class="px-5 py-2 text-white rounded-full text-sm font-bold transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
                                :style="{ background: 'var(--cta-gradient)', boxShadow: '0 4px 15px var(--accent-shadow)' }"
                                @mouseenter="e => e.currentTarget.style.filter = 'brightness(1.15)'"
                                @mouseleave="e => e.currentTarget.style.filter = 'brightness(1)'">
                                {{ showMoreEducation ? 'Show Less' : 'See More' }}
                                <component :is="showMoreEducation ? ChevronUpIcon : ChevronDownIcon" class="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <!-- Additional Skills -->
                    <div class="rounded-3xl p-8 transition-all duration-300 border border-white/[0.06]"
                        :style="{ background: 'linear-gradient(to bottom right, rgba(255,255,255,0.03), var(--section-grad-to))' }"
                        @mouseenter="e => e.currentTarget.style.borderColor = 'var(--accent-border)'"
                        @mouseleave="e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'"
                        data-aos="fade-up">
                        <h3 class="text-xl font-bold mb-8 flex items-center gap-3">
                            <span class="w-9 h-9 rounded-xl flex items-center justify-center"
                                :style="{ backgroundColor: 'var(--icon-bg)', border: '1px solid var(--accent-border)' }">
                                <BriefcaseIcon class="w-5 h-5" :style="{ color: 'var(--icon-accent)' }" />
                            </span>
                            <span :style="{ color: 'var(--surface-text)' }">Additional Skills</span>
                        </h3>
                        <div class="relative pl-6 space-y-8 border-l" :style="{ borderColor: 'var(--section-border)' }">
                            <div v-for="(addSkill) in additionalSkill" :key="addSkill.id" class="relative group">
                                <div class="absolute -left-[calc(1.5rem+6.2px)] top-1.5 w-3 h-3 rounded-full transition-all duration-300"
                                    :style="{ backgroundColor: 'var(--accent-mid)', boxShadow: '0 0 0 4px var(--accent-bg)' }"
                                    @mouseenter="e => e.currentTarget.style.boxShadow = '0 0 0 6px var(--accent-bg-hover)'"
                                    @mouseleave="e => e.currentTarget.style.boxShadow = '0 0 0 4px var(--accent-bg)'">
                                </div>
                                <p class="text-xs font-bold uppercase tracking-widest mb-1"
                                    :style="{ color: 'var(--accent-text)' }">{{ addSkill.period }}</p>
                                <h4 class="text-base font-bold text-[var(--surface-text-sub)]">{{ addSkill.title }}</h4>
                                <p class="text-xs font-medium mt-0.5 mb-2"
                                    :style="{ color: 'var(--accent-text-muted)', opacity: 0.6 }">{{ addSkill.company }}
                                </p>
                                <p class="text-gray-500 text-sm leading-relaxed">{{ addSkill.desc }}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- ── SKILLS & TECH STACK ── -->
        <section class="py-24 px-6" id="skills">
            <div class="max-w-6xl mx-auto">
                <div class="flex items-center gap-3 mb-4" data-aos="fade-right">
                    <div class="w-8 h-px" :style="{ backgroundColor: 'var(--accent-mid)' }"></div>
                    <span class="font-mono text-sm tracking-widest uppercase"
                        :style="{ color: 'var(--accent-text)' }">Skills</span>
                </div>
                <h2 class="text-4xl font-black tracking-tight mb-16" data-aos="fade-right" data-aos-delay="100">
                    <span :style="{ color: 'var(--surface-text)' }">Skills &</span> <span
                        class="text-transparent bg-clip-text" :style="{ backgroundImage: 'var(--logo-gradient)' }">
                        Tech Stack
                    </span>
                </h2>
                <div class="grid md:grid-cols-2 gap-8">

                    <!-- Technical Skills -->
                    <div class="rounded-3xl p-8 transition-all duration-300 border border-white/[0.06]" :style="{
                        // background: 'linear-gradient(to bottom right, rgba(255,255,255,0.03), var(--section-grad-to))'
                        background: 'linear-gradient(to bottom right, var(--card-bg-from), var(--section-grad-to))',
                    }" @mouseenter="e => e.currentTarget.style.borderColor = 'var(--accent-border)'"
                        @mouseleave="e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'"
                        data-aos="fade-up">
                        <h3 class="text-xl font-bold mb-8 flex items-center gap-3">
                            <span class="w-9 h-9 rounded-xl flex items-center justify-center"
                                :style="{ backgroundColor: 'var(--icon-bg)', border: '1px solid var(--accent-border)' }">
                                <BriefcaseIcon class="w-5 h-5" :style="{ color: 'var(--icon-accent)' }" />
                            </span>
                            <span :style="{ color: 'var(--surface-text)' }">Technical Skills</span>
                        </h3>
                        <div class="space-y-8">
                            <div v-for="skill in technicalSkills" :key="skill.id" class="group">
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
                                <div class="h-2 bg-[var(--bg-surface-percent-bar)] rounded-full overflow-hidden">
                                    <div class="h-full rounded-full transition-all duration-1000 group-hover:brightness-125"
                                        :style="{ width: skill.percentage + '%', background: 'var(--cta-gradient)' }">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tech Stack -->
                    <div class="rounded-3xl p-8 transition-all duration-300 border border-white/[0.06]"
                        :style="{ background: 'linear-gradient(to bottom right, rgba(255,255,255,0.03), var(--accent-border-2-soft))' }"
                        @mouseenter="e => e.currentTarget.style.borderColor = 'var(--accent-border-2)'"
                        @mouseleave="e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'"
                        data-aos="fade-up" data-aos-delay="150">
                        <h3 class="text-xl font-bold mb-8 flex items-center flex-wrap gap-3 text-white">
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

                        <div class="space-y-6">
                            <div v-for="group in techStack.slice(0, TECH_PREVIEW)" :key="group.id">
                                <h4
                                    class="text-base font-bold text-[var(--surface-text-sub)] mb-3 flex items-center gap-2">
                                    <component :is="group.icon" class="w-5 h-5"
                                        :style="{ color: group.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }" />
                                    {{ group.title }}
                                </h4>
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="item in group.stack" :key="item"
                                        class="px-3 py-1.5 rounded-full text-sm font-medium hover:scale-105 transition-all"
                                        :style="{ backgroundColor: 'var(--accent-bg)', border: '1px solid var(--accent-border)', color: 'var(--accent-text-muted)' }">
                                        {{ item }}
                                    </span>
                                </div>
                            </div>
                            <transition name="fade">
                                <div v-if="showMoreTech" class="space-y-6">
                                    <div v-for="group in techStack.slice(TECH_PREVIEW)" :key="group.id">
                                        <h4
                                            class="text-base font-bold text-[var(--surface-text-sub)] mb-3 flex items-center gap-2">
                                            <component :is="group.icon" class="w-5 h-5"
                                                :style="{ color: group.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }" />
                                            <span :style="{ color: 'var(--surface-text-sub)' }">{{ group.title }}</span>
                                        </h4>
                                        <div class="flex flex-wrap gap-2">
                                            <span v-for="item in group.stack" :key="item"
                                                class="px-3 py-1.5 rounded-full text-sm font-medium hover:scale-105 transition-all"
                                                :style="{ backgroundColor: 'var(--accent-bg)', border: '1px solid var(--accent-border)', color: 'var(--accent-text-muted)' }">
                                                {{ item }}
                                            </span>
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
                    <div class="rounded-3xl p-8 transition-all duration-300 border border-white/[0.06]" :style="{
                        // background: 'linear-gradient(to bottom right, rgba(255,255,255,0.03), var(--section-grad-to))' 
                        background: 'linear-gradient(to bottom right, var(--card-bg-from), var(--section-grad-to))',
                    }" @mouseenter="e => e.currentTarget.style.borderColor = 'var(--accent-border)'"
                        @mouseleave="e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'"
                        data-aos="fade-up">
                        <h3 class="text-xl font-bold mb-8 flex items-center gap-3">
                            <span class="w-9 h-9 rounded-xl flex items-center justify-center"
                                :style="{ backgroundColor: 'var(--icon-bg)', border: '1px solid var(--accent-border)' }">
                                <LanguageIcon class="w-5 h-5" :style="{ color: 'var(--icon-accent)' }" />
                            </span>
                            <span :style="{ color: 'var(--surface-text)' }">Linguistic Skills</span>
                        </h3>
                        <div class="space-y-8">
                            <div v-for="language in languages" :key="language.id" class="group">
                                <div class="flex items-center justify-between mb-3">
                                    <span class="font-semibold flex items-center gap-2"
                                        :style="{ color: 'var(--accent-text-muted)' }">
                                        <img :src="language.flag" :alt="language.title"
                                            class="w-full h-3 object-cover" />
                                        {{ language.title }}
                                    </span>
                                    <span class="text-sm"
                                        :style="{ color: language.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }">
                                        {{ language.percentage }} %
                                    </span>
                                </div>
                                <div class="h-2 bg-[var(--bg-surface-percent-bar)] rounded-full overflow-hidden">
                                    <div class="h-full rounded-full transition-all duration-1000 group-hover:brightness-125"
                                        :style="{ width: language.percentage + '%', background: 'var(--cta-gradient)' }">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Soft Skills -->
                    <div class="rounded-3xl p-8 transition-all duration-300 border border-white/[0.06]"
                        :style="{ background: 'linear-gradient(to bottom right, rgba(255,255,255,0.03), var(--accent-border-2-soft))' }"
                        @mouseenter="e => e.currentTarget.style.borderColor = 'var(--accent-border-2)'"
                        @mouseleave="e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'"
                        data-aos="fade-up" data-aos-delay="150">
                        <h3 class="text-xl font-bold mb-8 flex items-center gap-3">
                            <span class="w-9 h-9 rounded-xl flex items-center justify-center"
                                :style="{ backgroundColor: 'var(--icon-bg-2)', border: '1px solid var(--accent-border-2-soft)' }">
                                <LightBulbIcon class="w-5 h-5" :style="{ color: 'var(--icon-accent-2)' }" />
                            </span>
                            <span :style="{ color: 'var(--surface-text)' }">Soft Skills</span>
                        </h3>
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-6">
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
                    <div class="rounded-3xl p-8 transition-all duration-300 border border-white/[0.06]"
                        :style="{ background: 'linear-gradient(to bottom right, rgba(255,255,255,0.03), var(--section-grad-to))' }"
                        @mouseenter="e => e.currentTarget.style.borderColor = 'var(--accent-border)'"
                        @mouseleave="e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'"
                        data-aos="fade-up">
                        <h3 class="text-xl font-bold mb-8 flex items-center gap-3">
                            <span class="w-9 h-9 rounded-xl flex items-center justify-center"
                                :style="{ backgroundColor: 'var(--icon-bg)', border: '1px solid var(--accent-border)' }">
                                <SparklesIcon class="w-5 h-5" :style="{ color: 'var(--icon-accent)' }" />
                            </span>
                            <span :style="{ color: 'var(--surface-text)' }">Hobbies & Interests</span>
                        </h3>
                        <div class="flex flex-col gap-3">
                            <span v-for="hobbyInterest in hobbiesInterests" :key="hobbyInterest.id"
                                class="w-full px-5 py-4 border-l-4 font-bold hover:translate-x-1 transition-all duration-300 text-lg mt-2 text-[var(--surface-text-sub)] hover:text-[var(--surface-text)]"
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
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { t } from './../../stores/languages.js';
import { useRouter } from 'vue-router';
import Footer from '../Footer.vue';
import {
    ChevronDownIcon, ChevronUpIcon, CircleStackIcon, ClipboardDocumentIcon,
    CloudArrowUpIcon, CloudIcon, CodeBracketIcon, CpuChipIcon,
    CursorArrowRippleIcon,
    DevicePhoneMobileIcon, LanguageIcon, LightBulbIcon, LockClosedIcon,
    MegaphoneIcon, PaintBrushIcon, ServerIcon, SparklesIcon,
    Squares2X2Icon, SwatchIcon, WrenchScrewdriverIcon,
} from '@heroicons/vue/16/solid';
import BackToTop from '../BackToTop.vue';

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
        A focused short course where I moved from basic web tools to full-stack logic. 
        I mastered PHP and MySQL for database management, built complete CRUD applications, and 
        learned to structure clean, professional code using the Laravel MVC framework.
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
    { id: 1, period: '2024 - 2026', title: 'Digital Sales Assistant', company: 'A Small Business', desc: 'Focused on web ecosystems, software architecture, and distributed systems.' },
    { id: 2, period: '2022 - 2026', title: 'Small Content Creator', company: 'Independent Content Creator', desc: 'Graduated with distinction.' },
];

const TECH_PREVIEW = 3;
const showMoreTech = ref(false);

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
const productivities = ['Microsoft Office', 'Google Workspace', 'Basic Computer Fundamentals', 'LLMs/AI Assistances'];

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
];

const languages = [
    { id: 1, title: 'Khmer', flag: 'a../../../src/assets/images/flags/cambodia-flag.png', useAccent2: false, percentage: 92 },
    { id: 2, title: 'English', flag: '../../../src/assets/images/flags/uk-flag.png', useAccent2: true, percentage: 87 },
    { id: 3, title: 'Chinese', flag: '../../../src/assets/images/flags/taiwan-flag.png', useAccent2: false, percentage: 22 },
    { id: 4, title: 'French', flag: '../../../src/assets/images/flags/france-flag.png', useAccent2: true, percentage: 10 },
    { id: 5, title: 'Lao', flag: '../../../src/assets/images/flags/laos-flag.png', useAccent2: false, percentage: 59 },
    { id: 6, title: 'Thai', flag: '../../../src/assets/images/flags/thailand-flag.png', useAccent2: true, percentage: 65 },
    { id: 7, title: 'Burmese', flag: '../../../src/assets/images/flags/myanmar-flag.png', useAccent2: false, percentage: 10 },
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

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => { window.removeEventListener('scroll', handleScroll); document.body.style.overflow = ''; });
</script>

<style scoped>
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