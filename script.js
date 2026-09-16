document.documentElement.classList.add('js');

const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');

const setMenu = (open) => {
  links.classList.toggle('open', open);
  nav.classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', open);
};

toggle.addEventListener('click', () => setMenu(!links.classList.contains('open')));
links.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

const hero = document.querySelector('.hero');
if (hero) {
  const update = () => nav.classList.toggle('scrolled', window.scrollY > hero.offsetHeight - nav.offsetHeight);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// The gallery scrolls by -50%, so its tiles are duplicated for a seamless loop.
const track = document.querySelector('.marquee-track');
if (track) {
  [...track.children].forEach((tile) => {
    const copy = tile.cloneNode(true);
    copy.setAttribute('aria-hidden', 'true');
    track.appendChild(copy);
  });
}
