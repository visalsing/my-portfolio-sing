<template>
    <section class="relative py-20 overflow-hidden" id="skills">
        <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            <!-- ── Heading ── -->
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
                    <span
                        class="text-transparent bg-clip-text"
                        :style="{ backgroundImage: 'var(--logo-gradient)' }"
                    >
                        {{ t('skills') }}
                    </span> &amp; {{ t('experiences') }}
                </h2>
                <p class="text-lg max-w-2xl mx-auto" :style="{ color: 'var(--accent-text-muted)' }">
                    {{ t('skill_subtitle') }}
                </p>
            </div>

            <!-- ── Stage 1 ── -->
            <div class="grid lg:grid-cols-2 gap-12 lg:gap-16">

                <!-- Left: Technical + Soft Skills -->
                <div data-aos="fade-right">
                    <h3 class="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <CodeBracketIcon class="w-8 h-8" :style="{ color: 'var(--icon-accent-2)' }" />
                        {{ t('technical_skills') }}
                    </h3>

                    <div class="space-y-6">
                        <div v-for="skill in skills" :key="skill.id" class="group">
                            <div class="flex items-center justify-between mb-3">
                                <span
                                    class="font-semibold flex items-center gap-2"
                                    :style="{ color: 'var(--accent-text-muted)' }"
                                >
                                    <component
                                        :is="skill.icon"
                                        class="w-5 h-5"
                                        :style="{ color: skill.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }"
                                    />
                                    {{ skill.title }}
                                </span>
                                <span
                                    class="text-sm"
                                    :style="{ color: skill.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }"
                                >
                                    {{ skill.percentage }} %
                                </span>
                            </div>
                            <div class="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    class="h-full rounded-full transition-all duration-1000 group-hover:brightness-125"
                                    :style="{
                                        width: skill.percentage + '%',
                                        background: 'var(--cta-gradient)'
                                    }"
                                ></div>
                            </div>
                        </div>
                    </div>

                    <!-- Soft Skills -->
                    <div class="mt-12" data-aos="fade-right">
                        <h3 class="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <LightBulbIcon class="w-8 h-8" :style="{ color: 'var(--icon-accent-2)' }" />
                            {{ t('soft_skills') }}
                        </h3>
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-6">
                            <div v-for="skill in softSkills" :key="skill.id" class="flex flex-col items-center group">
                                <div class="relative w-24 h-24 mb-4">
                                    <svg class="w-full h-full transform -rotate-90">
                                        <circle cx="48" cy="48" r="40" stroke="currentColor"
                                            stroke-width="6" fill="transparent" class="text-gray-700" />
                                        <circle
                                            cx="48" cy="48" r="40"
                                            stroke-width="6" fill="transparent"
                                            :stroke-dasharray="2 * Math.PI * 40"
                                            :stroke-dashoffset="2 * Math.PI * 40 * (1 - skill.percentage / 100)"
                                            stroke-linecap="round"
                                            class="transition-all duration-1000 group-hover:brightness-125"
                                            :style="{ stroke: skill.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }"
                                        />
                                    </svg>
                                    <div class="absolute inset-0 flex flex-col items-center justify-center">
                                        <span class="text-white font-bold text-lg">{{ skill.percentage }}%</span>
                                    </div>
                                </div>
                                <span
                                    class="font-medium text-center text-sm"
                                    :style="{ color: 'var(--accent-text-muted)' }"
                                >{{ skill.title }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right: Linguistic + Hobbies -->
                <div data-aos="fade-right">
                    <h3 class="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <LanguageIcon class="w-8 h-8" :style="{ color: 'var(--icon-accent-2)' }" />
                        {{ t('linguistic_skills') }}
                    </h3>

                    <div class="space-y-6">
                        <div v-for="language in languages" :key="language.id" class="group">
                            <div class="flex items-center justify-between mb-3">
                                <span
                                    class="font-semibold flex items-center gap-2"
                                    :style="{ color: 'var(--accent-text-muted)' }"
                                >
                                    <img :src="language.flag" :alt="language.title" class="w-full h-3 object-cover" />
                                    {{ language.title }}
                                </span>
                                <span
                                    class="text-sm"
                                    :style="{ color: language.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }"
                                >
                                    {{ language.percentage }} %
                                </span>
                            </div>
                            <div class="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    class="h-full rounded-full transition-all duration-1000 group-hover:brightness-125"
                                    :style="{
                                        width: language.percentage + '%',
                                        background: 'var(--cta-gradient)'
                                    }"
                                ></div>
                            </div>
                        </div>
                    </div>

                    <!-- Hobbies -->
                    <div class="mt-12">
                        <h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <SparklesIcon class="w-8 h-8" :style="{ color: 'var(--icon-accent-2)' }" />
                            {{ t('hobbies_interests') }}
                        </h3>
                        <div class="flex flex-col gap-3">
                            <span
                                v-for="hobbyInterest in hobbiesInterests"
                                :key="hobbyInterest.id"
                                class="w-full px-5 py-4 border-l-4 font-bold hover:translate-x-1 transition-all duration-300 text-lg mt-2 text-white"
                                :style="hobbyInterest.useAccent2
                                    ? {
                                        borderColor:       'var(--icon-accent-2)',
                                        backgroundColor:   'var(--accent-to-bg)',
                                      }
                                    : {
                                        borderColor:       'var(--accent-text)',
                                        backgroundColor:   'var(--accent-bg)',
                                      }
                                "
                                @mouseenter="e => e.currentTarget.style.backgroundColor = hobbyInterest.useAccent2
                                    ? 'var(--accent-to-bg-hover)'
                                    : 'var(--accent-bg-hover)'"
                                @mouseleave="e => e.currentTarget.style.backgroundColor = hobbyInterest.useAccent2
                                    ? 'var(--accent-to-bg)'
                                    : 'var(--accent-bg)'"
                            >
                                {{ hobbyInterest.hobby }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ── Stage 2: Tech Stack + Work Experience ── -->
            <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 mt-15">

                <!-- Tech Stack -->
                <div data-aos="fade-right">
                    <h3 class="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <Squares2X2Icon class="w-8 h-8" :style="{ color: 'var(--icon-accent-2)' }" />
                        {{ t('tech_stack') }}
                    </h3>

                    <div class="space-y-4">
                        <div v-for="group in techStack.slice(0, 2)" :key="group.id">
                            <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <component
                                    :is="group.icon"
                                    class="w-6 h-6"
                                    :style="{ color: group.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }"
                                />
                                {{ group.title }}
                            </h4>
                            <div class="flex flex-wrap gap-3">
                                <span
                                    v-for="item in group.stack"
                                    :key="item"
                                    class="px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-all"
                                    :style="{
                                        background:   'var(--accent-bg)',
                                        border:       '1px solid var(--accent-border)',
                                        color:        'var(--accent-text-muted)'
                                    }"
                                >
                                    {{ item }}
                                </span>
                            </div>
                        </div>

                        <transition name="fade">
                            <div v-if="showMore" class="space-y-4">
                                <div v-for="group in techStack.slice(2)" :key="group.id">
                                    <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                        <component
                                            :is="group.icon"
                                            class="w-6 h-6"
                                            :style="{ color: group.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }"
                                        />
                                        {{ group.title }}
                                    </h4>
                                    <div class="flex flex-wrap gap-3">
                                        <span
                                            v-for="item in group.stack"
                                            :key="item"
                                            class="px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-all"
                                            :style="{
                                                background: 'var(--accent-bg)',
                                                border:     '1px solid var(--accent-border)',
                                                color:      'var(--accent-text-muted)'
                                            }"
                                        >
                                            {{ item }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>

                    <div class="flex justify-center my-8">
                        <button
                            @click="showMore = !showMore"
                            class="px-6 py-2 text-white rounded-full font-bold transition-all flex items-center gap-2"
                            :style="{ background: 'var(--cta-gradient)', boxShadow: '0 4px 15px var(--accent-shadow)' }"
                            @mouseenter="e => e.currentTarget.style.filter = 'brightness(1.15)'"
                            @mouseleave="e => e.currentTarget.style.filter = 'brightness(1)'"
                        >
                            {{ showMore ? t('show_less') : t('click_to_see_more') }}
                            <component :is="showMore ? ChevronUpIcon : ChevronDownIcon" class="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <!-- Work Experience -->
                <div data-aos="fade-left">
                    <h3 class="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <BriefcaseIcon class="w-8 h-8" :style="{ color: 'var(--icon-accent-2)' }" />
                        {{ t('work_experience') }}
                    </h3>
                    <div class="space-y-8">
                        <div
                            v-for="exp in experiences"
                            :key="exp.id"
                            class="relative pl-8 border-l-2 group"
                            :style="{ borderColor: exp.useAccent2 ? 'var(--accent-border-2)' : 'var(--section-border)' }"
                        >
                            <div
                                class="absolute -left-2 top-0 w-4 h-4 rounded-full group-hover:scale-150 transition-transform duration-300"
                                :style="{ backgroundColor: exp.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }"
                            ></div>
                            <div
                                class="rounded-2xl p-6 border backdrop-blur-sm transition-all duration-300"
                                :style="{
                                    background:   'linear-gradient(to bottom right, rgba(31,41,55,0.50), var(--section-grad-to))',
                                    borderColor:  exp.useAccent2 ? 'var(--accent-border-2-soft)' : 'var(--section-border)'
                                }"
                                @mouseenter="e => e.currentTarget.style.borderColor = 'var(--accent-border-hover)'"
                                @mouseleave="e => e.currentTarget.style.borderColor = exp.useAccent2 ? 'var(--accent-border-2-soft)' : 'var(--section-border)'"
                            >
                                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                                    <h4 class="text-lg font-bold text-white">{{ exp.position }}</h4>
                                    <span
                                        class="mt-1 sm:mt-0 text-sm font-semibold"
                                        :style="{ color: exp.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }"
                                    >{{ exp.period }}</span>
                                </div>
                                <p
                                    class="font-medium mb-3"
                                    :style="{ color: exp.useAccent2 ? 'var(--icon-accent)' : 'var(--icon-accent-2)' }"
                                >{{ exp.company }}</p>
                                <p class="text-blue-100 text-sm leading-relaxed">{{ exp.desc }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ── Stage 3: Education + Additional Skills ── -->
            <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 mt-15">

                <!-- Education -->
                <div data-aos="fade-left">
                    <h3 class="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <AcademicCapIcon class="w-8 h-8" :style="{ color: 'var(--icon-accent-2)' }" />
                        {{ t('education_history') }}
                    </h3>
                    <div class="space-y-8">
                        <div
                            v-for="education in educationHistory.slice(0, 3)"
                            :key="education.id"
                            class="relative pl-8 border-l-2 group"
                            :style="{ borderColor: education.useAccent2 ? 'var(--accent-border-2)' : 'var(--section-border)' }"
                        >
                            <div
                                class="absolute -left-2 top-0 w-4 h-4 rounded-full group-hover:scale-150 transition-transform duration-300"
                                :style="{ backgroundColor: education.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }"
                            ></div>
                            <div
                                class="rounded-2xl p-6 border backdrop-blur-sm transition-all duration-300"
                                :style="{
                                    background:  'linear-gradient(to bottom right, rgba(31,41,55,0.50), var(--section-grad-to))',
                                    borderColor: education.useAccent2 ? 'var(--accent-border-2-soft)' : 'var(--section-border)'
                                }"
                                @mouseenter="e => e.currentTarget.style.borderColor = 'var(--accent-border-hover)'"
                                @mouseleave="e => e.currentTarget.style.borderColor = education.useAccent2 ? 'var(--accent-border-2-soft)' : 'var(--section-border)'"
                            >
                                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                                    <h4 class="text-lg font-bold text-white">{{ education.position }}</h4>
                                    <span
                                        class="mt-1 sm:mt-0 text-sm font-semibold"
                                        :style="{ color: education.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }"
                                    >{{ education.period }}</span>
                                </div>
                                <p
                                    class="font-medium mb-3"
                                    :style="{ color: education.useAccent2 ? 'var(--icon-accent)' : 'var(--icon-accent-2)' }"
                                >{{ education.company }}</p>
                                <p class="text-blue-100 text-sm leading-relaxed">{{ education.desc }}</p>
                            </div>
                        </div>

                        <transition name="fade">
                            <div v-if="showMoreEducation" class="space-y-8">
                                <div
                                    v-for="education in educationHistory.slice(3)"
                                    :key="education.id"
                                    class="relative pl-8 border-l-2 group"
                                    :style="{ borderColor: education.useAccent2 ? 'var(--accent-border-2)' : 'var(--section-border)' }"
                                >
                                    <div
                                        class="absolute -left-2 top-0 w-4 h-4 rounded-full group-hover:scale-150 transition-transform duration-300"
                                        :style="{ backgroundColor: education.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }"
                                    ></div>
                                    <div
                                        class="rounded-2xl p-6 border backdrop-blur-sm transition-all duration-300"
                                        :style="{
                                            background:  'linear-gradient(to bottom right, rgba(31,41,55,0.50), var(--section-grad-to))',
                                            borderColor: education.useAccent2 ? 'var(--accent-border-2-soft)' : 'var(--section-border)'
                                        }"
                                        @mouseenter="e => e.currentTarget.style.borderColor = 'var(--accent-border-hover)'"
                                        @mouseleave="e => e.currentTarget.style.borderColor = education.useAccent2 ? 'var(--accent-border-2-soft)' : 'var(--section-border)'"
                                    >
                                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                                            <h4 class="text-lg font-bold text-white">{{ education.position }}</h4>
                                            <span
                                                class="mt-1 sm:mt-0 text-sm font-semibold"
                                                :style="{ color: education.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }"
                                            >{{ education.period }}</span>
                                        </div>
                                        <p
                                            class="font-medium mb-3"
                                            :style="{ color: education.useAccent2 ? 'var(--icon-accent)' : 'var(--icon-accent-2)' }"
                                        >{{ education.company }}</p>
                                        <p class="text-blue-100 text-sm leading-relaxed">{{ education.desc }}</p>
                                    </div>
                                </div>
                            </div>
                        </transition>

                        <div v-if="educationHistory.length > 3" class="flex justify-center my-8">
                            <button
                                @click="showMoreEducation = !showMoreEducation"
                                class="px-6 py-2 text-white rounded-full font-bold transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                                :style="{ background: 'var(--cta-gradient)', boxShadow: '0 4px 15px var(--accent-shadow)' }"
                                @mouseenter="e => e.currentTarget.style.filter = 'brightness(1.15)'"
                                @mouseleave="e => e.currentTarget.style.filter = 'brightness(1)'"
                            >
                                {{ showMoreEducation ? t('show_less') : t('click_to_see_more') }}
                                <component :is="showMoreEducation ? ChevronUpIcon : ChevronDownIcon" class="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Additional Skills -->
                <div data-aos="fade-left">
                    <h3 class="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <BriefcaseIcon class="w-8 h-8" :style="{ color: 'var(--icon-accent-2)' }" />
                        {{ t('additional_skills') }}
                    </h3>
                    <div class="space-y-8">
                        <div
                            v-for="additionalSkill in additionalSkills"
                            :key="additionalSkill.id"
                            class="relative pl-8 border-l-2 group"
                            :style="{ borderColor: additionalSkill.useAccent2 ? 'var(--accent-border-2)' : 'var(--section-border)' }"
                        >
                            <div
                                class="absolute -left-2 top-0 w-4 h-4 rounded-full group-hover:scale-150 transition-transform duration-300"
                                :style="{ backgroundColor: additionalSkill.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }"
                            ></div>
                            <div
                                class="rounded-2xl p-6 border backdrop-blur-sm transition-all duration-300"
                                :style="{
                                    background:  'linear-gradient(to bottom right, rgba(31,41,55,0.50), var(--section-grad-to))',
                                    borderColor: additionalSkill.useAccent2 ? 'var(--accent-border-2-soft)' : 'var(--section-border)'
                                }"
                                @mouseenter="e => e.currentTarget.style.borderColor = 'var(--accent-border-hover)'"
                                @mouseleave="e => e.currentTarget.style.borderColor = additionalSkill.useAccent2 ? 'var(--accent-border-2-soft)' : 'var(--section-border)'"
                            >
                                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                                    <h4 class="text-lg font-bold text-white">{{ additionalSkill.position }}</h4>
                                    <span
                                        class="mt-1 sm:mt-0 text-sm font-semibold"
                                        :style="{ color: additionalSkill.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }"
                                    >{{ additionalSkill.period }}</span>
                                </div>
                                <p
                                    class="font-medium mb-3"
                                    :style="{ color: additionalSkill.useAccent2 ? 'var(--icon-accent)' : 'var(--icon-accent-2)' }"
                                >{{ additionalSkill.company }}</p>
                                <p class="text-blue-100 text-sm leading-relaxed">{{ additionalSkill.desc }}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<script setup>
