import { ref } from 'vue';

// Map background names to their actual high-quality image URLs.
// Canvas-based particle types use an empty string — handled in Hero.vue.
export const backgroundImages = {
    none:              '',
    particles:         '',   // canvas: connected dot network
    'particles-bubbles': '', // canvas: floating bubbles
    rain: '',
    abstract:    'https://techhub.iodigital.com/articles/particle-background-effect-with-react-and-canvas/result.gif',
    cyberpunk:   'https://i.pinimg.com/originals/38/05/e2/3805e2bdebd454303a75db6afbb8f057.gif',
    minimalist:  'https://miro.medium.com/1*q8HNVIql60d46VWjI5i2CQ.gif',
    stars:       'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1920&q=80',
};

// Initialize state from localStorage, default to 'none'
export const currentHeroBg = ref(localStorage.getItem('hero-bg-choice') || 'none');

// Action to update state
export function setHeroBg(bgName) {
    if (bgName in backgroundImages) {
        currentHeroBg.value = bgName;
        localStorage.setItem('hero-bg-choice', bgName);
    }
}