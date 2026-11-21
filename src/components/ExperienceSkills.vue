<template>
    <section class="relative py-20 overflow-hidden" id="skills">
        <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            <!-- ── Heading ── -->
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold text-[var(--surface-text)] mb-4">
                    <span class="text-transparent bg-clip-text" :style="{ backgroundImage: 'var(--logo-gradient)' }">
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
                    <h3 class="text-2xl font-bold text-[var(--surface-text)] mb-8 flex items-center gap-3">
                        <CodeBracketIcon class="w-8 h-8" :style="{ color: 'var(--icon-accent-2)' }" />
                        {{ t('technical_skills') }}
                    </h3>

                    <div class="space-y-6">
                        <div v-for="skill in skills" :key="skill.id" class="group">
                            <div class="flex items-center justify-between mb-3">
                                <span class="font-semibold flex items-center gap-2"
                                    :style="{ color: 'var(--accent-text-muted)' }">
                                    <component :is="skill.icon" class="w-5 h-5"
                                        :style="{ color: skill.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }" />
                                    {{ skill.title }}
                                </span>
                                <span class="text-sm"
                                    :style="{ color: skill.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }">
                                    {{ skill.percentage }} %
                                </span>
                            </div>
                            <div class="h-2 bg-[var(--bg-surface-percent)] rounded-full overflow-hidden">
                                <div class="h-full rounded-full transition-all duration-1000 group-hover:brightness-125"
                                    :style="{
                                        width: skill.percentage + '%',
                                        background: 'var(--cta-gradient)'
                                    }"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Soft Skills -->
                    <div class="mt-12" data-aos="fade-right">
                        <h3 class="text-2xl font-bold text-[var(--surface-text)] mb-8 flex items-center gap-3">
                            <LightBulbIcon class="w-8 h-8" :style="{ color: 'var(--icon-accent-2)' }" />
                            {{ t('soft_skills') }}
                            <router-link to="/softskills"
                                class="flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all duration-300 group"
                                :style="{
                                    backgroundColor: 'var(--surface-card)',
                                    borderColor: 'var(--surface-border)',
                                    color: 'var(--surface-text-sub)'
                                }" @mouseenter="e => {
                                    e.currentTarget.style.backgroundColor = 'var(--accent-bg)';
                                    e.currentTarget.style.borderColor = 'var(--accent-border)';
                                    e.currentTarget.style.color = 'var(--surface-text)';
                                }" @mouseleave="e => {
                                    e.currentTarget.style.backgroundColor = 'var(--surface-card)';
                                    e.currentTarget.style.borderColor = 'var(--surface-border)';
                                    e.currentTarget.style.color = 'var(--surface-text-sub)';
                                }">

                                <span class="text-[10px] uppercase tracking-widest font-medium">
                                    {{ t('see_more') }}
                                </span>

                                <CursorArrowRippleIcon
                                    class="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-0.5"
                                    :style="{ color: 'var(--icon-accent-2)' }" />
                            </router-link>
                        </h3>
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-6">
                            <div v-for="skill in softSkills" :key="skill.id" class="flex flex-col items-center group">
                                <div class="relative w-24 h-24 mb-4">
                                    <svg class="w-full h-full transform -rotate-90">
                                        <circle cx="48" cy="48" r="40" stroke="currentColor" stroke-width="6"
                                            fill="transparent" class="text-[var(--bg-surface-percent)]" />
                                        <circle cx="48" cy="48" r="40" stroke-width="6" fill="transparent"
                                            :stroke-dasharray="2 * Math.PI * 40"
                                            :stroke-dashoffset="2 * Math.PI * 40 * (1 - skill.percentage / 100)"
                                            stroke-linecap="round"
                                            class="transition-all duration-1000 group-hover:brightness-125"
                                            :style="{ stroke: skill.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }" />
                                    </svg>
                                    <div class="absolute inset-0 flex flex-col items-center justify-center">
                                        <span class="text-[var(--surface-text)] font-bold text-lg">{{ skill.percentage
                                        }}%</span>
                                    </div>
                                </div>
                                <span class="font-medium text-center text-sm"
                                    :style="{ color: 'var(--accent-text-muted)' }">{{ skill.title }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right: Linguistic + Hobbies -->
                <div data-aos="fade-right">
                    <h3 class="text-2xl font-bold text-[var(--surface-text)] mb-8 flex items-center gap-3">
                        <LanguageIcon class="w-8 h-8" :style="{ color: 'var(--icon-accent-2)' }" />
                        {{ t('linguistic_skills') }}
                    </h3>

                    <div class="space-y-6">
                        <div v-for="language in languages" :key="language.id" class="group">
                            <div class="flex items-center justify-between mb-3">
                                <span class="font-semibold flex items-center gap-2"
                                    :style="{ color: 'var(--accent-text-muted)' }">
                                    <img :src="language.flag" :alt="language.title + ' flag'"
                                        class="w-5 h-3 shrink-0 object-cover" />
                                    <span :class="`font-native-${language.fontKey}`">
                                        {{ language.title }} <span class="font-medium opacity-80">({{ language.nativeName }})</span>
                                    </span>
                                </span>
                                <span class="text-sm"
                                    :style="{ color: language.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }">
                                    {{ language.percentage }} %
                                </span>
                            </div>
                            <div class="h-2 bg-[var(--bg-surface-percent)] rounded-full overflow-hidden">
                                <div class="h-full rounded-full transition-all duration-1000 group-hover:brightness-125"
                                    :style="{
                                        width: language.percentage + '%',
                                        background: 'var(--cta-gradient)'
                                    }"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Hobbies -->
                    <div class="mt-12">
                        <h3 class="text-2xl font-bold text-[var(--surface-text)] mb-6 flex items-center gap-2">
                            <SparklesIcon class="w-8 h-8" :style="{ color: 'var(--icon-accent-2)' }" />
                            {{ t('hobbies_interests') }}
                        </h3>
                        <div class="flex flex-col gap-3">
                            <span v-for="hobbyInterest in hobbiesInterests" :key="hobbyInterest.id"
                                class="w-full px-5 py-4 border-l-4 font-bold hover:translate-x-1 transition-all duration-300 text-lg mt-2 text-[var(--surface-text-sub)] hover:text-[var(--surface-text)]"
                                :style="hobbyInterest.useAccent2
                                    ? {
                                        borderColor: 'var(--icon-accent-2)',
                                        backgroundColor: 'var(--accent-to-bg)',
                                    }
                                    : {
                                        borderColor: 'var(--accent-text)',
                                        backgroundColor: 'var(--accent-bg)',
                                    }
                                    " @mouseenter="e => e.currentTarget.style.backgroundColor = hobbyInterest.useAccent2
                                        ? 'var(--accent-to-bg-hover)'
                                        : 'var(--accent-bg-hover)'" @mouseleave="e => e.currentTarget.style.backgroundColor = hobbyInterest.useAccent2
                                            ? 'var(--accent-to-bg)'
                                            : 'var(--accent-bg)'">
                                {{ hobbyInterest.hobby }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ── Stage 2: Tech Stack + Work Experience ── -->
            <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 mt-15">

                <!-- Tech Stack -->
                <div ref="techRoot" class="scroll-mt-24" data-aos="fade-right">
                    <h3 class="text-2xl font-bold text-[var(--surface-text)] mb-8 flex items-center flex-wrap gap-3">
                        <Squares2X2Icon class="w-8 h-8" :style="{ color: 'var(--icon-accent-2)' }" />

                        {{ t('tech_stack') }}

                        <router-link to="/techstack"
                            class="flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all duration-300 group"
                            :style="{
                                backgroundColor: 'var(--surface-card)',
                                borderColor: 'var(--surface-border)',
                                color: 'var(--surface-text-sub)'
                            }" @mouseenter="e => {
                                e.currentTarget.style.backgroundColor = 'var(--accent-bg)';
                                e.currentTarget.style.borderColor = 'var(--accent-border)';
                                e.currentTarget.style.color = 'var(--surface-text)';
                            }" @mouseleave="e => {
                                e.currentTarget.style.backgroundColor = 'var(--surface-card)';
                                e.currentTarget.style.borderColor = 'var(--surface-border)';
                                e.currentTarget.style.color = 'var(--surface-text-sub)';
                            }">

                            <span class="text-[10px] uppercase tracking-widest font-medium">
                                {{ t('see_more') }}
                            </span>

                            <CursorArrowRippleIcon
                                class="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-0.5"
                                :style="{ color: 'var(--icon-accent-2)' }" />
                        </router-link>
                    </h3>

                    <!-- Show enough groups by default to balance the experience column -->
                    <div class="space-y-4">
                        <div v-for="group in techStack.slice(0, 5)" :key="group.id">
                            <h4 class="text-xl font-bold text-[var(--surface-text)] mb-6 flex items-center gap-2">
                                <component :is="group.icon" class="w-6 h-6"
                                    :style="{ color: group.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }" />
                                {{ group.title }}
                            </h4>
                            <div class="flex flex-wrap gap-3">
                                <TechChip v-for="item in group.stack" :key="item" :name="item"
                                    :fallback-icon="group.icon" :accent2="group.useAccent2" />
                            </div>
                        </div>
                    </div>

                    <!-- remaining groups: slide open / closed -->
                    <Reveal :open="showMore">
                        <div class="space-y-4 pt-4">
                            <div v-for="group in techStack.slice(5)" :key="group.id">
                                <h4 class="text-xl font-bold text-[var(--surface-text)] mb-6 flex items-center gap-2">
                                    <component :is="group.icon" class="w-6 h-6"
                                        :style="{ color: group.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }" />
                                    {{ group.title }}
                                </h4>
                                <div class="flex flex-wrap gap-3">
                                    <TechChip v-for="item in group.stack" :key="item" :name="item"
                                        :fallback-icon="group.icon" :accent2="group.useAccent2" />
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    <div class="flex justify-center my-8">
                        <button @click="toggleTech" :aria-expanded="showMore"
                            class="px-6 py-2 text-white rounded-full font-bold transition-all flex items-center gap-2"
                            :style="{ background: 'var(--cta-gradient)', boxShadow: '0 4px 15px var(--accent-shadow)' }"
                            @mouseenter="e => e.currentTarget.style.filter = 'brightness(1.15)'"
                            @mouseleave="e => e.currentTarget.style.filter = 'brightness(1)'">
                            {{ showMore ? t('show_less') : t('click_to_see_more') }}
                            <component :is="showMore ? ChevronUpIcon : ChevronDownIcon" class="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <!-- Work Experience -->
                <div data-aos="fade-left">
                    <h3 class="text-2xl font-bold text-[var(--surface-text)] mb-8 flex items-center gap-3">
                        <BriefcaseIcon class="w-8 h-8" :style="{ color: 'var(--icon-accent-2)' }" />
                        {{ t('work_experience') }}
                    </h3>
                    <div class="timeline-list space-y-8">
                        <div v-for="exp in experiences" :key="exp.id" data-exp-card
                            class="timeline-item group scroll-mt-24">
                            <div class="timeline-node rounded-full group-hover:scale-110 transition-transform duration-300"
                                :style="{ backgroundColor: exp.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }">
                            </div>
                            <div class="rounded-2xl p-6 border backdrop-blur-sm transition-all duration-300" :style="{
                                background: 'linear-gradient(to bottom right, var(--card-bg-from), var(--section-grad-to))',
                                borderColor: exp.useAccent2 ? 'var(--accent-border-2-soft)' : 'var(--section-border)'
                            }" @mouseenter="e => e.currentTarget.style.borderColor = 'var(--accent-border-hover)'"
                                @mouseleave="e => e.currentTarget.style.borderColor = exp.useAccent2 ? 'var(--accent-border-2-soft)' : 'var(--section-border)'">
                                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                                    <h4 class="text-lg font-bold text-[var(--surface-text)]">{{ exp.position }}</h4>
                                    <div class="mt-1 sm:mt-0 flex flex-wrap items-center gap-2">
                                        <span class="text-sm font-semibold"
                                            :style="{ color: exp.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }">
                                            {{ exp.period }}
                                        </span>
                                        <span v-if="exp.working_status === 1 || exp.working_status === 2"
                                            class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                                            :style="exp.working_status === 1
                                                ? { color: '#34d399', backgroundColor: 'rgba(52, 211, 153, 0.10)', borderColor: 'rgba(52, 211, 153, 0.35)' }
                                                : { color: '#fbbf24', backgroundColor: 'rgba(251, 191, 36, 0.10)', borderColor: 'rgba(251, 191, 36, 0.35)' }">
                                            <span class="h-1.5 w-1.5 rounded-full"
                                                :style="{ backgroundColor: exp.working_status === 1 ? '#34d399' : '#fbbf24' }"
                                                aria-hidden="true"></span>
                                            {{ exp.working_status === 1 ? 'Currently Working' : 'Paused / Rested' }}
                                        </span>
                                    </div>
                                </div>
                                <p class="font-medium mb-3"
                                    :style="{ color: exp.useAccent2 ? 'var(--icon-accent)' : 'var(--icon-accent-2)' }">
                                    {{ exp.company }}</p>
                                <p class="text-[var(--surface-text-sub)] text-sm leading-relaxed mb-4">{{ exp.desc }}
                                </p>

                                <!-- details: slide open / closed -->
                                <Reveal :open="expandedIds.has(exp.id)">
                                    <div v-if="exp.desc_groups" class="space-y-5">
                                        <section v-for="group in exp.desc_groups" :key="group.title">
                                            <h5 class="mb-2 text-sm font-bold"
                                                :style="{ color: exp.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }">
                                                {{ group.title }}
                                            </h5>
                                            <ul class="text-[var(--surface-text-sub)] text-sm leading-relaxed list-disc pl-5 space-y-2">
                                                <li v-for="(point, index) in group.points" :key="index">{{ point }}</li>
                                            </ul>
                                        </section>
                                    </div>
                                    <ul v-else
                                        class="text-[var(--surface-text-sub)] text-sm leading-relaxed list-disc pl-5 space-y-2">
                                        <li v-for="(point, index) in exp.desc_points" :key="index"
                                            class="hover:text-[var(--surface-text-sub)] transition-colors duration-200">
                                            {{ point }}
                                        </li>
                                    </ul>
                                </Reveal>

                                <button @click="toggleExpand(exp.id, $event)" :aria-expanded="expandedIds.has(exp.id)"
                                    class="text-xs font-bold uppercase tracking-tighter mt-4 flex items-center gap-2 group/btn cursor-pointer"
                                    :style="{ color: exp.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }">
                                    <span>{{ expandedIds.has(exp.id) ? 'Show Less' : 'See Details' }}</span>
                                    <span class="transition-transform duration-300"
                                        :class="{ 'rotate-45': expandedIds.has(exp.id) }">
                                        +
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ── Stage 3: Education + Additional Skills ── -->
            <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 mt-15">

                <!-- Education -->
                <div ref="educationRoot" class="scroll-mt-24" data-aos="fade-left">
                    <h3 class="text-2xl font-bold text-[var(--surface-text)] mb-8 flex items-center gap-3">
                        <AcademicCapIcon class="w-8 h-8" :style="{ color: 'var(--icon-accent-2)' }" />
                        {{ t('education_history') }}
                    </h3>

                    <!-- first three: always visible (long text is clamped, with its own See more) -->
                    <div class="timeline-list">
                    <div class="space-y-8">
                        <div v-for="education in educationHistory.slice(0, 3)" :key="education.id"
                            class="timeline-item group">
                            <div class="timeline-node rounded-full group-hover:scale-110 transition-transform duration-300"
                                :style="{ backgroundColor: education.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }">
                            </div>
                            <div class="rounded-2xl p-6 border backdrop-blur-sm transition-all duration-300" :style="{
                                background: 'linear-gradient(to bottom right, var(--card-bg-from), var(--section-grad-to))',
                                borderColor: education.useAccent2 ? 'var(--accent-border-2-soft)' : 'var(--section-border)'
                            }" @mouseenter="e => e.currentTarget.style.borderColor = 'var(--accent-border-hover)'"
                                @mouseleave="e => e.currentTarget.style.borderColor = education.useAccent2 ? 'var(--accent-border-2-soft)' : 'var(--section-border)'">
                                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                                    <h4 class="text-lg font-bold text-[var(--surface-text)]">{{ education.position }}
                                    </h4>
                                    <span class="mt-1 sm:mt-0 text-sm font-semibold"
                                        :style="{ color: education.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }">{{
                                            education.period }}</span>
                                </div>
                                <p class="font-medium mb-3"
                                    :style="{ color: education.useAccent2 ? 'var(--icon-accent)' : 'var(--icon-accent-2)' }">
                                    {{ education.company }}</p>
                                <ExpandableText :text="education.desc" :accent2="education.useAccent2" />
                            </div>
                        </div>
                    </div>

                    <!-- remaining entries: slide open / closed -->
                    <Reveal :open="showMoreEducation">
                        <div class="space-y-8 pt-8">
                            <div v-for="education in educationHistory.slice(3)" :key="education.id"
                                class="timeline-item group">
                                <div class="timeline-node rounded-full group-hover:scale-110 transition-transform duration-300"
                                    :style="{ backgroundColor: education.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }">
                                </div>
                                <div class="rounded-2xl p-6 border backdrop-blur-sm transition-all duration-300" :style="{
                                    background: 'linear-gradient(to bottom right, var(--card-bg-from), var(--section-grad-to))',
                                    borderColor: education.useAccent2 ? 'var(--accent-border-2-soft)' : 'var(--section-border)'
                                }" @mouseenter="e => e.currentTarget.style.borderColor = 'var(--accent-border-hover)'"
                                    @mouseleave="e => e.currentTarget.style.borderColor = education.useAccent2 ? 'var(--accent-border-2-soft)' : 'var(--section-border)'">
                                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                                        <h4 class="text-lg font-bold text-[var(--surface-text)]">{{
                                            education.position }}</h4>
                                        <span class="mt-1 sm:mt-0 text-sm font-semibold"
                                            :style="{ color: education.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }">{{
                                                education.period }}</span>
                                    </div>
                                    <p class="font-medium mb-3"
                                        :style="{ color: education.useAccent2 ? 'var(--icon-accent)' : 'var(--icon-accent-2)' }">
                                        {{ education.company }}</p>
                                    <p class="text-[var(--surface-text-sub)] text-sm leading-relaxed">{{
                                        education.desc }}</p>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                    </div>

                    <div v-if="educationHistory.length > 3" class="flex justify-center my-8">
                        <button @click="toggleEducation" :aria-expanded="showMoreEducation"
                            class="px-6 py-2 text-white rounded-full font-bold transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                            :style="{ background: 'var(--cta-gradient)', boxShadow: '0 4px 15px var(--accent-shadow)' }"
                            @mouseenter="e => e.currentTarget.style.filter = 'brightness(1.15)'"
                            @mouseleave="e => e.currentTarget.style.filter = 'brightness(1)'">
                            {{ showMoreEducation ? t('show_less') : t('click_to_see_more') }}
                            <component :is="showMoreEducation ? ChevronUpIcon : ChevronDownIcon" class="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <!-- Additional Skills -->
                <div data-aos="fade-left">
                    <h3 class="text-2xl font-bold text-[var(--surface-text)] mb-8 flex items-center gap-3">
                        <BriefcaseIcon class="w-8 h-8" :style="{ color: 'var(--icon-accent-2)' }" />
                        {{ t('additional_skills') }}
                    </h3>
                    <div class="timeline-list space-y-8">
                        <div v-for="additionalSkill in additionalSkills" :key="additionalSkill.id"
                            class="timeline-item group">
                            <div class="timeline-node rounded-full group-hover:scale-110 transition-transform duration-300"
                                :style="{ backgroundColor: additionalSkill.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }">
                            </div>
                            <div class="rounded-2xl p-6 border backdrop-blur-sm transition-all duration-300" :style="{
                                background: 'linear-gradient(to bottom right, var(--card-bg-from), var(--section-grad-to))',
                                borderColor: additionalSkill.useAccent2 ? 'var(--accent-border-2-soft)' : 'var(--section-border)'
                            }" @mouseenter="e => e.currentTarget.style.borderColor = 'var(--accent-border-hover)'"
                                @mouseleave="e => e.currentTarget.style.borderColor = additionalSkill.useAccent2 ? 'var(--accent-border-2-soft)' : 'var(--section-border)'">
                                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                                    <h4 class="text-lg font-bold text-[var(--surface-text)]">{{ additionalSkill.position
                                    }}</h4>
                                    <span class="mt-1 sm:mt-0 text-sm font-semibold"
                                        :style="{ color: additionalSkill.useAccent2 ? 'var(--icon-accent-2)' : 'var(--icon-accent)' }">{{
                                            additionalSkill.period }}</span>
                                </div>
                                <p class="font-medium mb-3"
                                    :style="{ color: additionalSkill.useAccent2 ? 'var(--icon-accent)' : 'var(--icon-accent-2)' }">
                                    {{ additionalSkill.company }}</p>
                                <ExpandableText :text="additionalSkill.desc" :accent2="additionalSkill.useAccent2" />
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
    ClipboardDocumentIcon, SwatchIcon,
    ShareIcon,
    ClipboardDocumentCheckIcon,
    CubeTransparentIcon,
    ArrowDownTrayIcon,
    ArrowUpTrayIcon,
    CursorArrowRippleIcon
} from '@heroicons/vue/16/solid';
import { ref, computed } from 'vue';
import { t } from './../stores/languages.js';
import Reveal from './Reveal.vue';
import ExpandableText from './ExpandableText.vue';
import TechChip from './TechChip.vue';

