<template>
    <section class="relative py-20 overflow-hidden mb-35" id="contacts">
        <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

            <nav class="flex mb-8" aria-label="Breadcrumb" data-aos="fade-down">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                    <li class="inline-flex items-center">
                        <router-link to="/"
                            class="group inline-flex items-center text-sm font-medium transition-all duration-300"
                            style="color: var(--surface-text-sub);">
                            <div class="mr-2">
                                <HomeIcon class="breadcrumb-home-icon w-4 h-4" />
                            </div>
                            <span class="breadcrumb-home-text">{{ t('home') }}</span>
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
                                :style="{ backgroundImage: 'var(--logo-gradient)' }">
                                {{ t('contact') }}
                            </span>
                        </div>
                    </li>
                </ol>
            </nav>


            <div class="text-center m-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold text-[var(--surface-text)] mb-4">
                    {{ t('get_in_touch1') }}<span class="text-transparent bg-clip-text"
                        :style="{ backgroundImage: 'var(--logo-gradient)' }">
                        {{ t('get_in_touch2') }}</span>
                </h2>
                <p class="text-lg" :style="{ color: 'var(--accent-text-muted)' }">
                    Let's work together on your next project
                </p>
            </div>

            <div class="grid lg:grid-cols-2 gap-12 mb-16">

                <div data-aos="fade-right">
                    <h3 class="text-2xl font-bold text-[var(--surface-text-sub)] mb-6">Contact Information</h3>
                    <div class="space-y-6">
                        <div v-for="info in contactInfo" :key="info.label" class="flex items-center gap-4">
                            <component :is="info.icon" class="w-6 h-6" :style="{ color: 'var(--accent-text)' }" />
                            <div>
                                <p class="text-[var(--surface-text-sub)] font-semibold">{{ info.label }}</p>
                                <p :style="{ color: 'var(--accent-text-muted)' }">{{ info.value }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="mt-8">
                        <h4 class="text-lg font-bold text-[var(--surface-text-sub)] mb-4">Follow Me</h4>
                        <div class="flex flex-wrap gap-4">

                            <a href="" class="p-3 rounded-xl transition-all"
                                :style="{ backgroundColor: 'var(--social-indigo-bg)', border: '1px solid var(--social-indigo-bd)', color: 'var(--social-indigo)' }"
                                @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--social-indigo-hover)'"
                                @mouseleave="e => e.currentTarget.style.backgroundColor = 'var(--social-indigo-bg)'">
                                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path
                                        d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8.05 9.77v-6.91H7.54v-2.86h2.51v-2.18c0-2.48 1.48-3.85 3.73-3.85 1.08 0 2.2.19 2.2.19v2.42h-1.24c-1.23 0-1.61.76-1.61 1.54v1.88h2.72l-.43 2.86h-2.29V21.8C18.56 20.87 22 16.84 22 12z" />
                                </svg>
                            </a>

                            <a href="https://www.linkedin.com/in/so-visalsing-227509312/"
                                class="p-3 rounded-xl transition-all" target="_blank"
                                :style="{ backgroundColor: 'var(--accent-bg)', border: '1px solid var(--accent-border)', color: 'var(--accent-text)' }"
                                @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--accent-bg-hover)'"
                                @mouseleave="e => e.currentTarget.style.backgroundColor = 'var(--accent-bg)'">
                                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path
                                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>

                            <a href="https://t.me/visalsing_88" class="p-3 rounded-xl transition-all" target="_blank"
                                :style="{ backgroundColor: 'var(--social-sky-bg)', border: '1px solid var(--social-sky-bd)', color: 'var(--social-sky)' }"
                                @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--social-sky-hover)'"
                                @mouseleave="e => e.currentTarget.style.backgroundColor = 'var(--social-sky-bg)'">
                                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path
                                        d="M11.944 0C5.346 0 0 5.346 0 11.944s5.346 11.944 11.944 11.944 11.944-5.346 11.944-11.944S18.542 0 11.944 0zm5.812 8.169l-2.023 9.537c-.15.674-.551.838-1.114.523l-3.085-2.273-1.488 1.432c-.165.165-.303.303-.621.303l.221-3.138 5.712-5.158c.248-.221-.054-.344-.383-.126l-7.058 4.444-3.039-.949c-.661-.207-.674-.661.138-.977l11.874-4.577c.551-.202 1.033.128.866.764z" />
                                </svg>
                            </a>

                            <a href="#" class="p-3 rounded-xl transition-all"
                                :style="{ backgroundColor: 'var(--social-slate-bg)', border: '1px solid var(--social-slate-bd)', color: 'var(--social-slate)' }"
                                @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--social-slate-hover)'"
                                @mouseleave="e => e.currentTarget.style.backgroundColor = 'var(--social-slate-bg)'">
                                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path
                                        d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                                </svg>
                            </a>

                            <a href="https://www.youtube.com/@sovisalsing7790" class="p-3 rounded-xl transition-all"
                                target="_blank"
                                :style="{ backgroundColor: 'var(--accent-border-2-soft)', border: '1px solid var(--accent-to-bg-hover)', color: 'var(--icon-accent-2)' }"
                                @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--accent-to-bg-hover)'"
                                @mouseleave="e => e.currentTarget.style.backgroundColor = 'var(--accent-border-2-soft)'">
                                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path
                                        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>

                            <a href="#" class="p-3 rounded-xl transition-all"
                                :style="{ backgroundColor: 'var(--social-teal-bg)', border: '1px solid var(--social-teal-bd)', color: 'var(--social-teal)' }"
                                @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--social-teal-hover)'"
                                @mouseleave="e => e.currentTarget.style.backgroundColor = 'var(--social-teal-bg)'">
                                <svg class="w-5 h-5 fill-current" viewBox="0 0 448 512">
                                    <path
                                        d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25V349.38A162.55 162.55 0 1 1 185 188.31V278.2a74.62 74.62 0 1 0 52.23 71.18V0l88 0a121.18 121.18 0 0 0 1.86 22.17h0A122.18 122.18 0 0 0 381 102.39a121.4 121.4 0 0 0 67 20.14Z" />
                                </svg>
                            </a>

                            <a href="#" class="p-3 rounded-xl transition-all"
                                :style="{ backgroundColor: 'var(--social-emerald-bg)', border: '1px solid var(--social-emerald-bd)', color: 'var(--social-emerald)' }"
                                @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--social-emerald-hover)'"
                                @mouseleave="e => e.currentTarget.style.backgroundColor = 'var(--social-emerald-bg)'">
                                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path
                                        d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.353 2.62 6.77 6.98 6.97 1.28.058 1.688.072 4.948.072s3.667-.014 4.947-.072c4.351-.2 6.77-2.62 6.97-6.98.058-1.28.072-1.688.072-4.948s-.014-3.667-.072-4.947c-.2-4.353-2.62-6.77-6.98-6.97C15.667.014 15.259 0 12 0z" />
                                    <path
                                        d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4.01 4.01 0 1 1 0-8.019A4.01 4.01 0 0 1 12 16zm7.846-10.405a1.441 1.441 0 1 1-2.883 0 1.441 1.441 0 0 1 2.883 0z" />
                                </svg>
                            </a>

                            <a href="https://github.com/visalsing" class="p-3 rounded-xl transition-all" target="_blank"
                                :style="{ backgroundColor: 'var(--social-zinc-bg)', border: '1px solid var(--social-zinc-bd)', color: 'var(--social-zinc)' }"
                                @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--social-zinc-hover)'"
                                @mouseleave="e => e.currentTarget.style.backgroundColor = 'var(--social-zinc-bg)'">
                                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path
                                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                </svg>
                            </a>

                            <a href="https://gitlab.com/visalsing" class="p-3 rounded-xl transition-all" target="_blank"
                                :style="{ backgroundColor: 'var(--social-gitlab-bg)', border: '1px solid var(--social-gitlab-bd)', color: 'var(--social-gitlab)' }"
                                @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--social-gitlab-hover)'"
                                @mouseleave="e => e.currentTarget.style.backgroundColor = 'var(--social-gitlab-bg)'">
                                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path
                                        d="M23.955 13.587l-1.342-4.135a.447.447 0 0 0-.158-.22.441.441 0 0 0-.518.02L12 16.202l-9.937-6.95a.443.443 0 0 0-.518-.02.448.448 0 0 0-.158.22L.045 13.587a.894.894 0 0 0 .321.992l11.13 7.822a.88.88 0 0 0 1.008 0l11.13-7.822a.893.893 0 0 0 .321-.992zM12 16.202L18.847 4.1a.443.443 0 0 0-.166-.583.435.435 0 0 0-.573.076L12 16.202zm0 0L5.892 3.593a.434.434 0 0 0-.573-.076.443.443 0 0 0-.166.583L12 16.202z" />
                                </svg>
                            </a>

                        </div>
                    </div>
                </div>

                <div data-aos="fade-left">
                    <form @submit.prevent="sendEmail" class="space-y-6">
                        <div class="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label
                                    class="text-[var(--surface-text-sub)] text-sm font-medium mb-2 block">Name</label>
                                <input v-model="formData.name" type="text" placeholder="Your name" required
                                    class="w-full bg-[var(--surface-card)] rounded-xl px-4 py-3 text-[var(--surface-text-sub)] transition-all outline-none"
                                    :style="{ border: '1px solid var(--section-border)' }"
                                    @focus="e => e.currentTarget.style.borderColor = 'var(--accent-text)'"
                                    @blur="e => e.currentTarget.style.borderColor = 'var(--section-border)'" />
                            </div>
                            <div>
                                <label
                                    class="text-[var(--surface-text-sub)] text-sm font-medium mb-2 block">Email</label>
                                <input v-model="formData.email" type="email" placeholder="your@email.com" required
                                    class="w-full bg-[var(--surface-card)] rounded-xl px-4 py-3 text-[var(--surface-text-sub)] transition-all outline-none"
                                    :style="{ border: '1px solid var(--section-border)' }"
                                    @focus="e => e.currentTarget.style.borderColor = 'var(--accent-text)'"
                                    @blur="e => e.currentTarget.style.borderColor = 'var(--section-border)'" />
                            </div>
                        </div>

                        <div>
                            <label class="text-[var(--surface-text-sub)] text-sm font-medium mb-2 block">Subject</label>
                            <input v-model="formData.subject" type="text" placeholder="What's this about?" required
                                class="w-full bg-[var(--surface-card)] rounded-xl px-4 py-3 text-[var(--surface-text-sub)] transition-all outline-none"
                                :style="{ border: '1px solid var(--section-border)' }"
                                @focus="e => e.currentTarget.style.borderColor = 'var(--accent-text)'"
                                @blur="e => e.currentTarget.style.borderColor = 'var(--section-border)'" />
                        </div>

                        <div>
                            <label class="text-[var(--surface-text-sub)] text-sm font-medium mb-2 block">Message</label>
                            <textarea v-model="formData.message" rows="5" placeholder="Tell me about your project..."
                                required
                                class="w-full bg-[var(--surface-card)] rounded-xl px-4 py-3 text-[var(--surface-text-sub)] transition-all outline-none resize-none"
                                :style="{ border: '1px solid var(--section-border)' }"
                                @focus="e => e.currentTarget.style.borderColor = 'var(--accent-text)'"
                                @blur="e => e.currentTarget.style.borderColor = 'var(--section-border)'"></textarea>
                        </div>

                        <button type="submit" :disabled="isSending"
                            class="w-full text-white font-semibold py-3 rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-50"
                            :style="{ background: 'var(--cta-gradient)' }"
                            @mouseenter="e => !isSending && (e.currentTarget.style.boxShadow = '0 10px 25px var(--accent-shadow)')"
                            @mouseleave="e => e.currentTarget.style.boxShadow = 'none'">
                            {{ isSending ? 'Sending...' : 'Send Message' }}
                        </button>
                    </form>
                </div>

            </div>

            <!-- Map -->
            <div class="w-full space-y-4" data-aos="fade-up">
                <div class="flex justify-end">
                    <button @click="toggleMapProvider"
                        class="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer text-[var(--surface-text-sub)] bg-[var(--surface-card)] hover:opacity-80"
                        :style="{ borderColor: 'var(--section-border)' }">
                        Active Map: {{ currentMapProvider === 'openstreetmap' ? 'OpenStreetMap' : 'Google Maps' }}
                    </button>
                </div>

                <div class="w-full h-96 rounded-2xl overflow-hidden shadow-xl"
                    :style="{ border: '1px solid var(--section-border)' }">

                    <iframe v-if="currentMapProvider === 'openstreetmap'"
                        src="https://www.openstreetmap.org/export/embed.html?bbox=104.8354,11.5173,105.0067,11.5955&layer=mapnik&marker=11.5564,104.9282"
                        class="w-full h-full border-0">
                    </iframe>

                    <iframe v-else
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d250151.16276883447!2d104.7253721257701!3d11.579654011430938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513dc76a6be3%3A0x9c010ee85ab525bb!2sPhnom%20Penh!5e0!3m2!1sen!2skh!4v1780732855651!5m2!1sen!2skh"
                        class="w-full h-full border-0" allowfullscreen="" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>

                <div class="flex items-center gap-2 px-2 text-sm font-medium"
                    :style="{ color: 'var(--surface-text-sub)' }">
                    <MapPinIcon class="w-4 h-4 flex-shrink-0" :style="{ color: 'var(--accent-text)' }" />
                    <span>Phnom Penh, Cambodia</span>
                </div>
            </div>

            <!-- Back Button -->
            <div class="text-center mt-16" data-aos="fade-up" data-aos-delay="400">
                <div class="inline-flex flex-col sm:flex-row gap-4 items-center">
                    <router-link :to="backPath"
                        class="px-8 py-4 rounded-xl text-white text-sm tracking-widest font-black transition-all duration-300 hover:scale-[1.03] border-2 border-white/10 flex items-center backdrop-blur-md shadow-lg"
                        :style="{ background: 'var(--cta-gradient)' }"
                        @mouseenter="e => e.currentTarget.style.boxShadow = '0 12px 35px var(--accent-shadow)'"
                        @mouseleave="e => e.currentTarget.style.boxShadow = 'none'">
                        <ArrowLeftCircleIcon class="w-5 h-5 mr-2" />
                        {{ t('click_to_return') }}
                    </router-link>
                </div>
            </div>

        </div>

        <!-- Email Result Modal -->
        <div v-if="modal.show"
            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all">
            <div class="bg-[var(--surface-card)] border rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl"
                :style="{ borderColor: 'var(--section-border)' }">

                <div v-if="modal.type === 'success'">
                    <div
                        class="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-[var(--surface-text)] mb-2">Message Sent!</h3>
                    <p class="text-sm mb-6" :style="{ color: 'var(--accent-text-muted)' }">
                        Thank you! Your email was sent successfully. I will get back to you shortly.
                    </p>
                </div>

                <div v-else>
                    <div
                        class="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-[var(--surface-text)] mb-2">Sending Failed</h3>
                    <p class="text-sm mb-6" :style="{ color: 'var(--accent-text-muted)' }">
                        Something went wrong while connecting to the email dispatch service. Please try again.
                    </p>
                </div>

                <button @click="closeModal"
                    class="w-full text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-200 cursor-pointer"
                    :style="{ background: 'var(--cta-gradient)' }">
                    Dismiss
                </button>
            </div>
        </div>
    </section>

    <!-- Telegram Chatbot Floating Button -->
    <div class="fixed bottom-6 right-6 z-50 font-sans max-w-[calc(100vw-2rem)] sm:max-w-none">
        <transition enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0 translate-y-4"
            enter-to-class="transform scale-100 opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="transform scale-100 opacity-100 translate-y-0"
            leave-to-class="transform scale-95 opacity-0 translate-y-4">

            <div v-if="isTelegramBoxOpen"
                class="absolute bottom-20 right-0 w-[calc(100vw-3rem)] xs:w-80 sm:w-92 max-w-[360px] sm:max-w-none rounded-2xl shadow-2xl overflow-hidden"
                :style="{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--section-border)' }">

                <div class="flex items-center justify-between px-4 py-3.5 text-white"
                    :style="{ background: 'var(--cta-gradient)' }">
                    <div class="flex items-center gap-3 min-w-0 flex-1">
                        <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            :style="{ backgroundColor: 'var(--accent-bg)', border: '1px solid var(--accent-border)' }">
                            <svg class="w-5 h-5 flex-shrink-0" :style="{ color: 'var(--accent-text)' }" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>

                        <div class="min-w-0 flex-1">
                            <h4 class="font-bold text-sm tracking-wide truncate">Spider15 Support Chatbot</h4>
                            <p class="text-[11px] font-medium opacity-80 truncate">Typically replies instantly</p>
                        </div>
                    </div>

                    <div class="flex items-center gap-1 flex-shrink-0 ml-2">
                        <button @click="isTelegramBoxOpen = false"
                            class="p-1 rounded-lg transition-colors cursor-pointer opacity-80 hover:opacity-100 hover:bg-white/20">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="p-4 relative min-h-[180px] flex flex-col justify-between"
                    :style="{ backgroundColor: 'var(--surface-bg)', backgroundImage: 'radial-gradient(var(--section-border) 1px, transparent 0)', backgroundSize: '16px 16px' }">

                    <div class="p-3.5 rounded-2xl rounded-tl-sm shadow-md text-sm leading-relaxed w-full xs:max-w-[88%] transform origin-top-left animate-fade-in-up"
                        :style="{ backgroundColor: 'var(--surface-card)', color: 'var(--surface-text-sub)', border: '1px solid var(--section-border)' }">
                        <p class="font-medium">Hello! Welcome to our Spider15 Support Chatbot. How can we assist you?
                            Let's start message now!</p>
                    </div>

                    <button @click="openTelegram"
                        class="mt-4 w-full text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5 group cursor-pointer"
                        :style="{ background: 'var(--cta-gradient)' }"
                        @mouseenter="e => e.currentTarget.style.boxShadow = '0 10px 25px var(--accent-shadow)'"
                        @mouseleave="e => e.currentTarget.style.boxShadow = ''">
                        <svg class="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform flex-shrink-0"
                            viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M12 0C5.346 0 0 5.346 0 11.944s5.346 11.944 11.944 11.944 11.944-5.346 11.944-11.944S18.542 0 11.944 0zm5.812 8.169l-2.023 9.537c-.15.674-.551.838-1.114.523l-3.085-2.273-1.488 1.432c-.165.165-.303.303-.621.303l.221-3.138 5.712-5.158c.248-.221-.054-.344-.383-.126l-7.058 4.444-3.039-.949c-.661-.207-.674-.661.138-.977l11.874-4.577c.551-.202 1.033.128.866.764z" />
                        </svg>
                        <span>Start Message</span>
                    </button>
                </div>
            </div>
        </transition>

        <button @click="isTelegramBoxOpen = !isTelegramBoxOpen"
            class="w-14 h-14 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer relative group ml-auto"
            :style="{ background: 'var(--cta-gradient)', border: '1px solid var(--accent-border)' }">
            <span v-if="!isTelegramBoxOpen" class="absolute top-0 right-0 flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    :style="{ backgroundColor: 'var(--accent-text)' }"></span>
                <span class="relative inline-flex rounded-full h-3 w-3"
                    :style="{ backgroundColor: 'var(--accent-text)' }"></span>
            </span>

            <svg v-if="!isTelegramBoxOpen" class="w-6 h-6 transform group-hover:rotate-12 transition-transform"
                fill="currentColor" viewBox="0 0 24 24">
                <path
                    d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
            </svg>
            <svg v-else class="w-6 h-6 transform rotate-90 transition-transform duration-200" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import emailjs from '@emailjs/browser';
