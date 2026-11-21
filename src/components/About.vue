<template>
  <section class="relative py-20 overflow-hidden min-h-screen flex flex-col justify-center" id="about">
    <!-- Decorative background glows -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0">
      <div class="about-glow about-glow-a"></div>
      <div class="about-glow about-glow-b"></div>
    </div>

    <div class="w-full px-5 sm:px-8 md:px-12 lg:px-8 max-w-5xl lg:max-w-7xl mx-auto relative z-10">
      <div class="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

        <!-- ───────── LEFT: text + other elements ───────── -->
        <div class="text-center lg:text-left" data-aos="fade-right">
          <h2 class="font-bold text-4xl md:text-5xl lg:text-6xl leading-loose"
            :style="{ color: 'var(--surface-text)' }">
            {{ t('about_') }}<span class="inline-block py-2 text-transparent bg-clip-text"
              :style="{ backgroundImage: 'var(--logo-gradient)' }">{{ t('_me') }}</span>
          </h2>

          <p class="font-medium text-lg md:text-xl mt-2" :style="{ color: 'var(--accent-text-muted)' }"
            data-aos="fade-right" data-aos-delay="100">
            Full-Stack Developer &amp; UI/UX Designer
          </p>

          <p class="mt-6 text-lg leading-relaxed" :style="{ color: 'var(--surface-text-sub)' }" data-aos="fade-right"
            data-aos-delay="200">
            {{ t('about_me_long_text') }}
          </p>

          <!-- What I do: compact 2-column cards -->
          <div class="mt-8 grid sm:grid-cols-2 gap-3 text-left">
            <div v-for="(item, i) in WHAT_I_DO" :key="item.id"
              class="about-card flex items-start gap-3 p-4 rounded-2xl border" data-aos="fade-up"
              :data-aos-delay="250 + i * 70">
              <span class="grid place-items-center w-10 h-10 shrink-0 rounded-xl"
                :style="{ background: 'var(--accent-bg)', color: item.iconColor }">
                <component :is="item.icon" class="w-5 h-5" />
              </span>
              <div class="min-w-0">
                <h4 class="font-semibold text-base leading-tight" :style="{ color: 'var(--surface-text)' }">
                  {{ item.title }}
                </h4>
                <p class="mt-1 text-sm leading-snug" :style="{ color: 'var(--surface-text-sub)' }">{{ item.desc }}</p>
              </div>
            </div>
          </div>

          <!-- CTA buttons -->
          <div class="mt-10 flex flex-wrap justify-center lg:justify-start gap-4" data-aos="fade-up"
            data-aos-delay="600">
            <component v-for="btn in ctaButtons" :key="btn.id" :is="btn.type === 'router' ? 'router-link' : 'a'"
              :to="btn.type === 'router' ? btn.to : null" :href="btn.type !== 'router' ? btn.to : null"
              class="cta group px-6 py-3 rounded-full inline-flex items-center font-semibold transition-all duration-300 cursor-pointer"
              :class="btn.variant === 'solid' ? 'cta-solid' : 'cta-outline'">
              <component v-if="btn.iconLeft" :is="btn.iconLeft"
                class="w-5 h-5 mr-2 group-hover:-translate-y-0.5 transition-transform" />
              {{ t(btn.text) }}
              <component v-if="btn.iconRight" :is="btn.iconRight"
                class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </component>
          </div>
        </div>

        <!-- ───────── RIGHT: images + slide pagination ───────── -->
        <div class="flex justify-center lg:justify-end" data-aos="fade-left">
          <div class="carousel relative w-full max-w-sm sm:max-w-md" :class="{ 'is-paused': isPaused }" role="region"
            aria-roledescription="carousel" aria-label="About me photos" tabindex="0" @mouseenter="hovered = true"
            @mouseleave="hovered = false" @focusin="hovered = true" @focusout="hovered = false"
            @keydown.left.prevent="prev" @keydown.right.prevent="next">

            <!-- Experience badge -->
            <div class="exp-badge absolute -top-4 -left-2 sm:-left-4 z-40 rounded-2xl px-4 py-2 shadow-xl border">
              <span class="text-white text-xs sm:text-sm font-bold whitespace-nowrap">
                {{ t('two_years_experience') }}
              </span>
            </div>

            <!-- Card deck -->
            <div class="deck relative aspect-[4/5] mr-6 sm:mr-10 select-none" @pointerdown="onPointerDown"
              @pointerup="onPointerUp" @pointercancel="swipeStartX = null">
              <article v-for="(image, i) in slides" :key="image.id" class="deck-slide rounded-3xl p-1 shadow-2xl"
                :class="{ 'is-front': i === active }" :style="[slideStyle(i), { background: image.gradient }]"
                :aria-hidden="i !== active" :aria-label="`${i + 1} of ${total}`" role="group"
                aria-roledescription="slide" @click="i !== active && go(i)">
                <div class="relative w-full h-full overflow-hidden rounded-[1.25rem]">
                  <img :src="image.src" :alt="image.alt" :loading="i === 0 ? 'eager' : 'lazy'" draggable="false"
                    class="w-full h-full object-cover" @error="onImgError(image.id)" />
                  <div class="slide-dim absolute inset-0"></div>
                  <div class="slide-fade absolute inset-x-0 bottom-0 h-1/2"></div>

                  <div class="slide-meta">
                    <span
                      class="absolute top-3 right-3 text-white text-[10px] px-2.5 py-1 rounded-full font-semibold shadow-lg"
                      :style="{ backgroundColor: image.badgeColor }">
                      {{ image.badge }}
                    </span>

                    <div class="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                      <h3 class="text-xl font-bold drop-shadow">{{ image.alt }}</h3>
                      <span class="text-sm font-semibold tabular-nums opacity-80">
                        {{ pad(i + 1) }} / {{ pad(total) }}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            <!-- Pagination -->
            <div class="mt-8 mr-6 sm:mr-10 flex items-center justify-between gap-3">
              <button type="button" class="ctrl-btn" aria-label="Previous slide" @click="prev">
                <ChevronLeftIcon class="w-5 h-5" />
              </button>

              <div class="flex flex-1 items-center justify-center gap-1.5" role="tablist" aria-label="Choose slide">
                <button v-for="(image, i) in slides" :key="image.id" type="button" class="dot" role="tab"
                  :class="{ 'is-active': i === active }" :aria-selected="i === active" :aria-label="`Show ${image.alt}`"
                  @click="go(i)">
                  <span v-if="i === active" :key="active" class="dot-fill" @animationend="next"></span>
                </button>
              </div>

              <div class="flex items-center gap-2">
                <button type="button" class="ctrl-btn" :aria-label="userPaused ? 'Play slideshow' : 'Pause slideshow'"
                  @click="userPaused = !userPaused">
                  <PlayIcon v-if="userPaused" class="w-4 h-4" />
                  <PauseIcon v-else class="w-4 h-4" />
                </button>
                <button type="button" class="ctrl-btn" aria-label="Next slide" @click="next">
                  <ChevronRightIcon class="w-5 h-5" />
                </button>
              </div>
            </div>

            <!-- Languages -->
            <div class="lang-card mt-6 mr-6 sm:mr-10 rounded-2xl border p-4">
              <div class="flex items-center gap-2 mb-3" :style="{ color: 'var(--accent-text)' }">
                <LanguageIcon class="w-4 h-4" />
                <span class="text-xs font-semibold uppercase tracking-wider">Languages</span>
              </div>
              <div class="flex flex-wrap gap-2">
                <span v-for="lang in languages" :key="lang" class="tech-chip">{{ lang }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- ───────── Tech stack marquee (full width · drag, inertia, hover-pause) ───────── -->
    <div class="relative z-10 w-full mt-16 md:mt-20 flex flex-col gap-4 select-none" role="group"
      aria-label="Tech stack">
      <div v-for="(row, ri) in TECH_ROWS" :key="ri" class="marquee" :class="{ 'is-dragging': rowState[ri].dragging }"
        @pointerdown="onMarqueeDown($event, ri)" @pointermove="onMarqueeMove($event, ri)"
        @pointerup="onMarqueeUp($event, ri)" @pointercancel="onMarqueeUp($event, ri)"
        @pointerenter="onMarqueeEnter($event, ri)" @pointerleave="onMarqueeLeave($event, ri)">
        <div class="marquee-track" :ref="(el) => (trackEls[ri] = el)">
          <div v-for="copy in 2" :key="copy" class="marquee-group" :aria-hidden="copy === 2">
            <template v-for="g in row.groups" :key="g.label">
              <span class="marquee-label"><i class="marquee-label-dot"></i>{{ g.label }}</span>
              <span v-for="item in g.items" :key="item" class="marquee-chip">
                <span class="marquee-icon" :class="iconFor(item) ? 'has-img' : 'is-mono'">
                  <img v-if="iconFor(item)" :src="iconFor(item)" :alt="item" loading="lazy" draggable="false"
                    referrerpolicy="no-referrer" @error="iconFail(item)" />
                  <b v-else class="marquee-mono">{{ mono(item) }}</b>
                </span>
                {{ item }}
              </span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue';
import {
  ArrowRightIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CodeBracketSquareIcon,
  LanguageIcon,
  MegaphoneIcon,
  PaintBrushIcon,
  PauseIcon,
  PlayIcon,
  ServerIcon,
  SparklesIcon,
} from '@heroicons/vue/16/solid';

import about1 from '/professional.jpg';
import about2 from '/creative.jpg';
import about3 from '/developer.jpg';
import about4 from '/designer.jpg';

import { t } from './../stores/languages';

/* ───────── Slides ───────── */

const unsplash = id =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&h=1000&q=80`;

const slide = (id, src, alt, badge, from, to) => ({
  id, src, alt, badge,
  gradient: `linear-gradient(135deg, var(${from}), var(${to}))`,
  badgeColor: `var(${from})`,
});

const aboutImage = [
  // Your own photos
  slide(1, about1, 'Professional', 'Professional', '--accent-mid-dark', '--accent-to-mid'),
  slide(2, about2, 'Creative', 'Creative', '--accent-mid', '--accent-to-mid'),
  slide(3, about3, 'Developer', 'Developer', '--accent-mid', '--accent-to-mid'),
  slide(4, about4, 'Design', 'Design', '--accent-mid-dark', '--accent-to-dark'),
  // Stock photos (Unsplash). Swap in your own files anytime.
  slide(5, unsplash('photo-1555066931-4365d14bab8c'), 'Workspace', 'Setup', '--accent-mid-dark', '--accent-to-dark'),
  slide(6, unsplash('photo-1498050108023-c5249f4df085'), 'Clean Code', 'Code', '--accent-mid', '--accent-to-dark'),
  slide(7, unsplash('photo-1522071820081-009f0129c71c'), 'Teamwork', 'Team', '--accent-mid-dark', '--accent-to-mid'),
  slide(8, unsplash('photo-1561070791-2526d30994b5'), 'Visual Design', 'UI/UX', '--accent-mid', '--accent-to-mid'),
];

// If a remote image fails to load, drop that slide instead of showing a broken picture.
const failed = ref(new Set());
const onImgError = id => { failed.value = new Set(failed.value).add(id); };
const slides = computed(() => aboutImage.filter(s => !failed.value.has(s.id)));
const total = computed(() => slides.value.length);

/* ───────── Content ───────── */

const WHAT_I_DO = [
  {
    id: 1, icon: CodeBracketSquareIcon, iconColor: 'var(--icon-accent)',
    title: 'Build',
    desc: 'Web apps and dashboards with Vue or React, Node and SQL.',
  },
  {
    id: 2, icon: PaintBrushIcon, iconColor: 'var(--icon-accent-2)',
    title: 'Design',
    desc: 'UI/UX and responsive layouts, prototyped in Figma.',
  },
  {
    id: 3, icon: ServerIcon, iconColor: 'var(--icon-accent)',
    title: 'Implement',
    desc: 'System rollouts and POS setups for real businesses.',
  },
  {
    id: 4, icon: ChartBarIcon, iconColor: 'var(--icon-accent-2)',
    title: 'Data & Reports',
    desc: 'Data support and dashboards with SQL, Power BI and Tableau.',
  },
  {
    id: 5, icon: MegaphoneIcon, iconColor: 'var(--icon-accent)',
    title: 'Automate',
    desc: 'Email marketing and notifications with Mautic, OneSignal and bots.',
  },
  {
    id: 6, icon: SparklesIcon, iconColor: 'var(--icon-accent-2)',
    title: 'AI-Assisted',
    desc: 'Faster, cleaner delivery with Claude, Gemini and ChatGPT.',
  },
];

const languages = ['Khmer', 'English', 'Chinese', 'French', 'Lao'];

const ctaButtons = [
  { id: 1, text: 'view_portfolio', iconRight: ArrowRightIcon, variant: 'solid', to: '#projects', type: 'anchor' },
  { id: 2, text: 'contact_me', iconLeft: ChatBubbleLeftRightIcon, variant: 'outline', to: '#contact', type: 'anchor' },
  { id: 3, text: 'see_more', iconRight: ArrowRightIcon, variant: 'outline', to: '/details', type: 'router' },
];

/* ───────── Carousel ───────── */

const active = ref(0);
const hovered = ref(false);
const userPaused = ref(false);
const isPaused = computed(() => hovered.value || userPaused.value);

const pad = n => String(n).padStart(2, '0');

// Autoplay is driven by the CSS progress bar: when it finishes (animationend) we advance.
// Pausing = pausing the animation, so the bar and the slide never drift apart.
const go = i => { active.value = (i + total.value) % total.value; };
const next = () => go(active.value + 1);
const prev = () => go(active.value - 1);

watch(total, n => { if (active.value >= n) active.value = 0; });

// Stacked-deck look: front card + two tilted cards peeking out behind it.
const DECK = [
  { x: 0, y: 0, s: 1, r: 0, o: 1, z: 30 },
  { x: 6, y: 3, s: 0.95, r: 3, o: 0.9, z: 20 },
  { x: 12, y: 6, s: 0.9, r: 6, o: 0.6, z: 10 },
];
const HIDDEN = { x: 16, y: 8, s: 0.85, r: 8, o: 0, z: 0 };

function slideStyle(i) {
  const offset = (i - active.value + total.value) % total.value;
  const p = DECK[offset] ?? HIDDEN;
  return {
    transform: `translate(${p.x}%, ${p.y}%) scale(${p.s}) rotate(${p.r}deg)`,
    opacity: p.o,
    zIndex: p.z,
    pointerEvents: offset === 0 || offset > 2 ? 'none' : 'auto',
    cursor: offset === 0 ? 'grab' : 'pointer',
  };
}

// Swipe support
const swipeStartX = ref(null);
const onPointerDown = e => { swipeStartX.value = e.clientX; };
const onPointerUp = e => {
  if (swipeStartX.value === null) return;
  const dx = e.clientX - swipeStartX.value;
  swipeStartX.value = null;
  if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
};

/* ───────── Tech logos: your own SVG files ─────────
   Put them in  src/assets/techstack/  . The file name only has to be close to the tech name:
   vue.svg, vuejs.svg, Vue.js.svg, vue-js.svg … all match "Vue.js" (case, dots, dashes, spaces ignored).
   Vite bundles them, so nothing is loaded from a CDN.
   In dev, the browser console lists techs with no matching file and files that were not used,
   so you can rename them. A tech with no file shows a letter badge. */

const LOGO_FILES = import.meta.glob('../assets/techstack/**/*.{svg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const norm = (s) =>
  s.toLowerCase().replace(/\+/g, 'plus').replace(/#/g, 'sharp').replace(/[^a-z0-9]/g, '');

// normalized file name → url     ('Vue.js.svg' → 'vuejs')
const LOGOS = {};
for (const [file, url] of Object.entries(LOGO_FILES)) {
  LOGOS[norm(file.split('/').pop().replace(/\.[^.]+$/, ''))] = url;
}

// Other file names to try when a file is not named exactly like the chip.
const ALIASES = {
  'HTML': ['html5'],
  'CSS': ['css3'],
  'C++': ['cpp'],
  'C#': ['cs', 'dotnet'],
  'SQL': ['database', 'db'],
  'Tailwind CSS': ['tailwind', 'tailwindcss'],
  'REST API': ['api', 'rest', 'restful'],
  'NeonDB': ['neon'],
  'PrismaORM': ['prisma'],
  'TelegramBot': ['telegram'],
  'ChatGPT': ['openai', 'gpt'],
  'Gemini': ['googlegemini'],
  'VS Code': ['vscode', 'visualstudiocode'],
  'Power BI': ['powerbi'],
  'WAMP': ['wampserver'],
  'Word': ['msword', 'microsoftword'],
  'Excel': ['msexcel', 'microsoftexcel'],
  'PowerPoint': ['ppt', 'mspowerpoint', 'microsoftpowerpoint'],
  'Microsoft Office': ['office', 'office365', 'microsoft365', 'm365'],
  'Google Docs': ['docs'],
  'Google Sheets': ['googlesheet', 'sheets', 'sheet'],
  'Google Slides': ['slides'],
  'Google Workspace': ['googledrive', 'google'],
  'Google Workspace': ['workspace', 'gsuite'],
  'Photoshop': ['adobephotoshop', 'ps'],
};

// Tries: exact name, aliases, then the name without a trailing "js"/"css" (Vue.js → vue)
const logoUrl = (name) => {
  const keys = [name, ...(ALIASES[name] || [])].map(norm);
  keys.push(norm(name).replace(/(js|css)$/, ''));
  const hit = keys.find((k) => k && LOGOS[k]);
  return hit ? LOGOS[hit] : null;
};

const iconBad = ref(new Set());   // files that failed to load → letter badge
const iconFor = (name) => (iconBad.value.has(name) ? null : logoUrl(name));
const iconFail = (name) => { iconBad.value = new Set(iconBad.value).add(name); };

// Dev helper: tells you which names/files don't line up (runs once, after setup)
function reportLogos() {
  const names = TECH_ROWS.flatMap((r) => r.groups.flatMap((g) => g.items));
  const missing = names.filter((n) => !logoUrl(n));
  const used = new Set(names.map(logoUrl).filter(Boolean));
  const unused = Object.entries(LOGO_FILES)
    .filter(([, url]) => !used.has(url))
    .map(([file]) => file.split('/').pop());
  if (missing.length) console.warn('[About] no logo file in src/assets/techstack/ for:', missing.join(', '));
  if (unused.length) console.info('[About] files in techstack/ that no chip uses:', unused.join(', '));
}
if (import.meta.env.DEV) queueMicrotask(reportLogos);

/* ───────── Tech stack (organized by area) ─────────
   speed = pixels per second (higher = faster). Row 2 moves the opposite way.
   Each item is matched to a file in src/assets/techstack/ (see the logo section above). */

const TECH_ROWS = [
  {
    speed: 45,
    groups: [
      { label: 'Languages', items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Python', 'Java', 'C', 'C++', 'C#', 'Dart', 'SQL'] },
      { label: 'Frontend', items: ['Vue.js', 'React.js', 'jQuery', 'Bootstrap', 'Tailwind CSS', 'Flutter'] },
      { label: 'Backend', items: ['Node.js', 'Express.js', 'Laravel', 'REST API'] },
      { label: 'Databases', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'NeonDB', 'PrismaORM', 'Firebase'] },
    ],
  },
  {
    speed: 40,
    groups: [
      { label: 'Version control', items: ['Git', 'GitHub', 'GitLab'] },
      { label: 'Deploy & DevOps', items: ['Docker', 'Vercel', 'Render', 'Netlify'] },
      { label: 'API & Integrations', items: ['Postman', 'EmailJS', 'TelegramBot'] },
      { label: 'CMS & Marketing', items: ['WordPress', 'Mautic', 'OneSignal'] },
      { label: 'AI tools', items: ['Claude', 'ChatGPT', 'Gemini'] },
      { label: 'Design & Data', items: ['Figma', 'Canva', 'Power BI', 'Tableau'] },
      { label: 'Dev tools', items: ['VS Code', 'Navicat', 'WAMP'] },
      { label: 'Office & Media', items: ['Word', 'Excel', 'PowerPoint', 'Microsoft Office', 'Google Docs', 'Google Sheets', 'Google Slides', 'Google Workspace', 'Photoshop', 'YouTube', 'Notion'] },
    ],
  },
];

// Letter badge shown when a logo is missing or every source failed to load
const mono = (name) =>
  name.split(/[\s.]+/).filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase();

/* ───────── Marquee engine (JS-driven: drag, inertia, hover-pause) ───────── */

const trackEls = [];
const rowState = TECH_ROWS.map((r, i) => reactive({
  x: 0,
  dir: i % 2 ? 1 : -1,     // row 1 moves left, row 2 moves right
  speed: r.speed,
  width: 0,                // width of one group (the loop length)
  hover: false,
  dragging: false,
  vel: 0,                  // inertia px/s
  lastX: 0,
  lastT: 0,
}));

let marqueeRaf = null;
let marqueeLast = 0;
let marqueeInView = true;
let reduceMotion = false;
let marqueeIO = null;
let marqueeRO = null;
let motionMQ = null;
let onMotionChange = null;

const REDUCED_FACTOR = 0.35;   // reduced-motion users still see slow movement (0 = fully stopped)

function measureMarquee() {
  trackEls.forEach((el, i) => {
    if (el && el.firstElementChild) rowState[i].width = el.firstElementChild.offsetWidth;
  });
}

function marqueeTick(now) {
  marqueeRaf = requestAnimationFrame(marqueeTick);
  const dt = Math.min(0.05, (now - marqueeLast) / 1000);
  marqueeLast = now;
  if (!marqueeInView) return;

  rowState.forEach((s, i) => {
    const el = trackEls[i];
    if (!el || !s.width) return;

    if (!s.dragging) {
      // inertia from a swipe, decaying smoothly
      if (s.vel) {
        s.x += s.vel * dt;
        s.vel *= Math.pow(0.04, dt);
        if (Math.abs(s.vel) < 1) s.vel = 0;
      }
      // auto drift (paused while hovering with a mouse)
      if (!s.hover) {
        s.x += s.dir * s.speed * (reduceMotion ? REDUCED_FACTOR : 1) * dt;
      }
    }

    // seamless wrap: keep x within (-width, 0]
    s.x %= s.width;
    if (s.x > 0) s.x -= s.width;

    el.style.transform = `translate3d(${s.x}px, 0, 0)`;
  });
}

function onMarqueeEnter(e, i) { if (e.pointerType === 'mouse') rowState[i].hover = true; }
function onMarqueeLeave(e, i) { if (e.pointerType === 'mouse') rowState[i].hover = false; }

function onMarqueeDown(e, i) {
  const s = rowState[i];
  s.dragging = true;
  s.vel = 0;
  s.lastX = e.clientX;
  s.lastT = performance.now();
  e.currentTarget.setPointerCapture(e.pointerId);
}

function onMarqueeMove(e, i) {
  const s = rowState[i];
  if (!s.dragging) return;
  const now = performance.now();
  const dx = e.clientX - s.lastX;
  const dtMs = Math.max(1, now - s.lastT);
  s.x += dx;
  s.vel = s.vel * 0.6 + (dx / dtMs * 1000) * 0.4;   // smoothed release speed
  s.lastX = e.clientX;
  s.lastT = now;
}

function onMarqueeUp(e, i) {
  const s = rowState[i];
  s.dragging = false;
  try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* not captured */ }
}

onMounted(() => {
  motionMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  reduceMotion = motionMQ.matches;
  onMotionChange = (e) => { reduceMotion = e.matches; };
  motionMQ.addEventListener('change', onMotionChange);

  measureMarquee();
  marqueeRO = new ResizeObserver(measureMarquee);
  trackEls.forEach((el) => el && marqueeRO.observe(el));
  window.addEventListener('load', measureMarquee);
  document.fonts?.ready.then(measureMarquee);

  // pause when the section is off-screen
  marqueeIO = new IntersectionObserver(
    ([entry]) => { marqueeInView = entry.isIntersecting; },
    { threshold: 0 }
  );
  const sec = document.getElementById('about');
  if (sec) marqueeIO.observe(sec);

  marqueeLast = performance.now();
  marqueeRaf = requestAnimationFrame(marqueeTick);
});

onUnmounted(() => {
  cancelAnimationFrame(marqueeRaf);
  marqueeIO?.disconnect();
  marqueeRO?.disconnect();
  window.removeEventListener('load', measureMarquee);
  motionMQ?.removeEventListener('change', onMotionChange);
});
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>

<style scoped>
/* ── Background glows ── */
.about-glow {
  position: absolute;
  width: 32rem;
  height: 32rem;
  border-radius: 9999px;
  filter: blur(80px);
  opacity: 0.5;
}

.about-glow-a {
  top: -8rem;
  right: -8rem;
  background: color-mix(in srgb, var(--accent-text) 18%, transparent);
}

.about-glow-b {
  bottom: -10rem;
  left: -10rem;
  background: color-mix(in srgb, var(--accent-to-mid) 16%, transparent);
}

/* ── What-I-do cards ── */
.about-card {
  background-color: var(--surface-card);
  border-color: var(--surface-border);
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
}

.about-card:hover {
  border-color: var(--accent-text);
  transform: translateY(-3px);
  box-shadow: 0 14px 30px -18px var(--accent-shadow);
}

/* ── CTA buttons ── */
.cta-solid {
  background: var(--cta-gradient);
  color: #fff;
  box-shadow: 0 10px 30px -10px var(--accent-shadow);
}

.cta-solid:hover {
  filter: brightness(1.15);
  transform: translateY(-2px);
}

.cta-outline {
  border: 1px solid var(--accent-text);
  color: var(--accent-text);
  background-color: transparent;
}

.cta-outline:hover {
  background-color: var(--accent-bg);
  transform: translateY(-2px);
}

/* ── Carousel ── */
.carousel:focus-visible {
  outline: 2px solid var(--accent-text);
  outline-offset: 8px;
  border-radius: 1.5rem;
}

.exp-badge {
  background: var(--cta-gradient);
  border-color: var(--accent-border);
}

.deck {
  touch-action: pan-y;
}

.deck-slide {
  position: absolute;
  inset: 0;
  transform-origin: 50% 100%;
  transition:
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.5s ease;
  will-change: transform, opacity;
}

.slide-fade {
  background: linear-gradient(to top, rgb(0 0 0 / 0.65), transparent);
}

/* Cards behind the front one: dimmed, no text */
.slide-dim {
  background: rgb(0 0 0 / 0.45);
  opacity: 1;
  transition: opacity 0.5s ease;
}

.slide-meta {
  transition: opacity 0.4s ease;
}

.deck-slide:not(.is-front) .slide-meta,
.deck-slide:not(.is-front) .slide-fade {
  opacity: 0;
}

.deck-slide.is-front .slide-dim {
  opacity: 0;
}

/* Prev / next / play buttons */
.ctrl-btn {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
  border-radius: 9999px;
  border: 1px solid var(--accent-border);
  color: var(--accent-text);
  background: color-mix(in srgb, var(--surface-bg-3) 80%, transparent);
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.ctrl-btn:hover {
  background-color: var(--accent-bg);
  transform: translateY(-2px);
}

.ctrl-btn:focus-visible,
.dot:focus-visible {
  outline: 2px solid var(--accent-text);
  outline-offset: 2px;
}

/* Pagination dots with autoplay progress */
.dot {
  position: relative;
  width: 0.5rem;
  height: 0.375rem;
  border-radius: 9999px;
  overflow: hidden;
  background: color-mix(in srgb, var(--accent-text) 28%, transparent);
  transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.2s ease;
}

.dot:hover {
  background: color-mix(in srgb, var(--accent-text) 55%, transparent);
}

.dot.is-active {
  width: 2rem;
}

.dot-fill {
  position: absolute;
  inset: 0;
  transform-origin: left center;
  background: var(--cta-gradient);
  animation: dot-progress 5s linear forwards;
}

.carousel.is-paused .dot-fill {
  animation-play-state: paused;
}

@keyframes dot-progress {
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
}

/* ── Languages card ── */
.lang-card {
  background-color: var(--surface-card);
  border-color: var(--surface-border);
}

.tech-chip {
  display: inline-block;
  white-space: nowrap;
  border-radius: 9999px;
  border: 1px solid var(--accent-border);
  padding: 0.35rem 0.9rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--surface-text);
  background: color-mix(in srgb, var(--surface-bg-3) 80%, transparent);
}

/* ── Tech marquee (moved by JS, not CSS animation) ── */
.marquee {
  overflow: hidden;
  padding: 6px 0;
  /* room for the hover lift + glow */
  cursor: grab;
  touch-action: pan-y;
  /* swipe sideways = drag, vertical = scroll page */
  -webkit-mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
  mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
}

.marquee.is-dragging {
  cursor: grabbing;
}

.marquee-track {
  display: flex;
  width: max-content;
  will-change: transform;
}

.marquee-group {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-right: 12px;
}

/* group name: small accent pill that separates the sections */
.marquee-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 6px 0 18px;
  padding: 6px 12px;
  border-radius: 9999px;
  white-space: nowrap;
  font: 700 10px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent-text);
  background: var(--accent-bg);
  border: 1px solid color-mix(in srgb, var(--accent-text) 30%, transparent);
}

.marquee-label-dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: var(--cta-gradient);
  box-shadow: 0 0 8px var(--accent-mid);
}

.marquee-chip {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 18px 8px 9px;
  border-radius: 9999px;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: var(--surface-text);
  border: 1px solid var(--accent-border);
  background: linear-gradient(180deg,
      color-mix(in srgb, var(--surface-card) 92%, transparent),
      color-mix(in srgb, var(--accent-from) 7%, var(--surface-card)));
  box-shadow: 0 6px 18px -12px var(--accent-shadow);
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease, background 0.25s ease;
}

.marquee-chip:hover {
  border-color: var(--accent-text);
  background: linear-gradient(180deg,
      color-mix(in srgb, var(--accent-from) 14%, var(--surface-card)),
      color-mix(in srgb, var(--accent-from) 22%, var(--surface-card)));
  box-shadow: 0 12px 26px -12px var(--accent-shadow), 0 0 0 3px color-mix(in srgb, var(--accent-text) 16%, transparent);
  transform: translateY(-3px);
}

.marquee-icon {
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 9px;
}

/* light tile so dark logos (GitHub, Express…) stay visible on dark themes */
.marquee-icon.has-img {
  /*
  background: rgba(255, 255, 255, 0.94);
  padding: 4px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.06);
  */
  background: transparent;
  padding: 0;
  box-shadow: none;
}

.marquee-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* no logo or every source failed → letter badge in the accent gradient */
.marquee-icon.is-mono {
  background: var(--cta-gradient);
  box-shadow: 0 4px 12px -6px var(--accent-shadow);
}

.marquee-mono {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.02em;
  color: #fff;
}

/* ── Reduced motion: no autoplay, no movement ── */
@media (prefers-reduced-motion: reduce) {

  .about-card,
  .cta,
  .ctrl-btn,
  .dot,
  .deck-slide,
  .marquee-chip {
    transition: none;
  }

  .dot-fill {
    animation: none;
    transform: scaleX(1);
  }

  .about-card:hover,
  .cta-solid:hover,
  .cta-outline:hover,
  .ctrl-btn:hover,
  .marquee-chip:hover {
    transform: none;
  }
}
</style>
