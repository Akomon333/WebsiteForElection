window.setLanguage = setLanguageInternal; // placeholder until function declaration hoisted

/* ===== COUNTERS (unchanged behavior) ===== */
(function initCounters() {
  const counters = document.querySelectorAll('.count');
  if (!counters.length) return;

  const runCounter = (el, target) => {
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const id = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target;
        clearInterval(id);
      } else {
        el.textContent = current;
      }
    }, 20);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          counters.forEach((c) => {
            runCounter(c, parseInt(c.dataset.target || '0', 10));
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );

  const heroSection = document.querySelector('.hero');
  if (heroSection) observer.observe(heroSection);
})();

/* ===== SMOOTH SCROLL (unchanged) ===== */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

/* ===== MOBILE MENU (class-based safe) ===== */
(function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    toggle.textContent = isOpen ? '✕' : '☰';
    document.body.classList.toggle('nav-open', isOpen);
  });

  // Close on nav link click for small screens
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 640 && navLinks.classList.contains('is-open')) {
        navLinks.classList.remove('is-open');
        toggle.textContent = '☰';
        document.body.classList.remove('nav-open');
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 640) {
      navLinks.classList.remove('is-open');
      document.body.classList.remove('nav-open');
      toggle.textContent = '☰';
    }
  });
})();