import {
    BriefcaseIcon, CloudIcon, CodeBracketIcon, DevicePhoneMobileIcon,
    PaintBrushIcon, ServerIcon, Squares2X2Icon, AcademicCapIcon,
    ChevronUpIcon, ChevronDownIcon, MegaphoneIcon, BoltIcon,
    CircleStackIcon, LanguageIcon, LightBulbIcon, SparklesIcon,
    CpuChipIcon, LockClosedIcon, CloudArrowUpIcon, WrenchScrewdriverIcon,
    ClipboardDocumentIcon, SwatchIcon
} from '@heroicons/vue/16/solid';
import { ref, computed } from 'vue';
import { t } from './../stores/languages.js';

const showMore          = ref(false);
const showMoreEducation = ref(false);

// ── Technical Skills ────────────────────────────────────────
// useAccent2: true → var(--icon-accent-2), false → var(--icon-accent)
const skills = [
    { id: 1, title: "Front-end Development",          icon: CodeBracketIcon,      useAccent2: false, percentage: 84 },
    { id: 2, title: "Back-end Development",           icon: ServerIcon,           useAccent2: true,  percentage: 79 },
    { id: 3, title: "Web Design",                     icon: PaintBrushIcon,       useAccent2: false, percentage: 68 },
    { id: 4, title: "Mobile Developer",               icon: DevicePhoneMobileIcon,useAccent2: true,  percentage: 50 },
    { id: 5, title: "DevOps & Cloud",                 icon: CloudIcon,            useAccent2: false, percentage: 40 },
    { id: 6, title: "Marketing & Automation",         icon: MegaphoneIcon,        useAccent2: false, percentage: 50 },
    { id: 7, title: "API Architecture & Implementation", icon: CircleStackIcon,   useAccent2: false, percentage: 70 },
];

