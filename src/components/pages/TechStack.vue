<template>
  <section class="relative py-20 overflow-hidden" id="tech-stack" style="background-color: #000;">
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- ── Breadcrumb ── -->
      <nav class="flex mb-8" aria-label="Breadcrumb" data-aos="fade-down">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <router-link to="/#skills"
              class="group inline-flex items-center text-sm font-medium text-gray-400 transition-all duration-300">
              <div class="mr-2">
                <HomeIcon class="breadcrumb-home-icon w-4 h-4" />
              </div>
              <span class="breadcrumb-home-text">{{ t('home') }}</span>
            </router-link>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd" />
              </svg>
              <span class="ml-1 text-sm font-semibold md:ml-2 text-transparent bg-clip-text"
                :style="{ backgroundImage: 'var(--logo-gradient)' }">
                {{ t('tech_stack') }}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <!-- Header -->
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
          My <span class="text-transparent bg-clip-text" :style="{ backgroundImage: 'var(--logo-gradient)' }">Tech Stack</span>
        </h2>
        <p class="text-lg max-w-2xl mx-auto" :style="{ color: 'var(--accent-text-muted)' }">
          The tools and technologies I use to bring ideas to life.
        </p>
      </div>

      <!-- Search & Filter Controls -->
      <div class="mb-12 space-y-6" data-aos="fade-up">
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
          <!-- Search Input -->
          <div class="relative w-full md:w-96">
            <input v-model="searchQuery" type="text" placeholder="Search technology..."
              class="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--accent-mid)] transition-all" />
          </div>
          <!-- Control Buttons -->
          <div class="flex flex-wrap gap-3 justify-center">
            <button @click="showFilters = !showFilters"
              class="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-all text-sm flex items-center gap-2">
              {{ showFilters ? 'Hide Filters' : 'Show Filters' }}
            </button>
            <button @click="isGrouped = !isGrouped"
              class="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-all text-sm"
              :class="{ 'bg-[var(--accent-mid)] !border-transparent text-white': isGrouped }">
              {{ isGrouped ? 'Ungroup' : 'Group by Category' }}
            </button>
            <button @click="resetFilters" class="px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors">
              Remove Filters
            </button>
          </div>
        </div>

        <!-- Expandable Filter Panel -->
        <transition name="fade">
          <div v-if="showFilters"
            class="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 rounded-2xl bg-gray-900/30 border border-gray-800 backdrop-blur-md">
            <div>
              <label class="block text-gray-400 text-xs uppercase mb-3 font-bold tracking-widest">Filter by Category</label>
              <div class="flex flex-wrap gap-2">
                <button v-for="cat in categories" :key="cat" @click="selectedCategory = cat"
                  :class="selectedCategory === cat ? 'bg-[var(--accent-mid)] text-white shadow-lg shadow-blue-900/20' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'"
                  class="px-3 py-1.5 rounded-md text-xs transition-all">{{ cat }}</button>
              </div>
            </div>
            <div>
              <label class="block text-gray-400 text-xs uppercase mb-3 font-bold tracking-widest">Filter by Type</label>
              <div class="flex flex-wrap gap-2">
                <button v-for="t in types" :key="t" @click="selectedType = t"
                  :class="selectedType === t ? 'bg-[var(--accent-mid)] text-white shadow-lg shadow-blue-900/20' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'"
                  class="px-3 py-1.5 rounded-md text-xs transition-all">{{ t }}</button>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Grouped View -->
      <div v-if="isGrouped" class="space-y-16">
        <div v-for="(items, category) in groupedStack" :key="category" data-aos="fade-up">
          <div class="flex items-center gap-4 mb-8">
            <h3 class="text-xl font-bold text-white whitespace-nowrap">{{ category }}</h3>
            <div class="h-[1px] w-full bg-gradient-to-r from-gray-700 to-transparent"></div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            <TechCard v-for="tech in items" :key="tech.id" :tech="tech" @select="openModal" />
          </div>
        </div>
      </div>

      <!-- Flat Grid View -->
      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        <TechCard
          v-for="(tech, index) in filteredStack"
          :key="tech.id"
          :tech="tech"
          data-aos="fade-up"
          :data-aos-delay="index * 50"
          @select="openModal"
        />
      </div>

      <!-- Empty State -->
      <div v-if="filteredStack.length === 0" class="text-center py-20">
        <div class="text-gray-500 text-lg">No technologies found matching your criteria.</div>
        <button @click="resetFilters" class="mt-4 text-[var(--accent-text)] underline">Clear all filters</button>
      </div>

    </div>

    <!-- ── CTA ── -->
    <div class="text-center mt-16" data-aos="fade-up" data-aos-delay="800">
      <div class="inline-flex flex-col sm:flex-row gap-4 items-center">
        <router-link to="/#skills"
          class="px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center"
          :style="{ background: 'var(--cta-gradient)' }"
          @mouseenter="e => e.currentTarget.style.boxShadow = '0 10px 25px var(--accent-shadow)'"
          @mouseleave="e => e.currentTarget.style.boxShadow = 'none'">
          <ArrowLeftCircleIcon class="w-5 h-5 mr-2" />
          Back to Homepage
        </router-link>
      </div>
    </div>

    <!-- ── Tech Modal ── -->
    <TechModal :tech="selectedTech" @close="closeModal" />

  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import TechCard from '../../stores/techcard.js';
