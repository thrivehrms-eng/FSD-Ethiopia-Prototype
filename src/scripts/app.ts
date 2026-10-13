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


// Reveal on scroll (CLAUDE.md 3.5): once per element; skipped under reduced motion.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  revealTargets.forEach((el) => io.observe(el));
}

// Header: transparent over the hero, teal with a shadow after 80px of scrolling.
Alpine.data('siteHeader', () => ({
  scrolled: false,
  init() {
    const update = () => (this.scrolled = window.scrollY > 80);
    update();
    window.addEventListener('scroll', update, { passive: true });
  },
}));

// Native <dialog> modals: focus is trapped and Escape closes them. Focus returns to the opener.
Alpine.data('modal', () => ({
  opener: null as HTMLElement | null,
  open(opener?: EventTarget | null) {
    this.opener = (opener as HTMLElement) ?? (document.activeElement as HTMLElement);
    (this.$refs.dialog as HTMLDialogElement).showModal();
  },
  close() {
    (this.$refs.dialog as HTMLDialogElement).close();
  },
  restoreFocus() {
    this.opener?.focus();
  },
}));

document.addEventListener('click', (event) => {
  const trigger = (event.target as HTMLElement).closest<HTMLElement>('[data-open-dialog]');
  if (!trigger) return;
  const dialog = document.getElementById(trigger.dataset.openDialog!) as HTMLDialogElement | null;
  if (!dialog) return;
  event.preventDefault();
  dialog.dispatchEvent(new CustomEvent('open-request', { detail: trigger }));
});

// Announcement bar: dismissal is remembered per opportunity.
Alpine.data('announcement', (id: string) => ({
  visible: true,
  init() {
    try {
      this.visible = localStorage.getItem(`fsd-announce:${id}`) !== 'dismissed';
    } catch {
      /* show it */
    }
  },
  dismiss() {
    this.visible = false;
    try {
      localStorage.setItem(`fsd-announce:${id}`, 'dismissed');
    } catch {
      /* ignore */
    }
    document.getElementById('main')?.focus();
  },
}));

// Manual slider (CLAUDE.md 4.6 and 4.11). Nothing moves on its own.
// mode "single": one slide shows at a time. mode "scroll": cards scroll and peek.
Alpine.data('slider', (mode: 'single' | 'scroll' = 'single') => ({
  index: 0,
  count: 0,
  atStart: true,
  atEnd: false,
  init() {
    const root = this.$el as HTMLElement;
    this.count = root.querySelectorAll('[data-slide]').length;
    if (mode === 'scroll') {
      const track = this.$refs.track as HTMLElement;
      const update = () => {
        this.atStart = track.scrollLeft <= 4;
        this.atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      };
      update();
      track.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update, { passive: true });
    } else {
      this.sync();
    }
  },
  sync() {
    this.atStart = this.index === 0;
    this.atEnd = this.index === this.count - 1;
  },
  step() {
    const track = this.$refs.track as HTMLElement;
    const first = track.querySelector<HTMLElement>('[data-slide]');
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return (first?.offsetWidth ?? track.clientWidth) + gap;
  },
  go(i: number) {
    if (mode === 'scroll') {
      const track = this.$refs.track as HTMLElement;
      track.scrollBy({ left: i * this.step(), behavior: reduceMotion ? 'auto' : 'smooth' });
      return;
    }
    this.index = Math.max(0, Math.min(this.count - 1, i));
    this.sync();
  },
  prev() {
    mode === 'scroll' ? this.go(-1) : this.go(this.index - 1);
  },
  next() {
    mode === 'scroll' ? this.go(1) : this.go(this.index + 1);
  },
  onKey(e: KeyboardEvent) {
    if ((e.target as HTMLElement).closest('input, textarea, select, [role="tablist"]')) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.prev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.next();
    }
  },
}));

// Site search with Fuse.js, loaded only when the search dialog opens.
Alpine.data('siteSearch', () => ({
  query: '',
  results: [] as { title: string; url: string; type: string; summary: string }[],
  ready: false,
  fuse: null as null | { search: (q: string, o?: object) => { item: { title: string; url: string; type: string; summary: string } }[] },
  async load() {
    if (this.fuse) return;
    const [{ default: Fuse }, index] = await Promise.all([
      import('fuse.js'),
      fetch(document.documentElement.dataset.searchIndex ?? '/search-index.json').then((r) => r.json()),
    ]);
    this.fuse = new Fuse(index, { keys: ['title', 'summary', 'type'], threshold: 0.35, ignoreLocation: true });
    this.ready = true;
    this.search();
  },
  search() {
    const q = this.query.trim();
    this.results = q && this.fuse ? this.fuse.search(q, { limit: 8 }).map((r) => r.item) : [];
  },
}));

Alpine.start();
