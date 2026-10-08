const english = {
  skip: 'Skip to content', firstName: 'Roman', lastName: 'Savenkov',
  location: 'Saint Petersburg', age: '18 years old', portfolioLabel: 'Portfolio', project: 'Project:',
  about: 'About me',
  aboutText: 'Frontend developer with experience across the full web application development cycle. I enjoy analysing code, optimising performance and improving team workflows. I build user-friendly interfaces and contribute to backend development.',
  experience: 'Experience', knowledgeDate: 'March — December 2025', knowledgeTitle: 'Knowledge Base',
  college: 'Hexlet College', fullstackRole: 'Full Stack Developer',
  knowledgeDescription: 'A web application for the college: involvement in the full development cycle, from interface design to server-side logic.',
  knowledgePoint1: 'Built the frontend with React and TypeScript, using HTML/CSS, Redux Toolkit and React Context.',
  knowledgePoint2: 'Implemented backend functionality with Node.js, Express, TypeScript, MySQL and Prisma.',
  knowledgePoint3: 'Optimised frontend–backend communication to improve application speed.',
  financeDate: 'April — October 2025', financeTitle: 'Financial Accounting', frontendRole: 'Frontend Developer',
  financeDescription: 'Team development of a commercial web application for financial accounting.',
  financePoint1: 'Actively contributed to the web application interface.',
  financePoint2: 'Coordinated the team: assigned tasks, reviewed code and tracked deadlines.',
  financePoint3: 'Solved non-standard tasks and debugged complex technical issues to keep the product stable.',
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
