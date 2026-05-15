<template>
  <section class="relative py-20 overflow-hidden min-h-screen flex items-center" id="about">
    <div class="w-full px-5 sm:px-8 md:px-12 lg:px-8 max-w-5xl lg:max-w-7xl mx-auto relative z-10">
      <div class="grid lg:grid-cols-2 gap-10 xl:gap-14 items-center">

        <!-- ── Image grid ── -->
        <div class="lg:h-full flex justify-center lg:justify-start order-2 lg:order-1">
          <div class="relative w-full max-w-md">
            <div
              data-aos="zoom-in"
              class="p-4 relative rounded-3xl backdrop-blur-sm shadow-2xl accent-card"
            >
              <div class="grid grid-cols-2 gap-4">
                <div
                  v-for="image in aboutImage"
                  :key="image.id"
                  class="relative group"
                  :data-aos="image.animation"
                  :data-aos-delay="image.delay"
                >
                  <!-- Image border ring -->
                  <div
                    class="rounded-2xl p-1 border shadow-lg"
                    :style="{
                      background: image.gradient,
                      borderColor: 'transparent'
                    }"
                  >
                    <img
                      :src="image.src"
                      :alt="image.alt"
                      class="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <!-- Badge -->
                  <div
                    class="absolute -top-2 -right-2 text-white text-[10px] px-2 py-1 rounded-full font-semibold"
                    :style="{ backgroundColor: image.badgeColor }"
                  >
                    {{ image.badge }}
                  </div>
                </div>
              </div>

              <!-- Experience banner -->
              <div
                class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-20 rounded-2xl px-6 py-3 shadow-xl border"
                :style="{
                  background: 'var(--cta-gradient)',
                  borderColor: 'var(--accent-border)'
                }"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div class="text-center text-white text-xl font-bold">
                  {{ t('two_years_experience') }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Text side ── -->
        <div class="text-center lg:text-left" data-aos="fade-left">
          <h2 class="text-white font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
            {{ t('about_') }}<span
              class="text-transparent bg-clip-text"
              :style="{ backgroundImage: 'var(--logo-gradient)' }"
            >{{ t('_me') }}</span>
          </h2>
          <p
            class="font-medium text-lg md:text-xl mt-4"
            :style="{ color: 'var(--accent-text-muted)' }"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            Full-Stack Developer &amp; UI/UX Designer
          </p>
        </div>

        <p
          class="text-gray-300 pt-6 text-center lg:text-left text-lg leading-relaxed"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          {{ t('about_me_long_text') }}
        </p>

        <div class="order-1 lg:order-2" data-aos="fade-left">

          <!-- Skills grid -->
          <div class="grid sm:grid-cols-2 gap-4 mb-10">
            <div
              v-for="skill in skills"
              :key="skill.id"
              class="flex items-start space-x-3 p-3 rounded-xl bg-white/5 border border-white/10"
            >
              <component
                :is="skill.icon"
                class="w-6 h-6 shrink-0"
                :style="{ color: skill.iconColor }"
              />
              <div>
                <h4 class="text-white font-medium text-sm">{{ skill.title }}</h4>
                <p class="text-gray-400 text-xs">{{ skill.desc }}</p>
              </div>
            </div>
          </div>

          <!-- CTA buttons -->
          <div class="flex flex-wrap gap-4">
            <component
              v-for="btn in ctaButtons"
              :key="btn.id"
              :is="btn.type === 'router' ? 'router-link' : 'a'"
              :to="btn.type === 'router' ? btn.to : null"
              :href="btn.type !== 'router' ? btn.to : null"
              class="group px-6 py-3 rounded-full flex items-center font-semibold transition-all duration-300"
              :style="btn.style"
              @mouseenter="e => btn.onHover && btn.onHover(e)"
              @mouseleave="e => btn.onLeave && btn.onLeave(e)"
            >
              <!-- icon left -->
              <component
                v-if="btn.iconLeft"
                :is="btn.iconLeft"
                class="w-5 h-5 mr-2 group-hover:translate-y-1 transition-transform"
              />

              {{ t(btn.text) }}

              <!-- icon right -->
              <component
                v-if="btn.iconRight"
                :is="btn.iconRight"
                class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
              />
            </component>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
  CodeBracketSquareIcon,
  CubeIcon,
  PaintBrushIcon,
  ServerIcon,
  ShoppingBagIcon,
} from '@heroicons/vue/16/solid';