// ── Soft Skills ─────────────────────────────────────────────
const softSkills = [
    { id: 1, title: "Resilience & Optimistic",       useAccent2: false, percentage: 85 },
    { id: 2, title: "Analytic Thinking",             useAccent2: true,  percentage: 79 },
    { id: 3, title: "Active Growth Mindset",         useAccent2: false, percentage: 87 },
    { id: 4, title: "Continuous Learning",           useAccent2: true,  percentage: 88 },
    { id: 5, title: "Adaptability",                  useAccent2: false, percentage: 92 },
    { id: 6, title: "Problem-Solving & Debugging",   useAccent2: true,  percentage: 76 },
    { id: 7, title: "Self-Directed Learning",        useAccent2: false, percentage: 75 },
    { id: 8, title: "Teamwork & Communication",      useAccent2: true,  percentage: 60 },
];

// ── Languages ───────────────────────────────────────────────
const languages = [
    { id: 1, title: "Khmer",   flag: './../../public/cambodia-flag.png', useAccent2: false, percentage: 92 },
    { id: 2, title: "English", flag: './../../public/uk-flag.png',       useAccent2: true,  percentage: 87 },
    { id: 3, title: "Chinese", flag: './../../public/china-flag.png',    useAccent2: false, percentage: 22 },
    { id: 4, title: "French",  flag: './../../public/france-flag.png',   useAccent2: true,  percentage: 10 },
    { id: 5, title: "Thai",     flag: './../../public/thailand-flag.png',     useAccent2: false, percentage: 65 },
    { id: 6, title: "Lao",     flag: './../../public/laos-flag.png',     useAccent2: false, percentage: 59 },
    { id: 7, title: "Burmese",     flag: './../../public/myanmar-flag.png',     useAccent2: false, percentage: 10 },
];

