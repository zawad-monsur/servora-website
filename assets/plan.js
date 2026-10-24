/* Build your plan: pick features, see the price, send the result to us. */

// Monthly price per branch. BDT for Bangladesh, USD for everyone else.
const BASE = {
    name: 'Register & essentials',
    desc: 'Fast billing, menu with sizes and add-ons, dine-in, takeaway and mixed orders, receipts in your language, daily tokens, VAT and extra charges, silent printing, a daily sales dashboard, and an offline register with live updates between screens.',
    BDT: 840,
    USD: 19,
};
const REGISTER = { BDT: 300, USD: 6 }; // each register after the first
const SETUP = { BDT: 3000, USD: 49 }; // one-off; free on yearly plans

const GROUPS = [
    {
        title: 'Counter & payments',
        items: [
            { id: 'discounts', name: 'Discounts', desc: 'Preset and custom discounts with limits and a reason on every one.', BDT: 150, USD: 3 },
            { id: 'split', name: 'Split payments', desc: 'Pay one bill several ways, like part cash and part card or mobile wallet.', BDT: 100, USD: 2 },
            { id: 'shifts', name: 'Shifts & cash drawer', desc: 'Opening cash, pay-ins and pay-outs, a blind count at close and shortages per cashier.', BDT: 250, USD: 5 },
        ],
    },
    {
        title: 'Dine-in & kitchen',
        items: [
            { id: 'tables', name: 'Table floor plan', desc: 'Draw your own floors; see free and busy tables; move, merge and split bills.', BDT: 400, USD: 8 },
            { id: 'kitchen', name: 'Kitchen screen', desc: 'Orders on a kitchen screen with timers; guests see live status (received, preparing, ready) on their phone.', BDT: 400, USD: 8 },
            { id: 'stations', name: 'Kitchen & bar stations', desc: 'Drinks to the bar, food to the kitchen: each station gets its own screen and printer.', BDT: 200, USD: 4 },
        ],
    },
    {
        title: 'Stock & costs',
        items: [
            { id: 'inventory', name: 'Inventory', desc: 'Stock levels, receiving, waste, counts and low-stock alerts.', BDT: 300, USD: 6 },
            { id: 'recipes', name: 'Recipes & food cost', desc: 'Ingredients per dish, deducted on every sale, with the true cost and profit of each dish.', BDT: 200, USD: 4, requires: ['inventory'] },
        ],
    },
    {
        title: 'Guests',
        items: [
            { id: 'customers', name: 'Customers', desc: 'Phone-first guest records with visits and spend.', BDT: 250, USD: 5 },
            { id: 'qr', name: 'QR digital menu', desc: 'A live mobile menu with photos, in two languages, and a QR code per table.', BDT: 250, USD: 5 },
            { id: 'qr-order', name: 'Order from the QR menu', desc: 'Guests order from their table; staff accept it on the register and it goes to the kitchen.', BDT: 300, USD: 6, requires: ['qr'] },
            { id: 'feedback', name: 'Guest feedback', desc: 'A “Rate your visit” QR on every receipt and the menu; ratings, comments and follow-up in one inbox.', BDT: 150, USD: 3 },
        ],
    },
    {
        title: 'Reports',
        items: [
            { id: 'analytics', name: 'Analytics', desc: 'Busiest hours, best and worst dishes, payment mix and staff performance.', BDT: 300, USD: 6 },
        ],
    },
    {
        title: 'Coming soon',
        soon: true,
        note: 'Tick what you’d use. It costs nothing now; it tells us what to build first, and we’ll let you know when it’s ready.',
        sections: [
            ['Dine-in & service', [
                ['waiter', 'Waiter app', 'Waiters take orders at the table from their phone.'],
                ['qr-pay', 'Pay from the QR menu', 'Guests pay the bill on their phone (bKash, Nagad or card where available); the table is marked paid on the register.'],
                ['pickup', 'Pickup screen', 'A TV showing token numbers as orders become ready.'],
                ['display', 'Customer display', 'A second screen facing the guest with the live bill and a payment QR.'],
                ['preorders', 'Pre-orders & Ramadan mode', 'Iftar boxes, time-slot pickups and bulk corporate orders.'],
                ['reservations', 'Reservations & waitlist', 'Bookings, a waitlist and an SMS when the table is ready.'],
                ['foodcourt', 'Food court mode', 'Many vendors behind one QR, with separate tickets and settlement.'],
            ]],
            ['Guests & marketing', [
                ['promotions', 'Promotions engine', 'Coupons, happy hours, combos, buy-one-get-one and manager approval.'],
                ['loyalty', 'Loyalty & stamp cards', 'Points, tiers and stamp cards for regulars.'],
                ['offers', 'Guest insights & personal offers', 'Each guest’s habits, who is overdue, and one-to-one offers.'],
                ['sms', 'SMS campaigns', 'Offers by SMS to guests who opted in.'],
                ['ereceipts', 'Digital receipts', 'Send the receipt by SMS or WhatsApp.'],
                ['credit', 'Due ledger (baki khata)', 'Credit for regulars and companies, with due collection.'],
            ]],
            ['Menu & back office', [
                ['dietary', 'Allergens & portions', 'Allergen and diet labels from recipes, and portion sizes on the menu.'],
                ['swaps', 'Swaps & holds', '“No onion, extra cheese” at the register; stock and allergens follow.'],
                ['purchasing', 'Purchasing & suppliers', 'Purchase orders, suppliers and supplier dues.'],
                ['expenses', 'Expenses', 'Rent, salaries and bills, for the real profit.'],
                ['payroll', 'Attendance & payroll', 'Clock in and out, hours and salary sheets.'],
                ['accounting', 'Accounting', 'Daily sales, expenses and payments ready for your accountant.'],
            ]],
            ['Reports & AI', [
                ['menu-eng', 'Menu engineering', 'Which dishes to promote, reprice or drop.'],
                ['digest', 'Owner daily digest', 'Yesterday’s numbers on WhatsApp every morning.'],
                ['benchmark', 'Area benchmarks', 'How you compare with similar restaurants nearby, anonymously.'],
                ['ai', 'Ask your business (AI)', 'Ask questions in plain words and get answers from your data.'],
                ['ai-guard', 'Theft & loss alerts (AI)', 'Alerts for unusual voids, discounts and cash shortages.'],
                ['ai-concierge', 'AI menu for guests', '“Something spicy under ৳400” on the QR menu, skipping allergies.'],
                ['ai-import', 'Menu from a photo (AI)', 'Photograph the printed menu; dishes and prices are filled in.'],
                ['ai-forecast', 'Prep & stock forecast (AI)', 'What to prep and order for tomorrow.'],
            ]],
            ['Scale & compliance', [
                ['multibranch', 'Multi-branch control', 'One menu with branch pricing, stock transfers and combined reports.'],
                ['vat', 'Official VAT reports', 'Government VAT invoices and returns (Mushak 6.3 in Bangladesh).'],
                ['api', 'API & webhooks', 'Connect your own apps and services.'],
            ]],
        ],
    },
];

