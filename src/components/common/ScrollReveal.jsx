import React, { useRef, useState, useEffect } from 'react';
import { View } from 'react-native';

/**
 * ScrollReveal component that smoothly animates elements into view
 * as the user scrolls down the page.
 * Uses both IntersectionObserver and captured scroll events for 100% reliable
 * triggering inside React Native Web scroll containers and native browsers.
 */
export default function ScrollReveal({
  children,
  animation = 'fade-up', // 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'fade'
  delay = 0,
  duration = 650,
  distance = 28,
  style,
  once = true,
  threshold = 0.05,
  ...rest
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window === 'undefined') {
      setIsVisible(true);
      return;
    }

    // Honor reduced-motion accessibility preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      visibleRef.current = true;
      return;
    }

    const checkVisibility = () => {
      if (visibleRef.current && once) return true;
      if (!node) return false;

      try {
        const rect = node.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        
        // Element is visible if its top edge is within viewport (with 40px buffer)
        // and its bottom edge is below the top of viewport
        const inView = rect.top <= vh - 40 && rect.bottom >= 20;

        if (inView) {
          visibleRef.current = true;
          setIsVisible(true);
          return true;
        } else if (!once) {
          visibleRef.current = false;
          setIsVisible(false);
        }
      } catch {
        // Fallback
      }
      return false;
    };

    // Check immediately on mount (for elements already in initial viewport like Hero)
    if (checkVisibility() && once) {
      return;
    }

    // Set up IntersectionObserver
    let observer;
    if (typeof IntersectionObserver !== 'undefined') {
      try {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting || entry.intersectionRatio > 0) {
                visibleRef.current = true;
                setIsVisible(true);
                if (once && observer && node) {
                  observer.unobserve(node);
                }
              } else if (!once) {
                visibleRef.current = false;
                setIsVisible(false);
              }
            });
          },
          {
            threshold: [0, 0.05, 0.1],
            rootMargin: '0px 0px -30px 0px',
          }
        );
        observer.observe(node);
      } catch {
        // Fall back to scroll listener
      }
    }

    // Capture scroll events from ANY scrollable container (window, ScrollView, document)
    let rafId = null;
    const handleScrollOrResize = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const reached = checkVisibility();
        if (reached && once) {
          cleanupScrollListeners();
          if (observer && node) {
            try { observer.unobserve(node); } catch {}
          }
        }
      });
    };

    const cleanupScrollListeners = () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
      document.removeEventListener('scroll', handleScrollOrResize, true);
    };

    window.addEventListener('scroll', handleScrollOrResize, { capture: true, passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });
    document.addEventListener('scroll', handleScrollOrResize, { capture: true, passive: true });

    return () => {
      if (observer) observer.disconnect();
      cleanupScrollListeners();
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [once, threshold]);

  const getTransform = () => {
    if (isVisible) {
      return animation === 'zoom-in' ? 'scale(1)' : 'translate3d(0, 0, 0)';
    }
    switch (animation) {
      case 'fade-up':
        return `translate3d(0, ${distance}px, 0)`;
      case 'fade-down':
        return `translate3d(0, -${distance}px, 0)`;
      case 'fade-left':
        return `translate3d(-${distance}px, 0, 0)`;
      case 'fade-right':
        return `translate3d(${distance}px, 0, 0)`;
      case 'zoom-in':
        return 'scale(0.93)';
      case 'fade':
      default:
        return 'none';
    }
  };

  const animStyle = {
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: 'opacity, transform',
  };

  return (
    <View ref={ref} style={[animStyle, style]} {...rest}>
      {children}
    </View>
  );
}