const showMore = ref(false);
const showMoreEducation = ref(false);

/* ───────── See more / See less helpers ─────────
   Same behavior as Services.vue: the content slides open/closed, and on "See less"
   the page scrolls back to the top of that block if it is currently above the viewport. */
const techRoot = ref(null);
const educationRoot = ref(null);

const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function scrollBackTo(el) {
    if (!el || el.getBoundingClientRect().top >= 0) return;
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
}

function toggleTech() {
    const closing = showMore.value;
    showMore.value = !showMore.value;
    if (closing) scrollBackTo(techRoot.value);
}

function toggleEducation() {
    const closing = showMoreEducation.value;
    showMoreEducation.value = !showMoreEducation.value;
    if (closing) scrollBackTo(educationRoot.value);
}

// ── Technical Skills ────────────────────────────────────────
// useAccent2: true → var(--icon-accent-2), false → var(--icon-accent)
const skills = [
    { id: 1, title: "Front-end Development", icon: CodeBracketIcon, useAccent2: false, percentage: 84 },
    { id: 2, title: "Back-end Development", icon: ServerIcon, useAccent2: true, percentage: 79 },
    { id: 3, title: "Web Design", icon: PaintBrushIcon, useAccent2: false, percentage: 68 },
    { id: 4, title: "Mobile Developer", icon: DevicePhoneMobileIcon, useAccent2: true, percentage: 40 },
    { id: 5, title: "DevOps & Cloud", icon: CloudIcon, useAccent2: false, percentage: 40 },
    { id: 6, title: "Marketing & Automation", icon: MegaphoneIcon, useAccent2: false, percentage: 50 },
    { id: 7, title: "API Architecture & Implementation", icon: CircleStackIcon, useAccent2: false, percentage: 70 },
    { id: 8, title: "System Rollouts & User Training", icon: ArrowUpTrayIcon, useAccent2: true, percentage: 75 },
    { id: 9, title: "Data Support & Excel", icon: CircleStackIcon, useAccent2: false, percentage: 65 },
];