/* ===== TRANSLATIONS (same content as before — add more keys if needed) ===== */
const translations = {
  ru: {
    plan_course_title: "Финансирование хобби",
    plan_course_text:
      "Если у кого-то есть хобби, например программирование, я создам систему конкурсов, в которых победитель или победители смогут получить финансирование для развития своего хобби, например оплату обучающего курса.",
    supporters_header: "Сторонников",
    events_header: "Мероприятий",
    endorsements_header: "Поддержки",
    telegram_channel: "Телеграм канал",
    events_title1: "Дебаты в noortevolikogu",
    events_text1: "Я буду участвовать в дебатах против других кандидатов. Подробнее об этом можно узнать в моём канале.",
    tag_leadership: "Лидерство",
    tag_teamwork: "Командная работа",
    tag_programming: "Программирование",
    tag_experience: "Опыт",
    tag_creativity: "Креативность",
    tag_project_mgmt: "Управление проектами",
    tag_data: "Работа с данными",
    tag_analytics: "Аналитика",
    nav_brand: "Улучшим школы вместе!",
    nav_about: "Обо мне",
    nav_plan: "План",
    nav_events: "События",
    nav_vote: "Как голосовать",
    nav_faq: "Часто задаваемые вопросы",
    hero_name: "Аким Щемелинин",
    hero_slogan: "Кандидат в noortevolikogu",
    hero_plan: "План",
    hero_telegram: "Наш телеграмм канал",
    mission_title: "Миссия",
    mission_text:
      "Развивать школы с помощью наших идей, чтобы учиться было комфортнее и приятнее.",
    about_title: "Обо мне",
    about_text1:
      "Я хочу улучшить школьную систему и поддержать личностный рост учеников. Также в свободное время я увлекаюсь программированием.",
    about_text2:
      "Я активно участвую в проектах и конференциях, знакомлюсь с интересными людьми и постоянно открываю для себя что-то новое.",
    // plan...
    plan_title: "План",
    plan_intro:
      "Моя программа сосредоточена на практических улучшениях, которые напрямую влияют на жизнь и обучение студентов.",
    plan_lesson_title: "Улучшение уроков",
    plan_lesson_text:
      "Школьные уроки можно улучшить играми, практическими заданиями и командной работой.",
    plan_ideas_title: "Прислушиваться идеям",
    plan_ideas_text:
      "Чтобы школа становилась лучше, важно слушать идеи учеников и обсуждать их вместе.",
    plan_drinks_title: "Горячие напитки для всех",
    plan_drinks_text:
      "Горячие напитки должны быть доступны всем на любой перемене более 5 минут.",
    plan_food_title: "Еда и напитки высокого качества",
    plan_food_text:
      "Еда и напитки должны приносить удовольствие и энергию для учёбы.",
    plan_funds_title: "Финансирование школ",
    plan_funds_text:
      "Школы должны получать больше финансирования для кружков и улучшений.",
    // projects...
    projects_title: "Мои проекты",
    projects_intro: "Примеры моей работы и инициатив, которые я реализовал.",
    project1_title: "Разработка игр на Roblox",
    project1_text:
      "С 2021 по 2025 год я создавал игры на Roblox под именами Akomon777 и Akomon333. Также помогал с разроботкой Undertale:A day of the future в 2023 году.",
    project2_title: "Районные инициативы",
    project2_text: "Я участвую в программе Noored kui linnaosa areng. В рамках программы мы организуем студенческие конференции и работаем над проектами, связанными с молодёжью Ласнамяэ",
    project3_title: "Работа с данными",
    project3_text: "Я сделал несколько проектов, в которых, имея исходные данные, запрограммировал модель для прогнозирования результатов. Код проектов доступен на https://github.com/Akomon333.",
    support_title: "Поддержка",
    support_text:
      "У Акима не только есть знания, он умеет слушать и трудится. Такой лидер нужен каждой нации. - Sagar Yadav(Работает программистом с 2007 года)",
    events_title: "Предстоящие события",
    events_text: "Присоединяйтесь к нам на этих мероприятиях, чтобы узнать больше о нас и весело провести время.",
    vote_title: "Дайте услышать свой голос",
    vote_text:
      "Каждый голос имеет значение для того, чтобы сделать наши школы лучше.",
    vote_date_title: "Дата голосования",
    vote_date_text: "Ноябрь 2025 • 10–16 число",
    vote_step1_title: "Голосование",
    vote_step1_text:
      "Информация о том как проголосовать будет добавлена позже.",
    faq_title: "Часто задаваемые вопросы",
    faq_q1: "Через какие соцсети можно связаться?",
    faq_a1: "Телеграм: Facebook: моя страница.",
    faq_q2: "Чем можно помочь в команде?",
    faq_a2: "Задачи распределяются по навыкам и интересам. Что-нибудь найдется для каждого.",
    faq_q3: "Что если я хочу помочь но нет времени?",
    faq_a3: "Расскажите о нас друзьям — это тоже помощь!",
    faq_q4: "Как предложить идею?",
    faq_a4: "Напишите на Gmail akimestfornoortevolikogu@gmail.com или Facebook https://www.facebook.com/profile.php?id=61570973228399.",
    faq_q5: "Кто может голосовать?",
    faq_a5: "Все в возрасте от 14 до 21 года.",
  },

  et: {
    plan_course_title: "Hobi rahastamine",
    plan_course_text:
      "Kui kellelgi on hobi, näiteks programmeerimine, loon ma võistlussüsteemi, kus võitja või võitjad saavad rahastuse oma hobi arendamiseks, näiteks koolituskursuse eest tasumiseks.",
    supporters_header: "Toetajad",
    events_header: "Üritused",
    endorsements_header: "Toetused",
    telegram_channel: "Telegrami kanal",
    events_title1: "Debatt Noortevolikogus",
    events_text1: "Ma osalen väitlustel teiste kandidaatidega. Rohkem teavet selle kohta leiad minu Telegrami kanalist.",
    tag_leadership: "Juhtimine",
    tag_teamwork: "Meeskonnatöö",
    tag_programming: "Programmeerimine",
    tag_experience: "Kogemus",
    tag_creativity: "Loovus",
    tag_project_mgmt: "Projektijuhtimine",
    tag_data: "Andmetöötlus",
    tag_analytics: "Analüütika",
    nav_brand: "Parandame koole koos!",
    nav_about: "Minust",
    nav_plan: "Plaan",
    nav_events: "Üritused",
    nav_vote: "Kuidas hääletada",
    nav_faq: "KKK",
    hero_name: "Akim Štšemelinin",
    hero_slogan: "Kandidaat noortevolikokku",
    hero_plan: "Plaan",
    hero_telegram: "Meie Telegrami kanal",
    mission_title: "Missioon",
    mission_text:
      "Arendada koole meie ideede abil, et õppimine oleks mugavam ja meeldivam.",
    about_title: "Minust",
    about_text1:
      "Soovin parandada koolisüsteemi ja toetada õpilaste isiklikku arengut. Vabal ajal tegelen programmeerimisega.",
    about_text2:
      "Osalen aktiivselt projektides ja konverentsidel ning avastan pidevalt midagi uut.",
    plan_title: "Plaan",
    plan_intro:
      "Minu programm keskendub praktilistele parendustele, mis mõjutavad otseselt õpilaste elu ja õppimist.",
    plan_lesson_title: "Õppetundide parandamine",
    plan_lesson_text:
      "Tunde saab huvitavamaks muuta mängude, praktiliste ülesannete ja meeskonnatööga.",
    plan_ideas_title: "Kuulame ideid",
    plan_ideas_text:
      "Et kool muutuks paremaks, on oluline kuulata õpilaste ideid ja neid koos arutada.",
    plan_drinks_title: "Kuumad joogid kõigile",
    plan_drinks_text:
      "Kuumad joogid peaksid olema saadaval kõigil üle 5 minuti kestvatel vahetundidel.",
    plan_food_title: "Kvaliteetne toit ja joogid",
    plan_food_text:
      "Toit ja joogid peaksid olema maitsvad ja andma energiat õppimiseks.",
    plan_funds_title: "Koolide rahastamine",
    plan_funds_text:
      "Koolid peaksid saama rohkem rahastust ringide ja parenduste jaoks.",
    projects_title: "Minu projektid",
    projects_intro: "Näited minu töödest ja algatustest.",
    project1_title: "Roblox mängude arendamine",
    project1_text:
      "Aastatel 2021–2025 lõin Robloxis mänge kasutajanimedega Akomon777 ja Akomon333. Aitasin kaasa ka Undertale: A day of the future arendamisele 2023. aastal.",
    project2_title: "Linnaosa algatused",
    project2_text:
      "Osalen programmis 'Noored kui linnaosa areng'.",
    project3_title: "Andmetega töötamine",
    project3_text:
      "Loon prognoosimisprojekte. Kood on saadaval https://github.com/Akomon333.",
    support_title: "Toetus",
    support_text:
      "Akim mitte ainult ei tea, vaid oskab kuulata ja töötab kõvasti. Sellist juhti on igal rahval vaja. - Sagar Yadav (Programmeeri alates 2007. aastast)",
    events_title: "Tulevased üritused",
    events_text: "Liitu meiega nende ürituste ajal, et rohkem meist teada saada ja lõbusalt aega veeta.",
    vote_title: "Anna oma hääl",
    vote_text:
      "Iga hääl loeb, et muuta meie koolid paremaks.",
    vote_date_title: "Hääletamise kuupäev",
    vote_date_text: "November 2025 • 10.–16. kuupäev",
    vote_step1_title: "Hääletamine",
    vote_step1_text: "Teave hääletamise kohta lisatakse hiljem.",
    faq_title: "KKK",
    faq_q1: "Kuidas ühendust võtta?",
    faq_a1: "Telegram: meie kanal, Facebook: minu leht.",
    faq_q2: "Kuidas aidata meeskonnas?",
    faq_a2: "Ülesanded jagatakse oskuste ja huvide järgi. Leiame midagi igaühele.",
    faq_q3: "Mis siis, kui mul pole aega aidata, aga ma tahaksin seda teha?",
    faq_a3: "Räägi meist oma sõpradele – seegi on abi!",
    faq_q4: "Kuidas ideid esitada?",
    faq_a4: "Kirjuta Gmaili akimestfornoortevolikogu@gmail.com või Facebooki https://www.facebook.com/profile.php?id=61570973228399 kaudu.",
    faq_q5: "Kes saab hääletada?",
    faq_a5: "Kõik vanuses 14–21 aastat.",
  },

  en: {
    plan_course_title: "Hobby funding",
    plan_course_text:
      "If someone has a hobby, for example programming, I will create a competition system where the winner or winners can receive funding to develop their hobby, such as paying for a training course.",
    supporters_header: "Supporters",
    events_header: "Events",
    endorsements_header: "Endorsements",
    telegram_channel: "Telegram channel",
    events_title1: "Debates in Noortevolikogu",
    events_text1: "I will be participating in the Noortevolikogu debates against other candidates. You can learn more about it on my Telegram channel.",
    tag_leadership: "Leadership",
    tag_teamwork: "Teamwork",
    tag_programming: "Programming",
    tag_experience: "Experience",
    tag_creativity: "Creativity",
    tag_project_mgmt: "Project Management",
    tag_data: "Data Work",
    tag_analytics: "Analytics",
    nav_brand: "Let's improve schools together!",
    nav_about: "About Me",
    nav_plan: "Plan",
    nav_events: "Events",
    nav_vote: "How to Vote",
    nav_faq: "FAQ",
    hero_name: "Akim Stsemelenin",
    hero_slogan: "Candidate for the Youth Council",
    hero_plan: "Plan",
    hero_telegram: "Our Telegram channel",
    mission_title: "Mission",
    mission_text:
      "Develop schools through our ideas to make learning more comfortable and enjoyable.",
    about_title: "About me",
    about_text1:
      "I want to improve the school system and support students’ personal growth. In my free time, I enjoy programming.",
    about_text2:
      "I actively participate in projects and conferences, meet interesting people, and constantly learn new things.",
    plan_title: "Plan",
    plan_intro:
      "My program focuses on practical improvements that directly affect students’ lives and education.",
    plan_lesson_title: "Better Lessons",
    plan_lesson_text:
      "Lessons can be improved with games, practical tasks, teamwork, and discussions.",
    plan_ideas_title: "Listen to Ideas",
    plan_ideas_text:
      "Schools get better when students’ ideas are heard and discussed together.",
    plan_drinks_title: "Hot Drinks for Everyone",
    plan_drinks_text:
      "Hot drinks should be available during breaks longer than 5 minutes.",
    plan_food_title: "High-Quality Food and Drinks",
    plan_food_text:
      "Meals should bring joy, support health, and give energy for learning.",
    plan_funds_title: "School Funding",
    plan_funds_text:
      "Schools need more funding for clubs and improvements.",
    projects_title: "My Projects",
    projects_intro: "Examples of my work and initiatives.",
    project1_title: "Game Development on Roblox",
    project1_text:
      "From 2021 to 2025, I created Roblox games under Akomon777 and Akomon333. I helped with the development of Undertale: A day of the future in 2023.",
    project2_title: "District Initiatives",
    project2_text:
      "I participate in 'Noored kui linnaosa areng' – youth projects in Lasnamäe.",
    project3_title: "Working with Data",
    project3_text:
      "I build forecasting projects. Code available on https://github.com/Akomon333.",
    support_title: "Support",
    support_text:
      "Akim is hardworking, knowledgeable, and listens to others — exactly the kind of leader we need. - Sagar Yadav (Works as a programmer since 2007)",
    events_title: "Upcoming Events",
    events_text: "Join us at these events to learn more about us and have a great time.",
    vote_title: "Make your voice heard",
    vote_text:
      "Every vote matters in making our schools better.",
    vote_date_title: "Voting Date",
    vote_date_text: "November 2025 • 10–16",
    vote_step1_title: "Voting",
    vote_step1_text:
      "Voting details will be added closer to the date.",
    faq_title: "Frequently Asked Questions",
    faq_q1: "How to contact us?",
    faq_a1: "Telegram: our channel, Facebook: my page.",
    faq_q2: "How can I help?",
    faq_a2: "Tasks are distributed by skills and interests. We will find something for everyone.",
    faq_q3: "What if I don't have time to help but I want to?",
    faq_a3: "Tell your friends about us — that helps too!",
    faq_q4: "How to share ideas?",
    faq_a4: "Write via Gmail akimestfornoortevolikogu@gmail.com or Facebook https://www.facebook.com/profile.php?id=61570973228399.",
    faq_q5: "Who can vote?",
    faq_a5: "Everyone aged 14–21.",
  },
};

