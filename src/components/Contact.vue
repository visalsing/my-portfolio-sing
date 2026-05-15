<template>
    <section class="relative py-20 overflow-hidden" id="contacts">
        <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

            <!-- ── Heading ── -->
            <div class="text-center m-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
                    Get In
                    <span class="text-transparent bg-clip-text" :style="{ backgroundImage: 'var(--logo-gradient)' }">
                        Touch</span>
                </h2>
                <p class="text-lg" :style="{ color: 'var(--accent-text-muted)' }">
                    Let's work together on your next project
                </p>
            </div>

            <div class="grid lg:grid-cols-2 gap-12">

                <!-- ── Contact Info ── -->
                <div data-aos="fade-right">
                    <h3 class="text-2xl font-bold text-white mb-6">Contact Information</h3>
                    <div class="space-y-6">
                        <div v-for="info in contactInfo" :key="info.label" class="flex items-center gap-4">
                            <component :is="info.icon" class="w-6 h-6" :style="{ color: 'var(--accent-text)' }" />
                            <div>
                                <p class="text-white font-semibold">{{ info.label }}</p>
                                <p :style="{ color: 'var(--accent-text-muted)' }">{{ info.value }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- ── Social Links ── -->
                    <div class="mt-8">
                        <h4 class="text-lg font-bold text-white mb-4">Follow Me</h4>
                        <div class="flex flex-wrap gap-4">

                            <!-- Facebook — indigo (brand fixed) -->
                            <a href="#" class="p-3 rounded-xl transition-all"
                                :style="{ backgroundColor: 'var(--social-indigo-bg)', border: '1px solid var(--social-indigo-bd)', color: 'var(--social-indigo)' }"
                                @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--social-indigo-hover)'"
                                @mouseleave="e => e.currentTarget.style.backgroundColor = 'var(--social-indigo-bg)'">
                                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path
                                        d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8.05 9.77v-6.91H7.54v-2.86h2.51v-2.18c0-2.48 1.48-3.85 3.73-3.85 1.08 0 2.2.19 2.2.19v2.42h-1.24c-1.23 0-1.61.76-1.61 1.54v1.88h2.72l-.43 2.86h-2.29V21.8C18.56 20.87 22 16.84 22 12z" />
                                </svg>
                            </a>

                            <!-- LinkedIn — accent primary -->
                            <a href="#" class="p-3 rounded-xl transition-all"
                                :style="{ backgroundColor: 'var(--accent-bg)', border: '1px solid var(--accent-border)', color: 'var(--accent-text)' }"
                                @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--accent-bg-hover)'"
                                @mouseleave="e => e.currentTarget.style.backgroundColor = 'var(--accent-bg)'">
                                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path
                                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>

                            <!-- Telegram — sky (brand fixed) -->
                            <a href="#" class="p-3 rounded-xl transition-all"
                                :style="{ backgroundColor: 'var(--social-sky-bg)', border: '1px solid var(--social-sky-bd)', color: 'var(--social-sky)' }"
                                @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--social-sky-hover)'"
                                @mouseleave="e => e.currentTarget.style.backgroundColor = 'var(--social-sky-bg)'">
                                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path
                                        d="M11.944 0C5.346 0 0 5.346 0 11.944s5.346 11.944 11.944 11.944 11.944-5.346 11.944-11.944S18.542 0 11.944 0zm5.812 8.169l-2.023 9.537c-.15.674-.551.838-1.114.523l-3.085-2.273-1.488 1.432c-.165.165-.303.303-.621.303l.221-3.138 5.712-5.158c.248-.221-.054-.344-.383-.126l-7.058 4.444-3.039-.949c-.661-.207-.674-.661.138-.977l11.874-4.577c.551-.202 1.033.128.866.764z" />
                                </svg>
                            </a>

                            <!-- X / Twitter — slate (brand fixed) -->
                            <a href="#" class="p-3 rounded-xl transition-all"
                                :style="{ backgroundColor: 'var(--social-slate-bg)', border: '1px solid var(--social-slate-bd)', color: 'var(--social-slate)' }"
                                @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--social-slate-hover)'"
                                @mouseleave="e => e.currentTarget.style.backgroundColor = 'var(--social-slate-bg)'">
                                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path
                                        d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                                </svg>
                            </a>

                            <!-- YouTube — accent secondary -->
                            <a href="#" class="p-3 rounded-xl transition-all"
                                :style="{ backgroundColor: 'var(--accent-border-2-soft)', border: '1px solid var(--accent-to-bg-hover)', color: 'var(--icon-accent-2)' }"
                                @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--accent-to-bg-hover)'"
                                @mouseleave="e => e.currentTarget.style.backgroundColor = 'var(--accent-border-2-soft)'">
                                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path
                                        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>

                            <!-- TikTok — teal (brand fixed) -->
                            <a href="#" class="p-3 rounded-xl transition-all"
                                :style="{ backgroundColor: 'var(--social-teal-bg)', border: '1px solid var(--social-teal-bd)', color: 'var(--social-teal)' }"
                                @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--social-teal-hover)'"
                                @mouseleave="e => e.currentTarget.style.backgroundColor = 'var(--social-teal-bg)'">
                                <svg class="w-5 h-5 fill-current" viewBox="0 0 448 512">
                                    <path
                                        d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25V349.38A162.55 162.55 0 1 1 185 188.31V278.2a74.62 74.62 0 1 0 52.23 71.18V0l88 0a121.18 121.18 0 0 0 1.86 22.17h0A122.18 122.18 0 0 0 381 102.39a121.4 121.4 0 0 0 67 20.14Z" />
                                </svg>
                            </a>

                            <!-- Instagram — emerald (brand fixed) -->
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

                            <!-- GitHub — zinc (brand fixed) -->
                            <a href="#" class="p-3 rounded-xl transition-all"
                                :style="{ backgroundColor: 'var(--social-zinc-bg)', border: '1px solid var(--social-zinc-bd)', color: 'var(--social-zinc)' }"
                                @mouseenter="e => e.currentTarget.style.backgroundColor = 'var(--social-zinc-hover)'"
                                @mouseleave="e => e.currentTarget.style.backgroundColor = 'var(--social-zinc-bg)'">
                                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path
                                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                </svg>
                            </a>

                        </div>
                    </div>
                </div>

                <!-- ── Contact Form ── -->
                <div data-aos="fade-left">
                    <form class="space-y-6">
                        <div class="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label class="text-white text-sm font-medium mb-2 block">Name</label>
                                <input type="text" placeholder="Your name"
                                    class="w-full bg-gray-800/50 rounded-xl px-4 py-3 text-white transition-all outline-none"
                                    :style="{ border: '1px solid var(--section-border)' }"
                                    @focus="e => e.currentTarget.style.borderColor = 'var(--accent-text)'"
                                    @blur="e => e.currentTarget.style.borderColor = 'var(--section-border)'" />
                            </div>
                            <div>
                                <label class="text-white text-sm font-medium mb-2 block">Email</label>
                                <input type="email" placeholder="your@email.com"
                                    class="w-full bg-gray-800/50 rounded-xl px-4 py-3 text-white transition-all outline-none"
                                    :style="{ border: '1px solid var(--section-border)' }"
                                    @focus="e => e.currentTarget.style.borderColor = 'var(--accent-text)'"
                                    @blur="e => e.currentTarget.style.borderColor = 'var(--section-border)'" />
                            </div>
                        </div>

                        <div>
                            <label class="text-white text-sm font-medium mb-2 block">Subject</label>
                            <input type="text" placeholder="What's this about?"
                                class="w-full bg-gray-800/50 rounded-xl px-4 py-3 text-white transition-all outline-none"
                                :style="{ border: '1px solid var(--section-border)' }"
                                @focus="e => e.currentTarget.style.borderColor = 'var(--accent-text)'"
                                @blur="e => e.currentTarget.style.borderColor = 'var(--section-border)'" />
                        </div>

                        <div>
                            <label class="text-white text-sm font-medium mb-2 block">Message</label>
                            <textarea rows="5" placeholder="Tell me about your project..."
                                class="w-full bg-gray-800/50 rounded-xl px-4 py-3 text-white transition-all outline-none resize-none"
                                :style="{ border: '1px solid var(--section-border)' }"
                                @focus="e => e.currentTarget.style.borderColor = 'var(--accent-text)'"
                                @blur="e => e.currentTarget.style.borderColor = 'var(--section-border)'">
                            </textarea>
                        </div>

                        <button type="submit"
                            class="w-full text-white font-semibold py-3 rounded-xl transition-all duration-300"
                            :style="{ background: 'var(--cta-gradient)' }"
                            @mouseenter="e => e.currentTarget.style.boxShadow = '0 10px 25px var(--accent-shadow)'"
                            @mouseleave="e => e.currentTarget.style.boxShadow = 'none'">
                            Send Message
                        </button>
                    </form>
                </div>

            </div>
        </div>
    </section>
</template>

<script setup>
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/vue/16/solid';

const contactInfo = [
    { icon: EnvelopeIcon, label: 'Email', value: 'sovisalsing@gmail.com' },
    { icon: PhoneIcon, label: 'Phone', value: '+855 (0) 96 252 1705' },
    { icon: MapPinIcon, label: 'Location', value: 'Phnom Penh, Cambodia' },
];
</script>