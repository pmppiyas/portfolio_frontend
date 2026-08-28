'use client';
import { useEffect, useRef, useState } from 'react';

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  const threshold = options?.threshold ?? 0.15;
  const rootMargin = options?.rootMargin;
  const root = options?.root;

  useEffect(() => {
    if (inView) return; // Once triggered, no need to re-observe

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect(); // once: true behavior
        }
      },
      { threshold, rootMargin, root }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin, root, inView]);

  return { ref, inView };
}

