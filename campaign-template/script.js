document.addEventListener('DOMContentLoaded', () => {
  /* ===== NAV TOGGLE ===== */
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

  /* ===== REVEAL ON SCROLL ===== */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.12 });
    reveals.forEach(r => io.observe(r));
  }

  /* ===== HERO COUNTERS ===== */
  const counters = document.querySelectorAll('.count');
  if (counters.length) {
    const runCounter = (el, target) => {
      let current = 0;
      const step = Math.max(1, Math.floor(target / 120));
      const id = setInterval(() => {
        current += step;
        if (current >= target) { el.textContent = target; clearInterval(id); }
        else el.textContent = current;
      }, 12);
    };

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      const heroObserver = new IntersectionObserver((entries, observer) => {
        if (entries.some(e => e.isIntersecting)) {
          counters.forEach(c => runCounter(c, parseInt(c.dataset.target || '0', 10)));
          observer.disconnect();
        }
      }, { threshold: 0.2 });
      heroObserver.observe(heroSection);
    }
  }

  /* ===== SMOOTH SCROLL ===== */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (ev) => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) { ev.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  /* ===== PLAN BUTTON ZOOM ===== */
  const planBtn = document.getElementById('plan-btn');
  const issuesGrid = document.querySelector('.issues-grid');
  if (planBtn && issuesGrid) {
    planBtn.addEventListener('click', () => {
      issuesGrid.classList.add('zoom-target');
      setTimeout(() => issuesGrid.classList.add('zoomed'), 30);
      setTimeout(() => issuesGrid.classList.remove('zoomed'), 1600);
      setTimeout(() => issuesGrid.classList.remove('zoom-target'), 2000);
    });
  }

  /* ===== VOLUNTEER FORM (JSONP) ===== */
  const vform = document.getElementById('volunteer-form');
  const vmsg = document.getElementById('volunteer-msg');

  if (vform) {
    const submitBtn = vform.querySelector('button[type="submit"]');
    let submitting = false; // prevent double submits

    // Global callback for JSONP
    window.volunteerCallback = function(data) {
      submitting = false;
      submitBtn.disabled = false;

      if (data.success) {
        vmsg.textContent = 'Thanks — your signup was received.';
        vform.reset();
      } else {
        vmsg.textContent = 'Submission failed. Please email akomon10@gmail.com.';
      }

      // Remove the last injected JSONP script
      const scripts = document.querySelectorAll('script[data-volunteer-jsonp]');
      if (scripts.length) scripts[scripts.length - 1].remove();
    };

    vform.addEventListener('submit', (ev) => {
      ev.preventDefault();
      if (submitting) return; // prevent double submit

      const name = vform.elements['name'].value.trim();
      const email = vform.elements['email'].value.trim();
      const interest = vform.elements['interest'].value;

      if (!name || !email) {
        vmsg.textContent = 'Please fill in name and email.';
        return;
      }

      vmsg.textContent = 'Sending...';
      submitting = true;
      submitBtn.disabled = true;

      // Build JSONP GET request
      const params = new URLSearchParams({
        name: name,
        email: email,
        interest: interest,
        callback: 'volunteerCallback'
      });

      const script = document.createElement('script');
      script.src = vform.action + '?' + params.toString();
      script.setAttribute('data-volunteer-jsonp', 'true');
      document.body.appendChild(script);
    });
  }
});