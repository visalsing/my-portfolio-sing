<!-- <template>
    <div v-if="loading">
        <LoadingSpinner />
    </div>

    <div v-else class="min-h-screen bg-linear-to-b" style="background-color: #000;">
        <Navbar />
        <Hero />
        <Services />
        <About />
        <ExperienceSkills />
        <Projects />
        <Contact />
        <Testimonials />
        <Footer />
        <BackToTop />
        <router-view />
    </div>

</template> -->

<!-- <template>
    <div id="app-viewport-wrapper">
        <!-- Loading screen ->
        <div v-if="loading">
            <LoadingSpinner />
        </div>

        <div v-else>
            <-- HOME PAGE ->
            <div v-if="$route.path === '/'" class="min-h-screen bg-linear-to-b"
                :style="{ backgroundImage: 'var(--surface-bg)' }">
                <Navbar />
                <Hero />
                <About />
                <ExperienceSkills />
                <Services />
                <Projects />
                <Testimonials />
                <Contact />
                <Footer />
                <BackToTop />
            </div>

            <!-- ✅ ALL OTHER PAGES (Settings, Details, etc.) >
            <router-view v-else />
        </div>
    </div>
</template> -->

<!-- <script>

import AOS from 'aos';
import 'aos/dist/aos.css';
import Hero from './components/Hero.vue';
import Navbar from './components/Navbar.vue';
import Services from './components/Services.vue';
import About from './components/About.vue';
import ExperienceSkills from './components/ExperienceSkills.vue';
import Projects from './components/Projects.vue';
import Contact from './components/Contact.vue';
import Testimonials from './components/Testimonials.vue';
import Footer from './components/Footer.vue';
import BackToTop from './components/BackToTop.vue';
import LoadingSpinner from './components/LoadingSpinner.vue';

import { ref, nextTick, onMounted, defineComponent } from 'vue';
import NavbarResponsive from './components/NavbarResponsive.vue';

import { currentTheme, setThemeMode } from './stores/themeMode.js';

// import { fontClass } from '../src/stores/languages.js';

import { currentViewport, applyViewport } from './stores/viewport.js';


export default defineComponent({
    name: 'App',
    components: {
        Navbar,
        Hero,
        About,
        ExperienceSkills,
        Services,
        Projects,
        Testimonials,
        Contact,
        Footer,
        BackToTop,
        LoadingSpinner,
    },
    // setup() {
    //     const loading = ref(true);

    //     onMounted(async () => {
    //         await nextTick();

    //         AOS.init({
    //             duration: 800,
    //             once: false,
    //             offset: 100,
    //             easing: 'ease-in-out',
    //         });
    //         setTimeout(() => {
    //             loading.value = false
    //         }, 800);
    //     });
    //     return {
    //         loading,
    //         // fontClass 
    //     };
    // }
    setup() {
    const loading = ref(true);

    onMounted(async () => {
        // ✅ Apply saved viewport on reload
        applyViewport(currentViewport.value);

        await nextTick();

        AOS.init({
            duration: 800,
            once: false,
            offset: 100,
            easing: 'ease-in-out',
        });
        setTimeout(() => {
            loading.value = false;
        }, 800);
    });

    return {
        loading,
    };
}
});
</script> -->



