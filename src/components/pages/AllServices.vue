<template>
  <section class="relative py-20 overflow-hidden" id="services" style="background-color: var(--surface-bg);">
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- ── Breadcrumb ── -->
      <nav class="flex mb-8" aria-label="Breadcrumb" data-aos="fade-down">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <router-link to="/#services" class="group inline-flex items-center text-sm font-medium transition-all duration-300"
              style="color: var(--surface-text-sub);">
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
              <span class="ml-1 text-sm font-semibold md:ml-2 text-transparent bg-clip-text"
                :style="{ backgroundImage: 'var(--logo-gradient)' }">{{ t('services') }}</span>
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
        <p class="text-lg max-w-2xl mx-auto" style="color: var(--surface-text-sub);" data-aos="fade-up"
          data-aos-delay="100">
          {{ t('services_subtitle') }}
        </p>
      </div>

      <!-- ── Search & Filter Controls ── -->
      <div class="mb-12 space-y-6" data-aos="fade-up">
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">

          <!-- Search -->
          <div class="relative w-full md:w-96">
            <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
              style="color: var(--surface-text-dim);" />
            <input v-model="searchQuery" type="text" placeholder="Search service..."
              class="search-input w-full rounded-xl py-3 pl-10 pr-4 focus:outline-none transition-all text-sm" />
          </div>

          <!-- Buttons -->
          <div class="flex flex-wrap gap-3 items-center justify-center">
            <button @click="showFilters = !showFilters" class="ctrl-btn px-4 py-2 rounded-lg text-sm transition-all">
              {{ showFilters ? 'Hide Filters' : 'Show Filters' }}
            </button>
            <button @click="isGrouped = !isGrouped" class="ctrl-btn px-4 py-2 rounded-lg text-sm transition-all"
              :class="{ 'ctrl-btn-active': isGrouped }">
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
              <label class="block text-xs uppercase mb-3 font-bold tracking-widest"
                style="color: var(--surface-text-sub);">
                Filter by Category
              </label>
              <div class="flex flex-wrap gap-2">
                <button v-for="cat in serviceCategories" :key="cat" @click="selectedCategory = cat"
                  class="filter-chip px-3 py-1.5 rounded-md text-xs transition-all"
                  :class="selectedCategory === cat ? 'filter-chip-active' : 'filter-chip-idle'">{{ cat }}</button>
              </div>
            </div>
            <div>
              <label class="block text-xs uppercase mb-3 font-bold tracking-widest"
                style="color: var(--surface-text-sub);">
                Filter by Type
              </label>
              <div class="flex flex-wrap gap-2">
                <button v-for="tp in serviceTypes" :key="tp" @click="selectedType = tp"
                  class="filter-chip px-3 py-1.5 rounded-md text-xs transition-all"
                  :class="selectedType === tp ? 'filter-chip-active' : 'filter-chip-idle'">{{ tp }}</button>
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
            <h3 class="text-xl font-bold whitespace-nowrap bg-clip-text text-transparent"
              :style="{ backgroundImage: 'var(--logo-gradient)', WebkitBackgroundClip: 'text' }">{{ group.name }}</h3>
            <div class="h-[1px] w-full" style="
                background: var(--logo-gradient);
                mask-image: linear-gradient(to right, black, transparent);
                -webkit-mask-image: linear-gradient(to right, black, transparent);
                opacity: 0.5;
              " />
          </div>

          <!-- ── Service Cards ── -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="(service, index) in group.services" :key="service.id" data-aos="fade-up"
              :data-aos-delay="index * 100"
              class="group relative rounded-2xl backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 cursor-default overflow-hidden flex flex-col justify-between"
              :style="{
                background: 'linear-gradient(to bottom right, var(--surface-card), var(--section-grad-to))',
                border: '1px solid var(--surface-border)',
              }" @mouseenter="e => e.currentTarget.style.borderColor = 'var(--accent-border-hover)'"
              @mouseleave="e => e.currentTarget.style.borderColor = 'var(--surface-border)'">

              <div
                class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                :style="{ backgroundColor: 'var(--accent-glow)' }" />

              <div>
                <div class="relative w-full h-48 overflow-hidden bg-neutral-800">
                  <img :src="service.image" :alt="service.name"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    loading="lazy" />
                  <div class="absolute bottom-4 left-4 z-10">
                    <div
                      class="inline-flex items-center justify-center w-12 h-12 rounded-xl border backdrop-blur-md shadow-lg"
                      :style="{
                        background: 'linear-gradient(to right, rgba(var(--icon-bg), 0.8), rgba(var(--icon-bg-2), 0.8))',
                        borderColor: 'var(--accent-border)',
                      }">
                      <component :is="service.icon" class="w-6 h-6" :style="{ color: 'var(--icon-accent)' }" />
                    </div>
                  </div>
                </div>

                <div class="relative z-10 p-6">
                  <h3
                    class="text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-[var(--accent-text)]"
                    style="color: var(--surface-text);">{{ service.name }}</h3>
                  <p class="leading-relaxed text-sm" style="color: var(--surface-text-sub);">
                    {{ service.desc }}
                  </p>
                </div>
              </div>

              <div class="relative z-10 px-6 pb-6 pt-2 flex items-center justify-between mt-auto">
                <div class="flex flex-wrap gap-2">
                  <span class="px-2 py-1 rounded text-[10px] font-semibold uppercase tracking-wider"
                    :style="{ background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', color: 'var(--accent-text)' }">
                    {{ service.category }}
                  </span>
                  <span class="px-2 py-1 rounded text-[10px] uppercase tracking-wider"
                    style="background: var(--surface-bg-3); border: 1px solid var(--surface-border); color: var(--surface-text-dim);">
                    {{ service.type }}
                  </span>
                </div>

                <div
                  class="opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  <!-- <router-link to="/services/detail/"> -->
                  <router-link :to="'/services/detail/' + service.id">
                    <ArrowRightIcon class="w-5 h-5" :style="{ color: 'var(--icon-accent-2)' }" />
                  </router-link>
                </div>
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

          <router-link to="/#services"
            class="px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center"
            :style="{ background: 'var(--cta-gradient)' }"
            @mouseenter="e => e.currentTarget.style.boxShadow = '0 10px 25px var(--accent-shadow)'"
            @mouseleave="e => e.currentTarget.style.boxShadow = 'none'">
            <ArrowLeftCircleIcon class="w-5 h-5 mr-2" />
            Back to Home Page
          </router-link>

          <button class="px-8 py-4 rounded-xl border-2 font-semibold transition-all duration-300 flex items-center"
            :style="{ borderColor: 'var(--accent-text)', color: 'var(--accent-text)' }"
            @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--accent-bg)'"
            @mouseleave="e => e.currentTarget.style.backgroundColor = 'transparent'">
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
const searchQuery = ref('');
const selectedCategory = ref('All');
const selectedType = ref('All');
const isGrouped = ref(false);
const showFilters = ref(false);

