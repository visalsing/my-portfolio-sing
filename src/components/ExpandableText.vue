<template>
    <div ref="root" class="scroll-mt-24">
        <div ref="box" class="xt-box text-[var(--surface-text-sub)] text-sm leading-relaxed"
            :class="{ 'xt-fade': overflowing && !open }" :style="boxStyle">
            {{ clean }}
        </div>

        <!-- only shown when the text is longer than `lines` lines -->
        <button v-if="overflowing" type="button" :aria-expanded="open" @click="toggle"
            class="mt-2 font-bold cursor-pointer hover:underline uppercase text-[10px] tracking-widest"
            :style="{ color: accent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }">
            {{ open ? t('show_less') : t('see_more') }}
        </button>
    </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { t } from './../stores/languages.js';

const props = defineProps({
    text: { type: String, required: true },
    accent2: { type: Boolean, default: false },
    lines: { type: Number, default: 3 },
});

const root = ref(null);
const box = ref(null);
const open = ref(false);
const overflowing = ref(false);
const collapsedPx = ref(0);
const fullPx = ref(0);

// the data uses multi-line template strings: collapse the extra whitespace
const clean = computed(() => props.text.replace(/\s+/g, ' ').trim());

// no max-height until we know the text is long enough to need one
const boxStyle = computed(() =>
    overflowing.value ? { maxHeight: (open.value ? fullPx.value : collapsedPx.value) + 'px' } : {}
);

const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function measure() {
    const el = box.value;
    if (!el) return;
    const lh = parseFloat(getComputedStyle(el).lineHeight);
    collapsedPx.value = Math.round((Number.isFinite(lh) ? lh : 22) * props.lines);
    fullPx.value = el.scrollHeight;
    overflowing.value = fullPx.value > collapsedPx.value + 2;
}

function toggle() {
    measure();
    if (open.value) {
        // "See less": scroll back up if the top of this text is above the viewport
        const el = root.value;
        if (el && el.getBoundingClientRect().top < 0) {
            el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
        }
    }
    open.value = !open.value;
}

// re-measure when the width changes (resize, rotate phone) or when the text changes
let observer = null;
let lastWidth = 0;

onMounted(() => {
    nextTick(measure);
    document.fonts?.ready.then(measure);

    if (typeof ResizeObserver !== 'undefined' && root.value) {
        lastWidth = root.value.offsetWidth;
        observer = new ResizeObserver(() => {
            const w = root.value?.offsetWidth ?? 0;
            if (w !== lastWidth) {
                lastWidth = w;
                measure();
            }
        });
        observer.observe(root.value);
    }
});

onBeforeUnmount(() => observer?.disconnect());

watch(clean, () => nextTick(measure));
</script>

<style scoped>
.xt-box {
    overflow: hidden;
    transition: max-height 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

/* soft fade on the last line while collapsed */
.xt-fade {
    -webkit-mask-image: linear-gradient(to bottom, #000 calc(100% - 1.4em), transparent);
    mask-image: linear-gradient(to bottom, #000 calc(100% - 1.4em), transparent);
}

@media (prefers-reduced-motion: reduce) {
    .xt-box {
        transition: none;
    }
}
</style>