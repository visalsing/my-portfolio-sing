<template>
  <section class="relative py-20 overflow-hidden min-h-screen flex items-center" id="about">
    <div class="w-full px-5 sm:px-8 md:px-12 lg:px-8 max-w-5xl lg:max-w-7xl mx-auto relative z-10">
      <div class="grid lg:grid-cols-2 gap-10 xl:gap-14 items-center">

        <div class="lg:h-full flex justify-center lg:justify-start order-2 lg:order-1">
          <div class="relative w-full max-w-md">
            <div data-aos="zoom-in" class="p-4 relative bg-linear-to-br from-gray-800/60 to-blue-900/40 
              rounded-3xl backdrop-blur-sm border border-blue-500/30 shadow-2xl">
              <div class="grid grid-cols-2 gap-4">
                <div v-for="image in aboutImage" :key="image.id" class="relative group" :data-aos="image.animation"
                  :data-aos-delay="image.delay">
                  <div class="rounded-2xl p-1 border shadow-lg" :class="image.gradient">
                    <img :src="image.src" :alt="image.alt"
                      class="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300">
                  </div>
                  <div class="absolute -top-2 -right-2 text-white text-[10px] px-2 py-1 rounded-full font-semibold"
                    :class="image.badgeColor">
                    {{ image.badge }}
                  </div>
                </div>
              </div>
              <div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-20 bg-linear-to-r 
              from-blue-500 to-cyan-500 rounded-2xl px-6 py-3 border border-blue-400/40 shadow-xl" data-aos="fade-up"
                data-aos-delay="600">
                <div class="text-center text-white text-xl font-bold">{{ t('two_years_experience') }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center lg:text-left" data-aos="fade-left">
          <h2 class="text-white font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
            {{ t('about_') }}<span class="text-transparent bg-clip-text bg-linear-to-r from-blue-400
            to-cyan-400">{{ t('_me') }}</span>
          </h2>
          <p class="text-blue-200 font-medium text-lg md:text-xl mt-4" data-aos="fade-left" data-aos-delay="100">
            Full-Stack Developer & UI/UX Designer
          </p>
        </div>
        <p class="text-gray-300 pt-6 text-center lg:text-left text-lg leading-relaxed" data-aos="fade-left"
          data-aos-delay="200">
          {{ t('about_me_long_text') }}
        </p>

        <div class="order-1 lg:order-2" data-aos="fade-left">
          <!-- <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">About <span class="text-blue-400">Me</span></h2>
          <p class="text-gray-300 mb-8 leading-relaxed">
            I am a passionate developer dedicated to building high-quality web applications.
            With a focus on performance and user experience, I bridge the gap between design and code.
          </p> -->

          <div class="grid sm:grid-cols-2 gap-4 mb-10">
            <div v-for="skill in skills" :key="skill.id"
              class="flex items-start space-x-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <component :is="skill.icon" class="w-6 h-6 shrink-0" :class="skill.iconColor" />
              <div>
                <h4 class="text-white font-medium text-sm">{{ skill.title }}</h4>
                <p class="text-gray-400 text-xs">{{ skill.desc }}</p>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap gap-4">
            <!-- <button v-for="btn in ctaButtons" :key="btn.id"
              :class="['px-6 py-3 rounded-full flex items-center font-semibold transition-all', btn.classes]">
              <component v-if="btn.id === 2" :is="btn.icon" :class="btn.iconclass" class="w-5 h-5" />
              {{ btn.text }}
              <component v-if="btn.id === 1" :is="btn.icon" :class="btn.iconclass" class="w-5 h-5" />
            </button> -->

            <component v-for="btn in ctaButtons" :key="btn.id" :is="btn.type === 'router' ? 'router-link' : 'a'"
              :to="btn.type === 'router' ? btn.to : null" :href="btn.type !== 'router' ? btn.to : null"
              class="group px-6 py-3 rounded-full flex items-center font-semibold transition-all" :class="btn.classes">

              <!-- <component v-for="btn in ctaButtons" :key="btn.id" :is="btn.type === 'router' ? 'router-link' : 'a'"
              :to="btn.type === 'router' ? btn.to : null" :href="btn.type !== 'router' ? btn.to : null"
              :class="['px-6 py-3 rounded-full flex items-center font-semibold transition-all', btn.classes]"> -->

              <!-- icon left -->
              <component v-if="btn.id === 2" :is="btn.icon" :class="btn.iconclass" class="w-5 h-5 group-hover:translate-y-1 transition-transform" />


              {{ t(btn.text) }}

              <!-- icon right -->
              <!-- <component v-if="btn.id === 1 || btn.id === 3" :is="btn.icon" :class="btn.iconclass" class="w-5 h-5" /> -->
              <component v-if="btn.id === 1 || btn.id === 3" :is="btn.icon"
                :class="[btn.iconclass, 'w-5 h-5 transition-transform group-hover:translate-x-1']" />

            </component>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowRightIcon, ChatBubbleLeftRightIcon, CodeBracketSquareIcon, CubeIcon, PaintBrushIcon, ServerIcon, ShoppingBagIcon } from '@heroicons/vue/16/solid'

