// src/stores/techstatus.js
// Single source of truth for tech-stack status colors/labels and who gets which status.
// Change a color here and it updates the cards, filter chips, header stats and the modal.

export const STATUS_META = {
  available:   { label: 'Available',   color: '#34d399', rgb: '52,211,153'  }, // green
  learning:    { label: 'Learning',    color: '#fbbf24', rgb: '251,191,36'  }, // yellow
  paused:      { label: 'Paused',      color: '#94a3b8', rgb: '148,163,184' }, // grey-white
  unavailable: { label: 'Unavailable', color: '#f87171', rgb: '248,113,113' }, // red
  dropped:     { label: 'Dropped',     color: '#a78bfa', rgb: '167,139,250' }, // violet
};

// Display order for chips / stats
export const STATUS_ORDER = ['available', 'learning', 'paused', 'unavailable', 'dropped'];

// ── GREEN: only these are Available ──────────────────────────────────────────
// Everything NOT listed here (and not in OVERRIDES) becomes Unavailable (red).
// To make a tech green, just add its exact `name` from TechStack.vue.
const AVAILABLE = new Set([
  // Frontend
  'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Vue.js', 'Vite.js', 'React.js',
  'Next.js', 'Nuxt.js', 'jQuery', 'Tailwind CSS', 'Bootstrap', 'Responsive',
  // Backend
  'PHP', 'SQL', 'Python', 'Laravel', 'Node.js', 'Express.js', 'C', 'C++',
  // Databases
  'MySQL', 'PostgreSQL', 'MongoDB', 'Neon DB', 'Prisma',
  // Data analytics
  'Power BI', 'Tableau',
  // API
  'RESTful API', 'Postman', 'JWT',
  // CMS & services
  'WordPress', 'Mautic', 'Telegram Bot',
  // DevOps
  'Git', 'GitHub', 'GitLab', 'Netlify', 'Vercel',
  // Dev tools
  'VS Code', 'WAMP', 'Ngrok', 'Navicat',
  // Design
  'Figma', 'Photoshop', 'Canva',
  // Productivity
  'Office 365', 'Word', 'Excel', 'PowerPoint', 'Google Docs',
  // AI tools
  'Claude', 'Gemini', 'ChatGPT',
  // Spoken languages (known)
  'Khmer', 'English', 'Chinese',
]);

// ── Special statuses (these win over everything else) ────────────────────────
const OVERRIDES = {
  // Learning (yellow)
  French: 'learning',
  Lao: 'learning',
  Burmese: 'learning',

  // Paused (grey-white)
  Flutter: 'paused',
  Dart: 'paused',
  Java: 'paused',
  'C#': 'paused',

  // Dropped (violet)
  Thai: 'dropped',
};

export function getTechStatus(name) {
  return OVERRIDES[name] ?? (AVAILABLE.has(name) ? 'available' : 'unavailable');
}