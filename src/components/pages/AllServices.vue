<template>
  <section class="relative py-20 overflow-hidden" id="services" style="background-color: var(--surface-bg);">
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- ── Breadcrumb ── -->
      <nav class="flex mb-8" aria-label="Breadcrumb" data-aos="fade-down">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <router-link to="/#services"
              class="group inline-flex items-center text-sm font-medium transition-all duration-300"
              style="color: var(--surface-text-sub);">
              <div class="mr-2">
                <HomeIcon class="breadcrumb-home-icon w-4 h-4" />
              </div>
              <span class="breadcrumb-home-text">Home</span>
            </router-link>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="w-6 h-6" style="color: var(--surface-text-dim);" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd" />
              </svg>
              <span class="ml-1 text-sm font-semibold md:ml-2 text-transparent bg-clip-text"
                :style="{ backgroundImage: 'var(--logo-gradient)' }">{{ t('services') }}</span>
            </div>
          </li>
        </ol>
      </nav>

      <!-- ── Heading ── -->
      <div class="text-center mb-16" data-aos="fade-up">
        <h1 class="text-4xl md:text-5xl font-bold mb-4" style="color: var(--surface-text);">
          {{ t('my1_') }}
          <span class="text-transparent bg-clip-text" :style="{ backgroundImage: 'var(--logo-gradient)' }">
            {{ t('services') }}
          </span>{{ t('_my2') }}
        </h1>
        <p class="text-lg max-w-2xl mx-auto" style="color: var(--surface-text-sub);" data-aos="fade-up"
          data-aos-delay="100">
          {{ t('services_subtitle') }}
        </p>

        <!-- quick numbers -->
        <p class="mt-5 inline-flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-sm"
          style="color: var(--surface-text-sub);">
          <span><b style="color: var(--surface-text);">{{ SERVICES.length }}</b> services</span>
          <span v-for="o in statusOptions.slice(1)" :key="o.value" class="inline-flex items-center gap-1.5">
            <i class="dot" :class="`st-${STATUS[o.value].key}`"></i>
            <b style="color: var(--surface-text);">{{ o.count }}</b> {{ o.label.toLowerCase() }}
          </span>
        </p>
      </div>

      <!-- ── Search & Filter Controls ── -->
      <div class="mb-12" data-aos="fade-up">
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">

          <!-- Search -->
          <div class="relative w-full md:w-96">
            <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
              style="color: var(--surface-text-dim);" />
            <input v-model="searchQuery" type="search" placeholder="Search services or tools…"
              aria-label="Search services" autocomplete="off"
              class="search-input w-full rounded-xl py-3 pl-10 pr-10 focus:outline-none transition-all text-sm" />
            <button v-if="searchQuery" type="button" aria-label="Clear search" class="search-clear"
              @click="searchQuery = ''">
              <XMarkIcon class="w-4 h-4" />
            </button>
          </div>

          <!-- Buttons -->
          <div class="flex flex-wrap gap-3 items-center justify-center">
            <button @click="showFilters = !showFilters" :aria-expanded="showFilters"
              class="ctrl-btn px-4 py-2 rounded-lg text-sm transition-all inline-flex items-center gap-2">
              {{ showFilters ? 'Hide Filters' : 'Show Filters' }}
              <span v-if="activeFilterCount" class="filter-badge">{{ activeFilterCount }}</span>
            </button>
            <button @click="isGrouped = !isGrouped" class="ctrl-btn px-4 py-2 rounded-lg text-sm transition-all"
              :class="{ 'ctrl-btn-active': isGrouped }" :aria-pressed="isGrouped">
              {{ isGrouped ? 'Ungroup' : 'Group by Category' }}
            </button>
            <button @click="resetFilters" class="px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors">
              Remove Filters
            </button>
          </div>
        </div>

        <!-- ── Expandable Filter Panel (slides open/closed) ── -->
        <div class="panel-wrap" :class="{ 'is-open': showFilters }" :inert="!showFilters ? '' : null">
          <div class="panel-inner">
            <div class="panel-pad">
              <div class="filter-panel grid grid-cols-1 md:grid-cols-3 gap-8 p-6 rounded-2xl">

                <div class="md:col-span-3">
                  <label class="block text-xs uppercase mb-3 font-bold tracking-widest"
                    style="color: var(--surface-text-sub);">
                    Filter by Category
                  </label>
                  <div class="flex flex-wrap gap-2">
                    <button v-for="c in categoryOptions" :key="c.id" @click="selectedCategory = c.id"
                      :disabled="!c.count && selectedCategory !== c.id"
                      class="filter-chip px-3 py-1.5 rounded-md text-xs transition-all inline-flex items-center gap-1.5"
                      :class="selectedCategory === c.id ? 'filter-chip-active' : 'filter-chip-idle'">
                      {{ c.name }}
                      <span class="chip-count">{{ c.count }}</span>
                    </button>
                  </div>
                </div>

                <div class="md:col-span-2">
                  <label class="block text-xs uppercase mb-3 font-bold tracking-widest"
                    style="color: var(--surface-text-sub);">
                    Filter by Type
                  </label>
                  <div class="flex flex-wrap gap-2">
                    <button v-for="o in typeOptions" :key="o.id" @click="selectedType = o.id"
                      :disabled="!o.count && selectedType !== o.id"
                      class="filter-chip px-3 py-1.5 rounded-md text-xs transition-all inline-flex items-center gap-1.5"
                      :class="selectedType === o.id ? 'filter-chip-active' : 'filter-chip-idle'">
                      {{ o.name }}
                      <span class="chip-count">{{ o.count }}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label class="block text-xs uppercase mb-3 font-bold tracking-widest"
                    style="color: var(--surface-text-sub);">
                    Filter by Status
                  </label>
                  <div class="flex flex-wrap gap-2">
                    <button v-for="o in statusChips" :key="o.id" @click="selectedStatus = o.id"
                      :disabled="!o.count && selectedStatus !== o.id"
                      class="filter-chip px-3 py-1.5 rounded-md text-xs transition-all inline-flex items-center gap-1.5"
                      :class="selectedStatus === o.id ? 'filter-chip-active' : 'filter-chip-idle'">
                      <i v-if="o.key" class="dot" :class="`st-${o.key}`"></i>
                      {{ o.name }}
                      <span class="chip-count">{{ o.count }}</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <p class="mt-4 text-center text-xs" style="color: var(--surface-text-dim);" aria-live="polite">
          Showing {{ filteredServices.length }} of {{ SERVICES.length }} services
        </p>
      </div>

      <!-- ── Results (its height is animated whenever the content changes) ── -->
      <div ref="resultsEl">
        <TransitionGroup name="block" tag="div" class="relative" @before-leave="pinLeaving">
          <div v-for="block in blocks" :key="block.id" class="mb-12">

            <!-- Group header (only when grouped) -->
            <div v-if="block.name" class="flex items-center gap-4 mb-8 mt-12">
              <h3 class="text-xl font-bold whitespace-nowrap bg-clip-text text-transparent"
                :style="{ backgroundImage: 'var(--logo-gradient)', WebkitBackgroundClip: 'text' }">
                {{ block.name }}
              </h3>
              <span class="block-count">{{ block.items.length }}</span>
              <div class="h-[1px] w-full" style="
                  background: var(--logo-gradient);
                  mask-image: linear-gradient(to right, black, transparent);
                  -webkit-mask-image: linear-gradient(to right, black, transparent);
                  opacity: 0.5;
                " />
            </div>

            <!-- ── Service Cards ── -->
            <TransitionGroup name="card" tag="div"
              class="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" @before-leave="pinLeaving">
              <router-link v-for="(service, i) in block.items" :key="service.id"
                :to="`/services/detail/${service.id}`" class="svc-card group"
                :class="{ 'is-dim': service.status === 0 || service.status === 3 }" :style="{ '--i': i }">

                <span class="svc-glow" aria-hidden="true"></span>

                <div>
                  <!-- Image -->
                  <div class="relative w-full h-48 overflow-hidden bg-neutral-800">
                    <img v-if="imageFor(service)" :src="imageFor(service)" :alt="service.name"
                      class="svc-img w-full h-full object-cover" loading="lazy" @error="failed[service.id] = true" />
                    <div v-else class="img-fallback" aria-hidden="true">
                      <component :is="service.icon" class="w-16 h-16" />
                    </div>

                    <!-- Status badge -->
                    <span class="status status-float" :class="`st-${STATUS[service.status].key}`">
                      <i class="dot"></i>{{ STATUS[service.status].label }}
                    </span>

                    <!-- Icon -->
                    <div class="absolute bottom-4 left-4 z-10">
                      <div class="img-icon">
                        <component :is="service.icon" class="w-6 h-6" :style="{ color: 'var(--icon-accent)' }" />
                      </div>
                    </div>
                  </div>

                  <div class="relative z-10 p-6">
                    <h4 class="svc-name text-xl font-bold mb-3">{{ service.name }}</h4>
                    <p class="svc-sum leading-relaxed text-sm">{{ service.summary }}</p>
                  </div>
                </div>

                <div class="relative z-10 px-6 pb-6 pt-2 flex items-center justify-between mt-auto">
                  <div class="flex flex-wrap gap-2">
                    <span class="px-2 py-1 rounded text-[10px] font-semibold uppercase tracking-wider"
                      :style="{ background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', color: 'var(--accent-text)' }">
                      {{ getCategory(service.category)?.name }}
                    </span>
                    <span class="px-2 py-1 rounded text-[10px] uppercase tracking-wider"
                      style="background: var(--surface-bg-3); border: 1px solid var(--surface-border); color: var(--surface-text-dim);">
                      {{ service.type }}
                    </span>
                  </div>

                  <span class="svc-go">
                    <ArrowRightIcon class="w-5 h-5" :style="{ color: 'var(--icon-accent-2)' }" />
                  </span>
                </div>
              </router-link>
            </TransitionGroup>
          </div>
        </TransitionGroup>

        <!-- ── Empty State ── -->
        <Transition name="fade">
          <div v-if="!blocks.length" class="text-center py-20">
            <p class="text-lg" style="color: var(--surface-text-dim);">
              No services found matching your criteria.
            </p>
            <button @click="resetFilters" class="mt-4 text-sm underline" style="color: var(--accent-text);">
              Clear all filters
            </button>
          </div>
        </Transition>
      </div>

      <!-- ── CTA ── -->
      <div class="text-center mt-16" data-aos="fade-up">
        <div class="inline-flex flex-col sm:flex-row gap-4 items-center">

          <router-link to="/#services"
            class="px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center"
            :style="{ background: 'var(--cta-gradient)' }"
            @mouseenter="e => e.currentTarget.style.boxShadow = '0 10px 25px var(--accent-shadow)'"
            @mouseleave="e => e.currentTarget.style.boxShadow = 'none'">
            <ArrowLeftCircleIcon class="w-5 h-5 mr-2" />
            Back to Home Page
          </router-link>

          <router-link :to="{ path: '/', hash: '#contact' }"
            class="px-8 py-4 rounded-xl border-2 font-semibold transition-all duration-300 flex items-center"
            :style="{ borderColor: 'var(--accent-text)', color: 'var(--accent-text)' }"
            @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--accent-bg)'"
            @mouseleave="e => e.currentTarget.style.backgroundColor = 'transparent'">
            Get In Touch
            <ChatBubbleLeftRightIcon class="w-5 h-5 ml-2" />
          </router-link>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, watch, nextTick } from 'vue';
