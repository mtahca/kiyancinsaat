'use strict';
document.documentElement.classList.add('js');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(expanded));
  navigation.classList.toggle('open', expanded);
});
navigation?.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation?.classList.contains('open')) {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.focus();
  }
});
const hero = document.querySelector('.hero');
const slides = [...document.querySelectorAll('.slide')];
if (hero && slides.length > 1) {
  const dots = [...hero.querySelectorAll('[data-slide-to]')];
  const pauseButton = hero.querySelector('.slide-pause');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let slideIndex = 0;
  let paused = reducedMotion.matches;
  let hovered = false;
  let focused = false;
  let timer = null;
  let touchStart = null;
  const showSlide = (index, announce = false) => {
    slideIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === slideIndex);
      slide.setAttribute('aria-hidden', String(i !== slideIndex));
    });
    dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === slideIndex)));
    hero.querySelector('.slide-count').textContent = `${slideIndex + 1} / ${slides.length}`;
    if (announce) hero.querySelector('.slide-announcement').textContent = `Görsel ${slideIndex + 1} / ${slides.length}`;
  };
  const updatePlayback = () => {
    clearInterval(timer);
    timer = null;
    pauseButton.setAttribute('aria-label', paused ? 'Otomatik geçişi başlat' : 'Otomatik geçişi durdur');
    pauseButton.innerHTML = paused ? '▶ <span>Başlat</span>' : 'Ⅱ <span>Durdur</span>';
    if (!paused && !hovered && !focused && !document.hidden) {
      timer = setInterval(() => showSlide(slideIndex + 1), 5000);
    }
  };
  const navigate = (index) => {
    paused = true;
    showSlide(index, true);
    updatePlayback();
  };
  hero.querySelectorAll('[data-slide]').forEach((button) => {
    button.addEventListener('click', () => navigate(slideIndex + Number(button.dataset.slide)));
  });
  dots.forEach((dot) => dot.addEventListener('click', () => navigate(Number(dot.dataset.slideTo))));
  pauseButton.addEventListener('click', () => { paused = !paused; updatePlayback(); });
  hero.addEventListener('mouseenter', () => { hovered = true; updatePlayback(); });
  hero.addEventListener('mouseleave', () => { hovered = false; updatePlayback(); });
  hero.addEventListener('focusin', () => { focused = true; updatePlayback(); });
  hero.addEventListener('focusout', (event) => {
    if (!hero.contains(event.relatedTarget)) { focused = false; updatePlayback(); }
  });
  hero.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      navigate(slideIndex + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  hero.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' && !event.target.closest('button')) touchStart = {x: event.clientX, y: event.clientY};
  });
  hero.addEventListener('pointerup', (event) => {
    if (!touchStart) return;
    const dx = event.clientX - touchStart.x;
    const dy = event.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) navigate(slideIndex + (dx < 0 ? 1 : -1));
  });
  hero.addEventListener('pointercancel', () => { touchStart = null; });
  document.addEventListener('visibilitychange', updatePlayback);
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) paused = true;
    updatePlayback();
  });
  updatePlayback();
}
const filters = [...document.querySelectorAll('[data-filter]')];
const projects = [...document.querySelectorAll('.project-card')];
filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((filter) => filter.setAttribute('aria-pressed', String(filter === button)));
    projects.forEach((project) => {
      project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter;
    });
    document.querySelector('.filter-count').textContent = `${projects.filter((project) => !project.hidden).length} proje`;
  });
});
const dialog = document.querySelector('.lightbox');
if (dialog && typeof dialog.showModal === 'function') {
  document.querySelectorAll('[data-gallery]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const image = dialog.querySelector('img');
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      dialog.querySelector('p').textContent = image.alt;
      document.body.classList.add('modal-open');
      dialog.showModal();
    });
  });
  dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    dialog.querySelector('img').removeAttribute('src');
  });
}
