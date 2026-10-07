const menu=document.querySelector('.menu');
const drawer=document.querySelector('.drawer');
const close=document.querySelector('.close');
function openMenu(){drawer.classList.add('open');menu.classList.add('is-open');}
function closeMenu(){drawer.classList.remove('open');menu.classList.remove('is-open');}
menu.addEventListener('click',()=>drawer.classList.contains('open')?closeMenu():openMenu());
close.addEventListener('click',closeMenu);
drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
