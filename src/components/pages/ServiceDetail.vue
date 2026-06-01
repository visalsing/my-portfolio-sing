<template>
  <section v-if="currentService" class="min-h-screen pt-28 pb-20 relative overflow-hidden" 
           :style="{ backgroundColor: 'var(--bg-color)', color: 'var(--surface-text)' }">
    
    <!-- ── Ambient Glows (Using your exact accent colors) ── -->
    <div class="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] opacity-20 blur-[150px] rounded-full pointer-events-none transition-all duration-1000" 
         :style="{ backgroundColor: 'var(--accent-glow)' }"></div>
    <div class="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] opacity-10 blur-[120px] rounded-full pointer-events-none" 
         :style="{ backgroundColor: 'var(--icon-accent)' }"></div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      
      <!-- ── Header Section ── -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div data-aos="fade-down">
          <!-- Back button with hover highlight matching theme text -->
          <router-link to="/#services" class="group inline-flex items-center text-sm font-medium mb-6 opacity-60 hover:opacity-100 transition-all"
                       :style="{ color: 'var(--surface-text-sub)' }">
            <div class="p-2 rounded-full mr-3 border transition-colors group-hover:bg-[var(--accent-bg)]"
                 :style="{ borderColor: 'var(--section-border)' }">
                <ArrowLeftIcon class="w-4 h-4 group-hover:text-[var(--accent-text)]" />
            </div>
            Back to overview
          </router-link>
          
          <div class="flex items-center gap-5">
            <!-- Glass Icon Box using your app's icon gradient background -->
            <div class="p-4 rounded-2xl border backdrop-blur-xl transition-all duration-300 hover:scale-110 shadow-lg shadow-black/40" 
                 :style="{ 
                   borderColor: 'var(--accent-border)', 
                   background: 'linear-gradient(to right, var(--icon-bg), var(--icon-bg-2))' 
                 }">
                <component :is="currentService.icon" class="w-10 h-10" :style="{ color: 'var(--icon-accent)' }" />
            </div>
            <div>
                <span class="text-xs uppercase tracking-[0.2em] font-bold" :style="{ color: 'var(--accent-text)' }">
                  {{ currentService.category }}
                </span>
                <h1 class="text-4xl md:text-6xl font-black tracking-tight mt-1 text-[var(--surface-text)]">
                  {{ currentService.name }}
                </h1>
            </div>
          </div>
        </div>

        <div class="hidden md:block text-right" data-aos="fade-left">
            <p class="text-xs opacity-40 font-mono mb-2 uppercase text-[var(--surface-text)]">Project Classification</p>
            <p class="text-xl font-light italic" :style="{ color: 'var(--accent-text-muted)' }">
              {{ currentService.type }} Solution
            </p>
        </div>
      </div>

      <!-- ── Bento-inspired Grid ── -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Left Box: Image with themed border overlay -->
        <div class="lg:col-span-7 group relative" data-aos="zoom-in">
          <!-- Hover Glow Behind Image -->
          <div class="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl"
               :style="{ backgroundColor: 'var(--accent-glow)' }"></div>
          
          <div class="relative h-[400px] md:h-[600px] overflow-hidden rounded-[2.5rem] border shadow-2xl transition-all duration-500 group-hover:border-[var(--accent-border-hover)]"
               :style="{ borderColor: 'var(--section-border)' }">
            <img :src="currentService.image" 
                 :alt="currentService.name"
                 class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <!-- Color blend overlay to tie image to dark background -->
            <div class="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] via-transparent to-transparent opacity-80"></div>
          </div>
        </div>

        <!-- Right Box: Content & Buttons -->
        <div class="lg:col-span-5 flex flex-col gap-8">
          
          <!-- Glassmorphism Card utilizing variables -->
          <div class="p-8 rounded-[2rem] border backdrop-blur-2xl transition-all duration-300 hover:bg-white/[0.02]" 
               :style="{ 
                 borderColor: 'var(--section-border)', 
                 background: 'linear-gradient(to bottom right, var(--card-bg-from), var(--section-grad-to))' 
               }" data-aos="fade-left">
            <h3 class="text-xl font-bold mb-4 text-[var(--surface-text)]">The Core Goal</h3>
            <p class="leading-relaxed text-lg" :style="{ color: 'var(--surface-text-sub)' }">
              {{ currentService.desc }}
            </p>
          </div>

          <!-- Feature tags featuring theme matching background chips -->
          <div class="grid grid-cols-2 gap-4" data-aos="fade-up" data-aos-delay="200">
            <div v-for="tag in ['Performance', 'Scalability', 'Modern UI', 'Security']" :key="tag"
                 class="p-4 rounded-2xl border text-center text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
                 :style="{ 
                   borderColor: 'var(--section-border)', 
                   backgroundColor: 'var(--card-bg-from)',
                   color: 'var(--surface-text)'
                 }">
              {{ tag }}
            </div>
          </div>

          <!-- Futuristic CTA Block (Double Gradient Border Effect) -->
          <div class="mt-auto p-[1px] rounded-[2.2rem]" :style="{ background: 'var(--cta-gradient)' }" data-aos="fade-up" data-aos-delay="300">
            <div class="p-8 rounded-[2rem] flex flex-col items-center text-center backdrop-blur-3xl"
                 :style="{ backgroundColor: 'var(--bg-color)' }">
                <p class="text-sm mb-4" :style="{ color: 'var(--surface-text-sub)' }">Have a vision or concept in mind?</p>
                <button class="w-full py-5 rounded-2xl text-white font-black text-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-xl"
                        :style="{ 
                          background: 'var(--cta-gradient)',
                          boxShadow: '0 10px 30px -10px var(--accent-shadow)'
                        }">
                    LET'S COLLABORATE
                </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { 
    ArrowLeftIcon, CodeBracketIcon, CommandLineIcon, PaintBrushIcon, 
    DocumentTextIcon, CpuChipIcon, EnvelopeIcon, VideoCameraIcon, 
    DevicePhoneMobileIcon, WindowIcon, CloudArrowUpIcon, PhotoIcon, 
    ChatBubbleBottomCenterTextIcon, MagnifyingGlassCircleIcon, 
    ServerIcon, LanguageIcon 
} from '@heroicons/vue/24/outline';

