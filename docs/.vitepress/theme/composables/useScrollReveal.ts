const DEFAULT_OPTIONS: IntersectionObserverInit = {
  threshold: 0.12,
  rootMargin: '0px 0px -8% 0px',
};

export function useScrollReveal(options: IntersectionObserverInit = {}) {
  let observer: IntersectionObserver | null = null;

  function revealIfVisible(node: Element) {
    const rect = node.getBoundingClientRect();
    const viewport = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < viewport * 0.92 && rect.bottom > viewport * 0.08) {
      node.classList.add('is-visible');
      observer?.unobserve(node);
      return true;
    }
    return false;
  }

  function observe(root: ParentNode = document, selector = '[data-reveal]') {
    if (typeof window === 'undefined') return;

    const nodes = root.querySelectorAll<HTMLElement>(selector);
    if (nodes.length === 0) return;

    observer?.disconnect();
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer?.unobserve(entry.target);
      }
    }, { ...DEFAULT_OPTIONS, ...options });

    nodes.forEach((node) => {
      if (revealIfVisible(node)) return;
      observer?.observe(node);
    });
  }

  function disconnect() {
    observer?.disconnect();
    observer = null;
  }

  return { observe, disconnect };
}
