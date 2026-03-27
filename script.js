/* ─────────────────────────────────────────
   script.js — Dhruv Grover Landing Page
   ───────────────────────────────────────── */

/* ── Scroll-reveal via IntersectionObserver ── */
(function initReveal() {
  // Add .reveal to every major section child that isn't already .fade-up
  const targets = document.querySelectorAll(
    '.stats-inner, .system-grid, .sys-card, .pricing-card, ' +
    '.who-grid, .about-inner, .cta-inner, ' +
    '.section-label, .section-title, .section-sub'
  );

  targets.forEach((el) => {
    if (!el.classList.contains('fade-up')) {
      el.classList.add('reveal');
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate only once
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();


/* ── Nav: add shadow + slight bg on scroll ── */
(function initNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.style.background = 'rgba(10,10,15,0.95)';
      nav.style.boxShadow = '0 1px 0 #1e1e2e, 0 4px 24px rgba(0,0,0,0.4)';
    } else {
      nav.style.background = 'rgba(10,10,15,0.75)';
      nav.style.boxShadow = 'none';
    }
  }, { passive: true });
})();


/* ── Smooth scroll for anchor links ── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();


/* ── Stat counter animation ── */
(function initCounters() {
  const stats = document.querySelectorAll('.stat-number');

  const parseValue = (text) => {
    // Extract numeric part, preserve prefix/suffix symbols
    const match = text.match(/([^0-9]*)(\d+)([^0-9]*)/);
    if (!match) return null;
    return { prefix: match[1], value: parseInt(match[2], 10), suffix: match[3] };
  };

  const animateCounter = (el, target, prefix, suffix, duration = 1200) => {
    const start = performance.now();
    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = `${prefix}${current}${suffix}`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const parsed = parseValue(el.textContent);
        if (!parsed) return;
        animateCounter(el, parsed.value, parsed.prefix, parsed.suffix);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach((el) => observer.observe(el));
})();