import { t } from './../../stores/languages.js';
import {
  ArrowRightIcon, ArrowLeftCircleIcon, ChatBubbleLeftRightIcon,
  HomeIcon, MagnifyingGlassIcon, XMarkIcon,
} from '@heroicons/vue/24/outline';
import { SERVICES, CATEGORIES, STATUS, getCategory } from '../../data/services';

/* ───────── Card images (by service id) ─────────
   Kept here so services.js stays untouched. Services without an entry
   (or whose image fails to load) show an icon placeholder instead.
   Later you can move these into services.js as an `image` field. */
const unsplash = (photo) => `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=500&q=80`;

const IMAGES = {
  1: unsplash('photo-1460925895917-afdab827c52f'),
  2: unsplash('photo-1547082299-de196ea013d6'),
  3: unsplash('photo-1555066931-4365d14bab8c'),
  4: unsplash('photo-1531403009284-440f080d1e12'),
  5: unsplash('photo-1512941937669-90a1b58e7e9c'),
  6: unsplash('photo-1571171637578-41bc2dd41cd2'),
  7: 'https://miro.medium.com/v2/resize:fit:1200/1*vWvkkgG6uvgmJT8GkId98A.png',
  8: unsplash('photo-1526374965328-7f61d4dc18c5'),
  9: unsplash('photo-1558494949-ef010cbdcc31'),
  10: unsplash('photo-1517694712202-14dd9538aa97'),
  11: unsplash('photo-1507238691740-187a5b1d37b8'),
  12: unsplash('photo-1581291518633-83b4ebd1d83e'),
  13: unsplash('photo-1626785774573-4b799315345d'),
  14: unsplash('photo-1451187580459-43490279c0fa'),
  15: unsplash('photo-1618401471353-b98afee0b2eb'),
  16: unsplash('photo-1600132806370-bf17e65e942f'),
  17: unsplash('photo-1563986768609-322da13575f3'),
  18: unsplash('photo-1504384308090-c894fdcc538d'),
  19: unsplash('photo-1518770660439-4636190af475'),
  20: unsplash('photo-1531747118685-ca8fa6e08806'),
  21: unsplash('photo-1455390582262-044cdead277a'),
  22: unsplash('photo-1611162617213-7d7a39e9b1d7'),
  23: 'https://www.fluentforfree.com/wp-content/uploads/2020/04/shutterstock_293731811-320x202.jpg',
  24: unsplash('photo-1574717024653-61fd2cf4d44d'),
  25: unsplash('photo-1557200134-90327ee9fafa'),
  26: unsplash('photo-1451187580459-43490279c0fa'),
  27: unsplash('photo-1523240795612-9a054b0db644'),
  28: unsplash('photo-1522071820081-009f0129c71c'),
  29: 'https://cheekymunkey.co.uk/wp-content/uploads/2017/12/itsupp.png',
  30: unsplash('photo-1544383835-bda2bc66a55d'),
  31: 'https://assets.cioinsight.com/uploads/2022/05/Database-Management-Systems-scaled.jpeg',
  32: unsplash('photo-1607799279861-4dd421887fb3'),
  33: unsplash('photo-1451187580459-43490279c0fa'),
  34: unsplash('photo-1531403009284-440f080d1e12'),
  35: unsplash('photo-1551288049-bebda4e38f71'),   // Data Analysis
  36: unsplash('photo-1544197150-b99a580bb7a8'),   // Networking
  37: unsplash('photo-1504868584819-f8e8b4b6d7e3'), // Data Support
  38: unsplash('photo-1432888498266-38ffec3eaf0a'), // Digital Marketing
};

