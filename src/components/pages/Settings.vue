<template>
    <div class="min-h-screen text-white" :style="{ backgroundColor: 'var(--surface-bg-3)' }">
        <section class="relative py-20 overflow-hidden" id="settings">

            <!-- Background glow -->
            <div class="pointer-events-none absolute inset-0 opacity-10"
                :style="{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, var(--accent-mid), transparent)' }">
            </div>

            <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

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
                        <li>
                            <div class="flex items-center">
                                <svg class="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <!-- <span class="ml-1 text-sm font-semibold md:ml-2 text-transparent bg-clip-text"
                                    :style="{ backgroundImage: 'var(--logo-gradient)' }">
                                    {{ t('settings') }}
                                </span> -->
                                <span
                                    class="ml-1 md:ml-2 inline-block py-1 text-sm font-semibold leading-loose text-transparent bg-clip-text"
                                    :style="{ backgroundImage: 'var(--logo-gradient)' }">
                                    {{ t('settings') }}
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <!-- ── Heading ── -->
                <div class="text-center mb-16">
                    <!-- <h2 class="text-4xl md:text-5xl font-bold mb-4" :style="{ color: 'var(--surface-text)' }">
                        <span class="bg-clip-text text-transparent"
                            :style="{ backgroundImage: 'var(--logo-gradient)' }">
                            {{ t('settings') }}
                        </span>
                    </h2> -->
                    <h2 class="text-4xl md:text-5xl font-bold mb-4 leading-loose"
                        :style="{ color: 'var(--surface-text)' }">
                        <span class="inline-block py-2 bg-clip-text text-transparent"
                            :style="{ backgroundImage: 'var(--logo-gradient)' }">
                            {{ t('settings') }}
                        </span>
                    </h2>
                    <p class="text-lg" :style="{ color: 'var(--accent-text-muted)' }">
                        {{ t('customize') }}
                    </p>
                </div>

                <div class="space-y-8">

                    <!-- ── 1. Portfolio Themes ── -->
                    <div class="rounded-3xl p-8 accent-card">
                        <div class="flex items-center gap-4 mb-6">
                            <div class="p-3 rounded-2xl icon-box-1">
                                <SunIcon class="w-6 h-6" />
                            </div>
                            <h3 class="text-2xl font-semibold" :style="{ color: 'var(--surface-text)' }">
                                {{ t('portfolio_themes') }}
                            </h3>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <button v-for="theme in themes" :key="theme.name"
                                class="flex items-center justify-center gap-3 p-4 rounded-xl border transition-all duration-300 group"
                                :style="currentTheme === theme.name
                                    ? { borderColor: 'var(--accent-text)', backgroundColor: 'var(--accent-bg)' }
                                    : { borderColor: 'rgba(75,85,99,1)' }" @click="setThemeMode(theme.name)">
                                <div class="relative flex items-center justify-center gap-3 w-full">
                                    <component :is="theme.icon" class="w-5 h-5 transition-colors"
                                        :style="{ color: currentTheme === theme.name ? 'var(--accent-text)' : 'var(--surface-text-sub)' }" />
                                    <span class="transition-colors"
                                        :style="{ color: currentTheme === theme.name ? 'var(--surface-text)' : 'var(--surface-text-sub)' }">
                                        {{ theme.label }}
                                    </span>
                                    <!-- Active checkmark -->
                                    <div v-if="currentTheme === theme.name"
                                        class="absolute -top-5 -right-5 w-4 h-4 rounded-full flex items-center justify-center text-white"
                                        :style="{ backgroundColor: 'var(--accent-text)' }">
                                        <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="3"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    <!-- ── Profile Frame Style ── -->
                    <div class="rounded-3xl p-8 accent-card">
                        <div class="flex items-center gap-4 mb-6">
                            <div class="p-3 rounded-2xl" style="background: rgba(168, 85, 247, 0.1);">
                                <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" stroke-width="2"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
                                </svg>
                            </div>
                            <h3 class="text-2xl font-semibold" :style="{ color: 'var(--surface-text)' }">
                                Profile Frame Style
                            </h3>
                        </div>

                        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            <button v-for="frame in profileFrames" :key="frame.name"
                                class="relative p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-3"
                                :style="currentProfileFrame === frame.name
                                    ? { borderColor: 'var(--accent-text)', backgroundColor: 'var(--accent-bg)' }
                                    : { borderColor: 'rgba(75,85,99,1)' }" @click="setProfileFrame(frame.name)">
                                <!-- Shape preview -->
                                <div class="w-12 h-12 flex items-center justify-center">
                                    <div class="w-10 h-10 transition-all duration-300" :style="{
                                        background: currentProfileFrame === frame.name
                                            ? 'var(--cta-gradient)'
                                            : 'rgba(148,163,184,0.25)',
                                        clipPath: frame.previewClip ?? undefined,
                                        borderRadius: frame.previewClip ? '0' : frame.borderRadius,
                                    }" />
                                </div>

                                <span class="text-sm font-medium transition-colors"
                                    :style="{ color: currentProfileFrame === frame.name ? 'var(--accent-text)' : 'var(--surface-text-sub)' }">
                                    {{ frame.label }}
                                </span>

                                <!-- Active checkmark -->
                                <div v-if="currentProfileFrame === frame.name"
                                    class="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center text-white"
                                    :style="{ backgroundColor: 'var(--accent-text)' }">
                                    <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="3"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>

                    <!-- ── 2. Accent Colors ── -->
                    <div class="rounded-3xl p-8 accent-card">
                        <div class="flex items-center gap-4 mb-6">
                            <div class="p-3 rounded-2xl icon-box-2">
                                <SwatchIcon class="w-6 h-6" />
                            </div>
                            <h3 class="text-2xl font-semibold" :style="{ color: 'var(--surface-text)' }">
                                {{ t('accent_colors') }}
                            </h3>
                        </div>

                        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            <button v-for="color in colorSchemes" :key="color.name"
                                class="group relative p-4 rounded-xl border transition-all duration-300" :style="currentScheme === color.name
                                    ? { borderColor: color.from, backgroundColor: `${color.from}18` }
                                    : { borderColor: 'rgba(75,85,99,1)' }" @click="setColorScheme(color.name)">
                                <div class="relative flex flex-col items-center gap-2">
                                    <div class="flex -space-x-2">
                                        <div class="w-7 h-7 rounded-full border-2 shadow-md transition-transform group-hover:scale-110"
                                            :style="{ backgroundColor: color.from, borderColor: 'var(--surface-bg-3)' }">
                                        </div>
                                        <div class="w-7 h-7 rounded-full border-2 shadow-md transition-transform group-hover:scale-110"
                                            :style="{ backgroundColor: color.to, borderColor: 'var(--surface-bg-3)' }">
                                        </div>
                                    </div>
                                    <span class="text-sm font-medium transition-colors"
                                        :style="currentScheme === color.name ? { color: color.from } : { color: 'var(--surface-text-sub)' }">
                                        {{ color.name }}
                                    </span>
                                    <div v-if="currentScheme === color.name"
                                        class="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white"
                                        :style="{ backgroundColor: color.from }">
                                        <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="3"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    <!-- ── 3. Loading Screen ── -->
                    <div class="rounded-3xl p-8 accent-card">
                        <div class="flex items-center gap-4 mb-6">
                            <div class="p-3 rounded-2xl icon-box-3">
                                <ArrowPathIcon class="w-6 h-6" />
                            </div>
                            <h3 class="text-2xl font-semibold" :style="{ color: 'var(--surface-text)' }">
                                Loading Screen
                            </h3>
                        </div>

                        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            <button v-for="ls in loadingScreens" :key="ls.name"
                                class="relative p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-3"
                                :style="currentLoadingScreen === ls.name
                                    ? { borderColor: 'var(--accent-text)', backgroundColor: 'var(--accent-bg)' }
                                    : { borderColor: 'rgba(75,85,99,1)' }" @click="setLoadingScreen(ls.name)">

                                <!-- Mini preview -->
                                <div class="h-10 flex items-center justify-center">

                                    <!-- bounce-dots preview -->
                                    <div v-if="ls.name === 'bounce-dots'" class="flex space-x-1">
                                        <div v-for="(d, i) in ['0s', '0.1s', '0.2s']" :key="i"
                                            class="w-2 h-2 rounded-full animate-bounce"
                                            :style="{ backgroundColor: i % 2 === 0 ? 'var(--accent-from)' : 'var(--accent-to)', animationDelay: d }" />
                                    </div>

                                    <!-- pulse-ring preview -->
                                    <div v-else-if="ls.name === 'pulse-ring'"
                                        class="w-8 h-8 rounded-full border-2 animate-ping"
                                        :style="{ borderColor: 'var(--accent-from)' }" />

                                    <!-- gradient-spinner preview -->
                                    <div v-else-if="ls.name === 'gradient-spinner'"
                                        class="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                                        :style="{ borderColor: 'var(--accent-from)', borderTopColor: 'transparent' }" />

                                    <!-- orbit preview -->
                                    <div v-else-if="ls.name === 'orbit'" class="relative w-8 h-8">
                                        <div class="absolute inset-0 rounded-full border opacity-30"
                                            :style="{ borderColor: 'var(--accent-from)' }" />
                                        <div class="absolute inset-0 rounded-full border border-t-transparent animate-spin"
                                            :style="{ borderColor: 'var(--accent-to)' }" />
                                        <div class="absolute inset-2 rounded-full animate-pulse"
                                            :style="{ backgroundColor: 'var(--accent-from)' }" />
                                    </div>

                                    <!-- wave-bars preview -->
                                    <div v-else-if="ls.name === 'wave-bars'" class="flex items-end space-x-0.5 h-8">
                                        <div v-for="(d, i) in ['0s', '0.1s', '0.2s']" :key="i"
                                            class="w-1.5 rounded-full animate-bounce"
                                            :style="{ backgroundColor: i % 2 === 0 ? 'var(--accent-from)' : 'var(--accent-to)', animationDelay: d, height: `${[50, 100, 50][i]}%` }" />
                                    </div>

                                </div>

                                <span class="text-sm font-medium transition-colors"
                                    :style="{ color: currentLoadingScreen === ls.name ? 'var(--accent-text)' : 'var(--surface-text-sub)' }">
                                    {{ ls.label }}
                                </span>

                                <div v-if="currentLoadingScreen === ls.name"
                                    class="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center text-white"
                                    :style="{ backgroundColor: 'var(--accent-text)' }">
                                    <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="3"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>

                    <!-- ── 3.5. Hero Background Choice ── -->
                    <div class="rounded-3xl p-8 accent-card">
                        <div class="flex items-center gap-4 mb-6">
                            <div class="p-3 rounded-2xl icon-box-1" style="background: rgba(244, 63, 94, 0.1);">
                                <!-- Temporary inline SVG or any icon from your package -->
                                <svg class="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" stroke-width="2"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </div>
                            <h3 class="text-2xl font-semibold" :style="{ color: 'var(--surface-text)' }">
                                {{ t('hero_background') || 'Hero Background' }}
                            </h3>
                        </div>

                        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            <button v-for="bg in heroBackgrounds" :key="bg.name"
                                class="relative p-3 rounded-xl border transition-all duration-300 flex flex-col items-center gap-3 overflow-hidden group"
                                :style="currentHeroBg === bg.name
                                    ? { borderColor: 'var(--accent-text)', backgroundColor: 'var(--accent-bg)' }
                                    : { borderColor: 'rgba(75,85,99,1)' }" @click="setHeroBg(bg.name)">

                                <!-- Thumbnail Preview Box -->
                                <div
                                    class="w-full h-16 rounded-lg overflow-hidden border border-gray-700/50 flex items-center justify-center">
                                    <img v-if="bg.previewUrl" :src="bg.previewUrl" :alt="bg.label"
                                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div v-else class="w-full h-full" :class="bg.previewClass"></div>
                                </div>

                                <!-- Text Label -->
                                <span class="text-sm font-medium transition-colors line-clamp-1"
                                    :style="{ color: currentHeroBg === bg.name ? 'var(--accent-text)' : 'var(--surface-text-sub)' }">
                                    {{ bg.label }}
                                </span>

                                <!-- Active checkmark overlay -->
                                <div v-if="currentHeroBg === bg.name"
                                    class="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center text-white shadow-md z-10"
                                    :style="{ backgroundColor: 'var(--accent-text)' }">
                                    <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="3"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>

                    <!-- ── 4. Languages ── -->
                    <div class="rounded-3xl p-8 accent-card">
                        <div class="flex items-center gap-4 mb-6">
                            <div class="p-3 rounded-2xl icon-box-3">
                                <LanguageIcon class="w-6 h-6" />
                            </div>
                            <h3 class="text-2xl font-semibold" :style="{ color: 'var(--surface-text)' }">
                                {{ t('languages') }}
                            </h3>
                        </div>

                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <!--
                                FIX 1: Removed overflow-hidden — it was clipping tall diacritics
                                        from Khmer, Thai, Lao, Burmese scripts.
                                FIX 2: Added lang-button class for script-aware line-height.
                            -->
                            <button v-for="lang in languages" :key="lang.code"
                                class="lang-button relative p-4 rounded-xl border transition-all duration-300 text-center group"
                                :style="currentLang === lang.code
                                    ? { borderColor: 'var(--accent-text)', backgroundColor: 'var(--accent-bg)' }
                                    : { borderColor: 'rgba(75,85,99,1)' }" @click="setLanguage(lang.code)">

                                <!-- FIX 3: pt-1 gives vertical breathing room for top diacritics -->
                                <div class="mb-2 pt-1">
                                    <img :src="lang.flag" :alt="lang.name"
                                        class="w-8 h-auto rounded-sm inline-block object-cover shadow-sm" />
                                </div>

                                <!--
                                    FIX 4: script-text class sets line-height: 2 and uses the
                                           multilingual font stack loaded in <style>.
                                -->
                                <div class="script-text font-medium text-sm transition-colors"
                                    :style="{ color: currentLang === lang.code ? 'var(--accent-text)' : 'var(--surface-text)' }">
                                    {{ lang.native }}
                                </div>
                                <div class="text-[10px] uppercase tracking-widest mt-1"
                                    :style="{ color: 'var(--surface-text-dim)' }">
                                    {{ lang.name }}
                                </div>

                                <div v-if="currentLang === lang.code"
                                    class="absolute top-3 right-3 w-4 h-4 rounded-full flex items-center justify-center text-white shadow-sm"
                                    :style="{ backgroundColor: 'var(--accent-text)' }">
                                    <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="3"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>

                    <!-- ── 5. System Actions ── -->
                    <div class="rounded-3xl p-8 accent-card">
                        <div class="flex items-center gap-4 mb-6">
                            <div class="p-3 rounded-2xl icon-box-1" style="background: rgba(148, 163, 184, 0.1);">
                                <CommandLineIcon class="w-6 h-6" />
                            </div>
                            <h3 class="text-2xl font-semibold" :style="{ color: 'var(--surface-text)' }">
                                {{ t('system_actions') || 'System Actions' }}
                            </h3>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button @click="toggleFullscreen"
                                class="flex items-center justify-between p-4 rounded-xl border transition-all duration-300 group"
                                :style="{ borderColor: 'rgba(75,85,99,1)', backgroundColor: 'transparent' }"
                                @mouseenter="e => e.currentTarget.style.borderColor = 'var(--accent-text)'"
                                @mouseleave="e => e.currentTarget.style.borderColor = 'rgba(75,85,99,1)'">
                                <div class="flex items-center gap-3">
                                    <component :is="isFullscreen ? ArrowsPointingInIcon : ArrowsPointingOutIcon"
                                        class="w-5 h-5 transition-colors" :style="{ color: 'var(--accent-text)' }" />
                                    <span :style="{ color: 'var(--surface-text)' }">
                                        {{ isFullscreen ? (t('small_screen') || 'Exit Full Screen') : (t('full_screen')
                                            || 'Full Screen Mode') }}
                                    </span>
                                </div>
                                <span class="text-[10px] uppercase opacity-50 font-mono">F11 / Click</span>
                            </button>

                            <button @click="refreshPage"
                                class="flex items-center justify-between p-4 rounded-xl border transition-all duration-300 group"
                                :style="{ borderColor: 'rgba(75,85,99,1)', backgroundColor: 'transparent' }"
                                @mouseenter="e => e.currentTarget.style.borderColor = 'var(--accent-text)'"
                                @mouseleave="e => e.currentTarget.style.borderColor = 'rgba(75,85,99,1)'">
                                <div class="flex items-center gap-3">
                                    <ArrowPathIcon class="w-5 h-5 transition-colors text-emerald-400" />
                                    <span :style="{ color: 'var(--surface-text)' }">
                                        {{ t('refresh_web') || 'Refresh Website' }}
                                    </span>
                                </div>
                                <span class="text-[10px] uppercase opacity-50 font-mono">CTRL + R</span>
                            </button>
                        </div>
                    </div>

                    <!-- 6. Responsive Views -->
                    <div class="rounded-3xl p-8 accent-card">
                        <div class="flex items-center gap-4 mb-2">
                            <div class="p-3 rounded-2xl icon-box-2" style="background: rgba(96, 165, 250, 0.1);">
                                <ComputerDesktopIcon class="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h3 class="text-2xl font-semibold" :style="{ color: 'var(--surface-text)' }">
                                    {{ t('responsive_view') || 'Responsive Preview' }}
                                </h3>
                                <p class="text-xs opacity-50" :style="{ color: 'var(--surface-text-sub)' }">
                                    Simulate different screen sizes
                                </p>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-6">
                            <button v-for="view in viewports" :key="view.name"
                                class="relative p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-2 group"
                                :style="currentViewport === view.name
                                    ? { borderColor: 'var(--accent-text)', backgroundColor: 'var(--accent-bg)' }
                                    : { borderColor: 'rgba(75,85,99,1)', backgroundColor: 'transparent' }"
                                @click="setViewport(view.name)">

                                <component :is="view.icon"
                                    class="w-6 h-6 mb-1 transition-transform group-hover:scale-110"
                                    :style="{ color: currentViewport === view.name ? 'var(--accent-text)' : 'var(--surface-text-sub)' }" />

                                <div class="text-center">
                                    <span class="block text-sm font-medium" :style="{ color: 'var(--surface-text)' }">
                                        {{ view.label }}
                                    </span>
                                    <span class="text-[9px] uppercase tracking-tighter opacity-40 font-mono">
                                        {{ view.description }}
                                    </span>
                                </div>

                                <div v-if="currentViewport === view.name"
                                    class="absolute top-2 right-2 w-1.5 h-1.5 rounded-full animate-pulse"
                                    :style="{ backgroundColor: 'var(--accent-text)' }">
                                </div>
                            </button>
                        </div>
                    </div>

                </div>

                <!-- ── Footer actions ── -->
                <div class="text-center mt-16">
                    <div class="inline-flex flex-col sm:flex-row gap-4 items-center">
                        <router-link to="/"
                            class="px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 flex items-center gap-2"
                            :style="{ background: 'var(--cta-gradient)' }"
                            @mouseenter="e => e.currentTarget.style.boxShadow = '0 10px 28px var(--accent-shadow-lg)'"
                            @mouseleave="e => e.currentTarget.style.boxShadow = 'none'">
                            <ArrowLeftCircleIcon class="w-5 h-5" />
                            {{ t('save_return') }}
                        </router-link>

                        <button
                            class="px-8 py-4 rounded-xl border-2 font-semibold transition-all duration-300 flex items-center gap-2"
                            style="border-color: rgba(248,113,113,0.50); color: #f87171;" @click="resetSettings"
                            @mouseenter="e => e.currentTarget.style.backgroundColor = 'rgba(248,113,113,0.10)'"
                            @mouseleave="e => e.currentTarget.style.backgroundColor = 'transparent'">
                            <ArrowPathIcon class="w-5 h-5" />
                            {{ t('reset') }}
                        </button>
                    </div>
                </div>

            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { currentLang, t, setLanguage } from './../../stores/languages.js';
