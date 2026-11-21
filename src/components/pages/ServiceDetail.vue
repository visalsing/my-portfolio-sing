<template>
  <section v-if="service" class="min-h-screen pt-28 pb-20 relative overflow-hidden"
    :style="{ backgroundColor: 'var(--bg-color)', color: 'var(--surface-text)' }">

    <!-- soft background glows -->
    <div aria-hidden="true"
      class="absolute top-[-12%] right-[-10%] w-[480px] h-[480px] opacity-20 blur-[140px] rounded-full pointer-events-none"
      :style="{ backgroundColor: 'var(--accent-glow)' }"></div>
    <div aria-hidden="true"
      class="absolute bottom-[-8%] left-[-8%] w-[320px] h-[320px] opacity-10 blur-[120px] rounded-full pointer-events-none"
      :style="{ backgroundColor: 'var(--icon-accent)' }"></div>

    <div class="max-w-5xl mx-auto px-5 sm:px-6 relative z-10">

      <!-- Breadcrumb + copy link -->
      <div class="flex flex-wrap items-center justify-between gap-3">
        <nav class="flex flex-wrap items-center gap-1.5 text-sm" aria-label="Breadcrumb"
          :style="{ color: 'var(--surface-text-sub)' }">
          <router-link to="/services" class="crumb inline-flex items-center gap-1.5">
            <ArrowLeftIcon class="w-4 h-4" /> Services
          </router-link>
          <ChevronRightIcon class="w-3.5 h-3.5 opacity-50" />
          <span>{{ category.name }}</span>
        </nav>

        <button type="button" class="share-btn" @click="copyLink">
          <component :is="copied ? CheckIcon : LinkIcon" class="w-4 h-4" />
          {{ copied ? 'Link copied' : 'Copy link' }}
        </button>
      </div>

      <!-- Banner image -->
      <div class="hero mt-6" data-aos="fade-up">
        <img v-if="heroImage" :key="service.id" :src="heroImage" :alt="service.name" class="hero-img"
          @error="imgFailed = true" />
        <div v-else class="hero-fallback" aria-hidden="true">
          <component :is="service.icon" class="w-20 h-20" />
        </div>
        <div class="hero-shade" aria-hidden="true"></div>
        <span class="icon-tile hero-icon" aria-hidden="true">
          <component :is="service.icon" class="w-7 h-7" />
        </span>
      </div>

      <!-- Header -->
      <header class="mt-6" data-aos="fade-up">
        <div class="flex flex-wrap items-center gap-2">
          <span class="eyebrow">{{ category.name }}</span>
          <span class="status" :class="`st-${status.key}`">
            <i class="status-dot"></i>{{ status.label }}
          </span>
        </div>
        <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight mt-2 leading-tight">
          {{ service.name }}
        </h1>
        <p class="mt-3 text-base md:text-lg leading-relaxed max-w-2xl" :style="{ color: 'var(--surface-text-sub)' }">
          {{ service.summary }}
        </p>
      </header>

      <div class="mt-10 grid lg:grid-cols-[1fr_300px] gap-6 items-start">

        <!-- ───────── Main column ───────── -->
        <div class="flex flex-col gap-6">

          <!-- About -->
          <div v-if="description" class="panel" data-aos="fade-up">
            <h2 class="panel-title">About this service</h2>
            <p class="mt-4 leading-relaxed">{{ description }}</p>
          </div>

          <!-- What you get -->
          <div class="panel" data-aos="fade-up">
            <h2 class="panel-title">What you get</h2>

            <ul class="mt-4 flex flex-col gap-3">
              <li v-for="d in firstDetails" :key="d" class="flex items-start gap-3">
                <span class="tick" aria-hidden="true"><CheckIcon class="w-3.5 h-3.5" /></span>
                <span class="leading-relaxed">{{ d }}</span>
              </li>
            </ul>

            <!-- extra points slide open/closed (class is NOT called "collapse": Tailwind uses that name) -->
            <div v-if="extraDetails.length" class="reveal" :class="{ 'is-open': showAllDetails }"
              :inert="!showAllDetails ? '' : null">
              <div class="reveal-inner">
                <ul class="flex flex-col gap-3 pt-3">
                  <li v-for="d in extraDetails" :key="d" class="flex items-start gap-3">
                    <span class="tick" aria-hidden="true"><CheckIcon class="w-3.5 h-3.5" /></span>
                    <span class="leading-relaxed">{{ d }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <button v-if="extraDetails.length" type="button" class="more-btn" :aria-expanded="showAllDetails"
              @click="showAllDetails = !showAllDetails">
              {{ showAllDetails ? 'See less' : `See more (${extraDetails.length})` }}
              <component :is="showAllDetails ? ChevronUpIcon : ChevronDownIcon" class="w-4 h-4" />
            </button>
          </div>

          <!-- Tech & tools -->
          <div v-if="service.stack.length" class="panel" data-aos="fade-up" data-aos-delay="80">
            <h2 class="panel-title">{{ service.stackLabel }}</h2>
            <div class="mt-4 flex flex-wrap gap-2">
              <span v-for="tool in shownStack" :key="tool" class="chip">{{ tool }}</span>
              <button v-if="service.stack.length > STACK_PREVIEW" type="button" class="chip chip-btn"
                :aria-expanded="showAllStack" @click="showAllStack = !showAllStack">
                {{ showAllStack ? 'See less' : `+${service.stack.length - STACK_PREVIEW} more` }}
              </button>
            </div>
          </div>

          <!-- How it works (only for services that are on offer) -->
          <div v-if="service.status === 1 || service.status === 2" class="panel" data-aos="fade-up"
            data-aos-delay="120">
            <h2 class="panel-title">How it works</h2>
            <ol class="mt-4 grid sm:grid-cols-2 gap-4">
              <li v-for="(step, i) in STEPS" :key="step.title" class="flex items-start gap-3">
                <span class="step-num" aria-hidden="true">{{ i + 1 }}</span>
                <div>
                  <p class="font-semibold">{{ step.title }}</p>
                  <p class="mt-0.5 text-sm leading-relaxed" :style="{ color: 'var(--surface-text-sub)' }">
                    {{ step.text }}
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>

        <!-- ───────── Side column ───────── -->
        <aside class="flex flex-col gap-6" data-aos="fade-up" data-aos-delay="120">

          <!-- Status + CTA -->
          <div class="panel">
            <div class="flex items-center justify-between gap-3">
              <span class="status" :class="`st-${status.key}`"><i class="status-dot"></i>{{ status.label }}</span>
              <span class="text-xs uppercase tracking-wider opacity-60">{{ service.type }}</span>
            </div>
            <p class="mt-3 text-sm leading-relaxed" :style="{ color: 'var(--surface-text-sub)' }">
              {{ status.hint }}
            </p>
            <router-link :to="{ path: '/', hash: '#contact' }" class="cta-btn mt-5">
              {{ ctaLabel }} <ArrowRightIcon class="w-4 h-4" />
            </router-link>
          </div>

          <!-- More in this category -->
          <div v-if="related.length" class="panel">
            <h2 class="panel-title">More in {{ category.name }}</h2>
            <ul class="mt-3 flex flex-col">
              <li v-for="r in related" :key="r.id">
                <router-link :to="`/services/detail/${r.id}`" class="related">
                  <component :is="r.icon" class="w-4 h-4 shrink-0 opacity-70" />
                  <span class="truncate">{{ r.name }}</span>
                  <i class="status-dot ml-auto shrink-0" :class="`st-${STATUS[r.status].key}`"
                    :title="STATUS[r.status].label"></i>
                </router-link>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <!-- Previous / next service -->
      <nav class="pager mt-12" aria-label="Other services">
        <router-link v-if="prev" :to="`/services/detail/${prev.id}`" class="pager-link">
          <ChevronLeftIcon class="w-5 h-5 shrink-0" />
          <span class="min-w-0">
            <span class="pager-label">Previous</span>
            <span class="pager-name truncate">{{ prev.name }}</span>
          </span>
        </router-link>
        <span v-else></span>

        <router-link v-if="next" :to="`/services/detail/${next.id}`" class="pager-link pager-next">
          <span class="min-w-0">
            <span class="pager-label">Next</span>
            <span class="pager-name truncate">{{ next.name }}</span>
          </span>
          <ChevronRightIcon class="w-5 h-5 shrink-0" />
        </router-link>
      </nav>
    </div>
  </section>

  <section v-else class="min-h-screen flex items-center justify-center" :style="{ backgroundColor: 'var(--bg-color)' }">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-[var(--surface-text)]">Service not found</h2>
      <router-link to="/services" class="mt-4 inline-block text-[var(--accent-text)]">Back to all services</router-link>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import {
  ArrowLeftIcon, ArrowRightIcon, CheckIcon, LinkIcon,
  ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon,
} from '@heroicons/vue/24/outline';
import { SERVICES, STATUS, getService, getCategory, servicesByCategory } from '../../data/services';
import { IMAGES, DESCRIPTIONS } from '../../data/serviceExtras';

const route = useRoute();

const service = computed(() => getService(route.params.id));
const category = computed(() => (service.value ? getCategory(service.value.category) : null));
const status = computed(() => STATUS[service.value?.status ?? 1]);
const related = computed(() =>
  service.value ? servicesByCategory(service.value.category).filter(x => x.id !== service.value.id) : []
);

/* ───────── Banner image + description ───────── */
const imgFailed = ref(false);
const heroImage = computed(() => (imgFailed.value ? null : IMAGES[service.value?.id] || null));
const description = computed(() => DESCRIPTIONS[service.value?.id] || '');

/* ───────── Call to action follows the status ───────── */
const CTA = {
  1: "Let's collaborate",
  2: 'Discuss a small project',
  3: 'Ask about availability',
  0: 'Ask about this service',
};
const ctaLabel = computed(() => CTA[service.value?.status] ?? CTA[1]);

/* ───────── How it works (edit these to match how you really work) ───────── */
const STEPS = [
  { title: 'Discuss', text: 'We talk through your goal, scope and timeline.' },
  { title: 'Plan', text: 'I outline the approach, the milestones and what you will receive.' },
  { title: 'Build', text: 'I work in small steps and share progress along the way.' },
  { title: 'Deliver', text: 'Handover with notes, so you can run and extend it.' },
];

/* ───────── Previous / next (in the same order as services.js) ───────── */
const index = computed(() => SERVICES.findIndex(x => x.id === service.value?.id));
const prev = computed(() => (index.value > 0 ? SERVICES[index.value - 1] : null));
const next = computed(() => (index.value >= 0 ? SERVICES[index.value + 1] ?? null : null));

/* ───────── "See more / See less" ─────────
   Show DETAILS_PREVIEW points. Only add the toggle when at least 2 points would be hidden;
   otherwise (e.g. 4 points in total) everything is simply shown. */
const DETAILS_PREVIEW = 3;
const MIN_HIDDEN = 2;
const STACK_PREVIEW = 6;
const showAllDetails = ref(false);
const showAllStack = ref(false);

const needsToggle = computed(() => service.value.details.length >= DETAILS_PREVIEW + MIN_HIDDEN);
const firstDetails = computed(() =>
  needsToggle.value ? service.value.details.slice(0, DETAILS_PREVIEW) : service.value.details
);
const extraDetails = computed(() =>
  needsToggle.value ? service.value.details.slice(DETAILS_PREVIEW) : []
);
const shownStack = computed(() =>
  showAllStack.value ? service.value.stack : service.value.stack.slice(0, STACK_PREVIEW)
);

/* ───────── Copy link ───────── */
const copied = ref(false);
let copiedTimer = null;

async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copied.value = true;
    clearTimeout(copiedTimer);
    copiedTimer = setTimeout(() => (copied.value = false), 1800);
  } catch {
    /* clipboard blocked: nothing to do */
  }
}