import TechModal from './TechModal.vue'; // 👈 adjust path to match your folder
import { useRouter } from 'vue-router';
import { t } from './../../stores/languages.js';
import { ArrowLeftCircleIcon, HomeIcon } from '@heroicons/vue/24/outline';

// ### Local SVG Import ###
import htmlLogo from '../../assets/techstack/html.svg';
import cssLogo from '../../assets/techstack/css.svg';
import javascriptLogo from '../../assets/techstack/javascript.svg';
import xmlLogo from '../../assets/techstack/xml.svg';
import typeLogo from '../../assets/techstack/typescript.svg';
import jqueryLogo from '../../assets/techstack/jquery.svg';
import vuejsLogo from '../../assets/techstack/vuejs.svg';
import vitejsLogo from '../../assets/techstack/vitejs.svg';
import reactjsLogo from '../../assets/techstack/reactjs.svg';
import nuxtjsLogo from '../../assets/techstack/nuxtjs.svg';
import nextjsLogo from '../../assets/techstack/nextjs.svg';
import tailwindcssLogo from '../../assets/techstack/tailwindcss.svg';
import bootstrapLogo from '../../assets/techstack/bootstrap.svg';
import shadcnuiLogo from '../../assets/techstack/shadcnui.svg';
import materialuiLogo from '../../assets/techstack/materialui.svg';
import phpLogo from '../../assets/techstack/php.svg';
import sqlLogo from '../../assets/techstack/sql.svg';
import javaLogo from '../../assets/techstack/java.svg';
import csharpLogo from '../../assets/techstack/csharp.svg';
import pythonLogo from '../../assets/techstack/python.svg';
import laravelLogo from '../../assets/techstack/laravel.svg';
import laravelbackpackLogo from '../../assets/techstack/laravelbackpack.svg';
import nodejsLogo from '../../assets/techstack/nodejs.svg';
import expressjsLogo from '../../assets/techstack/expressjs.svg';
import springbootLogo from '../../assets/techstack/springboot.svg';
import aspnetLogo from '../../assets/techstack/aspnet.svg';
import flaskLogo from '../../assets/techstack/flask.svg';
import djangoLogo from '../../assets/techstack/django.svg';
import dartLogo from '../../assets/techstack/dart.svg';
import flutterLogo from '../../assets/techstack/flutter.svg';
import cLogo from '../../assets/techstack/c.svg';
import cplusplusLogo from '../../assets/techstack/cplusplus.svg';
import mysqlLogo from '../../assets/techstack/mysql.svg';
import postgresqlLogo from '../../assets/techstack/postgresql.svg';
import mongodbLogo from '../../assets/techstack/mongodb.svg';
import sqliteLogo from '../../assets/techstack/sqlite.svg';
import neondbLogo from '../../assets/techstack/neondb.svg';
import prismaLogo from '../../assets/techstack/prisma.svg';
import graphqlLogo from '../../assets/techstack/graphql.svg';
import restfulapiLogo from '../../assets/techstack/restfulapi.svg';
import postmanLogo from '../../assets/techstack/postman.svg';
import jwtLogo from '../../assets/techstack/jwt.svg';
import wordpressLogo from '../../assets/techstack/wordpress.svg';
import drupalLogo from '../../assets/techstack/drupal.svg';
import joomlaLogo from '../../assets/techstack/joomla.svg';
import ecwidLogo from '../../assets/techstack/ecwid.svg';
import mauticLogo from '../../assets/techstack/mautic.svg';
import onesignalLogo from '../../assets/techstack/onesignal.svg';
import tinodeLogo from '../../assets/techstack/tinode.svg';
import telegrambotLogo from '../../assets/techstack/telegrambot.svg';
import gitLogo from '../../assets/techstack/git.svg';
import githubLogo from '../../assets/techstack/github.svg';
import gitlabLogo from '../../assets/techstack/gitlab.svg';
import netlifyLogo from '../../assets/techstack/netlify.svg';
import vercelLogo from '../../assets/techstack/vercel.svg';
import pantheonioLogo from '../../assets/techstack/pantheonio.svg';
import apacheLogo from '../../assets/techstack/apache.svg';
import dockerLogo from '../../assets/techstack/docker.svg';
import digitaloceanLogo from '../../assets/techstack/digitalocean.svg';
import linuxLogo from '../../assets/techstack/linux.svg';
import ubuntuLogo from '../../assets/techstack/ubuntu.svg';
import awsLogo from '../../assets/techstack/aws.svg';
import vscodeLogo from '../../assets/techstack/vscode.svg';
import pwaLogo from '../../assets/techstack/pwa.svg';
import wampLogo from '../../assets/techstack/wamp.svg';
import xamppLogo from '../../assets/techstack/xampp.svg';
import laragonLogo from '../../assets/techstack/laragon.svg';
import ngrokLogo from '../../assets/techstack/ngrok.svg';
import navicatLogo from '../../assets/techstack/navicat.svg';
import phpmyadminLogo from '../../assets/techstack/phpmyadmin.svg';
import figmaLogo from '../../assets/techstack/figma.svg';
import photoshopLogo from '../../assets/techstack/photoshop.svg';
import canvaLogo from '../../assets/techstack/canva.svg';
import capcutLogo from '../../assets/techstack/capcut.svg';
import responsiveLogo from '../../assets/techstack/responsive.svg';
import office365Logo from '../../assets/techstack/office365.svg';
import wordLogo from '../../assets/techstack/word.svg';
import excelLogo from '../../assets/techstack/excel.svg';
import powerpointLogo from '../../assets/techstack/powerpoint.svg';
import pdfLogo from '../../assets/techstack/pdf.svg';
import outlookLogo from '../../assets/techstack/outlook.svg';
import onedriveLogo from '../../assets/techstack/onedrive.svg';
import accessLogo from '../../assets/techstack/access.svg';
import onenoteLogo from '../../assets/techstack/onenote.svg';
import teamsLogo from '../../assets/techstack/teams.svg';
import googledocsLogo from '../../assets/techstack/googledocs.svg';
import gmailLogo from '../../assets/techstack/gmail.svg';
import geminiLogo from '../../assets/techstack/gemini.svg';
import claudeLogo from '../../assets/techstack/claude.svg';
import grokLogo from '../../assets/techstack/grok.svg';
import chatgptLogo from '../../assets/techstack/chatgpt.svg';
import poeLogo from '../../assets/techstack/poe.svg';
import khmerLogo from '../../assets/techstack/khmer.svg';
import englishLogo from '../../assets/techstack/english.svg';
import chineseLogo from '../../assets/techstack/chinese.svg';
import frenchLogo from '../../assets/techstack/french.svg';
import thaiLogo from '../../assets/techstack/thai.svg';
import laoLogo from '../../assets/techstack/lao.svg';
import burmeseLogo from '../../assets/techstack/burmese.svg';
import dropboxLogo from '../../assets/techstack/dropbox.svg';
import chromeLogo from '../../assets/techstack/chrome.svg';

