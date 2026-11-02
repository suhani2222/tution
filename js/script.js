// Mobile navigation drawer
function toggleMobileNav() {
    const nav = document.getElementById('mobile-nav');
    if (nav.classList.contains('hidden')) {
        nav.classList.remove('hidden');
        document.getElementById('menu-icon-open').classList.add('hidden');
        document.getElementById('menu-icon-close').classList.remove('hidden');
        document.getElementById('mobile-menu-btn').setAttribute('aria-expanded', 'true');
    } else {
        closeMobileNav();
    }
}

function closeMobileNav() {
    const nav = document.getElementById('mobile-nav');
    if (!nav) return;
    nav.classList.add('hidden');
    document.getElementById('menu-icon-open').classList.remove('hidden');
    document.getElementById('menu-icon-close').classList.add('hidden');
    document.getElementById('mobile-menu-btn').setAttribute('aria-expanded', 'false');
}

// Close the drawer when tapping outside the header
document.addEventListener('click', function (e) {
    const header = document.getElementById('main-header');
    const nav = document.getElementById('mobile-nav');
    if (header && nav && !nav.classList.contains('hidden') && !header.contains(e.target)) {
        closeMobileNav();
    }
});

// Hero sample switcher: level check sheet vs. Saturday report
const TAB_ON = 'px-2.5 py-1.5 rounded font-medium bg-ink text-paper transition-crisp';
const TAB_OFF = 'px-2.5 py-1.5 rounded font-medium text-ink-secondary hover:text-ink transition-crisp';

function switchArtifact(view) {
    const isBaseline = view === 'baseline';
    document.getElementById('artifact-baseline').classList.toggle('hidden', !isBaseline);
    document.getElementById('artifact-saturday').classList.toggle('hidden', isBaseline);
    const btnBaseline = document.getElementById('tab-btn-baseline');
    const btnSaturday = document.getElementById('tab-btn-saturday');
    btnBaseline.className = isBaseline ? TAB_ON : TAB_OFF;
    btnSaturday.className = isBaseline ? TAB_OFF : TAB_ON;
    btnBaseline.setAttribute('aria-selected', isBaseline);
    btnSaturday.setAttribute('aria-selected', !isBaseline);
}

// Curriculum grade filter
function filterGradeTab(group) {
    ['all', 'kg', 'primary', 'middle'].forEach(t => {
        const btn = document.getElementById('grade-tab-' + t);
        btn.className = t === group
            ? 'grade-tab px-3 py-2 rounded bg-ink text-paper transition-crisp'
            : 'grade-tab px-3 py-2 rounded text-ink-secondary hover:text-ink transition-crisp';
        btn.setAttribute('aria-pressed', t === group);
    });

    document.querySelectorAll('.curriculum-card').forEach(card => {
        const match = group === 'all' || card.dataset.gradeGroup === group;
        card.classList.toggle('opacity-40', !match);
        card.classList.toggle('ring-1', match && group !== 'all');
        card.classList.toggle('ring-terracotta/40', match && group !== 'all');
    });
}

// Batch planner
const PICK_ON = 'touch-target p-3.5 rounded-md border-2 border-terracotta bg-terracotta-tint/40 text-left transition-crisp';
const PICK_OFF = 'touch-target p-3.5 rounded-md border border-paper-hairline bg-white hover:border-ink-muted text-left transition-crisp';

const planner = {
    gradeLabel: 'Std. 1 – 5',
    slot: 'Batch B: 4:30–6:00 PM',
    mode: 'Offline at Flat 704'
};

// Marks one button in a group as chosen; `extra` keeps per-group layout classes.
function markPicked(ids, chosenId, extra) {
    ids.forEach(id => {
        const btn = document.getElementById(id);
        const on = id === chosenId;
        btn.className = (on ? PICK_ON : PICK_OFF) + (extra ? ' ' + extra : '');
        btn.setAttribute('aria-pressed', on);
        const tag = btn.querySelector('span:first-child');
        if (tag) {
            tag.classList.toggle('text-terracotta', on);
            tag.classList.toggle('font-semibold', on);
            tag.classList.toggle('text-ink-muted', !on);
        }
    });
}