// ── Soft Skills ─────────────────────────────────────────────
const softSkills = [
    { id: 1, title: "Resilience & Optimistic", useAccent2: false, percentage: 85 },
    { id: 2, title: "Analytic Thinking", useAccent2: true, percentage: 79 },
    { id: 3, title: "Active Growth Mindset", useAccent2: false, percentage: 87 },
    { id: 4, title: "Continuous Learning", useAccent2: true, percentage: 88 },
    { id: 5, title: "Adaptability", useAccent2: false, percentage: 92 },
    { id: 6, title: "Problem-Solving & Debugging", useAccent2: true, percentage: 76 },
    { id: 7, title: "Self-Directed Learning", useAccent2: false, percentage: 75 },
    { id: 8, title: "Teamwork & Communication", useAccent2: true, percentage: 60 },
];

// ── Languages ───────────────────────────────────────────────
const languages = [
    { id: 1, title: "Khmer", nativeName: "ភាសាខ្មែរ", fontKey: "km", flag: new URL('./../assets/images/flags/cambodia-flag.png', import.meta.url).href, useAccent2: false, percentage: 92 },
    { id: 2, title: "English", nativeName: "English", fontKey: "en", flag: new URL('./../assets/images/flags/uk-flag.png', import.meta.url).href, useAccent2: true, percentage: 87 },
    { id: 3, title: "Chinese", nativeName: "中文", fontKey: "zh", flag: new URL('./../assets/images/flags/taiwan-flag.png', import.meta.url).href, useAccent2: false, percentage: 22 },
    { id: 4, title: "French", nativeName: "Français", fontKey: "fr", flag: new URL('./../assets/images/flags/france-flag.png', import.meta.url).href, useAccent2: true, percentage: 10 },
    { id: 5, title: "Lao", nativeName: "ພາສາລາວ", fontKey: "lo", flag: new URL('./../assets/images/flags/laos-flag.png', import.meta.url).href, useAccent2: false, percentage: 59 },
];

