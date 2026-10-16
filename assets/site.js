// ---- Contact details: fill these in before going live. ----
const CONTACT = {
    whatsapp: '8801914001901',
    email: 'zawadmonsur1@gmail.com',
};

const wa = CONTACT.whatsapp
    ? `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent('Hi Servora, I would like a demo for my restaurant.')}`
    : '#contact';
const mail = CONTACT.email ? `mailto:${CONTACT.email}?subject=${encodeURIComponent('Servora demo')}` : '#contact';

document.getElementById('cta-whatsapp').href = wa;
document.getElementById('cta-email').href = mail;
if (CONTACT.whatsapp) {
    document.querySelectorAll('[data-cta]').forEach((a) => { a.href = wa; a.target = '_blank'; a.rel = 'noopener'; });
    document.getElementById('cta-whatsapp').target = '_blank';
}

document.getElementById('year').textContent = new Date().getFullYear();

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// Billing toggle (prices tick over instead of jumping)
const buttons = document.querySelectorAll('[data-billing]');
buttons.forEach((btn) =>
    btn.addEventListener('click', () => {
        const yearly = btn.dataset.billing === 'yearly';
        buttons.forEach((b) => b.setAttribute('aria-checked', String(b === btn)));
        document.querySelectorAll('[data-monthly]').forEach((el) => {
            el.classList.add('tick');
            setTimeout(() => { el.textContent = yearly ? el.dataset.yearly : el.dataset.monthly; el.classList.remove('tick'); }, reduce ? 0 : 200);
        });
        document.querySelectorAll('[data-period]').forEach((el) => {
            el.textContent = yearly ? '/year' : '/month';
        });
    }),
);

// Split headings into words that rise from a mask.
document.querySelectorAll('.hero h1, .section-head h2, .qr-copy h2, .ai h2, .cta h2, .feature-title').forEach((h) => {
    const text = h.textContent.trim();
    h.setAttribute('aria-label', text);
    h.innerHTML = text.split(/\s+/).map((w, i) => `<span class="w" aria-hidden="true"><span style="--wi:${i}">${w}</span></span>`).join(' ');
    h.classList.add('split');
});

// Stagger: each revealing element gets its index among revealing siblings.
const groups = new Map();
document.querySelectorAll('.reveal, .wipe').forEach((el) => {
    const list = groups.get(el.parentElement) ?? [];
    list.push(el);
    groups.set(el.parentElement, list);
});
groups.forEach((list) => list.forEach((el, i) => el.style.setProperty('--i', String(i))));
document.querySelectorAll('.mini-list, .recipe').forEach((list) =>
    [...list.children].forEach((el, k) => el.style.setProperty('--k', String(k))),
);

// Reveal on scroll
const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        // Wipes are fully clipped until revealed, so the browser never reports them as visible: watch their container instead.
        e.target.querySelectorAll(':scope > .wipe').forEach((w) => w.classList.add('in'));
        io.unobserve(e.target);
        e.target.dispatchEvent(new CustomEvent('revealed'));
    }),
    { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
);
const heroTitle = document.querySelector('.hero h1');
document.querySelectorAll('.reveal, .split, .chat, .recipe').forEach((el) => { if (el !== heroTitle) io.observe(el); });
new Set([...document.querySelectorAll('.wipe')].map((w) => w.parentElement)).forEach((el) => io.observe(el));

// Hero intro plays once fonts are ready, so headline words don't reflow mid-animation.
heroTitle.style.setProperty('--base', '150ms');
const startIntro = () => requestAnimationFrame(() => { document.body.classList.add('loaded'); heroTitle.classList.add('in'); });
Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), wait(900)]).then(startIntro);