const route = useRoute();

// Ensure your list here matches your main list precisely
const services = [
  { id: 1, icon: CodeBracketIcon, name: 'Web Frontend Development', category: 'Development', type: 'Technical', image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800', desc: 'Creating beautiful, responsive, and fast user interfaces using modern tools like Vue.js, React, and Tailwind CSS.' },
  { id: 2, icon: CommandLineIcon, name: 'Web Backend Development', category: 'Development', type: 'Technical', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800', desc: 'Building the "brains" of your application, handling server logic, and managing secure databases with Laravel and Node.js.' },
  { id: 3, icon: PaintBrushIcon, name: 'Web Designing', category: 'Design', type: 'Creative', image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800', desc: 'Designing modern and professional website layouts that look great on both desktop and mobile screens.' },
  { id: 4, icon: DocumentTextIcon, name: 'Technical Writing', category: 'Content', type: 'Creative', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800', desc: 'Writing clear, easy-to-understand guides, documentation, and tutorials for software and coding projects.' },
  { id: 5, icon: CpuChipIcon, name: 'API Integration & Dev', category: 'Development', type: 'Technical', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800', desc: 'Connecting different software services together and building custom APIs to share data between platforms.' },
  { id: 6, icon: EnvelopeIcon, name: 'Email Marketing', category: 'Services', type: 'Consulting', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800', desc: 'Setting up automated email systems and newsletters to keep your customers engaged and informed.' },
  { id: 7, icon: VideoCameraIcon, name: 'Content Creation', category: 'Content', type: 'Creative', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800', desc: 'Making educational videos and social media content to explain technology and teach coding skills.' },
  { id: 8, icon: DevicePhoneMobileIcon, name: 'Mobile App Development', category: 'Development', type: 'Technical', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800', desc: 'Building useful and smooth mobile applications for iOS and Android using Flutter and Dart.' },
  { id: 9, icon: WindowIcon, name: 'UI/UX Design', category: 'Design', type: 'Creative', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800', desc: 'Focusing on how users interact with your app to make sure it is easy, intuitive, and enjoyable to use.' },
  { id: 10, icon: CloudArrowUpIcon, name: 'DevOps & Deployment', category: 'Infrastructure', type: 'Technical', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800', desc: 'Moving your code to the cloud and managing servers on AWS or DigitalOcean to keep your site online 24/7.' },
  { id: 11, icon: PhotoIcon, name: 'Graphic Design', category: 'Design', type: 'Creative', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800', desc: 'Creating visual assets, logos, and digital graphics using Photoshop and Canva to boost your brand identity.' },
  { id: 12, icon: ChatBubbleBottomCenterTextIcon, name: 'Automation & ChatBot', category: 'Development', type: 'Technical', image: 'https://images.unsplash.com/photo-1531746790731-6c2079ee396f?auto=format&fit=crop&q=80&w=800', desc: 'Creating smart Telegram bots and automated workflows to save time and handle tasks automatically.' },
  { id: 13, icon: MagnifyingGlassCircleIcon, name: 'System Testing', category: 'Infrastructure', type: 'Technical', image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800', desc: 'Testing software to find bugs and ensure everything works perfectly before it reaches your users.' },
  { id: 14, icon: ServerIcon, name: 'System Administration', category: 'Infrastructure', type: 'Technical', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800', desc: 'Setting up and maintaining computers, local networks, and development environments like XAMPP or Docker.' },
  { id: 15, icon: LanguageIcon, name: 'Translation Services', category: 'Services', type: 'Consulting', image: 'https://images.unsplash.com/photo-1451188502541-13943edb6acb?auto=format&fit=crop&q=80&w=800', desc: 'Providing accurate translation and localization between Khmer, English, Chinese, and other regional languages.' },
];

const currentService = computed(() => {
  const serviceId = parseInt(route.params.id);
  return services.find(s => s.id === serviceId);
});
</script>

<style scoped>
/* Optional: Adding a soft scroll behavior for the glass cards */
.backdrop-blur-2xl {
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
}
</style>

<!-- <script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { 
    ArrowLeftIcon, CodeBracketIcon, CommandLineIcon, PaintBrushIcon, 
    DocumentTextIcon, CpuChipIcon, EnvelopeIcon, VideoCameraIcon, 
    DevicePhoneMobileIcon, WindowIcon, CloudArrowUpIcon, PhotoIcon, 
    ChatBubbleBottomCenterTextIcon, MagnifyingGlassCircleIcon, 
    ServerIcon, LanguageIcon 
} from '@heroicons/vue/24/outline';

const route = useRoute();

// I added an 'image' property to each object using Unsplash source URLs
const services = [
  { id: 1, icon: CodeBracketIcon, name: 'Web Frontend Development', category: 'Development', type: 'Technical', image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800', desc: 'Creating beautiful, responsive, and fast user interfaces using modern tools like Vue.js, React, and Tailwind CSS.' },
  { id: 2, icon: CommandLineIcon, name: 'Web Backend Development', category: 'Development', type: 'Technical', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800', desc: 'Building the "brains" of your application, handling server logic, and managing secure databases with Laravel and Node.js.' },
  { id: 3, icon: PaintBrushIcon, name: 'Web Designing', category: 'Design', type: 'Creative', image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800', desc: 'Designing modern and professional website layouts that look great on both desktop and mobile screens.' },
  { id: 4, icon: DocumentTextIcon, name: 'Technical Writing', category: 'Content', type: 'Creative', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800', desc: 'Writing clear, easy-to-understand guides, documentation, and tutorials for software and coding projects.' },
  { id: 5, icon: CpuChipIcon, name: 'API Integration & Dev', category: 'Development', type: 'Technical', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800', desc: 'Connecting different software services together and building custom APIs to share data between platforms.' },
  { id: 6, icon: EnvelopeIcon, name: 'Email Marketing', category: 'Services', type: 'Consulting', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800', desc: 'Setting up automated email systems and newsletters to keep your customers engaged and informed.' },
  { id: 7, icon: VideoCameraIcon, name: 'Content Creation', category: 'Content', type: 'Creative', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800', desc: 'Making educational videos and social media content to explain technology and teach coding skills.' },
  { id: 8, icon: DevicePhoneMobileIcon, name: 'Mobile App Development', category: 'Development', type: 'Technical', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800', desc: 'Building useful and smooth mobile applications for iOS and Android using Flutter and Dart.' },
  { id: 9, icon: WindowIcon, name: 'UI/UX Design', category: 'Design', type: 'Creative', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800', desc: 'Focusing on how users interact with your app to make sure it is easy, intuitive, and enjoyable to use.' },
  { id: 10, icon: CloudArrowUpIcon, name: 'DevOps & Deployment', category: 'Infrastructure', type: 'Technical', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800', desc: 'Moving your code to the cloud and managing servers on AWS or DigitalOcean to keep your site online 24/7.' },
  { id: 11, icon: PhotoIcon, name: 'Graphic Design', category: 'Design', type: 'Creative', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800', desc: 'Creating visual assets, logos, and digital graphics using Photoshop and Canva to boost your brand identity.' },
  { id: 12, icon: ChatBubbleBottomCenterTextIcon, name: 'Automation & ChatBot', category: 'Development', type: 'Technical', image: 'https://images.unsplash.com/photo-1531746790731-6c2079ee396f?auto=format&fit=crop&q=80&w=800', desc: 'Creating smart Telegram bots and automated workflows to save time and handle tasks automatically.' },
  { id: 13, icon: MagnifyingGlassCircleIcon, name: 'System Testing', category: 'Infrastructure', type: 'Technical', image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800', desc: 'Testing software to find bugs and ensure everything works perfectly before it reaches your users.' },
  { id: 14, icon: ServerIcon, name: 'System Administration', category: 'Infrastructure', type: 'Technical', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800', desc: 'Setting up and maintaining computers, local networks, and development environments like XAMPP or Docker.' },
  { id: 15, icon: LanguageIcon, name: 'Translation Services', category: 'Services', type: 'Consulting', image: 'https://images.unsplash.com/photo-1451188502541-13943edb6acb?auto=format&fit=crop&q=80&w=800', desc: 'Providing accurate translation and localization between Khmer, English, Chinese, and other regional languages.' },
];

const currentService = computed(() => {
  const serviceId = parseInt(route.params.id);
  return services.find(s => s.id === serviceId);
});
</script> -->