const failed = reactive({});                       // ids whose image failed to load
const imageFor = (s) => (failed[s.id] ? null : IMAGES[s.id] || null);

/* ───────── Filter state ───────── */
const searchQuery = ref('');
const selectedCategory = ref('all');
const selectedType = ref('all');
const selectedStatus = ref('all');
const isGrouped = ref(false);
const showFilters = ref(false);

/* `skip` lets each chip row count results while ignoring its own filter. */
const matches = (s, skip = null) => {
  if (skip !== 'category' && selectedCategory.value !== 'all' && s.category !== selectedCategory.value) return false;
  if (skip !== 'type' && selectedType.value !== 'all' && s.type !== selectedType.value) return false;
  if (skip !== 'status' && selectedStatus.value !== 'all' && s.status !== selectedStatus.value) return false;
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return true;
  return (
    s.name.toLowerCase().includes(q) ||
    s.summary.toLowerCase().includes(q) ||
    s.stack.some(x => x.toLowerCase().includes(q))
  );
};

const STATUS_ORDER = [1, 2, 3, 0];   // Available, Learning, Paused, Not yet
const TYPES = [...new Set(SERVICES.map(s => s.type))];

/* header numbers (not affected by filters) */
const statusOptions = computed(() => [
  { value: 'all', label: 'All', count: SERVICES.length },
  ...STATUS_ORDER
    .filter(v => SERVICES.some(s => s.status === v))
    .map(v => ({ value: v, label: STATUS[v].label, count: SERVICES.filter(s => s.status === v).length })),
]);

