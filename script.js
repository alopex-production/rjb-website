
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu');
  const drawer = document.querySelector('.drawer');
  const close = document.querySelector('.close');

  if (menu && drawer) {
    const openMenu = () => {
      drawer.classList.add('open');
      menu.classList.add('is-open');
    };
    const closeMenu = () => {
      drawer.classList.remove('open');
      menu.classList.remove('is-open');
    };
    menu.addEventListener('click', () => drawer.classList.contains('open') ? closeMenu() : openMenu());
    if (close) close.addEventListener('click', closeMenu);
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  }

  // Animate visible content as it enters the viewport.
  const selectors = [
    '.hero-copy',
    '.hero-media',
    '#owner .section-head',
    '#owner .owner-photo',
    '#owner .owner-copy',
    '.lineup .section-head',
    '.lineup article',
    '#school .section-head',
    '#school .school-copy',
    '#school .school-media',
    '.gallery .section-head',
    '.gallery figure',
    '.contact .section-head',
    '.contact .contact-inner'
  ];

  const items = [];
  selectors.forEach((selector, groupIndex) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('motion-item');
      if (/photo|media|figure/.test(selector)) el.classList.add(i % 2 ? 'from-right' : 'from-left');
      el.classList.add(`motion-delay-${Math.min((i % 3) + 1, 3)}`);
      items.push(el);
    });
  });

  document.body.classList.add('motion-ready');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
    items.forEach(el => observer.observe(el));
  } else {
    items.forEach(el => el.classList.add('is-visible'));
  }

  // Above-the-fold items should animate immediately.
  requestAnimationFrame(() => {
    items.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.95) el.classList.add('is-visible');
    });
  });
});
