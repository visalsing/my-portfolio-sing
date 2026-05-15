import { ref, computed, watch } from "vue";

// 1. The JSON Data
const translations = {
  en: {
    // Navbar
    home: "Home",
    about_me: "About Me",
    skills: "Skills",
    services: "Services",
    projects: "Projects",
    testimonials: "Testimonials",
    contacts: "Contacts",
    settings: "Settings",
    lets_talk: "Let's Talk",

    // Hero
    hi_im: "Hi, I'm",
    visalsing: "So Visalsing",
    hero_long_text:
      "I\'m Visalsing, and a software developer. My skills are to create and develop website, front-end, back-end, responsive design, email marketing and more. Here is my CV below! You can click on the button to download my CV.",
    contact_me: "Contact Me",
    download_cv: "Download CV",

    // About Me
    about_: "About",
    _me: " Me",
    about_me_long_text:
      "I am a passionate developer dedicated to building high-quality web applications. With a focus on performance and user experience, I bridge the gap between design and code.",
    two_years_experience: "2 Years Experience",
    view_portfolio: "View Portfolio",
    see_more: "See More",

    // Skills & Experience
    experiences: "Experience",
    skill_subtitle: "My technical expertise and professional journey",
    technical_skills: "Technical Skills",
    linguistic_skills: "Linguistic Skills",
    soft_skills: "Soft Skills",
    hobbies_interests: "Hobbies & Interests",
    tech_stack: "Tech Stack",
    work_experience: "Work Experience",
    education_history: "Education History",
    additional_skills: "Additional Skills",
    click_to_see_more: "Click to see more!",
    show_less: "Show Less",

    // My Services
    my1_: "My",
    _my2: " ",
    services: "Services",
    services_subtitle:
      "From initial design to final deployment, I provide comprehensive digital solutions to help you build, launch, and grow your software products.",

    // Client Testimonials
    client1_: "Client",
    _client2: " ",

    // Settings
    portfolio_themes: "Portfolio Themes",
    accent_colors: "Accent Colors",
    languages: "Languages",
    save_return: "Save & Return",
    reset: "Reset to Default",
    customize: "Customize your portfolio experience",

    // ServiceDetail
    details: "Details",
    click_to_return: "Click to return!",
  },
  km: {
    // Navbar
    home: "ទំព័រដើម",
    about_me: "អំពីខ្ញុំ",
    skills: "ជំនាញ",
    services: "សេវាកម្ម",
    projects: "គម្រោង",
    testimonials: "សក្ខីកម្ម",
    contacts: "ទំនាក់ទំនង",
    settings: "ការកំណត់",
    lets_talk: " តោះជជែក",

    // Hero
    hi_im: "សួស្ដី ខ្ញុំបាទឈ្មោះថា",
    visalsing: "សោ វិសាលស៊ីង",
    hero_long_text:
      "ខ្ញុំឈ្មោះវិសាលស៊ីងនិងជាអ្នកសរសេរកម្មវិធីសូហ្វវែរ។ ជំនាញរបស់ខ្ញុំគឺបង្កើតនិងសរសេរគេហទំព៍រ ​ផ្នែកខាងមុខ ផ្នែកខាងក្រោយ ការរចនារេស្ប៉នស៊ីវ អ៊ីមែលទីផ្សារ និងបន្ថែមពីនេះទៀត។ ខាងក្រោមនេះគឺជាស៊ីវីរបស់ខ្ញុំ។ លោកអ្នកអាចចុចទៅលើប៊ូតុងដើម្បីទាញយក CV របស់ខ្ញុំ។",
    contact_me: "ទំនាក់ទំនងមកខ្ញុំ",
    download_cv: "ទាញយក CV",

    // About Me
    about_: "អំពី",
    _me: "ខ្ញុំ",
    about_me_long_text:
      "ខ្ញុំជាអ្នកបង្កើតកម្មវិធីដែលពេញចិត្តក្នុងការបង្កើតកម្មវិធីគេហទំព័រដែលមានគុណភាពខ្ពស់។ ដោយផ្តោតលើការអនុវត្ត និងបទពិសោធន៍អ្នកប្រើប្រាស់ ខ្ញុំបានភ្ជាប់គម្លាតរវាងការរចនា និងកូដ។",
    two_years_experience: "បទពិសោធន៍២ឆ្នាំ",
    view_portfolio: "មើលផលប័ត្រ",
    see_more: "មើលបន្ថែម",

    // Skills & Experience
    experiences: "បទពិសោធន៍",
    skill_subtitle: "ជំនាញបច្ចេកទេស និងការធ្វើដំណើរប្រកបដោយវិជ្ជាជីវៈរបស់ខ្ញុំ",
    technical_skills: "ជំនាញបច្ចេកទេស",
    linguistic_skills: "ជំនាញភាសា",
    soft_skills: "ជំនាញទន់",
    hobbies_interests: "ទម្លាប់ជាប្រចាំ & ចំណាប់អារម្មណ៍",
    tech_stack: "Tech Stack",
    work_experience: "បទពិសោធន៍ការងារ",
    education_history: "ប្រវត្តិនៃការសិក្សា",
    additional_skills: "ជំនាញបន្ថែម",
    click_to_see_more: "ចុចដើម្បីមើលបន្ថែម!",
    show_less: "បង្ហាញតិច",

    // My Services
    my1_: " ",
    _my2: "របស់ខ្ញុំ",
    services: "សេវាកម្ម",
    services_subtitle:
      "ចាប់ពីការរចនាដំបូង រហូតដល់ការដាក់ឱ្យដំណើរការជាផ្លូវការ ខ្ញុំផ្តល់ជូននូវដំណោះស្រាយបច្ចេកវិទ្យាគ្រប់ជ្រុងជ្រោយ ដើម្បីជួយអ្នកក្នុងការបង្កើត និងអភិវឌ្ឍផលិតផលឌីជីថលឱ្យកាន់តែរីកចម្រើន។",

    // Client Testimonials
    client1_: " ",
    _client2: "អតិថិជន",

    // Settings
    portfolio_themes: "តែមកម្មវិធី",
    accent_colors: "ពណ៌ចម្បង",
    languages: "ភាសា",
    save_return: "រក្សាទុក & ត្រឡប់ក្រោយ",
    reset: "កំណត់ឡើងវិញ",
    customize: "ប្ដូរតាមបំណងនូវបទពិសោធន៍ផលប័ត្ររបស់អ្នក",

    // ServiceDetail
    details: "ព័ត៌មានលម្អិត",
    click_to_return: "ចុចដើម្បីត្រឡប់ទៅវិញ!",
  },
  zh: {
    // Navbar
    home: "首页",
    about_me: "关于我",
    skills: "技能",
    services: "服务",
    projects: "项目",
    testimonials: "客户评价",
    contacts: "联系方式",
    settings: "设置",
    lets_talk: "开始交谈",

    // Hero
    hi_im: "你好，我是",
    visalsing: "So Visalsing",
    hero_long_text:
      "我是 Visalsing，一名软件开发人员。我的技能包括网站创建与开发、前端、后端、响应式设计、邮件营销等。这是我的简历！您可以点击按钮下载。",
    contact_me: "联系我",
    download_cv: "下载简历",

    // About Me
    about_: "关于",
    _me: "我",
    about_me_long_text:
      "我是一名热衷于构建高质量 Web 应用程序的开发人员。我专注于性能和用户体验，弥合设计与代码之间的鸿沟。",
    two_years_experience: "2年经验",
    view_portfolio: "查看作品集",
    see_more: "查看更多",

    // Skills & Experience
    experiences: "经验",
    skill_subtitle: "我的技术专长和职业历程",
    technical_skills: "技术技能",
    linguistic_skills: "语言技能",
    soft_skills: "软技能",
    hobbies_interests: "兴趣爱好",
    tech_stack: "技术栈",
    work_experience: "工作经验",
    education_history: "教育经历",
    additional_skills: "附加技能",
    click_to_see_more: "点击查看更多！",
    show_less: "收起",

    // My Services
    my1_: "我的",
    _my2: " ",
    services: "服务",
    services_subtitle:
      "从最初的设计到最终的上线部署，我提供全方位的数字解决方案，助力您构建、发布并扩展您的软件产品。",

    // Client Testimonials
    client1_: "客户",
    _client2: " ",

    // Settings
    portfolio_themes: "作品集主题",
    accent_colors: "强调色",
    languages: "语言",
    save_return: "保存并返回",
    reset: "重置为默认",
    customize: "自定义您的作品集体验",

    // ServiceDetail (WAS MISSING)
    details: "详情",
    click_to_return: "点击返回！",
  },
  fr: {
    // Navbar
    home: "Accueil",
    about_me: "À propos",
    skills: "Compétences",
    services: "Services",
    projects: "Projets",
    testimonials: "Témoignages",
    contacts: "Contacts",
    settings: "Paramètres",
    lets_talk: "Discutons",

    // Hero
    hi_im: "Salut, je suis",
    visalsing: "So Visalsing",
    hero_long_text:
      "Je suis Visalsing, développeur logiciel. Mes compétences incluent la création et le développement de sites web, le front-end, le back-end, le design réactif, l'email marketing et plus encore. Voici mon CV ci-dessous ! Cliquez sur le bouton pour le télécharger.",
    contact_me: "Contactez-moi",
    download_cv: "Télécharger CV",

    // About Me
    about_: "À propos",
    _me: " de moi",
    about_me_long_text:
      "Je suis un développeur passionné dédié à la création d'applications web de haute qualité. En mettant l'accent sur la performance et l'expérience utilisateur, je fais le pont entre le design et le code.",
    two_years_experience: "2 ans d'expérience",
    view_portfolio: "Voir Portfolio",
    see_more: "Voir plus",

    // Skills & Experience
    experiences: "Expérience",
    skill_subtitle: "Mon expertise technique et mon parcours professionnel",
    technical_skills: "Compétences techniques",
    linguistic_skills: "Compétences linguistiques",
    soft_skills: "Savoir-être",
    hobbies_interests: "Loisirs et Intérêts",
    tech_stack: "Stack Technique",
    work_experience: "Expérience Professionnelle",
    education_history: "Formation",
    additional_skills: "Compétences Additionnelles",
    click_to_see_more: "Cliquez pour en voir plus !",
    show_less: "Réduire",

    // My Services
    my1_: "Mes",
    _my2: " ",
    services: "Services",

    // Client Testimonials
    client1_: "Témoignages",
    _client2: " clients",
    services_subtitle:
      "De la conception initiale au déploiement final, je propose des solutions numériques complètes pour vous aider à construire, lancer et développer vos produits logiciels.",

    // Settings
    portfolio_themes: "Thèmes du Portfolio",
    accent_colors: "Couleurs d'accentuation",
    languages: "Langues",
    save_return: "Enregistrer et Retourner",
    reset: "Réinitialiser",
    customize: "Personnalisez votre expérience de portfolio",

    // ... customize: "...",
    details: "Détails",
    click_to_return: "Cliquez pour revenir !",
  },
  lo: {
    // Navbar
    home: "ໜ້າຫຼັກ",
    about_me: "ກ່ຽວກັບຂ້ອຍ",
    skills: "ທັກສະ",
    services: "ການບໍລິການ",
    projects: "ໂຄງການ",
    testimonials: "ຄຳຊົມເຊີຍ",
    contacts: "ຕິດຕໍ່",
    settings: "ການຕັ້ງຄ່າ",
    lets_talk: "ມາລົມກັນ",

    // Hero
    hi_im: "ສະບາຍດີ, ຂ້ອຍແມ່ນ",
    visalsing: "So Visalsing",
    hero_long_text:
      "ຂ້ອຍແມ່ນ Visalsing, ເປັນນັກພັດທະນາຊອບແວ. ທັກສະຂອງຂ້ອຍແມ່ນການສ້າງ ແລະ ພັດທະນາເວັບໄຊທ໌, front-end, back-end, ການອອກແບບ responsive, ການຕະຫຼາດຜ່ານອີເມວ ແລະ ອື່ນໆ. ນີ້ແມ່ນ CV ຂອງຂ້ອຍຢູ່ລຸ່ມນີ້! ທ່ານສາມາດກົດປຸ່ມເພື່ອດາວໂຫລດ CV ຂອງຂ້ອຍໄດ້.",
    contact_me: "ຕິດຕໍ່ຂ້ອຍ",
    download_cv: "ດາວໂຫລດ CV",

    // About Me
    about_: "ກ່ຽວກັບ",
    _me: " ຂ້ອຍ",
    about_me_long_text:
      "ຂ້ອຍເປັນນັກພັດທະນາທີ່ມີຄວາມມຸ່ງໝັ້ນໃນການສ້າງແອັບພລິເຄຊັນເວັບທີ່ມີຄຸນນະພາບສູງ. ດ້ວຍການເນັ້ນໃສ່ປະສິດທິພາບ ແລະ ປະສົບການຂອງຜູ້ໃຊ້, ຂ້ອຍເຊື່ອມຕໍ່ຊ່ອງຫວ່າງລະຫວ່າງການອອກແບບ ແລະ ໂຄ້ດ.",
    two_years_experience: "ປະສົບການ 2 ປີ",
    view_portfolio: "ເບິ່ງຜົນງານ",
    see_more: "ເບິ່ງເພີ່ມເຕີມ",

    // Skills & Experience
    experiences: "ປະສົບການ",
    skill_subtitle: "ຄວາມຊ່ຽວຊານດ້ານເຕັກນິກ ແລະ ເສັ້ນທາງວິຊາຊີບຂອງຂ້ອຍ",
    technical_skills: "ທັກສະດ້ານເຕັກນິກ",
    linguistic_skills: "ທັກສະດ້ານພາສາ",
    soft_skills: "ທັກສະທາງສັງຄົມ",
    hobbies_interests: "ວຽກອະດິເລກ ແລະ ຄວາມສົນໃຈ",
    tech_stack: "Tech Stack",
    work_experience: "ປະສົບການເຮັດວຽກ",
    education_history: "ປະຫວັດການສຶກສາ",
    additional_skills: "ທັກສະເພີ່ມເຕີມ",
    click_to_see_more: "ຄລິກເພື່ອເບິ່ງເພີ່ມເຕີມ!",
    show_less: "ສະແດງໜ້ອຍລົງ",

    // My Services
    my1_: "ການບໍລິການ",
    _my2: " ຂອງຂ້ອຍ",
    services: " ",
    services_subtitle:
      "ເລີ່ມຕົ້ນຕັ້ງແຕ່ການອອກແບບ ຈົນເຖິງການຕິດຕັ້ງລະບົບຕົວຈິງ, ຂ້ອຍມີວິທີການແກ້ໄຂບັນຫາແບບຄົບວົງຈອນ ເພື່ອຊ່ວຍເຈົ້າໃນການສ້າງ ແລະ ຂະຫຍາຍຜະລິດຕະພັນຊອບແວໃຫ້ເຕີບໃຫຍ່.",

    // Client Testimonials
    client1_: "ຄຳຊົມເຊີຍ",
    _client2: " ຈາກລູກຄ້າ",

    // Settings
    portfolio_themes: "ທີມຂອງໂປຣໄຟລ໌",
    accent_colors: "ສີເນັ້ນ",
    languages: "ພາສາ",
    save_return: "ບັນທຶກ ແລະ ກັບຄືນ",
    reset: "ຕັ້ງຄ່າຄືນໃໝ່",
    customize: "ປັບແຕ່ງປະສົບການ portfolio ຂອງທ່ານ",

    // ... customize: "...",
    details: "ລາຍລະອຽດ",
    click_to_return: "ຄລິກເພື່ອັບຄືນ!",
  },
  my: {
    // Navbar
    home: "ပင်မစာမျက်နှာ",
    about_me: "ကျွန်ုပ်အကြောင်း",
    skills: "ကျွမ်းကျင်မှုများ",
    services: "ဝန်ဆောင်မှုများ",
    projects: "ပရောဂျက်များ",
    testimonials: "သုံးသပ်ချက်များ",
    contacts: "ဆက်သွယ်ရန်",
    settings: "ဆက်တင်များ",
    lets_talk: "စကားပြောရအောင်",

    // Hero
    hi_im: "မင်္ဂလာပါ၊ ကျွန်တော်က",
    visalsing: "So Visalsing",
    hero_long_text:
      "ကျွန်တော်က Visalsing ပါ၊ ဆော့ဖ်ဝဲလ်ရေးဆွဲသူတစ်ဦးဖြစ်ပါတယ်။ ဝဘ်ဆိုဒ်များ ဖန်တီးခြင်း၊ front-end၊ back-end၊ responsive ဒီဇိုင်း၊ email marketing နဲ့ အခြားအရာတွေကို ကျွမ်းကျင်ပါတယ်။ ကျွန်တော့်ရဲ့ CV ကို အောက်မှာ ကြည့်နိုင်ပါတယ်! ခလုတ်ကိုနှိပ်ပြီး CV ကို ဒေါင်းလုဒ်ဆွဲနိုင်ပါတယ်။",
    contact_me: "ဆက်သွယ်ရန်",
    download_cv: "CV ဒေါင်းလုဒ်လုပ်ရန်",

    // About Me
    about_: "ကျွန်ုပ်",
    _me: " အကြောင်း",
    about_me_long_text:
      "ကျွန်တော်သည် အရည်အသွေးမြင့် ဝဘ်အပလီကေးရှင်းများကို တည်ဆောက်ရန် စိတ်အားထက်သန်သော developer တစ်ဦးဖြစ်သည်။ စွမ်းဆောင်ရည်နှင့် အသုံးပြုသူအတွေ့အကြုံကို အဓိကထားပြီး ဒီဇိုင်းနှင့် ကုဒ်ကြားက ကွာဟချက်ကို ပေါင်းကူးပေးပါတယ်။",
    two_years_experience: "လုပ်ငန်းအတွေ့အကြုံ ၂ နှစ်",
    view_portfolio: "Portfolio ကြည့်ရန်",
    see_more: "ပိုမိုကြည့်ရှုရန်",

    // Skills & Experience
    experiences: "အတွေ့အကြုံ",
    skill_subtitle:
      "ကျွန်ုပ်၏ နည်းပညာပိုင်းဆိုင်ရာ ကျွမ်းကျင်မှုနှင့် ပရော်ဖက်ရှင်နယ် ခရီးစဉ်",
    technical_skills: "နည်းပညာဆိုင်ရာ ကျွမ်းကျင်မှုများ",
    linguistic_skills: "ဘာသာစကား ကျွမ်းကျင်မှုများ",
    soft_skills: "နူးညံ့သော ကျွမ်းကျင်မှုများ",
    hobbies_interests: "ဝါသနာနှင့် စိတ်ဝင်စားမှုများ",
    tech_stack: "Tech Stack",
    work_experience: "လုပ်ငန်းအတွေ့အကြုံ",
    education_history: "ပညာအရည်အချင်း",
    additional_skills: "နောက်ထပ် ကျွမ်းကျင်မှုများ",
    click_to_see_more: "ပိုမိုကြည့်ရှုရန် နှိပ်ပါ!",
    show_less: "နည်းနည်းပဲပြရန်",

    // My Services
    my1_: "ကျွန်ုပ်၏",
    _my2: " ",
    services: "ဝန်ဆောင်မှုများ",
    services_subtitle:
      "ကနဦး ဒီဇိုင်းဆွဲခြင်းမှသည် နောက်ဆုံး လက်တွေ့အသုံးပြုနိုင်သည်အထိ၊ သင်၏ ဆော့ဖ်ဝဲလ်ထုတ်ကုန်များကို တည်ဆောက်ရန်၊ စတင်ရန်နှင့် တိုးတက်စေရန်အတွက် ပြည့်စုံသော ဒစ်ဂျစ်တယ်ဖြေရှင်းချက်များကို ကျွန်ုပ်ဆောင်ရွက်ပေးပါသည်။",

    // Client Testimonials
    client1_: "ဖောက်သည်",
    _client2: " များ၏ သုံးသပ်ချက်",

    // Settings
    portfolio_themes: "Portfolio အပြင်အဆင်များ",
    accent_colors: "အဓိကအရောင်များ",
    languages: "ဘာသာစကားများ",
    save_return: "သိမ်းဆည်းပြီး ပြန်ထွက်ရန်",
    reset: "မူလအတိုင်း ပြန်ထားရန်",
    customize: "သင်၏ portfolio အတွေ့အကြုံကို စိတ်ကြိုက်ပြင်ဆင်ပါ",
  },
  th: {
    // Navbar
    home: "หน้าแรก",
    about_me: "เกี่ยวกับฉัน",
    skills: "ทักษะ",
    services: "บริการ",
    projects: "ผลงาน",
    testimonials: "คำนิยม",
    contacts: "ติดต่อ",
    settings: "การตั้งค่า",
    lets_talk: "มาคุยกันเถอะ",

    // Hero
    hi_im: "สวัสดีครับ ผมชื่อ",
    visalsing: "โส วิสาลซิง",
    hero_long_text:
      "ผมเป็นนักพัฒนาซอฟต์แวร์ที่มีความเชี่ยวชาญในการสร้างและพัฒนาเว็บไซต์ ทั้งส่วนหน้าบ้าน (Front-end), หลังบ้าน (Back-end), การออกแบบที่รองรับทุกหน้าจอ (Responsive Design), อีเมลการตลาด และอื่นๆ อีกมากมาย นี่คือ Resume ของผม คุณสามารถคลิกที่ปุ่มด้านล่างเพื่อดาวน์โหลดได้ครับ",
    contact_me: "ติดต่อผม",
    download_cv: "ดาวน์โหลด CV",

    // About Me
    about_: "เกี่ยวกับ",
    _me: "ตัวฉัน",
    about_me_long_text:
      "ผมเป็นนักพัฒนาที่มุ่งมั่นในการสร้างสรรค์เว็บแอปพลิเคชันที่มีคุณภาพสูง โดยเน้นที่ประสิทธิภาพและการใช้งานของผู้ใช้เป็นหลัก เพื่อเชื่อมโยงระหว่างการออกแบบและการเขียนโค้ดให้สมบูรณ์แบบที่สุด",
    two_years_experience: "ประสบการณ์ 2 ปี",
    view_portfolio: "ดูผลงาน",
    see_more: "ดูเพิ่มเติม",

    // Skills & Experience
    experiences: "ประสบการณ์",
    skill_subtitle: "ทักษะทางเทคนิคและเส้นทางในวิชาชีพของผม",
    technical_skills: "ทักษะทางเทคนิค",
    linguistic_skills: "ทักษะทางภาษา",
    soft_skills: "ทักษะทางสังคม (Soft Skills)",
    hobbies_interests: "งานอดิเรกและความสนใจ",
    tech_stack: "Tech Stack",
    work_experience: "ประสบการณ์การทำงาน",
    education_history: "ประวัติการศึกษา",
    additional_skills: "ทักษะเพิ่มเติม",
    click_to_see_more: "คลิกเพื่อดูเพิ่มเติม!",
    show_less: "แสดงน้อยลง",

    // My Services
    my1_: " ",
    _my2: "ของผม",
    services: "บริการ",
    services_subtitle:
      "ตั้งแต่การออกแบบเริ่มต้นไปจนถึงการเปิดใช้งานจริง ผมพร้อมมอบโซลูชันทางเทคโนโลยีที่ครบวงจร เพื่อช่วยคุณสร้างและพัฒนาผลิตภัณฑ์ดิจิทัลให้เติบโต",

    // Client Testimonials
    client1_: " ",
    _client2: "ลูกค้า",

    // Settings
    portfolio_themes: "ธีมพอร์ตโฟลิโอ",
    accent_colors: "สีเน้น",
    languages: "ภาษา",
    save_return: "บันทึกและกลับหน้าเดิม",
    reset: "รีเซ็ต",
    customize: "ปรับแต่งประสบการณ์การเข้าชมพอร์ตโฟลิโอของคุณ",

    // ServiceDetail
    details: "รายละเอียด",
    click_to_return: "คลิกเพื่อกลับ!",
  },
  ja: {
    // Navbar
    home: "ホーム",
    about_me: "自己紹介",
    skills: "スキル",
    services: "サービス",
    projects: "プロジェクト",
    testimonials: "お客様の声",
    contacts: "お問い合わせ",
    settings: "設定",
    lets_talk: "話しましょう",

    // Hero
    hi_im: "こんにちは、私は",
    visalsing: "ソ・ヴィサルシン",
    hero_long_text:
      "ソフトウェア開発者のヴィサルシンです。フロントエンド、バックエンド、レスポンシブデザイン、メールマーケティングなどのWebサイト構築を専門としています。以下は私の履歴書です。ボタンをクリックしてCVをダウンロードできます。",
    contact_me: "お問い合わせ",
    download_cv: "CVをダウンロード",

    // About Me
    about_: " ",
    _me: "について",
    about_me_long_text:
      "私は高品質なWebアプリケーションの開発に情熱を注いでいる開発者です。パフォーマンスとユーザーエクスペリエンスに重点を置き、デザインとコードの架け橋となることを目指しています。",
    two_years_experience: "2年の経験",
    view_portfolio: "ポートフォリオを見る",
    see_more: "もっと見る",

    // Skills & Experience
    experiences: "経験",
    skill_subtitle: "私の技術スキルとプロフェッショナルとしての歩み",
    technical_skills: "テクニカルスキル",
    linguistic_skills: "言語スキル",
    soft_skills: "ソフトスキル",
    hobbies_interests: "趣味・関心",
    tech_stack: "技術スタック",
    work_experience: "職務経歴",
    education_history: "学歴",
    additional_skills: "追加スキル",
    click_to_see_more: "クリックして詳細を表示！",
    show_less: "表示を減らす",

    // My Services
    my1_: "私の",
    _my2: "サービス",
    services: "サービス",
    services_subtitle:
      "初期デザインから正式なリリースまで、デジタル製品の構築と成長を支援するための包括的なテクノロジーソリューションを提供します。",

    // Client Testimonials
    client1_: " ",
    _client2: "のお客様",

    // Settings
    portfolio_themes: "ポートフォリオのテーマ",
    accent_colors: "アクセントカラー",
    languages: "言語",
    save_return: "保存して戻る",
    reset: "リセット",
    customize: "ポートフォリオの表示をカスタマイズする",

    // ServiceDetail
    details: "詳細",
    click_to_return: "クリックして戻る！",
  },
  ko: {
    // Navbar
    home: "홈",
    about_me: "자기소개",
    skills: "기술 스택",
    services: "서비스",
    projects: "프로젝트",
    testimonials: "수강후기/추천사",
    contacts: "연락처",
    settings: "설정",
    lets_talk: "커피챗 하기",

    // Hero
    hi_im: "안녕하세요, 저는",
    visalsing: "소 비살싱입니다",
    hero_long_text:
      "저는 소프트웨어 개발자로서 프론트엔드, 백엔드 개발, 반응형 디자인, 이메일 마케팅 등 웹사이트 제작 전반을 전문으로 합니다. 저에 대해 더 궁금하시다면 아래 버튼을 클릭해 이력서를 다운로드해 주세요.",
    contact_me: "문의하기",
    download_cv: "이력서 다운로드",

    // About Me
    about_: " ",
    _me: "소개",
    about_me_long_text:
      "저는 고품질 웹 애플리케이션 구축에 열정을 가진 개발자입니다. 성능과 사용자 경험(UX)에 집중하며, 디자인과 코드 사이의 간극을 메우는 역할을 수행합니다.",
    two_years_experience: "2년의 경력",
    view_portfolio: "포트폴리오 보기",
    see_more: "더 보기",

    // Skills & Experience
    experiences: "경력",
    skill_subtitle: "저의 기술적 역량과 전문적인 여정입니다",
    technical_skills: "기술 스킬",
    linguistic_skills: "언어 능력",
    soft_skills: "소프트 스킬",
    hobbies_interests: "취미 및 관심사",
    tech_stack: "기술 스택",
    work_experience: "업무 경력",
    education_history: "학력 사항",
    additional_skills: "기타 역량",
    click_to_see_more: "더 보려면 클릭하세요!",
    show_less: "간략히 보기",

    // My Services
    my1_: "나의 ",
    _my2: "서비스",
    services: "서비스",
    services_subtitle:
      "초기 설계부터 공식 런칭까지, 귀하의 디지털 제품이 성장할 수 있도록 포괄적인 기술 솔루션을 제공합니다.",

    // Client Testimonials
    client1_: " ",
    _client2: "클라이언트",

    // Settings
    portfolio_themes: "포트폴리오 테마",
    accent_colors: "포인트 컬러",
    languages: "언어 선택",
    save_return: "저장 후 돌아가기",
    reset: "초기화",
    customize: "포트폴리오 경험을 맞춤 설정하세요",

    // ServiceDetail
    details: "상세 정보",
    click_to_return: "클릭하여 돌아가기!",
  },
  fil: {
    // Navbar
    home: "Home",
    about_me: "Tungkol sa Akin",
    skills: "Kasanayan",
    services: "Serbisyo",
    projects: "Mga Proyekto",
    testimonials: "Mga Patotoo",
    contacts: "Kontak",
    settings: "Settings",
    lets_talk: "Mag-usap Tayo",

    // Hero
    hi_im: "Kamusta, Ako si",
    visalsing: "So Visalsing",
    hero_long_text:
      "Ako si Visalsing, isang software developer. Ang aking mga kasanayan ay ang paglikha at pagbuo ng website, front-end, back-end, responsive design, email marketing at iba pa. Narito ang aking CV sa ibaba! Maaari mong i-click ang button para i-download ang aking CV.",
    contact_me: "Kontakin Ako",
    download_cv: "I-download ang CV",

    // About Me
    about_: "Tungkol",
    _me: " sa Akin",
    about_me_long_text:
      "Ako ay isang madamdaming developer na nakatuon sa pagbuo ng mataas na kalidad na mga web application. Sa pagtuon sa performance at karanasan ng gumagamit, pinag-uugnay ko ang disenyo at code.",
    two_years_experience: "2 Taong Karanasan",
    view_portfolio: "Tingnan ang Portfolio",
    see_more: "Tingnan ang Higit Pa",

    // Skills & Experience
    experiences: "Karanasan",
    skill_subtitle:
      "Ang aking teknikal na kadalubhasaan at propesyonal na paglalakbay",
    technical_skills: "Teknikal na Kasanayan",
    linguistic_skills: "Kasanayan sa Wika",
    soft_skills: "Soft Skills",
    hobbies_interests: "Mga Libangan at Interes",
    tech_stack: "Tech Stack",
    work_experience: "Karanasan sa Trabaho",
    education_history: "Kasaysayan ng Edukasyon",
    additional_skills: "Karagdagang Kasanayan",
    click_to_see_more: "I-click para sa higit pa!",
    show_less: "Ipakita ang mas kaunti",

    // My Services
    my1_: "Aking",
    _my2: " mga",
    services: "Serbisyo",
    services_subtitle:
      "Mula sa paunang disenyo hanggang sa huling deployment, nagbibigay ako ng komprehensibong digital na solusyon upang matulungan kang bumuo, maglunsad, at mapalago ang iyong mga software product.",

    // Client Testimonials
    client1_: "Mga",
    _client2: " Patotoo",

    // Settings
    portfolio_themes: "Tema ng Portfolio",
    accent_colors: "Accent Colors",
    languages: "Mga Wika",
    save_return: "I-save at Bumalik",
    reset: "Ibalik sa Default",
    customize: "I-customize ang iyong karanasan sa portfolio",

    // ServiceDetail
    details: "Mga Detalye",
    click_to_return: "I-click para bumalik!",
  },
  de: {
    // Navbar
    home: "Startseite",
    about_me: "Über mich",
    skills: "Fähigkeiten",
    services: "Leistungen",
    projects: "Projekte",
    testimonials: "Referenzen",
    contacts: "Kontakt",
    settings: "Einstellungen",
    lets_talk: "Lass uns reden",

    // Hero
    hi_im: "Hi, ich bin",
    visalsing: "So Visalsing",
    hero_long_text:
      "Ich bin Visalsing, ein Softwareentwickler. Meine Fähigkeiten liegen in der Erstellung und Entwicklung von Websites, Front-End, Back-End, Responsive Design, E-Mail-Marketing und mehr. Hier ist mein Lebenslauf unten! Klicken Sie auf die Schaltfläche, um ihn herunterzuladen.",
    contact_me: "Kontaktieren Sie mich",
    download_cv: "Lebenslauf herunterladen",

    // About Me
    about_: "Über",
    _me: " mich",
    about_me_long_text:
      "Ich bin ein leidenschaftlicher Entwickler, der sich auf den Aufbau hochwertiger Webanwendungen konzentriert. Mit Fokus auf Leistung und Benutzererfahrung schließe ich die Lücke zwischen Design und Code.",
    two_years_experience: "2 Jahre Erfahrung",
    view_portfolio: "Portfolio ansehen",
    see_more: "Mehr sehen",

    // Skills & Experience
    experiences: "Erfahrung",
    skill_subtitle: "Meine technische Expertise und mein beruflicher Werdegang",
    technical_skills: "Technische Fähigkeiten",
    linguistic_skills: "Sprachkenntnisse",
    soft_skills: "Soft Skills",
    hobbies_interests: "Hobbys & Interessen",
    tech_stack: "Tech Stack",
    work_experience: "Berufserfahrung",
    education_history: "Bildungsweg",
    additional_skills: "Zusätzliche Fähigkeiten",
    click_to_see_more: "Klicken für mehr!",
    show_less: "Weniger anzeigen",

    // My Services
    my1_: "Meine",
    _my2: " ",
    services: "Leistungen",
    services_subtitle:
      "Vom ersten Design bis zum finalen Deployment biete ich umfassende digitale Lösungen, um Ihre Softwareprodukte aufzubauen, einzuführen und zu skalieren.",

    // Client Testimonials
    client1_: "Kunden",
    _client2: "-Referenzen",

    // Settings
    portfolio_themes: "Portfolio-Themes",
    accent_colors: "Akzentfarben",
    languages: "Sprachen",
    save_return: "Speichern & Zurück",
    reset: "Standard wiederherstellen",
    customize: "Passen Sie Ihr Portfolio-Erlebnis an",

    // ServiceDetail
    details: "Details",
    click_to_return: "Klicken zum Zurückkehren!",
  },
  es: {
    // Navbar
    home: "Inicio",
    about_me: "Sobre mí",
    skills: "Habilidades",
    services: "Servicios",
    projects: "Proyectos",
    testimonials: "Testimonios",
    contacts: "Contacto",
    settings: "Ajustes",
    lets_talk: "Hablemos",

    // Hero
    hi_im: "Hola, soy",
    visalsing: "So Visalsing",
    hero_long_text:
      "Soy Visalsing, desarrollador de software. Mis habilidades incluyen la creación y desarrollo de sitios web, front-end, back-end, diseño responsivo, email marketing y más. ¡Aquí abajo tienes mi CV! Puedes hacer clic en el botón para descargarlo.",
    contact_me: "Contáctame",
    download_cv: "Descargar CV",

    // About Me
    about_: "Sobre",
    _me: " mí",
    about_me_long_text:
      "Soy un desarrollador apasionado dedicado a crear aplicaciones web de alta calidad. Centrándome en el rendimiento y la experiencia del usuario, cierro la brecha entre el diseño y el código.",
    two_years_experience: "2 Años de Experiencia",
    view_portfolio: "Ver Portafolio",
    see_more: "Ver más",

    // Skills & Experience
    experiences: "Experiencia",
    skill_subtitle: "Mi experiencia técnica y trayectoria profesional",
    technical_skills: "Habilidades Técnicas",
    linguistic_skills: "Habilidades Lingüísticas",
    soft_skills: "Habilidades Blandas",
    hobbies_interests: "Aficiones e Intereses",
    tech_stack: "Tech Stack",
    work_experience: "Experiencia Laboral",
    education_history: "Historial Educativo",
    additional_skills: "Habilidades Adicionales",
    click_to_see_more: "¡Haz clic para ver más!",
    show_less: "Mostrar menos",

    // My Services
    my1_: "Mis",
    _my2: " ",
    services: "Servicios",
    services_subtitle:
      "Desde el diseño inicial hasta el despliegue final, ofrezco soluciones digitales integrales para ayudarte a construir, lanzar y hacer crecer tus productos de software.",

    // Client Testimonials
    client1_: "Testimonios",
    _client2: " de Clientes",

    // Settings
    portfolio_themes: "Temas del Portafolio",
    accent_colors: "Colores de Acento",
    languages: "Idiomas",
    save_return: "Guardar y Volver",
    reset: "Restablecer valores",
    customize: "Personaliza tu experiencia en el portafolio",

    // ServiceDetail
    details: "Detalles",
    click_to_return: "¡Haz clic para volver!",
  },
};