// ── Hobbies ─────────────────────────────────────────────────
// useAccent2: true → cyan side vars, false → blue/accent side vars
const hobbiesInterests = [
    { id: 1, hobby: "Reading Books",             useAccent2: false },
    { id: 2, hobby: "Learning Languages",        useAccent2: true  },
    { id: 3, hobby: "Content Creation",          useAccent2: false },
    { id: 4, hobby: "Open Source Contributing",  useAccent2: true  },
    { id: 5, hobby: "Project-Based Learning",    useAccent2: false },
    { id: 6, hobby: "Photography",               useAccent2: true  },
];

// ── Experiences ─────────────────────────────────────────────
const experiences = [
    {
        id: 1, useAccent2: false,
        position: "Junior Software Developer", company: "GPAS.IO.CO,Ltd", period: "2024 - 2026",
        desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    },
    {
        id: 2, useAccent2: true,
        position: "Interned Web Developer", company: "Code Clans", period: "2023 - 2024",
        desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    },
];

// ── Education ───────────────────────────────────────────────
const educationHistory = [
    {
        id: 1, useAccent2: false,
        position: "Bachelor Degree of Computer Science", company: "Royal University of Phnom Penh (RUPP)", period: "2020 - 2024",
        desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    },
    {
        id: 2, useAccent2: true,
        position: "Basic Web and PHP + Laravel Course", company: "Instinct Institute", period: "2023 - 2024",
        desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    },
    {
        id: 3, useAccent2: false,
        position: "General English Programme (GEP)", company: "Australian Centre of Education (ACE)", period: "2020 - 2023",
        desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    },
    {
        id: 4, useAccent2: true,
        position: "Dart + Flutter Course", company: "Engineering of Technology and Electronic Center (ETEC)", period: "2022 - 2023",
        desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    },
    {
        id: 5, useAccent2: false,
        position: "C/C++ & Java Course", company: "Engineering of Technology and Electronic Center (ETEC)", period: "2020 - 2022",
        desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    },
];

