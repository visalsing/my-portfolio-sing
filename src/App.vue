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

<template>
    <!-- Loading screen -->
    <div v-if="loading">
        <LoadingSpinner />
    </div>

    <div v-else>

        <!-- 
            🏠 HOME PAGE ("/")
            Show full landing layout:
            Navbar + Hero + all sections
        -->
            <!-- :class="fontClass" -->
        <div v-if="$route.path === '/'" class="min-h-screen bg-linear-to-b" :style="{ backgroundImage: 'var(--surface-bg)' }">
            <!-- 
            :style="{ backgroundImage: 'var(--surface-bg)' }" -->

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

        <!-- 
            📄 OTHER PAGES ("/details", "/something")
            Render routed components here
            Example: Details.vue
        -->
        <router-view v-else />

    </div>
</template>

<script>

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
    setup() {
        const loading = ref(true);

        onMounted(async () => {
            await nextTick();

            AOS.init({
                duration: 800,
                once: false,
                offset: 100,
                easing: 'ease-in-out',
            });
            setTimeout(() => {
                loading.value = false
            }, 800);
        });
        return { 
            loading, 
            // fontClass 
        };
    }
});
</script>
