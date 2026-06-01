<template>
  <section
    class="relative py-20 overflow-hidden"
    id="soft-skills"
    style="background-color: var(--surface-bg);"
  >
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- ── Breadcrumb ── -->
      <nav class="flex mb-8" aria-label="Breadcrumb" data-aos="fade-down">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <router-link
              to="/#skills"
              class="group inline-flex items-center text-sm font-medium transition-all duration-300"
              style="color: var(--surface-text-sub);"
            >
              <div class="mr-2">
                <HomeIcon class="breadcrumb-home-icon w-4 h-4" />
              </div>
              <span class="breadcrumb-home-text">{{ t('home') }}</span>
            </router-link>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="w-6 h-6" style="color: var(--surface-text-dim);" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd" />
              </svg>
              <span
                class="ml-1 text-sm font-semibold md:ml-2 text-transparent bg-clip-text"
                :style="{ backgroundImage: 'var(--logo-gradient)' }"
              >{{ t('soft_skills') }}</span>
            </div>
          </li>
        </ol>
      </nav>

      <!-- ── Heading ── -->
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="text-4xl md:text-5xl font-bold mb-4" style="color: var(--surface-text);">
          {{ t('my1_') }}
          <span class="text-transparent bg-clip-text" :style="{ backgroundImage: 'var(--logo-gradient)' }">
            {{ t('soft_skills') }}
          </span>{{ t('_my2') }}
        </h2>
        <p class="text-lg max-w-2xl mx-auto" style="color: var(--surface-text-sub);" data-aos="fade-up" data-aos-delay="100">
          The personal strengths and human qualities that shape how I work, collaborate, and grow every day.
        </p>
      </div>

      <!-- ── Search & Filter Controls ── -->
      <div class="mb-12 space-y-6" data-aos="fade-up">
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">

          <!-- Search -->
          <div class="relative w-full md:w-96">
            <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style="color: var(--surface-text-dim);" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search soft skill..."
              class="search-input w-full rounded-xl py-3 pl-10 pr-4 focus:outline-none transition-all text-sm"
            />
          </div>

          <!-- Buttons -->
          <div class="flex flex-wrap gap-3 items-center justify-center">
            <button @click="showFilters = !showFilters" class="ctrl-btn px-4 py-2 rounded-lg text-sm transition-all">
              {{ showFilters ? 'Hide Filters' : 'Show Filters' }}
            </button>
            <button
              @click="isGrouped = !isGrouped"
              class="ctrl-btn px-4 py-2 rounded-lg text-sm transition-all"
              :class="{ 'ctrl-btn-active': isGrouped }"
            >
              {{ isGrouped ? 'Ungroup' : 'Group by Category' }}
            </button>
            <button @click="resetFilters" class="px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors">
              Remove Filters
            </button>
          </div>
        </div>

        <!-- ── Expandable Filter Panel ── -->
        <transition name="fade">
          <div v-if="showFilters" class="filter-panel grid grid-cols-1 md:grid-cols-2 gap-8 p-6 rounded-2xl">
            <div>
              <label class="block text-xs uppercase mb-3 font-bold tracking-widest" style="color: var(--surface-text-sub);">
                Filter by Category
              </label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="cat in skillCategories" :key="cat"
                  @click="selectedCategory = cat"
                  class="filter-chip px-3 py-1.5 rounded-md text-xs transition-all"
                  :class="selectedCategory === cat ? 'filter-chip-active' : 'filter-chip-idle'"
                >{{ cat }}</button>
              </div>
            </div>
            <div>
              <label class="block text-xs uppercase mb-3 font-bold tracking-widest" style="color: var(--surface-text-sub);">
                Filter by Type
              </label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="tp in skillTypes" :key="tp"
                  @click="selectedType = tp"
                  class="filter-chip px-3 py-1.5 rounded-md text-xs transition-all"
                  :class="selectedType === tp ? 'filter-chip-active' : 'filter-chip-idle'"
                >{{ tp }}</button>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- ── Empty state ── -->
      <div v-if="filteredSkills.length === 0" class="text-center py-20">
        <p class="text-lg" style="color: var(--surface-text-dim);">No soft skills found matching your criteria.</p>
        <button @click="resetFilters" class="mt-4 text-sm underline" style="color: var(--accent-text);">
          Clear all filters
        </button>
      </div>

      <!-- ── Timeline ── -->
      <div v-else class="relative mt-12">

        <!-- Center vertical line -->
        <div
          class="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] hidden md:block"
          :style="{
            backgroundColor: 'var(--accent-line)',
            boxShadow:       '0 0 10px var(--accent-line-glow)',
          }"
          data-aos="fade-down"
          data-aos-duration="1500"
        />

        <div class="space-y-12 md:space-y-6">
          <div
            v-for="(softskill, index) in groupedSkillsFlat"
            :key="softskill.id"
            class="relative flex flex-col md:flex-row items-start w-full"
            :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
          >
            <!-- Content side -->
            <div
              class="w-full md:w-1/2 px-4 md:px-16 flex"
              :class="index % 2 === 0 ? 'md:justify-end md:text-right' : 'md:justify-start md:text-left'"
              :data-aos="index % 2 === 0 ? 'fade-right' : 'fade-left'"
              data-aos-duration="1000"
            >
              <div
                class="max-w-md w-full flex flex-col"
                :class="index % 2 === 0 ? 'md:items-end' : 'md:items-start'"
              >
                <!-- Mobile number badge -->
                <div
                  class="md:hidden w-10 h-10 mb-4 flex items-center justify-center font-bold rounded-lg border"
                  :style="{
                    backgroundColor: 'var(--accent-node-bg)',
                    borderColor:     softskill.useAccent2 ? 'var(--icon-accent-2)' : 'var(--accent-text)',
                    color:           softskill.useAccent2 ? 'var(--icon-accent-2)' : 'var(--accent-text)',
                    boxShadow:       softskill.useAccent2 ? '0 0 10px var(--accent-border-2)' : '0 0 10px var(--accent-shadow)',
                  }"
                >{{ index + 1 }}</div>

                <!-- Category badge (shown when not grouped) -->
                <div v-if="!isGrouped" class="mb-2">
                  <span
                    class="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider"
                    :style="{ background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', color: 'var(--accent-text)' }"
                  >{{ softskill.category }}</span>
                </div>

                <!-- Title -->
                <h3
                  class="text-2xl font-bold tracking-tight mb-2 transition-colors duration-300 cursor-default"
                  style="color: var(--surface-text);"
                  @mouseenter="e => e.currentTarget.style.color = softskill.useAccent2 ? 'var(--icon-accent-2)' : 'var(--accent-text)'"
                  @mouseleave="e => e.currentTarget.style.color = 'var(--surface-text)'"
                >{{ softskill.name }}</h3>

                <!-- Underline bar -->
                <div
                  class="w-24 h-[2px] mb-4 transition-all duration-500"
                  :style="{
                    backgroundColor: softskill.useAccent2 ? 'var(--icon-accent-2)' : 'var(--accent-text)',
                    boxShadow:       softskill.useAccent2 ? '0 0 8px var(--accent-border-2)' : '0 0 8px var(--accent-shadow)',
                  }"
                />

                <!-- Description -->
                <p class="text-lg leading-relaxed" style="color: var(--surface-text-sub);">
                  {{ softskill.desc }}
                </p>

                <!-- Type badge -->
                <span
                  class="mt-3 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider self-start"
                  :class="index % 2 === 0 ? 'md:self-end' : 'md:self-start'"
                  style="background: var(--surface-bg-3); border: 1px solid var(--surface-border); color: var(--surface-text-dim);"
                >{{ softskill.type }}</span>
              </div>
            </div>

            <!-- Center number node (desktop) -->
            <div
              class="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center z-20"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div
                class="w-12 h-12 flex items-center justify-center font-bold rounded-xl border-2 transition-transform duration-300 hover:scale-110"
                :style="{
                  backgroundColor: 'var(--accent-node-bg)',
                  borderColor:     softskill.useAccent2 ? 'var(--icon-accent-2)' : 'var(--accent-text)',
                  color:           softskill.useAccent2 ? 'var(--icon-accent-2)' : 'var(--accent-text)',
                  boxShadow:       softskill.useAccent2 ? '0 0 20px var(--accent-border-2)' : '0 0 20px var(--accent-shadow)',
                }"
              >{{ index + 1 }}</div>
            </div>

            <div class="hidden md:block md:w-1/2" />
          </div>
        </div>
      </div>

      <!-- ── CTA ── -->
      <div class="text-center mt-16" data-aos="fade-up" data-aos-delay="800">
        <div class="inline-flex flex-col sm:flex-row gap-4 items-center">
          <router-link
            :to="backPath"
            class="px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center"
            :style="{ background: 'var(--cta-gradient)' }"
            @mouseenter="e => e.currentTarget.style.boxShadow = '0 10px 25px var(--accent-shadow)'"
            @mouseleave="e => e.currentTarget.style.boxShadow = 'none'"
          >
            <ArrowLeftCircleIcon class="w-5 h-5 mr-2" />
            {{ t('click_to_return') }}
          </router-link>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { t } from './../../stores/languages.js';
