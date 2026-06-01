<template>
  <section class="relative py-20 bg-black overflow-hidden" id="services">
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="relative mt-12">
        <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-blue-500/40 shadow-[0_0_10px_rgba(59,130,246,0.2)] hidden md:block"></div>

        <div class="space-y-16 md:space-y-32">
          <div 
            v-for="(service, index) in services" 
            :key="service.id"
            class="relative flex flex-col md:flex-row items-start w-full"
            :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
          >
            <div 
              class="w-full md:w-1/2 px-4 md:px-16 flex" 
              :class="index % 2 === 0 ? 'md:justify-end md:text-right' : 'md:justify-start md:text-left'"
            >
              <div class="max-w-md w-full flex flex-col" :class="index % 2 === 0 ? 'md:items-end' : 'md:items-start'">
                
                <div class="md:hidden w-10 h-10 mb-4 bg-[#0a0f1d] border border-blue-500 text-blue-400 flex items-center justify-center font-bold rounded-lg shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                  {{ index + 1 }}
                </div>

                <h3 class="text-2xl font-bold text-white tracking-tight mb-2">
                  {{ service.name }}
                </h3>
                
                <div class="w-24 h-[2px] bg-blue-500/60 mb-4 shadow-[0_0_8px_rgba(59,130,246,0.4)]"></div>

                <p class="text-gray-400 text-lg leading-relaxed">
                  {{ service.desc }}
                </p>
              </div>
            </div>

            <div class="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center z-20">
              <div class="w-12 h-12 bg-[#0a0f1d] border-2 border-blue-400 text-blue-400 flex items-center justify-center font-bold rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                {{ index + 1 }}
              </div>
            </div>

            <div class="hidden md:block md:w-1/2"></div>
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
    CodeBracketIcon,
    DevicePhoneMobileIcon,
    DocumentTextIcon,
    EnvelopeIcon,
    PaintBrushIcon
} from '@heroicons/vue/16/solid';
import { ref } from 'vue';
import { t } from './../stores/languages.js';

const services = ref([
    {
        id: 1,
        icon: CodeBracketIcon,
        name: 'Web Frontend Development',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
        {
        id: 2,
        icon: CodeBracketIcon,
        name: 'Web Backend Development',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
        id: 3,
        icon: DocumentTextIcon,
        name: 'Technical Writing',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
        id: 4,
        icon: DevicePhoneMobileIcon,
        name: 'Mobile App Development',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
        id: 5,
        icon: EnvelopeIcon,
        name: 'Email Marketing',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
        id: 6,
        icon: PaintBrushIcon,
        name: 'UI/UX Design',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
        id: 7,
        icon: PaintBrushIcon,
        name: 'Web Designing',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
        {
        id: 8,
        icon: PaintBrushIcon,
        name: 'API Integration',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
        {
        id: 9,
        icon: PaintBrushIcon,
        name: 'API Development',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
        {
        id: 10,
        icon: PaintBrushIcon,
        name: 'Content Creation',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
            {
        id: 11,
        icon: PaintBrushIcon,
        name: 'Telegram Bot',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
])
</script>
<style scoped>
/* Optional: Adding a slight glow to the vertical line */
.absolute.left-1\/2 {
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.1);
}
</style>