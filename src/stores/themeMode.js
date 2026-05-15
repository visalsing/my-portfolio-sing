import { ref } from 'vue';

const THEME_CLASSES = ['theme-dark', 'theme-light', 'theme-device'];
const saved = localStorage.getItem('theme') || 'Dark';

export const currentTheme = ref(saved);

export function setThemeMode(name) {
    const root = document.documentElement;

    // Remove all theme classes first
    THEME_CLASSES.forEach(c => root.classList.remove(c));

    // Add the correct one
    root.classList.add(`theme-${name.toLowerCase()}`);

    // Also set colorScheme for browser UI (scrollbars, inputs, etc.)
    if (name === 'Dark') {
        root.style.colorScheme = 'dark';
    } else if (name === 'Light') {
        root.style.colorScheme = 'light';
    } else {
        // Device — let the browser decide
        root.style.colorScheme = 'light dark';
    }

    currentTheme.value = name;
    localStorage.setItem('theme', name);
}

// Apply saved theme immediately on import
setThemeMode(saved);