// The bundles on the home page. A bundle is suggested when it covers the selection for less.
const PLANS = [
    { name: 'Lite', registers: 1, includes: ['discounts'], BDT: 990, USD: 22 },
    { name: 'Growth', registers: 2, includes: ['discounts', 'split', 'shifts', 'inventory', 'recipes', 'customers', 'qr', 'feedback', 'analytics'], BDT: 1990, USD: 45 },
    { name: 'Pro', registers: 3, includes: ['discounts', 'split', 'shifts', 'inventory', 'recipes', 'customers', 'qr', 'qr-order', 'feedback', 'analytics', 'tables', 'kitchen', 'stations'], BDT: 3490, USD: 79 },
];

// Roadmap sections are [title, [[id, name, desc]]] for brevity.
GROUPS.filter((g) => g.sections).forEach((g) => (g.items = g.sections.flatMap(([, rows]) => rows.map(([id, name, desc]) => ({ id, name, desc })))));
const ITEMS = Object.fromEntries(GROUPS.flatMap((g) => g.items.map((i) => [i.id, { ...i, soon: !!g.soon }])));
const CONTACT = window.CONTACT || {};

// ---- State (kept in the URL so a plan can be shared) ----
const params = new URLSearchParams(location.search);
const guessCurrency = () => {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Dhaka' ? 'BDT' : 'USD';
    } catch {
        return 'BDT';
    }
};
const state = {
    currency: params.get('c') === 'USD' || params.get('c') === 'BDT' ? params.get('c') : guessCurrency(),
    billing: params.get('b') === 'yearly' ? 'yearly' : 'monthly',
    branches: clamp(Number(params.get('br')) || 1, 1, 50),
    registers: clamp(Number(params.get('r')) || 1, 1, 10),
    picked: new Set((params.get('f') ?? 'discounts,shifts').split(',').filter((id) => ITEMS[id])),
};
// A shared link may name a feature without the one it needs.
[...state.picked].forEach((id) => (ITEMS[id].requires ?? []).forEach((r) => state.picked.add(r)));