/* ───────── Page title ───────── */
const previousTitle = document.title;
watch(service, (s) => {
  if (s) document.title = `${s.name} | Services`;
}, { immediate: true });

onBeforeUnmount(() => {
  document.title = previousTitle;
  clearTimeout(copiedTimer);
});

// opening another service (More in …, Previous, Next) starts fresh
watch(() => route.params.id, () => {
  showAllDetails.value = false;
  showAllStack.value = false;
  imgFailed.value = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
</script>

<style scoped>
.crumb {
  transition: color 0.2s ease;
}

.crumb:hover {
  color: var(--accent-text);
}

.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--surface-text-sub);
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  transition: color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
}

.share-btn:hover {
  color: var(--accent-text);
  border-color: var(--accent-border-hover);
  background: var(--accent-bg);
}

/* ── Banner ── */
.hero {
  position: relative;
  height: 13rem;
  overflow: hidden;
  border-radius: 1.5rem;
  border: 1px solid var(--surface-border);
  background: var(--surface-bg-3);
}

@media (min-width: 640px) {
  .hero {
    height: 17rem;
  }
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-fallback {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  color: var(--icon-accent);
  background: linear-gradient(135deg, var(--icon-bg), var(--icon-bg-2));
}

.hero-fallback svg {
  opacity: 0.35;
}

.hero-shade {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent 60%);
}

