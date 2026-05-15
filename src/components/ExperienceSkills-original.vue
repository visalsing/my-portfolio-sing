<template>
    <section class="relative py-20 overflow-hidden" id="skills">
        <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
                    <span class="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                        {{ t('skills') }}
                    </span> & {{ t('experiences') }}
                </h2>
                <p class="text-blue-200 text-lg max-w-2xl mx-auto">
                    {{ t('skill_subtitle') }}
                </p>
            </div>

            <!-- Stage 1 -->
            <div class="grid lg:grid-cols-2 gap-12 lg-:gap-16">
                <div data-aos="fade-right">
                    <h3 class="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <CodeBracketIcon class="w-8 h-8 text-cyan-400" />
                        {{ t('technical_skills') }}
                    </h3>
                    <div class="space-y-6">
                        <div v-for="skill in skills" :key="skill.id" class="group">
                            <div class="flex items-center justify-between mb-3">
                                <span class="text-blue-200 font-semibold flex items-center gap-2">
                                    <component :is="skill.icon" class="w-5 h-5" :class="skill.iconColor"></component>
                                    {{ skill.title }}
                                </span>
                                <span :class="skill.percentageColor">
                                    {{ skill.percentage }} %
                                </span>
                            </div>
                            <div class="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div class="h-full rounded-full transition-all duration-1000 group-hover:scale-105"
                                    :class="skill.gradient" :style="{ width: skill.percentage + '%' }"></div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="mt-12">
                        <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Squares2X2Icon class="w-6 h;-6 text-cyan-400" />
                            Tech Stack
                        </h4>
                        <div class="flex flex-wrap gap-3">
                            <span v-for="tech in techStack" :key="tech" class="px-4 py-2 bg-linear-to-r from-blue-500/20
                            border border-blue-400/30 rounded-full text-blue-200 text-sm 
                            font-medium hover:scale-105 transition-transform duration-300">
                                {{ tech }}
                            </span>
                        </div>
                    </div> -->
                    <div class="mt-12">
                        <div data-aos="fade-right">
                            <h3 class="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                <LightBulbIcon class="w-8 h-8 text-cyan-400" />
                                {{ t('soft_skills') }}
                            </h3>
                            <div class="grid grid-cols-2 sm:grid-cols-3 gap-6">
                                <div v-for="skill in softSkills" :key="skill.id"
                                    class="flex flex-col items-center group">
                                    <div class="relative w-24 h-24 mb-4">
                                        <svg class="w-full h-full transform -rotate-90">
                                            <circle cx="48" cy="48" r="40" stroke="currentColor" stroke-width="6"
                                                fill="transparent" class="text-gray-700" />
                                            <circle cx="48" cy="48" r="40" stroke="currentColor" stroke-width="6"
                                                fill="transparent" :stroke-dasharray="2 * Math.PI * 40"
                                                :stroke-dashoffset="2 * Math.PI * 40 * (1 - skill.percentage / 100)"
                                                stroke-linecap="round"
                                                class="transition-all duration-1000 group-hover:brightness-125"
                                                :class="skill.textColor" />
                                        </svg>
                                        <div class="absolute inset-0 flex flex-col items-center justify-center">
                                            <span class="text-white font-bold text-lg">{{ skill.percentage }}%</span>
                                        </div>
                                    </div>
                                    <span class="text-blue-200 font-medium text-center text-sm">{{ skill.title }}</span>
                                </div>
                            </div>
                        </div>

                        <div data-aos="fade-left">
                        </div>
                    </div>
                </div>
                <div data-aos="fade-right">
                    <h3 class="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <LanguageIcon class="w-8 h-8 text-cyan-400" />
                        {{ t('linguistic_skills') }}
                    </h3>
                    <div class="space-y-6">
                        <div v-for="language in languages" :key="language.id" class="group">
                            <div class="flex items-center justify-between mb-3">
                                <span class="text-blue-200 font-semibold flex items-center gap-2">
                                    <!-- <img :src="language.image" :alt="language.title" class="w-full"> -->
                                    <img :src="language.flag" :alt="language.title" class="w-full h-3 object-cover">
                                    {{ language.title }}
                                </span>
                                <span :class="language.percentageColor">
                                    {{ language.percentage }} %
                                </span>
                            </div>
                            <div class="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div class="h-full rounded-full transition-all duration-1000 group-hover:scale-105"
                                    :class="language.gradient" :style="{ width: language.percentage + '%' }"></div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-12">
                        <h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <SparklesIcon class="w-8 h-8 text-cyan-400" />
                            {{ t('hobbies_interests') }}
                        </h3>
                        <div class="flex flex-col gap-3">
                            <span v-for="hobbyInterest in hobbiesInterests" :key="hobbyInterest.id" :class="[
                                'w-full px-5 py-4 border-l-4 font-bold hover:translate-x-1 transition-all duration-300 text-lg mt-2',
                                hobbyInterest.border,
                                hobbyInterest.hover,
                                hobbyInterest.backgroundColor,
                                hobbyInterest.textColor
                            ]">
                                {{ hobbyInterest.hobby }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Stage 2 -->
            <div class="grid lg:grid-cols-2 gap-12 lg-:gap-16 mt-15">
                <!-- <div data-aos="fade-right">
                    <h3 class="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <Squares2X2Icon class="w-8 h-8 text-cyan-400" />
                        Tech Stack
                    </h3>
                    <div class="">
                        <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Squares2X2Icon class="w-6 h;-6 text-cyan-400" />
                            Front-end
                        </h4>
                        <div class="flex flex-wrap gap-3">
                            <span v-for="frontend in frontends" :key="frontend" class="px-4 py-2 bg-linear-to-r from-blue-500/20
                            border border-blue-400/30 rounded-full text-blue-200 text-sm 
                            font-medium hover:scale-105 transition-transform duration-300">
                                {{ frontend }}
                            </span>
                        </div>
                    </div>
                    <div class="mt-4">
                        <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Squares2X2Icon class="w-6 h;-6 text-blue-400" />
                            Back-end
                        </h4>
                        <div class="flex flex-wrap gap-3">
                            <span v-for="backend in backends" :key="backend" class="px-4 py-2 bg-linear-to-r from-blue-500/20
                            border border-blue-400/30 rounded-full text-blue-200 text-sm 
                            font-medium hover:scale-105 transition-transform duration-300">
                                {{ backend }}
                            </span>
                        </div>
                    </div>
                    <div class="mt-4">
                        <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Squares2X2Icon class="w-6 h;-6 text-blue-400" />
                            Mobile
                        </h4>
                        <div class="flex flex-wrap gap-3">
                            <span v-for="mobile in mobiles" :key="mobile" class="px-4 py-2 bg-linear-to-r from-blue-500/20
                            border border-blue-400/30 rounded-full text-blue-200 text-sm 
                            font-medium hover:scale-105 transition-transform duration-300">
                                {{ mobile }}
                            </span>
                        </div>
                    </div>
                    <div class="mt-4">
                        <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Squares2X2Icon class="w-6 h;-6 text-blue-400" />
                            Mobile
                        </h4>
                        <div class="flex flex-wrap gap-3">
                            <span v-for="programming in programmings" :key="programming" class="px-4 py-2 bg-linear-to-r from-blue-500/20
                            border border-blue-400/30 rounded-full text-blue-200 text-sm 
                            font-medium hover:scale-105 transition-transform duration-300">
                                {{ programming }}
                            </span>
                        </div>
                    </div>
                    <div class="mt-4">
                        <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Squares2X2Icon class="w-6 h;-6 text-blue-400" />
                            Databases & ORM
                        </h4>
                        <div class="flex flex-wrap gap-3">
                            <span v-for="databaseOrm in databaseOrms" :key="databaseOrm" class="px-4 py-2 bg-linear-to-r from-blue-500/20
                            border border-blue-400/30 rounded-full text-blue-200 text-sm 
                            font-medium hover:scale-105 transition-transform duration-300">
                                {{ databaseOrm }}
                            </span>
                        </div>
                    </div>
                    <div class="mt-4">
                        <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Squares2X2Icon class="w-6 h;-6 text-blue-400" />
                            APIs & Security
                        </h4>
                        <div class="flex flex-wrap gap-3">
                            <span v-for="apiSecurity in apiSecurities" :key="apiSecurity" class="px-4 py-2 bg-linear-to-r from-blue-500/20
                            border border-blue-400/30 rounded-full text-blue-200 text-sm 
                            font-medium hover:scale-105 transition-transform duration-300">
                                {{ apiSecurity }}
                            </span>
                        </div>
                    </div>
                    <div class="mt-4">
                        <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Squares2X2Icon class="w-6 h;-6 text-blue-400" />
                            CMS & Marketing Tech
                        </h4>
                        <div class="flex flex-wrap gap-3">
                            <span v-for="cmsMartketingtech in cmsMartketingtechs" :key="cmsMartketingtech" class="px-4 py-2 bg-linear-to-r from-blue-500/20
                            border border-blue-400/30 rounded-full text-blue-200 text-sm 
                            font-medium hover:scale-105 transition-transform duration-300">
                                {{ cmsMartketingtech }}
                            </span>
                        </div>
                    </div>
                    <div class="mt-4">
                        <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Squares2X2Icon class="w-6 h;-6 text-blue-400" />
                            DevOps & Deployment
                        </h4>
                        <div class="flex flex-wrap gap-3">
                            <span v-for="devopsDeployment in devopsDeployments" :key="devopsDeployment" class="px-4 py-2 bg-linear-to-r from-blue-500/20
                            border border-blue-400/30 rounded-full text-blue-200 text-sm 
                            font-medium hover:scale-105 transition-transform duration-300">
                                {{ devopsDeployment }}
                            </span>
                        </div>
                    </div>
                    <div class="mt-4">
                        <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Squares2X2Icon class="w-6 h;-6 text-blue-400" />
                            Development Tools
                        </h4>
                        <div class="flex flex-wrap gap-3">
                            <span v-for="developmenttool in developmenttools" :key="developmenttool" class="px-4 py-2 bg-linear-to-r from-blue-500/20
                            border border-blue-400/30 rounded-full text-blue-200 text-sm 
                            font-medium hover:scale-105 transition-transform duration-300">
                                {{ developmenttool }}
                            </span>
                        </div>
                    </div>
                    <div class="mt-4">
                        <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Squares2X2Icon class="w-6 h;-6 text-blue-400" />
                            Designs
                        </h4>
                        <div class="flex flex-wrap gap-3">
                            <span v-for="design in designs" :key="design" class="px-4 py-2 bg-linear-to-r from-blue-500/20
                            border border-blue-400/30 rounded-full text-blue-200 text-sm 
                            font-medium hover:scale-105 transition-transform duration-300">
                                {{ design }}
                            </span>
                        </div>
                    </div>
                    <div class="mt-4">
                        <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Squares2X2Icon class="w-6 h;-6 text-blue-400" />
                            Productivities
                        </h4>
                        <div class="flex flex-wrap gap-3">
                            <span v-for="productivity in productivities" :key="productivity" class="px-4 py-2 bg-linear-to-r from-blue-500/20
                            border border-blue-400/30 rounded-full text-blue-200 text-sm 
                            font-medium hover:scale-105 transition-transform duration-300">
                                {{ productivity }}
                            </span>
                        </div>
                    </div>
                </div> -->
                <!-- <div data-aos="fade-right">
                    <h3 class="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <Squares2X2Icon class="w-8 h-8 text-cyan-400" />
                        Tech Stack
                    </h3>

                    <div class="space-y-4">
                        <div>
                            <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Squares2X2Icon class="w-6 h-6 text-cyan-400" />
                                Front-end
                            </h4>
                            <div class="flex flex-wrap gap-3">
                                <span v-for="frontend in frontends" :key="frontend"
                                    class="px-4 py-2 bg-linear-to-r from-blue-500/20 border border-blue-400/30 rounded-full text-blue-200 text-sm font-medium hover:scale-105 transition-all">
                                    {{ frontend }}
                                </span>
                            </div>
                        </div>

                        <div>
                            <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Squares2X2Icon class="w-6 h-6 text-blue-400" />
                                Back-end
                            </h4>
                            <div class="flex flex-wrap gap-3">
                                <span v-for="backend in backends" :key="backend"
                                    class="px-4 py-2 bg-linear-to-r from-blue-500/20 border border-blue-400/30 rounded-full text-blue-200 text-sm font-medium hover:scale-105 transition-all">
                                    {{ backend }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <transition name="fade">
                        <div v-if="showMore" class="space-y-4">
                            <div class="mt-4">
                                <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Squares2X2Icon class="w-6 h;-6 text-blue-400" />
                                    Mobile
                                </h4>
                                <div class="flex flex-wrap gap-3">
                                    <span v-for="mobile in mobiles" :key="mobile" class="px-4 py-2 bg-linear-to-r from-blue-500/20
                            border border-blue-400/30 rounded-full text-blue-200 text-sm 
                            font-medium hover:scale-105 transition-transform duration-300">
                                        {{ mobile }}
                                    </span>
                                </div>
                            </div>
                            <div class="mt-4">
                                <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Squares2X2Icon class="w-6 h;-6 text-blue-400" />
                                    Programmings
                                </h4>
                                <div class="flex flex-wrap gap-3">
                                    <span v-for="programming in programmings" :key="programming" class="px-4 py-2 bg-linear-to-r from-blue-500/20
                            border border-blue-400/30 rounded-full text-blue-200 text-sm 
                            font-medium hover:scale-105 transition-transform duration-300">
                                        {{ programming }}
                                    </span>
                                </div>
                            </div>
                            <div class="mt-4">
                                <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Squares2X2Icon class="w-6 h;-6 text-blue-400" />
                                    Databases & ORM
                                </h4>
                                <div class="flex flex-wrap gap-3">
                                    <span v-for="databaseOrm in databaseOrms" :key="databaseOrm" class="px-4 py-2 bg-linear-to-r from-blue-500/20
                            border border-blue-400/30 rounded-full text-blue-200 text-sm 
                            font-medium hover:scale-105 transition-transform duration-300">
                                        {{ databaseOrm }}
                                    </span>
                                </div>
                            </div>
                            <div class="mt-4">
                                <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Squares2X2Icon class="w-6 h;-6 text-blue-400" />
                                    APIs & Security
                                </h4>
                                <div class="flex flex-wrap gap-3">
                                    <span v-for="apiSecurity in apiSecurities" :key="apiSecurity" class="px-4 py-2 bg-linear-to-r from-blue-500/20
                            border border-blue-400/30 rounded-full text-blue-200 text-sm 
                            font-medium hover:scale-105 transition-transform duration-300">
                                        {{ apiSecurity }}
                                    </span>
                                </div>
                            </div>
                            <div class="mt-4">
                                <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Squares2X2Icon class="w-6 h;-6 text-blue-400" />
                                    CMS & Marketing Tech
                                </h4>
                                <div class="flex flex-wrap gap-3">
                                    <span v-for="cmsMartketingtech in cmsMartketingtechs" :key="cmsMartketingtech"
                                        class="px-4 py-2 bg-linear-to-r from-blue-500/20
                            border border-blue-400/30 rounded-full text-blue-200 text-sm 
                            font-medium hover:scale-105 transition-transform duration-300">
                                        {{ cmsMartketingtech }}
                                    </span>
                                </div>
                            </div>
                            <div class="mt-4">
                                <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Squares2X2Icon class="w-6 h;-6 text-blue-400" />
                                    DevOps & Deployment
                                </h4>
                                <div class="flex flex-wrap gap-3">
                                    <span v-for="devopsDeployment in devopsDeployments" :key="devopsDeployment" class="px-4 py-2 bg-linear-to-r from-blue-500/20
                            border border-blue-400/30 rounded-full text-blue-200 text-sm 
                            font-medium hover:scale-105 transition-transform duration-300">
                                        {{ devopsDeployment }}
                                    </span>
                                </div>
                            </div>
                            <div class="mt-4">
                                <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Squares2X2Icon class="w-6 h;-6 text-blue-400" />
                                    Development Tools
                                </h4>
                                <div class="flex flex-wrap gap-3">
                                    <span v-for="developmenttool in developmenttools" :key="developmenttool" class="px-4 py-2 bg-linear-to-r from-blue-500/20
                            border border-blue-400/30 rounded-full text-blue-200 text-sm 
                            font-medium hover:scale-105 transition-transform duration-300">
                                        {{ developmenttool }}
                                    </span>
                                </div>
                            </div>
                            <div class="mt-4">
                                <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Squares2X2Icon class="w-6 h;-6 text-blue-400" />
                                    Designs
                                </h4>
                                <div class="flex flex-wrap gap-3">
                                    <span v-for="design in designs" :key="design" class="px-4 py-2 bg-linear-to-r from-blue-500/20
                            border border-blue-400/30 rounded-full text-blue-200 text-sm 
                            font-medium hover:scale-105 transition-transform duration-300">
                                        {{ design }}
                                    </span>
                                </div>
                            </div>
                            <div class="mt-4">
                                <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Squares2X2Icon class="w-6 h;-6 text-blue-400" />
                                    Productivities
                                </h4>
                                <div class="flex flex-wrap gap-3">
                                    <span v-for="productivity in productivities" :key="productivity" class="px-4 py-2 bg-linear-to-r from-blue-500/20
                            border border-blue-400/30 rounded-full text-blue-200 text-sm 
                            font-medium hover:scale-105 transition-transform duration-300">
                                        {{ productivity }}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </transition>
                    <div class="flex justify-center my-8">
                        <button @click="showMore = !showMore"
                            class="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-full font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2">
                            {{ showMore ? 'Show Less' : 'Click to see more!' }}
                            <component :is="showMore ? ChevronUpIcon : ChevronDownIcon" class="w-5 h-5" />
                        </button>
                    </div>
                </div> -->


                <div data-aos="fade-right">
                    <h3 class="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <Squares2X2Icon class="w-8 h-8 text-cyan-400" />
                        {{ t('tech_stack') }}
                    </h3>

                    <div class="space-y-4">
                        <!-- Always visible: first 2 groups -->
                        <div v-for="group in techStack.slice(0, 2)" :key="group.id">
                            <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <component :is="group.icon" class="w-6 h-6" :class="group.iconColor" />
                                {{ group.title }}
                            </h4>
                            <div class="flex flex-wrap gap-3">
                                <span v-for="item in group.stack" :key="item"
                                    class="px-4 py-2 bg-linear-to-r from-blue-500/20 border border-blue-400/30 rounded-full text-blue-200 text-sm font-medium hover:scale-105 transition-all">
                                    {{ item }}
                                </span>
                            </div>
                        </div>

                        <!-- Hidden by default: the rest -->
                        <transition name="fade">
                            <div v-if="showMore" class="space-y-4">
                                <div v-for="group in techStack.slice(2)" :key="group.id">
                                    <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                        <component :is="group.icon" class="w-6 h-6" :class="group.iconColor" />
                                        {{ group.title }}
                                    </h4>
                                    <div class="flex flex-wrap gap-3">
                                        <span v-for="item in group.stack" :key="item"
                                            class="px-4 py-2 bg-linear-to-r from-blue-500/20 border border-blue-400/30 rounded-full text-blue-200 text-sm font-medium hover:scale-105 transition-all">
                                            {{ item }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>

                    <div class="flex justify-center my-8">
                        <button @click="showMore = !showMore"
                            class="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-full font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2">
                            {{ showMore ? t('show_less') : t('click_to_see_more') }}
                            <component :is="showMore ? ChevronUpIcon : ChevronDownIcon" class="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <!-- Work Experience -->
                <div data-aos="fade-left">
                    <h3 class="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <BriefcaseIcon class="w-8 h-8 text-cyan-400" />
                        {{ t('work_experience') }}
                    </h3>
                    <div class="space-y-8">
                        <!-- <div v-for="exp in experiences" :key="exp.id" class="relative pl-8 border-l-2 group"
                            :class="exp.borderColor"> -->
                        <div v-for="exp in experiences" :key="exp.id" class="relative pl-8 border-l-2 group"
                            :class="exp.borderColor">
                            <!-- <div class="absolute -left-2 top-0 w-4 h-4 rounded-full group-hover:scale-150 transition-transform
                            duration-300" :class="exp.dotColor">
                            </div> -->
                            <div class="absolute -left-2 top-0 w-4 h-4 rounded-full
           group-hover:scale-150 transition-transform duration-300" :class="exp.dotColor">
                            </div>
                            <!-- <div class="bg-linear-to-br from-gray-800/50 to-blule-900/30 rounded-2xl p-6 border backdrop-blur-sm
                            group-hover:border-blue-400/40 transition-all duration-300" :class="exp.borderClass"> -->
                            <div class="bg-linear-to-br from-gray-800/50 to-blue-900/30
           rounded-2xl p-6 border backdrop-blur-sm
           group-hover:border-blue-400/40 transition-all duration-300" :class="exp.borderClass">

                                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                                    <h4 class="text-lg font-bold text-white">
                                        {{ exp.position }}
                                    </h4>
                                    <span :class="exp.dateColor" class="mt-1 sm:mt-0">
                                        {{ exp.period }}
                                    </span>
                                </div>
                                <p :class="exp.companyColor" class="font-medium mb-3">{{ exp.company }}</p>
                                <p class="text-blue-100 test-sm leading-relaxed">{{ exp.desc }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Stage 3 -->
            <div class="grid lg:grid-cols-2 gap-12 lg-:gap-16 mt-15">
                <div data-aos="fade-left">
                    <h3 class="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <AcademicCapIcon class="w-8 h-8 text-cyan-400" />
                        {{ t('education_history') }}
                    </h3>
                    <div class="space-y-8">
                        <!-- Always visible: first 3 -->
                        <div v-for="education in educationHistory.slice(0, 3)" :key="education.id"
                            class="relative pl-8 border-l-2 group" :class="education.borderColor">
                            <div class="absolute -left-2 top-0 w-4 h-4 rounded-full
                group-hover:scale-150 transition-transform duration-300" :class="education.dotColor">
                            </div>
                            <div class="bg-linear-to-br from-gray-800/50 to-blue-900/30
                rounded-2xl p-6 border backdrop-blur-sm
                group-hover:border-blue-400/40 transition-all duration-300" :class="education.borderClass">
                                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                                    <h4 class="text-lg font-bold text-white">{{ education.position }}</h4>
                                    <span :class="education.dateColor" class="mt-1 sm:mt-0">{{ education.period
                                        }}</span>
                                </div>
                                <p :class="education.companyColor" class="font-medium mb-3">{{ education.company }}</p>
                                <p class="text-blue-100 text-sm leading-relaxed">{{ education.desc }}</p>
                            </div>
                        </div>

                        <!-- Hidden by default: the rest -->
                        <transition name="fade">
                            <div v-if="showMoreEducation" class="space-y-8">
                                <div v-for="education in educationHistory.slice(3)" :key="education.id"
                                    class="relative pl-8 border-l-2 group" :class="education.borderColor">
                                    <div class="absolute -left-2 top-0 w-4 h-4 rounded-full
                        group-hover:scale-150 transition-transform duration-300" :class="education.dotColor">
                                    </div>
                                    <div class="bg-linear-to-br from-gray-800/50 to-blue-900/30
                        rounded-2xl p-6 border backdrop-blur-sm
                        group-hover:border-blue-400/40 transition-all duration-300" :class="education.borderClass">
                                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                                            <h4 class="text-lg font-bold text-white">{{ education.position }}</h4>
                                            <span :class="education.dateColor" class="mt-1 sm:mt-0">{{ education.period
                                                }}</span>
                                        </div>
                                        <p :class="education.companyColor" class="font-medium mb-3">{{ education.company
                                            }}</p>
                                        <p class="text-blue-100 text-sm leading-relaxed">{{ education.desc }}</p>
                                    </div>
                                </div>
                            </div>
                        </transition>

                        <div v-if="educationHistory.length > 3" class="flex justify-center my-8">
                            <button @click="showMoreEducation = !showMoreEducation"
                                class="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-full font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 cursor-pointer active:scale-95">
                                {{ showMoreEducation ? t('show_less') : t('click_to_see_more') }}
                                <component :is="showMoreEducation ? ChevronUpIcon : ChevronDownIcon" class="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <!-- <div v-if="educationHistory.length > 3" class="flex justify-center my-8">
                    <button @click="showMoreEducation = !showMoreEducation"
                        class="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-full font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 cursor-pointer active:scale-95">
                        {{ showMoreEducation ? 'Show Less' : 'Click to see more!' }}
                        <component :is="showMoreEducation ? ChevronUpIcon : ChevronDownIcon" class="w-5 h-5" />
                    </button>
                </div> -->
                <div data-aos="fade-left">
                    <h3 class="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <BriefcaseIcon class="w-8 h-8 text-cyan-400" />
                        {{ t('additional_skills') }}
                    </h3>
                    <div class="space-y-8">
                        <div v-for="additionalSkill in additionalSkills" :key="additionalSkill.id"
                            class="relative pl-8 border-l-2 group" :class="additionalSkill.borderColor">
                            <div class="absolute -left-2 top-0 w-4 h-4 rounded-full
           group-hover:scale-150 transition-transform duration-300" :class="additionalSkill.dotColor">
                            </div>
                            <div class="bg-linear-to-br from-gray-800/50 to-blue-900/30
           rounded-2xl p-6 border backdrop-blur-sm
           group-hover:border-blue-400/40 transition-all duration-300" :class="additionalSkill.borderClass">

                                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                                    <h4 class="text-lg font-bold text-white">
                                        {{ additionalSkill.position }}
                                    </h4>
                                    <span :class="additionalSkill.dateColor" class="mt-1 sm:mt-0">
                                        {{ additionalSkill.period }}
                                    </span>
                                </div>
                                <p :class="additionalSkill.companyColor" class="font-medium mb-3">{{
                                    additionalSkill.company }}</p>
                                <p class="text-blue-100 test-sm leading-relaxed">{{ additionalSkill.desc }}</p>
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
    BriefcaseIcon, 
    CloudIcon, 
    CodeBracketIcon, 
    DevicePhoneMobileIcon, 
    PaintBrushIcon, 
    ServerIcon, 
    Squares2X2Icon, 
    AcademicCapIcon, 
    ChevronUpIcon, 
    ChevronDownIcon, 
    MegaphoneIcon, 
    BoltIcon, 
    CircleStackIcon, 
    LanguageIcon, 
    LightBulbIcon, 
    SparklesIcon, 
    CpuChipIcon, 
    LockClosedIcon, 
    CloudArrowUpIcon, 
    WrenchScrewdriverIcon, 
    ClipboardDocumentIcon, 
    SwatchIcon} from '@heroicons/vue/16/solid';
import { ref, computed } from 'vue';
import { t } from './../stores/languages.js';

const showMore = ref(false); // Controls the visibility
const showMoreEducation = ref(false);

// For More than 3 items to show | Show More - Less
const visibleEducation = computed(() =>
    showMoreEducation.value ? educationHistory : educationHistory.slice(0, 3)
);



const skills = [
    {
        id: 1,
        title: "Front-end Development",
        icon: CodeBracketIcon,
        iconColor: 'text-blue-400',
        percentage: 84,
        percentageColor: "text-blue-400 text-sm",
        gradient: 'bg-linear-to-r from-blue-500 to-cyan-500'
    },
    {
        id: 2,
        title: "Back-end Development",
        icon: ServerIcon,
        iconColor: 'text-cyan-400',
        percentage: 79,
        percentageColor: "text-cyan-400 text-sm",
        gradient: 'bg-linear-to-r from-cyan-500 to-cyan-500'
    },
    {
        id: 3,
        title: "Web Design",
        icon: PaintBrushIcon,
        iconColor: 'text-blue-400',
        percentage: 68,
        percentageColor: "text-blue-400 text-sm",
        gradient: 'bg-linear-to-r from-blue-500 to-cyan-500'
    },
    {
        id: 4,
        title: "Mobile Developer",
        icon: DevicePhoneMobileIcon,
        iconColor: 'text-cyan-400',
        percentage: 50,
        percentageColor: "text-cyan-400 text-sm",
        gradient: 'bg-linear-to-r from-cyan-500 to-blue-500'
    },
    {
        id: 5,
        title: "DevOps & Cloud",
        icon: CloudIcon,
        iconColor: 'text-blue-400',
        percentage: 40,
        percentageColor: "text-blue-400 text-sm",
        gradient: 'bg-linear-to-r from-blue-500 to-cyan-500'
    },
    {
        id: 6,
        title: "Marketing & Automation",
        icon: MegaphoneIcon,
        iconColor: 'text-blue-400',
        percentage: 50,
        percentageColor: "text-blue-400 text-sm",
        gradient: 'bg-linear-to-r from-blue-500 to-cyan-500'
    },
    {
        id: 7,
        title: "API Architecture & Implementation",
        icon: CircleStackIcon,
        iconColor: 'text-blue-400',
        percentage: 70,
        percentageColor: "text-blue-400 text-sm",
        gradient: 'bg-linear-to-r from-blue-500 to-cyan-500'
    },
    //     {
    //     id: 3,
    //     title: "UX/UI Design",
    //     icon: PaintBrushIcon,
    //     iconColor: 'text-blue-400',
    //     percentage: 88,
    //     percentageColor: "text-blue-400 text-sm",
    //     gradient: 'bg-linear-to-r from-blue-500 to-cyan-500'
    // },
];

const softSkills = [
    {
        id: 1,
        title: "Resilience & Optimistic",
        percentage: 85,
        textColor: 'text-blue-400',
    },
    {
        id: 2,
        title: "Analytic Thinking",
        percentage: 79,
        textColor: 'text-cyan-400',
    },
    {
        id: 3,
        title: "Active Growth Mindset",
        percentage: 87,
        textColor: 'text-blue-400',
    },
    {
        id: 4,
        title: "Continuous Learning",
        percentage: 88,
        textColor: 'text-cyan-400',
    },
    {
        id: 5,
        title: "Adaptability",
        percentage: 92,
        textColor: 'text-blue-400',
    },
    {
        id: 6,
        title: "Problem-Solving & Debugging",
        percentage: 76,
        textColor: 'text-cyan-400',
    },
    {
        id: 7,
        title: "Self-Directed Learning",
        percentage: 75,
        textColor: 'text-blue-400',
    },
    {
        id: 8,
        title: "Teamwork & Communication",
        percentage: 60,
        textColor: 'text-cyan-400',
    },
];

const languages = [
    {
        id: 1,
        title: "Khmer",
        flag: './../../public/cambodia-flag.png',
        percentage: 92,
        percentageColor: "text-blue-400 text-sm",
        gradient: 'bg-linear-to-r from-blue-500 to-cyan-500'
    },
    {
        id: 2,
        title: "English",
        flag: './../../public/uk-flag.png',
        percentage: 87,
        percentageColor: "text-cyan-400 text-sm",
        gradient: 'bg-linear-to-r from-cyan-500 to-cyan-500'
    },
    {
        id: 3,
        title: "Chinese",
        flag: './../../public/china-flag.png',
        percentage: 22,
        percentageColor: "text-blue-400 text-sm",
        gradient: 'bg-linear-to-r from-blue-500 to-cyan-500'
    },
    {
        id: 4,
        title: "French",
        flag: './../../public/france-flag.png',
        percentage: 10,
        percentageColor: "text-cyan-400 text-sm",
        gradient: 'bg-linear-to-r from-cyan-500 to-blue-500'
    },
    {
        id: 5,
        title: "Lao",
        flag: './../../public/laos-flag.png',
        percentage: 63,
        percentageColor: "text-blue-400 text-sm",
        gradient: 'bg-linear-to-r from-blue-500 to-cyan-500'
    }
]

const experiences = [
    {
        id: 1,
        position: "Junior Software Developer",
        company: "GPAS.IO.CO,Ltd",
        period: "2024 - 2026",
        desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. ",
        borderColor: "border-blue-500/30",
        dotColor: "bg-blue-500",
        borderClass: "border-blue-500/20",
        dateColor: "text-blue-400 text-sm font-semibold",
        companyColor: "text-cyan-400"
    },
    {
        id: 2,
        position: "Interned Web Developer",
        company: "Code Clans",
        period: "2023 - 2024",
        desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. ",
        borderColor: "border-cyan-500/30",
        dotColor: "bg-cyan-500",
        borderClass: "border-cyan-500/20",
        dateColor: "text-cyan-400 text-sm font-semibold",
        companyColor: "text-blue-400"
    }
]

const educationHistory = [
    {
        id: 1,
        position: "Bachelor Degree of Computer Science",
        company: "Royal University of Phnom Penh (RUPP)",
        status: "Graduated",
        period: "2020 - 2024",
        desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. ",
        borderColor: "border-blue-500/30",
        dotColor: "bg-blue-500",
        borderClass: "border-blue-500/20",
        dateColor: "text-blue-400 text-sm font-semibold",
        companyColor: "text-cyan-400"
    },
    {
        id: 2,
        position: "Basic Web and PHP + Laravel Course",
        company: "Instinct Institute",
        status: "Graduated",
        period: "2023 - 2024",
        desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. ",
        borderColor: "border-cyan-500/30",
        dotColor: "bg-cyan-500",
        borderClass: "border-cyan-500/20",
        dateColor: "text-cyan-400 text-sm font-semibold",
        companyColor: "text-blue-400"
    },
    {
        id: 3,
        position: "General English Programme (GEP)",
        company: "Australian Centre of Education (ACE)",
        status: "Graduated",
        period: "2020 - 2023",
        desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. ",
        borderColor: "border-blue-500/30",
        dotColor: "bg-blue-500",
        borderClass: "border-blue-500/20",
        dateColor: "text-blue-400 text-sm font-semibold",
        companyColor: "text-cyan-400"
    },
    {
        id: 4,
        position: "Dart + Flutter Course",
        company: "Enginerring of Technology and Eelctronic Center (ETEC)",
        status: "Graduated",
        period: "2022 - 2023",
        desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. ",
        borderColor: "border-cyan-500/30",
        dotColor: "bg-cyan-500",
        borderClass: "border-cyan-500/20",
        dateColor: "text-cyan-400 text-sm font-semibold",
        companyColor: "text-blue-400"
    },
    {
        id: 5,
        position: "C/C++ & Java Course",
        company: "Enginerring of Technology and Eelctronic Center (ETEC)",
        status: "Graduated",
        period: "2020 - 2022",
        desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. ",
        borderColor: "border-blue-500/30",
        dotColor: "bg-blue-500",
        borderClass: "border-blue-500/20",
        dateColor: "text-blue-400 text-sm font-semibold",
        companyColor: "text-cyan-400"
    },
];

const additionalSkills = [
    {
        id: 1,
        position: "Digital Sales Assistant",
        company: "A Small Business",
        period: "2024 - 2026",
        desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. ",
        borderColor: "border-blue-500/30",
        dotColor: "bg-blue-500",
        borderClass: "border-blue-500/20",
        dateColor: "text-blue-400 text-sm font-semibold",
        companyColor: "text-cyan-400"
    },
    {
        id: 2,
        position: "Small Content Creator",
        company: "Independent Content Creator",
        period: "2022 - 2026 (Present)",
        desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. ",
        borderColor: "border-cyan-500/30",
        dotColor: "bg-cyan-500",
        borderClass: "border-cyan-500/20",
        dateColor: "text-cyan-400 text-sm font-semibold",
        companyColor: "text-blue-400"
    }
]

const hobbiesInterests = [
    {
        id: 1,
        hobby: "Reading Books",
        border: "border-blue-400",
        hover: " hover:bg-blue-400/30",
        backgroundColor: "bg-blue-400/20 ",
        textColor: "text-cyan-100 text-base"
    },
    {
        id: 2,
        hobby: "Learning Languages",
        border: "border-cyan-400",
        hover: " hover:bg-cyan-400/30",
        backgroundColor: "bg-cyan-400/20 ",
        textColor: "text-blue-100 text-base"
    },
    {
        id: 3,
        hobby: "Content Creation",
        border: "border-blue-400",
        hover: " hover:bg-blue-400/30",
        backgroundColor: "bg-blue-400/20 ",
        textColor: "text-cyan-100 text-base"
    },
    {
        id: 4,
        hobby: "Open Source Contributing",
        border: "border-cyan-400",
        hover: " hover:bg-cyan-400/30",
        backgroundColor: "bg-cyan-400/20 ",
        textColor: "text-blue-100 text-base"
    },
    {
        id: 5,
        hobby: "Project-Based Learning",
        border: "border-blue-400",
        hover: " hover:bg-blue-400/30",
        backgroundColor: "bg-blue-400/20 ",
        textColor: "text-cyan-100 text-base"
    },
    {
        id: 6,
        hobby: "Photography",
        border: "border-cyan-400",
        hover: " hover:bg-cyan-400/30",
        backgroundColor: "bg-cyan-400/20 ",
        textColor: "text-blue-100 text-base"
    },
];

const frontends = [
    'HTML', 'CSS', 'JavaScript', 'TypeScript', 'XML',
    'Vue.js', 'Vite', 'React.js', 'Next.js', 'Nuxt.js', 'jQuery',
    'Tailwind CSS', 'Bootstrap', 'Shadcn/ui', 'Material UI'
];
const backends = [
    'PHP', 'SQL', 'Java', 'C#', 'Python',
    'Laravel', 'Laravel Backpack',
    'Node.js', 'Express.js',
    'SpringBoot', 'ASP.NET',
    'Flask', 'Django'
];
const mobiles = [
    'Dart', 'Flutter'
];
const programmings = [
    'C', 'C++'
];
const databaseOrms = [
    'MySQL', 'PostgreSQL', 'MongoDB', 'NeonDB', 'SQLite', 'Prisma ORM', 'GraphQL'
];
const apiSecurities = [
    'REST APIs', 'Postman', 'JWT'
];
const cmsMartketingtechs = [
    'WordPress', 'Drupal', 'Joomla', 'Drupal', 'Ecwid',
    'Mautic', 'OneSignal', 'Tinode', 'TelegramBot'
];
const devopsDeployments = [
    'Git', 'GitHub', 'GitLab', 'Netlify', 'Vercel', 'Patheon',
    'Apache', 'Docker', 'DigitalOcean', 'AWS', 'Linux', 'Ubuntu'
];
const developmenttools = [
    'VS Code', 'PWA',
    'WAMPP', 'XAMPP', 'Laragon', 'Ngrok',
    'Navicat', 'phpMyAdmin'
];
const designs = [
    'Figma', 'Photoshop', 'Canva', 'CapCut', 'Responsive Design'
];
const productivities = [
    'Microsoft Office', 'Google Workspace', 'Basic Computer Fundamentals', 'LLMs/AI Assistances'
];

const techStack = [
    {
        id: 1,
        title: "Front-end",
        icon: CodeBracketIcon,
        iconColor: "text-blue-400",
        stack: frontends
    },
    {
        id: 2,
        title: "Back-end",
        icon: ServerIcon,
        iconColor: "text-cyan-400",
        stack: backends
    },
    {
        id: 3,
        title: "Mobile",
        icon: DevicePhoneMobileIcon,
        iconColor: "text-blue-400",
        stack: mobiles
    },
    {
        id: 4, 
        title: "Programming", 
        icon: CpuChipIcon, 
        iconColor: "text-cyan-400",
        stack: programmings
    },
    {
        id: 5, 
        title: "Databases & ORM", 
        icon: CircleStackIcon, 
        iconColor: "text-blue-400",
        stack: databaseOrms
    },
    {
        id: 6, 
        title: "APIs & Security", 
        icon: LockClosedIcon, 
        iconColor: "text-cyan-400",
        stack: apiSecurities
    },
    {
        id: 7, 
        title: "CMS & Marketing Tech", 
        icon: MegaphoneIcon, 
        iconColor: "text-blue-400",
        stack: cmsMartketingtechs
    },
    {
        id: 8, 
        title: "DevOps & Deployment", 
        icon: CloudArrowUpIcon, 
        iconColor: "text-cyan-400",
        stack: devopsDeployments
    },
    {
        id: 9, 
        title: "Development Tools", 
        icon: WrenchScrewdriverIcon,
        iconColor: "text-blue-400", 
        stack: developmenttools
    },
    {
        id: 10, 
        title: "Designs", 
        icon: SwatchIcon, 
        iconColor: "text-cyan-400",
        stack: designs
    },
    {
        id: 11, 
        title: "Productivities", 
        icon: ClipboardDocumentIcon, 
        iconColor: "text-blue-400",
        stack: productivities
    },
];
const visibleTechStack = computed(() =>
    showMore.value ? techStack : techStack.slice(0, 2)
);

</script>

<style setup>
/*
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
} */


.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>