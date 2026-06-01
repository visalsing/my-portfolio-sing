<!-- <template>
    <div class="flex justify-center items-center h-screen bg-linear-to-r" style="background-color: #000;">
        <div class="text-center">
            <div class="flex space-x-2 mb-4">
                <div class="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                <div class="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                <div class="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style="animation-delay: 0.3s"></div>
            </div>
        </div>
    </div>
</template>
<script setup>

</script> -->



<!-- <template>
    <div class="flex justify-center items-center h-screen bg-linear-to-r" :style="{ backgroundImage: 'var(--surface-bg)' }">
        <div class="text-center">
            <div class="flex space-x-2 mb-4">
                <div class="w-3 h-3 bg-[var(--accent-from)]  rounded-full animate-bounce"></div>
                <div class="w-3 h-3 bg-[var(--accent-to)]  rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-3 h-3 bg-[var(--accent-from)]  rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                <div class="w-3 h-3 bg-[var(--accent-from)]  rounded-full animate-bounce" style="animation-delay: 0.3s"></div>
                <div class="w-3 h-3 bg-[var(--accent-to)]  rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
            </div>
        </div>
    </div>
</template>
<script setup>

</script> -->



<template>
    <div class="flex justify-center items-center h-screen" :style="{ backgroundImage: 'var(--surface-bg)' }">

        <!-- bounce-dots (original) -->
        <div v-if="currentLoadingScreen === 'bounce-dots'" class="flex space-x-2">
            <div v-for="(delay, i) in ['0s', '0.1s', '0.2s', '0.3s', '0.4s']" :key="i"
                class="w-3 h-3 rounded-full animate-bounce"
                :style="{ backgroundColor: i % 2 === 0 ? 'var(--accent-from)' : 'var(--accent-to)', animationDelay: delay }">
            </div>
        </div>

        <!-- pulse-ring -->
        <div v-else-if="currentLoadingScreen === 'pulse-ring'" class="w-16 h-16 rounded-full border-4 animate-ping"
            :style="{ borderColor: 'var(--accent-from)' }">
        </div>

        <!-- gradient-spinner -->
        <div v-else-if="currentLoadingScreen === 'gradient-spinner'"
            class="w-16 h-16 rounded-full border-4 border-t-transparent animate-spin"
            :style="{ borderColor: 'var(--accent-from)', borderTopColor: 'transparent' }">
        </div>

        <!-- orbit -->
        <div v-else-if="currentLoadingScreen === 'orbit'" class="relative w-16 h-16">
            <div class="absolute inset-0 rounded-full border-2 opacity-20"
                :style="{ borderColor: 'var(--accent-from)' }"></div>
            <div class="absolute inset-0 rounded-full border-2 border-t-transparent animate-spin"
                :style="{ borderColor: 'var(--accent-to)' }"></div>
            <div class="absolute inset-4 rounded-full animate-pulse" :style="{ backgroundColor: 'var(--accent-from)' }">
            </div>
        </div>

        <!-- wave-bars -->
        <div v-else-if="currentLoadingScreen === 'wave-bars'" class="flex items-end space-x-1 h-10">
            <div v-for="(delay, i) in ['0s', '0.1s', '0.2s', '0.1s', '0s']" :key="i" class="w-2 rounded-full animate-bounce"
                :style="{
                    backgroundColor: i % 2 === 0 ? 'var(--accent-from)' : 'var(--accent-to)',
                    animationDelay: delay,
                    height: `${[60, 80, 100, 80, 60][i]}%`
                }">
            </div>
        </div>

    </div>
</template>

<script setup>
import { currentLoadingScreen } from './../stores/loadingScreen.js';
</script>