import { currentScheme, setColorScheme } from './../../stores/colorScheme.js';
import { currentTheme, setThemeMode } from './../../stores/themeMode.js';
import {
    ArrowLeftCircleIcon, ArrowPathIcon,
    SunIcon, MoonIcon, ComputerDesktopIcon,
    SwatchIcon, LanguageIcon, HomeIcon,
    ArrowsPointingOutIcon, // Full Screen
    ArrowsPointingInIcon,  // Exit Full Screen
    CommandLineIcon,       // Icon for the section header

    DevicePhoneMobileIcon,
    DeviceTabletIcon,
    TvIcon, // For Large PC/4K
} from '@heroicons/vue/24/outline';

import { currentLoadingScreen, setLoadingScreen } from './../../stores/loadingScreen.js';
import { currentViewport, setViewport } from './../../stores/viewport.js';

import { currentHeroBg, setHeroBg } from './../../stores/heroBg.js';
import { currentProfileFrame, setProfileFrame, FRAME_STYLES } from './../../stores/profileFrame.js';


// ======================================================================
// State for Fullscreen
const isFullscreen = ref(false);

// Function to handle Fullscreen toggle
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// Function to handle Refresh
function refreshPage() {
    window.location.reload();
}

// Monitor fullscreen changes (e.g., if user presses Esc key)
function updateFullscreenState() {
    isFullscreen.value = !!document.fullscreenElement;
}