// // ── Filter options ──
// // Categories map to logical groupings of the 15 services
// const serviceCategories = ['All', 'Development', 'Design', 'Content', 'Infrastructure', 'Services'];
// const serviceTypes      = ['All', 'Technical', 'Creative', 'Consulting'];
// //
// // ── Service data ──
// // Each service has a category + type so the filter works
// const services = ref([
//   { id: 1,  icon: CodeBracketIcon,                  name: 'Web Frontend Development',  category: 'Development',    type: 'Technical',   desc: 'Creating beautiful, responsive, and fast user interfaces using modern tools like Vue.js, React, and Tailwind CSS.' },
//   { id: 2,  icon: CommandLineIcon,                  name: 'Web Backend Development',   category: 'Development',    type: 'Technical',   desc: 'Building the "brains" of your application, handling server logic, and managing secure databases with Laravel and Node.js.' },
//   { id: 3,  icon: PaintBrushIcon,                   name: 'Web Designing',             category: 'Design',         type: 'Creative',    desc: 'Designing modern and professional website layouts that look great on both desktop and mobile screens.' },
//   { id: 4,  icon: DocumentTextIcon,                 name: 'Technical Writing',         category: 'Content',        type: 'Creative',    desc: 'Writing clear, easy-to-understand guides, documentation, and tutorials for software and coding projects.' },
//   { id: 5,  icon: CpuChipIcon,                      name: 'API Integration & Dev',     category: 'Development',    type: 'Technical',   desc: 'Connecting different software services together and building custom APIs to share data between platforms.' },
//   { id: 6,  icon: EnvelopeIcon,                     name: 'Email Marketing',           category: 'Services',       type: 'Consulting',  desc: 'Setting up automated email systems and newsletters to keep your customers engaged and informed.' },
//   { id: 7,  icon: VideoCameraIcon,                  name: 'Content Creation',          category: 'Content',        type: 'Creative',    desc: 'Making educational videos and social media content to explain technology and teach coding skills.' },
//   { id: 8,  icon: DevicePhoneMobileIcon,            name: 'Mobile App Development',    category: 'Development',    type: 'Technical',   desc: 'Building useful and smooth mobile applications for iOS and Android using Flutter and Dart.' },
//   { id: 9,  icon: WindowIcon,                       name: 'UI/UX Design',              category: 'Design',         type: 'Creative',    desc: 'Focusing on how users interact with your app to make sure it is easy, intuitive, and enjoyable to use.' },
//   { id: 10, icon: CloudArrowUpIcon,                 name: 'DevOps & Deployment',       category: 'Infrastructure', type: 'Technical',   desc: 'Moving your code to the cloud and managing servers on AWS or DigitalOcean to keep your site online 24/7.' },
//   { id: 11, icon: PhotoIcon,                        name: 'Graphic Design',            category: 'Design',         type: 'Creative',    desc: 'Creating visual assets, logos, and digital graphics using Photoshop and Canva to boost your brand identity.' },
//   { id: 12, icon: ChatBubbleBottomCenterTextIcon,   name: 'Automation & ChatBot',      category: 'Development',    type: 'Technical',   desc: 'Creating smart Telegram bots and automated workflows to save time and handle tasks automatically.' },
//   { id: 13, icon: MagnifyingGlassCircleIcon,        name: 'System Testing',            category: 'Infrastructure', type: 'Technical',   desc: 'Testing software to find bugs and ensure everything works perfectly before it reaches your users.' },
//   { id: 14, icon: ServerIcon,                       name: 'System Administration',     category: 'Infrastructure', type: 'Technical',   desc: 'Setting up and maintaining computers, local networks, and development environments like XAMPP or Docker.' },
//   { id: 15, icon: LanguageIcon,                     name: 'Translation Services',      category: 'Services',       type: 'Consulting',  desc: 'Providing accurate translation and localization between Khmer, English, Chinese, and other regional languages.' },
// ]);

