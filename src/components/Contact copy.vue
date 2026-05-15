<template>
    <section class="relative py-20 overflow-hidden" id="contacts">
        <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center m-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
                    Get In <span class="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                        Touch
                    </span>
                </h2>
                <p class="text-blue-200 text-lg">
                    Let's work together on your next project
                </p>
            </div>
            <div class="grid lg:grid-cols-2 gap-12">
                <!-- Contact Info -->
                <div data-aos="fade-right">
                    <h3 class="text-2xl font-bold text-white mb-6">
                        Contact Information
                    </h3>
                    <div class="space-y-6">
                        <div class="flex items-center gap-4">
                            <EnvelopeIcon class="w-6 h-6 text-blue-400" />
                            <div>
                                <p class="text-white font-semibold">Email</p>
                                <p class="text-blue-200">sovisalsing@gmail.com</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <PhoneIcon class="w-6 h-6 text-blue-400" />
                            <div>
                                <p class="text-white font-semibold">Phone</p>
                                <p class="text-blue-200">+855 (0) 96 252 1705</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <MapPinIcon class="w-6 h-6 text-blue-400" />
                            <div>
                                <p class="text-white font-semibold">Location</p>
                                <p class="text-blue-200">
                                    Phnom Penh, Cambodia
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- Social Links -->
                    <div class="mt-8">
                        <h4 class="text-lg font-bold text-white mb-4">
                            Follow Me
                        </h4>
                        <div class="flex gap-4">
                            <a href="#" class="p-3 bg-blue-500/20 border border-blue-400/30 rounded-xl text-blue-400
                            hover:bg-blue-500/30 transition-all">
                                <ChatBubbleLeftRightIcon class="w-5 h-5" />
                            </a>
                            <a href="#" class="p-3 bg-cyan-500/20 border border-cyan-400/30 rounded-xl text-cyan-400
                            hover:bg-cyan-500/30 transition-all">
                                <UserGroupIcon class="w-5 h-5" />
                            </a>
                            <a href="#" class="p-3 bg-pink-500/20 border border-pink-400/30 rounded-xl text-pink-400
                            hover:bg-pink-500/30 transition-all">
                                <ShareIcon class="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
                <!-- Contact Form -->
                <div data-aos="fade-left">
                    <form action="" class="space-y-6">
                        <div class="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label for="" class="text-white text-sm font-medium mb-2 block">Name</label>
                                <input type="text" class="w-full bg-gray-800/50 border border-blue-500/30 rounded-xl
                                px-4 py-3 text-white placeholder-blue-300 focus:border-blue-400 focus:outline-none
                                transition-all">
                            </div>
                            <div>
                                <label for="" class="text-white text-sm font-medium mb-2 block">Email</label>
                                <input type="email" class="w-full bg-gray-800/50 border border-blue-500/30 rounded-xl
                                px-4 py-3 text-white placeholder-blue-300 focus:border-blue-400 focus:outline-none
                                transition-all">
                            </div>
                        </div>
                        <div>
                            <label for="" class="text-white text-sm font-medium mb-2 block">Subject</label>
                            <input type="text" class="w-full bg-gray-800/50 border border-blue-500/30 rounded-xl
                                px-4 py-3 text-white placeholder-blue-300 focus:border-blue-400 focus:outline-none
                                transition-all">
                        </div>

                        <div>
                            <label for="" class="text-white text-sm font-medium mb-2 block">Message</label>
                            <textarea class="w-full bg-gray-800/50 border border-blue-500/30 rounded-xl
                                px-4 py-3 text-white placeholder-blue-300 focus:border-blue-400 focus:outline-none
                                transition-all"></textarea>
                        </div>
                        <button type="sumbit" class="w-full bg-linear-to-r from-blue-500 to-cyan-500 text-white font-semibold
                            py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                            Send Message
                        </button>

                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { EnvelopeIcon, ChatBubbleLeftRightIcon, MapPinIcon, PhoneIcon, UserGroupIcon, ShareIcon } from '@heroicons/vue/16/solid';

</script>