onMounted(() => {
    document.addEventListener('fullscreenchange', updateFullscreenState);
});

onUnmounted(() => {
    document.removeEventListener('fullscreenchange', updateFullscreenState);
});
// ================================================================================

// const currentViewport = ref('Auto');

const viewports = [
    { name: 'Auto', label: 'Default', icon: ArrowsPointingOutIcon, description: 'Follow Browser' },
    { name: 'Mobile', label: 'Mobile', icon: DevicePhoneMobileIcon, description: '375px' },
    { name: 'Tablet', label: 'Tablet', icon: DeviceTabletIcon, description: '768px' },
    { name: 'Laptop', label: 'Laptop', icon: ComputerDesktopIcon, description: '1024px' },
    { name: 'Desktop', label: 'PC Large', icon: TvIcon, description: '1440px' },
];

// ================================================================================


const heroBackgrounds = [
    { name: 'none', label: 'Solid / None', previewClass: 'bg-slate-900' },
    { name: 'particles', label: 'Particles', previewClass: 'preview-particles' },
    // { name: 'particles_bubbles', label: 'Bubbles', previewClass: 'preview-bubbles' },
    { name: 'particles-bubbles', label: 'Bubbles', previewClass: 'preview-bubbles' },
    { name: 'rain', label: 'Raindrops', previewClass: 'preview-rain' },
];