import about1 from '/professional.jpg';
import about2 from '/creative.jpg';
import about3 from '/developer.jpg';
import about4 from '/designer.jpg';

import { t } from './../stores/languages';

// ── Image grid ─────────────────────────────────────────────
// gradient & badgeColor use CSS variables via inline style
const aboutImage = [
  {
    id: 1, src: about1, alt: 'Professional',
    gradient:   'linear-gradient(to right, var(--accent-mid-dark), var(--accent-to-mid))',
    badge: 'Professional',
    badgeColor: 'var(--accent-mid-dark)',
    animation: 'fade-right', delay: 200,
  },
  {
    id: 2, src: about2, alt: 'Creative',
    gradient:   'linear-gradient(to right, var(--accent-mid), var(--accent-to-mid))',
    badge: 'Creative',
    badgeColor: 'var(--accent-to-mid)',
    animation: 'fade-left', delay: 300,
  },
  {
    id: 3, src: about3, alt: 'Developer',
    gradient:   'linear-gradient(to right, var(--accent-mid), var(--accent-to-mid))',
    badge: 'Developer',
    badgeColor: 'var(--accent-mid-dark)',
    animation: 'fade-right', delay: 400,
  },
  {
    id: 4, src: about4, alt: 'Design',
    gradient:   'linear-gradient(to right, var(--accent-mid-dark), var(--accent-to-dark))',
    badge: 'Design',
    badgeColor: 'var(--accent-to-dark)',
    animation: 'fade-left', delay: 500,
  },
];

// ── Skills ──────────────────────────────────────────────────
const skills = [
  { id: 1, icon: CodeBracketSquareIcon, iconColor: 'var(--icon-accent)',   title: 'Frontend',   desc: 'Vue js, React, JavaScript, TypeScript, Tailwind CSS' },
  { id: 2, icon: ServerIcon,            iconColor: 'var(--icon-accent-2)', title: 'Backend',    desc: 'Node js, Express, MongoDB, SQL, REST APIs' },
  { id: 3, icon: PaintBrushIcon,        iconColor: 'var(--icon-accent)',   title: 'Design',     desc: 'UI/UX Design, Figma, Responsive Design, Prototyping' },
  { id: 4, icon: ShoppingBagIcon,       iconColor: 'var(--icon-accent-2)', title: 'Marketing',  desc: 'Mautic, OneSignal, POS, Café, Email Marketing' },
  { id: 5, icon: CubeIcon,             iconColor: 'var(--icon-accent)',   title: 'Tools',      desc: 'Git, Docker, AWS, VSCode, Webpack, Postman' },
];

// ── CTA Buttons ─────────────────────────────────────────────
const ctaButtons = [
  {
    id: 1,
    text: 'view_portfolio',
    iconRight: ArrowRightIcon,
    style: { background: 'var(--cta-gradient)', color: '#fff' },
    onHover: e => e.currentTarget.style.filter = 'brightness(1.15)',
    onLeave: e => e.currentTarget.style.filter = 'brightness(1)',
    to: '#projects',
    type: 'anchor',
  },
  {
    id: 2,
    text: 'contact_me',
    iconLeft: ChatBubbleLeftRightIcon,
    style: { border: '1px solid var(--accent-text)', color: 'var(--accent-text)' },
    onHover: e => e.currentTarget.style.backgroundColor = 'var(--accent-bg)',
    onLeave: e => e.currentTarget.style.backgroundColor = 'transparent',
    to: '#contact',
    type: 'anchor',
  },
  {
    id: 3,
    text: 'see_more',
    iconRight: ArrowRightIcon,
    style: { border: '1px solid var(--accent-text)', color: 'var(--accent-text)' },
    onHover: e => e.currentTarget.style.backgroundColor = 'var(--accent-bg)',
    onLeave: e => e.currentTarget.style.backgroundColor = 'transparent',
    to: '/details',
    type: 'router',
  },
];
</script>

<style>
html { scroll-behavior: smooth; }
</style>