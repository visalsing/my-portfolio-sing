// import { ref } from 'vue';

// const STORAGE_KEY = 'portfolio-viewport';

// export const currentViewport = ref(
//   localStorage.getItem(STORAGE_KEY) || 'Auto'
// );

// export const viewportWidths = {
//   Auto:    null,
//   Mobile:  375,
//   Tablet:  768,
//   Laptop:  1024,
//   Desktop: 1440,
// };

// export function setViewport(name) {
//   currentViewport.value = name;
//   localStorage.setItem(STORAGE_KEY, name);
//   applyViewport(name);
// }

// export function applyViewport(name) {
//   const width = viewportWidths[name];
//   const wrapper = document.getElementById('app-viewport-wrapper');
//   const frame   = document.getElementById('app-viewport-frame');

//   if (!wrapper || !frame) return;

//   if (!width) {
//     // ── Auto: remove everything ──
//     wrapper.style.cssText = '';
//     frame.style.cssText   = '';
//     return;
//   }

//   const winW  = window.innerWidth;
//   const winH  = window.innerHeight;
//   const scale = Math.min(1, (winW - 48) / width);  // 24px padding each side

//   // ── Outer shell: full screen, dark overlay, centred ──
//   wrapper.style.cssText = `
//     position: fixed;
//     inset: 0;
//     background: #0a0a0f;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: flex-start;
//     padding-top: 48px;
//     z-index: 9999;
//     overflow: hidden;
//   `;

//   // ── Inner frame: device-sized, scaled down, scrollable ──
//   frame.style.cssText = `
//     width: ${width}px;
//     height: ${Math.round(winH * 0.82)}px;
//     transform: scale(${scale});
//     transform-origin: top center;
//     overflow-y: auto;
//     overflow-x: hidden;
//     border-radius: 12px;
//     box-shadow: 0 0 0 2px #334155, 0 32px 80px rgba(0,0,0,0.8);
//     background: white;
//     position: relative;
//     flex-shrink: 0;
//   `;
// }

import { ref } from 'vue';

const STORAGE_KEY = 'portfolio-viewport';

export const currentViewport = ref(
  localStorage.getItem(STORAGE_KEY) || 'Auto'
);

export const viewportWidths = {
  Auto:    null,
  Mobile:  375,
  Tablet:  768,
  Laptop:  1024,
  Desktop: 1440,
};

export function setViewport(name) {
  currentViewport.value = name;
  localStorage.setItem(STORAGE_KEY, name);
}

// Kept so old imports don't crash — logic moved to App.vue
export function applyViewport() {}