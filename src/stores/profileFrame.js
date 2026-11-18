import { ref } from "vue";

// ─────────────────────────────────────────────────────────────────────────────
// Modern profile frames. Used by Hero.vue (rendering) and Settings.vue (picker).
//
//   borderRadius  → shape of the frame
//   ring          → true  = gradient ring around the photo
//                   false = thin glass border (HUD style)
//   grid          → faint grid pattern INSIDE the frame only
//   corners       → HUD corner brackets to draw: any of "tl" "tr" "bl" "br"
//                   [] = none
//   effect        → optional extra look (handled in Hero.vue):
//                     "neon"   glowing accent outline
//                     "spin"   slowly rotating gradient ring
//                     "stack"  offset layered cards behind the frame
//                     "double" double concentric ring
//   clip          → clip-path for the outer frame   (cut-corner shapes)
//   innerClip     → clip-path for the photo area    (slightly smaller cut)
//   previewRadius → radius used for the small preview in Settings
//   previewClip   → clip-path used for the small preview in Settings
// ─────────────────────────────────────────────────────────────────────────────

const ALL = ["tl", "tr", "bl", "br"];

// Octagon-like frame with the corners cut by `c` pixels
const chamfer = (c) =>
  `polygon(${c}px 0, calc(100% - ${c}px) 0, 100% ${c}px, 100% calc(100% - ${c}px), calc(100% - ${c}px) 100%, ${c}px 100%, 0 calc(100% - ${c}px), 0 ${c}px)`;

const RAW_FRAMES = [
  // ── HUD family ────────────────────────────────────────────────────────────
  {
    name: "hud",
    label: "HUD 4",
    borderRadius: "32px",
    previewRadius: "10px",
    ring: false,
    grid: true,
    corners: ALL, // default: all four corners
  },
  {
    name: "hud-tl-br",
    label: "HUD TL·BR",
    borderRadius: "32px",
    previewRadius: "10px",
    ring: false,
    grid: true,
    corners: ["tl", "br"], // top one on the left, bottom one on the right
  },
  {
    name: "hud-bl-tr",
    label: "HUD BL·TR",
    borderRadius: "32px",
    previewRadius: "10px",
    ring: false,
    grid: true,
    corners: ["bl", "tr"], // bottom one on the left, top one on the right
  },

  // ── Classic shapes ────────────────────────────────────────────────────────
  {
    name: "circle",
    label: "Circle",
    borderRadius: "9999px",
    previewRadius: "9999px",
    ring: true,
    grid: false,
    corners: [],
  },
  {
    name: "arch",
    label: "Arch",
    borderRadius: "999px 999px 32px 32px",
    previewRadius: "999px 999px 6px 6px",
    ring: true,
    grid: false,
    corners: [],
  },
  {
    name: "blob",
    label: "Blob",
    borderRadius: "58% 42% 38% 62% / 52% 36% 64% 48%",
    previewRadius: "58% 42% 38% 62% / 52% 36% 64% 48%",
    ring: true,
    grid: false,
    corners: [],
  },
  {
    name: "leaf",
    label: "Leaf",
    borderRadius: "120px 28px 120px 28px",
    previewRadius: "16px 4px 16px 4px",
    ring: true,
    grid: false,
    corners: [],
  },

  // ── Advanced ──────────────────────────────────────────────────────────────
  {
    name: "neon",
    label: "Neon",
    borderRadius: "28px",
    previewRadius: "9px",
    ring: false,
    grid: true,
    corners: [],
    effect: "neon",
  },
  {
    name: "aura",
    label: "Aura",
    borderRadius: "40px",
    previewRadius: "13px",
    ring: true,
    grid: false,
    corners: [],
    effect: "spin",
  },
  {
    name: "chamfer",
    label: "Chamfer",
    borderRadius: "0px",
    previewRadius: "0px",
    ring: true,
    grid: true,
    corners: [],
    clip: chamfer(30),
    innerClip: chamfer(26.5), // = 30 − 0.586 × ring width (6px), keeps the ring even
    previewClip: chamfer(9),
  },
  {
    name: "stack",
    label: "Stack",
    borderRadius: "24px",
    previewRadius: "8px",
    ring: false,
    grid: false,
    corners: [],
    effect: "stack",
  },
  {
    name: "double",
    label: "Double",
    borderRadius: "40px",
    previewRadius: "13px",
    ring: true,
    grid: false,
    corners: [],
    effect: "double",
  },
];

// `brackets` is kept so any older code that checks frame.brackets still works
export const PROFILE_FRAMES = RAW_FRAMES.map((f) => ({
  ...f,
  brackets: f.corners.length > 0,
}));

export const FRAME_STYLES = Object.fromEntries(
  PROFILE_FRAMES.map((f) => [f.name, f]),
);

export const DEFAULT_PROFILE_FRAME = "hud";

const STORAGE_KEY = "profile-frame-choice";

function readStored() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    // Old saved values (hexagon, diamond, shield, squircle) fall back safely
    return saved && saved in FRAME_STYLES ? saved : DEFAULT_PROFILE_FRAME;
  } catch {
    return DEFAULT_PROFILE_FRAME;
  }
}

export const currentProfileFrame = ref(readStored());

export function setProfileFrame(name) {
  if (!(name in FRAME_STYLES)) return;
  currentProfileFrame.value = name;
  try {
    localStorage.setItem(STORAGE_KEY, name);
  } catch {
    /* ignore */
  }
}