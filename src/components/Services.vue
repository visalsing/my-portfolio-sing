<template>
    <section ref="sectionEl" class="relative overflow-hidden scroll-mt-20" :class="isFull ? 'pt-28 pb-20' : 'py-20'"
        id="services">
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <!-- ── Heading ── -->
            <div class="text-center mb-10 md:mb-12" data-aos="fade-up">
                <component :is="isFull ? 'h1' : 'h2'"
                    class="text-4xl md:text-5xl font-bold text-[var(--surface-text)] mb-4">
                    {{ t('my1_') }}
                    <span class="text-transparent bg-clip-text" :style="{ backgroundImage: 'var(--logo-gradient)' }">{{
                        t('services') }}</span>{{ t('_my2') }}
                </component>
                <p class="text-lg max-w-2xl mx-auto" :style="{ color: 'var(--accent-text-muted)' }">
                    {{ t('services_subtitle') }}
                </p>

                <!-- quick numbers (full page only) -->
                <p v-if="isFull" class="mt-5 inline-flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-sm"
                    :style="{ color: 'var(--surface-text-sub)' }">
                    <span><b class="text-[var(--surface-text)]">{{ SERVICES.length }}</b> services</span>
                    <span v-for="o in statusOptions.slice(1)" :key="o.value" class="inline-flex items-center gap-1.5">
                        <i class="dot" :class="`st-${STATUS[o.value].key}`"></i>
                        <b class="text-[var(--surface-text)]">{{ o.count }}</b> {{ o.label.toLowerCase() }}
                    </span>
                </p>
            </div>

            <!-- ── Search + status filter (full page only) ── -->
            <div v-if="isFull" class="toolbar">
                <label class="search">
                    <MagnifyingGlassIcon class="w-5 h-5 shrink-0 opacity-60" />
                    <input v-model="query" type="search" placeholder="Search services or tools…"
                        aria-label="Search services" autocomplete="off" />
                    <button v-if="query" type="button" class="search-clear" aria-label="Clear search"
                        @click="query = ''">
                        <XMarkIcon class="w-4 h-4" />
                    </button>
                </label>

                <div class="seg" role="group" aria-label="Filter by status">
                    <button v-for="o in statusOptions" :key="o.value" type="button" class="seg-btn"
                        :class="{ 'is-active': status === o.value }" :aria-pressed="status === o.value"
                        @click="status = o.value">
                        {{ o.label }}
                    </button>
                </div>
            </div>

            <!-- ── Category tabs ── -->
            <div class="tabs" role="tablist" aria-label="Service categories">
                <button v-for="tab in tabs" :key="tab.id" type="button" role="tab" class="tab"
                    :class="{ 'is-active': active === tab.id }" :aria-selected="active === tab.id"
                    :disabled="!tab.count && active !== tab.id" @click="selectTab(tab.id)">
                    <component :is="tab.icon" class="w-4 h-4 shrink-0" />
                    {{ tab.name }}
                    <span class="tab-count">{{ tab.count }}</span>
                </button>
            </div>

            <Transition name="fade" mode="out-in">
                <p v-if="activeCategory" :key="activeCategory.id" class="mt-4 text-center text-sm"
                    :style="{ color: 'var(--surface-text-sub)' }">
                    {{ activeCategory.blurb }}
                </p>
            </Transition>

            <!-- ── Results (its height is animated whenever the content changes) ── -->
            <div ref="resultsEl">
                <TransitionGroup name="block" tag="div" class="relative" @before-leave="pinLeaving">
                    <div v-for="block in blocks" :key="block.id" class="mt-8">

                        <div v-if="block.name" class="block-head">
                            <span class="block-icon">
                                <component :is="block.icon" class="w-5 h-5" />
                            </span>
                            <div class="min-w-0">
                                <h3 class="block-title">{{ block.name }}
                                    <span class="block-count">{{ block.items.length }}</span>
                                </h3>
                                <p class="block-blurb">{{ block.blurb }}</p>
                            </div>
                        </div>

                        <TransitionGroup name="card" tag="div"
                            class="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                            @before-leave="pinLeaving">
                            <router-link v-for="(s, i) in block.items" :key="s.id" :to="`/services/detail/${s.id}`"
                                class="svc-card group" :class="{ 'is-dim': s.status === 0 || s.status === 3 }"
                                :style="{ '--i': staggerIndex(i) }">
                                <span class="svc-glow" aria-hidden="true"></span>

                                <div class="relative z-10 flex items-start gap-4">
                                    <span class="svc-icon">
                                        <component :is="s.icon" class="w-6 h-6" />
                                    </span>
                                    <div class="min-w-0 flex-1">
                                        <h4 class="svc-name">{{ s.name }}</h4>
                                        <p class="svc-sum">{{ s.summary }}</p>
                                    </div>
                                </div>

                                <div class="relative z-10 mt-4 flex items-center justify-between gap-3">
                                    <span class="status" :class="`st-${STATUS[s.status].key}`">
                                        <i class="dot"></i>{{ STATUS[s.status].label }}
                                    </span>
                                    <span class="svc-go">
                                        Details
                                        <ArrowRightIcon class="w-4 h-4" />
                                    </span>
                                </div>
                            </router-link>
                        </TransitionGroup>
                    </div>
                </TransitionGroup>

                <!-- ── Empty state ── -->
                <Transition name="fade">
                    <div v-if="!blocks.length" class="empty">
                        <MagnifyingGlassIcon class="w-8 h-8 opacity-50" />
                        <p class="mt-3 font-semibold text-[var(--surface-text)]">No services match your filters</p>
                        <button type="button" class="more-btn mt-3" @click="resetFilters">Clear filters</button>
                    </div>
                </Transition>
            </div>

            <!-- ── See more / See less (home page) ── -->
            <div v-if="hasMore" class="text-center mt-8">
                <button type="button" class="more-btn" :aria-expanded="expanded" @click="toggleExpanded">
                    {{ expanded ? 'See less' : `See more (${flat.length - PREVIEW})` }}
                    <component :is="expanded ? ChevronUpIcon : ChevronDownIcon" class="w-4 h-4" />
                </button>
            </div>

            <!-- ── CTA ── -->
            <div class="text-center mt-14" data-aos="fade-up">
                <div class="inline-flex flex-col sm:flex-row gap-4 items-center">

                    <router-link v-if="!isFull" to="/services" class="cta cta-solid">
                        View All Services
                        <ArrowRightCircleIcon class="w-5 h-5 ml-2" />
                    </router-link>

                    <router-link :to="{ path: '/', hash: '#contact' }" class="cta cta-outline">
                        Get In Touch
                        <ChatBubbleLeftRightIcon class="w-5 h-5 ml-2" />
                    </router-link>
                </div>
            </div>

        </div>
    </section>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { t } from './../stores/languages.js';