// ── Filter options ──
const serviceCategories = ['All', 'Development', 'Design & UX', 'DevOps & Sys', 'Content & Write', 'Business Services'];
const serviceTypes = ['All', 'Technical', 'Creative', 'Consulting'];

// // ── Service data (28 Granular Services) ──
// const services = ref([
//   // --- Development: Web & Core ---
//   { id: 1, icon: CodeBracketIcon, name: 'Web Development', category: 'Development', type: 'Technical', desc: 'End-to-end website engineering focusing on responsive structures, compliance, and optimized web performance.' },
//   { id: 2, icon: WindowIcon, name: 'Front-end Development', category: 'Development', type: 'Technical', desc: 'Building interactive and high-speed client-side interfaces using dynamic web technologies and frameworks.' },
//   { id: 3, icon: CommandLineIcon, name: 'Back-end Development', category: 'Development', type: 'Technical', desc: 'Designing server logic, optimizing runtime performance, and handling application business algorithms.' },
//   { id: 4, icon: CpuChipIcon, name: 'Full-stack Development', category: 'Development', type: 'Technical', desc: 'Managing both client and server architectures flawlessly to ship independent, fully functional systems.' },
//   { id: 5, icon: DevicePhoneMobileIcon, name: 'Mobile Development', category: 'Development', type: 'Technical', desc: 'Crafting native and cross-platform mobile apps built for performance and high hardware compatibility.' },
//   { id: 6, icon: CodeBracketIcon, name: 'Software Development', category: 'Development', type: 'Technical', desc: 'Building custom operational desktop or enterprise software engineered for security and scaling.' },

