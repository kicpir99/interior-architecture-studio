export function scrollToSection(sectionId: string, headerOffset = 84): void {
  if (typeof window === 'undefined') return;
  const target = document.getElementById(sectionId);
  if (!target) return;

  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const targetTop = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset);

  window.scrollTo({
    top: targetTop,
    behavior: prefersReduced ? 'auto' : 'smooth',
  });

  if (window.location.hash !== `#${sectionId}`) {
    window.history.replaceState(null, '', `#${sectionId}`);
  }
}
