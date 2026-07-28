/* ============================================================
   Portfolio — main.js
   Loads JSON data and renders Skills, Projects, Experience
   ============================================================ */

const loaderMinDuration = new Promise(resolve => setTimeout(resolve, 2000));
const loaderPageReady  = new Promise(resolve => {
  if (document.readyState === 'complete') resolve();
  else window.addEventListener('load', resolve);
});

Promise.all([loaderMinDuration, loaderPageReady]).then(() => {
  const loader = document.getElementById('page-loader');
  if (!loader) return;
  loader.classList.add('hidden');
  setTimeout(() => loader.remove(), 600);

  const chips = document.querySelectorAll('.float-chip');
  chips.forEach((chip, i) => {
    setTimeout(() => {
      chip.style.transition = 'opacity 0.6s ease';
      chip.style.opacity = '1';
    }, 200 + i * 280);
  });
});

const SKILLS_DATA = {
  'Langages & Frameworks': [
    { name: 'Java 8-21',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
    { name: 'Angular 17+',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg' },
    { name: 'Spring Boot 3.4', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
    { name: 'TypeScript',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
    { name: 'JavaScript',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
    { name: 'Bootstrap',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg' },
    { name: 'jQuery',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-original.svg' },
  ],
  'Méthodologies': [
    { name: 'Agile / Scrum', emoji: '🔄' },
    { name: 'SAFe',          emoji: '📐' },
    { name: 'Microservices', emoji: '🧩' },
  ],
  'DevOps & Cloud': [
    { name: 'GitLab CI/CD',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg' },
    { name: 'GitHub Actions', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
    { name: 'Jenkins',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg' },
    { name: 'Docker',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
    { name: 'GCP',            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg' },
    { name: 'XL Deploy',      emoji: '🚀' },
  ],
  'Outils': [
    { name: 'Maven',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/maven/maven-original.svg' },
    { name: 'JUnit',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/junit/junit-plain.svg' },
    { name: 'Postman',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
    { name: 'IntelliJ',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg' },
    { name: 'SonarQube',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sonarqube/sonarqube-original.svg' },
    { name: 'MySQL',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
    { name: 'Confluence', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/confluence/confluence-original.svg' },
  ],
};

const SKILL_COLORS = {
  'Langages & Frameworks': '#FF806D',
  'Méthodologies':         '#BCA7F2',
  'DevOps & Cloud':        '#7CA7FF',
  'Outils':                '#8DDFC5',
};

async function loadJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

/* ---- Skills ---- */
function renderSkills(skills) {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  grid.innerHTML = Object.entries(skills).map(([category, items]) => {
    const color = SKILL_COLORS[category] || '#17211B';
    const tags = items.map(item => {
      if (item.icon) {
        return `<span class="skill-item">
          <img src="${escAttr(item.icon)}" alt="${escHtml(item.name)}" loading="lazy" onerror="this.style.display='none'" />
          <span>${escHtml(item.name)}</span>
        </span>`;
      } else if (item.emoji) {
        return `<span class="skill-item">
          <span class="skill-emoji">${item.emoji}</span>
          <span>${escHtml(item.name)}</span>
        </span>`;
      }
      return `<span class="skill-tag">${escHtml(item.name || item)}</span>`;
    }).join('');
    return `
      <div class="skills-card">
        <div class="skills-card-title" style="color:${color}">
          <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${color};flex-shrink:0"></span>
          ${escHtml(category)}
        </div>
        <div class="skills-tags">${tags}</div>
      </div>`;
  }).join('');
}

/* ---- Projects ---- */
function renderProjects(projects) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = projects.map(p => `
    <div class="project-card">
      <div class="project-thumb-wrap">
        <img
          class="project-thumb"
          src="${escAttr(p.image)}"
          alt="${escAttr(p.name)}"
          loading="lazy"
          onerror="this.closest('.project-thumb-wrap').style.display='none'"
        />
      </div>
      <div class="project-body">
        <div class="project-header">
          <span class="project-name">${escHtml(p.name)}</span>
          <span class="project-type">${escHtml(p.type)}</span>
        </div>
        <p class="project-summary">${escHtml(p.summary)}</p>
        <div class="project-tech">
          ${p.technologies.map(t => `<span class="skill-tag">${escHtml(t)}</span>`).join('')}
        </div>
        <a href="${escAttr(p.url)}" target="_blank" rel="noopener noreferrer" class="project-link">
          Voir le projet
          <span class="project-link-arrow"></span>
        </a>
      </div>
    </div>`
  ).join('');
}

/* ---- Experience ---- */
function renderExperiences(experiences) {
  const list = document.getElementById('experience-list');
  if (!list) return;

  list.innerHTML = experiences.map(e => {
    const clientHtml = e.client
      ? `<span class="exp-client">· ${escHtml(e.client)}</span>`
      : '';
    const teamHtml = e.team
      ? `<span class="exp-team-badge">${escHtml(e.team)}</span>`
      : '';
    return `
    <div class="exp-card${e.highlight ? ' exp-card--highlight' : ''}" style="--exp-accent: ${e.accent}">
      <div class="exp-header">
        <div class="exp-meta">
          <div class="exp-company-row">
            <span class="exp-company-name">${escHtml(e.company)}</span>
            ${clientHtml}
            ${teamHtml}
          </div>
          <div class="exp-role">${escHtml(e.role)}</div>
        </div>
        <span class="exp-dates">${escHtml(e.dates)}</span>
      </div>
      <p class="exp-context">${escHtml(e.context)}</p>
      <ul class="exp-achievements">
        ${e.achievements.map(a => `<li>${escHtml(a)}</li>`).join('')}
      </ul>
      <div class="exp-tech">
        ${e.technologies.map(t => `<span class="skill-tag">${escHtml(t)}</span>`).join('')}
      </div>
    </div>`;
  }).join('');
}

/* ---- Helpers ---- */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
function escAttr(str) {
  return String(str).replace(/"/g, '&quot;');
}

/* ---- Nav active link on scroll ---- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
}

const PROJECTS_DATA = [
  {
    name: 'Ng Experts',
    url: 'https://ng-experts.web.app',
    summary: 'Plateforme Angular dédiée aux ressources et bonnes pratiques pour développeurs Angular.',
    technologies: ['Angular', 'TypeScript', 'Firebase'],
    image: 'assets/ng-experts.png',
    type: 'Projet personnel',
  },
  {
    name: 'Saas Collect',
    url: 'https://saas-collection.web.app/',
    summary: 'Projet SaaS personnel — outil de collecte et gestion de données. Développé et déployé en production.',
    technologies: ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'GCP'],
    image: 'assets/saascollect.png',
    type: 'Projet personnel',
  },
  {
    name: 'Bazar Comores',
    url: 'https://bazar-project-c6112.web.app/',
    summary: 'Application web e-commerce expérimentale, conception frontend et intégration backend.',
    technologies: ['Angular', 'TypeScript', 'Firebase', 'REST API'],
    image: 'assets/bazar-comores.png',
    type: 'Projet personnel',
  },
];

const EXPERIENCES_DATA = [
  {
    company: 'TALAN',
    client: 'Bitpanda',
    role: 'Lead Développeur Java Angular',
    dates: 'Nov. 2025 – Avr. 2026',
    context: 'Conception d\'un POC bancaire permettant à TALAN de proposer aux établissements financiers une solution d\'intégration des services de trading crypto via les API Bitpanda, dans un environnement sécurisé et conforme aux contraintes réglementaires.',
    achievements: [
      'Pilotage de l\'architecture fonctionnelle et technique de la solution (équipe de 4 développeurs)',
      'Développement full-stack : API REST Java / Spring Boot et composants Angular',
      'Mise en place des pipelines CI/CD GitHub Actions et déploiement sur Microsoft Azure',
      'Démonstration et valorisation du POC auprès d\'établissements bancaires',
    ],
    technologies: ['Java 21', 'Spring Boot 3.4', 'Angular 20', 'Docker', 'Azure', 'GitHub Actions', 'Maven'],
    accent: '#FF806D',
    highlight: true,
    team: '4 développeurs',
  },
  {
    company: 'BPCE',
    client: 'HEXARQ',
    role: 'Développeur Java Angular',
    dates: 'Jan. 2024 – Oct. 2025',
    context: 'Développement d\'une plateforme de trading de cryptoactifs pour les clients particuliers de BPCE, sur une architecture microservices cloud (GCP) intégrant Kaiko (données de marché), Wyden (exécution d\'ordres) et Subledger (comptabilité).',
    achievements: [
      'Conception et développement de microservices backend avec API REST et gRPC',
      'Intégration des fournisseurs Kaiko (données crypto) et Wyden (exécution d\'ordres)',
      'Mise en place de communications asynchrones inter-services avec Google Pub/Sub',
      'Gestion de la valorisation des portefeuilles clients et des snapshots journaliers / mensuels',
      'Participation au cycle complet : conception, développement, tests, déploiement et monitoring',
    ],
    technologies: ['Java 17/21', 'Spring Boot 3.4', 'Angular 17', 'gRPC', 'Google Pub/Sub', 'GCP', 'Docker', 'GitLab CI/CD', 'JUnit'],
    accent: '#7CA7FF',
    highlight: true,
    team: '40+ ETP · 5 squads',
  },
  {
    company: 'GENERALI Assurance',
    client: null,
    role: 'Développeur Java',
    dates: 'Nov. 2022 – Déc. 2023',
    context: 'Transformation digitale de Generali : dématérialisation des parcours clients dans un espace en ligne centralisé, avec amélioration de la traçabilité et de l\'expérience client.',
    achievements: [
      'Développement d\'une API de suivi des demandes (FAST)',
      'Création d\'un client SOAP pour la gestion des créations de comptes (WSDL)',
      'Tests unitaires JUnit / Mockito et amélioration de la couverture du code métier',
      'Correction d\'anomalies via SonarQube et amélioration continue de la qualité du code',
    ],
    technologies: ['Java 16', 'Spring Boot 3', 'Angular 12', 'SOAP / WSDL', 'JUnit', 'Mockito', 'SonarQube', 'Maven'],
    accent: '#8DDFC5',
    highlight: false,
    team: '5 développeurs · 2 Tech Leads',
  },
  {
    company: 'ZEMUS',
    client: null,
    role: 'Développeur PHP / MySQL',
    dates: 'Nov. 2020 – Juil. 2022',
    context: 'Conception et développement d\'une plateforme internationale de recherche d\'actualités, centralisant des informations issues de médias du monde entier avec gestion des utilisateurs, favoris, revues de presse et traduction automatique.',
    achievements: [
      'Conception du moteur de recherche et de l\'architecture de base de données',
      'Intégration d\'API externes via cURL et traduction automatique des actualités',
      'Développement de la gestion des comptes utilisateurs, favoris et revues de presse',
    ],
    technologies: ['PHP', 'MySQL', 'JavaScript', 'jQuery', 'Bootstrap', 'Java 8', 'cURL'],
    accent: '#BCA7F2',
    highlight: false,
    team: '2 développeurs',
  },
];

/* ---- Scroll Reveal ---- */
function initReveal() {
  const selectors = [
    '.section-title', '.section-tab', '.about-layout', '.about-profile-card',
    '.hero-stats', '.skills-card', '.exp-card', '.project-card',
    '.blog-card', '.topic-card', '.learn-track', '.filter-bar', '.page-hero-sub',
  ].join(', ');

  document.querySelectorAll(selectors).forEach(el => {
    el.setAttribute('data-reveal', '');
  });

  /* stagger items inside grid/list containers */
  document.querySelectorAll(
    '.projects-grid, .experience-list, .skills-grid, .blog-grid, .topics-grid'
  ).forEach(container => {
    container.querySelectorAll('[data-reveal]').forEach((el, i) => {
      el.style.setProperty('--reveal-delay', `${i * 0.09}s`);
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}

/* ---- Bootstrap ---- */
async function init() {
  renderSkills(SKILLS_DATA);
  renderProjects(PROJECTS_DATA);
  renderExperiences(EXPERIENCES_DATA);
  initScrollSpy();
  initReveal();
}

document.addEventListener('DOMContentLoaded', init);