/* ===== Fallback map: capture original DOM text so missing keys won't blank content ===== */
const originalTextMap = new WeakMap();
function captureOriginalText() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    // store innerHTML by default (so links/spans preserved)
    if (!originalTextMap.has(el)) {
      originalTextMap.set(el, el.innerHTML);
    }
  });
}

/* ===== Core translation application ===== */
function applyTranslations(lang) {
  const selected = translations[lang] || translations['ru'];
  // apply translations
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    const value = selected[key];
    if (typeof value === 'string') {
      el.innerHTML = value;
    } else {
      // no translation found: keep original text (if captured) and log for debugging
      if (originalTextMap.has(el)) {
        el.innerHTML = originalTextMap.get(el);
      }
      console.warn(`Missing translation for key "${key}" in "${lang}"`);
    }
  });

  // set html lang attribute for accessibility and screen readers
  try {
    document.documentElement.lang = lang;
  } catch (e) {
    console.warn('Could not set documentElement.lang', e);
  }

  // mark active button (if using .lang-switcher and data-lang attributes)
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.classList.toggle('active-lang', btn.dataset.lang === lang);
  });

  console.info(`Applied translations: ${lang}`);
}

/* ===== Global setter (exposed) ===== */
function setLanguageInternal(lang) {
  if (!lang || !translations[lang]) {
    console.warn('Requested language not available:', lang);
    return;
  }
  localStorage.setItem('lang', lang);
  applyTranslations(lang);
}

/* ensure global reference (in case hoisting didn't set it earlier) */
window.setLanguage = setLanguageInternal;

/* ===== Attach listeners to any language buttons with data-lang attributes ===== */
function initLanguageButtons() {
  // buttons can be <button data-lang="en">EN</button> or <a data-lang="et">ET</a>
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', (ev) => {
      ev.preventDefault();
      const lang = btn.dataset.lang;
      if (lang) setLanguageInternal(lang);
    });
  });

  // Also support inline onclick="setLanguage('en')" (already works since setLanguage is global)
}

/* ===== Initialization on DOMContentLoaded ===== */
document.addEventListener('DOMContentLoaded', () => {
  captureOriginalText();
  initLanguageButtons();

  // Load saved language or use browser preference or default to 'ru'
  const saved = localStorage.getItem('lang');
  const browserPref = (navigator.languages && navigator.languages[0]) || navigator.language || 'ru';
  const browserShort = browserPref ? browserPref.split('-')[0] : null;
  const initial = saved || (translations[browserShort] ? browserShort : 'ru');

  applyTranslations(initial);

  console.info('Language system initialized. Current:', initial);
});