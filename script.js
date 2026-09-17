document.documentElement.classList.add('js');

const nav = document.querySelector('.nav');

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

// Live Instagram posts via a Behold.so JSON feed; the static photos stay if the feed is unset or fails.
const ig = document.querySelector('.ig[data-feed]');
if (ig && ig.dataset.feed) {
  fetch(ig.dataset.feed)
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
    .then((feed) => {
      const posts = (feed.posts || []).slice(0, 6);
      if (!posts.length) return;
      const grid = ig.querySelector('.ig-grid');
      grid.replaceChildren(...posts.map((post) => {
        const link = document.createElement('a');
        link.className = 'ig-post';
        if (post.mediaType === 'VIDEO') link.classList.add('is-video');
        link.href = post.permalink;
        link.target = '_blank';
        link.rel = 'noopener';

        const img = document.createElement('img');
        const size = post.sizes && (post.sizes.medium || post.sizes.small);
        img.src = (size && size.mediaUrl) || post.thumbnailUrl || post.mediaUrl;
        img.alt = post.altText || (post.prunedCaption || 'Instagram post').slice(0, 120);
        img.loading = 'lazy';
        link.appendChild(img);
        return link;
      }));
    })
    .catch(() => {});
}

// Cal.com booking calendar, loaded the first time the meeting row is opened.
const booking = document.getElementById('booking');
if (booking) {
  booking.addEventListener('toggle', () => {
    if (!booking.open || window.Cal) return;
    (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
    Cal("init", "travelmeeting", { origin: "https://cal.com" });
    Cal.ns.travelmeeting("inline", {
      elementOrSelector: "#cal-booking",
      calLink: "carmenscamera/travelmeeting",
      config: { layout: "month_view" },
    });
    Cal.ns.travelmeeting("ui", { layout: "month_view" });
  });
}