import { t } from './../../stores/languages';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/vue/16/solid';
import { HomeIcon, ArrowLeftCircleIcon } from '@heroicons/vue/24/outline';

const contactInfo = [
    { icon: EnvelopeIcon, label: 'Email', value: 'sovisalsing288@gmail.com' },
    { icon: PhoneIcon, label: 'Phone', value: '+855 (0) 96 252 1705' },
    { icon: MapPinIcon, label: 'Location', value: 'Phnom Penh, Cambodia' },
];

// --- Telegram Floating Widget ---
const isTelegramBoxOpen = ref(false);
const telegramDarkMode = ref(true); // used only for the manual moon/sun toggle in the widget header

// Detects dark mode based on YOUR site's exact theme class system:
// Dark themes:  theme-dark, theme-black, theme-abyss
// Light themes: theme-light, theme-white
// Device:       theme-device → reads color-scheme style on <html> set by your site
const isWebsiteDark = () => {
    const html = document.documentElement;
    const classes = html.classList;
    if (classes.contains('theme-light') || classes.contains('theme-white')) return false;
    if (classes.contains('theme-dark') || classes.contains('theme-black') || classes.contains('theme-abyss')) return true;
    const colorScheme = html.style.colorScheme;
    if (colorScheme === 'dark') return true;
    if (colorScheme === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

onMounted(() => {
    telegramDarkMode.value = isWebsiteDark();
    const observer = new MutationObserver(() => {
        telegramDarkMode.value = isWebsiteDark();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });
});

/**
 * Opens the Telegram bot in a centered popup window.
 *
 * WHY a popup instead of target="_blank":
 *   - target="_blank" on a t.me link triggers the browser's protocol handler,
 *     which shows the "Open Telegram Desktop?" dialog before the page even loads.
 *   - window.open() with explicit dimensions opens a real browser popup window
 *     (a proper mini-browser tab), which loads the Telegram Web page directly
 *     without triggering the desktop app dialog.
 *
 * WHY web.telegram.org instead of t.me:
 *   - t.me URLs are redirect pages that immediately fire the tg:// protocol,
 *     causing the "Open Telegram Desktop?" prompt regardless of how you open them.
 *   - web.telegram.org/k/#@username loads Telegram Web directly in the browser,
 *     completely bypassing the protocol handler and the desktop app dialog.
 */
const openTelegram = () => {
    isTelegramBoxOpen.value = false;

    const width = 650;
    const height = 900;
    const left = Math.round((window.screen.width / 2) - (width / 2));
    const top = Math.max(0, Math.round((window.screen.height / 2) - (height / 2)));

    // Append ?tgaddr so Telegram's page opens matching your site's current theme.
    // Telegram's t.me page respects the OS/browser dark mode preference automatically,
    // so we force it by temporarily setting the color-scheme meta tag before opening.
    const dark = isWebsiteDark();
    const meta = document.querySelector('meta[name="color-scheme"]') || document.createElement('meta');
    meta.setAttribute('name', 'color-scheme');
    meta.setAttribute('content', dark ? 'dark' : 'light');
    if (!document.querySelector('meta[name="color-scheme"]')) {
        document.head.appendChild(meta);
    }

    window.open(
        'https://t.me/visalsing_88',
        'TelegramBotPopup',
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
};

// --- Form States ---
// const isSending = ref(false);
// const formData = ref({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
// });

// --- Modal State ---
// const modal = ref({
//     show: false,
//     type: 'success'
// });

// --- Map Provider State ---
const currentMapProvider = ref('openstreetmap');

// const openModal = (type) => {
//     modal.value.type = type;
//     modal.value.show = true;
// };

// const closeModal = () => {
//     modal.value.show = false;
// };

const toggleMapProvider = () => {
    currentMapProvider.value = currentMapProvider.value === 'openstreetmap' ? 'google' : 'openstreetmap';
};

// --- Form States ---
const isSending = ref(false);
const formData = ref({
    name: '',
    email: '',
    subject: '',
    message: ''
});

// --- Modal State Management ---
const modal = ref({
    show: false,
    type: 'success' // can be 'success' or 'error'
});

const openModal = (type) => {
    modal.value.type = type;
    modal.value.show = true;
};

const closeModal = () => {
    modal.value.show = false;
};

const sendEmail = async () => {
    isSending.value = true;

    // EmailJS credentials setup 
    const SERVICE_ID = "service_0optqsf";
    const TEMPLATE_ID = "template_7nhyb1w";
    const PUBLIC_KEY = "Sv3WEfeCcuUwX3lsu";

    // Generate accurate timestamp context
    const currentDateTime = new Date().toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short'
    });

    let userLocation = "Unknown Location";

    // Fetch approximate network geographic position 
    try {
        const response = await fetch("https://ipapi.co/json/");
        if (response.ok) {
            const data = await response.json();
            userLocation = `${data.city || 'Unknown City'}, ${data.region || 'Unknown State'}, ${data.country_name || 'Unknown Country'}`;
        }
    } catch (error) {
        console.error("Location lookup failed, proceeding with fallback string:", error);
    }

    // Direct mapping keys targeted towards your layout layout variables in image_99f959.png
    const templateParams = {
        name: formData.value.name,
        subject: formData.value.subject,
        time: currentDateTime,
        message: `Sender Email: ${formData.value.email}\nLocation: ${userLocation}\n\nMessage:\n${formData.value.message}`,
        from_email: formData.value.email
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
        .then(() => {
            // Replaced ugly browser alert with modern custom modal trigger
            openModal('success');
            formData.value = { name: '', email: '', subject: '', message: '' };
        })
        .catch((err) => {
            console.error('Error:', err);
            // Error path fallback trigger
            openModal('error');
        })
        .finally(() => {
            isSending.value = false;
        });
};
</script>

<style scoped>
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(10px) scale(0.96);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.animate-fade-in-up {
    animation: fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Breadcrumb hover: text gradient */
.group:hover .breadcrumb-home-text {
    background: var(--logo-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 600;
}

/* Breadcrumb hover: icon gradient via mask */
.group:hover .breadcrumb-home-icon {
    background: var(--logo-gradient);
    -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>') no-repeat center;
    mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>') no-repeat center;
    -webkit-mask-size: contain;
    mask-size: contain;
    color: transparent;
}
</style>


// // 1. Go to EmailJS "Email Services" tab to find this
// const SERVICE_ID = "service_0optqsf";

// // 2. Click the "Settings" tab in your screenshot to find this
// const TEMPLATE_ID = "template_7nhyb1w";

// // 3. Go to "Account" -> "API Keys" to find this
// const PUBLIC_KEY = "Sv3WEfeCcuUwX3lsu";




<!-- const SERVICE_ID = "service_0optqsf";
    const TEMPLATE_ID = "template_7nhyb1w";
    const PUBLIC_KEY = "Sv3WEfeCcuUwX3lsu"; -->