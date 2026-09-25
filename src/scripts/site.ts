import { initEnquiryDialog, initEnquiryForms } from './enquiry';
import { initNewsletter } from './newsletter';

function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;

  // The header is dark glass over the hero photo and white everywhere else.
  const updateTheme = () =>
    header.classList.toggle('on-dark', !header.hasAttribute('data-scrolled') && !header.hasAttribute('data-menu-open'));
  const onScroll = () => {
    header.toggleAttribute('data-scrolled', window.scrollY > 24);
    updateTheme();
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const toggle = header.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = header.querySelector<HTMLElement>('[data-mobile-menu]');
  if (!toggle || !menu) return;

  const setOpen = (open: boolean) => {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    const label = toggle.querySelector('.sr-only');
    if (label) label.textContent = open ? 'Close menu' : 'Open menu';
    header.toggleAttribute('data-menu-open', open);
    updateTheme();
  };

  toggle.addEventListener('click', () => setOpen(menu.hidden));
  menu.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', (e) => {
    if (!menu.hidden && !header.contains(e.target as Node)) setOpen(false);
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
    if (e.matches) setOpen(false);
  });
}

function initReveal() {
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
  );
  items.forEach((el) => observer.observe(el));
}

initHeader();
initReveal();
initEnquiryForms();
initEnquiryDialog();
initNewsletter();