function selectLedgerGrade(key, label, scopeText) {
    planner.gradeLabel = label;
    markPicked(['ledger-grade-kg', 'ledger-grade-std1_5', 'ledger-grade-std6_8'], 'ledger-grade-' + key);
    document.getElementById('summary-grade-title').textContent = label;
    document.getElementById('summary-scope').textContent = scopeText;
}

function selectLedgerSlot(slotLabel) {
    planner.slot = slotLabel;
    const id = { 'Batch A: 3:00–4:30 PM': 'a', 'Batch B: 4:30–6:00 PM': 'b', 'Batch C: 5:30–7:00 PM': 'c' }[slotLabel];
    markPicked(['ledger-slot-a', 'ledger-slot-b', 'ledger-slot-c'], 'ledger-slot-' + id);
    document.getElementById('summary-slot').textContent = slotLabel;
}

function selectLedgerMode(modeLabel) {
    planner.mode = modeLabel;
    const id = modeLabel.includes('Offline') ? 'ledger-mode-offline' : 'ledger-mode-online';
    markPicked(['ledger-mode-offline', 'ledger-mode-online'], id, 'flex items-center justify-between gap-2');
    document.getElementById('summary-mode').textContent = modeLabel;
}

function openWhatsApp(msg) {
    window.open(`https://wa.me/919157579600?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
}

function sendConfiguredWhatsApp() {
    openWhatsApp(
        `Hello Teacher, I would like to book the level check and 2-day free demo at NurtureNest Home Academy (Flat 704, Shree Hari Darshan Residency).\n\n` +
        `• Grade group: ${planner.gradeLabel}\n` +
        `• Preferred slot: ${planner.slot}\n` +
        `• Mode: ${planner.mode}\n\n` +
        `Please share a convenient time for my child's assessment.`
    );
}

// Booking modal
const modalEl = document.getElementById('trial-modal');
let lastFocus = null;

function openTrialModal(presetNote) {
    lastFocus = document.activeElement;
    modalEl.classList.remove('hidden');
    modalEl.classList.add('flex');
    if (presetNote) document.getElementById('modal-notes').value = `Enquiring for ${presetNote}`;
    document.getElementById('modal-child-name').focus();
}

function closeTrialModal() {
    modalEl.classList.add('hidden');
    modalEl.classList.remove('flex');
    if (lastFocus) lastFocus.focus();
}

modalEl.addEventListener('click', e => { if (e.target === modalEl) closeTrialModal(); });
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modalEl.classList.contains('hidden')) closeTrialModal();
});

function submitModalForm(e) {
    e.preventDefault();
    const val = id => document.getElementById(id).value.trim();
    const notes = val('modal-notes');
    closeTrialModal();
    openWhatsApp(
        `Hello Teacher, I want to book the level check and 2-day free demo.\n\n` +
        `• Child's name: ${val('modal-child-name')}\n` +
        `• Standard: ${val('modal-grade')}\n` +
        `• Preferred batch: ${val('modal-batch')}\n` +
        `• Mode: ${val('modal-mode')}` +
        (notes ? `\n• Note: ${notes}` : '')
    );
}

function submitInlineForm(e) {
    e.preventDefault();
    const val = id => document.getElementById(id).value.trim();
    const focus = val('inline-focus');
    openWhatsApp(
        `Hello Teacher, I want to schedule a level check for my child.\n\n` +
        `• Child's name: ${val('inline-name')}\n` +
        `• Standard: ${val('inline-grade')}\n` +
        `• Preferred slot: ${val('inline-slot')}` +
        (focus ? `\n• Help needed with: ${focus}` : '')
    );
}
