<template>
  <div class="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">

    <!-- Title -->
    <h1 class="text-4xl font-bold">Forward Page 🚀</h1>

    <!-- Description -->
    <p class="text-gray-400 text-center max-w-md">
      This is the Forward page. You can navigate back to home or go to other sections.
    </p>

    <!-- Buttons -->
    <div class="flex gap-4">

      <!-- Back to Home -->
      <router-link to="/"
        class="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg transition">
        ⬅ Back Home
      </router-link>

      <!-- Go to Details -->
      <router-link to="/details"
        class="px-6 py-3 border border-blue-400 hover:bg-blue-400/10 rounded-lg transition">
        Go to Details ➡
      </router-link>

    </div>

  </div>
</template>

<script setup>
// You can add logic here later if needed
</script>