/* chip rows (counts react to the other filters) */
const categoryOptions = computed(() => [
  { id: 'all', name: 'All', count: SERVICES.filter(s => matches(s, 'category')).length },
  ...CATEGORIES.map(c => ({
    id: c.id, name: c.name,
    count: SERVICES.filter(s => s.category === c.id && matches(s, 'category')).length,
  })),
]);

const typeOptions = computed(() => [
  { id: 'all', name: 'All', count: SERVICES.filter(s => matches(s, 'type')).length },
  ...TYPES.map(tp => ({
    id: tp, name: tp,
    count: SERVICES.filter(s => s.type === tp && matches(s, 'type')).length,
  })),
]);

const statusChips = computed(() => [
  { id: 'all', name: 'All', key: null, count: SERVICES.filter(s => matches(s, 'status')).length },
  ...STATUS_ORDER
    .filter(v => SERVICES.some(s => s.status === v))
    .map(v => ({
      id: v, name: STATUS[v].label, key: STATUS[v].key,
      count: SERVICES.filter(s => s.status === v && matches(s, 'status')).length,
    })),
]);

const activeFilterCount = computed(() =>
  (searchQuery.value.trim() ? 1 : 0) +
  (selectedCategory.value !== 'all' ? 1 : 0) +
  (selectedType.value !== 'all' ? 1 : 0) +
  (selectedStatus.value !== 'all' ? 1 : 0)
);