function clamp(n, lo, hi) {
    return Math.min(hi, Math.max(lo, Math.round(n)));
}

function money(amount, currency = state.currency) {
    return currency === 'BDT'
        ? `৳${Math.round(amount).toLocaleString('en-IN')}`
        : `$${amount.toLocaleString('en-US', { minimumFractionDigits: amount % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;
}

// ---- Render the feature list ----
const featuresEl = document.getElementById('features');
featuresEl.innerHTML = GROUPS.map((g) =>
    g.soon
        ? `
    <section class="fgroup soon-group">
        <h2>${g.title} <span class="soon">Roadmap</span></h2>
        <p class="fgroup-note">${g.note}</p>
        <div class="chip-sections">
            ${g.sections
                .map(
                    ([title, rows]) => `
                <div class="chip-section">
                    <h3>${title}</h3>
                    <div class="chips">
                        ${rows.map(([id, name, desc]) => `<label class="fchip" title="${desc}"><input type="checkbox" value="${id}" ${state.picked.has(id) ? 'checked' : ''}><span>${name}</span></label>`).join('')}
                    </div>
                </div>`,
                )
                .join('')}
        </div>
    </section>`
        : `
    <section class="fgroup">
        <h2>${g.title}</h2>
        ${g === GROUPS[0] ? baseCard() : ''}
        <div class="fcards">
            ${g.items
                .map(
                    (i) => `
                <label class="fcard">
                    <input type="checkbox" value="${i.id}" ${state.picked.has(i.id) ? 'checked' : ''}>
                    <span class="fcheck" aria-hidden="true"></span>
                    <span class="fbody">
                        <span class="fname">${i.name}</span>
                        <span class="fdesc">${i.desc}</span>
                        ${i.requires ? `<span class="freq">Needs ${i.requires.map((r) => ITEMS[r].name).join(', ')}, added for you</span>` : ''}
                    </span>
                    <span class="fprice" data-price="${i.id}"></span>
                </label>`,
                )
                .join('')}
        </div>
    </section>`,
).join('');

function baseCard() {
    return `
        <div class="fcard is-base" aria-label="Always included">
            <span class="fcheck on" aria-hidden="true"></span>
            <span class="fbody">
                <span class="fname">${BASE.name} <span class="fbadge">Always included</span></span>
                <span class="fdesc">${BASE.desc}</span>
            </span>
            <span class="fprice" data-price="base"></span>
        </div>`;
}

featuresEl.addEventListener('change', (e) => {
    const box = e.target.closest('input[type=checkbox]');
    if (!box) return;
    const item = ITEMS[box.value];
    if (box.checked) {
        state.picked.add(item.id);
        (item.requires ?? []).forEach((r) => state.picked.add(r));
    } else {
        state.picked.delete(item.id);
        // Dropping a requirement drops what depends on it.
        Object.values(ITEMS).forEach((i) => i.requires?.includes(item.id) && state.picked.delete(i.id));
    }
    update();
});

document.querySelectorAll('[data-currency]').forEach((b) => b.addEventListener('click', () => ((state.currency = b.dataset.currency), update())));
document.querySelectorAll('[data-billing]').forEach((b) => b.addEventListener('click', () => ((state.billing = b.dataset.billing), update())));
document.querySelectorAll('[data-step]').forEach((b) =>
    b.addEventListener('click', () => {
        const key = b.dataset.step;
        state[key] = clamp(state[key] + Number(b.dataset.dir), 1, key === 'branches' ? 50 : 10);
        update();
    }),
);

// ---- Pricing ----
function quote() {
    const c = state.currency;
    const paid = [...state.picked].filter((id) => !ITEMS[id].soon);
    const soon = [...state.picked].filter((id) => ITEMS[id].soon);
    const extraRegisters = state.registers - 1;
    const lines = [
        { label: BASE.name, amount: BASE[c] },
        ...paid.map((id) => ({ label: ITEMS[id].name, amount: ITEMS[id][c] })),
        ...(extraRegisters > 0 ? [{ label: `${extraRegisters} extra register${extraRegisters > 1 ? 's' : ''}`, amount: extraRegisters * REGISTER[c] }] : []),
    ];
    const perBranch = lines.reduce((n, l) => n + l.amount, 0);

    // Cheapest bundle that covers everything picked (extra registers on top).
    const bundle = PLANS.filter((p) => paid.every((id) => p.includes.includes(id)))
        .map((p) => ({ ...p, cost: p[c] + Math.max(0, state.registers - p.registers) * REGISTER[c] }))
        .sort((a, b) => a.cost - b.cost)[0];
    const useBundle = bundle && bundle.cost < perBranch ? bundle : null;
    const monthlyPerBranch = useBundle ? useBundle.cost : perBranch;

    const months = state.billing === 'yearly' ? 10 : 1;
    return { c, lines, soon, perBranch, bundle: useBundle, monthlyPerBranch, total: monthlyPerBranch * state.branches * months };
}

function update() {
    const q = quote();

    document.querySelectorAll('[data-currency]').forEach((b) => b.setAttribute('aria-checked', String(b.dataset.currency === q.c)));
    document.querySelectorAll('[data-billing]').forEach((b) => b.setAttribute('aria-checked', String(b.dataset.billing === state.billing)));
    document.querySelectorAll('#features input[type=checkbox]').forEach((b) => (b.checked = state.picked.has(b.value)));
    document.querySelectorAll('[data-price]').forEach((el) => {
        const id = el.dataset.price;
        const item = id === 'base' ? BASE : ITEMS[id];
        el.textContent = item.soon ? 'Soon' : `${money(item[q.c])}/mo`;
    });
    document.getElementById('branches').textContent = state.branches;
    document.getElementById('registers').textContent = state.registers;

    const lines = document.getElementById('summary-lines');
    lines.innerHTML =
        q.lines.map((l) => `<li><span>${l.label}</span><span>${money(l.amount)}</span></li>`).join('') +
        (q.soon.length ? `<li class="soon-line"><span>Interested in: ${q.soon.map((id) => ITEMS[id].name).join(', ')}</span><span>Soon</span></li>` : '');

    const breakdown = document.getElementById('breakdown');
    breakdown.innerHTML =
        `<div><span>Features${state.branches > 1 ? ', per branch' : ''}</span><span>${money(q.perBranch)}/mo</span></div>` +
        (q.bundle ? `<div class="bundle-line"><span>${q.bundle.name} bundle saving</span><span>−${money(q.perBranch - q.bundle.cost)}/mo</span></div>` : '') +
        (state.branches > 1 ? `<div><span>× ${state.branches} branches</span><span>${money(q.monthlyPerBranch * state.branches)}/mo</span></div>` : '') +
        (state.billing === 'yearly' ? `<div><span>× 10 months (2 free)</span><span></span></div>` : '');

    const period = state.billing === 'yearly' ? '/year' : '/month';
    document.getElementById('total').innerHTML = `${money(q.total)}<small>${period}</small>`;
    document.getElementById('bar-total').textContent = `${money(q.total)}${period}`;
    document.getElementById('total-sub').textContent =
        state.billing === 'yearly' ? `${money(q.monthlyPerBranch * state.branches * 12)} if paid monthly` : 'Billed monthly. Cancel any time.';

    const tip = document.getElementById('tip');
    if (q.bundle) {
        tip.hidden = false;
        tip.innerHTML = `<b>${q.bundle.name}</b> covers everything you picked for ${money(q.bundle.cost)}/month, so you save ${money(q.perBranch - q.bundle.cost)} a month per branch. ${q.bundle.name} also includes ${bundleExtras(q.bundle)}.`;
    } else if (state.branches >= 3) {
        tip.hidden = false;
        tip.innerHTML = '<b>3 or more branches?</b> Ask us about chain pricing with central menus and combined reports.';
    } else {
        tip.hidden = true;
    }

    document.getElementById('setup-note').textContent =
        q.c === 'BDT'
            ? `On-site setup and staff training: ${money(SETUP.BDT, 'BDT')} once, free on yearly plans. We enter your menu for you. 14 days free to try.`
            : `Online setup and staff training: ${money(SETUP.USD, 'USD')} once, free on yearly plans. Your currency, tax and payment methods are set up for your country. 14 days free to try.`;

    document.getElementById('cta-plan').href = whatsapp(`Hi ClochePOS, I'd like this plan for my restaurant:\n\n${planText(q)}`);

    const url = new URL(location.href);
    url.search = new URLSearchParams({ c: q.c, b: state.billing, br: state.branches, r: state.registers, f: [...state.picked].join(',') }).toString();
    history.replaceState(null, '', url);
}

