document.documentElement.classList.add('js');

const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  const isOpen = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
});

links.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const timecode = document.querySelector('.timecode');
if (timecode) {
  const start = performance.now();
  const pad = (n) => String(n).padStart(2, '0');
  setInterval(() => {
    const elapsed = (performance.now() - start) / 1000;
    const h = Math.floor(elapsed / 3600);
    const m = Math.floor(elapsed / 60) % 60;
    const s = Math.floor(elapsed) % 60;
    const f = Math.floor((elapsed % 1) * 24);
    timecode.textContent = `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`;
  }, 1000 / 24);
}

// The film strip scrolls by -50%, so the frames are duplicated for a seamless loop.
const track = document.querySelector('.film-track');
if (track) {
  [...track.children].forEach((frame) => {
    const copy = frame.cloneNode(true);
    copy.setAttribute('aria-hidden', 'true');
    track.appendChild(copy);
  });
}
