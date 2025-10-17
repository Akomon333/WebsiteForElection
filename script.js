const counters = document.querySelectorAll('.count');
if (counters.length) {
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
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
counters.forEach(c => {
runCounter(c, parseInt(c.dataset.target || '0', 10));
 });
observer.disconnect();
 }
 });
 }, { threshold: 0.5 });
const heroSection = document.querySelector('.hero');
if (heroSection) observer.observe(heroSection);
}

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
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

/* ===== MOBILE MENU TOGGLE ===== */
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  // Set initial mobile styles if on mobile
  const applyMobileStyles = () => {
    if (window.innerWidth <= 640) {
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.backgroundColor = 'white';
      navLinks.style.flexDirection = 'column';
      navLinks.style.padding = '1rem';
      navLinks.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
      navLinks.style.borderTop = '1px solid var(--border)';
      navLinks.style.zIndex = '99';
    } else {
      // Reset styles for desktop
      navLinks.style.position = '';
      navLinks.style.top = '';
      navLinks.style.left = '';
      navLinks.style.right = '';
      navLinks.style.backgroundColor = '';
      navLinks.style.flexDirection = '';
      navLinks.style.padding = '';
      navLinks.style.boxShadow = '';
      navLinks.style.borderTop = '';
      navLinks.style.display = 'flex';
      navLinks.classList.remove('show');
    }
  };
  
  applyMobileStyles();
  
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('show');
    
    if (isOpen) {
      // Close menu with animation
      navLinks.classList.remove('show');
      toggle.textContent = '☰';
      setTimeout(() => {
        navLinks.style.display = 'none';
      }, 300); // Wait for animation to finish
    } else {
      // Open menu with animation
      navLinks.style.display = 'flex';
      applyMobileStyles();
      setTimeout(() => {
        navLinks.classList.add('show');
      }, 10); // Small delay to trigger animation
      toggle.textContent = '✕';
    }
  });
  
  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 640) {
        navLinks.classList.remove('show');
        toggle.textContent = '☰';
        setTimeout(() => {
          navLinks.style.display = 'none';
        }, 300);
      }
    });
  });
  
  // Handle window resize
  window.addEventListener('resize', () => {
    applyMobileStyles();
  });
}