// ── Additional Skills ───────────────────────────────────────
const additionalSkills = [
    {
        id: 1, useAccent2: false,
        position: "Digital Sales Assistant", company: "A Small Business", period: "2024 - 2026",
        desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    },
    {
        id: 2, useAccent2: true,
        position: "Small Content Creator", company: "Independent Content Creator", period: "2022 - 2026 (Present)",
        desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    },
];

// ── Tech Stack ──────────────────────────────────────────────
const frontends      = ['HTML','CSS','JavaScript','TypeScript','XML','Vue.js','Vite','React.js','Next.js','Nuxt.js','jQuery','Tailwind CSS','Bootstrap','Shadcn/ui','Material UI'];
const backends       = ['PHP','SQL','Java','C#','Python','Laravel','Laravel Backpack','Node.js','Express.js','SpringBoot','ASP.NET','Flask','Django'];
const mobiles        = ['Dart','Flutter'];
const programmings   = ['C','C++'];
const databaseOrms   = ['MySQL','PostgreSQL','MongoDB','NeonDB','SQLite','Prisma ORM','GraphQL'];
const apiSecurities  = ['REST APIs','Postman','JWT'];
const cmsMartketingtechs = ['WordPress','Drupal','Joomla','Ecwid','Mautic','OneSignal','Tinode','TelegramBot'];
const devopsDeployments  = ['Git','GitHub','GitLab','Netlify','Vercel','Patheon','Apache','Docker','DigitalOcean','AWS','Linux','Ubuntu'];
const developmenttools   = ['VS Code','PWA','WAMPP','XAMPP','Laragon','Ngrok','Navicat','phpMyAdmin'];
const designs        = ['Figma','Photoshop','Canva','CapCut','Responsive Design'];
const productivities = ['Microsoft Office','Google Workspace','Basic Computer Fundamentals','LLMs/AI Assistances'];