// ── Hobbies ─────────────────────────────────────────────────
// useAccent2: true → cyan side vars, false → blue/accent side vars
const hobbiesInterests = [
    { id: 1, hobby: "Reading Books", useAccent2: false },
    { id: 2, hobby: "Learning Languages", useAccent2: true },
    { id: 3, hobby: "Content Creation", useAccent2: false },
    { id: 4, hobby: "Open Source Contributing", useAccent2: true },
    { id: 5, hobby: "Project-Based Learning", useAccent2: false },
    { id: 6, hobby: "Photography", useAccent2: true },
];

// ── Experiences ─────────────────────────────────────────────
const experiences = [
    {
        id: 1,
        useAccent2: true,
        working_status: 1,
        position: "System Rollouts & Data Support Specialist",
        company: "Unilever",
        period: "Jun 2026 - Dec 2026",
        duration: "6 months",
        desc: "Supported system rollouts and data operations at Unilever from 16 June to 15 December 2026.",
        desc_groups: [
            {
                title: "System Rollouts",
                points: [
                    "User Support: Worked with administrators and staff from different professional backgrounds during system rollouts.",
                    "Training: Learned system workflows and guided users through key features and everyday tasks.",
                    "Field Support: Visited three district teams (DTs) to assist with rollout, answer questions, and support system adoption.",
                    "Issue Follow-up: Gathered user feedback and helped communicate questions or issues to the relevant team.",
                    "Adaptability: Adjusted explanations and support to suit each team's needs and level of technical experience."
                ],
            },
            {
                title: "Data Support",
                points: [
                    "Data Entry: Updated and maintained records using Excel and internal systems.",
                    "Data Checks: Reviewed information for missing or inconsistent entries and followed up when details needed clarification.",
                    "Organization: Used Excel to organize, sort, and filter data for team reference.",
                    "Team Support: Helped colleagues locate, update, and understand information in the system.",
                    "Coordination: Worked with team members to collect and verify information needed for accurate records."
                ]
            }
        ],
    },
    {
        id: 2,
        useAccent2: false,
        working_status: 0,
        position: "Junior Software Developer",
        company: "GPAS.IO.CO,Ltd",
        period: "Sep 2024 - Feb 2026",
        duration: "1 year 5 months",
        desc: "Worked for 1 year and 5 months at GPAS.IO.CO,Ltd",
        desc_points: [
            "Frontend: Developed responsive UI using Blade, HTML, JavaScript, and Bootstrap.",
            "Backend: Built server-side logic and database schemas with Laravel and MySQL.",
            "APIs: Designed and integrated RESTful APIs for system connectivity.",
            "Marketing: Managed Mautic automation for email marketing campaigns.",
            "Teamwork: Collaborated in Agile cycles to ship features and fix bugs.",
            "Internationalization: Implemented multi-language switching and localization features."
        ]
    },
    {
        id: 3,
        useAccent2: true,
        working_status: 0,
        position: "Interned Web Developer",
        company: "Code Clans",
        period: "Nov 2023 - Mar 2024",
        duration: "5 months",
        desc: "Interned for 5 months at Code Clans",
        desc_points: [
            "Frontend: Developed responsive, mobile-first interfaces using Bootstrap and jQuery.",
            "Backend: Built dynamic web features and managed databases with PHP and MySQL.",
            "CMS: Customized and maintained WordPress, Joomla and Ecwid sites, including theme and plugin adjustments."
        ]
    },
];

