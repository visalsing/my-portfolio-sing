<template>
  <section
    class="relative py-20 overflow-hidden"
    id="services"
    style="background-color: var(--surface-bg);"
  >
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- ── Breadcrumb ── -->
      <nav class="flex mb-8" aria-label="Breadcrumb" data-aos="fade-down">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <router-link
              to="/"
              class="group inline-flex items-center text-sm font-medium transition-all duration-300"
              style="color: var(--surface-text-sub);"
            >
              <div class="mr-2">
                <HomeIcon class="breadcrumb-home-icon w-4 h-4" />
              </div>
              <span class="breadcrumb-home-text">Home</span>
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
              >{{ t('services') }}</span>
            </div>
          </li>
        </ol>
      </nav>

      <!-- ── Heading ── -->
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="text-4xl md:text-5xl font-bold mb-4" style="color: var(--surface-text);">
          {{ t('my1_') }}
          <span class="text-transparent bg-clip-text" :style="{ backgroundImage: 'var(--logo-gradient)' }">
            {{ t('services') }}
          </span>{{ t('_my2') }}
        </h2>
        <p class="text-lg max-w-2xl mx-auto" style="color: var(--surface-text-sub);" data-aos="fade-up" data-aos-delay="100">
          {{ t('services_subtitle') }}
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
              placeholder="Search service..."
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
                  v-for="cat in serviceCategories" :key="cat"
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
                  v-for="tp in serviceTypes" :key="tp"
                  @click="selectedType = tp"
                  class="filter-chip px-3 py-1.5 rounded-md text-xs transition-all"
                  :class="selectedType === tp ? 'filter-chip-active' : 'filter-chip-idle'"
                >{{ tp }}</button>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- ── Grouped View ── -->
      <div v-if="filteredServices.length > 0">
        <div v-for="group in groupedServices" :key="group.name" class="mb-12">

          <!-- Group header (only when grouped) -->
          <div v-if="isGrouped" class="flex items-center gap-4 mb-8 mt-12" data-aos="fade-right">
            <h3
              class="text-xl font-bold whitespace-nowrap bg-clip-text text-transparent"
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

          <!-- ── Service Cards ── -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="(service, index) in group.services"
              :key="service.id"
              data-aos="fade-up"
              :data-aos-delay="index * 100"
              class="group relative p-8 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 cursor-default"
              :style="{
                background: 'linear-gradient(to bottom right, var(--surface-card), var(--section-grad-to))',
                border: '1px solid var(--surface-border)',
              }"
              @mouseenter="e => e.currentTarget.style.borderColor = 'var(--accent-border-hover)'"
              @mouseleave="e => e.currentTarget.style.borderColor = 'var(--surface-border)'"
            >
              <!-- Hover glow overlay -->
              <div
                class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                :style="{ backgroundColor: 'var(--accent-glow)' }"
              />

              <!-- Icon box -->
              <div class="relative z-10 mb-6">
                <div
                  class="inline-flex items-center justify-center w-16 h-16 rounded-xl border group-hover:scale-110 transition-transform duration-300"
                  :style="{
                    background: 'linear-gradient(to right, var(--icon-bg), var(--icon-bg-2))',
                    borderColor: 'var(--accent-border)',
                  }"
                >
                  <component :is="service.icon" class="w-8 h-8" :style="{ color: 'var(--icon-accent)' }" />
                </div>
              </div>

              <!-- Text -->
              <div class="relative z-10">
                <h3
                  class="text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-[var(--accent-text)]"
                  style="color: var(--surface-text);"
                >{{ service.name }}</h3>
                <p class="leading-relaxed text-sm" style="color: var(--surface-text-sub);">
                  {{ service.desc }}
                </p>
                <!-- Category + Type badges -->
                <div class="flex flex-wrap gap-2 mt-4">
                  <span
                    class="px-2 py-1 rounded text-[10px] font-semibold uppercase tracking-wider"
                    :style="{ background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', color: 'var(--accent-text)' }"
                  >{{ service.category }}</span>
                  <span
                    class="px-2 py-1 rounded text-[10px] uppercase tracking-wider"
                    style="background: var(--surface-bg-3); border: 1px solid var(--surface-border); color: var(--surface-text-dim);"
                  >{{ service.type }}</span>
                </div>
              </div>

              <!-- Arrow -->
              <div
                class="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300"
              >
                <router-link to="/services/detail">
                  <ArrowRightIcon class="w-6 h-6" :style="{ color: 'var(--icon-accent-2)' }" />
                </router-link>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- ── Empty State ── -->
      <div v-else class="text-center py-20">
        <p class="text-lg" style="color: var(--surface-text-dim);">
          No services found matching your criteria.
        </p>
        <button @click="resetFilters" class="mt-4 text-sm underline" style="color: var(--accent-text);">
          Clear all filters
        </button>
      </div>

      <!-- ── CTA ── -->
      <div class="text-center mt-16" data-aos="fade-up" data-aos-delay="800">
        <div class="inline-flex flex-col sm:flex-row gap-4 items-center">

          <router-link
            to="/#services"
            class="px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center"
            :style="{ background: 'var(--cta-gradient)' }"
            @mouseenter="e => e.currentTarget.style.boxShadow = '0 10px 25px var(--accent-shadow)'"
            @mouseleave="e => e.currentTarget.style.boxShadow = 'none'"
          >
            <ArrowLeftCircleIcon class="w-5 h-5 mr-2" />
            Back to Home Page
          </router-link>

          <button
            class="px-8 py-4 rounded-xl border-2 font-semibold transition-all duration-300 flex items-center"
            :style="{ borderColor: 'var(--accent-text)', color: 'var(--accent-text)' }"
            @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--accent-bg)'"
            @mouseleave="e => e.currentTarget.style.backgroundColor = 'transparent'"
          >
            Get In Touch
            <ChatBubbleLeftRightIcon class="w-5 h-5 ml-2" />
          </button>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { t } from './../../stores/languages.js';
