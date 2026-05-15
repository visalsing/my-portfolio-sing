<script setup lang="ts">
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
</script>

<template>
    <div class="min-h-screen bg-black text-white">

        <!-- 🔝 Navbar -->
        <nav class="flex justify-between items-center px-6 md:px-12 py-4 border-b border-white/10">
            <h1 class="text-xl font-bold text-white">Visalsing</h1>

            <router-link to="/" class="text-blue-400 hover:text-blue-300 transition">
                Home
            </router-link>
        </nav>

        <!-- 🚀 Hero Section -->
        <section class="py-20 text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">Details Page 🚀</h1>
            <p class="text-gray-400 max-w-xl mx-auto">
                This is a dedicated details page with structured layout and clean design.
            </p>
        </section>

        <!-- 🧩 Section 1: Image LEFT / Text RIGHT -->
        <section class="py-16 px-6 md:px-12 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

            <!-- Image -->
            <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" alt="code"
                class="rounded-2xl shadow-lg w-full h-[300px] object-cover" />

            <!-- Text -->
            <div>
                <h2 class="text-3xl font-bold mb-4">Modern Development</h2>
                <p class="text-gray-400 leading-relaxed">
                    Build scalable and performant applications using modern tools like Vue, Node.js,
                    and cloud technologies. Focus on clean architecture and maintainable code.
                </p>
            </div>
        </section>

        <!-- 🧩 Section 2: Text LEFT / Image RIGHT -->
        <section class="py-16 px-6 md:px-12 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

            <!-- Text -->
            <div>
                <h2 class="text-3xl font-bold mb-4">Creative UI/UX</h2>
                <p class="text-gray-400 leading-relaxed">
                    Design matters. Create beautiful and intuitive user experiences with modern UI tools,
                    animations, and responsive layouts.
                </p>
            </div>

            <!-- Image -->
            <img src="https://images.unsplash.com/photo-1559028012-481c04fa702d" alt="design"
                class="rounded-2xl shadow-lg w-full h-[300px] object-cover" />
        </section>

        <!-- 🔘 Actions -->
        <section class="py-16 flex flex-col sm:flex-row gap-4 justify-center items-center">

            <!-- Back -->
            <router-link :to="{ path: '/', hash: '#about' }"
                class="px-8 py-4 rounded-xl flex items-center bg-blue-600 hover:bg-blue-500 transition">
                <ArrowLeftIcon class="w-5 h-5 mr-2" />
                Back to Home
            </router-link>

            <!-- Forward -->
            <router-link to="/forward"
                class="px-8 py-4 rounded-xl flex items-center border border-blue-400 hover:bg-blue-400/10 transition">
                Go Forward
                <ArrowRightIcon class="w-5 h-5 ml-2" />
            </router-link>

        </section>

        <!-- 🔻 Footer -->
        <footer class="text-center py-6 border-t border-white/10 text-gray-500 text-sm">
            © 2026 Visalsing. All rights reserved.
        </footer>

    </div>
</template>