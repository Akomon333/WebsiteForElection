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

  // Plan button zoom effect
  const planBtn = document.getElementById('plan-btn');
  const issuesGrid = document.querySelector('.issues-grid');
  if (planBtn && issuesGrid) {
    planBtn.addEventListener('click', (ev) => {
      // zoom effect
      issuesGrid.classList.add('zoom-target');
      setTimeout(() => issuesGrid.classList.add('zoomed'), 30);
      setTimeout(() => issuesGrid.classList.remove('zoomed'), 1600);
      setTimeout(() => issuesGrid.classList.remove('zoom-target'), 2000);
    });
  }

  // Volunteer form handling via Google Apps Script
  const vform = document.getElementById('volunteer-form');
  const vmsg = document.getElementById('volunteer-msg');
  if (vform) {
    vform.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      const name = vform.elements['name'].value.trim();
      const email = vform.elements['email'].value.trim();
      const interest = vform.elements['interest'].value;
      if (!name || !email) { vmsg.textContent = 'Please fill in name and email.'; return; }
      vmsg.textContent = 'Sending...';
      try {
        const resp = await fetch(vform.action, {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, interest })
        });
        if (resp.ok) {
          vmsg.textContent = 'Thanks — your signup was received.';
          vform.reset();
        } else {
          vmsg.textContent = 'Submission failed. Please email akomon10@gmail.com.';
        }
      } catch (err) {
        vmsg.textContent = 'Network error. Please try again or email akomon10@gmail.com.';
      }
    });
  }

  // Voting countdown and UI
  const votingCard = document.getElementById('voting-card');
  if (votingCard) {
    const startISO = votingCard.dataset.start;
    const endISO = votingCard.dataset.end;
    const start = new Date(startISO);
    const end = new Date(endISO);
    const badge = document.getElementById('vote-badge');
    const countdownEl = document.getElementById('vote-countdown');
    const windowEl = document.getElementById('vote-window');
    const voteBtn = document.getElementById('vote-open-btn');
    const detailsBtn = document.getElementById('vote-show-details');
    const panel = document.getElementById('vote-panel');
    const voteForm = document.getElementById('vote-form');
    const feedback = document.getElementById('vote-feedback');

    const fmt = (d) => d.toLocaleString();
    if (windowEl) windowEl.textContent = `${fmt(start)} — ${fmt(end)}`;

    function update() {
      const now = new Date();
      if (now < start) {
        badge.textContent = 'Opens';
        badge.classList.remove('open');
        badge.classList.add('closed');
        voteBtn.disabled = true;
        const ms = start - now;
        countdownEl.textContent = msToTime(ms);
      } else if (now > end) {
        badge.textContent = 'Closed';
        badge.classList.remove('open');
        badge.classList.add('closed');
        voteBtn.disabled = true;
        countdownEl.textContent = '00:00:00';
      } else {
        badge.textContent = 'Open';
        badge.classList.remove('closed');
        badge.classList.add('open');
        voteBtn.disabled = false;
        const ms = end - now;
        countdownEl.textContent = msToTime(ms);
      }
    }

    function msToTime(ms) {
      if (ms < 0) return '00:00:00';
      const s = Math.floor(ms / 1000) % 60;
      const m = Math.floor(ms / 1000 / 60) % 60;
      const h = Math.floor(ms / 1000 / 60 / 60);
      return [h, m, s].map(n => String(n).padStart(2,'0')).join(':');
    }

    update();
    const interval = setInterval(update, 1000);

    // details toggle
    if (detailsBtn && panel) {
      detailsBtn.addEventListener('click', () => {
        const open = !panel.hasAttribute('hidden');
        if (open) { panel.setAttribute('hidden', ''); detailsBtn.textContent = 'Details'; }
        else { panel.removeAttribute('hidden'); detailsBtn.textContent = 'Hide'; }
      });
    }

    // Vote button opens details when open
    if (voteBtn && panel) {
      voteBtn.addEventListener('click', () => {
        panel.removeAttribute('hidden');
        panel.scrollIntoView({behavior:'smooth',block:'center'});
      });
    }

    // handle vote form (mock)
    if (voteForm) {
      voteForm.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const choice = voteForm.elements['choice'].value;
        feedback.textContent = `Recorded demo vote for ${choice}. (No real effect.)`;
        // disable confirm briefly
        const btn = document.getElementById('vote-confirm-btn');
        if (btn) { btn.disabled = true; setTimeout(() => btn.disabled = false, 4000); }
      });
    }

    // cleanup when leaving page
    window.addEventListener('beforeunload', () => clearInterval(interval));
  }

});