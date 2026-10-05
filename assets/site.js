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
const slides = [...document.querySelectorAll('.slide')];
let slideIndex = 0;
document.querySelectorAll('[data-slide]').forEach((button) => {
  button.addEventListener('click', () => {
    slides[slideIndex]?.classList.remove('active');
    slideIndex = (slideIndex + Number(button.dataset.slide) + slides.length) % slides.length;
    slides[slideIndex]?.classList.add('active');
    document.querySelector('.slide-count').textContent = `${slideIndex + 1} / ${slides.length}`;
  });
});
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