// const heroBackgrounds = [
//     { name: 'none', label: 'Solid / None', icon: SwatchIcon },
//     { name: 'stars', label: 'Starry Night', icon: MoonIcon },
//     { name: 'rain', label: 'Digital Rain', icon: CloudIcon }
// ];


// ================================================================================

const profileFrames = [
    { name: 'circle', label: 'Circle', previewClip: 'circle(50% at 50% 50%)', borderRadius: '9999px' },
    { name: 'hexagon', label: 'Hexagon', previewClip: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)', borderRadius: '0' },
    { name: 'diamond', label: 'Diamond', previewClip: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', borderRadius: '0' },
    { name: 'squircle', label: 'Squircle', previewClip: null, borderRadius: '30%' },
    { name: 'shield', label: 'Shield', previewClip: 'polygon(50% 0%, 100% 18%, 100% 65%, 50% 100%, 0% 65%, 0% 18%)', borderRadius: '0' },
];
// ================================================================================

const loadingScreens = [
    { name: 'bounce-dots', label: 'Bounce Dots' },
    { name: 'pulse-ring', label: 'Pulse Ring' },
    { name: 'gradient-spinner', label: 'Spinner' },
    { name: 'orbit', label: 'Orbit' },
    { name: 'wave-bars', label: 'Wave Bars' },
];

const themes = [
    { name: 'Light', label: 'Light', icon: SunIcon },
    { name: 'Dark', label: 'Dark', icon: MoonIcon },
    { name: 'Device', label: 'Device', icon: ComputerDesktopIcon },
];

const colorSchemes = [
    { name: 'Blue-Cyan', from: '#60a5fa', to: '#22d3ee' },
    { name: 'Red-Scarlet', from: '#f87171', to: '#fb923c' },
    { name: 'Purple-Pink', from: '#a855f7', to: '#ec4899' },
    { name: 'Green-Dark', from: '#4ade80', to: '#059669' },
    { name: 'Orange-Yellow', from: '#fb923c', to: '#facc15' },
    // { name: 'Black-Charcoal', from: '#000000', to: '#36454F' },
    // { name: 'White-Smoke', from: '#ffffff', to: '#F5F5F5' },
];

const languages = [
    { name: 'Khmer', native: 'ភាសាខ្មែរ', code: 'km', flag: 'https://flagcdn.com/w80/kh.png' },
    { name: 'English', native: 'English', code: 'en', flag: 'https://flagcdn.com/w80/gb.png' },
    { name: 'Chinese', native: '中文', code: 'zh', flag: 'https://flagcdn.com/w80/tw.png' },
    { name: 'French', native: 'Français', code: 'fr', flag: 'https://flagcdn.com/w80/fr.png' },
    { name: 'Lao', native: 'ພາສາລາວ', code: 'lo', flag: 'https://flagcdn.com/w80/la.png' },
    { name: 'Burmese', native: 'မြန်မာဘာသာ', code: 'my', flag: 'https://flagcdn.com/w80/mm.png' },
    { name: 'Thai', native: 'ภาษาไทย', code: 'th', flag: 'https://flagcdn.com/w80/th.png' },
    // { name: 'Japanese', native: '日本語 / にほんご', code: 'ja', flag: 'https://flagcdn.com/w80/jp.png' },
    // { name: 'Korean', native: '한국어', code: 'ko', flag: 'https://flagcdn.com/w80/kr.png' },
    // { name: 'Filipino', native: 'Pilipino', code: 'fil', flag: 'https://flagcdn.com/w80/ph.png' },
    // { name: 'German', native: 'Deutsch', code: 'de', flag: 'https://flagcdn.com/w80/de.png' },
    // { name: 'Spanish', native: 'Español', code: 'es', flag: 'https://flagcdn.com/w80/es.png' },
];

function resetSettings() {
    setColorScheme('Blue-Cyan');
    setLanguage('en');
    setThemeMode('Dark');
    setLoadingScreen('bounce-dots');
    setViewport('Auto');
    setHeroBg('none');
    setProfileFrame('circle');
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KM&family=Noto+Sans+Thai&family=Noto+Sans+Lao&family=Noto+Sans+Myanmar&family=Noto+Sans:wght@400;600;700&display=swap');

.script-text {
    font-family:
        'Noto Sans KM',
        'Noto Sans Thai',
        'Noto Sans Lao',
        'Noto Sans Myanmar',
        'Noto Sans',
        system-ui, sans-serif;
    line-height: 2;
    overflow: visible;
}

.lang-button {
    overflow: visible;
}

/* ── Breadcrumb hover ──────────────────────────────────────────────── */
.group:hover .breadcrumb-home-text {
    background: var(--logo-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 600;
}

.group:hover .breadcrumb-home-icon {
    background: var(--logo-gradient);
    -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>') no-repeat center;
    mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>') no-repeat center;
    -webkit-mask-size: contain;
    mask-size: contain;
    color: transparent;
}

/* ── Hero Background Previews ─────────────────────────────────────── */

/* --- Dot Network preview --- */
.preview-particles {
    background:
        radial-gradient(circle at 20% 30%, rgba(96, 165, 250, 0.35) 0%, transparent 50%),
        radial-gradient(circle at 75% 65%, rgba(168, 85, 247, 0.25) 0%, transparent 45%),
        radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.15) 0%, transparent 60%),
        #0b1120;
    position: relative;
    overflow: hidden;
}

/* Dot grid to hint at the particle network */
.preview-particles::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(148, 163, 184, 0.6) 1px, transparent 1px);
    background-size: 12px 12px;
    opacity: 0.5;
}

