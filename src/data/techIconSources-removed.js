// src/data/techIconSources.js
// Single source of truth for tech logos.
//  - About.vue uses it as a REMOTE FALLBACK (only for logos not yet in src/assets/logotech/)
//  - scripts/download-logos.mjs uses it to download every logo into src/assets/logotech/
//
// Local file naming: src/assets/logotech/<techSlug(name)>.svg|png|webp
//   'Vue.js' -> vue-js.svg   'C++' -> cplusplus.svg   'C#' -> csharp.svg   'Power BI' -> power-bi.svg

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';
const SIMPLE = 'https://cdn.simpleicons.org';
const DASH = 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg';

const dv = (slug, v = 'original') => `${DEVICON}/${slug}/${slug}-${v}.svg`;
const si = (slug) => `${SIMPLE}/${slug}`;
const di = (slug) => `${DASH}/${slug}.svg`;
const sh = (slug) => `https://cdn.jsdelivr.net/gh/selfhst/icons/svg/${slug}.svg`;

const svgData = (body, color = '#38bdf8') =>
  'data:image/svg+xml;utf8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`
  );

const DB_ICON = svgData('<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>', '#0ea5e9');
const API_ICON = svgData('<path d="M8 4C5 4 6 9 4 12c2 3 1 8 4 8"/><path d="M16 4c3 0 2 5 4 8-2 3-1 8-4 8"/>', '#f97316');
const MAIL_ICON = svgData('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>', '#f59e0b');

/** 'Vue.js' -> 'vue-js', 'C++' -> 'cplusplus', 'C#' -> 'csharp' */
export const techSlug = (name) =>
  name
    .toLowerCase()
    .replace(/\+/g, 'plus')
    .replace(/#/g, 'sharp')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const TECH_ICON_SOURCES = {
  // Languages
  'HTML': [dv('html5')],
  'CSS': [dv('css3')],
  'JavaScript': [dv('javascript')],
  'TypeScript': [dv('typescript')],
  'Python': [dv('python')],
  'Java': [dv('java')],
  'C': [dv('c')],
  'C++': [dv('cplusplus')],
  'C#': [dv('csharp')],
  'Dart': [dv('dart')],
  'SQL': [DB_ICON],

  // Frontend
  'Vue.js': [dv('vuejs')],
  'React.js': [dv('react')],
  'jQuery': [dv('jquery')],
  'Bootstrap': [dv('bootstrap')],
  'Tailwind CSS': [dv('tailwindcss')],
  'Flutter': [dv('flutter')],

  // Backend
  'Node.js': [dv('nodejs')],
  'Express.js': [dv('express'), si('express')],
  'Laravel': [dv('laravel'), si('laravel')],
  'REST API': [API_ICON],

  // Databases
  'MySQL': [dv('mysql')],
  'PostgreSQL': [dv('postgresql')],
  'MongoDB': [dv('mongodb')],
  'NeonDB': [si('neon')],
  'PrismaORM': [dv('prisma'), si('prisma')],
  'Firebase': [dv('firebase')],

  // Version control
  'Git': [dv('git')],
  'GitHub': [dv('github')],
  'GitLab': [dv('gitlab')],

  // Deploy & DevOps
  'Docker': [dv('docker')],
  'Vercel': [dv('vercel'), si('vercel')],
  'Render': [si('render')],
  'Netlify': [dv('netlify'), si('netlify')],

  // API & Integrations
  'Postman': [dv('postman')],
  'EmailJS': [si('emailjs'), MAIL_ICON],
  'TelegramBot': [si('telegram')],

  // CMS & Marketing
  'WordPress': [dv('wordpress', 'plain'), si('wordpress')],
  'Mautic': [si('mautic')],
  'OneSignal': [si('onesignal')],

  // AI tools
  'Claude': [si('claude'), di('claude-ai')],
  'ChatGPT': [di('chatgpt'), si('openai')],
  'Gemini': [si('googlegemini'), di('google-gemini')],

  // Design & Data
  'Figma': [dv('figma')],
  'Canva': [dv('canva'), si('canva')],
  'Power BI': [di('powerbi')],
  'Tableau': [sh('tableau'), dv('tableau'), si('tableau')],

  // Dev tools
  'VS Code': [dv('vscode')],
  // No CDN I could confirm has these two → drop navicat.svg / wamp.svg into src/assets/logotech/ by hand
  'Navicat': [
    sh('navicat'),
    // di('navicat'),
    // 'https://icons.iconarchive.com/icons/papirus-team/papirus-apps/128/navicat-icon.png',
  ],
  'WAMP': [
    sh('wampserver'),
    'https://commons.wikimedia.org/wiki/Special:FilePath/WampServer-logo.svg',
  ],

  // Office & Media
  // Microsoft icons were removed from Simple Icons (v13) → Dashboard Icons / selfh.st
  'Word': [di('microsoft-word'), sh('microsoft-word'), sh('microsoft-word-2018')],
  'Excel': [di('microsoft-excel'), sh('microsoft-excel'), sh('microsoft-excel-2018')],
  'PowerPoint': [sh('microsoft-powerpoint'), di('microsoft-powerpoint'), sh('microsoft-powerpoint-2018')],
  'Microsoft Office': [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Microsoft_365_(2022).svg',
    di('microsoft-office'),
    sh('microsoft-office'),
  ],
  'Google Docs': [si('googledocs')],
  'Google Sheets': [si('googlesheets'), di('google-sheets'), sh('google-sheets')],
  'Google Slides': [si('googleslides')],
  // No CDN confirmed → drop google-workspace.svg into src/assets/logotech/ by hand
  // (official artwork: https://support.google.com/a/answer/9212588)
  'Google Workspace': [di('google-workspace'), sh('google-workspace')],
  'Photoshop': [sh('adobe-photoshop'), di('adobe-photoshop'), dv('photoshop', 'plain')],
  'YouTube': [si('youtube')],
  // Simple Icons' Notion is pure black = invisible on dark backgrounds
  'Notion': [sh('notion'), di('notion'), si('notion/white')],
};