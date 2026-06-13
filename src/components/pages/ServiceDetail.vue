<template>
  <section v-if="currentService" class="min-h-screen pt-28 pb-20 relative overflow-hidden" 
           :style="{ backgroundColor: 'var(--bg-color)', color: 'var(--surface-text)' }">
    
    <div class="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] opacity-20 blur-[150px] rounded-full pointer-events-none transition-all duration-1000" 
         :style="{ backgroundColor: 'var(--accent-glow)' }"></div>
    <div class="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] opacity-10 blur-[120px] rounded-full pointer-events-none" 
         :style="{ backgroundColor: 'var(--icon-accent)' }"></div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div data-aos="fade-down">
          <router-link to="/services" class="group inline-flex items-center text-sm font-medium mb-6 opacity-60 hover:opacity-100 transition-all"
                       :style="{ color: 'var(--surface-text-sub)' }">
            <div class="p-2 rounded-full mr-3 border transition-colors group-hover:bg-[var(--accent-bg)]"
                 :style="{ borderColor: 'var(--section-border)' }">
                <ArrowLeftIcon class="w-4 h-4 group-hover:text-[var(--accent-text)]" />
            </div>
            Back to overview
          </router-link>
          
          <div class="flex items-center gap-5">
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

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div class="lg:col-span-7 group relative" data-aos="zoom-in">
          <div class="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl"
               :style="{ backgroundColor: 'var(--accent-glow)' }"></div>
          
          <div class="relative h-[400px] md:h-[600px] overflow-hidden rounded-[2.5rem] border shadow-2xl transition-all duration-500 group-hover:border-[var(--accent-border-hover)]"
               :style="{ borderColor: 'var(--section-border)' }">
            <img :src="currentService.image" 
                 :alt="currentService.name"
                 class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] via-transparent to-transparent opacity-80"></div>
          </div>
        </div>

        <div class="lg:col-span-5 flex flex-col gap-8">
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

  <section v-else class="min-h-screen flex items-center justify-center" :style="{ backgroundColor: 'var(--bg-color)' }">
      <div class="text-center">
          <h2 class="text-2xl font-bold text-[var(--surface-text)]">Service not found</h2>
          <router-link to="/#services" class="mt-4 inline-block text-[var(--accent-text)]">Return to Home</router-link>
      </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'; // Added "ref" import here
import { useRoute } from 'vue-router'; 
import { 
    ArrowLeftIcon, CodeBracketIcon, CommandLineIcon, PaintBrushIcon, 
    DocumentTextIcon, CpuChipIcon, EnvelopeIcon, VideoCameraIcon, 
    DevicePhoneMobileIcon, WindowIcon, CloudArrowUpIcon, PhotoIcon, 
    ChatBubbleBottomCenterTextIcon, MagnifyingGlassCircleIcon, 
    ServerIcon, LanguageIcon, ArrowRightIcon, ChatBubbleLeftRightIcon // Added missing icon imports here
} from '@heroicons/vue/24/outline';

const route = useRoute();