/* --- Bubbles preview --- */
.preview-bubbles {
    background:
        radial-gradient(circle at 25% 75%, rgba(96, 165, 250, 0.25) 0%, transparent 55%),
        radial-gradient(circle at 70% 30%, rgba(34, 211, 238, 0.15) 0%, transparent 45%),
        #0b1120;
    position: relative;
    overflow: hidden;
}

/* Three static circles that mimic rising bubbles */
.preview-bubbles::before {
    content: '';
    position: absolute;
    /* Small bubble — bottom left */
    width: 11px;
    height: 11px;
    border-radius: 50%;
    border: 1.5px solid rgba(150, 200, 255, 0.65);
    bottom: 18%;
    left: 22%;
    box-shadow: inset -2px -2px 4px rgba(255, 255, 255, 0.08);
}

.preview-bubbles::after {
    content: '';
    position: absolute;
    /* Larger bubble — centre */
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1.5px solid rgba(150, 200, 255, 0.40);
    top: 28%;
    left: 48%;
    box-shadow: inset -3px -3px 6px rgba(255, 255, 255, 0.06);
}

/*
  NOTE: CSS only allows ::before and ::after per element, so the third
  bubble is faked using a box-shadow on ::after — no extra DOM needed.
*/
.preview-bubbles::after {
    /* Re-use the same pseudo but add a third bubble via box-shadow */
    box-shadow:
        24px 30px 0 -8px rgba(150, 200, 255, 0.3),
        /* third bubble offset */
        inset -3px -3px 6px rgba(255, 255, 255, 0.06);
}

