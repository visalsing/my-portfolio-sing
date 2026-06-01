<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="tech"
        class="modal-backdrop fixed inset-0 z-[999] flex items-center justify-center p-4"
        @click.self="$emit('close')"
      >
        <div
          class="modal-card relative w-full max-w-sm rounded-2xl overflow-hidden"
          :style="cardStyle"
        >
          <!-- Inner glow ring -->
          <div class="absolute inset-0 rounded-2xl pointer-events-none" :style="glowRing" />

          <!-- Close button -->
          <button
            class="modal-close-btn absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
            @click="$emit('close')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Top accent bar -->
          <div class="h-1 w-full flex-shrink-0" :style="{ background: accentBar }" />

          <!-- Body -->
          <div class="px-8 pb-8 pt-6 flex flex-col items-center gap-5">

            <!-- Big logo -->
            <div
              class="relative flex items-center justify-center rounded-2xl flex-shrink-0"
              style="width: 9rem; height: 9rem;"
              :style="logoBoxStyle"
            >
              <div class="absolute inset-0 rounded-2xl" :style="logoInnerGlow" />
              <img
                :src="tech.logo"
                :alt="tech.name"
                class="relative z-10 w-24 h-24 object-contain"
                :style="{ filter: tech._styles?.imgFilter ?? 'none' }"
              />
            </div>

            <!-- Name + badges -->
            <div class="text-center space-y-2 w-full">
              <h3 class="text-2xl font-bold tracking-tight" style="color: var(--surface-text)">
                {{ tech.name }}
              </h3>
              <div class="flex items-center justify-center gap-2 flex-wrap">
                <span
                  class="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                  :style="categoryBadgeStyle"
                >
                  {{ tech.category }}
                </span>
                <span
                  class="px-3 py-1 rounded-full text-xs uppercase tracking-wider"
                  style="background: var(--surface-bg-3); color: var(--surface-text-sub); border: 1px solid var(--surface-border);"
                >
                  {{ tech.type }}
                </span>
              </div>
            </div>

            <!-- Divider -->
            <div
              class="w-full h-px flex-shrink-0"
              :style="{ background: `linear-gradient(to right, transparent, rgba(${rgb},0.4), transparent)` }"
            />

            <!-- Close btn -->
            <button
              class="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-75 active:scale-95"
              :style="closeBtnStyle"
              @click="$emit('close')"
            >
              Close
            </button>

          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue';

// ── Props & emits ──
const props = defineProps({
  tech: { type: Object, default: null },
});
defineEmits(['close']);

// ── Derived color ──
const rgb = computed(() => props.tech?._styles?.rgb ?? '99,102,241');

// ── Computed styles ──
const cardStyle = computed(() => ({
  background: 'var(--surface-bg-2)',
  border:     `1px solid rgba(${rgb.value},0.30)`,
  boxShadow:  `0 0 60px 10px rgba(${rgb.value},0.15), 0 25px 60px rgba(0,0,0,0.4)`,
}));

const glowRing = computed(() => ({
  boxShadow: `inset 0 0 40px 0px rgba(${rgb.value},0.06)`,
}));

const accentBar = computed(() =>
  `linear-gradient(to right, transparent, rgba(${rgb.value},0.8), transparent)`
);

const logoBoxStyle = computed(() => ({
  background: 'var(--surface-bg-3)',
  border:     `1px solid rgba(${rgb.value},0.25)`,
  boxShadow:  `0 0 30px 4px rgba(${rgb.value},0.20)`,
}));

const logoInnerGlow = computed(() => ({
  background: `radial-gradient(circle at 50% 30%, rgba(${rgb.value},0.15) 0%, transparent 70%)`,
}));

const categoryBadgeStyle = computed(() => ({
  background: `rgba(${rgb.value},0.15)`,
  color:      `rgb(${rgb.value})`,
  border:     `1px solid rgba(${rgb.value},0.30)`,
}));

const closeBtnStyle = computed(() => ({
  background: `rgba(${rgb.value},0.12)`,
  color:      `rgb(${rgb.value})`,
  border:     `1px solid rgba(${rgb.value},0.25)`,
}));
</script>

<style scoped>
/* ── Backdrop ── */
.modal-backdrop {
  background: rgba(0, 0, 0, 0.60);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

/* Light theme: softer backdrop */
html.theme-light .modal-backdrop {
  background: rgba(15, 23, 42, 0.40);
}

/* ── Close button ── */
.modal-close-btn {
  background: var(--surface-border);
  color:      var(--surface-text-sub);
}
.modal-close-btn:hover {
  background: var(--surface-card);
  color:      var(--surface-text);
}

/* ── Modal enter / leave transitions ── */
.modal-enter-active {
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-leave-active {
  transition: all 0.18s ease-in;
}
.modal-enter-from {
  opacity: 0;
  transform: scale(0.88) translateY(16px);
}
.modal-leave-to {
  opacity: 0;
  transform: scale(0.92) translateY(8px);
}
.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}
</style>