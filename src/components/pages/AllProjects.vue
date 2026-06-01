<template>
  <div class="min-h-screen" style="background-color: var(--surface-bg);">
    <section class="relative py-20 overflow-hidden" id="projects">
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- ── Breadcrumb ── -->
        <nav class="flex mb-8" aria-label="Breadcrumb" data-aos="fade-down">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <router-link
                to="/#projects"
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
                >{{ t('projects') }}</span>
              </div>
            </li>
          </ol>
        </nav>

        <!-- ── Header ── -->
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-4xl md:text-5xl font-bold mb-4" style="color: var(--surface-text);">
            My
            <span class="text-transparent bg-clip-text" :style="{ backgroundImage: 'var(--logo-gradient)' }">
              Projects
            </span>
          </h2>
          <p class="text-lg max-w-2xl mx-auto" style="color: var(--surface-text-sub);">
            A collection of my recent work and creative solutions
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
                placeholder="Search project name..."
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
                {{ isGrouped ? 'Ungroup' : 'Group' }}
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
                    v-for="cat in techStack" :key="cat"
                    @click="selectedFilter = cat.toLowerCase()"
                    class="filter-chip px-3 py-1.5 rounded-md text-xs transition-all"
                    :class="selectedFilter === cat.toLowerCase() ? 'filter-chip-active' : 'filter-chip-idle'"
                  >{{ cat }}</button>
                </div>
              </div>
              <div>
                <label class="block text-xs uppercase mb-3 font-bold tracking-widest" style="color: var(--surface-text-sub);">
                  Filter by Type
                </label>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="tType in projectTypes" :key="tType"
                    @click="selectedType = tType.toLowerCase()"
                    class="filter-chip px-3 py-1.5 rounded-md text-xs transition-all"
                    :class="selectedType === tType.toLowerCase() ? 'filter-chip-active' : 'filter-chip-idle'"
                  >{{ tType }}</button>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- ── Project Groups ── -->
        <div v-if="filteredProjects.length > 0">
          <div v-for="group in groupedProjects" :key="group.name" class="mb-12">

            <!-- Group header (only shown when grouped) -->
            <div v-if="isGrouped" class="flex items-center gap-4 mb-8 mt-12" data-aos="fade-right">
              <h3
                class="text-xl font-bold bg-clip-text text-transparent whitespace-nowrap"
                :style="{ backgroundImage: 'var(--logo-gradient)', WebkitBackgroundClip: 'text' }"
              >{{ group.name }}</h3>
              <div
                class="h-[1px] w-full"
                style="
                  background: var(--logo-gradient);
                  mask-image: linear-gradient(to right, black, transparent);
                  -webkit-mask-image: linear-gradient(to right, black, transparent);
                  opacity: 0.5;
                "
              />
            </div>

            <!-- Project Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div
                v-for="(project, index) in group.projects"
                :key="project.id"
                class="group relative rounded-3xl overflow-hidden backdrop-blur-sm transition-all duration-500 hover:-translate-y-2"
                :style="{
                  background: 'linear-gradient(to bottom right, var(--surface-card), var(--section-grad-to))',
                  border: `1px solid ${project.useAccent2 ? 'var(--accent-border-2-soft)' : 'var(--surface-border)'}`,
                }"
                data-aos="fade-up"
                :data-aos-delay="index * 100"
              >
                <!-- Image -->
                <div class="relative overflow-hidden">
                  <img
                    :src="project.image"
                    :alt="project.title"
                    class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                  <div class="absolute top-4 right-4">
                    <span
                      class="px-3 py-1 text-white text-[10px] rounded-full font-bold uppercase tracking-wider"
                      :style="{ backgroundColor: project.useAccent2 ? 'var(--accent-to-mid)' : 'var(--accent-mid)' }"
                    >{{ project.category }}</span>
                  </div>
                </div>

                <!-- Content -->
                <div class="p-6">
                  <h3 class="text-xl font-bold mb-2" style="color: var(--surface-text);">{{ project.title }}</h3>
                  <p class="text-sm leading-relaxed mb-4" style="color: var(--surface-text-sub);">{{ project.desc }}</p>

                  <!-- Tech pills -->
                  <div class="flex flex-wrap gap-2 mb-4">
                    <span
                      v-for="tech in project.technolg"
                      :key="tech.name"
                      class="px-2 py-1 border rounded text-[10px]"
                      :style="tech.useAccent2
                        ? { backgroundColor: 'var(--accent-border-2-soft)', borderColor: 'var(--accent-to-bg-hover)', color: 'var(--accent-to-pill-txt-dynamic)' }
                        : { backgroundColor: 'var(--accent-bg)', borderColor: 'var(--accent-border)', color: 'var(--accent-text)' }"
                    >{{ tech.name }}</span>
                  </div>

                  <!-- Links -->
                  <div class="flex gap-4">
                    <template v-for="link in project.links" :key="link.name">
                      <router-link
                        v-if="link.name === 'View'"
                        :to="{ name: 'EachProject', params: { id: project.id } }"
                        class="flex items-center gap-2 text-sm font-medium transition-all hover:opacity-75"
                        :style="{ color: link.useAccent2 ? 'var(--icon-accent-2)' : 'var(--accent-text)' }"
                      >
                        <component :is="link.icon" class="w-4 h-4" />
                        {{ link.name }}
                      </router-link>
                      <a
                        v-else
                        :href="link.url"
                        class="flex items-center gap-2 text-sm font-medium transition-all hover:opacity-75"
                        :style="{ color: link.useAccent2 ? 'var(--icon-accent-2)' : 'var(--accent-text)' }"
                      >
                        <component :is="link.icon" class="w-4 h-4" />
                        {{ link.name }}
                      </a>
                    </template>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- ── Empty State ── -->
        <div v-else class="text-center py-20">
          <p class="text-lg" style="color: var(--surface-text-dim);">
            No projects found matching your criteria.
          </p>
          <button @click="resetFilters" class="mt-4 text-sm underline" style="color: var(--accent-text);">
            Clear all filters
          </button>
        </div>

        <!-- ── CTA ── -->
        <div class="text-center mt-16" data-aos="fade-up" data-aos-delay="800">
          <router-link
            to="/#projects"
            class="inline-flex items-center px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105"
            :style="{ background: 'var(--cta-gradient)' }"
            @mouseenter="e => e.currentTarget.style.boxShadow = '0 10px 25px var(--accent-shadow)'"
            @mouseleave="e => e.currentTarget.style.boxShadow = 'none'"
          >
            <ArrowLeftCircleIcon class="w-5 h-5 mr-2" />
            Back to Homepage
          </router-link>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
  ArrowLeftCircleIcon,
  ClockIcon,
  CodeBracketIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  HomeIcon,
} from '@heroicons/vue/24/outline';
import { t } from './../../stores/languages.js';