/* ====================================================== */
/* --- Rain preview --- */
/* .preview-rain {
    background: #0b1120;
    position: relative;
    overflow: hidden;
}

.preview-rain::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
        transparent 0%,
        rgba(96, 165, 250, 0.4) 50%,
        transparent 100%
    );
    background-size: 2px 20px;
    width: 100%;
    height: 100%;
    animation: rain-scroll 1s linear infinite;
}

@keyframes rain-scroll {
    from { background-position: 0 0; }
    to { background-position: 0 20px; }
} */

/* --- Rain preview (Monochrome) --- */
.preview-rain {
    background: #0f172a;
    /* Deep charcoal/navy */
    position: relative;
    overflow: hidden;
}

.preview-rain::after {
    content: '';
    position: absolute;
    inset: 0;
    /* Use white-to-transparent for the preview streaks */
    background: linear-gradient(transparent 0%,
            rgba(255, 255, 255, 0.2) 50%,
            transparent 100%);
    background-size: 1.5px 25px;
    width: 100%;
    height: 100%;
    animation: rain-scroll 0.8s linear infinite;
}

/* Light mode override for the preview button */
:global(html.theme-light) .preview-rain {
    background: #f1f5f9;
}

:global(html.theme-light) .preview-rain::after {
    background: linear-gradient(transparent 0%,
            rgba(0, 0, 0, 0.15) 50%,
            transparent 100%);
}