// ── Modal State ──
const selectedTech = ref(null);
const openModal  = (tech) => { selectedTech.value = tech; };
const closeModal = ()     => { selectedTech.value = null; };

// ── Filter State ──
const searchQuery      = ref('');
const selectedCategory = ref('All');
const selectedType     = ref('All');
const isGrouped        = ref(true);
const showFilters      = ref(false);

// ── Data ──
const techStack = ref([
  { id: 1,  name: 'HTML5',            category: 'Frontend',     type: 'Language',          logo: htmlLogo },
  { id: 2,  name: 'CSS3',             category: 'Frontend',     type: 'Language',          logo: cssLogo },
  { id: 3,  name: 'JavaScript',       category: 'Frontend',     type: 'Language',          logo: javascriptLogo },
  { id: 4,  name: 'TypeScript',       category: 'Frontend',     type: 'Language',          logo: typeLogo },
  { id: 5,  name: 'XML',              category: 'Frontend',     type: 'Language',          logo: xmlLogo },
  { id: 6,  name: 'Vue.js',           category: 'Frontend',     type: 'Framework',         logo: vuejsLogo },
  { id: 7,  name: 'React.js',         category: 'Frontend',     type: 'Framework',         logo: reactjsLogo },
  { id: 8,  name: 'Nuxt.js',          category: 'Frontend',     type: 'Framework',         logo: nuxtjsLogo },
  { id: 9,  name: 'Next.js',          category: 'Frontend',     type: 'Framework',         logo: nextjsLogo },
  { id: 10, name: 'Vite.js',          category: 'Frontend',     type: 'Tool',              logo: vitejsLogo },
  { id: 11, name: 'jQuery',           category: 'Frontend',     type: 'Library',           logo: jqueryLogo },
  { id: 12, name: 'Tailwind CSS',     category: 'Frontend',     type: 'Library',           logo: tailwindcssLogo },
  { id: 13, name: 'Bootstrap',        category: 'Frontend',     type: 'Library',           logo: bootstrapLogo },
  { id: 14, name: 'shadcn/ui',        category: 'Frontend',     type: 'Library',           logo: shadcnuiLogo },
  { id: 15, name: 'Material UI',      category: 'Frontend',     type: 'Library',           logo: materialuiLogo },
  { id: 16, name: 'Responsive',       category: 'Frontend',     type: 'Practice',          logo: responsiveLogo },
  { id: 17, name: 'PWA',              category: 'Frontend',     type: 'Standard',          logo: pwaLogo },
  { id: 18, name: 'PHP',              category: 'Backend',      type: 'Language',          logo: phpLogo },
  { id: 19, name: 'SQL',              category: 'Backend',      type: 'Language',          logo: sqlLogo },
  { id: 20, name: 'Java',             category: 'Backend',      type: 'Language',          logo: javaLogo },
  { id: 21, name: 'C#',               category: 'Backend',      type: 'Language',          logo: csharpLogo },
  { id: 22, name: 'Python',           category: 'Backend',      type: 'Language',          logo: pythonLogo },
  { id: 23, name: 'C',                category: 'Backend',      type: 'Language',          logo: cLogo },
  { id: 24, name: 'C++',              category: 'Backend',      type: 'Language',          logo: cplusplusLogo },
  { id: 25, name: 'Laravel',          category: 'Backend',      type: 'Framework',         logo: laravelLogo },
  { id: 26, name: 'Laravel Backpack', category: 'Backend',      type: 'Package',           logo: laravelbackpackLogo },
  { id: 27, name: 'Node.js',          category: 'Backend',      type: 'Runtime',           logo: nodejsLogo },
  { id: 28, name: 'Express.js',       category: 'Backend',      type: 'Framework',         logo: expressjsLogo },
  { id: 29, name: 'Spring Boot',      category: 'Backend',      type: 'Framework',         logo: springbootLogo },
  { id: 30, name: 'ASP.NET',          category: 'Backend',      type: 'Framework',         logo: aspnetLogo },
  { id: 31, name: 'Flask',            category: 'Backend',      type: 'Framework',         logo: flaskLogo },
  { id: 32, name: 'Django',           category: 'Backend',      type: 'Framework',         logo: djangoLogo },
  { id: 33, name: 'Flutter',          category: 'Mobile',       type: 'Framework',         logo: flutterLogo },
  { id: 34, name: 'Dart',             category: 'Mobile',       type: 'Language',          logo: dartLogo },
  { id: 35, name: 'MySQL',            category: 'Database',     type: 'Relational',        logo: mysqlLogo },
  { id: 36, name: 'PostgreSQL',       category: 'Database',     type: 'Relational',        logo: postgresqlLogo },
  { id: 37, name: 'MongoDB',          category: 'Database',     type: 'NoSQL',             logo: mongodbLogo },
  { id: 38, name: 'SQLite',           category: 'Database',     type: 'Relational',        logo: sqliteLogo },
  { id: 39, name: 'Neon DB',          category: 'Database',     type: 'Serverless',        logo: neondbLogo },
  { id: 40, name: 'Prisma',           category: 'Database',     type: 'ORM',               logo: prismaLogo },
  { id: 41, name: 'GraphQL',          category: 'API',          type: 'Query Language',    logo: graphqlLogo },
  { id: 42, name: 'RESTful API',      category: 'API',          type: 'Standard',          logo: restfulapiLogo },
  { id: 43, name: 'Postman',          category: 'API',          type: 'Tool',              logo: postmanLogo },
  { id: 44, name: 'JWT',              category: 'API',          type: 'Standard',          logo: jwtLogo },
  { id: 45, name: 'WordPress',        category: 'CMS',          type: 'Platform',          logo: wordpressLogo },
  { id: 46, name: 'Drupal',           category: 'CMS',          type: 'Platform',          logo: drupalLogo },
  { id: 47, name: 'Joomla',           category: 'CMS',          type: 'Platform',          logo: joomlaLogo },
  { id: 48, name: 'Ecwid',            category: 'CMS',          type: 'E-Commerce',        logo: ecwidLogo },
  { id: 49, name: 'Mautic',           category: 'CMS',          type: 'Marketing',         logo: mauticLogo },
  { id: 50, name: 'OneSignal',        category: 'Services',     type: 'Push Notification', logo: onesignalLogo },
  { id: 51, name: 'Tinode',           category: 'Services',     type: 'Messaging',         logo: tinodeLogo },
  { id: 52, name: 'Telegram Bot',     category: 'Services',     type: 'Bot',               logo: telegrambotLogo },
  { id: 53, name: 'Git',              category: 'DevOps',       type: 'VCS',               logo: gitLogo },
  { id: 54, name: 'GitHub',           category: 'DevOps',       type: 'Platform',          logo: githubLogo },
  { id: 55, name: 'GitLab',           category: 'DevOps',       type: 'Platform',          logo: gitlabLogo },
  { id: 56, name: 'Netlify',          category: 'DevOps',       type: 'Hosting',           logo: netlifyLogo },
  { id: 57, name: 'Vercel',           category: 'DevOps',       type: 'Hosting',           logo: vercelLogo },
  { id: 58, name: 'Pantheon',         category: 'DevOps',       type: 'Hosting',           logo: pantheonioLogo },
  { id: 59, name: 'Apache',           category: 'DevOps',       type: 'Server',            logo: apacheLogo },
  { id: 60, name: 'Docker',           category: 'DevOps',       type: 'Container',         logo: dockerLogo },
  { id: 61, name: 'DigitalOcean',     category: 'DevOps',       type: 'Cloud',             logo: digitaloceanLogo },
  { id: 62, name: 'AWS',              category: 'DevOps',       type: 'Cloud',             logo: awsLogo },
  { id: 63, name: 'Linux',            category: 'DevOps',       type: 'OS',                logo: linuxLogo },
  { id: 64, name: 'Ubuntu',           category: 'DevOps',       type: 'OS',                logo: ubuntuLogo },
  { id: 65, name: 'VS Code',          category: 'Dev Tools',    type: 'Editor',            logo: vscodeLogo },
  { id: 66, name: 'WAMP',             category: 'Dev Tools',    type: 'Server',            logo: wampLogo },
  { id: 67, name: 'XAMPP',            category: 'Dev Tools',    type: 'Server',            logo: xamppLogo },
  { id: 68, name: 'Laragon',          category: 'Dev Tools',    type: 'Server',            logo: laragonLogo },
  { id: 69, name: 'Ngrok',            category: 'Dev Tools',    type: 'Tunnel',            logo: ngrokLogo },
  { id: 70, name: 'Navicat',          category: 'Dev Tools',    type: 'DB Client',         logo: navicatLogo },
  { id: 71, name: 'phpMyAdmin',       category: 'Dev Tools',    type: 'DB Client',         logo: phpmyadminLogo },
  { id: 72, name: 'Figma',            category: 'Design',       type: 'UI/UX',             logo: figmaLogo },
  { id: 73, name: 'Photoshop',        category: 'Design',       type: 'Graphics',          logo: photoshopLogo },
  { id: 74, name: 'Canva',            category: 'Design',       type: 'Graphics',          logo: canvaLogo },
  { id: 75, name: 'CapCut',           category: 'Design',       type: 'Video',             logo: capcutLogo },
  { id: 76, name: 'Office 365',       category: 'Productivity', type: 'Suite',             logo: office365Logo },
  { id: 77, name: 'Word',             category: 'Productivity', type: 'Document',          logo: wordLogo },
  { id: 78, name: 'Excel',            category: 'Productivity', type: 'Spreadsheet',       logo: excelLogo },
  { id: 79, name: 'PowerPoint',       category: 'Productivity', type: 'Slides',            logo: powerpointLogo },
  { id: 80, name: 'PDF',              category: 'Productivity', type: 'Document',          logo: pdfLogo },
  { id: 81, name: 'Outlook',          category: 'Productivity', type: 'Email',             logo: outlookLogo },
  { id: 82, name: 'OneDrive',         category: 'Productivity', type: 'Storage',           logo: onedriveLogo },
  { id: 83, name: 'Access',           category: 'Productivity', type: 'Database',          logo: accessLogo },
  { id: 84, name: 'OneNote',          category: 'Productivity', type: 'Notes',             logo: onenoteLogo },
  { id: 85, name: 'Teams',            category: 'Productivity', type: 'Comms',             logo: teamsLogo },
  { id: 86, name: 'Google Docs',      category: 'Productivity', type: 'Document',          logo: googledocsLogo },
  { id: 87, name: 'Gmail',            category: 'Productivity', type: 'Email',             logo: gmailLogo },
  { id: 100, name: 'Chrome',          category: 'Productivity', type: 'Browser',           logo: chromeLogo },
  { id: 101, name: 'Dropbox',         category: 'Productivity', type: 'Storage',           logo: dropboxLogo },
  { id: 88, name: 'Gemini',           category: 'AI Tools',     type: 'LLM',               logo: geminiLogo },
  { id: 89, name: 'Claude',           category: 'AI Tools',     type: 'LLM',               logo: claudeLogo },
  { id: 90, name: 'Grok',             category: 'AI Tools',     type: 'LLM',               logo: grokLogo },
  { id: 91, name: 'ChatGPT',          category: 'AI Tools',     type: 'LLM',               logo: chatgptLogo },
  { id: 92, name: 'Poe',              category: 'AI Tools',     type: 'Platform',          logo: poeLogo },
  { id: 93, name: 'Khmer',            category: 'Languages',    type: 'Native',            logo: khmerLogo },
  { id: 94, name: 'English',          category: 'Languages',    type: 'Fluent',            logo: englishLogo },
  { id: 95, name: 'Chinese',          category: 'Languages',    type: 'Fluent',            logo: chineseLogo },
  { id: 96, name: 'French',           category: 'Languages',    type: 'Learning',          logo: frenchLogo },
  { id: 97, name: 'Thai',             category: 'Languages',    type: 'Learning',          logo: thaiLogo },
  { id: 98, name: 'Lao',              category: 'Languages',    type: 'Learning',          logo: laoLogo },
  { id: 99, name: 'Burmese',          category: 'Languages',    type: 'Learning',          logo: burmeseLogo },
]);

