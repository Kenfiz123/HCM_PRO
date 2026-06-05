"use client";

import { useEffect } from "react";

export default function ScrollEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rafId = 0;
    let mouseX = 0.5;
    let mouseY = 0.5;

    const update = () => {
      rafId = 0;
      const scrollable = Math.max(1, root.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / scrollable));

      root.style.setProperty("--scroll-progress", progress.toFixed(4));
      root.style.setProperty("--scroll-drift", `${(progress - 0.5) * 42}px`);
      root.style.setProperty("--mouse-x", `${(mouseX * 100).toFixed(2)}%`);
      root.style.setProperty("--mouse-y", `${(mouseY * 100).toFixed(2)}%`);
    };

    const schedule = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (reduceMotion) {
        return;
      }

      mouseX = event.clientX / Math.max(1, window.innerWidth);
      mouseY = event.clientY / Math.max(1, window.innerHeight);
      schedule();
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="scroll-soft-light" aria-hidden="true" />
    </>
  );
}