/* ── Light mode overrides for canvas previews ─────────────────────── */
:global(html.theme-light) .preview-particles,
:global(html.theme-light) .preview-bubbles {
    background:
        radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.18) 0%, transparent 50%),
        radial-gradient(circle at 70% 65%, rgba(139, 92, 246, 0.12) 0%, transparent 45%),
        #e8edf5;
}

:global(html.theme-light) .preview-particles::after {
    background-image: radial-gradient(circle, rgba(30, 40, 80, 0.35) 1px, transparent 1px);
}

:global(html.theme-light) .preview-bubbles::before,
:global(html.theme-light) .preview-bubbles::after {
    border-color: rgba(20, 60, 150, 0.45);
}

/* Device mode when system is light */
@media (prefers-color-scheme: light) {

    :global(html.theme-device) .preview-particles,
    :global(html.theme-device) .preview-bubbles {
        background:
            radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.18) 0%, transparent 50%),
            radial-gradient(circle at 70% 65%, rgba(139, 92, 246, 0.12) 0%, transparent 45%),
            #e8edf5;
    }

    :global(html.theme-device) .preview-particles::after {
        background-image: radial-gradient(circle, rgba(30, 40, 80, 0.35) 1px, transparent 1px);
    }

    :global(html.theme-device) .preview-bubbles::before,
    :global(html.theme-device) .preview-bubbles::after {
        border-color: rgba(20, 60, 150, 0.45);
    }
}
</style>

