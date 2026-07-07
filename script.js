/* ============================================================
   CR7 TRIBUTE WEBSITE — INTERACTIVITY
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Navbar: background on scroll ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = ['home', 'timeline', 'portugal', 'goals', 'assists', 'honours', 'gallery', 'members']
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const linkFor = {};
  navLinks.querySelectorAll('a').forEach((a) => {
    linkFor[a.getAttribute('href').slice(1)] = a;
  });

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          Object.values(linkFor).forEach((a) => a.classList.remove('active'));
          const active = linkFor[entry.target.id];
          if (active) active.classList.add('active');
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((s) => navObserver.observe(s));

  /* ---------- Scroll reveal ---------- */
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  /* ---------- Count-up numbers ---------- */
  const fmt = (n) => n.toLocaleString('en-US');

  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = fmt(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = fmt(target);
    };
    requestAnimationFrame(tick);
  };

  const countObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  document.querySelectorAll('[data-count]').forEach((el) => countObserver.observe(el));

  /* ---------- Progress bar (road to 1,000) ---------- */
  const progressFill = document.getElementById('progressFill');
  if (progressFill) {
    const progressObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            progressFill.style.width = progressFill.dataset.width + '%';
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    progressObserver.observe(progressFill);
  }

  /* ---------- Goals-by-club bars ---------- */
  const barFills = document.querySelectorAll('.bar-fill');
  if (barFills.length) {
    const barObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.pct + '%';
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    barFills.forEach((b) => barObserver.observe(b));
  }

  /* ---------- Gallery: build from manifest + lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const galleryGrid = document.getElementById('galleryGrid');

  let gallerySrcs = [];   // every photo src, in gallery order
  let currentIndex = 0;

  const showAt = (index) => {
    if (!gallerySrcs.length) return;
    currentIndex = (index + gallerySrcs.length) % gallerySrcs.length; // wraps past either end
    lightboxImg.src = gallerySrcs[currentIndex];
    if (lightboxCounter) lightboxCounter.textContent = (currentIndex + 1) + ' / ' + gallerySrcs.length;
    // preload the neighbours so next/prev feels instant
    [currentIndex + 1, currentIndex - 1].forEach((n) => {
      const pre = new Image();
      pre.src = gallerySrcs[(n + gallerySrcs.length) % gallerySrcs.length];
    });
  };

  const openLightbox = (index) => {
    showAt(index);
    lightbox.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  };

  if (galleryGrid) {
    fetch('photos/gallery/manifest.json?v=4')
      .then((r) => r.json())
      .then((photos) => {
        gallerySrcs = photos.map((p) => p.src);
        photos.forEach((p, i) => {
          const item = document.createElement('div');
          item.className = 'gallery-item';

          const img = document.createElement('img');
          img.src = p.src;
          img.alt = 'Cristiano Ronaldo';
          img.loading = 'lazy';
          item.appendChild(img);

          item.addEventListener('click', () => openLightbox(i));
          galleryGrid.appendChild(item);
        });
        const countEl = document.querySelector('.gallery-count');
        if (countEl) countEl.textContent = photos.length + ' Photos';
      })
      .catch(() => {
        galleryGrid.innerHTML =
          '<p style="color:#aaa;grid-column:1/-1;">Gallery could not load.</p>';
      });
  }

  const closeLightbox = () => {
    lightbox.setAttribute('hidden', '');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  };

  const step = (delta) => showAt(currentIndex + delta);

  lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); step(-1); });
  if (lightboxNext) lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); step(1); });
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (lightbox.hasAttribute('hidden')) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
  });
})();