import {
    ArrowRightIcon, ArrowRightCircleIcon, ChatBubbleLeftRightIcon,
    ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon, Squares2X2Icon, XMarkIcon,
} from '@heroicons/vue/24/outline';
import { SERVICES, CATEGORIES, STATUS } from '../data/services';

/* Home page  → compact: category tabs, first 6 cards, "See more", "View All Services".
   /services  → full: + search, status filter, every category with its own heading.
   The mode follows the route automatically; pass :full="true" to force it. */
const props = defineProps({ full: { type: Boolean, default: false } });
const route = useRoute();
const isFull = computed(() => props.full || route.path.replace(/\/$/, '') === '/services');

const PREVIEW = 6;

/* ───────── Filters ───────── */

const active = ref('all');
const query = ref('');
const status = ref('all');
const expanded = ref(false);

const matches = (s) => {
    if (status.value !== 'all' && s.status !== status.value) return false;
    const q = query.value.trim().toLowerCase();
    if (!q) return true;
    return (
        s.name.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.stack.some(x => x.toLowerCase().includes(q))
    );
};

// order of the status buttons: Available, Learning, Paused, Not yet
const STATUS_ORDER = [1, 2, 3, 0];

const statusOptions = computed(() => [
    { value: 'all', label: 'All', count: SERVICES.length },
    ...STATUS_ORDER
        .filter(v => SERVICES.some(s => s.status === v))
        .map(v => ({ value: v, label: STATUS[v].label, count: SERVICES.filter(s => s.status === v).length })),
]);

const tabs = computed(() => [
    { id: 'all', name: 'All', icon: Squares2X2Icon, count: SERVICES.filter(matches).length },
    ...CATEGORIES.map(c => ({
        id: c.id, name: c.name, icon: c.icon,
        count: SERVICES.filter(s => s.category === c.id && matches(s)).length,
    })),
]);

const activeCategory = computed(() => CATEGORIES.find(c => c.id === active.value) || null);

const groups = computed(() =>
    (active.value === 'all' ? CATEGORIES : CATEGORIES.filter(c => c.id === active.value))
        .map(c => ({ ...c, items: SERVICES.filter(s => s.category === c.id && matches(s)) }))
        .filter(g => g.items.length)
);

const flat = computed(() => groups.value.flatMap(g => g.items));
const hasMore = computed(() => !isFull.value && flat.value.length > PREVIEW);

