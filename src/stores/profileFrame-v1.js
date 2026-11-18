// src/stores/profileFrame.js
import { ref } from 'vue';

const STORAGE_KEY = 'portfolio-profile-frame';

export const FRAME_STYLES = {
  circle: {
    label: 'Circle',
    clipPath: 'circle(50% at 50% 50%)',
    borderRadius: '9999px',
    useClip: false,
  },
  hexagon: {
    label: 'Hexagon',
    clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
    borderRadius: '0',
    useClip: true,
  },
  diamond: {
    label: 'Diamond',
    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
    borderRadius: '0',
    useClip: true,
  },
  squircle: {
    label: 'Squircle',
    clipPath: null,
    borderRadius: '30%',
    useClip: false,
  },
  shield: {
    label: 'Shield',
    clipPath: 'polygon(50% 0%, 100% 18%, 100% 65%, 50% 100%, 0% 65%, 0% 18%)',
    borderRadius: '0',
    useClip: true,
  },
};

const saved = localStorage.getItem(STORAGE_KEY) ?? 'circle';
export const currentProfileFrame = ref(saved);

export function setProfileFrame(name) {
  currentProfileFrame.value = name;
  localStorage.setItem(STORAGE_KEY, name);
}