const techStack = [
    { id: 1,  title: "Front-end",            icon: CodeBracketIcon,     useAccent2: false, stack: frontends },
    { id: 2,  title: "Back-end",             icon: ServerIcon,          useAccent2: true,  stack: backends },
    { id: 3,  title: "Mobile",               icon: DevicePhoneMobileIcon, useAccent2: false, stack: mobiles },
    { id: 4,  title: "Programming",          icon: CpuChipIcon,         useAccent2: true,  stack: programmings },
    { id: 5,  title: "Databases & ORM",      icon: CircleStackIcon,     useAccent2: false, stack: databaseOrms },
    { id: 6,  title: "APIs & Security",      icon: LockClosedIcon,      useAccent2: true,  stack: apiSecurities },
    { id: 7,  title: "CMS & Marketing Tech", icon: MegaphoneIcon,       useAccent2: false, stack: cmsMartketingtechs },
    { id: 8,  title: "DevOps & Deployment",  icon: CloudArrowUpIcon,    useAccent2: true,  stack: devopsDeployments },
    { id: 9,  title: "Development Tools",    icon: WrenchScrewdriverIcon, useAccent2: false, stack: developmenttools },
    { id: 10, title: "Designs",              icon: SwatchIcon,          useAccent2: true,  stack: designs },
    { id: 11, title: "Productivities",       icon: ClipboardDocumentIcon, useAccent2: false, stack: productivities },
];
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from,
.fade-leave-to     { opacity: 0; }
</style>