const blocks = computed(() => {
    if (isFull.value) {
        // "All" shows a heading per category; a single tab needs none (its blurb is under the tabs)
        return groups.value.map(g => ({
            id: g.id, name: active.value === 'all' ? g.name : null,
            icon: g.icon, blurb: g.blurb, items: g.items,
        }));
    }
    const items = expanded.value ? flat.value : flat.value.slice(0, PREVIEW);
    return items.length ? [{ id: 'flat', name: null, items }] : [];
});

function selectTab(id) {
    active.value = id;
    expanded.value = false;
}

function resetFilters() {
    active.value = 'all';
    query.value = '';
    status.value = 'all';
    expanded.value = false;
}

/* ───────── Animation helpers ───────── */

const sectionEl = ref(null);
const resultsEl = ref(null);

const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* When "See more" reveals cards, stagger starts at the first NEW card (not card #1). */
const staggerIndex = (i) => (!isFull.value && expanded.value ? Math.max(0, i - PREVIEW) : i);

/* Before an element leaves, freeze its size and position so it can fade out
   in place (position: absolute) while the others slide into their new spots. */
function pinLeaving(el) {
    el.style.width = el.offsetWidth + 'px';
    el.style.height = el.offsetHeight + 'px';
    el.style.left = el.offsetLeft + 'px';
    el.style.top = el.offsetTop + 'px';
}

/* Smoothly animate the results area from its old height to its new height, so the
   "See more" button and everything below glide instead of jumping. */
let heightAnim = null;

async function animateHeightFrom(before) {
    await nextTick();
    const el = resultsEl.value;
    if (!el || prefersReducedMotion()) return;

    heightAnim?.cancel();                 // measure the natural height, not a half-finished animation
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
watch([active, query, status, expanded], () => {
    animateHeightFrom(resultsEl.value ? resultsEl.value.offsetHeight : 0);
}, { flush: 'sync' });

/* "See less": the page gets shorter, so scroll back up to the top of #services
   (only if we are currently below it). */
function scrollToSection() {
    const el = sectionEl.value;
    if (!el || el.getBoundingClientRect().top >= 0) return;
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
}

function toggleExpanded() {
    const collapsing = expanded.value;
    expanded.value = !expanded.value;
    if (collapsing) scrollToSection();
}
</script>

<style scoped>
/* ── Toolbar ── */
.toolbar {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: stretch;
    justify-content: center;
    margin-bottom: 1.25rem;
}

@media (min-width: 768px) {
    .toolbar {
        flex-direction: row;
        align-items: center;
    }
}

.search {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    width: 100%;
    max-width: 26rem;
    padding: 0.6rem 0.9rem;
    border-radius: 9999px;
    color: var(--surface-text);
    background: var(--card-bg-from);
    border: 1px solid var(--section-border);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search:focus-within {
    border-color: var(--accent-text);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-text) 18%, transparent);
}

.search input {
    flex: 1;
    min-width: 0;
    background: transparent;
    outline: none;
    font-size: 0.95rem;
    color: inherit;
}

.search input::placeholder {
    color: var(--surface-text-sub);
}

.search-clear {
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

.seg {
    display: inline-flex;
    padding: 0.2rem;
    gap: 0.2rem;
    border-radius: 9999px;
    background: var(--card-bg-from);
    border: 1px solid var(--section-border);
    align-self: center;
}

.seg-btn {
    padding: 0.4rem 0.9rem;
    border-radius: 9999px;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--surface-text-sub);
    transition: background-color 0.2s ease, color 0.2s ease;
}

.seg-btn:hover {
    color: var(--accent-text);
}

.seg-btn.is-active {
    color: #fff;
    background: var(--cta-gradient);
}

/* ── Category tabs: scroll sideways on phones, wrap + center on desktop ── */
.tabs {
    display: flex;
    gap: 0.5rem;
    padding: 0.25rem;
    overflow-x: auto;
    scroll-snap-type: x proximity;
    scrollbar-width: none;
}

.tabs::-webkit-scrollbar {
    display: none;
}

@media (min-width: 768px) {
    .tabs {
        flex-wrap: wrap;
        justify-content: center;
        overflow: visible;
    }
}

.tab {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    flex-shrink: 0;
    scroll-snap-align: start;
    padding: 0.5rem 0.95rem;
    border-radius: 9999px;
    white-space: nowrap;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--surface-text-sub);
    border: 1px solid var(--accent-border);
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.tab:hover:not(:disabled) {
    color: var(--accent-text);
    background: var(--accent-bg);
}

.tab:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.tab.is-active {
    color: #fff;
    background: var(--cta-gradient);
    border-color: transparent;
    box-shadow: 0 8px 20px -10px var(--accent-shadow);
}

.tab-count {
    min-width: 1.35rem;
    padding: 0.05rem 0.4rem;
    border-radius: 9999px;
    font-size: 0.7rem;
    font-weight: 700;
    text-align: center;
    background: color-mix(in srgb, currentColor 14%, transparent);
}

/* ── Category headings (full page) ── */
.block-head {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    margin: 2.5rem 0 1.1rem;
}

.block-icon {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.75rem;
    color: var(--icon-accent);
    border: 1px solid var(--accent-border);
    background: linear-gradient(to right, var(--icon-bg), var(--icon-bg-2));
}

.block-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--surface-text);
}

