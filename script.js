const english = {
  skip: 'Skip to content', firstName: 'Roman', lastName: 'Savenkov',
  location: 'Saint Petersburg', age: '18 years old', portfolioLabel: 'Portfolio',
  about: 'About me',
  aboutText: 'React and TypeScript frontend developer. I build interfaces with catalogues, user dashboards and admin panels, connecting user workflows to APIs. My experience includes full stack development with NestJS and Express, teamwork and code review.',
  experience: 'Project experience', college: 'Hexlet College', frontendRole: 'Frontend Developer',
  galleryTitle: 'Gallery — Art Platform', galleryRole: 'Frontend / Full Stack · Personal project',
  galleryDescription: 'A multi-role web platform for publishing artwork, browsing a catalogue and moderating content.',
  galleryPoint1: 'Built the artwork catalogue, artist profiles and a user dashboard for publishing and editing content with React and TypeScript.',
  galleryPoint2: 'Implemented moderation interfaces and role-based access for administrators, moderators, artists and users.',
  galleryPoint3: 'Integrated the frontend with a NestJS REST API: authentication, session refresh, loading states and error handling.',
  digitalTitle: 'Digital Control — Video Analytics', digitalDate: 'June 2026',
  digitalRole: 'Frontend · Industrial internship at Gazprom Neft',
  digitalDescription: 'An interactive catalogue of industrial safety and video analytics scenarios for drilling and well workover.',
  digitalPoint1: 'Built a React and TypeScript SPA with work-type filters, categories and expandable scenario details.',
  digitalPoint2: 'Designed navigation for switching filters and expanding cards; adapted the interface for mobile devices.',
  digitalPoint3: 'Configured Vite builds and published the demo on GitHub Pages.',
  demo: 'Demo ↗', achievements: 'Achievements', awardTitle: 'Professionals Championship · Bronze',
  awardDetail: 'Web Technologies · Regional round · 2025',
  education: 'Education',
  degree: 'Specialist diploma · Information Systems and Programming', educationTrack: 'Focus: Frontend Development',
  contacts: 'Contact', skills: 'Skills', practices: 'Methods & metrics',
  dataText: 'Working with metrics and making decisions based on data.', languages: 'Languages', english: 'English',
  englishLevel: 'Upper-intermediate'
};

const translatedElements = [...document.querySelectorAll('[data-i18n]')];
const russian = Object.fromEntries(translatedElements.map(element => [element.dataset.i18n, element.innerText]));

function setLanguage(language) {
  const selected = language === 'en' ? 'en' : 'ru';
  const translations = selected === 'en' ? english : russian;
  translatedElements.forEach(element => { element.textContent = translations[element.dataset.i18n]; });
  document.documentElement.lang = selected;
  document.title = selected === 'en' ? 'Roman Savenkov — Frontend Developer' : 'Роман Савенков — Frontend-разработчик';
  document.querySelector('meta[name="description"]').content = selected === 'en'
    ? 'Roman Savenkov — frontend developer. Experience, projects, skills and contact details.'
    : 'Роман Савенков — frontend-разработчик. Опыт, проекты, навыки и контакты.';
  document.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === selected)));
  try { localStorage.setItem('resume-language', selected); } catch { /* Language switching also works when storage is unavailable. */ }
}

document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));
try { if (localStorage.getItem('resume-language') === 'en') setLanguage('en'); } catch { /* Default to Russian. */ }