function bundleExtras(bundle) {
    const extra = bundle.includes.filter((id) => !state.picked.has(id)).map((id) => ITEMS[id].name);
    const regs = `${bundle.registers} register${bundle.registers > 1 ? 's' : ''}`;
    return extra.length ? `${extra.slice(0, 3).join(', ')}${extra.length > 3 ? ` and ${extra.length - 3} more` : ''}, and ${regs}` : regs;
}

function planText(q) {
    const period = state.billing === 'yearly' ? 'year' : 'month';
    const picked = [BASE.name, ...[...state.picked].filter((id) => !ITEMS[id].soon).map((id) => ITEMS[id].name)];
    return [
        `• Features: ${picked.join(', ')}`,
        q.soon.length ? `• Interested in (coming soon): ${q.soon.map((id) => ITEMS[id].name).join(', ')}` : null,
        `• ${state.branches} branch${state.branches > 1 ? 'es' : ''}, ${state.registers} register${state.registers > 1 ? 's' : ''} each`,
        q.bundle ? `• Matches the ${q.bundle.name} plan` : null,
        `• Price shown: ${money(q.total)} per ${period} (${q.c})`,
        `• Link: ${location.href}`,
    ]
        .filter(Boolean)
        .join('\n');
}

function whatsapp(text) {
    return CONTACT.whatsapp ? `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}` : '#talk';
}

