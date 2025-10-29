// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Fade-in animation
function fadeInOnScroll() {
  const elements = document.querySelectorAll('.fade-in');
  const windowHeight = window.innerHeight;

  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < windowHeight - 150) {
      element.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// Navigation active state
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a');
  let currentSection = '';
  sections.forEach(section => {
    if (section.getBoundingClientRect().top <= 100)
      currentSection = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === currentSection)
      link.classList.add('active');
  });
}
window.addEventListener('scroll', updateActiveNav);

// Throttle for performance
function throttle(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
const throttledScroll = throttle(() => {
  fadeInOnScroll();
  updateActiveNav();
}, 10);
window.addEventListener('scroll', throttledScroll);

// Inject CSS for active nav + loading
const style = document.createElement('style');
style.textContent = `
  .nav a.active { background-color: #3498db; }
  @media (max-width: 768px) {
    .nav ul.mobile-active { display: flex !important; }
  }
  body { opacity: 0; transition: opacity 0.5s ease-in-out; }
`;
document.head.appendChild(style);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '1';
  console.log('Nguyen Kha Duong - Profile Loaded');
});