// Helper: apply font attribute to <html> root
const applyLangFont = (lang) => {
  document.documentElement.setAttribute("data-lang", lang);
};

// // 2. The State
// export const currentLang = ref(localStorage.getItem("lang") || "en");

// State — init with saved lang and apply font immediately
// export const currentLang = ref(localStorage.getItem("lang") || "en");
// applyLangFont(currentLang.value); // run once on app load

const savedLang = localStorage.getItem("lang");
// Only use savedLang if it actually exists in our translations object
export const currentLang = ref(translations[savedLang] ? savedLang : "en");
applyLangFont(currentLang.value);

// // 3. The Helper Function (t)
// export const t = (key) => {
//   return computed(() => translations[currentLang.value][key] || key).value;
// };

// Helper t() stays the same
export const t = (key) => {
  return computed(() => translations[currentLang.value][key] || key).value;
};

// // 4. Function to switch language
// export const setLanguage = (lang) => {
//   currentLang.value = lang;
//   localStorage.setItem("lang", lang);
// };

// setLanguage — also triggers font switch
export const setLanguage = (lang) => {
  currentLang.value = lang;
  localStorage.setItem("lang", lang);
  applyLangFont(lang);
};

// export const fontClass = computed(() => {
//   switch (currentLang.value) {
//     case 'km': return 'font-khmer';
//     case 'zh': return 'font-chinese';
//   }
// });