// Note: Ensure these paths are correct for your project structure
import about1 from '/professional.jpg'
import about2 from '/creative.jpg'
import about3 from '/developer.jpg'
import about4 from '/designer.jpg'

// Translate
import { currentLang, t, setLanguage } from './../stores/languages';

const aboutImage = [
  { id: 1, src: about1, alt: "Professional", gradient: 'bg-linear-to-r from-blue-600 to-cyan-600', badge: 'Professional', badgeColor: 'bg-blue-500', animation: 'fade-right', delay: 200 },
  { id: 2, src: about2, alt: "Creative", gradient: 'bg-linear-to-r from-blue-500 to-cyan-500', badge: 'Creative', badgeColor: 'bg-cyan-500', animation: 'fade-left', delay: 300 },
  { id: 3, src: about3, alt: "Developer", gradient: 'bg-linear-to-r from-blue-500 to-cyan-500', badge: 'Developer', badgeColor: 'bg-blue-600', animation: 'fade-right', delay: 400 },
  { id: 4, src: about4, alt: "Design", gradient: 'bg-linear-to-r from-blue-600 to-cyan-600', badge: 'Design', badgeColor: 'bg-cyan-600', animation: 'fade-left', delay: 500 },
]

const skills = [
  { id: 1, icon: CodeBracketSquareIcon, iconColor: "text-blue-400", title: "Frontend", desc: "Vue js, React, JavaScript, TypeScript, Tailwind CSS" },
  { id: 2, icon: ServerIcon, iconColor: "text-cyan-400", title: "Backend", desc: "Node js, Express, MongoDB, SQL, REST APIs" },
  { id: 3, icon: PaintBrushIcon, iconColor: "text-blue-400", title: "Design", desc: "UI/UX Design, Figma, Responsive Design, Prototyping" },
  { id: 4, icon: ShoppingBagIcon, iconColor: "text-cyan-400", title: "Marketing", desc: "Mautic, OneSignal, POS, Café, Email Marketing" },
  { id: 5, icon: CubeIcon, iconColor: "text-blue-400", title: "Tools", desc: "Git, Docker, AWS, VSCode, Webpack, Postman" },
]

// const ctaButtons = [
//   { id: 1, text: 'View Portfolio', icon: ArrowRightIcon, iconclass: `ml-2`, classes: `bg-linear-to-r from-blue-600 to-cyan-600 text-white` },
//   { id: 2, text: 'Contact Me', icon: ChatBubbleLeftRightIcon, iconclass: `mr-2`, classes: `border border-blue-400 text-blue-400` },
// ]

const ctaButtons = [
  {
    id: 1,
    text: 'view_portfolio',
    icon: ArrowRightIcon,
    iconclass: 'ml-2',
    classes: 'bg-linear-to-r from-blue-600 to-cyan-600 text-white cursor-pointer',
    to: '#projects',
    type: 'anchor' // scroll
  },
  {
    id: 2,
    text: 'contact_me',
    icon: ChatBubbleLeftRightIcon,
    iconclass: 'mr-2',
    classes: 'border border-blue-400 text-blue-400 cursor-pointer',
    to: '#contact',
    type: 'anchor' // scroll
  },
  {
    id: 3,
    text: 'see_more',
    icon: ArrowRightIcon,
    iconclass: 'ml-2',
    classes: 'border border-blue-400 text-blue-400 cursor-pointer',
    to: '/details',
    type: 'router' // Vue Router
  }
]
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
