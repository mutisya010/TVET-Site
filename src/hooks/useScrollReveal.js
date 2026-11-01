import { useRef, useState, useEffect } from 'react';

/**
 * Custom hook to detect when an element scrolls into the viewport
 */
export function useScrollReveal({
  once = true,
  threshold = 0.08,
  rootMargin = '0px 0px -40px 0px',
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    try {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setIsVisible(true);
        if (once) return;
      }
    } catch {
      // ignore
    }

    let observer;
    try {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once && observer) {
              observer.unobserve(node);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        },
        { threshold, rootMargin }
      );
      observer.observe(node);
    } catch {
      setIsVisible(true);
    }

    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => {
      if (observer) observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [once, threshold, rootMargin]);

  return [ref, isVisible];
}