//   // --- Development: APIs ---
//   { id: 7, icon: ServerIcon, name: 'API Design', category: 'Development', type: 'Technical', desc: 'Architecting structured API schemas following strict RESTful, gRPC, or GraphQL design standards.' },
//   { id: 8, icon: CpuChipIcon, name: 'API Development', category: 'Development', type: 'Technical', desc: 'Writing secure server endpoints, handling request routing, data parsing, and high-load traffic profiles.' },
//   { id: 9, icon: ArrowRightIcon, name: 'API Integration', category: 'Development', type: 'Technical', desc: 'Seamlessly weaving third-party web services, payment systems, and tools straight into your ecosystem.' },
//   { id: 10, icon: MagnifyingGlassCircleIcon, name: 'API Testing', category: 'Development', type: 'Technical', desc: 'Validating payload data structures, integration stress, and running endpoint vulnerability audits.' },

//   // --- Design & UX ---
//   { id: 11, icon: PaintBrushIcon, name: 'Web Design', category: 'Design & UX', type: 'Creative', desc: 'Creating visual layouts and design guidelines that accurately reflect and communicate modern brand identities.' },
//   { id: 12, icon: WindowIcon, name: 'UI/UX Design', category: 'Design & UX', type: 'Creative', desc: 'Prototyping dynamic user paths, high-fidelity wireframes, and intuitive user experiences.' },
//   { id: 13, icon: PhotoIcon, name: 'Graphic Design', category: 'Design & UX', type: 'Creative', desc: 'Delivering vector layouts, marketing collateral, custom branding elements, and visual communication assets.' },

//   // --- DevOps & System Infrastructure ---
//   { id: 14, icon: CloudArrowUpIcon, name: 'Cloud Deployment', category: 'DevOps & Sys', type: 'Technical', desc: 'Configuring safe web setups and provisioning clean host architectures on top clouds like AWS.' },
//   { id: 15, icon: CpuChipIcon, name: 'DevOps Engineering', category: 'DevOps & Sys', type: 'Technical', desc: 'Automating build releases via continuous delivery pipes and building isolated software runtime containers.' },
//   { id: 16, icon: ServerIcon, name: 'System Administration', category: 'DevOps & Sys', type: 'Technical', desc: 'Tuning operating setups, controlling internal networks, and orchestrating server ecosystem stability.' },
//   { id: 17, icon: MagnifyingGlassCircleIcon, name: 'System Testing', category: 'DevOps & Sys', type: 'Technical', desc: 'Executing comprehensive smoke, functional, performance, and sanity test sweeps on active environments.' },
//   { id: 18, icon: CloudArrowUpIcon, name: 'System Rollout', category: 'DevOps & Sys', type: 'Technical', desc: 'Managing final live release transitions safely with low downtime and setup rollback safeguards.' },

//   // --- Automation & Intelligence ---
//   { id: 19, icon: ChatBubbleBottomCenterTextIcon, name: 'Automation Services', category: 'Development', type: 'Technical', desc: 'Scripting logical web actions to strip away manual business operations and speed up processing loops.' },
//   { id: 20, icon: ChatBubbleLeftRightIcon, name: 'ChatBot Engineering', category: 'Development', type: 'Technical', desc: 'Programming algorithmic instant assistants across communication services for modern customer triage.' },

//   // --- Content & Writing ---
//   { id: 21, icon: DocumentTextIcon, name: 'Technical Writing', category: 'Content & Write', type: 'Creative', desc: 'Authoring clean engine architectures, system operation logs, and onboarding material for development teams.' },
//   { id: 22, icon: VideoCameraIcon, name: 'Content Creation', category: 'Content & Write', type: 'Creative', desc: 'Designing structural content, interactive tech reviews, and strategic media campaigns across social web profiles.' },
//   { id: 23, icon: VideoCameraIcon, name: 'YouTube Tech Content', category: 'Content & Write', type: 'Creative', desc: 'Producing tech tutorials and sharing tech insights with clear breakdowns across video platforms.' },
//   { id: 24, icon: VideoCameraIcon, name: 'Video Editing', category: 'Content & Write', type: 'Creative', desc: 'Splicing high-retention technical footage, motion callouts, audio tuning, and cleaning up presentation clips.' },

