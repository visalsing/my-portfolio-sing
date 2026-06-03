// import { ref } from 'vue';

// // Map background names to their actual high-quality image URLs.
// // Canvas-based particle types use an empty string — handled in Hero.vue.
// export const backgroundImages = {
//     none:              '',
//     particles:         '',   // canvas: connected dot network
//     'particles-bubbles': '', // canvas: floating bubbles
//     rain: '',
//     'nyan-cat': 'https://s8.ezgif.com/tmp/ezgif-8f06469c33c74843.gif',
//     abstract:    'https://techhub.iodigital.com/articles/particle-background-effect-with-react-and-canvas/result.gif',
//     cyberpunk:   'https://i.pinimg.com/originals/38/05/e2/3805e2bdebd454303a75db6afbb8f057.gif',
//     minimalist:  'https://miro.medium.com/1*q8HNVIql60d46VWjI5i2CQ.gif',
//     stars:       'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1920&q=80',
// };

// // Initialize state from localStorage, default to 'none'
// export const currentHeroBg = ref(localStorage.getItem('hero-bg-choice') || 'none');

// // Action to update state
// export function setHeroBg(bgName) {
//     if (bgName in backgroundImages) {
//         currentHeroBg.value = bgName;
//         localStorage.setItem('hero-bg-choice', bgName);
//     }
// }



// import { ref, computed, onMounted, onUnmounted } from 'vue';

// // 1. Map background names. Stars now has variants.
// export const backgroundImages = {
//     none:              '',
//     particles:         '', 
//     'particles-bubbles': '',
//     rain:              '',
//     'nyan-cat':        'https://s8.ezgif.com/tmp/ezgif-8f06469c33c74843.gif',
//     abstract:          'https://techhub.iodigital.com/articles/particle-background-effect-with-react-and-canvas/result.gif',
//     cyberpunk:         'https://i.pinimg.com/originals/38/05/e2/3805e2bdebd454303a75db6afbb8f057.gif',
//     minimalist:        'https://miro.medium.com/1*q8HNVIql60d46VWjI5i2CQ.gif',
//     stars: {
//         dark:  'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1920&q=80',
//         light: 'https://images.unsplash.com/photo-1475275083424-b4ff81c13948?auto=format&fit=crop&w=1920&q=80'
//     },
// };

// export const currentHeroBg = ref(localStorage.getItem('hero-bg-choice') || 'none');

// // 2. Track the system's dark mode preference for the "theme-device" case
// const systemDark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches);
// const mqListener = (e) => { systemDark.value = e.matches; };

// // 3. Computed logic to determine if we should show Dark or Light version
// export const activeBgUrl = computed(() => {
//     const choice = backgroundImages[currentHeroBg.value];
    
//     // If it's a simple string, return it
//     if (!choice || typeof choice === 'string') return choice || '';

//     // If it's a conditional object (like stars)
//     const htmlClass = document.documentElement.classList;

//     if (htmlClass.contains('theme-dark')) {
//         return choice.dark;
//     } else if (htmlClass.contains('theme-light')) {
//         return choice.light;
//     } else if (htmlClass.contains('theme-device')) {
//         // Fallback to system preference
//         return systemDark.value ? choice.dark : choice.light;
//     }

//     return choice.dark; // Default fallback
// });

// // 4. Action to update background
// export function setHeroBg(bgName) {
//     if (bgName in backgroundImages) {
//         currentHeroBg.value = bgName;
//         localStorage.setItem('hero-bg-choice', bgName);
//     }
// }

// // 5. Setup listeners for the "Device" theme preference
// export function initBgThemeListeners() {
//     onMounted(() => {
//         window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', mqListener);
//     });
//     onUnmounted(() => {
//         window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', mqListener);
//     });
// }




// import { ref } from 'vue';

// import { currentTheme } from './themeMode.js';  // import the reactive ref

// function getIsDark() {
//     const theme = localStorage.getItem('theme-mode') || 'Dark';
//     if (theme === 'Dark') return true;
//     if (theme === 'Light') return false;
//     return window.matchMedia('(prefers-color-scheme: dark)').matches;
// }

// // Import assets so Vite processes them correctly
// const nyanCat    = new URL('../assets/images/heroBackgrounds/rainbowcat.gif',        import.meta.url).href;
// const starsDark  = new URL('../assets/images/heroBackgrounds/starynight_dark.png',  import.meta.url).href;
// const starsLight = new URL('../assets/images/heroBackgrounds/starynight_light.png', import.meta.url).href;

// export const backgroundImages = {
//     none:                '',
//     particles:           '',
//     'particles-bubbles': '',
//     rain:                '',
//     'nyan-cat':          nyanCat,
//     stars:               () => getIsDark() ? starsDark : starsLight,
// };

// export const currentHeroBg = ref(localStorage.getItem('hero-bg-choice') || 'none');

// export function getHeroBgUrl(bgName) {
//     const entry = backgroundImages[bgName];
//     if (!entry) return '';
//     return typeof entry === 'function' ? entry() : entry;
// }

// // // heroBg.js — make stars reactive to theme changes
// // export function getHeroBgUrl(bgName) {
// //     const entry = backgroundImages[bgName];
// //     if (!entry) return '';
// //     // Access currentTheme.value so Vue tracks this as a dependency
// //     void currentTheme.value;
// //     return typeof entry === 'function' ? entry() : entry;
// // }

// export function setHeroBg(bgName) {
//     if (bgName in backgroundImages) {
//         currentHeroBg.value = bgName;
//         localStorage.setItem('hero-bg-choice', bgName);
//     }
// }





import { ref } from 'vue';
import { currentTheme } from './themeMode.js';

// function getIsDark() {
//     const theme = localStorage.getItem('theme-mode') || 'Dark';
//     if (theme === 'Dark') return true;
//     if (theme === 'Light') return false;
//     return window.matchMedia('(prefers-color-scheme: dark)').matches;
// }
function getIsDark() {
    const theme = currentTheme.value; // ✅ use the reactive ref directly
    if (theme === 'Dark') return true;
    if (theme === 'Light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

const nyanCat    = new URL('../assets/images/heroBackgrounds/rainbowcat.gif',          import.meta.url).href;
const starsDark  = new URL('../assets/images/heroBackgrounds/starynight_dark.png',     import.meta.url).href;
const starsLight = new URL('../assets/images/heroBackgrounds/starynight_light.png',    import.meta.url).href;

export const backgroundImages = {
    none:                '',
    particles:           '',
    'particles-bubbles': '',
    rain:                '',
    'nyan-cat':          nyanCat,
    stars:               null, // resolved dynamically via getHeroBgUrl()
};

export const currentHeroBg = ref(localStorage.getItem('hero-bg-choice') || 'none');

export function getHeroBgUrl(bgName) {
    if (bgName === 'stars') {
        // reading currentTheme.value makes any computed() that calls this reactive
        void currentTheme.value;
        return getIsDark() ? starsDark : starsLight;
    }
    return backgroundImages[bgName] ?? '';
}

export function setHeroBg(bgName) {
    if (bgName in backgroundImages) {
        currentHeroBg.value = bgName;
        localStorage.setItem('hero-bg-choice', bgName);
    }
}