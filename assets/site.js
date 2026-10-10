// ---- Contact details: fill these in before going live. ----
const CONTACT = {
    whatsapp: '', // e.g. '8801XXXXXXXXX' (country code, no +)
    email: '', // e.g. 'hello@servora.com.bd'
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

// Billing toggle
const buttons = document.querySelectorAll('[data-billing]');
buttons.forEach((btn) =>
    btn.addEventListener('click', () => {
        const yearly = btn.dataset.billing === 'yearly';
        buttons.forEach((b) => b.setAttribute('aria-checked', String(b === btn)));
        document.querySelectorAll('[data-monthly]').forEach((el) => {
            el.textContent = yearly ? el.dataset.yearly : el.dataset.monthly;
        });
        document.querySelectorAll('[data-period]').forEach((el) => {
            el.textContent = yearly ? '/year' : '/month';
        });
    }),
);

// Reveal on scroll
const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
);
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Product imagery: no right-click save or drag (a deterrent, not a lock).
document.querySelectorAll('.protect').forEach((el) => {
    el.addEventListener('contextmenu', (e) => e.preventDefault());
    el.addEventListener('dragstart', (e) => e.preventDefault());
});