const services = ref([
  // --- Development: Web & Core ---
  { id: 1, icon: CodeBracketIcon, name: 'Web Development', category: 'Development', type: 'Technical', desc: 'End-to-end website engineering focusing on responsive structures, compliance, and optimized web performance.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80' },
  { id: 2, icon: WindowIcon, name: 'Front-end Development', category: 'Development', type: 'Technical', desc: 'Building interactive and high-speed client-side interfaces using dynamic web technologies and frameworks.', image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=500&q=80' },
  { id: 3, icon: CommandLineIcon, name: 'Back-end Development', category: 'Development', type: 'Technical', desc: 'Designing server logic, optimizing runtime performance, and handling application business algorithms.', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80' },
  { id: 4, icon: CpuChipIcon, name: 'Full-stack Development', category: 'Development', type: 'Technical', desc: 'Managing both client and server architectures flawlessly to ship independent, fully functional systems.', image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=500&q=80' },
  { id: 5, icon: DevicePhoneMobileIcon, name: 'Mobile Development', category: 'Development', type: 'Technical', desc: 'Crafting native and cross-platform mobile apps built for performance and high hardware compatibility.', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=500&q=80' },
  { id: 6, icon: CodeBracketIcon, name: 'Software Development', category: 'Development', type: 'Technical', desc: 'Building custom operational desktop or enterprise software engineered for security and scaling.', image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=500&q=80' },

  // --- Development: APIs ---
  { id: 7, icon: ServerIcon, name: 'API Design', category: 'Development', type: 'Technical', desc: 'Architecting structured API schemas following strict RESTful, gRPC, or GraphQL design standards.', image: 'https://miro.medium.com/v2/resize:fit:1200/1*vWvkkgG6uvgmJT8GkId98A.png' },
  { id: 8, icon: CpuChipIcon, name: 'API Development', category: 'Development', type: 'Technical', desc: 'Writing secure server endpoints, handling request routing, data parsing, and high-load traffic profiles.', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=80' },
  { id: 9, icon: ArrowRightIcon, name: 'API Integration', category: 'Development', type: 'Technical', desc: 'Seamlessly weaving third-party web services, payment systems, and tools straight into your ecosystem.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&w=500&q=80' },
  { id: 10, icon: MagnifyingGlassCircleIcon, name: 'API Testing', category: 'Development', type: 'Technical', desc: 'Validating payload data structures, integration stress, and running endpoint vulnerability audits.', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=500&q=80' },

  // --- Design & UX ---
  { id: 11, icon: PaintBrushIcon, name: 'Web Design', category: 'Design & UX', type: 'Creative', desc: 'Creating visual layouts and design guidelines that accurately reflect and communicate modern brand identities.', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=500&q=80' },
  { id: 12, icon: WindowIcon, name: 'UI/UX Design', category: 'Design & UX', type: 'Creative', desc: 'Prototyping dynamic user paths, high-fidelity wireframes, and intuitive user experiences.', image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=500&q=80' },
  { id: 13, icon: PhotoIcon, name: 'Graphic Design', category: 'Design & UX', type: 'Creative', desc: 'Delivering vector layouts, marketing collateral, custom branding elements, and visual communication assets.', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=500&q=80' },

  // --- DevOps & System Infrastructure ---
  { id: 14, icon: CloudArrowUpIcon, name: 'Cloud Deployment', category: 'DevOps & Sys', type: 'Technical', desc: 'Configuring safe web setups and provisioning clean host architectures on top clouds like AWS.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80' },
  { id: 15, icon: CpuChipIcon, name: 'DevOps Engineering', category: 'DevOps & Sys', type: 'Technical', desc: 'Automating build releases via continuous delivery pipes and building isolated software runtime containers.', image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=500&q=80' },
  { id: 16, icon: ServerIcon, name: 'System Administration', category: 'DevOps & Sys', type: 'Technical', desc: 'Tuning operating setups, controlling internal networks, and orchestrating server ecosystem stability.', image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=500&q=80' },
  { id: 17, icon: MagnifyingGlassCircleIcon, name: 'System Testing', category: 'DevOps & Sys', type: 'Technical', desc: 'Executing comprehensive smoke, functional, performance, and sanity test sweeps on active environments.', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=500&q=80' },
  { id: 18, icon: CloudArrowUpIcon, name: 'System Rollout', category: 'DevOps & Sys', type: 'Technical', desc: 'Managing final live release transitions safely with low downtime and setup rollback safeguards.', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=500&q=80' },

  // --- Automation & Intelligence ---
  { id: 19, icon: ChatBubbleBottomCenterTextIcon, name: 'Automation Services', category: 'Development', type: 'Technical', desc: 'Scripting logical web actions to strip away manual business operations and speed up processing loops.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80' },
  { id: 20, icon: ChatBubbleLeftRightIcon, name: 'ChatBot Engineering', category: 'Development', type: 'Technical', desc: 'Programming algorithmic instant assistants across communication services for modern customer triage.', image: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&w=500&q=80' },

  // --- Content & Writing ---
  { id: 21, icon: DocumentTextIcon, name: 'Technical Writing', category: 'Content & Write', type: 'Creative', desc: 'Authoring clean engine architectures, system operation logs, and onboarding material for development teams.', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=500&q=80' },
  { id: 22, icon: VideoCameraIcon, name: 'Content Creation', category: 'Content & Write', type: 'Creative', desc: 'Designing structural content, interactive tech reviews, and strategic media campaigns across social web profiles.', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=500&q=80' },
  { id: 23, icon: VideoCameraIcon, name: 'YouTube Content', category: 'Content & Write', type: 'Creative', desc: 'Producing tutorials and sharing languages learning tips and daily used vocabularies, conversations & grammar + sentece structures.', image: 'https://www.fluentforfree.com/wp-content/uploads/2020/04/shutterstock_293731811-320x202.jpg' },
  { id: 24, icon: VideoCameraIcon, name: 'Video Editing', category: 'Content & Write', type: 'Creative', desc: 'Splicing high-retention technical footage, motion callouts, audio tuning, and cleaning up presentation clips.', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=500&q=80' },

  // --- Business Services & Localization ---
  { id: 25, icon: EnvelopeIcon, name: 'Email Marketing', category: 'Business Services', type: 'Consulting', desc: 'Drafting high-conversion campaign workflows and maximizing message delivery pipelines.', image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=500&q=80' },
  { id: 26, icon: LanguageIcon, name: 'Translation Services', category: 'Business Services', type: 'Consulting', desc: 'Providing fluent semantic context bridges across regional variants, documents, and assets.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80' },
  { id: 27, icon: LanguageIcon, name: 'Polyglot Localization', category: 'Business Services', type: 'Consulting', desc: 'Adapting full platform environments to fit localized user habits, text boundaries, and currency metrics.', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=500&q=80' },
  { id: 28, icon: ChatBubbleLeftRightIcon, name: 'Multilingual Support', category: 'Business Services', type: 'Consulting', desc: 'Assisting operations or development teams seamlessly across multiple business languages.', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80' },

  // --- IT Support & Operations ---
  { id: 29, icon: CpuChipIcon, name: 'IT Support', category: 'DevOps & Sys', type: 'Technical', desc: 'Providing technical troubleshooting, hardware/software diagnostics, environment configuration, and workspace system maintenance.', image: 'https://cheekymunkey.co.uk/wp-content/uploads/2017/12/itsupp.png' },

  // --- Database Lifecycle & Engineering ---
  { id: 30, icon: ServerIcon, name: 'Database Design', category: 'Development', type: 'Technical', desc: 'Architecting relational and non-relational database schemas, normalization structures, and secure data relationship blueprints.', image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=500&q=80' },
  { id: 31, icon: CommandLineIcon, name: 'Database Management', category: 'DevOps & Sys', type: 'Technical', desc: 'Optimizing query execution plans, setting up indexing strategies, managing data backups, and maintaining engine health.', image: 'https://assets.cioinsight.com/uploads/2022/05/Database-Management-Systems-scaled.jpeg' },
  { id: 32, icon: MagnifyingGlassCircleIcon, name: 'Database Testing', category: 'DevOps & Sys', type: 'Technical', desc: 'Validating data integrity constraints, stress testing transactional throughput, and verifying ACID compliance or schema migrations.', image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=500&q=80' },

  // --- IT Management & Strategy ---
  { id: 33, icon: CpuChipIcon, name: 'MIS Management', category: 'Business Services', type: 'Consulting', desc: 'Overseeing corporate information system infrastructures, optimizing internal data workflows, and aligning technology assets with business goals.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80' },
  { id: 34, icon: DocumentTextIcon, name: 'Project Management', category: 'Business Services', type: 'Consulting', desc: 'Leading agile development cycles, tracking sprint delivery metrics, managing technical scopes, and ensuring on-time project rollouts.', image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=500&q=80' }
]);

const currentService = computed(() => {
  const id = route.params.id;
  if (!id) return null;
  return services.value.find(s => s.id === parseInt(id)) || null;
});
</script>

<style scoped>
.backdrop-blur-2xl {
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
}
</style>