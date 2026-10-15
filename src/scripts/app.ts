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
// Opportunities are re-checked in the browser, so a call that closes after the build
// is never shown as open. Each item carries its closing time (end of day, Addis Ababa).
type Listing = { id: string; text: string; closesAt: string };
const stillOpen = (l: Listing) => new Date(l.closesAt).getTime() >= Date.now();

// Opportunity cards (4.13): open count and next deadline, recomputed in the browser.
Alpine.data('openListings', () => ({
  count: 0,
  status: '',
  next: '',
  init() {
    const el = this.$el as HTMLElement;
    const labels = JSON.parse(el.dataset.labels ?? '{}');
    const open = (JSON.parse(el.dataset.listings ?? '[]') as (Listing & { date: string })[])
      .filter(stillOpen)
      .sort((a, b) => a.closesAt.localeCompare(b.closesAt));
    this.count = open.length;
    this.status = open.length === 0 ? labels.none : open.length === 1 ? labels.one : labels.many.replace('{n}', String(open.length));
    this.next = open[0] ? labels.next.replace('{date}', open[0].date) : '';
  },
}));


// Manual slider (CLAUDE.md 4.6 and 4.11). Nothing moves on its own.
// mode "single": one slide shows at a time. mode "scroll": cards scroll and peek.
const sliderFactory = (mode: 'single' | 'scroll' = 'single') => ({
  index: 0,
  count: 0,
  atStart: true,
  atEnd: false,
  initSlider() {
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
    const before = this.index;
    this.index = Math.max(0, Math.min(this.count - 1, i));
    this.sync();
    // If focus was inside the slide that just hid, keep it in the slider region.
    if (before !== this.index) {
      const root = this.$el as HTMLElement;
      const outgoing = root.querySelectorAll<HTMLElement>('[data-slide]')[before];
      if (outgoing?.contains(document.activeElement)) {
        this.$nextTick(() => root.querySelector<HTMLElement>('[data-slides]')?.focus());
      }
    }
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
});
Alpine.data('slider', (mode: 'single' | 'scroll' = 'single') => ({ ...sliderFactory(mode), init() { this.initSlider(); } }));
// Latest (4.11): News | LinkedIn | X tabs, with a scrolling card slider in the News tab.
Alpine.data('latest', () => ({
  ...sliderFactory('scroll'),
  ...tabsFactory(),
  init() {
    this.initSlider();
    this.initTabs();
  },
}));

// Accessible tabs: arrow keys, Home and End move between tabs (WAI-ARIA pattern).
// A glow indicator follows the active tab through the --tab CSS variable.
const tabsFactory = () => ({
  active: 0,
  count: 0,
  initTabs() {
    this.count = (this.$el as HTMLElement).querySelectorAll('[role="tab"]').length;
  },
  select(i: number, focus = false) {
    this.active = (i + this.count) % this.count;
    if (focus) {
      this.$nextTick(() => (this.$el as HTMLElement).querySelectorAll<HTMLElement>('[role="tab"]')[this.active]?.focus());
    }
  },
  onTabKey(e: KeyboardEvent) {
    const moves: Record<string, number> = { ArrowRight: this.active + 1, ArrowLeft: this.active - 1, Home: 0, End: this.count - 1 };
    if (e.key in moves) {
      e.preventDefault();
      e.stopPropagation();
      this.select(moves[e.key], true);
    }
  },
});
Alpine.data('tabs', () => ({ ...tabsFactory(), init() { this.initTabs(); }, onKey(e: KeyboardEvent) { this.onTabKey(e); } }));

// Hero tabs (CLAUDE.md 3.5 and 4.2): the one element that moves on its own. The tabs
// advance every 7 seconds, with a visible pause/play button (WCAG 2.2.2). Rotation
// pauses while the pointer is over the hero's content or tabs, while the hero is
// scrolled away or the page is hidden, and stops for good once keyboard focus enters
// the hero or the visitor picks a tab; only the button starts it again. It never
// starts on its own under reduced motion. Panels are announced (aria-live) only
// while rotation is off, so screen readers are not interrupted every 7 seconds.
const HERO_INTERVAL = 7000;
Alpine.data('heroTabs', () => ({
  ...tabsFactory(),
  playing: false,
  hovering: false,
  offscreen: false,
  pageHidden: false,
  labels: { play: '', pause: '' },
  timer: 0,
  startedAt: 0,
  remaining: HERO_INTERVAL,
  warmed: false,
  init() {
    this.initTabs();
    const el = this.$el as HTMLElement;
    this.labels = { play: el.dataset.labelPlay ?? '', pause: el.dataset.labelPause ?? '' };
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.playing = !motion.matches;
    motion.addEventListener('change', () => motion.matches && this.stop());
    new IntersectionObserver(([entry]) => (this.offscreen = entry.intersectionRatio < 0.25), { threshold: [0, 0.25] }).observe(el);
    document.addEventListener('visibilitychange', () => (this.pageHidden = document.hidden));
    for (const key of ['playing', 'hovering', 'offscreen', 'pageHidden']) this.$watch(key, () => this.run());
    this.run();
  },
  get paused() {
    return this.hovering || this.offscreen || this.pageHidden;
  },
  // Start, pause or resume the countdown to match the current state. A pause keeps
  // the time left, so the progress line and the timer stay in step.
  run() {
    const shouldRun = this.playing && !this.paused;
    if (shouldRun && !this.timer) {
      this.startedAt = performance.now();
      this.timer = window.setTimeout(() => this.advance(), this.remaining);
      if (!this.warmed) window.setTimeout(() => this.warmImages(), 1500);
      this.warmed = true;
    } else if (!shouldRun && this.timer) {
      window.clearTimeout(this.timer);
      this.timer = 0;
      this.remaining = Math.max(0, this.remaining - (performance.now() - this.startedAt));
    }
  },
  advance() {
    this.timer = 0;
    this.remaining = HERO_INTERVAL;
    this.select(this.active + 1);
    this.run();
  },
  // Load the other tabs' photos before they are shown, once the first one is in.
  warmImages() {
    (this.$el as HTMLElement).querySelectorAll<HTMLImageElement>('[data-tabpanel] img[loading="lazy"]').forEach((img) => (img.loading = 'eager'));
  },
  toggle() {
    this.playing ? this.stop() : (this.playing = true);
  },
  // Clear the countdown here rather than in run(), so a stopped rotation always
  // restarts with a full interval, in step with the progress line.
  stop() {
    window.clearTimeout(this.timer);
    this.timer = 0;
    this.remaining = HERO_INTERVAL;
    this.playing = false;
  },
  pick(i: number) {
    this.stop();
    this.select(i);
  },
  onKey(e: KeyboardEvent) {
    this.stop();
    this.onTabKey(e);
  },
  onFocusIn(e: FocusEvent) {
    if (!(e.target as HTMLElement).closest('[data-rotation]')) this.stop();
  },
}));

// Site search with Fuse.js, loaded only when the search dialog opens.
Alpine.data('siteSearch', () => ({
  labels: { loading: '', empty: '', noResults: '', count: '', types: {} as Record<string, string> },
  init() {
    this.labels = JSON.parse((this.$el as HTMLElement).dataset.labels ?? '{}');
  },
  status() {
    const q = this.query.trim();
    if (!this.ready) return this.labels.loading;
    if (q.length < 2) return this.labels.empty;
    if (!this.results.length) return this.labels.noResults.replace('{q}', q);
    return this.labels.count.replace('{n}', String(this.results.length));
  },
  query: '',
  results: [] as { title: string; url: string; type: string; summary: string }[],
  ready: false,
  fuse: null as null | { search: (q: string, o?: object) => { item: { title: string; url: string; type: string; summary: string } }[] },
  async load() {
    if (this.fuse) return;
    const [{ default: Fuse }, index] = await Promise.all([
      import('fuse.js'),
      fetch((this.$el as HTMLElement).dataset.index ?? '/search-index.json').then((r) => r.json()),
    ]);
    this.fuse = new Fuse(index, { keys: ['title', 'summary', 'type'], threshold: 0.35, ignoreLocation: true });
    this.ready = true;
    this.search();
  },
  search() {
    const q = this.query.trim();
    this.results = q.length >= 2 && this.fuse ? this.fuse.search(q, { limit: 8 }).map((r) => r.item) : [];
  },
}));

Alpine.start();
