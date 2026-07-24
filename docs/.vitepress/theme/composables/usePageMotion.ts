import { nextTick } from 'vue';

const HOME_INTRO_KEY = 'bili-knowledge-home-intro-played';
const ENTER_MS = 320;

type MotionRouter = {
  go: (href: string) => void;
  onBeforeRouteChange?: (to: string) => unknown;
  onAfterRouteChange?: () => unknown;
};

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isMobileViewport() {
  return window.matchMedia('(max-width: 899px)').matches;
}

export function shouldPlayHomeIntro() {
  try {
    if (sessionStorage.getItem(HOME_INTRO_KEY)) return false;
    sessionStorage.setItem(HOME_INTRO_KEY, '1');
    return true;
  } catch {
    return true;
  }
}

function triggerRouteEnter(direction: 'forward' | 'back' = 'forward') {
  const root = document.documentElement;
  root.classList.remove('route-leave', 'route-enter', 'route-enter-back');
  if (prefersReducedMotion()) return;

  void root.offsetWidth;
  root.classList.add(direction === 'back' ? 'route-enter-back' : 'route-enter');
  window.setTimeout(() => {
    root.classList.remove('route-enter', 'route-enter-back');
  }, ENTER_MS);
}

function decorateArticleReveal() {
  const doc = document.querySelector('.vp-doc');
  if (!doc || doc.querySelector('.home-page, .catalog-page, .reading-hub')) return;

  doc.querySelectorAll('.kb-reveal').forEach((node) => {
    node.classList.remove('kb-reveal', 'kb-reveal-delay-0', 'kb-reveal-delay-1', 'kb-reveal-delay-2', 'kb-reveal-delay-3', 'is-visible');
  });

  if (prefersReducedMotion() || isMobileViewport()) return;

  const targets = [
    doc.querySelector('.vp-doc > div > h1:first-of-type'),
    doc.querySelector('.bili-player'),
    doc.querySelector('.vp-doc > div > blockquote:first-of-type'),
    doc.querySelector('.vp-doc > div > p:first-of-type'),
  ].filter(Boolean) as Element[];

  targets.forEach((target, index) => {
    target.classList.add('kb-reveal', `kb-reveal-delay-${Math.min(index, 3)}`);
    window.requestAnimationFrame(() => target.classList.add('is-visible'));
  });
}

export function setupPageMotion(router: MotionRouter) {
  if (typeof window === 'undefined') return;

  let navigatingBack = false;

  const originalBefore = router.onBeforeRouteChange;
  router.onBeforeRouteChange = (to: string) => {
    if (!prefersReducedMotion()) {
      document.documentElement.classList.add('route-leave');
    }
    return originalBefore?.(to);
  };

  const originalAfter = router.onAfterRouteChange;
  router.onAfterRouteChange = () => {
    document.documentElement.classList.remove('route-leave');
    triggerRouteEnter(navigatingBack ? 'back' : 'forward');
    navigatingBack = false;
    nextTick(() => decorateArticleReveal());
    return originalAfter?.();
  };

  window.addEventListener('kb-nav-back', () => {
    navigatingBack = true;
  });

  nextTick(() => {
    triggerRouteEnter('forward');
    decorateArticleReveal();
  });
}

export async function navigateWithMotion(router: MotionRouter, href: string) {
  const go = () => router.go(href);

  if (prefersReducedMotion() || isMobileViewport() || typeof document.startViewTransition !== 'function') {
    go();
    return;
  }

  try {
    await document.startViewTransition(go).finished;
  } catch {
    go();
  }
}