// IDs of the expanded experience cards
const expandedIds = ref(new Set());

const toggleExpand = (id, event) => {
    if (expandedIds.value.has(id)) {
        expandedIds.value.delete(id);
        // "Show Less": scroll back to the top of this card if it is above the viewport
        scrollBackTo(event?.currentTarget?.closest('[data-exp-card]'));
    } else {
        expandedIds.value.add(id);
    }
};

// ── Education ───────────────────────────────────────────────
const educationHistory = [
    {
        id: 1, useAccent2: false,
        position: "Bachelor Degree of Computer Science", company: "Royal University of Phnom Penh (RUPP)", period: "2020 - 2024",
        desc: `
        I graduated as a Bachelor Degree at Royal University of Phnom Penh (RUPP) in 2024.
        My major skill was Computer Science and Engineering. 
        I was a Generation 24. 
        There were subjects in those skills such as Web Application, Management of Information System (MIS),
        Project Management, Programmings, Database, Softskills and etc.
        I involved in group assignment that I was an active members, and I was sometimes also a lead of project.
        `,
    },
    {
        id: 2, useAccent2: true,
        position: "Basic Web and PHP + Laravel Course", company: "Instinct Institute", period: "2023 - 2024",
        desc: `
        A focused short course where I moved from basic web tools to full-stack logic. 
        I mastered PHP and MySQL for database management, built complete CRUD applications, and 
        learned to structure clean, professional code using the Laravel MVC framework.
        `,
    },
    {
        id: 3, useAccent2: false,
        position: "General English Programme (GEP)", company: "Australian Centre of Education (ACE)", period: "2020 - 2023",
        desc: `
        Completed the full programme in 2023, focusing on the four core language pillars: advanced reading, academic writing, and confident speaking and listening. These three years helped me build the fluency needed to navigate international environments and handle complex documentation comfortably.
        `,
    },
    {
        id: 4, useAccent2: true,
        position: "Dart + Flutter Course", company: "Engineering of Technology and Electronic Center (ETEC)", period: "2022 - 2023",
        desc: `A deep dive into the world of mobile apps. I learned how to use Dart and Flutter to build smooth, cross-platform applications for both iOS and Android, focusing on state management, custom UI widgets, and connecting apps to real-time data via APIs.`,
    },
    {
        id: 5, useAccent2: false,
        position: "C/C++ & Java Course", company: "Engineering of Technology and Electronic Center (ETEC)", period: "2020 - 2022",
        desc: `This is where I built my core logic. I started with C and C++ to understand low-level programming and memory management, then moved into Java to master Object-Oriented Programming (OOP) and complex system architecture.`,
    },
];