.hero-icon {
  position: absolute;
  left: 1.25rem;
  bottom: 1.25rem;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* ── Header ── */
.icon-tile {
  display: grid;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 1rem;
  color: var(--icon-accent);
  border: 1px solid var(--accent-border);
  background: linear-gradient(to right, var(--icon-bg), var(--icon-bg-2));
  box-shadow: 0 10px 24px -14px var(--accent-shadow);
}

.eyebrow {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent-text);
}

/* ── Status colors (same on every page) ── */
.st-available {
  color: #34d399;
}

.st-learning {
  color: #fbbf24;
}

.st-paused {
  color: #94a3b8;
}

.st-planned {
  color: #f87171;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.2rem 0.65rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 700;
  border: 1px solid transparent;
}

.status-dot {
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background: currentColor;
}

.status.st-available {
  background: color-mix(in srgb, #34d399 14%, transparent);
  border-color: color-mix(in srgb, #34d399 35%, transparent);
}

.status.st-learning {
  background: color-mix(in srgb, #fbbf24 14%, transparent);
  border-color: color-mix(in srgb, #fbbf24 35%, transparent);
}

.status.st-paused {
  background: color-mix(in srgb, #94a3b8 14%, transparent);
  border-color: color-mix(in srgb, #94a3b8 35%, transparent);
}

.status.st-planned {
  background: color-mix(in srgb, #f87171 14%, transparent);
  border-color: color-mix(in srgb, #f87171 35%, transparent);
}

/* ── Panels ── */
.panel {
  padding: 1.25rem 1.5rem;
  border-radius: 1.25rem;
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
}

.panel-title {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--surface-text-sub);
}

.tick {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 1.4rem;
  height: 1.4rem;
  margin-top: 0.1rem;
  border-radius: 9999px;
  color: var(--accent-text);
  background: var(--accent-bg);
}

.step-num {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 700;
  color: #fff;
  background: var(--cta-gradient);
}

/* ── See more / See less (slide open and closed) ── */
.reveal {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition: grid-template-rows 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease;
}

.reveal.is-open {
  grid-template-rows: 1fr;
  opacity: 1;
}

.reveal-inner {
  min-height: 0;
  overflow: hidden;
}

.more-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent-text);
}

.more-btn:hover {
  text-decoration: underline;
}

/* ── Chips ── */
.chip {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.8rem;
  border-radius: 9999px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--surface-text);
  border: 1px solid var(--accent-border);
  background: color-mix(in srgb, var(--accent-from) 7%, transparent);
}

.chip-btn {
  cursor: pointer;
  color: var(--accent-text);
  border-style: dashed;
  transition: background-color 0.2s ease;
}

.chip-btn:hover {
  background: var(--accent-bg);
}

/* ── CTA ── */
.cta-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.85rem 1rem;
  border-radius: 0.9rem;
  font-weight: 700;
  color: #fff;
  background: var(--cta-gradient);
  box-shadow: 0 10px 30px -12px var(--accent-shadow);
  transition: filter 0.2s ease, transform 0.2s ease;
}

.cta-btn:hover {
  filter: brightness(1.12);
  transform: translateY(-2px);
}

/* ── Related list ── */
.related {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.5rem;
  border-radius: 0.6rem;
  font-size: 0.9rem;
  color: var(--surface-text);
  transition: background-color 0.2s ease, color 0.2s ease;
}

.related:hover {
  background: var(--accent-bg);
  color: var(--accent-text);
}

/* ── Previous / next ── */
.pager {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .pager {
    grid-template-columns: 1fr 1fr;
  }
}

.pager-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 1rem;
  color: var(--surface-text);
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
}

.pager-link:hover {
  border-color: var(--accent-border-hover);
  background: var(--accent-bg);
  transform: translateY(-2px);
}

.pager-next {
  justify-content: flex-end;
  text-align: right;
}

.pager-label {
  display: block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--surface-text-sub);
}

.pager-name {
  display: block;
  font-weight: 700;
}

@media (prefers-reduced-motion: reduce) {

  .cta-btn,
  .crumb,
  .related,
  .chip-btn,
  .share-btn,
  .pager-link,
  .reveal {
    transition: none;
  }

  .cta-btn:hover,
  .pager-link:hover {
    transform: none;
  }
}
</style>