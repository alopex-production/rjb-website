
document.addEventListener('DOMContentLoaded', () => {
  const menu=document.querySelector('.menu');
  const drawer=document.querySelector('.drawer');
  const close=document.querySelector('.close');
  if(menu && drawer){
    const shut=()=>{drawer.classList.remove('open');menu.classList.remove('is-open')};
    menu.addEventListener('click',()=>{
      const opening=!drawer.classList.contains('open');
      drawer.classList.toggle('open',opening);
      menu.classList.toggle('is-open',opening);
    });
    if(close) close.addEventListener('click',shut);
    drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click',shut));
  }

  // Explicitly target the actual structure of this Rjb page.
  const groups = [
    ['.hero-copy','reveal-right'],
    ['#concept > *',''],
    ['#owner .owner-photo','reveal-left'],
    ['#owner .owner-bio-card','reveal-right'],
    ['#owner .owner-name','reveal-left'],
    ['#owner .owner-points > *','reveal-scale'],
    ['.lineup > *',''],
    ['.lineup article:nth-of-type(odd)','reveal-left'],
    ['.lineup article:nth-of-type(even)','reveal-right'],
    ['.gallery > *','reveal-scale'],
    ['.school > *',''],
    ['.blog > *',''],
    ['.contact > *','reveal-scale']
  ];

  const targets=[];
  groups.forEach(([selector,effect])=>{
    document.querySelectorAll(selector).forEach((el,i)=>{
      if(el.closest('.topbar,.left-rail,.right-rail,.drawer')) return;
      el.classList.add('reveal-on-scroll');
      if(effect) el.classList.add(effect);
      el.style.transitionDelay=`${Math.min(i*90,270)}ms`;
      targets.push(el);
    });
  });

  // De-duplicate.
  const unique=[...new Set(targets)];

  if(!('IntersectionObserver' in window)){
    unique.forEach(el=>el.classList.add('visible'));
    return;
  }

  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.16,rootMargin:'0px 0px -12% 0px'});

  unique.forEach(el=>observer.observe(el));

  // Only reveal the very first viewport after styles have painted.
  setTimeout(()=>{
    unique.forEach(el=>{
      const r=el.getBoundingClientRect();
      if(r.top < innerHeight*.88 && r.bottom > 0) el.classList.add('visible');
    });
  },120);
});
