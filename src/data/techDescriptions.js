// src/data/techDescriptions.js
// Description + bullet points shown in TechModal.
// Key = the exact `name` used in TechStack.vue.
// Format:  'Name': ['short description', ['bullet 1', 'bullet 2', 'bullet 3']]
// Missing entries are fine: the modal simply hides the description section.

const RAW = {
  // ── Frontend: languages ──────────────────────────────────────────────────
  'HTML5': ['The standard markup language that gives every web page its structure and content.', [
    'Defines headings, text, links, images, forms and media',
    'HTML5 added semantic tags such as header, nav, section and article',
    'Works together with CSS and JavaScript in every browser']],
  'CSS3': ['The style sheet language that controls how HTML looks: colors, fonts, spacing and layout.', [
    'Flexbox and Grid make modern layouts straightforward',
    'Transitions and animations add motion without JavaScript',
    'Media queries adapt a design to different screen sizes']],
  'JavaScript': ['The programming language of the web, used to make pages interactive.', [
    'Runs in every browser, and on servers through Node.js',
    'Handles events, DOM updates and asynchronous requests',
    'The foundation of Vue, React, Angular and many other tools']],
  'TypeScript': ['A superset of JavaScript that adds static types and compiles to plain JavaScript.', [
    'Catches many bugs at build time instead of at runtime',
    'Gives editors better autocomplete and refactoring',
    'Popular for large and long-lived codebases']],
  'XML': ['A markup language for storing and transporting structured data with custom tags.', [
    'Readable by both humans and machines',
    'Common in configuration files, RSS feeds and SOAP services',
    'Also used for layouts and resources in Android apps']],

  // ── Frontend: frameworks & libraries ─────────────────────────────────────
  'Vue.js': ['A progressive JavaScript framework for building user interfaces.', [
    'Reactive data binding keeps the UI in sync with state',
    'Single-file components combine template, script and style',
    'Gentle learning curve with the Composition API for larger apps']],
  'React.js': ['A JavaScript library from Meta for building component-based user interfaces.', [
    'Uses reusable components and JSX',
    'The virtual DOM updates only what changed',
    'Has a very large ecosystem of libraries and tools']],
  'Nuxt.js': ['A framework built on Vue for server-side rendered and static websites.', [
    'Supports server-side rendering and static generation',
    'File-based routing and auto-imported components',
    'A rich module ecosystem for SEO, content and more']],
  'Next.js': ['A React framework for production web apps, developed by Vercel.', [
    'Server-side rendering, static generation and server components',
    'File-based routing with built-in API routes',
    'Strong performance and SEO features out of the box']],
  'Angular': ['A TypeScript-based platform from Google for building large web applications.', [
    'Includes routing, forms, HTTP and dependency injection',
    'Opinionated structure suits big teams and enterprise apps',
    'Uses TypeScript by default']],
  'Vite.js': ['A fast build tool and development server for modern web projects.', [
    'Near-instant dev server start using native ES modules',
    'Hot Module Replacement keeps edits fast',
    'Production builds are bundled with Rollup']],
  'jQuery': ['A lightweight JavaScript library that simplifies working with the DOM.', [
    'Short selectors and easy event handling',
    'Simple AJAX helpers and cross-browser behavior',
    'Still found in many older sites and WordPress plugins']],
  'Tailwind CSS': ['A utility-first CSS framework for building designs directly in your markup.', [
    'Compose designs from small classes instead of writing custom CSS',
    'Built-in responsive and dark mode variants',
    'Unused styles are removed for small production files']],
  'Bootstrap': ['A popular CSS framework with ready-made components and a grid system.', [
    'A 12-column responsive grid',
    'Prebuilt buttons, navbars, modals and forms',
    'Great for quick prototypes and admin interfaces']],
  'shadcn/ui': ['A collection of accessible, customizable components that you copy into your own project.', [
    'Built on Radix UI and Tailwind CSS',
    'You own the code, so you can change anything',
    'Originally made for React']],
  'Material UI': ['A React component library that implements Google\'s Material Design.', [
    'A large set of ready-to-use components',
    'Powerful theming and customization',
    'Accessibility is built in']],
  'Responsive': ['The practice of making layouts adapt smoothly to any screen size.', [
    'Fluid grids and flexible images',
    'CSS media queries and a mobile-first approach',
    'One codebase for phones, tablets and desktops']],
  'PWA': ['Progressive Web Apps are web apps that can be installed and feel like native apps.', [
    'Service workers allow offline use and caching',
    'Can be added to the home screen',
    'Supports push notifications on supported platforms']],

  // ── Backend: languages ───────────────────────────────────────────────────
  'PHP': ['A server-side scripting language that powers a large part of the web.', [
    'Powers WordPress and frameworks like Laravel',
    'Works naturally with MySQL and other databases',
    'Supported by almost every web host']],
  'SQL': ['The standard language for querying and managing relational databases.', [
    'Core commands: SELECT, INSERT, UPDATE and DELETE',
    'Joins combine data from multiple tables',
    'Used by MySQL, PostgreSQL, SQLite and more']],
  'Java': ['A general-purpose, object-oriented programming language that runs on the JVM.', [
    'Widely used for enterprise backends and large systems',
    'The classic language for Android apps',
    'Strongly typed with a huge ecosystem, including Spring']],
  'C#': ['A modern, object-oriented language from Microsoft for the .NET platform.', [
    'Used for web apps with ASP.NET, desktop apps and Unity games',
    'Strongly typed, with features like LINQ and async/await',
    'Excellent tooling in Visual Studio']],
  'Python': ['A readable, general-purpose language popular for many kinds of work.', [
    'Web development with Django and Flask',
    'Data science, machine learning and AI',
    'Scripting and automation']],
  'C': ['A low-level, general-purpose language that sits close to the hardware.', [
    'Used for operating systems and embedded devices',
    'Gives manual control over memory',
    'The foundation many other languages are built on']],
  'C++': ['An extension of C with object-oriented and generic programming features.', [
    'Used where performance matters: games, browsers, engines',
    'Templates and the Standard Template Library (STL)',
    'Offers low-level control with high-level abstractions']],
  'FastAPI': ['A modern Python framework for building APIs quickly.', [
    'Uses Python type hints for validation',
    'Generates interactive API docs (Swagger / OpenAPI) automatically',
    'Supports async code and offers high performance']],

  // ── Backend: frameworks & runtimes ───────────────────────────────────────
  'Laravel': ['A PHP framework with elegant syntax for building web applications.', [
    'Eloquent ORM, Blade templates and a clean router',
    'Built-in authentication, queues and migrations',
    'Follows the MVC pattern']],
  'Laravel Backpack': ['An admin panel package for Laravel that speeds up building dashboards.', [
    'Generates CRUD interfaces quickly',
    'Customizable fields, columns and filters',
    'Saves time on back-office tools']],
  'Node.js': ['A runtime that lets JavaScript run on the server.', [
    'Built on Chrome\'s V8 engine',
    'Event-driven and non-blocking, good for I/O-heavy apps',
    'Comes with npm, the largest package registry']],
  'Express.js': ['A minimal and flexible web framework for Node.js.', [
    'Simple routing and middleware',
    'Commonly used to build REST APIs',
    'The base for many other Node frameworks']],
  'Spring Boot': ['A Java framework for building production-ready applications with minimal setup.', [
    'Auto-configuration and an embedded server',
    'Popular for REST APIs and microservices',
    'Part of the large Spring ecosystem']],
  'ASP.NET': ['Microsoft\'s framework for building web apps and APIs with C#.', [
    'MVC, Razor Pages and Web API',
    'Cross-platform on modern .NET',
    'Strong performance and tooling']],
  'Flask': ['A lightweight Python micro-framework for web apps and APIs.', [
    'Small core, extend it with only what you need',
    'Simple routing and templating with Jinja',
    'Good for small services and prototypes']],
  'Django': ['A high-level Python web framework that comes with batteries included.', [
    'Built-in ORM, admin panel and authentication',
    'Strong security features by default',
    'Encourages clean, rapid development']],
  'Fastify': ['A fast, low-overhead web framework for Node.js.', [
    'JSON schema validation built in',
    'A plugin-based architecture',
    'Designed for high-throughput APIs']],
  'Kafka': ['Apache Kafka is a distributed platform for streaming events in real time.', [
    'High-throughput publish/subscribe messaging',
    'Stores streams of events durably',
    'Used for real-time pipelines and microservice communication']],

  // ── Mobile ───────────────────────────────────────────────────────────────
  'Flutter': ['Google\'s UI toolkit for building apps for mobile, web and desktop from one codebase.', [
    'Written in Dart with a rich widget library',
    'Hot reload for fast iteration',
    'Draws its own UI for consistent look across platforms']],
  'Dart': ['A client-optimized programming language developed by Google.', [
    'The language behind Flutter',
    'Strongly typed with sound null safety',
    'Compiles to native code or JavaScript']],

  // ── Database ─────────────────────────────────────────────────────────────
  'MySQL': ['A popular open-source relational database.', [
    'A staple of the LAMP stack',
    'Reliable and fast for read-heavy workloads',
    'Works well with PHP and Laravel']],
  'PostgreSQL': ['An advanced open-source relational database known for reliability.', [
    'ACID compliant with strong standards support',
    'Supports JSONB, extensions and complex queries',
    'A common choice for serious production systems']],
  'MongoDB': ['A NoSQL database that stores data as flexible JSON-like documents.', [
    'Schemaless collections that are easy to evolve',
    'Scales horizontally with sharding',
    'Popular in the Node.js ecosystem']],
  'Atlas MongoDB (Cloud)': ['MongoDB\'s fully managed cloud database service.', [
    'Runs on AWS, Azure and Google Cloud',
    'Built-in backups, monitoring and scaling',
    'Has a free tier for small projects']],
  'SQLite': ['A lightweight, file-based SQL database engine with no server needed.', [
    'Zero configuration: the database is a single file',
    'Embedded in mobile apps, browsers and desktop software',
    'Great for prototypes and small projects']],
  'Neon DB': ['A serverless PostgreSQL platform.', [
    'Autoscaling, including scale-to-zero when idle',
    'Database branching for dev and testing',
    'Works well with serverless hosts like Vercel']],
  'Prisma': ['A modern ORM for Node.js and TypeScript.', [
    'Type-safe database queries',
    'A readable schema file with automatic migrations',
    'Includes Prisma Studio to browse data visually']],

  // ── Data interchange ─────────────────────────────────────────────────────
  // ── Data analytics ───────────────────────────────────────────────────────
  'Power BI': ['Microsoft\'s business intelligence tool for turning data into interactive reports and dashboards.', [
    'Connects to Excel, SQL databases, cloud services and more',
    'Power Query for cleaning data and DAX for calculations',
    'Reports can be shared online through the Power BI service']],
  'Tableau': ['A leading data visualization platform for exploring data and building interactive dashboards.', [
    'Drag-and-drop interface for building charts quickly',
    'Connects to spreadsheets, databases and cloud sources',
    'Widely used for business analytics and reporting']],

  'JSON': ['A lightweight, human-readable format for exchanging data.', [
    'Built from simple key-value pairs and arrays',
    'The standard format for most web APIs',
    'Supported by almost every programming language']],

  // ── API ──────────────────────────────────────────────────────────────────
  'GraphQL': ['A query language for APIs that lets clients ask for exactly the data they need.', [
    'A single endpoint instead of many',
    'A strongly typed schema',
    'Avoids over-fetching and under-fetching data']],
  'RESTful API': ['An architectural style for designing web APIs around resources and HTTP.', [
    'Uses methods like GET, POST, PUT and DELETE',
    'Each resource has its own URL',
    'Stateless, and usually returns JSON']],
  'Postman': ['A platform for building, testing and documenting APIs.', [
    'Send requests and inspect responses easily',
    'Collections and environments keep requests organized',
    'Supports automated tests and shared documentation']],
  'JWT': ['JSON Web Token is a compact, signed token used for authentication.', [
    'Made of header, payload and signature',
    'Enables stateless authentication',
    'Usually sent in the Authorization header']],
  'Hoppscotch': ['An open-source, lightweight API client that runs in the browser.', [
    'Supports REST, GraphQL and WebSocket',
    'Fast and clean interface',
    'A free alternative to Postman']],
  'Requestly API Client': ['An API client from Requestly for testing and debugging APIs.', [
    'Collections and environments for organizing requests',
    'Part of the Requestly toolset for inspecting HTTP traffic',
    'Useful for quick API testing']],
  'Webhook': ['An HTTP callback where one system sends data to a URL when an event happens.', [
    'Real-time notifications without constant polling',
    'Commonly used by payment, GitHub and chat services',
    'Typically a POST request with a JSON payload']],

  // ── CMS ──────────────────────────────────────────────────────────────────
  'WordPress': ['The most popular content management system on the web.', [
    'Thousands of themes and plugins',
    'Used for blogs, business sites and stores (WooCommerce)',
    'Built with PHP and MySQL']],
  'Drupal': ['A powerful open-source CMS for complex, content-heavy sites.', [
    'Flexible content modeling',
    'Strong security and fine-grained permissions',
    'Often chosen for enterprise and government sites']],
  'Joomla': ['An open-source CMS for building websites and online applications.', [
    'Built-in multilingual support',
    'Extensible with components, modules and plugins',
    'Flexible user and access management']],
  'Ecwid': ['An e-commerce platform that adds an online store to an existing website.', [
    'Embeds in websites and social channels',
    'Handles products, orders and payments',
    'Quick to set up without a full custom build']],
  'Mautic': ['An open-source marketing automation platform.', [
    'Email campaigns and audience segmentation',
    'Lead tracking and scoring',
    'Landing pages and forms']],

  // ── Services ─────────────────────────────────────────────────────────────
  'OneSignal': ['A messaging service for push notifications and more.', [
    'Web push, mobile push, email and in-app messages',
    'Audience segmentation and delivery analytics',
    'SDKs for many platforms']],
  'Tinode': ['An open-source instant messaging server.', [
    'Self-hosted chat infrastructure',
    'Web and mobile clients available',
    'Supports one-to-one and group conversations']],
  'Telegram Bot': ['Automated accounts on Telegram that are controlled through the Bot API.', [
    'Respond to commands, buttons and messages',
    'Work via webhooks or long polling',
    'Used for notifications, support and automation']],
  'Clerk': ['An authentication and user management platform.', [
    'Prebuilt sign-in and sign-up components',
    'Social logins, multi-factor auth and session handling',
    'SDKs for React, Next.js and more']],
  'Stripe': ['A payment platform for accepting money online.', [
    'Cards, wallets and many payment methods',
    'Subscriptions, invoices and checkout pages',
    'A well-documented API with webhooks']],

  // ── DevOps ───────────────────────────────────────────────────────────────
  'Git': ['A distributed version control system for tracking changes in code.', [
    'Branching and merging make teamwork easier',
    'Works offline with full local history',
    'The industry standard for version control']],
  'GitHub': ['A platform for hosting Git repositories and collaborating on code.', [
    'Pull requests, issues and code review',
    'GitHub Actions for CI/CD automation',
    'Home to a huge open-source community']],
  'GitLab': ['A DevOps platform with Git hosting and built-in CI/CD.', [
    'Issue tracking and merge requests',
    'Integrated pipelines for build and deploy',
    'Can be self-hosted']],
  'Netlify': ['A hosting platform for modern web projects.', [
    'Deploys automatically from Git',
    'Serverless functions and form handling',
    'Global CDN with deploy previews']],
  'Vercel': ['A cloud platform for frontend and full-stack web apps, and the creators of Next.js.', [
    'Git-based deployments with preview URLs',
    'Global edge network',
    'Serverless functions built in']],
  'Pantheon': ['A website operations platform focused on Drupal and WordPress.', [
    'Separate dev, test and live environments',
    'Automated backups and built-in CDN',
    'Multidev environments for team workflows']],
  'Apache': ['The Apache HTTP Server, one of the most widely used web servers.', [
    'Configurable with .htaccess and modules like mod_rewrite',
    'A core part of the LAMP stack',
    'Long track record of stability']],
  'Docker': ['A platform for packaging applications into containers.', [
    'Bundles an app with all its dependencies',
    'Runs the same way on any machine',
    'Dockerfile and Docker Compose define environments as code']],
  'DigitalOcean': ['A cloud provider known for simple, developer-friendly infrastructure.', [
    'Droplets: virtual private servers',
    'Managed databases, Kubernetes and an app platform',
    'Straightforward, predictable pricing']],
  'AWS': ['Amazon Web Services, a comprehensive cloud computing platform.', [
    'Services like EC2, S3, Lambda and RDS',
    'Global infrastructure with pay-as-you-go pricing',
    'Covers hosting, storage, databases and AI']],
  'Linux': ['An open-source operating system family used across servers and devices.', [
    'Runs most servers and cloud infrastructure',
    'A powerful command line',
    'Secure, stable and highly customizable']],
  'Ubuntu': ['A popular, beginner-friendly Linux distribution based on Debian.', [
    'Common on servers and in the cloud',
    'Long-term support (LTS) releases',
    'Large community and documentation']],

  // ── Dev tools ────────────────────────────────────────────────────────────
  'VS Code': ['A free, lightweight code editor from Microsoft.', [
    'A huge library of extensions',
    'Integrated terminal and Git support',
    'IntelliSense and a built-in debugger']],
  'Visual Studio': ['Microsoft\'s full-featured IDE for Windows development.', [
    'Great for C#, .NET and C++ projects',
    'Powerful debugging and profiling tools',
    'Project templates and integrated tooling']],
  'WAMP': ['A local server stack for Windows made of Apache, MySQL and PHP.', [
    'Run PHP projects on your own computer',
    'Includes phpMyAdmin for database management',
    'Handy for offline development and testing']],
  'XAMPP': ['A cross-platform local server package with Apache, MariaDB, PHP and Perl.', [
    'Simple control panel to start and stop services',
    'Runs on Windows, Linux and macOS',
    'Quick way to set up a local PHP environment']],
  'Laragon': ['A fast, lightweight local development environment for Windows.', [
    'Quick startup with automatic virtual hosts',
    'Supports PHP, Node.js, Python and more',
    'Popular for Laravel projects']],
  'Ngrok': ['A tool that exposes a local server to the internet through a secure tunnel.', [
    'Gives your local app a public HTTPS URL',
    'Great for testing webhooks',
    'Easy way to share a demo before deploying']],
  'Navicat': ['A graphical database management and design tool.', [
    'Works with MySQL, PostgreSQL, SQLite, MongoDB and more',
    'Visual query builder and data editor',
    'Data transfer and synchronization features']],
  'phpMyAdmin': ['A web-based tool for administering MySQL and MariaDB.', [
    'Browse tables and run SQL queries in the browser',
    'Import and export data',
    'Manage users and permissions']],
  'npm': ['The Node Package Manager, the default package manager for Node.js.', [
    'Installs and manages JavaScript packages',
    'Dependencies are tracked in package.json',
    'Runs project scripts for build, test and dev']],
  'npx': ['A tool for running npm packages without installing them globally.', [
    'Ships with npm',
    'Perfect for scaffolding commands like create-vite',
    'Always runs the version you ask for']],
  'pnpm': ['A fast, disk-efficient package manager for JavaScript.', [
    'Shares packages between projects to save space',
    'Strict dependency handling avoids phantom dependencies',
    'Built-in workspace support for monorepos']],
  'Turborepo': ['A high-performance build system for JavaScript and TypeScript monorepos.', [
    'Caches build outputs to avoid repeated work',
    'Runs tasks in parallel',
    'Supports remote caching for teams']],
  'WSL (Windows Subsystem for Linux)': ['A Windows feature that runs a Linux environment without a full virtual machine.', [
    'Use Bash and Linux tools directly on Windows',
    'Supports distributions such as Ubuntu',
    'Files can be shared between Windows and Linux']],
  'CMD Prompt': ['The classic Windows command-line interpreter.', [
    'Run commands and batch scripts',
    'Handy for file and network tasks',
    'Built into every Windows installation']],
  'PowerShell': ['Microsoft\'s task automation shell and scripting language.', [
    'Object-based pipeline instead of plain text',
    'Powerful cmdlets for system administration',
    'Cross-platform in modern versions']],

  // ── Design ───────────────────────────────────────────────────────────────
  'Figma': ['A collaborative, browser-based interface design tool.', [
    'UI/UX design and interactive prototyping',
    'Real-time collaboration with teammates',
    'Components and Auto Layout for reusable designs']],
  'Photoshop': ['Adobe\'s industry-standard image editing software.', [
    'Photo retouching and compositing',
    'Layers, masks and powerful selection tools',
    'Used for web, print and digital art']],
  'Canva': ['An online design platform with templates and drag-and-drop editing.', [
    'Social posts, presentations and posters',
    'Large library of templates and assets',
    'Easy for non-designers']],
  'CapCut': ['A video editing app for creating short-form content.', [
    'Templates, effects and automatic captions',
    'Available on mobile and desktop',
    'Popular for social media videos']],

  // ── Productivity ─────────────────────────────────────────────────────────
  'Office 365': ['Microsoft\'s subscription suite of productivity apps and cloud services (now Microsoft 365).', [
    'Includes Word, Excel, PowerPoint and Outlook',
    'Cloud storage with OneDrive',
    'Real-time collaboration across devices']],
  'Word': ['Microsoft\'s word processor for documents and reports.', [
    'Styles, templates and page layout tools',
    'Track changes and comments for review',
    'Uses the .docx format']],
  'Excel': ['Microsoft\'s spreadsheet application for data and calculations.', [
    'Formulas, functions and pivot tables',
    'Charts for visualizing data',
    'Widely used for analysis and reporting']],
  'PowerPoint': ['Microsoft\'s presentation software.', [
    'Slide templates, themes and animations',
    'Presenter view and speaker notes',
    'Can export to PDF or video']],
  'PDF': ['Portable Document Format, a standard for sharing documents.', [
    'Looks the same on every device',
    'Good for printing and sharing final documents',
    'Supports forms, signatures and passwords']],
  'Outlook': ['Microsoft\'s email and calendar application.', [
    'Email, calendar, contacts and tasks in one place',
    'Rules and filters to organize your inbox',
    'Integrates with Teams and Microsoft 365']],
  'OneDrive': ['Microsoft\'s cloud storage service.', [
    'Syncs files across devices',
    'Easy file and folder sharing',
    'Integrated with Office apps']],
  'Access': ['Microsoft\'s desktop database application.', [
    'Tables, queries, forms and reports in one tool',
    'Good for small business databases',
    'Supports automation with VBA']],
  'OneNote': ['Microsoft\'s digital notebook app.', [
    'Organizes notes in notebooks, sections and pages',
    'Supports text, drawings, images and clippings',
    'Syncs across devices']],
  'Teams': ['Microsoft\'s hub for chat, meetings and collaboration.', [
    'Channels and direct messages',
    'Video meetings and screen sharing',
    'File sharing integrated with Microsoft 365']],
  'Google Docs': ['Google\'s online word processor.', [
    'Real-time collaboration with comments and suggestions',
    'Saves automatically to Google Drive',
    'Accessible from any browser']],
  'Gmail': ['Google\'s email service.', [
    'Powerful search, labels and filters',
    'Integrates with Google Workspace',
    'Strong spam protection']],
  'Chrome': ['Google\'s web browser.', [
    'Fast engine with powerful DevTools',
    'Huge extension library',
    'Syncs bookmarks and settings across devices']],
  'Dropbox': ['A cloud storage and file synchronization service.', [
    'Shared folders and links',
    'Version history and file recovery',
    'Syncs across devices']],
  'Proton Mail': ['A privacy-focused, end-to-end encrypted email service from Switzerland.', [
    'Zero-access encryption for your messages',
    'Open-source apps',
    'No ad tracking']],
  'Proton Drive': ['Encrypted cloud storage from Proton.', [
    'End-to-end encrypted files',
    'Secure sharing with access controls',
    'Part of the Proton privacy ecosystem']],
  'Proton Pass': ['A password manager from Proton.', [
    'End-to-end encrypted password storage',
    'Email aliases to hide your real address',
    'Supports two-factor codes and passkeys']],
  'Proton VPN': ['A privacy-focused VPN service from Proton.', [
    'Strict no-logs policy',
    'Open-source apps',
    'Encrypts your connection on public networks']],

  // ── AI tools ─────────────────────────────────────────────────────────────
  'Gemini': ['Google\'s AI model and assistant, developed by Google DeepMind.', [
    'Multimodal: text, images and more',
    'Integrated with Google services',
    'Used for writing, research and coding help']],
  'Claude': ['An AI assistant developed by Anthropic.', [
    'Strong at writing, analysis and coding',
    'Handles long documents and conversations',
    'Available in chat apps, through an API and in Claude Code']],
  'Grok': ['An AI assistant developed by xAI.', [
    'Integrated with the X platform',
    'Available through X and its own apps',
    'Handles chat, writing and coding questions']],
  'ChatGPT': ['OpenAI\'s conversational AI assistant.', [
    'Writing, brainstorming, coding and analysis',
    'Can work with images and uploaded files',
    'Custom GPTs for specialized tasks']],
  'Poe': ['A platform by Quora for chatting with many AI models in one place.', [
    'Access multiple models from one app',
    'Compare responses between models',
    'Create and use custom bots']],

  // ── Spoken languages ─────────────────────────────────────────────────────
  'Khmer': ['The official language of Cambodia, spoken by roughly 16 million people.', [
    'Written in the Khmer script, an abugida',
    'Words are usually written without spaces between them',
    'Rich Pali and Sanskrit influence in vocabulary']],
  'English': ['A global lingua franca and the dominant language of technology.', [
    'Most programming documentation is written in English',
    'Widely used in business, science and the internet',
    'Written in the Latin alphabet']],
  'Chinese': ['Mandarin Chinese, the most widely spoken native language in the world.', [
    'Written with Chinese characters',
    'A tonal language',
    'Important for business and trade in Asia']],
  'French': ['A Romance language spoken across Europe, Africa and beyond.', [
    'An official language in many countries',
    'A working language of the UN and the EU',
    'Written in the Latin alphabet with accents']],
  'Thai': ['The official language of Thailand.', [
    'A tonal language with five tones',
    'Has its own script',
    'Shares some vocabulary with Lao and Khmer']],
  'Lao': ['The official language of Laos.', [
    'Closely related to Thai',
    'A tonal language with its own script',
    'Spoken across Laos and parts of northeastern Thailand']],
  'Burmese': ['The official language of Myanmar.', [
    'Part of the Sino-Tibetan language family',
    'Written in a rounded script',
    'A tonal language']],
};

export const TECH_INFO = Object.fromEntries(
  Object.entries(RAW).map(([name, [about, points]]) => [name, { about, points }])
);