// Count-ups
const fmt = (v, decimals) => v.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
const countUp = (el, to, { decimals = 0, prefix = '', suffix = '', ms = 1400 } = {}) => {
    if (reduce) { el.textContent = prefix + fmt(to, decimals) + suffix; return; }
    const t0 = performance.now();
    const step = (t) => {
        const p = Math.min(1, (t - t0) / ms);
        el.textContent = prefix + fmt(to * (1 - Math.pow(1 - p, 4)), decimals) + suffix;
        if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
};
const recipe = document.querySelector('.recipe');
recipe?.addEventListener('revealed', () => {
    const pct = recipe.querySelector('.ok');
    const to = parseFloat(pct.textContent);
    pct.textContent = '0.0%';
    setTimeout(() => countUp(pct, to, { decimals: 1, suffix: '%', ms: 1600 }), 700);
});

// Live hero: the token ticks up and payments keep landing.
const token = document.querySelector('.chip-token b');
const pay = document.querySelector('.chip-pay');
const payments = [
    { amt: 1071, label: 'bKash · TrxID 9BX4K2', ico: 'bkash' },
    { amt: 640, label: 'Nagad · TrxID 7KD2QA', ico: 'nagad' },
    { amt: 2180, label: 'Card · Visa •• 4021', ico: 'card' },
    { amt: 385, label: 'Cash · change ৳115', ico: 'cash' },
];
if (!reduce && token && pay) {
    const amount = pay.querySelector('b');
    const label = pay.querySelector('small');
    const ico = pay.querySelector('.chip-ico');
    setTimeout(() => countUp(amount, 1071, { prefix: '৳', suffix: ' paid', ms: 1200 }), 1900);
    let n = 0;
    setInterval(() => {
        if (document.hidden) return;
        n = (n + 1) % payments.length;
        token.classList.remove('flip');
        void token.offsetWidth;
        token.classList.add('flip');
        setTimeout(() => { token.textContent = String(Number(token.textContent) + 1); }, 270);
        pay.classList.add('swap');
        setTimeout(() => {
            const p = payments[n];
            amount.textContent = `৳${fmt(p.amt, 0)} paid`;
            label.textContent = p.label;
            ico.className = `chip-ico ${p.ico}`;
            pay.classList.remove('swap', 'ping');
            void pay.offsetWidth;
            pay.classList.add('ping');
        }, 350);
    }, 4200);
}

// The 3D hero stage turns gently toward the pointer (desktop only).
const visual = document.querySelector('.hero-visual');
if (!reduce && finePointer && visual) {
    const hero = document.querySelector('.hero');
    hero.addEventListener('pointermove', (e) => {
        if (!document.body.classList.contains('loaded')) return;
        visual.classList.add('steer');
        visual.style.setProperty('--ry', `${((e.clientX / innerWidth - 0.5) * 10).toFixed(2)}deg`);
        visual.style.setProperty('--rx', `${((0.5 - e.clientY / innerHeight) * 7).toFixed(2)}deg`);
    });
    hero.addEventListener('pointerleave', () => { visual.style.setProperty('--ry', '0deg'); visual.style.setProperty('--rx', '0deg'); });
}

// Cursor spotlight on cards
if (finePointer) {
    document.querySelectorAll('.card, .bd, .mod-col').forEach((el) =>
        el.addEventListener('pointermove', (e) => {
            const r = el.getBoundingClientRect();
            el.style.setProperty('--mx', `${e.clientX - r.left}px`);
            el.style.setProperty('--my', `${e.clientY - r.top}px`);
        }),
    );
}

// Marquee: duplicate the list so the loop is seamless.
if (!reduce) {
    document.querySelectorAll('.marquee ul').forEach((ul) =>
        [...ul.children].forEach((li) => { const c = li.cloneNode(true); c.setAttribute('aria-hidden', 'true'); ul.appendChild(c); }),
    );
}

// AI chat plays as a conversation when it scrolls into view.
const chat = document.querySelector('.chat');
if (chat) {
    const typing = Object.assign(document.createElement('div'), { className: 'typing', innerHTML: '<i></i><i></i><i></i>' });
    typing.setAttribute('aria-hidden', 'true');
    const msgs = [...chat.querySelectorAll('.msg')];
    chat.addEventListener('revealed', async () => {
        if (reduce) { msgs.forEach((m) => m.classList.add('show')); return; }
        await wait(300);
        for (const m of msgs) {
            if (m.classList.contains('bot')) {
                m.before(typing);
                typing.classList.add('on');
                await wait(1100);
                typing.classList.remove('on');
            }
            m.classList.add('show');
            await wait(m.classList.contains('bot') ? 900 : 500);
        }
    });
}

// Nav state, scroll progress and phone parallax in one rAF-throttled scroll handler.
const nav = document.querySelector('.nav');
const bar = document.querySelector('.progress');
const phones = document.querySelector('.phones');
const stage = document.querySelector('.insight-stage');
const narrow = matchMedia('(max-width: 640px)');
let ticking = false;
const onScroll = () => {
    ticking = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.setProperty('--p', String(max > 0 ? scrollY / max : 0));
    nav.classList.toggle('scrolled', scrollY > 8);
    if (phones && !reduce) {
        const r = phones.getBoundingClientRect();
        const t = (r.top + r.height / 2 - innerHeight / 2) / innerHeight; // ~-1..1 around the viewport centre
        if (Math.abs(t) < 1.5) {
            phones.children[0].style.setProperty('--sy', `${(t * -40).toFixed(1)}px`);
            phones.children[1].style.setProperty('--sy', `${(t * 30).toFixed(1)}px`);
        }
    }
    if (stage && !reduce && !narrow.matches) {
        const r = stage.getBoundingClientRect();
        // 22deg lean while it enters from below, upright once its top is in the upper 40% of the screen
        const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight * 0.6)));
        stage.style.setProperty('--tilt', `${(22 * (1 - p)).toFixed(2)}deg`);
    }
};
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();

// Product imagery: no right-click save or drag (a deterrent, not a lock).
document.querySelectorAll('.protect').forEach((el) => {
    el.addEventListener('contextmenu', (e) => e.preventDefault());
    el.addEventListener('dragstart', (e) => e.preventDefault());
});