// ── Filter state ──
const selectedFilter = ref('all');
const selectedType   = ref('all');
const searchQuery    = ref('');
const showFilters    = ref(false);
const isGrouped      = ref(true);

// ── Filter options ──
const techStack    = ['All', 'Web', 'Mobile', 'Presentation', 'UX/UI', 'Content'];
const projectTypes = ['All', 'Personal Project', 'Team Project', 'Client Work'];

// ── Project data ──
const projects = ref([
  {
    id: 1, useAccent2: false,
    title: 'E-Commerce Platform',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: '../public/project1.png',
    category: 'Web',
    filters: ['web'],
    type: 'personal project',
    technolg: [
      { name: 'Vue.js',   useAccent2: false },
      { name: 'Node.js',  useAccent2: true },
      { name: 'MongoDB',  useAccent2: false },
    ],
    links: [
      { name: 'Live Demo', url: '#', icon: EyeIcon,          useAccent2: false },
      { name: 'Code',      url: '#', icon: CodeBracketIcon,  useAccent2: true },
      { name: 'View',      url: '#', icon: EyeIcon,          useAccent2: false },
    ],
  },
  {
    id: 2, useAccent2: true,
    title: 'Portfolio App',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: '../public/project2.png',
    category: 'Mobile',
    filters: ['mobile'],
    type: 'personal project',
    technolg: [
      { name: 'React Native', useAccent2: true },
      { name: 'Firebase',     useAccent2: false },
      { name: 'Redux',        useAccent2: true },
    ],
    links: [
      { name: 'Live Demo', url: '#', icon: EyeIcon,         useAccent2: false },
      { name: 'Code',      url: '#', icon: CodeBracketIcon, useAccent2: true },
      { name: 'View',      url: '#', icon: EyeIcon,         useAccent2: false },
    ],
  },
  {
    id: 3, useAccent2: false,
    title: 'Social Media Platform',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: '../public/project3.png',
    category: 'Web',
    filters: ['web', 'mobile'],
    type: 'team project',
    technolg: [
      { name: 'Vue.js',   useAccent2: false },
      { name: 'D3.js',    useAccent2: true },
      { name: 'Express',  useAccent2: false },
    ],
    links: [
      { name: 'Live Demo', url: '#', icon: EyeIcon,         useAccent2: false },
      { name: 'Code',      url: '#', icon: CodeBracketIcon, useAccent2: true },
      { name: 'View',      url: '#', icon: EyeIcon,         useAccent2: false },
    ],
  },
  {
    id: 4, useAccent2: true,
    title: 'Restaurant Website',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: '../public/project4.png',
    category: 'Web',
    filters: ['web'],
    type: 'personal project',
    technolg: [
      { name: 'React',      useAccent2: true },
      { name: 'Socket.io',  useAccent2: false },
      { name: 'PostgreSQL', useAccent2: true },
    ],
    links: [
      { name: 'Live Demo', url: '#', icon: EyeIcon,         useAccent2: false },
      { name: 'Code',      url: '#', icon: CodeBracketIcon, useAccent2: true },
      { name: 'View',      url: '#', icon: EyeIcon,         useAccent2: false },
    ],
  },
  {
    id: 5, useAccent2: false,
    title: 'Portfolio Website',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: '../public/project5.png',
    category: 'Web',
    filters: ['web'],
    type: 'personal project',
    technolg: [
      { name: 'Vue.js',      useAccent2: false },
      { name: 'Tailwind CSS', useAccent2: true },
      { name: 'AOS',         useAccent2: false },
    ],
    links: [
      { name: 'Live Demo', url: '#', icon: EyeIcon,         useAccent2: false },
      { name: 'Code',      url: '#', icon: CodeBracketIcon, useAccent2: true },
      { name: 'View',      url: '#', icon: EyeIcon,         useAccent2: false },
    ],
  },
  {
    id: 6, useAccent2: true,
    title: 'Dashboard',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: '../public/project6.png',
    category: 'Web',
    filters: ['web'],
    type: 'personal project',
    technolg: [
      { name: 'Dashboard', useAccent2: false, neutral: true },
    ],
    links: [
      { name: 'In Progress', url: '#', icon: ClockIcon, useAccent2: false, neutral: true },
    ],
  },
]);

// ── Computed ──
const filteredProjects = computed(() =>
  projects.value.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCat    = selectedFilter.value === 'all' || (p.category && p.category.toLowerCase() === selectedFilter.value);
    const projectType   = p.type ? p.type.toLowerCase() : '';
    const matchesType   = selectedType.value === 'all' || projectType === selectedType.value;
    return matchesSearch && matchesCat && matchesType;
  })
);

const groupedProjects = computed(() => {
  if (!isGrouped.value) {
    return [{ name: 'All Projects', projects: filteredProjects.value }];
  }
  const groups = {};
  filteredProjects.value.forEach(p => {
    if (!groups[p.category]) groups[p.category] = [];
    groups[p.category].push(p);
  });
  return Object.keys(groups).map(name => ({ name, projects: groups[name] }));
});

const resetFilters = () => {
  selectedFilter.value = 'all';
  selectedType.value   = 'all';
  searchQuery.value    = '';
};
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
  background:          var(--surface-card);
  border:              1px solid var(--surface-border);
  backdrop-filter:     blur(12px);
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