<template>
    <div id="app-viewport-wrapper">

        <!-- ══════════════════════════════════════════
             RESPONSIVE PREVIEW MODE (iframe)
             Only shown when NOT inside an iframe
        ══════════════════════════════════════════ -->
        <div v-if="activeViewport !== 'Auto'" style="
                position: fixed; inset: 0;
                background: #080b12;
                display: flex;
                flex-direction: column;
                z-index: 9999;
                overflow: hidden;
            ">

            <!-- Toolbar -->
            <div style="
                    height: 48px; flex-shrink: 0;
                    background: #0f1117;
                    border-bottom: 1px solid #1e2535;
                    display: flex; align-items: center;
                    justify-content: space-between;
                    padding: 0 16px;
                    font-family: monospace; gap: 12px;
                ">
                <span style="color:#4b5563; font-size:11px; white-space:nowrap;">
                    🖥 Responsive Preview
                </span>

                <div style="display:flex; gap:6px;">
                    <button v-for="vp in vpList" :key="vp.name"
                        @click="switchViewport(vp.name)"
                        :style="`
                            padding: 4px 14px; border-radius: 6px;
                            font-size: 11px; cursor: pointer;
                            border: 1px solid ${activeViewport === vp.name ? '#6366f1' : '#1f2937'};
                            background: ${activeViewport === vp.name ? '#1e1b4b' : 'transparent'};
                            color: ${activeViewport === vp.name ? '#a5b4fc' : '#6b7280'};
                        `">
                        {{ vp.icon }} {{ vp.label }}
                        <span style="opacity:0.45; margin-left:5px; font-size:10px;">
                            {{ vp.w }}
                        </span>
                    </button>
                </div>

                <span style="
                        color:#6366f1; font-size:11px;
                        background:#1e1b4b; border:1px solid #3730a3;
                        padding: 2px 10px; border-radius: 20px; white-space:nowrap;
                    ">
                    {{ currentFrameWidth }}px × {{ frameHeight }}px
                </span>

                <button @click="switchViewport('Auto')" style="
                        padding: 4px 14px; border-radius: 6px;
                        font-size: 11px; cursor: pointer;
                        border: 1px solid #374151;
                        background: transparent; color: #f87171; white-space:nowrap;
                    ">
                    ✕ Exit
                </button>
            </div>

            <!-- Slider -->
            <div style="
                    display:flex; align-items:center; justify-content:center;
                    gap:12px; padding: 8px 16px;
                    background:#0f1117; border-bottom:1px solid #1e2535;
                    flex-shrink:0;
                ">
                <span style="color:#4b5563; font-size:10px; font-family:monospace;">
                    WIDTH
                </span>
                <input type="range" :min="320" :max="1600" :value="currentFrameWidth"
                    @input="onWidthDrag"
                    style="width:200px; accent-color:#6366f1; cursor:pointer;" />
                <span style="color:#a5b4fc; font-size:11px; font-family:monospace; min-width:52px;">
                    {{ currentFrameWidth }}px
                </span>
            </div>

            <!-- iframe -->
            <div style="
                    flex:1; display:flex;
                    align-items:flex-start;
                    justify-content:center;
                    padding:20px 24px 0;
                    overflow:hidden;
                ">
                <div :style="`
                        width: ${scaledContainerWidth}px;
                        height: ${frameHeight}px;
                        border-radius: 10px 10px 0 0;
                        box-shadow: 0 0 0 1px #1e2535, 0 24px 80px rgba(0,0,0,0.7);
                        overflow: hidden;
                        flex-shrink: 0;
                    `">
                    <iframe
                        :src="iframeSrc"
                        :style="`
                            width: ${currentFrameWidth}px;
                            height: ${frameHeight}px;
                            border: none;
                            transform: scale(${iframeScale});
                            transform-origin: top left;
                            display: block;
                        `"
                        scrolling="yes"
                    />
                </div>
            </div>
        </div>

        <!-- ══════════════════════════════════════════
             YOUR ORIGINAL LOGIC (untouched)
        ══════════════════════════════════════════ -->
        <template v-else>
            <!-- Loading screen -->
            <div v-if="loading">
                <LoadingSpinner />
            </div>

            <div v-else>
                <!-- HOME PAGE -->
                <div v-if="$route.path === '/'" class="min-h-screen bg-linear-to-b"
                    :style="{ backgroundImage: 'var(--surface-bg)' }">
                    <Navbar />
                    <Hero />
                    <About />
                    <ExperienceSkills />
                    <Services />
                    <Projects />
                    <Testimonials />
                    <Contact />
                    <Footer />
                    <BackToTop />
                </div>

                <!-- ALL OTHER PAGES (Settings, Details, etc.) -->
                <router-view v-else />
            </div>
        </template>

    </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';

import Hero             from './components/Hero.vue';
import Navbar           from './components/Navbar.vue';
import Services         from './components/Services.vue';
import About            from './components/About.vue';
import ExperienceSkills from './components/ExperienceSkills.vue';
import Projects         from './components/Projects.vue';
import Contact          from './components/Contact.vue';
import Testimonials     from './components/Testimonials.vue';
import Footer           from './components/Footer.vue';
import BackToTop        from './components/BackToTop.vue';
import LoadingSpinner   from './components/LoadingSpinner.vue';

import { ref, computed, nextTick, onMounted, onUnmounted, defineComponent } from 'vue';
import { currentViewport, setViewport, viewportWidths } from './stores/viewport.js';

export default defineComponent({
    name: 'App',

    components: {
        Navbar, Hero, About, ExperienceSkills,
        Services, Projects, Testimonials,
        Contact, Footer, BackToTop, LoadingSpinner,
    },

    setup() {
        const loading = ref(true);

        // ── Are we inside the preview iframe? ────────────────────────
        // If yes, skip all preview logic and render normally
        const isInsideIframe = window.self !== window.top;

        // ── Device list for toolbar ──────────────────────────────────
        const vpList = [
            { name: 'Mobile',  label: 'Mobile',  icon: '📱', w: '375px'  },
            { name: 'Tablet',  label: 'Tablet',  icon: '📟', w: '768px'  },
            { name: 'Laptop',  label: 'Laptop',  icon: '💻', w: '1024px' },
            { name: 'Desktop', label: 'Desktop', icon: '🖥',  w: '1440px' },
        ];

        // ── Reactive state ───────────────────────────────────────────
        // If inside iframe → always 'Auto' so preview never nests
        const activeViewport = computed(() =>
            isInsideIframe ? 'Auto' : currentViewport.value
        );

        const currentFrameWidth = ref(viewportWidths[currentViewport.value] || 375);
        const frameHeight       = ref(window.innerHeight - 48 - 42 - 20);

        const iframeSrc = computed(() => window.location.origin + '/');

        const iframeScale = computed(() => {
            const available = window.innerWidth - 48;
            return Math.min(1, available / currentFrameWidth.value);
        });

        const scaledContainerWidth = computed(() =>
            Math.round(currentFrameWidth.value * iframeScale.value)
        );

        // ── Methods ──────────────────────────────────────────────────
        function switchViewport(name) {
            setViewport(name);
            if (name !== 'Auto') {
                currentFrameWidth.value = viewportWidths[name];
            }
        }

        function onWidthDrag(e) {
            currentFrameWidth.value = Number(e.target.value);
        }

        function onResize() {
            frameHeight.value = window.innerHeight - 48 - 42 - 20;
        }

        // ── Lifecycle (YOUR ORIGINAL — untouched) ────────────────────
        onMounted(async () => {
            if (currentViewport.value !== 'Auto') {
                currentFrameWidth.value = viewportWidths[currentViewport.value] || 375;
            }

            window.addEventListener('resize', onResize);

            await nextTick();

            AOS.init({
                duration: 800,
                once: false,
                offset: 100,
                easing: 'ease-in-out',
            });

            setTimeout(() => {
                loading.value = false;
            }, 800);
        });

        onUnmounted(() => {
            window.removeEventListener('resize', onResize);
        });

        return {
            loading,
            activeViewport,
            vpList,
            currentFrameWidth,
            frameHeight,
            iframeSrc,
            iframeScale,
            scaledContainerWidth,
            switchViewport,
            onWidthDrag,
            setViewport,
        };
    },
});
</script>