<!-- <style scoped>
/*
 * ── MULTILINGUAL FONT STACK ──────────────────────────────────────────────────
 * Load Google Noto fonts that cover Khmer, Thai, Lao, Myanmar.
 * Add this @import at the TOP of your global CSS (e.g. main.css / index.css)
 * instead of here if you want it available app-wide:
 *
 *   @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KM&family=Noto+Sans+Thai&family=Noto+Sans+Lao&family=Noto+Sans+Myanmar&family=Noto+Sans:wght@400;600;700&display=swap');
 *
 * The @import below works scoped but may reload per-component.
 */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KM&family=Noto+Sans+Thai&family=Noto+Sans+Lao&family=Noto+Sans+Myanmar&family=Noto+Sans:wght@400;600;700&display=swap');

/*
 * script-text
 * ─────────────────────────────────────────────────────────────────────────────
 * KEY FIXES:
 *   line-height: 2       → gives stacked vowels / tone marks vertical room
 *   font-family stack    → Noto variants cover all 4 SE Asian scripts
 *   overflow: visible    → (inherited; parent no longer has overflow-hidden)
 */
.script-text {
    font-family:
        'Noto Sans KM',
        /* Khmer  */
        'Noto Sans Thai',
        /* Thai   */
        'Noto Sans Lao',
        /* Lao    */
        'Noto Sans Myanmar',
        /* Burmese */
        'Noto Sans',
        system-ui, sans-serif;
    line-height: 2;
    /* Prevent any ancestor clip from cutting tall glyphs */
    overflow: visible;
}

/*
 * lang-button
 * ─────────────────────────────────────────────────────────────────────────────
 * overflow: visible is the critical fix — removed overflow-hidden from the
 * original template. Without this, diacritics extending above/below the
 * bounding box are clipped by the browser's paint boundary.
 */
.lang-button {
    overflow: visible;
}

/* ── Breadcrumb hover effects (unchanged) ─────────────────────────────────── */
.group:hover .breadcrumb-home-text {
    background: var(--logo-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 600;
}

.group:hover .breadcrumb-home-icon {
    background: var(--logo-gradient);
    -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>') no-repeat center;
    mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>') no-repeat center;
    -webkit-mask-size: contain;
    mask-size: contain;
    color: transparent;
}

/* ============================================================================= */

/* Dark mode (default) */
.preview-particles {
    background:
        radial-gradient(circle at 20% 30%, rgba(96, 165, 250, 0.35) 0%, transparent 50%),
        radial-gradient(circle at 75% 65%, rgba(168, 85, 247, 0.25) 0%, transparent 45%),
        radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.15) 0%, transparent 60%),
        #0b1120;
    position: relative;
    overflow: hidden;
}

.preview-particles::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(148, 163, 184, 0.6) 1px, transparent 1px);
    background-size: 12px 12px;
    opacity: 0.5;
}

/* Light mode overrides */
:global(html.light) .preview-particles,
:global(html[data-theme="light"]) .preview-particles {
    background:
        radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 75% 65%, rgba(139, 92, 246, 0.15) 0%, transparent 45%),
        radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 60%),
        #e8edf5;
}

:global(html.light) .preview-particles::after,
:global(html[data-theme="light"]) .preview-particles::after {
    background-image: radial-gradient(circle, rgba(30, 40, 80, 0.35) 1px, transparent 1px);
}

.preview-bubbles {
    background: radial-gradient(circle at 30% 70%, rgba(96, 165, 250, 0.2), transparent 50%),
                #0b1120;
    position: relative;
    overflow: hidden;
}
.preview-bubbles::before {
    content: '';
    position: absolute;
    width: 12px; height: 12px;
    border-radius: 50%;
    border: 1.5px solid rgba(150, 200, 255, 0.6);
    top: 55%; left: 20%;
}
.preview-bubbles::after {
    content: '';
    position: absolute;
    width: 20px; height: 20px;
    border-radius: 50%;
    border: 1.5px solid rgba(150, 200, 255, 0.35);
    top: 30%; left: 55%;
}

/* Device mode — system is light */
@media (prefers-color-scheme: light) {
    :global(html:not(.dark):not(.light)) .preview-particles,
    :global(html[data-theme="device"]) .preview-particles {
        background:
            radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 75% 65%, rgba(139, 92, 246, 0.15) 0%, transparent 45%),
            #e8edf5;
    }

    :global(html:not(.dark):not(.light)) .preview-particles::after,
    :global(html[data-theme="device"]) .preview-particles::after {
        background-image: radial-gradient(circle, rgba(30, 40, 80, 0.35) 1px, transparent 1px);
    }
}


</style> -->