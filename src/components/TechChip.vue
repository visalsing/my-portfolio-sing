<template>
    <span
        class="inline-flex items-center gap-2 pl-3 pr-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-all"
        :style="{
            background: 'var(--accent-bg)',
            border: '1px solid var(--accent-border)',
            color: 'var(--accent-text-muted)'
        }">
        <span class="tech-logo" aria-hidden="true">
            <!-- single-color logo: painted in the chip's text color, so it is visible on any theme -->
            <span v-if="showLogo && logo.mono" class="tech-mono" :style="maskStyle"></span>

            <!-- colored logo -->
            <img v-else-if="showLogo" :src="logo.src" alt="" width="20" height="20" loading="lazy" decoding="async"
                @error="failed = true" />

            <!-- no logo (or it failed to load): the group's icon -->
            <component v-else :is="fallbackIcon" class="w-5 h-5"
                :style="{ color: accent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }" />
        </span>
        {{ name }}
    </span>
</template>

<script setup>
import { ref, computed } from 'vue';
import { logoFor } from '../data/techIcons.js';

const props = defineProps({
    name: { type: String, required: true },
    fallbackIcon: { type: [Object, Function], default: null },   // shown when there is no logo
    accent2: { type: Boolean, default: false },
});

const failed = ref(false);
const logo = computed(() => logoFor(props.name));
const showLogo = computed(() => !!logo.value && !failed.value);

const maskStyle = computed(() => {
    const url = `url("${logo.value.src}")`;
    return { WebkitMaskImage: url, maskImage: url };
});
</script>

<style scoped>
.tech-logo {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
}

.tech-logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.tech-mono {
    width: 100%;
    height: 100%;
    background-color: currentColor;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
    -webkit-mask-size: contain;
    mask-size: contain;
}
</style>