// ── Additional Skills ───────────────────────────────────────
const additionalSkills = [
    {
        id: 1, useAccent2: false,
        position: "Digital Sales Assistant", company: "A Small Business", period: "2024 - 2026",
        desc: "Supported a small relative's retail business by handling online product presentation rather than direct sales. Responsibilities focused on taking clear, appealing product photos of store inventory—including solar fans, solar lights/lamps, and electronic mosquito killer lights—to showcase features accurately for online customers.",
    },
    {
        id: 2, useAccent2: true,
        position: "Small Content Creator", company: "Independent Content Creator", period: "2022 - 2026 (Present)",
        desc: "Create and share educational content on YouTube dedicated to language learning, with a primary focus on teaching the Lao language. Manage the channel independently, translating personal knowledge into clear, accessible video lessons for viewers looking to learn a new language.",
    },
];

// ── Tech Stack ──────────────────────────────────────────────
// Every name here gets its logo from src/data/techIcons.js (names with no logo show the group's icon).
const frontends = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Vue.js', 'Vite', 'React.js', 'Next.js', 'Nuxt.js', 'jQuery', 'Tailwind CSS', 'Bootstrap'];
const backends = ['PHP', 'SQL', 'Python', 'Laravel', 'Node.js', 'Express.js'];
const mobiles = ['Dart', 'Flutter'];
const programmings = ['C', 'C++', 'Java', 'C#', 'Python'];
const databaseOrms = ['MySQL', 'PostgreSQL', 'MongoDB', 'NeonDB', 'Prisma ORM'];
const apiSecurities = ['REST APIs', 'Postman', 'JWT'];
const cmsMartketingtechs = ['WordPress', 'Mautic', 'TelegramBot'];
const devopsDeployments = ['Git', 'GitHub', 'GitLab', 'Netlify', 'Vercel', 'Render'];
const developmenttools = ['VS Code', 'WAMP', 'Ngrok', 'Navicat'];
const designs = ['Figma', 'Photoshop', 'Canva', 'Responsive Design'];
const productivities = [
    'Microsoft Office', 'Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint',
    'Google Workspace', 'Google Docs', 'Google Sheets', 'Google Slides',
    'Notion', 'Basic Computer Fundamentals',
];
const aiAssistants = ['Claude', 'Gemini', 'ChatGPT', 'Copilot'];

