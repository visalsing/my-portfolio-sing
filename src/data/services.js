// src/data/services.js
// Single source of truth for the Services overview page AND ServiceDetails.vue.
// Edit this file only: add a service = add one line in SERVICES.
//
// status:  1 = Available (I do this regularly)
//          2 = Learning  (building skills, open to small projects)
//          3 = Paused    (did it before, not taking it on right now)
//          0 = Not yet   (shown dimmed / can be filtered out)
//
// ⚠ Statuses, descriptions and tech stacks below are a first draft written from your
//   profile and tech list. Please read each one and correct anything that is not true.

import {
  BoltIcon, BriefcaseIcon, ChartBarIcon, ChatBubbleBottomCenterTextIcon, ChatBubbleLeftRightIcon,
  CircleStackIcon, CloudArrowUpIcon, CodeBracketIcon, CommandLineIcon, Cog6ToothIcon, CpuChipIcon,
  DevicePhoneMobileIcon, DocumentTextIcon, EnvelopeIcon, GlobeAltIcon, LanguageIcon, LifebuoyIcon,
  MagnifyingGlassCircleIcon, MegaphoneIcon, PaintBrushIcon, PhotoIcon, PresentationChartLineIcon,
  ArrowsRightLeftIcon, RocketLaunchIcon, ServerIcon, SignalIcon, SwatchIcon, TableCellsIcon,
  VideoCameraIcon, WindowIcon, FilmIcon, PlayCircleIcon, ClipboardDocumentListIcon,
} from '@heroicons/vue/24/outline';

export const STATUS = {
  1: { key: 'available', label: 'Available', hint: 'I do this regularly.' },
  2: { key: 'learning', label: 'Learning', hint: 'I am building this skill and take on small projects.' },
  3: { key: 'paused', label: 'Paused', hint: 'Not taking this on right now, but it may come back.' },
  0: { key: 'planned', label: 'Not yet', hint: 'Not offered at the moment.' },
};

export const CATEGORIES = [
  { id: 'software', name: 'Software Development', icon: CodeBracketIcon, blurb: 'Web, mobile and custom software, built end to end.' },
  { id: 'api', name: 'API Services', icon: ServerIcon, blurb: 'Design, build, connect and test APIs.' },
  { id: 'design', name: 'Design & UX', icon: PaintBrushIcon, blurb: 'Interfaces, prototypes and visual identity.' },
  { id: 'devops', name: 'DevOps & Infrastructure', icon: CloudArrowUpIcon, blurb: 'Deployment, systems, networks and IT support.' },
  { id: 'automation', name: 'Automation & AI', icon: BoltIcon, blurb: 'Scripts, workflows and chatbots that save time.' },
  { id: 'data', name: 'Data & Databases', icon: CircleStackIcon, blurb: 'Database work, analysis and day-to-day data support.' },
  { id: 'content', name: 'Content & Media', icon: VideoCameraIcon, blurb: 'Writing, video and learning content.' },
  { id: 'marketing', name: 'Marketing & Management', icon: MegaphoneIcon, blurb: 'Campaigns, information systems and project delivery.' },
  { id: 'language', name: 'Language Services', icon: LanguageIcon, blurb: 'Translation and multilingual work.' },
];

const LANGS = ['Khmer', 'English', 'Chinese', 'French', 'Lao'];

// s(id, category, name, icon, status, type, summary, details[], stack[], stackLabel?)
// Keep ids stable (they are used in /services/:id links). 1–34 match the old file.
const s = (id, category, name, icon, status, type, summary, details, stack = [], stackLabel = 'Tech & tools') =>
  ({ id, category, name, icon, status, type, summary, details, stack, stackLabel });

