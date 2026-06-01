<template>
    <section class="relative py-24 min-h-screen overflow-hidden" :style="{ backgroundColor: 'var(--bg-color)' }">

        <div class="absolute top-0 right-0 w-[600px] h-[600px] opacity-10 blur-[150px] rounded-full pointer-events-none"
            :style="{ backgroundColor: 'var(--accent-glow)' }"></div>

        <div class="relative z-10 max-w-3xl mx-auto px-6">

            <!-- ── Breadcrumb ── -->
            <nav class="flex mb-8" aria-label="Breadcrumb" data-aos="fade-down">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                    <li class="inline-flex items-center">
                        <router-link to="/"
                            class="group inline-flex items-center text-sm font-medium transition-all duration-300"
                            style="color: var(--surface-text-sub);">
                            <div class="mr-2">
                                <HomeIcon class="breadcrumb-home-icon w-4 h-4" />
                            </div>
                            <span class="breadcrumb-home-text">Home</span>
                        </router-link>
                    </li>
                    <li>
                        <div class="flex items-center">
                            <svg class="w-6 h-6" style="color: var(--surface-text-dim);" fill="currentColor"
                                viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                            <span class="ml-1 text-sm font-semibold md:ml-2 text-transparent bg-clip-text"
                                :style="{ backgroundImage: 'var(--logo-gradient)' }">Frequently Answers & Questions (FAQs)</span>
                        </div>
                    </li>
                </ol>
            </nav>

            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-sm uppercase tracking-[0.3em] font-bold mb-3" :style="{ color: 'var(--accent-text)' }">
                    Common Inquiries</h2>
                <h1 class="text-5xl font-black text-white tracking-tighter">
                    Questions & <span class="text-transparent bg-clip-text"
                        :style="{ backgroundImage: 'var(--logo-gradient)' }">Answers</span>
                </h1>
            </div>

            <div class="relative mb-12 group" data-aos="fade-up" data-aos-delay="100">
                <input v-model="searchQuery" type="text" placeholder="Search for a topic..."
                    class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-12 text-white placeholder:opacity-30 focus:outline-none focus:ring-2 transition-all"
                    :style="{ focusRingColor: 'var(--accent-border)' }" />
                <MagnifyingGlassIcon
                    class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity" />
            </div>

            <div class="space-y-4">
                <div v-for="(item, index) in filteredFaqs" :key="index"
                    class="rounded-3xl border overflow-hidden transition-all duration-500" :style="{
                        borderColor: activeIndex === index ? 'var(--accent-border)' : 'var(--section-border)',
                        backgroundColor: activeIndex === index ? 'rgba(255,255,255,0.03)' : 'transparent'
                    }" data-aos="fade-up" :data-aos-delay="index * 50">
                    <button @click="toggle(index)"
                        class="w-full flex items-center justify-between p-6 text-left transition-all">
                        <span class="text-lg font-semibold pr-8"
                            :class="activeIndex === index ? 'text-white' : 'text-gray-400'">
                            {{ item.question }}
                        </span>
                        <div class="shrink-0 transition-transform duration-500"
                            :class="{ 'rotate-180': activeIndex === index }">
                            <ChevronDownIcon class="w-6 h-6"
                                :style="{ color: activeIndex === index ? 'var(--accent-text)' : 'gray' }" />
                        </div>
                    </button>

                    <div class="transition-all duration-500 ease-in-out" :style="{
                        maxHeight: activeIndex === index ? '500px' : '0px',
                        opacity: activeIndex === index ? '1' : '0'
                    }">
                        <div class="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                            {{ item.answer }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-16 text-center" data-aos="zoom-in">
                <p class="text-gray-500 mb-4">Still have questions?</p>
                <router-link to="/contact" class="font-bold border-b-2 transition-all hover:opacity-70"
                    :style="{ borderColor: 'var(--accent-text)', color: 'var(--accent-text)' }">
                    Send me a direct message
                </router-link>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ChevronDownIcon, MagnifyingGlassIcon, HomeIcon } from '@heroicons/vue/24/outline';

const activeIndex = ref(null);
const searchQuery = ref('');

const faqs = [
    {
        question: "What is your typical project timeline?",
        answer: "For most web development projects, the timeline ranges from 4 to 8 weeks. This includes the strategy phase, design mockups, development, and final testing. Complex full-stack systems may take longer."
    },
    {
        question: "Do you provide long-term maintenance?",
        answer: "Yes, I offer monthly maintenance packages that include security updates, cloud backups, performance optimization, and minor content updates to ensure your system stays modern."
    },
    {
        question: "Which technologies do you specialize in?",
        answer: "My core stack includes Vue 3, React, Tailwind CSS for the frontend, and Laravel, Node.js, and PostgreSQL for the backend. I also build mobile apps using Flutter."
    },
    {
        question: "How do we start a collaboration?",
        answer: "Simply use the contact form or email me. We will schedule a brief discovery call to discuss your goals, after which I will provide a detailed proposal and quote."
    },
    {
        question: "Can you work with existing codebases?",
        answer: "Absolutely. I can perform system audits, fix bugs, or implement new features into existing projects, provided they meet a baseline of technical stability."
    }
];

const toggle = (index) => {
    activeIndex.value = activeIndex.value === index ? null : index;
};

const filteredFaqs = computed(() => {
    return faqs.filter(f =>
        f.question.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});
</script>

<style scoped>
/* Ensure smooth height transition without jumping */
.transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* ── Breadcrumb hover effects (unchanged) ─────────────────────────────────── */
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
</style>