// ---- "Not quite right?" form ----
const form = document.getElementById('talk-form');
const errorEl = document.getElementById('form-error');
try {
    const region = new Intl.DisplayNames(['en'], { type: 'region' });
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz === 'Asia/Dhaka') document.getElementById('location').placeholder = 'Bangladesh, Dhaka';
    else if (navigator.language?.includes('-')) document.getElementById('location').placeholder = region.of(navigator.language.split('-').pop().toUpperCase()) ?? '';
} catch {
    /* older browsers: leave the placeholder empty */
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const via = e.submitter?.dataset.via ?? 'whatsapp';
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const reasons = data.getAll('reason');
    const message = String(data.get('message') ?? '').trim();

    const problem = !name ? 'Please add your name.' : !reasons.length && !message ? 'Tick what doesn’t fit, or tell us a little more.' : null;
    errorEl.hidden = !problem;
    errorEl.textContent = problem ?? '';
    if (problem) return;

    const body = [
        `Hi ClochePOS, I'm ${name}${data.get('business') ? ` from ${data.get('business')}` : ''}${data.get('location') ? ` (${data.get('location')})` : ''}.`,
        reasons.length ? `\n${reasons.map((r) => `• ${r}`).join('\n')}` : null,
        message ? `\n${message}` : null,
        data.get('attach') ? `\nThe plan I built:\n${planText(quote())}` : null,
        `\nReach me on: ${[data.get('phone'), data.get('email')].filter(Boolean).join(' · ') || 'this chat'}`,
    ]
        .filter(Boolean)
        .join('\n');

    if (via === 'email' && CONTACT.email) {
        location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`ClochePOS plan: ${name}`)}&body=${encodeURIComponent(body)}`;
    } else {
        window.open(whatsapp(body), '_blank', 'noopener');
    }
});

document.getElementById('year').textContent = new Date().getFullYear();
update();
