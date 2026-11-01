import React, { useRef, useState, useEffect } from 'react';
import { View } from 'react-native';

/**
 * ScrollReveal component that animates elements smoothly into view
 * as the user scrolls down the page.
 */
export default function ScrollReveal({
  children,
  animation = 'fade-up', // 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'fade'
  delay = 0,
  duration = 650,
  distance = 32,
  style,
  once = true,
  threshold = 0.08,
  rootMargin = '0px 0px -40px 0px',
  ...rest
}) {
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

    // If already in initial viewport, reveal promptly
    try {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setIsVisible(true);
        if (once) return;
      }
    } catch {
      // Fallback
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
        {
          threshold,
          rootMargin,
        }
      );
      observer.observe(node);
    } catch {
      setIsVisible(true);
    }

    // Safety fallback: ensure content is never stuck invisible
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => {
      if (observer) observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [once, threshold, rootMargin]);

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
        return 'scale(0.95)';
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

