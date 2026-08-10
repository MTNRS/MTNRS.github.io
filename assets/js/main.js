const projects = [
  { name: 'OpenJarvis', description: 'Plataforma de asistentes y agentes de IA orientada a automatizar trabajo real.', tags: ['Python', 'AI agents', 'Automation'], accent: '#c9b5ee', href: 'https://github.com/MTNRS/OpenJarvis' },
  { name: 'Cuevas MotorSport', description: 'Experiencia web para servicios de automocion, alquiler y asistencia en carretera.', tags: ['JavaScript', 'Web', 'Product'], accent: '#f2a6c8', href: 'https://github.com/MTNRS/CuevasMotorSport' },
  { name: 'MenuSpreader', description: 'Herramienta para crear, organizar y distribuir cartas digitales de forma sencilla.', tags: ['JavaScript', 'SaaS', 'UX'], accent: '#9edce2', href: 'https://github.com/MTNRS/MenuSpreader' },
  { name: 'TokenMinimizer', description: 'Utilidad enfocada en reducir contexto y optimizar el consumo de tokens.', tags: ['Python', 'LLM', 'Developer tool'], accent: '#f3c6a8', href: 'https://github.com/MTNRS/TokenMinimizer' },
  { name: 'HomeLab Indexer', description: 'Panel ligero para descubrir, ordenar y acceder a servicios de un homelab.', tags: ['Web', 'Infrastructure', 'Tools'], accent: '#b8d8ba', href: 'https://github.com/MTNRS/HomeLab-Indexer' },
  { name: 'Proyecto Inspirador', description: 'Exploracion creativa de interfaces y experiencias digitales interactivas.', tags: ['Frontend', 'Creative code', 'UI'], accent: '#d9b8ee', href: 'https://github.com/MTNRS/ProyectoInspirador' }
];

const grid = document.querySelector('#project-grid');
grid.innerHTML = projects.map((project, index) => `
  <a class="project-card" style="--accent:${project.accent}" href="${project.href}" target="_blank" rel="noreferrer">
    <div class="project-card__top"><span class="project-card__number">${String(index + 1).padStart(2, '0')}</span><span class="project-card__status">Proyecto seleccionado</span></div>
    <h3>${project.name}</h3><p>${project.description}</p>
    <div class="project-card__footer"><div class="project-card__tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div><span class="project-card__arrow" aria-hidden="true">↗</span></div>
  </a>`).join('');

document.querySelector('#year').textContent = new Date().getFullYear();
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