// ── Computed ──
const categories = computed(() => ['All', ...new Set(techStack.value.map(t => t.category))]);
const types       = computed(() => ['All', ...new Set(techStack.value.map(t => t.type))]);

const filteredStack = computed(() =>
  techStack.value.filter(tech => {
    const matchesSearch   = tech.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value === 'All' || tech.category === selectedCategory.value;
    const matchesType     = selectedType.value === 'All'     || tech.type     === selectedType.value;
    return matchesSearch && matchesCategory && matchesType;
  })
);

const groupedStack = computed(() =>
  filteredStack.value.reduce((groups, tech) => {
    if (!groups[tech.category]) groups[tech.category] = [];
    groups[tech.category].push(tech);
    return groups;
  }, {})
);

const resetFilters = () => {
  searchQuery.value      = '';
  selectedCategory.value = 'All';
  selectedType.value     = 'All';
  isGrouped.value        = false;
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all 0.3s ease-out; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-10px); }

input::placeholder { color: #4b5563; }

.backdrop-blur-sm { backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
.backdrop-blur-md { backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }

/* Breadcrumb hover */
.group:hover .breadcrumb-home-text {
  background: var(--logo-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
}
.group:hover .breadcrumb-home-icon {
  background: var(--logo-gradient);
  -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>') no-repeat center;
  mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>') no-repeat center;
  -webkit-mask-size: contain;
  mask-size: contain;
  color: transparent;
}

/* TechCard hover effects */
.tech-card:hover .logo-box {
  border-color: var(--border-hover) !important;
  box-shadow:   var(--shadow-hover) !important;
}
.tech-card:hover .logo-img {
  filter: var(--img-filter-hover) !important;
}
</style>