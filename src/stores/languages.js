import { ref, computed, watch } from "vue";

import en from './locales/en';
import km from './locales/km';
import zh from './locales/zh';
import fr from './locales/fr';
import lo from './locales/lo';
import my from './locales/my';
import th from './locales/th';
import ja from './locales/ja';
import ko from './locales/ko';
import fil from './locales/fil';
import de from './locales/de';
import es from './locales/es';

const translations = {
  en,
  km,
  zh,
  fr,
  lo,
  my,
  th,
  ja,
  ko,
  fil,
  de,
  es
};

// Helper: apply font attribute to <html> root
const applyLangFont = (lang) => {
  document.documentElement.setAttribute("data-lang", lang);
};

// // 2. The State
// export const currentLang = ref(localStorage.getItem("lang") || "en");

// State — init with saved lang and apply font immediately
// export const currentLang = ref(localStorage.getItem("lang") || "en");
// applyLangFont(currentLang.value); // run once on app load

const savedLang = localStorage.getItem("lang");
// Only use savedLang if it actually exists in our translations object
export const currentLang = ref(translations[savedLang] ? savedLang : "en");
applyLangFont(currentLang.value);

// // 3. The Helper Function (t)
// export const t = (key) => {
//   return computed(() => translations[currentLang.value][key] || key).value;
// };

// Helper t() stays the same
export const t = (key) => {
  return computed(() => translations[currentLang.value][key] || key).value;
};

// // 4. Function to switch language
// export const setLanguage = (lang) => {
//   currentLang.value = lang;
//   localStorage.setItem("lang", lang);
// };

// setLanguage — also triggers font switch
export const setLanguage = (lang) => {
  currentLang.value = lang;
  localStorage.setItem("lang", lang);
  applyLangFont(lang);
};

// export const fontClass = computed(() => {
//   switch (currentLang.value) {
//     case 'km': return 'font-khmer';
//     case 'zh': return 'font-chinese';
//   }
// });


// // Example logic when switching language
// if (newLang === 'km') {
//   document.body.style.fontFamily = "'Hanuman', sans-serif";
// } else {
//   document.body.style.fontFamily = "'Inter', sans-serif";
// }