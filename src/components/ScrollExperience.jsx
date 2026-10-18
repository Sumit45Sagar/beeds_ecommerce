import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import Lenis from 'lenis';

export const ScrollExperience = () => {
  const { currentPage } = useShop();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const lenisRef = useRef(null);

  // Initialize Lenis luxury smooth momentum scrolling
  useEffect(() => {
    // Only enable if user doesn't prefer reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenis;

    const onScroll = (e) => {
      const scrollY = e.scroll || window.scrollY;
      const limit = e.limit || (document.documentElement.scrollHeight - window.innerHeight);
      if (limit > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / limit) * 100));
        setScrollProgress(progress);
      }
      setShowBackToTop(scrollY > 350);
    };

    lenis.on('scroll', onScroll);

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Universal clean IntersectionObserver for fluid reveals
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    // Reset scroll to top smoothly on page transition
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px'
      }
    );

    const observeElements = () => {
      const targets = document.querySelectorAll(
        '.reveal-on-scroll, .reveal-fade, .reveal-scale, .reveal-left, .reveal-right, .reveal-stagger'
      );

      const windowHeight = window.innerHeight;

      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Immediately reveal anything already visible in viewport or above
        if (rect.top <= windowHeight * 0.92) {
          el.classList.add('is-revealed');
        } else {
          observer.observe(el);
        }
      });
    };

    // Stagger slightly after React renders
    const timer = setTimeout(observeElements, 50);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [currentPage]);

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.1 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Editorial Glowing Gold Scroll Progress Line */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Luxury Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`back-to-top-btn ${showBackToTop ? 'visible' : ''}`}
        aria-label="Scroll back to top"
        title="Ascend to Top"
      >
        <ArrowUp size={16} strokeWidth={1.75} />
      </button>
    </>
  );
};

export default ScrollExperience;
