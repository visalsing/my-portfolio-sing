<template>
    <!-- Slides its content open/closed. Content stays rendered, so it can animate both ways. -->
    <div class="reveal" :class="{ 'is-open': open }" :inert="!open ? '' : null">
        <div class="reveal-inner">
            <slot />
        </div>
    </div>
</template>

<script setup>
defineProps({ open: { type: Boolean, default: false } });
</script>

<style scoped>
.reveal {
    display: grid;
    grid-template-rows: 0fr;
    opacity: 0;
    transition: grid-template-rows 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease;
}

.reveal.is-open {
    grid-template-rows: 1fr;
    opacity: 1;
}

.reveal-inner {
    min-height: 0;
    overflow: hidden;
}

@media (prefers-reduced-motion: reduce) {
    .reveal {
        transition: none;
    }
}
</style>