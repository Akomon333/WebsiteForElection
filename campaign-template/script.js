document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      links.classList.toggle('open');
      toggle.textContent = links.classList.contains('open') ? '✕' : '☰';
    });
  }

  // Simple reveal-on-scroll
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, {threshold: 0.12});

  reveals.forEach(r => io.observe(r));

  // Counters in hero
  const counters = document.querySelectorAll('.count');
  const runCounter = (el, target) => {
    let current = 0;
    const step = Math.max(1, Math.floor(target / 120));
    const id = setInterval(() => {
      current += step;
      if (current >= target) { el.textContent = target; clearInterval(id); }
      else el.textContent = current;
    }, 12);
  };

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        counters.forEach(c => runCounter(c, parseInt(c.dataset.target || '0', 10)));
        heroObserver.disconnect();
      }
    });
  }, {threshold: 0.2});
  const heroSection = document.querySelector('.hero');
  if (heroSection) heroObserver.observe(heroSection);

  // Smooth scrolling for anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (ev) => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) { ev.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'}); }
    });
  });

  // Volunteer form handling (mock)
  const vform = document.getElementById('volunteer-form');
  const vmsg = document.getElementById('volunteer-msg');
  if (vform) {
    vform.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const name = vform.elements['name'].value.trim();
      const email = vform.elements['email'].value.trim();
      if (!name || !email) { vmsg.textContent = 'Please fill in name and email.'; return; }
      vmsg.textContent = 'Thank you — we will contact you soon.';
      vform.reset();
    });
  }

  // Subscribe form (mock)
  const sform = document.getElementById('subscribe-form');
  const smsg = document.getElementById('subscribe-msg');
  if (sform) {
    sform.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const email = document.getElementById('s-email').value.trim();
      if (!email) { smsg.textContent = 'Enter a valid email.'; return; }
      smsg.textContent = 'Subscribed — check your inbox for confirmation.';
      sform.reset();
    });
  }
});