//   // --- Business Services & Localization ---
//   { id: 25, icon: EnvelopeIcon, name: 'Email Marketing', category: 'Business Services', type: 'Consulting', desc: 'Drafting high-conversion campaign workflows and maximizing message delivery pipelines.' },
//   { id: 26, icon: LanguageIcon, name: 'Translation Services', category: 'Business Services', type: 'Consulting', desc: 'Providing fluent semantic context bridges across regional variants, documents, and assets.' },
//   { id: 27, icon: LanguageIcon, name: 'Polyglot Localization', category: 'Business Services', type: 'Consulting', desc: 'Adapting full platform environments to fit localized user habits, text boundaries, and currency metrics.' },
//   { id: 28, icon: ChatBubbleLeftRightIcon, name: 'Multilingual Support', category: 'Business Services', type: 'Consulting', desc: 'Assisting operations or development teams seamlessly across multiple business languages.' },

//   // --- IT Support & Operations ---
//   { id: 29, icon: CpuChipIcon, name: 'IT Support', category: 'DevOps & Sys', type: 'Technical', desc: 'Providing technical troubleshooting, hardware/software diagnostics, environment configuration, and workspace system maintenance.' },

//   // --- Database Lifecycle & Engineering ---
//   { id: 30, icon: ServerIcon, name: 'Database Design', category: 'Development', type: 'Technical', desc: 'Architecting relational and non-relational database schemas, normalization structures, and secure data relationship blueprints.' },
//   { id: 31, icon: CommandLineIcon, name: 'Database Management', category: 'DevOps & Sys', type: 'Technical', desc: 'Optimizing query execution plans, setting up indexing strategies, managing data backups, and maintaining engine health.' },
//   { id: 32, icon: MagnifyingGlassCircleIcon, name: 'Database Testing', category: 'DevOps & Sys', type: 'Technical', desc: 'Validating data integrity constraints, stress testing transactional throughput, and verifying ACID compliance or schema migrations.' },
// ]);
const services = ref([
  // --- Development: Web & Core ---
  { id: 1, icon: CodeBracketIcon, name: 'Web Development', category: 'Development', type: 'Technical', desc: 'End-to-end website engineering focusing on responsive structures, compliance, and optimized web performance.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80' },
  { id: 2, icon: WindowIcon, name: 'Front-end Development', category: 'Development', type: 'Technical', desc: 'Building interactive and high-speed client-side interfaces using dynamic web technologies and frameworks.', image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=500&q=80' },
  { id: 3, icon: CommandLineIcon, name: 'Back-end Development', category: 'Development', type: 'Technical', desc: 'Designing server logic, optimizing runtime performance, and handling application business algorithms.', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80' },
  { id: 4, icon: CpuChipIcon, name: 'Full-stack Development', category: 'Development', type: 'Technical', desc: 'Managing both client and server architectures flawlessly to ship independent, fully functional systems.', image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=500&q=80' },
  { id: 5, icon: DevicePhoneMobileIcon, name: 'Mobile Development', category: 'Development', type: 'Technical', desc: 'Crafting native and cross-platform mobile apps built for performance and high hardware compatibility.', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=500&q=80' },
  { id: 6, icon: CodeBracketIcon, name: 'Software Development', category: 'Development', type: 'Technical', desc: 'Building custom operational desktop or enterprise software engineered for security and scaling.', image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=500&q=80' },

  // --- Development: APIs ---
  { id: 7, icon: ServerIcon, name: 'API Design', category: 'Development', type: 'Technical', desc: 'Architecting structured API schemas following strict RESTful, gRPC, or GraphQL design standards.', image: 'https://miro.medium.com/v2/resize:fit:1200/1*vWvkkgG6uvgmJT8GkId98A.png' },
  { id: 8, icon: CpuChipIcon, name: 'API Development', category: 'Development', type: 'Technical', desc: 'Writing secure server endpoints, handling request routing, data parsing, and high-load traffic profiles.', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=80' },
  { id: 9, icon: ArrowRightIcon, name: 'API Integration', category: 'Development', type: 'Technical', desc: 'Seamlessly weaving third-party web services, payment systems, and tools straight into your ecosystem.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&q=80' },
  { id: 10, icon: MagnifyingGlassCircleIcon, name: 'API Testing', category: 'Development', type: 'Technical', desc: 'Validating payload data structures, integration stress, and running endpoint vulnerability audits.', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=500&q=80' },

  // --- Design & UX ---
  { id: 11, icon: PaintBrushIcon, name: 'Web Design', category: 'Design & UX', type: 'Creative', desc: 'Creating visual layouts and design guidelines that accurately reflect and communicate modern brand identities.', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=500&q=80' },
  { id: 12, icon: WindowIcon, name: 'UI/UX Design', category: 'Design & UX', type: 'Creative', desc: 'Prototyping dynamic user paths, high-fidelity wireframes, and intuitive user experiences.', image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=500&q=80' },
  { id: 13, icon: PhotoIcon, name: 'Graphic Design', category: 'Design & UX', type: 'Creative', desc: 'Delivering vector layouts, marketing collateral, custom branding elements, and visual communication assets.', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=500&q=80' },

  // --- DevOps & System Infrastructure ---
  { id: 14, icon: CloudArrowUpIcon, name: 'Cloud Deployment', category: 'DevOps & Sys', type: 'Technical', desc: 'Configuring safe web setups and provisioning clean host architectures on top clouds like AWS.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80' },
  { id: 15, icon: CpuChipIcon, name: 'DevOps Engineering', category: 'DevOps & Sys', type: 'Technical', desc: 'Automating build releases via continuous delivery pipes and building isolated software runtime containers.', image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=500&q=80' },
  { id: 16, icon: ServerIcon, name: 'System Administration', category: 'DevOps & Sys', type: 'Technical', desc: 'Tuning operating setups, controlling internal networks, and orchestrating server ecosystem stability.', image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=500&q=80' },
  { id: 17, icon: MagnifyingGlassCircleIcon, name: 'System Testing', category: 'DevOps & Sys', type: 'Technical', desc: 'Executing comprehensive smoke, functional, performance, and sanity test sweeps on active environments.', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=500&q=80' },
  { id: 18, icon: CloudArrowUpIcon, name: 'System Rollout', category: 'DevOps & Sys', type: 'Technical', desc: 'Managing final live release transitions safely with low downtime and setup rollback safeguards.', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=500&q=80' },

  // --- Automation & Intelligence ---
  { id: 19, icon: ChatBubbleBottomCenterTextIcon, name: 'Automation Services', category: 'Development', type: 'Technical', desc: 'Scripting logical web actions to strip away manual business operations and speed up processing loops.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80' },
  { id: 20, icon: ChatBubbleLeftRightIcon, name: 'ChatBot Engineering', category: 'Development', type: 'Technical', desc: 'Programming algorithmic instant assistants across communication services for modern customer triage.', image: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&w=500&q=80' },

  // --- Content & Writing ---
  { id: 21, icon: DocumentTextIcon, name: 'Technical Writing', category: 'Content & Write', type: 'Creative', desc: 'Authoring clean engine architectures, system operation logs, and onboarding material for development teams.', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=500&q=80' },
  { id: 22, icon: VideoCameraIcon, name: 'Content Creation', category: 'Content & Write', type: 'Creative', desc: 'Designing structural content, interactive tech reviews, and strategic media campaigns across social web profiles.', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=500&q=80' },
  { id: 23, icon: VideoCameraIcon, name: 'YouTube Content', category: 'Content & Write', type: 'Creative', desc: 'Producing tutorials and sharing languages learning tips and daily used vocabularies, conversations & grammar + sentece structures.', image: 'https://www.fluentforfree.com/wp-content/uploads/2020/04/shutterstock_293731811-320x202.jpg' },
  { id: 24, icon: VideoCameraIcon, name: 'Video Editing', category: 'Content & Write', type: 'Creative', desc: 'Splicing high-retention technical footage, motion callouts, audio tuning, and cleaning up presentation clips.', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=500&q=80' },

  // --- Business Services & Localization ---
  { id: 25, icon: EnvelopeIcon, name: 'Email Marketing', category: 'Business Services', type: 'Consulting', desc: 'Drafting high-conversion campaign workflows and maximizing message delivery pipelines.', image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=500&q=80' },
  { id: 26, icon: LanguageIcon, name: 'Translation Services', category: 'Business Services', type: 'Consulting', desc: 'Providing fluent semantic context bridges across regional variants, documents, and assets.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80' },
  { id: 27, icon: LanguageIcon, name: 'Polyglot Localization', category: 'Business Services', type: 'Consulting', desc: 'Adapting full platform environments to fit localized user habits, text boundaries, and currency metrics.', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=500&q=80' },
  { id: 28, icon: ChatBubbleLeftRightIcon, name: 'Multilingual Support', category: 'Business Services', type: 'Consulting', desc: 'Assisting operations or development teams seamlessly across multiple business languages.', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80' },

  // --- IT Support & Operations ---
  { id: 29, icon: CpuChipIcon, name: 'IT Support', category: 'DevOps & Sys', type: 'Technical', desc: 'Providing technical troubleshooting, hardware/software diagnostics, environment configuration, and workspace system maintenance.', image: 'https://cheekymunkey.co.uk/wp-content/uploads/2017/12/itsupp.png' },

  // --- Database Lifecycle & Engineering ---
  { id: 30, icon: ServerIcon, name: 'Database Design', category: 'Development', type: 'Technical', desc: 'Architecting relational and non-relational database schemas, normalization structures, and secure data relationship blueprints.', image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=500&q=80' },
  { id: 31, icon: CommandLineIcon, name: 'Database Management', category: 'DevOps & Sys', type: 'Technical', desc: 'Optimizing query execution plans, setting up indexing strategies, managing data backups, and maintaining engine health.', image: 'https://assets.cioinsight.com/uploads/2022/05/Database-Management-Systems-scaled.jpeg' },
  { id: 32, icon: MagnifyingGlassCircleIcon, name: 'Database Testing', category: 'DevOps & Sys', type: 'Technical', desc: 'Validating data integrity constraints, stress testing transactional throughput, and verifying ACID compliance or schema migrations.', image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=500&q=80' },

// --- IT Management & Strategy ---
  { id: 33, icon: CpuChipIcon, name: 'MIS Management', category: 'Business Services', type: 'Consulting', desc: 'Overseeing corporate information system infrastructures, optimizing internal data workflows, and aligning technology assets with business goals.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80' },
  { id: 34, icon: DocumentTextIcon, name: 'Project Management', category: 'Business Services', type: 'Consulting', desc: 'Leading agile development cycles, tracking sprint delivery metrics, managing technical scopes, and ensuring on-time project rollouts.', image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=500&q=80' }
]);

// ── Computed ──
const filteredServices = computed(() =>
  services.value.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      s.desc.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value === 'All' || s.category === selectedCategory.value;
    const matchesType = selectedType.value === 'All' || s.type === selectedType.value;
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
  searchQuery.value = '';
  selectedCategory.value = 'All';
  selectedType.value = 'All';
  isGrouped.value = false;
};
</script>

<style scoped>
/* ── Fade transition (filter panel) ── */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* ── Search input ── */
.search-input {
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  color: var(--surface-text);
}

.search-input:focus {
  border-color: var(--accent-mid);
}

.search-input::placeholder {
  color: var(--surface-text-dim);
}

/* ── Control buttons ── */
.ctrl-btn {
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  color: var(--surface-text-sub);
}

.ctrl-btn:hover {
  background: var(--surface-bg-3);
  color: var(--surface-text);
}

.ctrl-btn-active {
  background: var(--accent-mid) !important;
  border-color: transparent !important;
  color: #fff !important;
}

/* ── Filter panel ── */
.filter-panel {
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* ── Filter chips ── */
.filter-chip-idle {
  background: var(--surface-bg-3);
  color: var(--surface-text-sub);
}

.filter-chip-idle:hover {
  background: var(--surface-bg-2);
  color: var(--surface-text);
}

.filter-chip-active {
  background: var(--accent-mid);
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

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