export const SERVICES = [
  // ── Software Development ──
  s(1, 'software', 'Web Development', CodeBracketIcon, 1, 'Technical',
    'Responsive, fast websites built end to end, from layout to deployment.',
    ['Responsive pages that work on phone, tablet and desktop', 'Performance, SEO basics and accessibility checks', 'Hosting and deployment on Vercel or Netlify'],
    ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'Tailwind CSS', 'Vercel']),
  s(2, 'software', 'Front-end Development', WindowIcon, 1, 'Technical',
    'Fast, interactive interfaces built with modern frameworks.',
    ['Component-based UIs in Vue or React', 'Clean state handling and API data fetching', 'Pixel-accurate builds from Figma designs'],
    ['Vue.js', 'React.js', 'TypeScript', 'Tailwind CSS', 'Figma']),
  s(3, 'software', 'Back-end Development', CommandLineIcon, 1, 'Technical',
    'Server logic, databases and APIs that stay fast and reliable.',
    ['Business logic and authentication', 'REST endpoints with validation and error handling', 'Data modeling and query tuning'],
    ['Node.js', 'Express.js', 'Laravel', 'MySQL', 'PostgreSQL', 'MongoDB']),
  s(4, 'software', 'Full-stack Development', CpuChipIcon, 1, 'Technical',
    'One developer for the whole app: interface, server and database.',
    ['Planning, building and shipping a complete system', 'Consistent data flow from UI to database', 'Deployment and basic monitoring'],
    ['Vue.js', 'Node.js', 'Express.js', 'PostgreSQL', 'PrismaORM', 'Docker']),
  s(5, 'software', 'Mobile App Development', DevicePhoneMobileIcon, 2, 'Technical',
    'Cross-platform mobile apps from a single codebase.',
    ['Android and iOS apps with Flutter', 'Native-feeling navigation and forms', 'API and push-notification integration'],
    ['Flutter', 'Dart', 'REST API', 'Firebase', 'OneSignal']),
  s(6, 'software', 'Software Development', CodeBracketIcon, 1, 'Technical',
    'Custom desktop and business software built around your workflow.',
    ['From requirements to a working release', 'Maintainable code with a Git-based workflow', 'Internal tools and desktop applications'],
    ['Python', 'Java', 'C#', 'C++', 'Git', 'SQL']),

  // ── API Services ──
  s(7, 'api', 'API Design', ServerIcon, 1, 'Technical',
    'Clear, consistent API contracts before any code is written.',
    ['Resource and endpoint structure', 'Request/response schemas and error formats', 'Versioning and documentation'],
    ['REST API', 'Postman']),
  s(8, 'api', 'API Development', CpuChipIcon, 1, 'Technical',
    'Secure endpoints that handle real traffic.',
    ['Routing, validation and authentication', 'Safe error handling and rate limiting', 'Database access through an ORM'],
    ['Node.js', 'Express.js', 'Laravel', 'PrismaORM', 'MongoDB']),
  s(9, 'api', 'API Integration', ArrowsRightLeftIcon, 1, 'Technical',
    'Connect payments, messaging and third-party tools to your system.',
    ['Payment, email, chat and map services', 'Webhooks and background sync', 'Retries and clear failure handling'],
    ['REST API', 'Postman', 'EmailJS', 'TelegramBot', 'Node.js']),
  s(10, 'api', 'API Testing', MagnifyingGlassCircleIcon, 1, 'Technical',
    'Check that every endpoint returns the right data and fails safely.',
    ['Functional and edge-case test collections', 'Payload and status-code validation', 'Basic security checks'],
    ['Postman', 'REST API', 'JavaScript']),

  // ── Design & UX ──
  s(11, 'design', 'Web Design', PaintBrushIcon, 1, 'Creative',
    'Layouts and visual style that fit your brand.',
    ['Page layouts and style guides', 'Responsive designs for every screen', 'Handoff-ready Figma files'],
    ['Figma', 'Canva', 'Photoshop', 'Tailwind CSS']),
  s(12, 'design', 'UX/UI Design', SwatchIcon, 1, 'Creative',
    'User flows, wireframes and prototypes that are easy to use.',
    ['User flows and wireframes', 'Clickable prototypes in Figma', 'Usability review and iteration'],
    ['Figma', 'Canva']),
  s(13, 'design', 'Graphic Design', PhotoIcon, 1, 'Creative',
    'Logos, social posts and print assets with a consistent look.',
    ['Branding elements and social media graphics', 'Posters, flyers and presentations', 'Export-ready files for print and web'],
    ['Photoshop', 'Canva', 'Figma']),

  // ── DevOps & Infrastructure ──
  s(14, 'devops', 'Cloud Deployment', CloudArrowUpIcon, 1, 'Technical',
    'Get your app online and keep it running.',
    ['Hosting setup and custom domains', 'Environment variables and secrets', 'Automatic deploys from Git'],
    ['Vercel', 'Netlify', 'Render', 'Docker', 'GitHub']),
  s(15, 'devops', 'DevOps Engineering', Cog6ToothIcon, 2, 'Technical',
    'Automated builds and releases with containers.',
    ['CI/CD pipelines triggered from Git', 'Docker images for repeatable setups', 'Separate staging and production environments'],
    ['Docker', 'Git', 'GitHub', 'GitLab', 'Vercel']),
  s(16, 'devops', 'System Administration', ServerIcon, 1, 'Technical',
    'Keep machines, accounts and servers healthy.',
    ['User and access management', 'Updates, backups and monitoring', 'Troubleshooting server issues'],
    ['WAMP', 'MySQL', 'Microsoft Office', 'Google Workspace']),
  s(17, 'devops', 'System Testing', MagnifyingGlassCircleIcon, 1, 'Technical',
    'Verify a system works before your users find the problems.',
    ['Smoke, functional and regression checks', 'Written test cases and bug reports', 'Sign-off checklists'],
    ['Postman', 'Navicat', 'Microsoft Office']),
  s(18, 'devops', 'System Rollout', RocketLaunchIcon, 1, 'Technical',
    'Introduce a new system to a team with minimal downtime.',
    ['Setup, data migration and configuration', 'Staff training and handover notes', 'Go-live support with a rollback plan'],
    ['SQL', 'Navicat', 'Microsoft Office']),
  s(36, 'devops', 'Networking', SignalIcon, 2, 'Technical',
    'Basic network setup and troubleshooting.',
    ['Wi-Fi and LAN setup', 'Connectivity troubleshooting', 'Shared access for printers and files']),
  s(29, 'devops', 'IT Support', LifebuoyIcon, 1, 'Technical',
    'Fast help with hardware, software and workspace issues.',
    ['Troubleshooting and diagnostics', 'Setup of computers, accounts and tools', 'Routine maintenance'],
    ['Microsoft Office', 'Google Workspace', 'WAMP']),

  // ── Automation & AI ──
  s(19, 'automation', 'Automation Services', BoltIcon, 1, 'Technical',
    'Replace repetitive manual work with scripts and workflows.',
    ['Scheduled jobs and data-entry scripts', 'Notifications and email flows', 'Automatic report generation'],
    ['Python', 'Node.js', 'TelegramBot', 'EmailJS', 'Mautic']),
  s(20, 'automation', 'Chatbot Engineering', ChatBubbleLeftRightIcon, 1, 'Technical',
    'Bots that answer questions and route requests on Telegram and the web.',
    ['Command and menu flows', 'Connection to your database or API', 'AI-assisted replies'],
    ['TelegramBot', 'Node.js', 'Claude', 'ChatGPT', 'Gemini']),

  // ── Data & Databases ──
  s(30, 'data', 'Database Design', CircleStackIcon, 1, 'Technical',
    'Schemas that stay clean as your data grows.',
    ['Tables, relations and normalization', 'Indexes and constraints', 'Schema diagrams'],
    ['MySQL', 'PostgreSQL', 'MongoDB', 'NeonDB', 'PrismaORM']),
  s(31, 'data', 'Database Management', TableCellsIcon, 1, 'Technical',
    'Keep databases fast, backed up and healthy.',
    ['Query and index tuning', 'Backups and restores', 'Access control'],
    ['MySQL', 'PostgreSQL', 'Navicat', 'NeonDB']),
  s(32, 'data', 'Database Testing', MagnifyingGlassCircleIcon, 1, 'Technical',
    'Make sure data stays correct through every change.',
    ['Integrity and constraint checks', 'Migration and rollback tests', 'Checks on slow, important queries'],
    ['SQL', 'Navicat', 'Postman']),
  s(35, 'data', 'Data Analysis', ChartBarIcon, 2, 'Technical',
    'Turn raw data into charts and clear findings.',
    ['Cleaning and exploring datasets', 'Dashboards and visual reports', 'Findings written for non-technical readers'],
    ['Power BI', 'Tableau', 'SQL', 'Python', 'Microsoft Office']),
  s(37, 'data', 'Data Support', ClipboardDocumentListIcon, 1, 'Technical',
    'Keep business data accurate, available and usable.',
    ['Data checks and cleanup', 'Imports, exports and reports', 'Day-to-day help for teams'],
    ['SQL', 'MySQL', 'Navicat', 'Microsoft Office', 'Google Workspace']),

  // ── Content & Media ──
  s(21, 'content', 'Technical Writing', DocumentTextIcon, 1, 'Creative',
    'Clear documentation your team will actually read.',
    ['README files and setup guides', 'API and user documentation', 'Process and onboarding notes'],
    ['Microsoft Office', 'Google Workspace', 'GitHub']),
  s(22, 'content', 'Content Creation', PresentationChartLineIcon, 1, 'Creative',
    'Tutorials, posts and reviews about technology.',
    ['Written and visual content', 'Social media planning', 'A consistent tone for your audience'],
    ['Canva', 'Photoshop', 'YouTube']),
  s(23, 'content', 'YouTube Content', PlayCircleIcon, 1, 'Creative',
    'Language-learning videos: vocabulary, conversation and grammar.',
    ['Everyday vocabulary and sentence patterns', 'Conversation practice', 'Grammar explained simply'],
    ['YouTube', 'Canva', 'Photoshop']),
  s(24, 'content', 'Video Editing', FilmIcon, 0, 'Creative',
    'Clean, well-paced edits for tutorials and clips.',
    ['Cutting, captions and audio cleanup', 'Motion callouts and intros', 'Exports for YouTube and social media'],
    ['YouTube', 'Canva']),

  // ── Marketing & Management ──
  s(25, 'marketing', 'Email Marketing', EnvelopeIcon, 1, 'Consulting',
    'Campaigns and automations that reach the inbox.',
    ['Campaign and template setup', 'Segmentation and automated sequences', 'Delivery and open-rate tracking'],
    ['Mautic', 'EmailJS', 'OneSignal']),
  s(38, 'marketing', 'Digital Marketing', GlobeAltIcon, 2, 'Consulting',
    'Reach customers online with content, email and social media.',
    ['Content and social media planning', 'Email and push-notification campaigns', 'Basic performance tracking'],
    ['Mautic', 'OneSignal', 'Canva', 'YouTube']),
  s(33, 'marketing', 'MIS Management', BriefcaseIcon, 1, 'Consulting',
    'Make information systems support the business.',
    ['Review of systems and data flows', 'Reports and dashboards for decisions', 'Aligning tools with business goals'],
    ['Power BI', 'Tableau', 'SQL', 'Microsoft Office']),
  s(34, 'marketing', 'Project Management', ClipboardDocumentListIcon, 1, 'Consulting',
    'Plan, track and deliver software projects on time.',
    ['Scope, tasks and timelines', 'Sprint tracking and status updates', 'Risk and change handling'],
    ['GitHub', 'GitLab', 'Google Workspace', 'Microsoft Office']),

  // ── Language Services ──
  s(26, 'language', 'Translation Services', LanguageIcon, 1, 'Consulting',
    'Accurate translation between Khmer, English, Chinese, French and Lao.',
    ['Documents and website text', 'Context-aware wording, not word-for-word', 'Proofreading'],
    LANGS, 'Languages'),
  s(27, 'language', 'Polyglot Localization', GlobeAltIcon, 1, 'Consulting',
    'Adapt your product to local language, currency and habits.',
    ['Interface text and date/number formats', 'Layouts that fit longer or non-Latin text', 'Testing in each language'],
    LANGS, 'Languages'),
  s(28, 'language', 'Multilingual Support', ChatBubbleBottomCenterTextIcon, 1, 'Consulting',
    'Help teams and customers communicate across languages.',
    ['Customer and team communication', 'Meeting and document support', 'Quick turnaround'],
    LANGS, 'Languages'),
];

/* ───────── helpers ───────── */
export const getService = (id) => SERVICES.find(x => x.id === Number(id)) || null;
export const getCategory = (id) => CATEGORIES.find(c => c.id === id) || null;
export const servicesByCategory = (categoryId) => SERVICES.filter(x => x.category === categoryId);