.block-count {
    padding: 0.05rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--accent-text);
    background: var(--accent-bg);
}

.block-blurb {
    font-size: 0.85rem;
    color: var(--surface-text-sub);
}

/* ── Cards ── */
.svc-card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.25rem;
    overflow: hidden;
    border-radius: 1rem;
    backdrop-filter: blur(4px);
    background: linear-gradient(to bottom right, var(--card-bg-from), var(--section-grad-to));
    border: 1px solid var(--section-border);
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.svc-card:hover,
.svc-card:focus-visible {
    transform: translateY(-4px);
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
    background-color: var(--accent-glow);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s ease;
}

.svc-card:hover .svc-glow {
    opacity: 1;
}

.svc-icon {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 3rem;
    height: 3rem;
    border-radius: 0.8rem;
    color: var(--icon-accent);
    border: 1px solid var(--accent-border);
    background: linear-gradient(to right, var(--icon-bg), var(--icon-bg-2));
    transition: transform 0.3s ease;
}

.svc-card:hover .svc-icon {
    transform: scale(1.08);
}

.svc-name {
    font-size: 1.05rem;
    font-weight: 700;
    line-height: 1.3;
    color: var(--surface-text);
    transition: color 0.3s ease;
}

.svc-card:hover .svc-name {
    color: var(--accent-text);
}

.svc-sum {
    margin-top: 0.3rem;
    font-size: 0.9rem;
    line-height: 1.5;
    color: var(--surface-text-sub);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.svc-go {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--icon-accent-2);
    transition: opacity 0.3s ease, transform 0.3s ease;
}

/* on mouse devices the hint appears on hover; on touch it is always visible */
@media (hover: hover) {
    .svc-go {
        opacity: 0;
        transform: translateX(-6px);
    }

    .svc-card:hover .svc-go,
    .svc-card:focus-visible .svc-go {
        opacity: 1;
        transform: translateX(0);
    }
}

/* ── Status badge (same look as the details page) ── */
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
    background: color-mix(in srgb, #34d399 14%, transparent);
    border-color: color-mix(in srgb, #34d399 35%, transparent);
}

.status.st-learning {
    background: color-mix(in srgb, #fbbf24 14%, transparent);
    border-color: color-mix(in srgb, #fbbf24 35%, transparent);
}

.status.st-planned {
    background: color-mix(in srgb, #f87171 14%, transparent);
    border-color: color-mix(in srgb, #f87171 35%, transparent);
}

.status.st-paused {
    background: color-mix(in srgb, #94a3b8 14%, transparent);
    border-color: color-mix(in srgb, #94a3b8 35%, transparent);
}

/* ── Buttons ── */
.more-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.55rem 1.2rem;
    border-radius: 9999px;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--accent-text);
    border: 1px solid var(--accent-text);
    transition: background-color 0.2s ease;
}

.more-btn:hover {
    background: var(--accent-bg);
}

.cta {
    display: inline-flex;
    align-items: center;
    padding: 1rem 2rem;
    border-radius: 0.75rem;
    font-weight: 600;
    transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

.cta-solid {
    color: #fff;
    background: var(--cta-gradient);
}

.cta-solid:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 25px var(--accent-shadow);
}

.cta-outline {
    color: var(--accent-text);
    border: 2px solid var(--accent-text);
}

.cta-outline:hover {
    background: var(--accent-bg);
}

/* ── Empty state ── */
.empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem 1rem;
    text-align: center;
    color: var(--surface-text-sub);
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

/* category blocks (full page, "All" tab / search / status changes) */
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

/* tab blurb + empty state */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

@media (prefers-reduced-motion: reduce) {

    .svc-card,
    .svc-icon,
    .svc-go,
    .tab,
    .cta,
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
    .svc-card:hover .svc-icon,
    .cta-solid:hover {
        transform: none;
    }
}
</style>