import { useRouter } from 'vue-router';
import {
  ArrowLeftCircleIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  // Soft-skill-appropriate icons
  BoltIcon,              // Resilience & Optimistic — energy, bounce-back
  PuzzlePieceIcon,       // Analytic Thinking — pieces coming together
  ArrowTrendingUpIcon,   // Active Growth Mindset — upward momentum
  BookOpenIcon,          // Continuous Learning — reading / absorbing knowledge
  ArrowPathIcon,         // Adaptability — rotating, changing direction
  WrenchScrewdriverIcon, // Problem-Solving & Debugging — fixing things
  AcademicCapIcon,       // Self-Directed Learning — self-study
  UserGroupIcon,         // Teamwork & Communication — people together
} from '@heroicons/vue/24/outline';

// ── Filter state ──
const searchQuery      = ref('');
const selectedCategory = ref('All');
const selectedType     = ref('All');
const isGrouped        = ref(false);
const showFilters      = ref(false);

// ── Filter options ──
// category = what kind of skill; type = how it shows up in work
const skillCategories = ['All', 'Mindset', 'Thinking', 'Interpersonal', 'Work Ethic'];
const skillTypes      = ['All', 'Inner Strength', 'Cognitive', 'Social', 'Professional'];

// ── Data ──
const softskills = ref([
  {
    id: 1, useAccent2: false,
    icon: BoltIcon,
    category: 'Mindset',
    type: 'Inner Strength',
    name: 'Resilience & Optimism',
    desc: 'I bounce back from setbacks quickly and approach every challenge with a positive outlook. I believe that difficulties are temporary and that consistent effort always leads to progress.',
  },
  {
    id: 2, useAccent2: true,
    icon: PuzzlePieceIcon,
    category: 'Thinking',
    type: 'Cognitive',
    name: 'Analytical Thinking',
    desc: 'I break down complex problems into smaller, manageable parts and evaluate each one carefully. This structured approach helps me find clear, logical solutions rather than guessing.',
  },
  {
    id: 3, useAccent2: false,
    icon: ArrowTrendingUpIcon,
    category: 'Mindset',
    type: 'Inner Strength',
    name: 'Active Growth Mindset',
    desc: 'I actively seek out feedback, new challenges, and learning opportunities. I see every experience — success or failure — as a chance to improve my skills and expand my perspective.',
  },
  {
    id: 4, useAccent2: true,
    icon: BookOpenIcon,
    category: 'Work Ethic',
    type: 'Professional',
    name: 'Continuous Learning',
    desc: 'Technology evolves fast, and I stay ahead by constantly studying new tools, frameworks, and best practices. I dedicate time every day to reading, experimenting, and building new things.',
  },
  {
    id: 5, useAccent2: false,
    icon: ArrowPathIcon,
    category: 'Mindset',
    type: 'Inner Strength',
    name: 'Adaptability',
    desc: 'I thrive in changing environments and adjust smoothly when project requirements, tools, or team dynamics shift. I stay calm under pressure and focus on finding the best path forward.',
  },
  {
    id: 6, useAccent2: true,
    icon: WrenchScrewdriverIcon,
    category: 'Thinking',
    type: 'Cognitive',
    name: 'Problem-Solving & Debugging',
    desc: 'When something breaks, I approach it methodically — reading error logs, isolating the cause, and testing fixes step by step. I enjoy the process of turning a broken system into a working one.',
  },
  {
    id: 7, useAccent2: false,
    icon: AcademicCapIcon,
    category: 'Work Ethic',
    type: 'Professional',
    name: 'Self-Directed Learning',
    desc: 'I take full ownership of my learning journey. Without needing to be told what to study, I identify the skills I need, find the resources, and push myself to master them independently.',
  },
  {
    id: 8, useAccent2: true,
    icon: UserGroupIcon,
    category: 'Interpersonal',
    type: 'Social',
    name: 'Teamwork & Communication',
    desc: 'I collaborate openly, share knowledge freely, and listen actively to teammates. I communicate technical ideas clearly to both developers and non-technical stakeholders to keep everyone aligned.',
  },
]);