const techStack = [
    { id: 1, title: "Front-end", icon: CodeBracketIcon, useAccent2: false, stack: frontends },
    { id: 2, title: "Back-end", icon: ServerIcon, useAccent2: true, stack: backends },
    { id: 3, title: "Mobile", icon: DevicePhoneMobileIcon, useAccent2: false, stack: mobiles },
    { id: 4, title: "Programming Languages", icon: CpuChipIcon, useAccent2: true, stack: programmings },
    { id: 5, title: "Databases & ORM", icon: CircleStackIcon, useAccent2: false, stack: databaseOrms },
    { id: 6, title: "APIs & Security", icon: LockClosedIcon, useAccent2: true, stack: apiSecurities },
    { id: 7, title: "CMS & Marketing Tech", icon: MegaphoneIcon, useAccent2: false, stack: cmsMartketingtechs },
    { id: 8, title: "DevOps & Deployment", icon: CloudArrowUpIcon, useAccent2: true, stack: devopsDeployments },
    { id: 9, title: "Development Tools", icon: WrenchScrewdriverIcon, useAccent2: false, stack: developmenttools },
    { id: 10, title: "Designs", icon: SwatchIcon, useAccent2: true, stack: designs },
    { id: 11, title: "Productivities", icon: ClipboardDocumentIcon, useAccent2: false, stack: productivities },
    { id: 12, title: "LLMs & AI Assistants", icon: SparklesIcon, useAccent2: true, stack: aiAssistants },
];
</script>

<style scoped>
.timeline-list {
    position: relative;
    isolation: isolate;
}

.timeline-list::before {
    position: absolute;
    z-index: 0;
    top: 0.5rem;
    bottom: 0.5rem;
    left: 7px;
    width: 2px;
    border-radius: 9999px;
    background: var(--accent-border);
    content: "";
}

.timeline-item {
    position: relative;
    z-index: 1;
    padding-left: 2rem;
}

.timeline-node {
    position: absolute;
    top: 0;
    left: 0;
    width: 1rem;
    height: 1rem;
}
</style>
