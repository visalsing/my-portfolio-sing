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

      <!-- Breadcrumb -->
      <nav class="flex flex-wrap items-center gap-1.5 text-sm" aria-label="Breadcrumb"
        :style="{ color: 'var(--surface-text-sub)' }">
        <router-link to="/services" class="crumb inline-flex items-center gap-1.5">
          <ArrowLeftIcon class="w-4 h-4" /> Services
        </router-link>
        <ChevronRightIcon class="w-3.5 h-3.5 opacity-50" />
        <span>{{ category.name }}</span>
      </nav>

      <!-- Header -->
      <header class="mt-6 flex items-start gap-4 sm:gap-5" data-aos="fade-up">
        <span class="icon-tile shrink-0" aria-hidden="true">
          <component :is="service.icon" class="w-7 h-7" />
        </span>
        <div class="min-w-0">
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
        </div>
      </header>

      <div class="mt-10 grid lg:grid-cols-[1fr_300px] gap-6 items-start">

        <!-- ───────── Main column ───────── -->
        <div class="flex flex-col gap-6">

          <!-- What you get -->
          <div class="panel" data-aos="fade-up">
            <h2 class="panel-title">What you get</h2>
            <ul class="mt-4 flex flex-col gap-3">
              <li v-for="d in shownDetails" :key="d" class="flex items-start gap-3">
                <span class="tick" aria-hidden="true"><CheckIcon class="w-3.5 h-3.5" /></span>
                <span class="leading-relaxed">{{ d }}</span>
              </li>
            </ul>
            <button v-if="service.details.length > DETAILS_PREVIEW" type="button" class="more-btn"
              :aria-expanded="showAllDetails" @click="showAllDetails = !showAllDetails">
              {{ showAllDetails ? 'See less' : `See more (${service.details.length - DETAILS_PREVIEW})` }}
              <component :is="showAllDetails ? ChevronUpIcon : ChevronDownIcon" class="w-4 h-4" />
            </button>
          </div>

          <!-- Tech & tools -->
          <div v-if="service.stack.length" class="panel" data-aos="fade-up" data-aos-delay="80">
            <h2 class="panel-title">{{ service.stackLabel }}</h2>
            <div class="mt-4 flex flex-wrap gap-2">
              <span v-for="t in shownStack" :key="t" class="chip">{{ t }}</span>
              <button v-if="service.stack.length > STACK_PREVIEW" type="button" class="chip chip-btn"
                :aria-expanded="showAllStack" @click="showAllStack = !showAllStack">
                {{ showAllStack ? 'See less' : `+${service.stack.length - STACK_PREVIEW} more` }}
              </button>
            </div>
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
              Let's collaborate <ArrowRightIcon class="w-4 h-4" />
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
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import {
  ArrowLeftIcon, ArrowRightIcon, CheckIcon,
  ChevronDownIcon, ChevronRightIcon, ChevronUpIcon,
} from '@heroicons/vue/24/outline';
import { STATUS, getService, getCategory, servicesByCategory } from '../../data/services';

const route = useRoute();

const service = computed(() => getService(route.params.id));
const category = computed(() => (service.value ? getCategory(service.value.category) : null));
const status = computed(() => STATUS[service.value?.status ?? 1]);
const related = computed(() =>
  service.value ? servicesByCategory(service.value.category).filter(x => x.id !== service.value.id) : []
);

// "See more / See less"
const DETAILS_PREVIEW = 2;
const STACK_PREVIEW = 6;
const showAllDetails = ref(false);
const showAllStack = ref(false);

const shownDetails = computed(() =>
  showAllDetails.value ? service.value.details : service.value.details.slice(0, DETAILS_PREVIEW)
);
const shownStack = computed(() =>
  showAllStack.value ? service.value.stack : service.value.stack.slice(0, STACK_PREVIEW)
);

// opening another service from the "More in …" list starts collapsed
watch(() => route.params.id, () => {
  showAllDetails.value = false;
  showAllStack.value = false;
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

/* ── Status badge ── */
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

.st-available {
  color: #34d399;
  background: color-mix(in srgb, #34d399 14%, transparent);
  border-color: color-mix(in srgb, #34d399 35%, transparent);
}

.st-learning {
  color: #fbbf24;
  background: color-mix(in srgb, #fbbf24 14%, transparent);
  border-color: color-mix(in srgb, #fbbf24 35%, transparent);
}

.st-planned {
  color: #94a3b8;
  background: color-mix(in srgb, #94a3b8 14%, transparent);
  border-color: color-mix(in srgb, #94a3b8 35%, transparent);
}

/* the dots in the related list use the same colors, without the pill */
.status-dot.st-available,
.status-dot.st-learning,
.status-dot.st-planned {
  background: currentColor;
  border: 0;
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

/* ── See more / See less ── */
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

.related .st-available { color: #34d399; background: currentColor; }
.related .st-learning { color: #fbbf24; background: currentColor; }
.related .st-planned { color: #94a3b8; background: currentColor; }

@media (prefers-reduced-motion: reduce) {
  .cta-btn,
  .crumb,
  .related,
  .chip-btn {
    transition: none;
  }

  .cta-btn:hover {
    transform: none;
  }
}
</style>