// ── Computed ──
const filteredSkills = computed(() =>
  softskills.value.filter(s => {
    const matchesSearch   = s.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                            s.desc.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value === 'All' || s.category === selectedCategory.value;
    const matchesType     = selectedType.value     === 'All' || s.type     === selectedType.value;
    return matchesSearch && matchesCategory && matchesType;
  })
);

// Flat list (timeline doesn't use sub-groups — grouping just affects badge visibility)
const groupedSkillsFlat = computed(() => filteredSkills.value);

// ── Reset ──
const resetFilters = () => {
  searchQuery.value      = '';
  selectedCategory.value = 'All';
  selectedType.value     = 'All';
  isGrouped.value        = false;
};

// ── Back path ──
const backPath = ref('/#skills');
onMounted(() => {
  const previousPath = window.history.state?.back;
  if (previousPath) {
    if (previousPath.includes('/skills'))        backPath.value = '/skills';
    else if (previousPath.includes('#skills'))   backPath.value = '/#skills';
  }
});
</script>

<style scoped>
/* ── Fade transition (filter panel) ── */
.fade-enter-active, .fade-leave-active { transition: all 0.3s ease-out; }
.fade-enter-from,  .fade-leave-to      { opacity: 0; transform: translateY(-10px); }

/* ── Search input ── */
.search-input {
  background: var(--surface-card);
  border:     1px solid var(--surface-border);
  color:      var(--surface-text);
}
.search-input:focus        { border-color: var(--accent-mid); }
.search-input::placeholder { color: var(--surface-text-dim); }

/* ── Control buttons ── */
.ctrl-btn {
  background: var(--surface-card);
  border:     1px solid var(--surface-border);
  color:      var(--surface-text-sub);
}
.ctrl-btn:hover  { background: var(--surface-bg-3); color: var(--surface-text); }
.ctrl-btn-active { background: var(--accent-mid) !important; border-color: transparent !important; color: #fff !important; }

/* ── Filter panel ── */
.filter-panel {
  background:              var(--surface-card);
  border:                  1px solid var(--surface-border);
  backdrop-filter:         blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* ── Filter chips ── */
.filter-chip-idle       { background: var(--surface-bg-3); color: var(--surface-text-sub); }
.filter-chip-idle:hover { background: var(--surface-bg-2); color: var(--surface-text); }
.filter-chip-active     { background: var(--accent-mid);   color: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }

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