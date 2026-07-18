import { nextTick } from 'vue';

const HOME_INTRO_KEY = 'bili-knowledge-home-intro-v3';
const ENTER_MS = 420;
const ENTER_MS_REDUCED = 160;

type MotionRouter = {
  go: (href: string) => void | Promise<void>;
  onBeforeRouteChange?: (to: string) => unknown;
  onAfterRouteChange?: (to: string) => unknown;
};

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isMobileViewport() {
  return window.matchMedia('(max-width: 899px)').matches;
}

function syncMotionReducedClass() {
  document.documentElement.classList.toggle('motion-reduced', prefersReducedMotion());
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
  const duration = prefersReducedMotion() ? ENTER_MS_REDUCED : ENTER_MS;

  root.classList.remove('route-leave', 'route-enter', 'route-enter-back');
  void root.offsetWidth;
  root.classList.add(direction === 'back' ? 'route-enter-back' : 'route-enter');
  window.setTimeout(() => {
    root.classList.remove('route-enter', 'route-enter-back');
  }, duration);
}

function decorateArticleReveal() {
  const doc = document.querySelector('.vp-doc');
  if (!doc || doc.querySelector('.home-page, .catalog-page, .reading-hub')) return;

  doc.querySelectorAll('.kb-reveal').forEach((node) => {
    node.classList.remove('kb-reveal', 'kb-reveal-delay-0', 'kb-reveal-delay-1', 'kb-reveal-delay-2', 'kb-reveal-delay-3', 'is-visible');
  });

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

  syncMotionReducedClass();
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', syncMotionReducedClass);

  const originalBefore = router.onBeforeRouteChange;
  router.onBeforeRouteChange = (to: string) => {
    document.documentElement.classList.add('route-leave');
    return originalBefore?.(to);
  };

  const originalAfter = router.onAfterRouteChange;
  router.onAfterRouteChange = (to: string) => {
    document.documentElement.classList.remove('route-leave');
    triggerRouteEnter(navigatingBack ? 'back' : 'forward');
    navigatingBack = false;
    nextTick(() => decorateArticleReveal());
    return originalAfter?.(to);
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
  const go = () => Promise.resolve(router.go(href));

  // 增强动效：View Transition 在 reduced-motion / 移动端跳过
  if (prefersReducedMotion() || isMobileViewport() || typeof document.startViewTransition !== 'function') {
    await go();
    return;
  }

  try {
    await document.startViewTransition(async () => {
      await go();
    }).finished;
  } catch {
    await go();
  }
}
