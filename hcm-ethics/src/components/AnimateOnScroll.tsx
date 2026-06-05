"use client";

import React, { useEffect, useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function AnimateOnScroll({
  children,
  className = "",
  delay = 0,
  threshold = 0.16,
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already visible on first paint (above-the-fold)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      el.style.transitionDelay = delay ? `${delay}ms` : "";
      el.classList.add("anim-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = delay ? `${delay}ms` : "";
          el.classList.add("anim-visible");
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -24px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  const Comp = Tag as React.ElementType;
  return (
    <Comp ref={ref} className={`anim-hidden ${className}`}>
      {children}
    </Comp>
  );
}
