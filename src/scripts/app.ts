import Alpine from 'alpinejs';

const CONSENT_KEY = 'fsd-consent';
const CONSENT_VERSION = 1;
const LANG_KEY = 'fsd-lang';

type Consent = { version: number; analytics: boolean; decidedAt: string };

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    const parsed = raw ? (JSON.parse(raw) as Consent) : null;
    return parsed && parsed.version === CONSENT_VERSION ? parsed : null;
  } catch {
    return null;
  }
}

function writeConsent(analytics: boolean) {
  const value: Consent = { version: CONSENT_VERSION, analytics, decidedAt: new Date().toISOString() };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
  } catch {
    /* Storage blocked: the choice applies to this page view only. */
  }
}

// Analytics is injected only after explicit consent; nothing loads by default.
let analyticsInjected = false;
function loadAnalytics() {
  if (analyticsInjected) return;
  analyticsInjected = true;
  const s = document.createElement('script');
  s.src = '/js/analytics-demo.js';
  s.defer = true;
  document.head.appendChild(s);
}

function readJson<T>(selector: string, fallback: T): T {
  const el = document.querySelector(selector);
  try {
    return el?.textContent ? (JSON.parse(el.textContent) as T) : fallback;
  } catch {
    return fallback;
  }
}

// Remember the language the visitor picks in the header toggle.
document.addEventListener('click', (event) => {
  const target = (event.target as HTMLElement).closest<HTMLElement>('[data-set-lang]');
  if (target) {
    try {
      localStorage.setItem(LANG_KEY, target.dataset.setLang!);
    } catch {
      /* ignore */
    }
  }
  if ((event.target as HTMLElement).closest('[data-open-cookie-prefs]')) {
    window.dispatchEvent(new CustomEvent('open-cookie-prefs', { detail: event.target }));
  }
});

Alpine.data('siteNav', () => ({
  open: false,
  labels: { menu: 'Menu', close: 'Close menu' },
  init() {
    const el = document.getElementById('mobile-menu');
    if (el?.dataset.labels) this.labels = JSON.parse(el.dataset.labels);
  },
  toggle() {
    this.open = !this.open;
    if (this.open) {
      this.$nextTick(() => document.querySelector<HTMLElement>('#mobile-menu a')?.focus());
    }
  },
  close(returnFocus = false) {
    if (!this.open) return;
    this.open = false;
    if (returnFocus) (this.$refs.toggle as HTMLElement).focus();
  },
}));

Alpine.data('cookieConsent', () => ({
  showBanner: false,
  analyticsLoaded: false,
  draftAnalytics: false,
  opener: null as HTMLElement | null,
  labels: { on: '', off: '' },
  init() {
    this.labels = readJson('[data-cookie-labels]', this.labels);
    const saved = readConsent();
    if (saved) {
      this.apply(saved.analytics);
    } else {
      this.showBanner = true;
    }
    window.addEventListener('open-cookie-prefs', (e) => this.openPrefs((e as CustomEvent).detail as HTMLElement));
  },
  apply(analytics: boolean) {
    this.draftAnalytics = analytics;
    if (analytics) {
      loadAnalytics();
      this.analyticsLoaded = true;
    }
  },
  decide(analytics: boolean) {
    writeConsent(analytics);
    this.showBanner = false;
    this.apply(analytics);
    // Withdrawing consent cannot unload a running script; reload to stop it.
    if (!analytics && this.analyticsLoaded) location.reload();
  },
  acceptAll() {
    this.decide(true);
  },
  rejectAll() {
    this.decide(false);
  },
  openPrefs(opener?: HTMLElement) {
    this.opener = opener ?? null;
    this.draftAnalytics = readConsent()?.analytics ?? false;
    (this.$refs.dialog as HTMLDialogElement).showModal();
  },
  savePrefs() {
    this.decide(this.draftAnalytics);
    this.closePrefs();
  },
  closePrefs() {
    (this.$refs.dialog as HTMLDialogElement).close();
  },
  onDialogClose() {
    this.opener?.focus();
  },
}));

Alpine.data('newsletterForm', () => ({
  email: '',
  consent: false,
  done: false,
  errors: { email: '', consent: '' },
  messages: { email: '', consent: '' },
  init() {
    this.messages = JSON.parse((this.$el as HTMLElement).dataset.errors ?? '{}');
  },
  submit() {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim());
    this.errors.email = emailOk ? '' : this.messages.email;
    this.errors.consent = this.consent ? '' : this.messages.consent;
    if (!emailOk) return (this.$refs.email as HTMLElement).focus();
    if (!this.consent) return (this.$refs.consent as HTMLElement).focus();
    // Prototype: no data leaves the browser.
    this.done = true;
    this.email = '';
  },
}));

// Accessible tabs: arrow keys, Home and End move between tabs (WAI-ARIA pattern).
Alpine.data('tabs', () => ({
  active: 0,
  count: 0,
  init() {
    this.count = (this.$el as HTMLElement).querySelectorAll('[role="tab"]').length;
  },
  select(i: number, focus = false) {
    this.active = (i + this.count) % this.count;
    if (focus) {
      this.$nextTick(() => (this.$el as HTMLElement).querySelectorAll<HTMLElement>('[role="tab"]')[this.active]?.focus());
    }
  },
  onKey(e: KeyboardEvent) {
    const moves: Record<string, number> = { ArrowRight: this.active + 1, ArrowLeft: this.active - 1, Home: 0, End: this.count - 1 };
    if (e.key in moves) {
      e.preventDefault();
      this.select(moves[e.key], true);
    }
  },
}));

Alpine.start();