/* ───────── Results ───────── */
const filteredServices = computed(() => SERVICES.filter(s => matches(s)));

const blocks = computed(() => {
  if (!filteredServices.value.length) return [];
  if (!isGrouped.value) return [{ id: 'all', name: null, items: filteredServices.value }];
  return CATEGORIES
    .map(c => ({ id: c.id, name: c.name, items: filteredServices.value.filter(s => s.category === c.id) }))
    .filter(b => b.items.length);
});

const resetFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = 'all';
  selectedType.value = 'all';
  selectedStatus.value = 'all';
  isGrouped.value = false;
};

/* ───────── Animation helpers ───────── */
const resultsEl = ref(null);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Before an element leaves, freeze its size and position so it can fade out
   in place (position: absolute) while the others slide into their new spots. */
function pinLeaving(el) {
  el.style.width = el.offsetWidth + 'px';
  el.style.height = el.offsetHeight + 'px';
  el.style.left = el.offsetLeft + 'px';
  el.style.top = el.offsetTop + 'px';
}

/* Smoothly animate the results area from its old height to its new height,
   so the CTA below glides instead of jumping. */
let heightAnim = null;

async function animateHeightFrom(before) {
  await nextTick();
  const el = resultsEl.value;
  if (!el || prefersReducedMotion()) return;

  heightAnim?.cancel();
  const after = el.offsetHeight;
  if (Math.abs(after - before) < 2) return;

  el.style.overflow = 'hidden';
  const anim = el.animate(
    [{ height: before + 'px' }, { height: after + 'px' }],
    { duration: 450, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
  );
  heightAnim = anim;
  const done = () => {
    if (heightAnim === anim) {
      heightAnim = null;
      el.style.overflow = '';
    }
  };
  anim.onfinish = done;
  anim.oncancel = done;
}

/* flush: 'sync' runs this BEFORE the DOM updates, so we can read the old height. */
watch([searchQuery, selectedCategory, selectedType, selectedStatus, isGrouped], () => {
  animateHeightFrom(resultsEl.value ? resultsEl.value.offsetHeight : 0);
}, { flush: 'sync' });
</script>

<style scoped>
/* ── Search input ── */
.search-input {
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  color: var(--surface-text);
}

.search-input:focus {
  border-color: var(--accent-mid);
}

.search-input::placeholder {
  color: var(--surface-text-dim);
}

/* hide the browser's built-in clear (white X): we use our own on the right */
.search-input::-webkit-search-cancel-button,
.search-input::-webkit-search-decoration {
  -webkit-appearance: none;
  appearance: none;
  display: none;
}

.search-input::-ms-clear {
  display: none;
}

.search-clear {
  position: absolute;
  right: 0.6rem;
  top: 50%;
  transform: translateY(-50%);
  display: grid;
  place-items: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  color: var(--surface-text-sub);
}

.search-clear:hover {
  background: var(--accent-bg);
  color: var(--accent-text);
}

/* ── Control buttons ── */
.ctrl-btn {
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  color: var(--surface-text-sub);
}

.ctrl-btn:hover {
  background: var(--surface-bg-3);
  color: var(--surface-text);
}

.ctrl-btn-active {
  background: var(--accent-mid) !important;
  border-color: transparent !important;
  color: #fff !important;
}

.filter-badge {
  min-width: 1.25rem;
  padding: 0.02rem 0.35rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 700;
  text-align: center;
  color: #fff;
  background: var(--accent-mid);
}

/* ── Filter panel: slides open/closed ── */
.panel-wrap {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition: grid-template-rows 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease;
}

.panel-wrap.is-open {
  grid-template-rows: 1fr;
  opacity: 1;
}

.panel-inner {
  min-height: 0;
  overflow: hidden;
}

.panel-pad {
  padding-top: 1.5rem;
}

.filter-panel {
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* ── Filter chips ── */
.filter-chip-idle {
  background: var(--surface-bg-3);
  color: var(--surface-text-sub);
}

.filter-chip-idle:hover:not(:disabled) {
  background: var(--surface-bg-2);
  color: var(--surface-text);
}

.filter-chip:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.filter-chip-active {
  background: var(--accent-mid);
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.chip-count {
  font-size: 0.65rem;
  font-weight: 700;
  opacity: 0.7;
}

/* ── Group header count ── */
.block-count {
  padding: 0.05rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--accent-text);
  background: var(--accent-bg);
}

/* ── Cards ── */
.svc-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  border-radius: 1rem;
  backdrop-filter: blur(4px);
  background: linear-gradient(to bottom right, var(--surface-card), var(--section-grad-to));
  border: 1px solid var(--surface-border);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.svc-card:hover,
.svc-card:focus-visible {
  transform: translateY(-6px);
  border-color: var(--accent-border-hover);
  box-shadow: 0 16px 34px -20px var(--accent-shadow);
}

.svc-card:focus-visible {
  outline: 2px solid var(--accent-text);
  outline-offset: 2px;
}

.svc-card.is-dim {
  opacity: 0.6;
}

.svc-glow {
  position: absolute;
  inset: 0;
  z-index: 1;
  background-color: var(--accent-glow);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
}

.svc-card:hover .svc-glow {
  opacity: 1;
}

.svc-img {
  opacity: 0.8;
  transition: transform 0.7s ease, opacity 0.7s ease;
}

.svc-card:hover .svc-img {
  transform: scale(1.1);
  opacity: 1;
}

.img-fallback {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  color: var(--icon-accent);
  background: linear-gradient(135deg, var(--icon-bg), var(--icon-bg-2));
}

.img-fallback svg {
  opacity: 0.35;
}

.img-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  border: 1px solid var(--accent-border);
  background: linear-gradient(to right, var(--icon-bg), var(--icon-bg-2));
  backdrop-filter: blur(8px);
  box-shadow: 0 8px 20px -8px rgba(0, 0, 0, 0.4);
}

.svc-name {
  color: var(--surface-text);
  transition: color 0.3s ease;
}

.svc-card:hover .svc-name {
  color: var(--accent-text);
}

.svc-sum {
  color: var(--surface-text-sub);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.svc-go {
  opacity: 0;
  transform: translateX(1rem);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.svc-card:hover .svc-go,
.svc-card:focus-visible .svc-go {
  opacity: 1;
  transform: translateX(0);
}

/* touch devices have no hover: keep the arrow visible */
@media (hover: none) {
  .svc-go {
    opacity: 1;
    transform: none;
  }
}

/* ── Status badge ── */
.status {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.18rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 700;
  border: 1px solid transparent;
}

.status-float {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 10;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.dot {
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background: currentColor;
}

.st-available {
  color: #34d399;
}

.st-learning {
  color: #fbbf24;
}

.st-planned {
  color: #f87171;
}

.st-paused {
  color: #94a3b8;
}

.status.st-available {
  background: color-mix(in srgb, #34d399 22%, rgba(0, 0, 0, 0.35));
  border-color: color-mix(in srgb, #34d399 40%, transparent);
}

.status.st-learning {
  background: color-mix(in srgb, #fbbf24 22%, rgba(0, 0, 0, 0.35));
  border-color: color-mix(in srgb, #fbbf24 40%, transparent);
}

.status.st-planned {
  background: color-mix(in srgb, #f87171 22%, rgba(0, 0, 0, 0.35));
  border-color: color-mix(in srgb, #f87171 40%, transparent);
}

.status.st-paused {
  background: color-mix(in srgb, #94a3b8 22%, rgba(0, 0, 0, 0.35));
  border-color: color-mix(in srgb, #94a3b8 40%, transparent);
}

/* ───────── Filter animations ───────── */

/* cards: fade + scale out in place, slide into new spots, fade in with a small stagger */
.svc-card.card-enter-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: calc(min(var(--i, 0), 8) * 35ms);
}

.svc-card.card-leave-active {
  position: absolute;
  z-index: 0;
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.svc-card.card-move {
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.card-enter-from {
  opacity: 0;
  transform: translateY(14px) scale(0.97);
}

.card-leave-to {
  opacity: 0;
  transform: scale(0.94);
}

/* category blocks (grouped view) */
.block-enter-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.block-leave-active {
  position: absolute;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.block-move {
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.block-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.block-leave-to {
  opacity: 0;
}

/* empty state */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {

  .panel-wrap,
  .svc-card,
  .svc-img,
  .svc-go,
  .svc-card.card-enter-active,
  .svc-card.card-leave-active,
  .svc-card.card-move,
  .block-enter-active,
  .block-leave-active,
  .block-move,
  .fade-enter-active,
  .fade-leave-active {
    transition: none;
    transition-delay: 0s;
  }

  .svc-card:hover,
  .svc-card:hover .svc-img {
    transform: none;
  }
}

/* ── Breadcrumb hover: text ── */
.group:hover .breadcrumb-home-text {
  background: var(--logo-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
}

/* ── Breadcrumb hover: icon ── */
.group:hover .breadcrumb-home-icon {
  background: var(--logo-gradient);
  -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>') no-repeat center;
  mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>') no-repeat center;
  -webkit-mask-size: contain;
  mask-size: contain;
  color: transparent;
}
</style>