import {
  CloudArrowUpIcon, ArrowRightIcon, ChatBubbleLeftRightIcon,
  CodeBracketIcon, CommandLineIcon, PaintBrushIcon, DocumentTextIcon,
  CpuChipIcon, EnvelopeIcon, VideoCameraIcon, DevicePhoneMobileIcon,
  WindowIcon, PhotoIcon, ChatBubbleBottomCenterTextIcon,
  MagnifyingGlassCircleIcon, ServerIcon, LanguageIcon,
  ArrowLeftCircleIcon, HomeIcon, MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline';

// ── Filter state ──
const searchQuery      = ref('');
const selectedCategory = ref('All');
const selectedType     = ref('All');
const isGrouped        = ref(false);
const showFilters      = ref(false);

// ── Filter options ──
// Categories map to logical groupings of the 15 services
const serviceCategories = ['All', 'Development', 'Design', 'Content', 'Infrastructure', 'Services'];
const serviceTypes      = ['All', 'Technical', 'Creative', 'Consulting'];

// ── Service data ──
// Each service has a category + type so the filter works
const services = ref([
  { id: 1,  icon: CodeBracketIcon,                  name: 'Web Frontend Development',  category: 'Development',    type: 'Technical',   desc: 'Creating beautiful, responsive, and fast user interfaces using modern tools like Vue.js, React, and Tailwind CSS.' },
  { id: 2,  icon: CommandLineIcon,                  name: 'Web Backend Development',   category: 'Development',    type: 'Technical',   desc: 'Building the "brains" of your application, handling server logic, and managing secure databases with Laravel and Node.js.' },
  { id: 3,  icon: PaintBrushIcon,                   name: 'Web Designing',             category: 'Design',         type: 'Creative',    desc: 'Designing modern and professional website layouts that look great on both desktop and mobile screens.' },
  { id: 4,  icon: DocumentTextIcon,                 name: 'Technical Writing',         category: 'Content',        type: 'Creative',    desc: 'Writing clear, easy-to-understand guides, documentation, and tutorials for software and coding projects.' },
  { id: 5,  icon: CpuChipIcon,                      name: 'API Integration & Dev',     category: 'Development',    type: 'Technical',   desc: 'Connecting different software services together and building custom APIs to share data between platforms.' },
  { id: 6,  icon: EnvelopeIcon,                     name: 'Email Marketing',           category: 'Services',       type: 'Consulting',  desc: 'Setting up automated email systems and newsletters to keep your customers engaged and informed.' },
  { id: 7,  icon: VideoCameraIcon,                  name: 'Content Creation',          category: 'Content',        type: 'Creative',    desc: 'Making educational videos and social media content to explain technology and teach coding skills.' },
  { id: 8,  icon: DevicePhoneMobileIcon,            name: 'Mobile App Development',    category: 'Development',    type: 'Technical',   desc: 'Building useful and smooth mobile applications for iOS and Android using Flutter and Dart.' },
  { id: 9,  icon: WindowIcon,                       name: 'UI/UX Design',              category: 'Design',         type: 'Creative',    desc: 'Focusing on how users interact with your app to make sure it is easy, intuitive, and enjoyable to use.' },
  { id: 10, icon: CloudArrowUpIcon,                 name: 'DevOps & Deployment',       category: 'Infrastructure', type: 'Technical',   desc: 'Moving your code to the cloud and managing servers on AWS or DigitalOcean to keep your site online 24/7.' },
  { id: 11, icon: PhotoIcon,                        name: 'Graphic Design',            category: 'Design',         type: 'Creative',    desc: 'Creating visual assets, logos, and digital graphics using Photoshop and Canva to boost your brand identity.' },
  { id: 12, icon: ChatBubbleBottomCenterTextIcon,   name: 'Automation & ChatBot',      category: 'Development',    type: 'Technical',   desc: 'Creating smart Telegram bots and automated workflows to save time and handle tasks automatically.' },
  { id: 13, icon: MagnifyingGlassCircleIcon,        name: 'System Testing',            category: 'Infrastructure', type: 'Technical',   desc: 'Testing software to find bugs and ensure everything works perfectly before it reaches your users.' },
  { id: 14, icon: ServerIcon,                       name: 'System Administration',     category: 'Infrastructure', type: 'Technical',   desc: 'Setting up and maintaining computers, local networks, and development environments like XAMPP or Docker.' },
  { id: 15, icon: LanguageIcon,                     name: 'Translation Services',      category: 'Services',       type: 'Consulting',  desc: 'Providing accurate translation and localization between Khmer, English, Chinese, and other regional languages.' },
]);

// ── Computed ──
const filteredServices = computed(() =>
  services.value.filter(s => {
    const matchesSearch   = s.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                            s.desc.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value === 'All' || s.category === selectedCategory.value;
    const matchesType     = selectedType.value     === 'All' || s.type     === selectedType.value;
    return matchesSearch && matchesCategory && matchesType;
  })
);

const groupedServices = computed(() => {
  if (!isGrouped.value) {
    return [{ name: 'All Services', services: filteredServices.value }];
  }
  const groups = {};
  filteredServices.value.forEach(s => {
    if (!groups[s.category]) groups[s.category] = [];
    groups[s.category].push(s);
  });
  return Object.keys(groups).map(name => ({ name, services: groups[name] }));
});

const resetFilters = () => {
  searchQuery.value      = '';
  selectedCategory.value = 'All';
  selectedType.value     = 'All';
  isGrouped.value        = false;
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