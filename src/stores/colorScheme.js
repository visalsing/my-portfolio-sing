import { ref } from 'vue';

const THEME_CLASSES = {
  'Blue-Cyan':     'theme-blue-cyan',
  'Red-Scarlet':   'theme-red-scarlet',
  'Purple-Pink':   'theme-purple-pink',
  'Green-Dark':    'theme-green-dark',
  'Orange-Yellow': 'theme-orange-yellow',
  'Black-Charcoal': 'theme-black-charcoal',
  'White-Smoke': 'theme-white-smoke',

  // 'Indigo-Purple': 'theme-indigo-purple',
  // 'Lime-Green':    'theme-lime-green',
  // 'Rose-Orange':   'theme-rose-orange',
  // 'Sky-Teal':      'theme-sky-teal',
};

const saved = localStorage.getItem('colorScheme') || 'Blue-Cyan';
export const currentScheme = ref(saved);

export function setColorScheme(name) {
  // Remove all theme classes from <html>
  Object.values(THEME_CLASSES).forEach(cls =>
    document.documentElement.classList.remove(cls)
  );
  // Apply the new theme class
  const cls = THEME_CLASSES[name];
  if (cls) document.documentElement.classList.add(cls);
  currentScheme.value = name;
  localStorage.setItem('colorScheme', name);
}

// Apply saved theme immediately on import
setColorScheme(saved);