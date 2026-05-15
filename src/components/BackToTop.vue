<template>
    <!-- bg-linear-to-r from-blue-600 to-cyan-600 -->
    <button v-if="isVisible" @click="scrollToTop" class="fixed bottom-4 right-4 z-50
        flex items-center justify-center
        w-12 h-12 rounded-full
        text-white text-xl cursor-pointer
        transition-opacity duration-300
        hover:opacity-90" :style="{
            background: 'var(--back-to-top-bg)',
        }">
        ↑
    </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

const handleScroll = () => {
    isVisible.value = window.scrollY > 300
}

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>
