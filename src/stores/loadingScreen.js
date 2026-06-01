// import { ref } from 'vue';

// const STORAGE_KEY = 'portfolio-loading-screen';

// export const currentLoadingScreen = ref(
//   localStorage.getItem(STORAGE_KEY) || 'bounce-dots'
// );

// export function setLoadingScreen(name) {
//   currentLoadingScreen.value = name;
//   localStorage.setItem(STORAGE_KEY, name);
// }

// stores/loadingScreen.js
import { ref } from 'vue';

const STORAGE_KEY = 'portfolio-loading-screen';

export const currentLoadingScreen = ref(
  localStorage.getItem(STORAGE_KEY) || 'bounce-dots'
);

export function setLoadingScreen(name) {
  currentLoadingScreen.value = name;
  localStorage.setItem(STORAGE_KEY, name);
}